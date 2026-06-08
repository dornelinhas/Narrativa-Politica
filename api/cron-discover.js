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
  // Verificação básica de segurança para Vercel Cron
  // Em produção, a Vercel envia um header específico
  const authHeader = req.headers['authorization']
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    console.log('Iniciando cron de descoberta automática via RSS...')

    // 1. Buscar configurações de curadoria e fontes
    const { data: settingsData } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['opportunitiesCurationConfig', 'opportunitySourceWebsites'])

    const curationConfig = settingsData?.find(s => s.key === 'opportunitiesCurationConfig')?.value || {}
    
    // Por padrão, usamos fontes RSS confiáveis e abertas
    const sourceWebsites = settingsData?.find(s => s.key === 'opportunitySourceWebsites')?.value || [
      { id: 'observatorio', label: 'Observatório 3º Setor', url: 'https://observatorio3setor.org.br/feed/' },
      { id: 'gife', label: 'GIFE', url: 'https://gife.org.br/feed/' },
      { id: 'nossacausa', label: 'Nossa Causa', url: 'https://nossacausa.com/feed/' },
      { id: 'opportunitiesforyouth', label: 'Opportunities for Youth', url: 'https://opportunitiesforyouth.org/feed/' }
    ]

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY não configurada')

    // 2. Coletar todos os links em potencial via RSS
    let allLinks = []
    for (const source of sourceWebsites) {
      try {
        console.log(`Buscando links no RSS: ${source.url}`)
        const links = await discoverFromRss(source.url)
        allLinks.push(...links.map(l => ({ ...l, sourceLabel: source.label })))
      } catch (e) {
        console.error(`Erro ao buscar na fonte ${source.url}:`, e.message)
      }
    }

    // Remover duplicatas de links descobertos
    const uniqueLinks = Array.from(new Map(allLinks.map(l => [l.url, l])).values())
    console.log(`Total de links únicos descobertos: ${uniqueLinks.length}`)

    // 3. Filtrar links que já existem no banco (tabela opportunities)
    // Buscamos os links existentes para evitar re-processamento
    const { data: existingOpps } = await supabase
      .from('opportunities')
      .select('link, sourceUrl')
    
    const existingUrls = new Set([
      ...(existingOpps || []).map(o => o.link),
      ...(existingOpps || []).map(o => o.sourceUrl)
    ].filter(Boolean))

    const newLinks = uniqueLinks.filter(l => !existingUrls.has(l.url)).slice(0, 5) // Limite de 5 por execução para não estourar a cota da IA e timeout da Vercel
    console.log(`Novos links para processar: ${newLinks.length}`)

    let processedCount = 0
    let pendingCount = 0
    let rejectedCount = 0

    // Função de delay auxiliar
    const delay = ms => new Promise(res => setTimeout(res, ms))

    // 4. Processar cada novo link
    for (const linkObj of newLinks) {
      try {
        const url = linkObj.url
        console.log(`Processando: ${url}`)
        
        const sourcePage = await fetchPageText(url)
        if (!sourcePage.text || sourcePage.text.length < 200) continue

        const aiResponse = await analyzeOpportunityText(sourcePage.text, apiKey, 'batch')
        const rawItems = coerceOpportunityItems(aiResponse)
        
        for (const item of rawItems) {
          const payload = normalizeOpportunityPayload(item, { 
            sourceUrl: url, 
            link: url, 
            status: 'pending',
            sourceName: linkObj.sourceLabel 
          })
          
          const curation = evaluateOpportunityCuration(payload, curationConfig)
          
          // Se for rejeitado por score muito baixo ou palavras proibidas, podemos pular
          if (curation.decision === 'rejected' && curation.score < 30) {
            console.log(`Oportunidade rejeitada (score ${curation.score}): ${payload.title}`)
            continue
          }

          const finalStatus = curation.decision === 'rejected' ? 'rejected' : 'pending'
          
          const finalItem = {
            ...payload,
            status: finalStatus,
            fullDescription: `${payload.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
            reviewNotes: curation.notes
          }

          // Inserir no banco
          const { error: insertError } = await supabase.from('opportunities').insert([finalItem])
          if (insertError) {
            console.error('Erro ao inserir no banco:', insertError)
          } else {
            if (finalStatus === 'pending') pendingCount++
            else rejectedCount++
          }
        }
        processedCount++
        
        // Aguardar 3 segundos para evitar 429 Too Many Requests do Gemini
        await delay(3000)
        
      } catch (e) {
        console.error(`Erro ao processar link ${linkObj.url}:`, e.message)
      }
    }

    return res.status(200).json({
      message: 'Cron finalizado',
      linksDiscovered: uniqueLinks.length,
      linksProcessed: processedCount,
      opportunitiesImported: pendingCount,
      opportunitiesRejected: rejectedCount
    })
  } catch (error) {
    console.error('Erro no cron:', error)
    return res.status(500).json({ error: error.message })
  }
}
