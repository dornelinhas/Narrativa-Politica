const { discoverOpportunityLinks } = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    const body = req.body || {}
    const sources = body.sources || []
    
    if (!Array.isArray(sources) || sources.length === 0) {
      return res.status(400).json({ error: 'Lista de fontes (sources) é necessária.' })
    }

    const allDiscovery = await Promise.all(sources.map(async (source) => {
      try {
        const links = await discoverOpportunityLinks(source.url)
        return {
          sourceLabel: source.label,
          sourceUrl: source.url,
          links: links
        }
      } catch (e) {
        return {
          sourceLabel: source.label,
          sourceUrl: source.url,
          error: e.message,
          links: []
        }
      }
    }))

    // Achata e remove duplicatas globais
    const seenUrls = new Set()
    const uniqueLinks = []

    for (const item of allDiscovery) {
      for (const linkObj of item.links) {
        if (!seenUrls.has(linkObj.url)) {
          seenUrls.add(linkObj.url)
          uniqueLinks.push({
            ...linkObj,
            sourceLabel: item.sourceLabel
          })
        }
      }
    }

    return res.status(200).json({
      sourcesProcessed: allDiscovery.length,
      totalLinksFound: uniqueLinks.length,
      links: uniqueLinks.slice(0, 50) // Limite de 50 para não sobrecarregar
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
