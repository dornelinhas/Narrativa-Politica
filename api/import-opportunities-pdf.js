const { analyzeOpportunityText, coerceOpportunityItems, extractPdfTextFromBuffer, normalizeOpportunityPayload } = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })

    const { dataUrl, fileName, label } = req.body || {}
    if (!dataUrl) return res.status(400).json({ error: 'PDF obrigatório.' })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave de IA não configurada na Vercel.' })
    }

    const base64 = String(dataUrl).includes(',') ? String(dataUrl).split(',')[1] : String(dataUrl)
    const buffer = Buffer.from(base64, 'base64')
    const text = extractPdfTextFromBuffer(buffer)

    if (!text || text.trim().length < 120) {
      return res.status(400).json({ error: 'Não consegui extrair texto suficiente do PDF. Se ele for escaneado, será necessário OCR.' })
    }

    const raw = await analyzeOpportunityText(text, apiKey, 'batch')
    const items = coerceOpportunityItems(raw).map(item => normalizeOpportunityPayload(item, {
      sourceUrl: fileName || label || 'pdf-upload',
      sourcePageUrl: fileName || label || 'pdf-upload',
      sourceName: label || fileName || 'PDF enviado',
      sourceType: 'pdf',
      status: 'pending'
    }))

    return res.status(200).json({
      source: {
        url: fileName || label || 'pdf-upload',
        label: label || fileName || 'PDF enviado',
        itemsFound: items.length
      },
      items
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
