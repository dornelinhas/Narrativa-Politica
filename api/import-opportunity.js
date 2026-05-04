const { analyzeOpportunityText, fetchPageText, normalizeOpportunityPayload } = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    const url = String(req.query.url || '').trim()
    if (!url) return res.status(400).json({ error: 'URL necessária.' })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada na Vercel.' })
    }

    const { text } = await fetchPageText(url)
    const aiData = await analyzeOpportunityText(text, apiKey, 'single')
    const payload = normalizeOpportunityPayload(aiData, { sourceUrl: url, link: url, status: 'pending' })

    return res.status(200).json({
      ...payload,
      fullDescription: `${payload.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
      link: url,
      sourceUrl: url,
      status: 'pending'
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
