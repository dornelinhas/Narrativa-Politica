const { GoogleGenerativeAI } = require("@google/generative-ai");

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

const OPPORTUNITY_LINK_TERMS = [
  'vaga',
  'vagas',
  'oportunidade',
  'oportunidades',
  'bolsa',
  'bolsas',
  'edital',
  'editais',
  'chamada',
  'chamadas',
  'inscri',
  'seleção',
  'selecao',
  'fellow',
  'grant',
  'scholar',
  'job',
  'jobs',
  'work'
]

const GENERIC_LINK_PATTERNS = [
  /fa[çc]a seu cadastro/i,
  /cadastre-se/i,
  /cadastro/i,
  /acessar perfil/i,
  /central de editais/i,
  /perfil/i,
  /login/i,
  /entrar/i,
  /home/i,
  /in[ií]cio/i,
  /contato/i,
  /sobre nós/i,
  /sobre nos/i
]

const GENERIC_PATH_PATTERNS = [
  /\/cadastro/i,
  /\/register/i,
  /\/signup/i,
  /\/login/i,
  /\/entrar/i,
  /\/perfil/i,
  /\/profile/i,
  /\/contato/i,
  /\/contact/i,
  /\/sobre/i,
  /\/about/i,
  /\/privacy/i,
  /\/termos/i,
  /\/terms/i,
  /\/home/i,
  /\/index/i
]

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

const scoreOpportunityCandidate = (text = '', href = '') => {
  const combined = lowercase(`${text} ${href}`)
  let score = 0

  if (OPPORTUNITY_LINK_TERMS.some(term => combined.includes(term))) score += 25
  if (/vaga|oportunidade|bolsa|edital|chamada|inscri|fellow|grant|scholar|job|work/.test(combined)) score += 25
  if (/\/(vagas|oportunidades|editais|bolsas|chamadas|processo|processos|sele[çc][aã]o|news|blog|noticias|notícias|posts|article|articles)/i.test(href)) score += 20
  if (/\d{4}/.test(combined)) score += 5
  if (GENERIC_LINK_PATTERNS.some(pattern => pattern.test(combined))) score -= 40
  if (GENERIC_PATH_PATTERNS.some(pattern => pattern.test(href))) score -= 30
  if (combined.length < 8) score -= 10
  return score
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
  return `
    Analise o texto abaixo e extraia TODAS as oportunidades individuais (vagas, editais, bolsas, chamadas) publicáveis em PORTUGUÊS.
    IMPORTANTE: Se o texto contiver uma lista ou vários blocos de vagas diferentes, extraia CADA UMA como um objeto separado no array "items".
    Não agrupe vagas diferentes em um único item. Se for "Analista de Clima" e "Coordenador de Projetos", devem ser dois itens.
    Traduza para o português se o original estiver em inglês.

    Para cada oportunidade encontrada, forneça:
    - title: Título da vaga.
    - description: Resumo curto de 1 frase.
    - fullDescription: HTML formatado com <h3> e <ul> para requisitos e benefícios.
    - category: "Vagas de Emprego", "Bolsas", "Editais", "Estudos" ou "Educação".
    - type: "Remoto", "Híbrido" ou "Presencial".
    - location: Local da vaga.
    - deadline: Data (ex: "25 MAI") ou "ABERTO".
    - publicationDecision: "publicar", "revisar" ou "não_publicar".
    - reviewNotes: Breve justificativa.

    Texto: ${text.slice(0, 18000)}

    Responda EXCLUSIVAMENTE em JSON:
    {
      "items": [
        {
          "title": "...",
          "description": "...",
          "fullDescription": "...",
          "category": "...",
          "type": "...",
          "location": "...",
          "deadline": "...",
          "publicationDecision": "...",
          "reviewNotes": "..."
        }
      ]
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

const fetchPageText = async (url) => {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
  }

  const response = await fetch(url, { headers })
  
  if (!response.ok) {
    throw new Error(`O servidor bloqueou o acesso (Erro ${response.status}). Isso ocorre por segurança do site de origem. Tente copiar o texto da vaga manualmente.`)
  }

  const contentType = String(response.headers.get('content-type') || '').toLowerCase()
  if (contentType.includes('application/pdf') || url.toLowerCase().endsWith('.pdf')) {
    const buffer = Buffer.from(await response.arrayBuffer())
    const text = extractPdfTextFromBuffer(buffer)
    return { text, contentType: 'application/pdf' }
  }

  const html = await response.text()
  return { text: plainText(html), html, contentType: 'text/html' }
}

const extractLinksFromHtml = (html, baseUrl) => {
  const links = []
  const hrefRegex = /href=["']([^"']+)["']/gi
  let match
  const base = new URL(baseUrl)

  while ((match = hrefRegex.exec(html)) !== null) {
    try {
      const href = match[1]
      const absoluteUrl = new URL(href, baseUrl).href
      // Evita links externos que não sejam da mesma origem se for um site de busca
      // Ou permite tudo se quisermos expandir
      links.push(absoluteUrl)
    } catch (e) {
      // Ignora URLs inválidas
    }
  }
  return [...new Set(links)]
}

const discoverOpportunityLinks = async (sourceUrl) => {
  const { html, text } = await fetchPageText(sourceUrl)
  if (!html) return []
  
  const allLinks = extractLinksFromHtml(html, sourceUrl)
  const candidates = []

  for (const link of allLinks) {
    // Evita loop infinito se o link for a própria página
    if (link === sourceUrl || link === sourceUrl + '/') continue
    
    // Tenta pegar um pequeno contexto do texto do link (difícil só com regex, mas podemos tentar)
    // Por enquanto, score baseado apenas na URL e termos globais
    const score = scoreOpportunityCandidate('', link)
    if (score > 30) {
      candidates.push({ url: link, score })
    }
  }

  return candidates.sort((a, b) => b.score - a.score)
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
  extractPdfTextFromBuffer,
  fetchPageText,
  evaluateOpportunityCuration,
  normalizeOpportunityPayload,
  parseJsonResponse,
  scoreOpportunityCandidate,
  extractLinksFromHtml,
  discoverOpportunityLinks
}
