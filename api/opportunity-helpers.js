const { GoogleGenerativeAI } = require("@google/generative-ai");
const zlib = require('node:zlib')

const decodeHtml = (value = '') =>
  String(value)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const plainText = (html = '') =>
  decodeHtml(
    String(html)
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean)
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(Boolean)
  }
  return []
}

const lowercase = (value = '') => String(value || '').toLowerCase()

const MONTHS_PT = {
  JAN: 0,
  FEV: 1,
  FEB: 1,
  MAR: 2,
  ABR: 3,
  APR: 3,
  MAI: 4,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AGO: 7,
  AUG: 7,
  SET: 8,
  SEP: 8,
  OUT: 9,
  OCT: 9,
  NOV: 10,
  DEZ: 11,
  DEC: 11
}

const unescapePdfString = (value = '') =>
  String(value)
    .replace(/\\\\/g, '\\')
    .replace(/\((?=[^)]*\))/g, '(')
    .replace(/\)/g, ')')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')

const extractPdfTextFromBuffer = (buffer) => {
  const raw = Buffer.from(buffer).toString('latin1')
  const segments = []

  const directTextMatches = raw.match(/\((?:\\.|[^\\()])*\)\s*Tj/gi) || []
  for (const match of directTextMatches) {
    const inner = match.replace(/.*\((.*)\)\s*Tj.*/i, '$1')
    if (inner) segments.push(unescapePdfString(inner))
  }

  const arrayTextMatches = raw.match(/\[(?:[\s\S]*?)\]\s*TJ/gi) || []
  for (const match of arrayTextMatches) {
    const inner = match.replace(/.*\[(.*)\]\s*TJ.*/i, '$1')
    const stringMatches = inner.match(/\((?:\\.|[^\\()])*\)/g) || []
    for (const textChunk of stringMatches) {
      segments.push(unescapePdfString(textChunk.slice(1, -1)))
    }
  }

  const looseTextMatches = raw.match(/\((?:\\.|[^\\()])*\)/g) || []
  for (const match of looseTextMatches.slice(0, 1500)) {
    segments.push(unescapePdfString(match.slice(1, -1)))
  }

  return plainText(segments.join(' '))
}

const normalizeDeadlineText = (deadline = '') =>
  lowercase(deadline)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const parseOpportunityDeadline = (deadline) => {
  const raw = String(deadline || '').trim()
  if (!raw) return null

  const normalized = normalizeDeadlineText(raw).toUpperCase()
  if (!normalized) return null

  if (
    normalized === 'ABERTO' ||
    normalized.includes('INSCRICOES ABERTAS') ||
    normalized.includes('INSCRICOES EM ANDAMENTO') ||
    normalized.includes('INSCRICAO ABERTA')
  ) {
    return null
  }

  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoMatch) {
    const [, year, month, day] = isoMatch
    return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999)
  }

  const dateMatch = normalized.match(/^(\d{1,2})\s+([A-Z]{3})(?:\s+(\d{4}))?$/)
  if (dateMatch) {
    const [, day, monthLabel, year] = dateMatch
    const month = MONTHS_PT[monthLabel]
    if (month === undefined) return null
    const targetYear = year ? Number(year) : new Date().getFullYear()
    return new Date(targetYear, month, Number(day), 23, 59, 59, 999)
  }

  const fallback = new Date(raw)
  return Number.isNaN(fallback.getTime()) ? null : fallback
}

const analyzeWithAI = async (prompt, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey)
  const modelsToTry = ["gemini-2.0-flash-lite", "gemini-2.0-flash", "gemini-2.5-flash"]
  let lastError = null

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text().replace(/```json|```/g, '').trim()
    } catch (err) {
      lastError = err
    }
  }

  throw lastError
}

const parseJsonResponse = (text) => {
  const trimmed = String(text || '').trim()
  const first = trimmed.indexOf('{')
  const last = trimmed.lastIndexOf('}')
  if (first === -1 || last === -1) {
    throw new Error('Resposta da IA não é JSON.')
  }
  return JSON.parse(trimmed.slice(first, last + 1))
}

const buildOpportunityPrompt = (text, mode = 'single') => {
  if (mode === 'batch') {
    return `
      Analise o texto abaixo e extraia oportunidades publicáveis em PORTUGUÊS.
      O texto pode vir de edital, boletim, release, página de vagas, blog ou PDF.
      Retorne apenas JSON válido.

      Conteúdo: ${text.slice(0, 15000)}

      Responda exatamente neste formato:
      {
        "items": [
          {
            "title": "Título traduzido",
            "description": "Resumo curto",
            "fullDescription": "HTML formatado profissional",
            "category": "Vagas de Emprego, Bolsas, Editais ou Estudos",
            "type": "Remoto, Híbrido ou Presencial",
            "location": "Cidade ou Continente",
            "deadline": "Prazo",
            "publicationDecision": "publicar, revisar ou não_publicar",
            "reviewNotes": "Justificativa editorial curta"
          }
        ]
      }
    `
  }

  return `
    Analise esta oportunidade e extraia as informações em PORTUGUÊS.
    Traduza se estiver em inglês.
    Identifique se o conteúdo parece ser uma vaga, edital, bolsa, chamada ou outro tipo de oportunidade.
    Depois, dê uma recomendação editorial curta sobre publicação.

    Conteúdo: ${text.slice(0, 10000)}

    Responda APENAS em JSON:
    {
      "title": "Título traduzido",
      "description": "Resumo curto",
      "fullDescription": "HTML formatado profissional",
      "category": "Vagas de Emprego, Bolsas, Editais ou Estudos",
      "type": "Remoto, Híbrido ou Presencial",
      "location": "Cidade ou Continente",
      "deadline": "Prazo",
      "sourceType": "pagina, edital, bolsa, chamado ou outro",
      "publicationDecision": "publicar, revisar ou não_publicar",
      "reviewNotes": "Justificativa editorial curta"
    }
  `
}

const normalizeOpportunityPayload = (item = {}, fallback = {}) => {
  const decision = String(item.publicationDecision || '').toLowerCase().trim()
  const publicationState = decision === 'publicar' ? 'approved' : decision === 'não_publicar' || decision === 'nao_publicar' ? 'rejected' : 'pending'

  return {
    title: item.title || fallback.title || '',
    description: item.description || fallback.description || '',
    fullDescription: item.fullDescription || fallback.fullDescription || '',
    category: item.category || fallback.category || 'Editais',
    type: item.type || fallback.type || 'Remoto',
    location: item.location || fallback.location || '',
    deadline: item.deadline || fallback.deadline || '',
    link: item.link || fallback.link || fallback.sourceUrl || '',
    image: item.image || fallback.image || '',
    status: fallback.status || publicationState,
    sourceUrl: item.sourceUrl || fallback.sourceUrl || fallback.link || '',
    sourcePageUrl: fallback.sourcePageUrl || '',
    sourceName: fallback.sourceName || '',
    sourceType: item.sourceType || fallback.sourceType || 'pagina',
    reviewNotes: item.reviewNotes || fallback.reviewNotes || '',
    publicationDecision: item.publicationDecision || fallback.publicationDecision || 'revisar'
  }
}

const evaluateOpportunityCuration = (item = {}, rules = {}) => {
  const title = lowercase(item.title)
  const description = lowercase(item.description)
  const fullDescription = lowercase(item.fullDescription)
  const sourceText = lowercase(`${item.sourceName || ''} ${item.sourceUrl || ''} ${item.sourcePageUrl || ''}`)
  const content = `${title} ${description} ${fullDescription} ${sourceText}`

  const includeKeywords = normalizeList(rules.includeKeywords).map(lowercase)
  const excludeKeywords = normalizeList(rules.excludeKeywords).map(lowercase)
  const acceptedCategories = normalizeList(rules.acceptedCategories).map(lowercase)
  const acceptedLocations = normalizeList(rules.acceptedLocations).map(lowercase)

  const matchedInclude = includeKeywords.filter(keyword => keyword && content.includes(keyword))
  const matchedExclude = excludeKeywords.filter(keyword => keyword && content.includes(keyword))
  const matchedCategory = acceptedCategories.some(category => category && lowercase(item.category).includes(category))
  const matchedLocation = acceptedLocations.some(location => location && lowercase(item.location).includes(location))
  const deadlineDate = parseOpportunityDeadline(item.deadline)
  const maxAgeDays = Number(rules.maxAgeDays ?? 0)
  const deadlineAgeDays = deadlineDate ? (Date.now() - deadlineDate.getTime()) / 86400000 : null

  let score = 35
  score += matchedInclude.length * 12
  score += matchedCategory ? 15 : 0
  score += matchedLocation ? 10 : 0
  score += item.deadline ? 10 : 0
  score -= matchedExclude.length * 25

  if (item.sourceType === 'pdf') score += 8
  if (item.sourceType === 'pagina') score += 5

  if (String(item.publicationDecision || '').toLowerCase() === 'publicar') score += 10
  if (String(item.publicationDecision || '').toLowerCase() === 'não_publicar' || String(item.publicationDecision || '').toLowerCase() === 'nao_publicar') score -= 30
  if (deadlineAgeDays !== null && maxAgeDays > 0 && deadlineAgeDays > maxAgeDays) score -= 30

  score = Math.max(0, Math.min(100, score))

  const minScore = Number(rules.minScore ?? 60)
  const hasExcludedKeyword = matchedExclude.length > 0
  const hasIncludeKeyword = matchedInclude.length > 0
  const missingDeadline = !String(item.deadline || '').trim()
  const rejectIfMissingDeadline = Boolean(rules.rejectIfMissingDeadline)
  const tooOld = deadlineAgeDays !== null && maxAgeDays > 0 && deadlineAgeDays > maxAgeDays

  let decision = 'pending'
  if (hasExcludedKeyword) decision = 'rejected'
  else if (rejectIfMissingDeadline && missingDeadline) decision = 'rejected'
  else if (tooOld) decision = 'rejected'
  else if (score < minScore) decision = 'rejected'
  else if (!hasIncludeKeyword && rules.requireSourceMatch !== false) decision = 'pending'

  const notes = [
    hasIncludeKeyword ? `Inclui: ${matchedInclude.join(', ')}` : '',
    hasExcludedKeyword ? `Exclui: ${matchedExclude.join(', ')}` : '',
    matchedCategory ? 'Categoria compatível' : '',
    matchedLocation ? 'Local compatível' : '',
    `Score: ${score}/100`
  ].filter(Boolean)

  return {
    score,
    decision,
    matchedInclude,
    matchedExclude,
    matchedCategory,
    matchedLocation,
    tooOld,
    notes: notes.join(' | ')
  }
}

const isOpportunityLink = (text = '', href = '') => {
  const combined = `${text} ${href}`.toLowerCase()
  const path = (() => {
    try {
      return new URL(href).pathname.toLowerCase()
    } catch {
      return ''
    }
  })()

  return (
    /vaga|oportunidade|bolsa|edital|chamada|fellow|grant|scholar|work|job|inscri/.test(combined) ||
    (/\/[^/]+/.test(path) && !/about|contact|privacy|login|home|index/.test(path))
  )
}

const extractOpportunityLinksFromHtml = (html = '', baseUrl) => {
  const links = []
  const seen = new Set()
  const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = anchorRegex.exec(html)) !== null) {
    const href = String(match[1] || '').trim()
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue

    let absoluteUrl
    try {
      absoluteUrl = new URL(href, baseUrl).toString()
    } catch {
      continue
    }

    try {
      const baseHost = new URL(baseUrl).hostname
      const candidateHost = new URL(absoluteUrl).hostname
      if (baseHost !== candidateHost && !candidateHost.endsWith(`.${baseHost}`) && !baseHost.endsWith(`.${candidateHost}`)) {
        continue
      }
    } catch {
      continue
    }

    const text = plainText(match[2] || '')
    if (!isOpportunityLink(text, absoluteUrl)) continue

    const key = `${absoluteUrl}|${text}`
    if (seen.has(key)) continue
    seen.add(key)
    links.push({ url: absoluteUrl, text })
  }

  return links
}

const fetchPageText = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
  const contentType = String(response.headers.get('content-type') || '').toLowerCase()
  if (contentType.includes('application/pdf') || url.toLowerCase().endsWith('.pdf')) {
    const buffer = Buffer.from(await response.arrayBuffer())
    const text = extractPdfTextFromBuffer(buffer)
    return { text, contentType: 'application/pdf' }
  }

  const html = await response.text()
  return { text: plainText(html), html, contentType: 'text/html' }
}

const analyzeOpportunityText = async (text, apiKey, mode = 'single') => {
  const prompt = buildOpportunityPrompt(text, mode)
  const raw = await analyzeWithAI(prompt, apiKey)
  return parseJsonResponse(raw)
}

const coerceOpportunityItems = (payload) => {
  if (Array.isArray(payload?.items)) return payload.items
  if (payload && typeof payload === 'object') return [payload]
  return []
}

module.exports = {
  analyzeOpportunityText,
  coerceOpportunityItems,
  extractOpportunityLinksFromHtml,
  extractPdfTextFromBuffer,
  fetchPageText,
  evaluateOpportunityCuration,
  normalizeOpportunityPayload,
  parseJsonResponse,
}
