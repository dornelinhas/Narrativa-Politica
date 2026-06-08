const { supabase } = require('./_lib/supabase')
const { 
  discoverFromRss, 
  fetchPageText, 
  analyzeOpportunityText, 
  normalizeOpportunityPayload, 
  evaluateOpportunityCuration,
  coerceOpportunityItems
} = require('./opportunity-helpers')

module.exports = async function handler(req, res) {
  try {
    const logs = [];
    const sourceWebsites = [
      { id: 'observatorio', label: 'Observatório 3º Setor', url: 'https://observatorio3setor.org.br/feed/' },
    ]

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY não configurada')

    let allLinks = []
    for (const source of sourceWebsites) {
        const links = await discoverFromRss(source.url)
        allLinks.push(...links.map(l => ({ ...l, sourceLabel: source.label })))
    }

    const uniqueLinks = Array.from(new Map(allLinks.map(l => [l.url, l])).values())
    const newLinks = uniqueLinks.slice(0, 2) 

    let processedCount = 0
    let pendingCount = 0
    let rejectedCount = 0

    for (const linkObj of newLinks) {
      try {
        const url = linkObj.url
        logs.push(`Processing URL: ${url}`)
        
        const sourcePage = await fetchPageText(url)
        if (!sourcePage.text || sourcePage.text.length < 200) {
            logs.push(`Text too short`)
            continue
        }

        const aiResponse = await analyzeOpportunityText(sourcePage.text, apiKey, 'batch')
        const rawItems = coerceOpportunityItems(aiResponse)
        
        logs.push(`Items from AI: ${rawItems.length}`)

        for (const item of rawItems) {
          const payload = normalizeOpportunityPayload(item, { 
            sourceUrl: url, 
            link: url, 
            status: 'pending',
            sourceName: linkObj.sourceLabel 
          })
          
          const curation = evaluateOpportunityCuration(payload, {})
          const finalStatus = curation.decision === 'rejected' ? 'rejected' : 'pending'
          
          const finalItem = {
            ...payload,
            status: finalStatus,
            fullDescription: `${payload.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
            reviewNotes: curation.notes
          }

          logs.push(`Inserting item: ${finalItem.title}`)
          const { error: insertError } = await supabase.from('opportunities').insert([finalItem])
          if (insertError) {
            logs.push(`Insert Error: ${insertError.message}`)
          } else {
            logs.push(`Insert Success! Status: ${finalStatus}`)
            if (finalStatus === 'pending') pendingCount++
            else rejectedCount++
          }
        }
        processedCount++
      } catch (e) {
        logs.push(`Catch Block Error: ${e.message}`)
      }
    }

    return res.status(200).json({ logs, processedCount, pendingCount, rejectedCount })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}