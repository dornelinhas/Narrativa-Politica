const { fetchPageText, analyzeOpportunityText, discoverFromRss, evaluateOpportunityCuration, coerceOpportunityItems } = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    const logs = [];
    const url = 'https://observatorio3setor.org.br/feed/'
    logs.push(`Discovering RSS: ${url}`)
    const links = await discoverFromRss(url)
    logs.push(`Found ${links.length} links.`)
    
    if (links.length === 0) return res.status(200).json({ logs })
    
    const target = links[0].url
    logs.push(`Testing URL: ${target}`)
    
    const page = await fetchPageText(target)
    logs.push(`Page length: ${page.text ? page.text.length : 0}`)
    
    if (!page.text || page.text.length < 200) {
      logs.push(`Page text too short!`)
      return res.status(200).json({ logs })
    }
    
    const apiKey = process.env.GEMINI_API_KEY
    logs.push(`Has GEMINI_API_KEY: ${!!apiKey}`)
    
    try {
      const aiResponse = await analyzeOpportunityText(page.text, apiKey, 'batch')
      logs.push(`AI success. Raw length: ${JSON.stringify(aiResponse).length}`)
      const items = coerceOpportunityItems(aiResponse)
      logs.push(`Items parsed: ${items.length}`)
    } catch(e) {
      logs.push(`AI Error: ${e.message}`)
    }
    
    return res.status(200).json({ logs })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
