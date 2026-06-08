
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { supabase } from '../lib/supabase'
import { 
  Settings, LogOut, Home, FileText, User, Mail, Folder, Download, 
  Plus, Edit, Trash, LayoutDashboard, Megaphone, Rocket, Globe, UserPlus, 
  Edit2, Send, Save, ArrowLeft, ExternalLink, Zap, ChevronRight, AlertCircle, 
  RefreshCw, Layers, BookOpen, Heart, Menu, X, Play, CreditCard, Layout
} from 'lucide-vue-next'
import BrutalEditor from '../components/BrutalEditor.vue'
import ImageUploader from '../components/ImageUploader.vue'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { 
  siteContent, fetchAllContent, getOpportunityVisibilityState, 
  logActivity, parseOpportunityDeadline, filterPublicPosts, saveContent 
} from '../store/content'

const router = useRouter()
const { user, logout } = useAuth()
const activeTab = ref('dashboard')
const isSaving = ref(false)
const isLoadingData = ref(false)
const hasLoadError = ref(false)
const isMobileMenuOpen = ref(false)

// --- FORMS DEFAULT ---
const defaultArticleForm = () => ({ title: '', subtitle: '', author: 'Anne Dornelas', type: 'Artigo', category: 'Política', featured: false, content: '', image: '', imageDescription: '', imageCaption: '', references: '', highlightQuote: '', status: 'publicado' })
const defaultOpportunityForm = () => ({ title: '', category: 'Vagas de Emprego', type: 'Remoto', location: '', deadline: '', link: '', description: '', fullDescription: '', image: '', status: 'approved', sourceUrl: '', reviewNotes: '', featured: false, showOnHome: false })
const defaultProjectForm = () => ({ title: '', organization: '', description: '', impact: '', image: '', tags: '', status: 'publicado' })
const defaultServiceForm = () => ({ title: '', description: '', icon: 'Zap', bg: '#FF6BCA', textColor: '#FFFFFF' })
const defaultLibraryForm = () => ({ title: '', description: '', category: 'Relatório', fileUrl: '', externalLink: '', status: 'publicado' })

// --- EDITING STATES ---
const editingArtigoId = ref(null)
const editingVagaId = ref(null)
const editingProjectId = ref(null)
const editingServicoId = ref(null)
const editingLibraryId = ref(null)

const isEditingArtigo = computed(() => editingArtigoId.value !== null)
const isEditingVaga = computed(() => editingVagaId.value !== null)
const isEditingProject = computed(() => editingProjectId.value !== null)
const isEditingServico = computed(() => editingServicoId.value !== null)
const isEditingLibrary = computed(() => editingLibraryId.value !== null)

// --- REFS PARA DADOS ---
const novoArtigo = ref(defaultArticleForm())
const novaVaga = ref(defaultOpportunityForm())
const novoProjeto = ref(defaultProjectForm())
const novoServico = ref(defaultServiceForm())
const novoLibrary = ref(defaultLibraryForm())
const novaNewsletter = ref({ titulo: '', descricao: '', conteudo: '', capa_url: '', tag: 'Newsletter' })

// ... (métodos de salvamento anteriores mantidos)

const saveServico = async () => {
  if (!novoServico.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const list = [...(siteContent.services || [])]
    const payload = { ...novoServico.value, id: editingServicoId.value || Date.now() }
    const idx = list.findIndex(s => s.id === payload.id)
    if (idx !== -1) list[idx] = payload; else list.unshift(payload)
    siteContent.services = list
    await persistSiteSetting('services', list)
    await recordActivity(`Serviço/Eixo: ${payload.title}`, editingServicoId.value ? 'Edição' : 'Cadastro')
    resetServicoForm()
    alert('Serviço salvo!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetServicoForm = () => { novoServico.value = defaultServiceForm(); editingServicoId.value = null }
const editServico = (s) => { editingServicoId.value = s.id; novoServico.value = { ...s }; scrollToForm('form-anchor') }
const deleteServico = async (s) => {
  if (!confirm('Excluir este eixo de ação?')) return
  siteContent.services = (siteContent.services || []).filter(item => item.id !== s.id)
  await persistSiteSetting('services', siteContent.services)
}

const saveLibrary = async () => {
  if (!novoLibrary.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const list = [...(siteContent.library || [])]
    const payload = { ...novoLibrary.value, id: editingLibraryId.value || Date.now() }
    const idx = list.findIndex(l => l.id === payload.id)
    if (idx !== -1) list[idx] = payload; else list.unshift(payload)
    siteContent.library = list
    await persistSiteSetting('library', list)
    await recordActivity(`Documento: ${payload.title}`, editingLibraryId.value ? 'Edição' : 'Cadastro')
    resetLibraryForm()
    alert('Documento salvo na biblioteca!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetLibraryForm = () => { novoLibrary.value = defaultLibraryForm(); editingLibraryId.value = null }
const editLibrary = (l) => { editingLibraryId.value = l.id; novoLibrary.value = { ...l }; scrollToForm('form-anchor') }
const deleteLibrary = async (l) => {
  if (!confirm('Excluir documento?')) return
  siteContent.library = (siteContent.library || []).filter(item => item.id !== l.id)
  await persistSiteSetting('library', siteContent.library)
}


const homeData = ref({})
const sobreData = ref({})
const settingsData = ref({})
const articlesConfigData = ref({})
const oppsConfigData = ref({})
const servicosConfigData = ref({})
const bibliotecaConfigData = ref({})
const donateConfigData = ref({})

const categoriasDisponiveis = ref(['Mobilização', 'Educação', 'Clima', 'Notícias', 'Análise', 'Gênero', 'Política'])

// --- MÉTODOS ---
const scrollToForm = (id) => {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const handleLogout = () => {
  logout()
  router.push('/login')
}

const recordActivity = async (title, type = 'Edição') => {
  logActivity(title, type)
  if (supabase) {
    await supabase.from('site_settings').upsert({ key: 'lastActivity', value: siteContent.lastActivity })
  }
}

const persistSiteSetting = async (key, value) => {
  if (!supabase) return
  const { error } = await supabase.from('site_settings').upsert({ key, value })
  if (error) throw error
}

const loadData = async () => {
  isLoadingData.value = true
  hasLoadError.value = false
  try {
    const result = await fetchAllContent({ isAdmin: true })
    if (!result.success) {
      console.warn('Falha parcial no carregamento:', result.error)
    }
    syncLocalRefs()
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    hasLoadError.value = true
  } finally {
    isLoadingData.value = false
  }
}

const syncLocalRefs = () => {
  if (siteContent.home) homeData.value = { ...siteContent.home }
  if (siteContent.about) sobreData.value = { ...siteContent.about }
  if (siteContent.settings) settingsData.value = { ...siteContent.settings }
  if (siteContent.articlesConfig) articlesConfigData.value = { ...siteContent.articlesConfig }
  if (siteContent.opportunitiesConfig) oppsConfigData.value = { ...siteContent.opportunitiesConfig }
  if (siteContent.servicesConfig) servicosConfigData.value = { ...siteContent.servicesConfig }
  if (siteContent.libraryConfig) bibliotecaConfigData.value = { ...siteContent.libraryConfig }
  if (siteContent.donateConfig) donateConfigData.value = { ...siteContent.donateConfig }
}

// --- SALVAMENTO GERAL ---
const saveHome = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.home, homeData.value)
    await persistSiteSetting('home', homeData.value)
    await recordActivity('Página Inicial', 'Configuração Home')
    alert('Home salva com sucesso!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}

const saveArtigo = async (statusOverride = null) => {
  if (!novoArtigo.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const payload = {
      ...novoArtigo.value,
      status: statusOverride || novoArtigo.value.status || 'publicado',
      date: editingArtigoId.value ? (siteContent.posts.find(p => p.id === editingArtigoId.value)?.date) : new Date().toISOString()
    }
    if (editingArtigoId.value) payload.id = editingArtigoId.value
    if (supabase) {
      const { data, error } = await supabase.from('articles').upsert(payload)
      if (error) throw error
    }
    await fetchAllContent({ isAdmin: true })
    await recordActivity(`Artigo: ${payload.title}`, editingArtigoId.value ? 'Edição' : 'Publicação')
    resetArtigoForm()
    alert('Artigo salvo!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetArtigoForm = () => { novoArtigo.value = defaultArticleForm(); editingArtigoId.value = null }
const editArtigo = (art) => { editingArtigoId.value = art.id; novoArtigo.value = { ...art }; selectTab('editorial'); scrollToForm('form-anchor') }
const deleteArtigo = async (art) => {
  if (!confirm(`Excluir "${art.title}"?`)) return
  if (supabase) await supabase.from('articles').delete().eq('id', art.id)
  await fetchAllContent({ isAdmin: true })
  await recordActivity(`Exclusão: ${art.title}`, 'Exclusão Artigo')
}

const saveVaga = async () => {
  if (!novaVaga.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const payload = { ...novaVaga.value }
    if (editingVagaId.value) payload.id = editingVagaId.value
    if (supabase) {
       const { error } = await supabase.from('opportunities').upsert(payload)
       if (error) throw error
    }
    await fetchAllContent({ isAdmin: true })
    await recordActivity(`Oportunidade: ${payload.title}`, editingVagaId.value ? 'Edição' : 'Cadastro')
    resetVagaForm()
    alert('Oportunidade salva!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetVagaForm = () => { novaVaga.value = defaultOpportunityForm(); editingVagaId.value = null }
const editVaga = (v) => { editingVagaId.value = v.id; novaVaga.value = { ...v }; scrollToForm('form-anchor') }
const deleteVaga = async (v) => {
  if (!confirm('Excluir?')) return
  if (supabase) await supabase.from('opportunities').delete().eq('id', v.id)
  await fetchAllContent({ isAdmin: true })
  await recordActivity(`Exclusão Oportunidade: ${v.title}`, 'Exclusão')
}

const saveProjeto = async () => {
  if (!novoProjeto.value.title) return alert("Título obrigatório.")
  isSaving.value = true
  try {
    const list = [...(siteContent.projects || [])]
    const payload = { ...novoProjeto.value, id: editingProjectId.value || Date.now() }
    const idx = list.findIndex(p => p.id === payload.id)
    if (idx !== -1) list[idx] = payload; else list.unshift(payload)
    siteContent.projects = list
    await persistSiteSetting('projects', list)
    await recordActivity(`Projeto: ${payload.title}`, editingProjectId.value ? 'Edição' : 'Cadastro')
    resetProjetoForm()
    alert('Projeto salvo!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}
const resetProjetoForm = () => { novoProjeto.value = defaultProjectForm(); editingProjectId.value = null }
const editProjeto = (p) => { editingProjectId.value = p.id; novoProjeto.value = { ...p }; scrollToForm('form-anchor') }
const deleteProjeto = async (p) => {
  if (!confirm('Excluir projeto?')) return
  siteContent.projects = (siteContent.projects || []).filter(item => item.id !== p.id)
  await persistSiteSetting('projects', siteContent.projects)
  await recordActivity(`Exclusão Projeto: ${p.title}`, 'Exclusão')
}

const saveNewsletter = async () => {
  if (!novaNewsletter.value.titulo || !novaNewsletter.value.conteudo) return alert("Preencha título e conteúdo.")
  isSaving.value = true
  try {
    const payload = { ...novaNewsletter.value, enviado_em: new Date().toISOString() }
    if (supabase) {
      const { error } = await supabase.from('newsletters').insert([payload])
      if (error) throw error
    }
    await fetchAllContent({ isAdmin: true })
    await recordActivity(`Newsletter: ${payload.titulo}`, 'Envio/Arquivo')
    alert('Newsletter enviada e salva!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}

const saveSobre = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.about, sobreData.value)
    await persistSiteSetting('about', sobreData.value)
    await recordActivity('Perfil Institucional', 'Configuração')
    alert('Perfil salvo!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}

const saveSettings = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.settings, settingsData.value)
    await persistSiteSetting('settings', settingsData.value)
    await recordActivity('Configurações Globais', 'Configuração')
    alert('Ajustes sincronizados!')
  } catch(e) { alert('Erro: ' + e.message) } finally { isSaving.value = false }
}

const selectTab = (id) => {
  activeTab.value = id
  isMobileMenuOpen.value = false
  window.scrollTo(0, 0)
}

const isMobile = ref(false)
const updateIsMobile = () => { isMobile.value = window.innerWidth < 768 }

onMounted(() => {
  loadData()
  if (!user.value) router.push('/login')
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const recentPosts = computed(() => (siteContent.posts || []).slice(0, 3))
const subscribersCount = computed(() => siteContent.subscribers?.length || 0)
const opportunityStatusLabel = (vaga) => {
  const s = getOpportunityVisibilityState(vaga)
  return { public: 'PUBLICADA', pending: 'REVISÃO', rejected: 'REJEITADA' }[s] || 'OFFLINE'
}

const exportReport = () => {
  const data = JSON.stringify(siteContent, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `narrativa_report_${new Date().toISOString().slice(0,10)}.json`
  a.click()
}
