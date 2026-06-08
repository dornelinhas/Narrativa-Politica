const fs = require('fs');

let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// Add trilhas refs and functions
const trilhaLogic = `
// --- LMS / TRILHAS ---
const defaultTrackForm = () => ({ title: '', description: '', image: '', duration: '', modules: [], status: 'rascunho' })
const trilhas = ref([])
const novaTrilha = ref(defaultTrackForm())
const editingTrilhaId = ref(null)
const isEditingTrilha = computed(() => editingTrilhaId.value !== null)

const saveTrilha = async () => {
  if (!novaTrilha.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const list = [...(siteContent.tracks || [])]
    const payload = { ...novaTrilha.value, id: editingTrilhaId.value || Date.now() }
    const idx = list.findIndex(t => t.id === payload.id)
    if (idx !== -1) list[idx] = payload; else list.unshift(payload)
    siteContent.tracks = list
    await persistSiteSetting('tracks', list)
    await recordActivity(\`Trilha: \${payload.title}\`, editingTrilhaId.value ? 'Edição' : 'Cadastro')
    resetTrilhaForm()
    alert('Trilha salva com sucesso!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetTrilhaForm = () => { novaTrilha.value = defaultTrackForm(); editingTrilhaId.value = null }
const editTrilha = (t) => { editingTrilhaId.value = t.id; novaTrilha.value = { ...t }; scrollToForm('form-anchor') }
const deleteTrilha = async (t) => {
  if (!confirm('Excluir esta trilha permanentemente?')) return
  siteContent.tracks = (siteContent.tracks || []).filter(item => item.id !== t.id)
  await persistSiteSetting('tracks', siteContent.tracks)
  await recordActivity(\`Exclusão Trilha: \${t.title}\`, 'Exclusão')
}
`;

content = content.replace('// --- MÉTODOS ---', trilhaLogic + '\n// --- MÉTODOS ---');
content = content.replace('if (siteContent.about) sobreData.value = { ...siteContent.about }', 'if (siteContent.about) sobreData.value = { ...siteContent.about }\n  if (siteContent.tracks) trilhas.value = [...siteContent.tracks]');

fs.writeFileSync('src/views/AdminDashboardView.vue', content, 'utf8');
