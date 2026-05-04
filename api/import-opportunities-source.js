const { analyzeOpportunityText, coerceOpportunityItems, evaluateOpportunityCuration, extractOpportunityLinksFromHtml, fetchPageText, normalizeOpportunityPayload, scoreOpportunityCandidate } = require('./opportunity-helpers')

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

const isGenericOpportunityRecord = (payload = {}, candidate = {}) => {
  const combined = String([
    payload.title,
    payload.description,
    payload.fullDescription,
    candidate.text,
    candidate.url
  ].filter(Boolean).join(' ')).toLowerCase()

  if (!combined.trim()) return true
  if (OPPORTUNITY_TEXT_PATTERN.test(combined)) return false
  return GENERIC_TEXT_PATTERNS.some(pattern => pattern.test(combined))
}

module.exports = async function handler(req, res) {
  try {
    const body = req.body || {}
    const url = String(body.url || req.query.url || '').trim()
    const label = String(body.label || req.query.label || '').trim()
    if (!url) return res.status(400).json({ error: 'URL da fonte necessária.' })
    const rules = body.rules || {}

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada na Vercel.' })
    }

    const sourcePage = await fetchPageText(url)
    const candidates = sourcePage.html ? extractOpportunityLinksFromHtml(sourcePage.html, url).slice(0, 8) : []
    const analyzedItems = []

    if (candidates.length === 0) {
      const pageScore = scoreOpportunityCandidate(sourcePage.text || '', url)
      if (pageScore >= 20) {
        const aiData = await analyzeOpportunityText(sourcePage.text || '', apiKey, 'single')
        const payload = normalizeOpportunityPayload(aiData, {
            sourceUrl: url,
            sourcePageUrl: url,
            sourceName: label || new URL(url).hostname,
            sourceType: sourcePage.contentType === 'application/pdf' ? 'pdf' : 'pagina',
            status: 'pending'
          })
        if (!isGenericOpportunityRecord(payload, { text: sourcePage.text, url })) {
          const curation = evaluateOpportunityCuration(payload, rules)
          analyzedItems.push({
            ...payload,
            status: curation.decision === 'rejected' ? 'rejected' : 'pending',
            curationScore: curation.score,
            curationDecision: curation.decision,
            curationNotes: curation.notes
          })
        }
      }
    } else {
      for (const candidate of candidates) {
        try {
          const page = await fetchPageText(candidate.url)
          const aiData = await analyzeOpportunityText(page.text || '', apiKey, 'single')
          const payload = normalizeOpportunityPayload(aiData, {
              sourceUrl: candidate.url,
              sourcePageUrl: url,
              sourceName: label || new URL(url).hostname,
              sourceType: 'pagina',
              status: 'pending'
            })
          if (!isGenericOpportunityRecord(payload, candidate)) {
            const curation = evaluateOpportunityCuration(payload, rules)
            analyzedItems.push({
              ...payload,
              status: curation.decision === 'rejected' ? 'rejected' : 'pending',
              curationScore: curation.score,
              curationDecision: curation.decision,
              curationNotes: curation.notes
            })
          }
        } catch (candidateError) {
          if (!isGenericOpportunityRecord({ title: candidate.text, description: candidate.url }, candidate)) {
            analyzedItems.push({
              title: candidate.text || candidate.url,
              description: 'Falha ao analisar a página.',
              fullDescription: '',
              category: 'Editais',
              type: 'Remoto',
              location: '',
              deadline: '',
              link: candidate.url,
              sourceUrl: candidate.url,
              sourcePageUrl: url,
              sourceName: label || new URL(url).hostname,
              sourceType: 'pagina',
              status: 'pending',
              curationScore: 0,
              curationDecision: 'pending',
              reviewNotes: candidateError.message || 'Erro de análise'
            })
          }
        }
      }
    }

    return res.status(200).json({
      source: {
        url,
        label: label || new URL(url).hostname,
        itemsFound: analyzedItems.length
      },
      items: analyzedItems
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
