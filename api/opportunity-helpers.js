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
  normalizeOpportunityPayload,
  parseJsonResponse,
}
