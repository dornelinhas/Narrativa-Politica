const { analyzeOpportunityText, evaluateOpportunityCuration, fetchPageText, normalizeOpportunityPayload, scoreOpportunityCandidate } = require('./opportunity-helpers')

const GENERIC_TEXT_PATTERNS = [
  /fa[çc]a seu cadastro/i,
  /cadastre-se/i,
  /acessar perfil/i,
  /central de editais/i,
  /saiba mais/i,
  /ver mais/i,
  /clique aqui/i,
  /acesse/i,
  /perfil/i,
  /home/i,
  /in[ií]cio/i
]

const OPPORTUNITY_TEXT_PATTERN = /vaga|oportunidade|bolsa|edital|chamada|inscri|fellow|grant|scholar|job|work/i

const isGenericOpportunityRecord = (payload = {}, sourceText = '') => {
  const combined = String([payload.title, payload.description, payload.fullDescription, sourceText].filter(Boolean).join(' ')).toLowerCase()
  if (!combined.trim()) return true
  if (OPPORTUNITY_TEXT_PATTERN.test(combined)) return false
  return GENERIC_TEXT_PATTERNS.some(pattern => pattern.test(combined))
}

module.exports = async function handler(req, res) {
  try {
    const body = req.body || {}
    const url = String(body.url || req.query.url || '').trim()
    if (!url) return res.status(400).json({ error: 'URL necessária.' })
    const rules = body.rules || {}

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada na Vercel.' })
    }

    const sourcePage = await fetchPageText(url)
    const pageScore = scoreOpportunityCandidate(sourcePage.text || '', url)
    if (pageScore < 20) {
      return res.status(200).json({
        status: 'pending',
        curationScore: 0,
        curationDecision: 'pending',
        curationNotes: 'Página sem sinais suficientes de oportunidade.',
        fullDescription: '',
        link: url,
        sourceUrl: url,
        skipped: true
      })
    }

    const aiData = await analyzeOpportunityText(sourcePage.text, apiKey, 'single')
    const payload = normalizeOpportunityPayload(aiData, { sourceUrl: url, link: url, status: 'pending' })
    if (isGenericOpportunityRecord(payload, sourcePage.text)) {
      return res.status(200).json({
        ...payload,
        status: 'pending',
        curationScore: 0,
        curationDecision: 'pending',
        curationNotes: 'Conteúdo genérico ignorado.',
        skipped: true
      })
    }
    const curation = evaluateOpportunityCuration(payload, rules)
    const finalStatus = curation.decision === 'rejected' ? 'rejected' : 'pending'

    return res.status(200).json({
      ...payload,
      status: finalStatus,
      curationScore: curation.score,
      curationDecision: curation.decision,
      curationNotes: curation.notes,
      fullDescription: `${payload.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
      link: url,
      sourceUrl: url,
      status: finalStatus
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
