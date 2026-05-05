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
    const input = String(body.url || req.query.url || '').trim()
    if (!input) return res.status(400).json({ error: 'URL ou Texto é necessário.' })
    const rules = body.rules || {}

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada.' })
    }

    let sourceText = ''
    let sourceUrl = ''
    
    // Detecta se é URL ou texto puro
    if (input.startsWith('http')) {
      sourceUrl = input
      try {
        const sourcePage = await fetchPageText(input)
        sourceText = sourcePage.text
      } catch (e) {
        // Se falhar o fetch (Mod_Security), retornamos o erro para o usuário saber que precisa colar o texto
        return res.status(403).json({ 
          error: e.message,
          isSecurityBlock: true 
        })
      }
    } else {
      sourceText = input
      sourceUrl = 'Texto Colado Manualmente'
    }

    const pageScore = scoreOpportunityCandidate(sourceText, sourceUrl)
    
    // Se o texto for muito curto ou irrelevante
    if (sourceText.length < 50) {
      return res.status(400).json({ error: 'O conteúdo fornecido é muito curto para ser analisado.' })
    }

    const aiResponse = await analyzeOpportunityText(sourceText, apiKey, 'batch')
    const rawItems = coerceOpportunityItems(aiResponse)
    
    const processedItems = rawItems.map(item => {
      const payload = normalizeOpportunityPayload(item, { sourceUrl, link: sourceUrl, status: 'pending' })
      const curation = evaluateOpportunityCuration(payload, rules)
      const finalStatus = curation.decision === 'rejected' ? 'rejected' : 'pending'
      
      return {
        ...payload,
        status: finalStatus,
        curationScore: curation.score,
        curationDecision: curation.decision,
        curationNotes: curation.notes,
        fullDescription: `${payload.fullDescription}${sourceUrl.startsWith('http') ? `<p><strong>Fonte:</strong> <a href="${sourceUrl}" target="_blank">Acessar original</a></p>` : ''}`,
        link: payload.link || sourceUrl,
        sourceUrl: sourceUrl
      }
    })

    return res.status(200).json({
      items: processedItems,
      count: processedItems.length
    })
  } catch (error) {
    console.error('Erro na API import-opportunity:', error)
    return res.status(500).json({ error: error.message })
  }
}
