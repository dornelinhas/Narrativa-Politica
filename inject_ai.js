const fs = require('fs');
let vue_content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const missingLogic = `
// --- AI AND IMPORT CAPABILITIES RESTORED ---
const bulkImportText = ref('')
const isImportingBulk = ref(false)
const opportunityImportUrl = ref('')
const isImportingOpportunity = ref(false)

const gerarResumoIA = async () => {
  if (!novoArtigo.value.content || novoArtigo.value.content.length < 100) {
    alert("Escreva pelo menos um pouco do artigo primeiro para que a IA possa resumir!")
    return
  }
  
  isGeneratingSummary.value = true
  
  try {
    const response = await fetch('/api/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: novoArtigo.value.content,
        type: novoArtigo.value.type
      })
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro na IA')
    
    novoArtigo.value.subtitle = data.summary
  } catch (e) {
    console.error(e)
    alert("Não foi possível gerar o resumo automático.")
  } finally {
    isGeneratingSummary.value = false
  }
}

const importarOportunidadeURL = async () => {
  if (!opportunityImportUrl.value.trim()) {
    alert("Cole uma URL primeiro.")
    return
  }
  isImportingOpportunity.value = true
  try {
    const response = await fetch('/api/import-opportunity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: opportunityImportUrl.value.trim() })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Não foi possível importar.')
    
    const items = data.items || []
    if (items.length === 0) throw new Error("Nenhuma oportunidade encontrada.")
    const firstItem = items[0]
    
    novaVaga.value = {
      ...novaVaga.value,
      title: firstItem.title || '',
      description: firstItem.description || '',
      fullDescription: firstItem.fullDescription || '',
      deadline: firstItem.deadline || '',
      link: firstItem.link || opportunityImportUrl.value.trim(),
      sourceUrl: opportunityImportUrl.value.trim(),
    }
    alert('Conteúdo importado. Revise antes de publicar.')
  } catch(e) {
    console.error(e)
    alert('Falha ao importar.')
  } finally {
    isImportingOpportunity.value = false
  }
}

const processBulkImport = async () => {
  if (!bulkImportText.value.trim()) return
  isImportingBulk.value = true
  try {
    const response = await fetch('/api/import-opportunity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: bulkImportText.value })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Não foi possível importar.')
    
    let successCount = 0
    if (data.items && data.items.length > 0) {
      if (!siteContent.opportunities) siteContent.opportunities = []
      for (const item of data.items) {
        if (!item.title) continue
        const payload = {
          ...defaultOpportunityForm(),
          title: item.title,
          description: item.description || '',
          fullDescription: item.fullDescription || '',
          deadline: item.deadline || '',
          link: item.link || '',
          sourceUrl: 'bulk_import',
          status: 'pending',
          id: Date.now() + Math.random()
        }
        siteContent.opportunities.unshift(payload)
        successCount++
      }
      vagas.value = [...siteContent.opportunities]
      await persistSiteSetting('opportunities', siteContent.opportunities)
    }
    
    alert(\`Importação concluída: \${successCount} vagas extraídas e mandadas para revisão.\`)
    bulkImportText.value = ''
  } catch (e) {
    console.error(e)
    alert("Falha ao processar texto com IA.")
  } finally {
    isImportingBulk.value = false
  }
}

const saveCurationRules = async () => {
  isSaving.value = true
  try {
    const payload = {
      minScore: Number(curationConfigData.value.minScore || 0),
      maxAgeDays: Number(curationConfigData.value.maxAgeDays || 0),
      includeKeywords: curationConfigData.value.includeKeywords,
      excludeKeywords: curationConfigData.value.excludeKeywords
    }
    Object.assign(siteContent.opportunitiesCurationConfig, payload)
    await persistSiteSetting('opportunitiesCurationConfig', siteContent.opportunitiesCurationConfig)
    setTimeout(() => { isSaving.value = false; alert('Regras de curadoria salvas!') }, 400)
  } catch(e) {
    console.error(e)
    isSaving.value = false
  }
}
// --- END AI ---
`;

// Inject into the <script setup> block, just before the first function or near the end.
// A safe place is right before `const loadData = async () => {` or right after `const activeTab = ref('dashboard')`.

vue_content = vue_content.replace(
    'const loadData = async () => {',
    missingLogic + '\nconst loadData = async () => {'
);

fs.writeFileSync('src/views/AdminDashboardView.vue', vue_content, 'utf8');
