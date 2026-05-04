const { analyzeOpportunityText, coerceOpportunityItems, extractOpportunityLinksFromHtml, fetchPageText, normalizeOpportunityPayload } = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    const url = String(req.query.url || '').trim()
    const label = String(req.query.label || '').trim()
    if (!url) return res.status(400).json({ error: 'URL da fonte necessária.' })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada na Vercel.' })
    }

    const sourcePage = await fetchPageText(url)
    const candidates = sourcePage.html ? extractOpportunityLinksFromHtml(sourcePage.html, url).slice(0, 8) : []
    const analyzedItems = []

    if (candidates.length === 0) {
      const aiData = await analyzeOpportunityText(sourcePage.text || '', apiKey, 'single')
      analyzedItems.push(
        normalizeOpportunityPayload(aiData, {
          sourceUrl: url,
          sourcePageUrl: url,
          sourceName: label || new URL(url).hostname,
          sourceType: sourcePage.contentType === 'application/pdf' ? 'pdf' : 'pagina',
          status: 'pending'
        })
      )
    } else {
      for (const candidate of candidates) {
        try {
          const page = await fetchPageText(candidate.url)
          const aiData = await analyzeOpportunityText(page.text || '', apiKey, 'single')
          analyzedItems.push(
            normalizeOpportunityPayload(aiData, {
              sourceUrl: candidate.url,
              sourcePageUrl: url,
              sourceName: label || new URL(url).hostname,
              sourceType: 'pagina',
              status: 'pending'
            })
          )
        } catch (candidateError) {
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
            reviewNotes: candidateError.message || 'Erro de análise'
          })
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
