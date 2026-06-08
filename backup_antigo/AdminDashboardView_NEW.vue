<script setup>
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
</script>

<template>
  <div class="production-admin-wrapper flex min-h-screen bg-[#F1F3F5] text-[#1A1A1A] font-sans">
    
    <!-- GRID TEXTURE OVERLAY -->
    <div class="dot-grid fixed inset-0 opacity-[0.03] pointer-events-none"></div>

    <!-- SIDEBAR (Reference Logic) -->
    <aside class="sidebar-v2 w-[280px] bg-[#0F0F0F] text-white flex flex-col fixed h-full z-50 transition-all duration-300" :class="{ 'translate-x-[-280px]': !isMobileMenuOpen && isMobile }">
      
      <!-- LOGO AREA -->
      <div class="h-[100px] flex items-center px-10 border-b border-white/5">
        <div class="logo-v2 font-black text-2xl tracking-tighter leading-none">
          NP<span class="text-[#FF3C82]">ADMIN</span>
        </div>
      </div>

      <!-- NAVIGATION GROUPS (Functional Structure) -->
      <nav class="flex-1 py-8 px-6 space-y-10 overflow-y-auto custom-scrollbar">
        
        <!-- GROUP: CONTEÚDO -->
        <div class="nav-group">
          <label class="group-label">Conteúdo</label>
          <div class="space-y-1 mt-4">
            <button @click="selectTab('dashboard')" class="nav-btn" :class="{ active: activeTab === 'dashboard' }">
               <LayoutDashboard :size="18" /> Visão Geral
            </button>
            <button @click="selectTab('home')" class="nav-btn" :class="{ active: activeTab === 'home' }">
               <Home :size="18" /> Gestão da Home
            </button>
            <button @click="selectTab('editorial')" class="nav-btn" :class="{ active: activeTab === 'editorial' }">
               <FileText :size="18" /> Hub Editorial
            </button>
            <button @click="selectTab('newsletter')" class="nav-btn" :class="{ active: activeTab === 'newsletter' }">
               <Mail :size="18" /> Newsletter
            </button>
            <button @click="selectTab('sobre')" class="nav-btn" :class="{ active: activeTab === 'sobre' }">
               <User :size="18" /> Sobre Mim
            </button>
          </div>
        </div>

        <!-- GROUP: PLATAFORMA -->
        <div class="nav-group">
          <label class="group-label">Plataforma</label>
          <div class="space-y-1 mt-4">
            <button @click="selectTab('vagas')" class="nav-btn" :class="{ active: activeTab === 'vagas' }">
               <Megaphone :size="18" /> Oportunidades
            </button>
            <button @click="selectTab('lms')" class="nav-btn" :class="{ active: activeTab === 'lms' }">
               <Layers :size="18" /> Gestão LMS
            </button>
            <button @click="selectTab('servicos')" class="nav-btn" :class="{ active: activeTab === 'servicos' }">
               <Zap :size="18" /> Serviços
            </button>
            <button @click="selectTab('biblioteca')" class="nav-btn" :class="{ active: activeTab === 'biblioteca' }">
               <BookOpen :size="18" /> Biblioteca
            </button>
            <button @click="selectTab('projetos')" class="nav-btn" :class="{ active: activeTab === 'projetos' }">
               <Folder :size="18" /> Projetos
            </button>
            <button @click="selectTab('doacoes')" class="nav-btn" :class="{ active: activeTab === 'doacoes' }">
               <Heart :size="18" /> Doações
            </button>
          </div>
        </div>

        <!-- GROUP: SISTEMA -->
        <div class="nav-group">
          <label class="group-label">Sistema</label>
          <div class="space-y-1 mt-4">
            <button @click="selectTab('configuracoes')" class="nav-btn" :class="{ active: activeTab === 'configuracoes' }">
              <Settings :size="18" /> Configurações
            </button>
            <router-link to="/" class="nav-btn">
              <ExternalLink :size="18" /> Voltar ao Site
            </router-link>
            <button @click="handleLogout" class="nav-btn text-vermelho/80 hover:text-vermelho">
              <LogOut :size="18" /> Sair do painel
            </button>
          </div>
        </div>

      </nav>

      <!-- SIDEBAR FOOTER -->
      <div class="p-6 border-t border-white/5 bg-white/5">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-rosa flex items-center justify-center font-black border border-white/10 uppercase">{{ (user?.nome_completo || 'A').charAt(0) }}</div>
          <div class="flex-1 min-w-0">
             <div class="font-bold text-sm truncate">Anne Dornelas</div>
             <div class="text-[10px] opacity-40 uppercase tracking-widest font-black">Administradora</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- MOBILE OVERLAY -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/60 z-40 md:hidden" @click="isMobileMenuOpen = false"></div>

    <!-- MAIN CONTENT -->
    <main class="main-v2 flex-1 md:ml-[280px] min-h-screen relative">
      
      <!-- HEADER V2 (Functional parity with reference) -->
      <header class="h-[100px] flex items-center justify-between px-8 md:px-12 sticky top-0 bg-[#F1F3F5]/90 backdrop-blur-md z-30 border-b border-black/[0.05]">
        
        <!-- Left: Mobile Toggle & Title -->
        <div class="flex items-center gap-6">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-3 bg-[#0F0F0F] text-white rounded-xl shadow-lg">
             <Menu v-if="!isMobileMenuOpen" :size="24" />
             <X v-else :size="24" />
          </button>
          
          <!-- MOBILE LOGO -->
          <div class="md:hidden logo-v2 font-black text-xl tracking-tighter leading-none text-[#0F0F0F] uppercase">
            NARRATIVA <span class="text-[#FF3C82]">POLÍTICA</span>
          </div>

          <div class="hidden md:block">
            <h1 class="text-3xl font-black uppercase tracking-tight text-[#0F0F0F] leading-none">
              {{ {
                dashboard: 'Visão Geral',
                home: 'Gestão da Home',
                editorial: 'Hub Editorial',
                newsletter: 'Newsletter',
                sobre: 'Sobre Mim',
                vagas: 'Radar de Oportunidades',
                lms: 'Gestão LMS',
                servicos: 'Serviços',
                biblioteca: 'Biblioteca',
                projetos: 'Projetos',
                doacoes: 'Doações',
                configuracoes: 'Ajustes Globais'
              }[activeTab] }}
            </h1>
            <p class="text-[11px] font-black uppercase tracking-[3px] text-black/40 mt-2">
              Status: Operacional ● {{ new Date().toLocaleDateString('pt-BR') }}
            </p>
          </div>
        </div>

        <!-- Right: Global Actions -->
        <div class="flex items-center gap-4">
           <button @click="exportReport" class="header-action-btn hidden sm:flex">
             <Download :size="18" /> <span class="hidden lg:inline">RELATÓRIO</span>
           </button>
           <button @click="selectTab('editorial'); resetArtigoForm()" class="primary-cta-btn">
             <Plus :size="20" /> <span class="hidden sm:inline">NOVO ARTIGO</span>
           </button>
        </div>
      </header>

      <!-- CONTENT CONTAINER -->
      <div class="px-8 md:px-12 pb-24 max-w-[1400px]">
        
        <!-- LOADING / ERROR STATES -->
        <div v-if="isLoadingData && !siteContent.posts?.length" class="py-32 flex flex-col items-center justify-center animate-pulse">
           <div class="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
             <RefreshCw class="animate-spin text-black/20" :size="40" />
           </div>
           <p class="text-[11px] font-black uppercase tracking-widest text-black/40">Sincronizando dados estratégicos...</p>
        </div>

        <div v-else-if="hasLoadError" class="py-32 flex flex-col items-center text-center">
           <div class="w-20 h-20 bg-vermelho/10 text-vermelho rounded-full flex items-center justify-center mb-6 border-2 border-vermelho">
             <AlertCircle :size="40" />
           </div>
           <h3 class="text-2xl font-black mb-2">FALHA DE CONEXÃO</h3>
           <p class="text-black/50 max-w-sm mb-8 font-bold">Verifique sua conexão com o Supabase ou tente recarregar.</p>
           <button @click="loadData" class="primary-cta-btn bg-vermelho">TENTAR NOVAMENTE</button>
        </div>

        <!-- 1. VISÃO GERAL (DASHBOARD) -->
        <div v-else-if="activeTab === 'dashboard'" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
           
           <!-- METRICS GRID -->
           <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#FFDC00]"></div>
                   <div class="flex justify-between items-start mb-10">
                     <span class="card-label">Alcance Total</span>
                     <Globe :size="20" class="text-black/20" />
                   </div>
                   <div class="card-value">124<span class="text-[#FFDC00]">K</span></div>
                   <div class="card-trend text-[#A0D246]">+14.2% esta semana</div>
                 </div>
              </div>

              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#FF3C82]"></div>
                   <div class="flex justify-between items-start mb-10">
                     <span class="card-label">Assinantes Ativos</span>
                     <UserPlus :size="20" class="text-black/20" />
                   </div>
                   <div class="card-value">{{ subscribersCount }}</div>
                   <div class="card-trend text-[#FF3C82]">Base em expansão</div>
                 </div>
              </div>

              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#3C64E6]"></div>
                   <div class="flex justify-between items-start mb-10">
                     <span class="card-label">Artigos Ativos</span>
                     <FileText :size="20" class="text-black/20" />
                   </div>
                   <div class="card-value">{{ siteContent.posts?.length || 0 }}</div>
                   <div class="card-trend text-[#3C64E6]">{{ filterPublicPosts(siteContent.posts).length }} Publicados</div>
                 </div>
              </div>
           </section>

           <!-- SECONDARY GRID -->
           <section class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- ATIVIDADE RECENTE (Real Activity Log) -->
              <div class="lg:col-span-8 panel-v2 bg-white">
                 <div class="panel-header px-8 py-6 border-b border-black/[0.05] flex justify-between items-center">
                    <h3 class="panel-title">Log de Atividades</h3>
                    <button @click="selectTab('configuracoes')" class="panel-link">Ver Tudo <ChevronRight :size="14"/></button>
                 </div>
                 <div class="panel-body p-0 divide-y divide-black/[0.05]">
                    <div v-for="act in siteContent.lastActivity" :key="act.id" class="activity-item group">
                       <div class="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-rosa group-hover:text-white transition-all">
                          <component :is="act.type.includes('Artigo') ? FileText : act.type.includes('Home') ? Home : act.type.includes('Oportunidade') ? Megaphone : Edit2" :size="20" />
                       </div>
                       <div class="flex-1 min-w-0">
                         <div class="text-[10px] font-black text-black/30 uppercase tracking-widest mb-1">{{ act.type }}</div>
                         <h4 class="text-sm font-black uppercase truncate">{{ act.title }}</h4>
                         <span class="text-[9px] font-bold opacity-40 mt-1 block">{{ act.date }}</span>
                       </div>
                       <ChevronRight :size="14" class="opacity-10" />
                    </div>
                    <div v-if="!siteContent.lastActivity?.length" class="p-20 text-center text-black/20 font-black text-xs uppercase tracking-widest">Nenhum registro de atividade.</div>
                 </div>
              </div>

              <!-- SIDEBAR PANELS -->
              <div class="lg:col-span-4 space-y-8">
                 <!-- NEWSLETTER INFO -->
                 <div class="panel-v2 bg-[#0F0F0F] text-white overflow-hidden relative group">
                    <div class="absolute top-0 left-0 w-2 h-full bg-[#FFDC00]"></div>
                    <div class="p-10">
                       <h3 class="text-[#FFDC00] font-black text-lg flex items-center gap-3 mb-8 uppercase tracking-tighter">
                         <Mail :size="24" /> NEWSLETTER
                       </h3>
                       <div class="bg-white/5 border border-white/10 p-6 mb-10">
                          <span class="block text-[10px] font-black opacity-40 uppercase tracking-[3px] mb-2">Engajamento Médio</span>
                          <div class="text-5xl font-black text-[#FFDC00]">42.8%</div>
                       </div>
                       <button @click="selectTab('newsletter')" class="primary-cta-btn bg-[#FFDC00] text-black w-full py-5 shadow-none hover:bg-white">
                         NOVA EDIÇÃO
                       </button>
                    </div>
                 </div>

                 <!-- ATALHOS RÁPIDOS -->
                 <div class="panel-v2 bg-white p-8">
                    <h4 class="text-[11px] font-black text-black/30 uppercase tracking-[4px] text-center mb-8">Atalhos do Sistema</h4>
                    <div class="grid grid-cols-2 gap-4">
                       <router-link to="/" class="quick-action-btn">VER SITE</router-link>
                       <button @click="selectTab('configuracoes')" class="quick-action-btn">AJUSTES</button>
                       <button @click="selectTab('editorial')" class="quick-action-btn">POSTAR</button>
                       <button @click="selectTab('vagas')" class="quick-action-btn">VAGAS</button>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        <!-- 2. GESTÃO DA HOME (Parity with reference) -->
        <div v-else-if="activeTab === 'home'" class="space-y-12">
           <div class="panel-v2 bg-white p-12 shadow-production overflow-hidden">
              <div class="card-accent bg-[#FFDC00]"></div>
              <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">CONFIGURAÇÃO DA PÁGINA INICIAL</h3>
              
              <div class="space-y-12">
                 <!-- HERO SECTION -->
                 <div class="p-10 bg-[#F1F3F5] rounded-3xl border border-black/5">
                    <h4 class="text-xl font-black mb-8 flex items-center gap-3"><Layout :size="24" /> SEÇÃO HERO</h4>
                    <div class="grid md:grid-cols-2 gap-8">
                       <div class="input-v2"><label>Título (Parte 1)</label><input v-model="homeData.heroTitle" type="text" /></div>
                       <div class="input-v2"><label>Título em Destaque (Parte 2)</label><input v-model="homeData.heroTitleAccent" type="text" /></div>
                    </div>
                    <div class="input-v2 mt-8"><label>Subtítulo / Manifesto</label><textarea v-model="homeData.heroDescription" rows="4"></textarea></div>
                    <div class="grid md:grid-cols-2 gap-8 mt-8">
                       <div class="input-v2"><label>Texto do Botão Hero</label><input v-model="homeData.heroButtonText" type="text" /></div>
                       <div class="input-v2"><label>Tamanho da Fonte (Rem)</label><input v-model="homeData.heroFontSize" type="text" /></div>
                    </div>
                 </div>

                 <!-- MARQUEE & RADAR -->
                 <div class="grid lg:grid-cols-2 gap-12">
                    <div class="p-10 bg-white border-thick rounded-3xl">
                       <h4 class="text-lg font-black mb-6 uppercase">Faixa Marquee</h4>
                       <div class="input-v2"><label>Texto em Movimento</label><input v-model="homeData.marqueeText" type="text" /></div>
                       <div class="input-v2 mt-6"><label>Espaçamento (Rem)</label><input v-model="homeData.marqueePadding" type="text" /></div>
                    </div>
                    <div class="p-10 bg-white border-thick rounded-3xl">
                       <h4 class="text-lg font-black mb-6 uppercase">Radar Editorial</h4>
                       <div class="input-v2"><label>Título do Bloco</label><input v-model="homeData.radarEditorialTitle" type="text" /></div>
                       <div class="input-v2 mt-6"><label>Subtítulo</label><input v-model="homeData.radarEditorialSubtitle" type="text" /></div>
                    </div>
                 </div>

                 <!-- NEWSLETTER CONFIG (PRODUCTION STYLE) -->
                 <div class="p-10 bg-preto text-white rounded-3xl border-thick">
                    <h4 class="text-xl font-black mb-8 text-[#FFDC00] uppercase">BLOCO DE CONVERSÃO (NEWSLETTER)</h4>
                    <div class="grid md:grid-cols-2 gap-8">
                       <div class="input-v2"><label class="!text-white/40">Chamada (Eyebrow)</label><input v-model="homeData.newsletterEyebrow" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
                       <div class="input-v2"><label class="!text-white/40">Título Principal</label><input v-model="homeData.newsletterTitle" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
                    </div>
                    <div class="input-v2 mt-8"><label class="!text-white/40">Descrição de Apoio</label><textarea v-model="homeData.newsletterDescription" rows="3" class="!bg-white/5 !text-white !border-white/10"></textarea></div>
                    <div class="grid md:grid-cols-2 gap-8 mt-8">
                       <div class="input-v2"><label class="!text-white/40">Placeholder do E-mail</label><input v-model="homeData.newsletterPlaceholder" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
                       <div class="input-v2"><label class="!text-white/40">Texto do Botão</label><input v-model="homeData.newsletterButton" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
                    </div>
                 </div>

                 <button @click="saveHome" :disabled="isSaving" class="primary-cta-btn bg-[#FFDC00] text-black w-full py-6 text-xl">
                    {{ isSaving ? 'SINCRONIZANDO...' : 'SALVAR TODAS AS MUDANÇAS DA HOME' }}
                 </button>
              </div>
           </div>
        </div>

        <!-- 3. HUB EDITORIAL (Articles CRUD) -->
        <div v-else-if="activeTab === 'editorial'" class="space-y-12">
           <div id="form-anchor" class="panel-v2 bg-white overflow-hidden">
              <div class="card-accent bg-[#FF3C82]"></div>
              <div class="p-12">
                 <h3 class="text-3xl font-black mb-12 flex items-center gap-4 uppercase tracking-tighter">
                    <component :is="isEditingArtigo ? Edit : Plus" :size="32" class="text-[#FF3C82]" />
                    {{ isEditingArtigo ? 'Editando Artigo' : 'Publicar Novo Conteúdo' }}
                 </h3>
                 <div class="grid lg:grid-cols-12 gap-16">
                    <div class="lg:col-span-8 space-y-10">
                       <div class="input-v2"><label>Título</label><input v-model="novoArtigo.title" type="text" /></div>
                       <div class="grid md:grid-cols-2 gap-10">
                          <div class="input-v2"><label>Categoria</label><select v-model="novoArtigo.category"><option v-for="cat in categoriasDisponiveis" :key="cat" :value="cat">{{ cat }}</option></select></div>
                          <div class="input-v2"><label>Autor</label><input v-model="novoArtigo.author" type="text" /></div>
                       </div>
                       <div class="input-v2"><label>Resumo / Subtítulo</label><textarea v-model="novoArtigo.subtitle" rows="2"></textarea></div>
                       <div class="input-v2"><label>Conteúdo (Editorial)</label><BrutalEditor v-model="novoArtigo.content" /></div>
                    </div>
                    <div class="lg:col-span-4 space-y-10">
                       <div class="input-v2"><label>Capa do Artigo</label><ImageUploader v-model="novoArtigo.image" /></div>
                       <div class="p-8 bg-[#F1F3F5] rounded-3xl border border-black/5">
                          <label class="block text-[10px] font-black opacity-30 uppercase tracking-widest mb-6">Status & Destaque</label>
                          <div class="flex items-center gap-4 mb-4"><input type="checkbox" v-model="novoArtigo.featured" class="w-6 h-6 accent-black" /> <span class="font-black text-xs">DESTAQUE NA HOME</span></div>
                          <select v-model="novoArtigo.status" class="w-full p-4 border-thick rounded-xl font-bold uppercase text-xs"><option value="publicado">Publicado</option><option value="rascunho">Rascunho</option></select>
                       </div>
                       <button @click="saveArtigo()" :disabled="isSaving" class="primary-cta-btn bg-[#FF3C82] w-full py-5">{{ isSaving ? 'SALVANDO...' : 'SALVAR ARTIGO' }}</button>
                       <button v-if="isEditingArtigo" @click="resetArtigoForm" class="header-action-btn w-full">CANCELAR EDIÇÃO</button>
                    </div>
                 </div>
              </div>
           </div>

           <div class="panel-v2 bg-white overflow-hidden">
              <table class="production-table">
                 <thead><tr><th>Capa</th><th>Artigo</th><th>Status</th><th class="text-right">Ações</th></tr></thead>
                 <tbody>
                    <tr v-for="art in siteContent.posts" :key="art.id">
                       <td class="w-32"><div class="h-16 w-24 bg-creme border rounded-lg overflow-hidden halftone"><img :src="art.image" class="w-full h-full object-cover" /></div></td>
                       <td><div class="font-black text-sm uppercase">{{ art.title }}</div><div class="text-[9px] opacity-40 font-bold tracking-widest mt-1">{{ art.category }} ● {{ new Date(art.date).toLocaleDateString() }}</div></td>
                       <td><span class="prod-status-badge" :class="art.status">{{ art.status?.toUpperCase() || 'PUBLICADO' }}</span></td>
                       <td class="text-right"><div class="flex justify-end gap-2"><button @click="editArtigo(art)" class="prod-icon-btn"><Edit :size="16"/></button><button @click="deleteArtigo(art)" class="prod-icon-btn hover:!bg-vermelho hover:!text-white"><Trash :size="16"/></button></div></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

        <!-- 4. NEWSLETTER (Arquivo & Novo Envio) -->
        <div v-else-if="activeTab === 'newsletter'" class="grid lg:grid-cols-12 gap-12">
           <div class="lg:col-span-8 panel-v2 bg-white overflow-hidden">
              <div class="card-accent bg-[#A0D246]"></div>
              <div class="p-12">
                 <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">REDIGIR NEWSLETTER</h3>
                 <div class="space-y-10">
                    <div class="input-v2"><label>Título do Despacho</label><input v-model="novaNewsletter.titulo" type="text" /></div>
                    <div class="input-v2"><label>Corpo Editorial</label><BrutalEditor v-model="novaNewsletter.conteudo" /></div>
                    <button @click="saveNewsletter" class="primary-cta-btn bg-[#A0D246] text-black w-full py-5 text-lg">DISPARAR E ARQUIVAR</button>
                 </div>
              </div>
           </div>
           <div class="lg:col-span-4 space-y-8">
              <div class="panel-v2 bg-[#0F0F0F] text-white p-12 text-center">
                 <div class="text-[#FFDC00] text-7xl font-black mb-2">{{ subscribersCount }}</div>
                 <p class="text-[10px] font-black uppercase tracking-[5px] opacity-40">ASSINANTES ATIVOS</p>
                 <button class="header-action-btn border-white/20 text-white w-full mt-12">EXPORTAR BASE CSV</button>
              </div>
              <div class="panel-v2 bg-white p-8">
                 <h4 class="text-[10px] font-black uppercase text-black/30 mb-8 text-center tracking-widest">HISTÓRICO RECENTE</h4>
                 <div class="space-y-4">
                    <div v-for="nl in siteContent.newsletters?.slice(0,5)" :key="nl.id" class="p-4 rounded-xl bg-creme/30 border border-black/5">
                       <div class="font-black text-sm uppercase truncate">{{ nl.titulo }}</div>
                       <div class="text-[9px] opacity-30 mt-1">{{ new Date(nl.enviado_em).toLocaleDateString() }}</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- 5. SOBRE MIM -->
        <div v-else-if="activeTab === 'sobre'" class="panel-v2 bg-white p-12 overflow-hidden">
           <div class="card-accent bg-[#FF3C82]"></div>
           <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">PERFIL INSTITUCIONAL</h3>
           <div class="grid lg:grid-cols-12 gap-16">
              <div class="lg:col-span-8 space-y-10">
                 <div class="input-v2"><label>Nome Público</label><input v-model="sobreData.name" type="text" /></div>
                 <div class="input-v2"><label>Cargo / Especialidade</label><input v-model="sobreData.role" type="text" /></div>
                 <div class="input-v2"><label>Bio Narrativa</label><textarea v-model="sobreData.bioInstitucional" rows="8"></textarea></div>
                 <div class="input-v2"><label>Expertise (Separe por vírgula)</label><input v-model="sobreData.expertise" type="text" /></div>
              </div>
              <div class="lg:col-span-4 space-y-10">
                 <div class="input-v2"><label>Foto de Perfil</label><ImageUploader v-model="sobreData.image" /></div>
                 <button @click="saveSobre" class="primary-cta-btn bg-[#FF3C82] w-full py-5">SALVAR PERFIL</button>
              </div>
           </div>
        </div>

        <!-- 6. OPORTUNIDADES -->
        <div v-else-if="activeTab === 'vagas'" class="space-y-12">
           <div id="form-anchor" class="panel-v2 bg-white p-12 overflow-hidden">
              <div class="card-accent bg-[#FFDC00]"></div>
              <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">{{ isEditingVaga ? 'Editando Vaga' : 'Cadastrar Oportunidade' }}</h3>
              <div class="grid lg:grid-cols-12 gap-16">
                 <div class="lg:col-span-8 space-y-10">
                    <div class="input-v2"><label>Título</label><input v-model="novaVaga.title" type="text" /></div>
                    <div class="grid md:grid-cols-2 gap-10">
                       <div class="input-v2"><label>Categoria</label><select v-model="novaVaga.category"><option v-for="c in ['Vagas de Emprego', 'Bolsas', 'Editais', 'Estudos']" :key="c" :value="c">{{c}}</option></select></div>
                       <div class="input-v2"><label>Deadline</label><input v-model="novaVaga.deadline" type="text" /></div>
                    </div>
                    <div class="input-v2"><label>Link de Inscrição</label><input v-model="novaVaga.link" type="text" /></div>
                 </div>
                 <div class="lg:col-span-4 space-y-10">
                    <div class="input-v2"><label>Status</label><select v-model="novaVaga.status"><option value="approved">Publicada</option><option value="pending">Em Revisão</option></select></div>
                    <button @click="saveVaga" class="primary-cta-btn bg-[#FFDC00] text-black w-full py-5">SALVAR VAGA</button>
                    <button v-if="isEditingVaga" @click="resetVagaForm" class="header-action-btn w-full">CANCELAR</button>
                 </div>
              </div>
           </div>
           <div class="panel-v2 bg-white overflow-hidden">
              <table class="production-table">
                 <thead><tr><th>Vaga</th><th>Deadline</th><th>Status</th><th class="text-right">Ações</th></tr></thead>
                 <tbody>
                    <tr v-for="v in siteContent.opportunities" :key="v.id">
                       <td><div class="font-black text-sm uppercase">{{ v.title }}</div><div class="text-[9px] opacity-40 font-bold uppercase mt-1">{{ v.category }}</div></td>
                       <td class="font-black text-vermelho">{{ v.deadline }}</td>
                       <td><span class="prod-status-badge" :class="getOpportunityVisibilityState(v) === 'public' ? 'publicado' : 'rascunho'">{{ opportunityStatusLabel(v) }}</span></td>
                       <td class="text-right"><div class="flex justify-end gap-2"><button @click="editVaga(v)" class="prod-icon-btn"><Edit :size="16"/></button><button @click="deleteVaga(v)" class="prod-icon-btn hover:!bg-vermelho hover:!text-white"><Trash :size="16"/></button></div></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

        <!-- 7. GESTÃO LMS -->
        <div v-else-if="activeTab === 'lms'" class="panel-v2 bg-white p-20 text-center">
           <Layers :size="64" class="mx-auto mb-8 opacity-10" />
           <h3 class="text-2xl font-black mb-4 uppercase">SISTEMA LMS</h3>
           <p class="text-black/40 font-bold mb-10">Gerenciamento de aulas e módulos está em fase de transição para esta nova interface.</p>
           <div class="max-w-xs mx-auto"><button class="primary-cta-btn !bg-azul w-full">SOLICITAR ATIVAÇÃO</button></div>
        </div>

        <!-- 8. PROJETOS -->
        <div v-else-if="activeTab === 'projetos'" class="space-y-12">
           <div id="form-anchor" class="panel-v2 bg-white p-12">
              <div class="card-accent bg-[#3C64E6]"></div>
              <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">{{ isEditingProject ? 'Editando Case' : 'Novo Case de Impacto' }}</h3>
              <div class="grid lg:grid-cols-12 gap-16">
                 <div class="lg:col-span-8 space-y-10">
                    <div class="input-v2"><label>Título do Projeto</label><input v-model="novoProjeto.title" type="text" /></div>
                    <div class="input-v2"><label>Descrição Curta</label><textarea v-model="novoProjeto.description" rows="3"></textarea></div>
                    <div class="input-v2"><label>Métrica de Impacto (Ex: +500 LÍDERES)</label><input v-model="novoProjeto.impact" type="text" /></div>
                 </div>
                 <div class="lg:col-span-4 space-y-10">
                    <div class="input-v2"><label>Imagem do Case</label><ImageUploader v-model="novoProjeto.image" /></div>
                    <button @click="saveProjeto" class="primary-cta-btn bg-[#3C64E6] w-full py-5">SALVAR PROJETO</button>
                    <button v-if="isEditingProject" @click="resetProjetoForm" class="header-action-btn w-full">CANCELAR</button>
                 </div>
              </div>
           </div>
           <div class="panel-v2 bg-white overflow-hidden">
              <table class="production-table">
                 <thead><tr><th>Projeto</th><th>Impacto</th><th class="text-right">Ações</th></tr></thead>
                 <tbody>
                    <tr v-for="p in siteContent.projects" :key="p.id">
                       <td><div class="font-black text-sm uppercase">{{ p.title }}</div></td>
                       <td><div class="tag-solid bg-vermelho text-white">{{ p.impact }}</div></td>
                       <td class="text-right"><div class="flex justify-end gap-2"><button @click="editProjeto(p)" class="prod-icon-btn"><Edit :size="16"/></button><button @click="deleteProjeto(p)" class="prod-icon-btn hover:!bg-vermelho hover:!text-white"><Trash :size="16"/></button></div></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

        <!-- 9. CONFIGURAÇÕES -->
        <div v-else-if="activeTab === 'configuracoes'" class="grid lg:grid-cols-2 gap-12">
           <div class="panel-v2 bg-white p-12 overflow-hidden shadow-production">
              <div class="card-accent bg-[#3C64E6]"></div>
              <h3 class="text-2xl font-black mb-12 uppercase tracking-tighter">AJUSTES DO SISTEMA</h3>
              <div class="space-y-8">
                 <div class="input-v2"><label>Nome da Plataforma</label><input v-model="settingsData.siteName" type="text" /></div>
                 <div class="input-v2"><label>Slogan de Impacto</label><input v-model="settingsData.siteTagline" type="text" /></div>
                 <div class="input-v2"><label>E-mail de Resposta</label><input v-model="settingsData.contactEmail" type="email" /></div>
                 <button @click="saveSettings" class="primary-cta-btn bg-[#3C64E6] w-full py-5">ATUALIZAR PLATAFORMA</button>
              </div>
           </div>
           <div class="panel-v2 bg-white p-12 overflow-hidden shadow-production">
              <div class="card-accent bg-[#FFDC00]"></div>
              <h3 class="text-2xl font-black mb-12 uppercase tracking-tighter">MÓDULOS DE NAVEGAÇÃO</h3>
              <div class="grid sm:grid-cols-2 gap-6">
                 <div v-for="(val, key) in {
                   'menuArticles': 'Artigos',
                   'menuOpportunities': 'Vagas',
                   'menuServices': 'Serviços',
                   'menuProjects': 'Projetos',
                   'menuLibrary': 'Biblioteca',
                   'showLogin': 'Área Aluno'
                 }" :key="key" class="p-6 rounded-3xl bg-[#F1F3F5] border border-black/5 flex items-center gap-4">
                    <input type="checkbox" v-model="settingsData[key]" class="w-6 h-6 accent-black" />
                    <span class="font-black text-[11px] uppercase tracking-tight">{{ val }}</span>
                 </div>
              </div>
              <button @click="saveSettings" class="header-action-btn w-full mt-12 py-5 uppercase font-black">Sincronizar Menu</button>
           </div>
        </div>

        <!-- OUTRAS TABS (Placeholder Layout para manter consistência) -->
        <div v-else class="panel-v2 bg-white p-20 text-center">
           <Layout :size="64" class="mx-auto mb-8 opacity-10" />
           <h3 class="text-2xl font-black mb-4 uppercase">INTERFACE EM CONSTRUÇÃO</h3>
           <p class="text-black/40 font-bold max-w-sm mx-auto">Este módulo será integrado à nova arquitetura de produção em breve.</p>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
/* ============================================================
   ADMIN PRODUCTION SYSTEM V2 — FINAL REFINEMENT
   ============================================================ */

.production-admin-wrapper { overflow-x: hidden; }

/* ── SIDEBAR STYLE ────────────────────────────── */
.nav-btn {
  width: 100%; display: flex; align-items: center; gap: 14px; padding: 14px 18px;
  border-radius: 14px; font-weight: 800; font-size: 13px; text-transform: uppercase;
  color: rgba(255,255,255,0.4); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer; border: 1.5px solid transparent; text-align: left;
  background: transparent;
}
.nav-btn:hover { color: white; background: rgba(255,255,255,0.05); }
.nav-btn.active {
  color: white; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.1);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.group-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.2); padding-left: 18px; }

/* ── CARDS & PANELS ────────────────────────────── */
.panel-v2 { border-radius: 24px; border: 2.5px solid #0F0F0F; box-shadow: 8px 8px 0px #0F0F0F; position: relative; }
.shadow-production { box-shadow: 8px 8px 0px #0F0F0F; }

.card-accent { position: absolute; top: 0; left: 0; right: 0; height: 8px; border-bottom: 2.5px solid #0F0F0F; }

.metric-card-v2 {
  border-radius: 24px; border: 2.5px solid #0F0F0F; box-shadow: 8px 8px 0px #0F0F0F;
  position: relative; overflow: hidden; transition: transform 0.3s ease;
}
.metric-card-v2:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0px #0F0F0F; }
.card-inner { padding: 40px; position: relative; z-index: 10; }
.card-label { font-family: 'Archivo Black', sans-serif; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: rgba(0,0,0,0.3); }
.card-value { font-size: 64px; font-weight: 900; letter-spacing: -3px; line-height: 1; margin-top: 10px; }
.card-trend { font-family: 'Archivo Black', sans-serif; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-top: 24px; }

/* ── BUTTONS ──────────────────────────────────── */
.primary-cta-btn {
  background: #0F0F0F; color: white; border: 2.5px solid #0F0F0F;
  padding: 14px 28px; border-radius: 16px; font-weight: 900; text-transform: uppercase;
  font-size: 12px; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1); transition: all 0.2s; cursor: pointer;
}
.primary-cta-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #0F0F0F; }
.primary-cta-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.header-action-btn {
  background: white; color: #0F0F0F; border: 2.5px solid #0F0F0F;
  padding: 14px 24px; border-radius: 16px; font-weight: 900; text-transform: uppercase;
  font-size: 11px; letter-spacing: 1px; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.header-action-btn:hover { background: #F1F3F5; transform: translateY(-2px); }

.quick-action-btn {
  display: block; padding: 20px; border-radius: 16px; border: 2.5px solid #0F0F0F;
  background: #F1F3F5; font-weight: 900; text-transform: uppercase; font-size: 11px;
  letter-spacing: 2px; text-align: center; transition: all 0.2s;
}
.quick-action-btn:hover { background: white; transform: translate(-3px, -3px); box-shadow: 5px 5px 0px #0F0F0F; }

/* ── INPUTS ───────────────────────────────────── */
.input-v2 label { display: block; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: rgba(0,0,0,0.4); margin-bottom: 12px; }
.input-v2 input, .input-v2 select, .input-v2 textarea {
  width: 100%; padding: 20px; border-radius: 18px; border: 2.5px solid #0F0F0F;
  background: white; font-weight: 700; font-size: 16px; outline: none; transition: all 0.2s;
}
.input-v2 input:focus, .input-v2 textarea:focus, .input-v2 select:focus { 
  box-shadow: 8px 8px 0px var(--np-rosa); 
  transform: translate(-4px, -4px);
  background: #F8FAFC; 
}

/* ── TABLE ────────────────────────────────────── */
.production-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.production-table th { padding: 30px; background: #F8FAFC; text-align: left; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: rgba(0,0,0,0.3); border-bottom: 2.5px solid #0F0F0F; }
.production-table td { padding: 30px; border-bottom: 1.5px solid #F1F3F5; }

.prod-status-badge { display: inline-block; padding: 6px 14px; border-radius: 8px; font-size: 9px; font-weight: 900; background: #E2E8F0; color: #475569; text-transform: uppercase; }
.prod-status-badge.publicado { background: rgba(160, 210, 70, 0.2); color: #A0D246; border: 1.5px solid #A0D246; }

.prod-icon-btn { width: 44px; height: 44px; border-radius: 12px; border: 2.5px solid #0F0F0F; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; background: white; }
.prod-icon-btn:hover { background: #0F0F0F; color: white; transform: translateY(-2px); }

/* ── ACTIVITY ITEMS ───────────────────────────── */
.activity-item { display: flex; align-items: center; gap: 32px; padding: 32px; cursor: pointer; transition: background 0.2s; }
.activity-item:hover { background: #F8FAFC; }

/* ── RESPONSIVE ───────────────────────────────── */
@media (max-width: 768px) {
  .main-v2 { margin-left: 0; }
  .tab-title { font-size: 28px; }
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
</style>
