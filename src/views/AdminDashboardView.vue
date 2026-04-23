<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { supabase } from '../lib/supabase'
import { Settings, LogOut, CheckCircle, Clock, Trash2, Home, Search, BookOpen, Briefcase, ChevronDown, Package, FileText, User, Mail, Folder, Download, Eye, Heart, Library, Save, Plus } from 'lucide-vue-next'
import BrutalEditor from '../components/BrutalEditor.vue'
import ImageUploader from '../components/ImageUploader.vue'
import { siteContent, saveItemToSupabase } from '../store/content'

const router = useRouter()
const { user, logout } = useAuth()
const activeTab = ref('home')
const isSaving = ref(false)

// --- ESTADOS DO DASHBOARD ---
// NEWSLETTER
const newsletters = ref(siteContent.newsletters || [])
const inscritos = ref(siteContent.subscribers || [])
const novaNewsletter = ref({ titulo: '', descricao: '', conteudo: '', capa_url: '', tag: 'Política' })
const donateConfigData = ref({
  headlinePart1: siteContent.donateConfig?.headlinePart1 || '',
  headlinePart2: siteContent.donateConfig?.headlinePart2 || '',
  sub: siteContent.donateConfig?.sub || '',
  toggleLabelSingle: siteContent.donateConfig?.toggleLabelSingle || '',
  toggleLabelMonthly: siteContent.donateConfig?.toggleLabelMonthly || '',
  cardEyebrow: siteContent.donateConfig?.cardEyebrow || '',
  cardTitle: siteContent.donateConfig?.cardTitle || '',
  cardDesc: siteContent.donateConfig?.cardDesc || '',
  buttonText: siteContent.donateConfig?.buttonText || '',
  statsLeaders: siteContent.donateConfig?.stats?.leaders || '',
  statsCampaigns: siteContent.donateConfig?.stats?.campaigns || '',
  statsReports: siteContent.donateConfig?.stats?.reports || ''
})
const newsletterArchiveConfigData = ref({
  heroTitle1: siteContent.newsletterArchiveConfig?.heroTitle1 || '',
  heroTitle2: siteContent.newsletterArchiveConfig?.heroTitle2 || '',
  heroSubtitle: siteContent.newsletterArchiveConfig?.heroSubtitle || '',
  cardEyebrow: siteContent.newsletterArchiveConfig?.cardEyebrow || '',
  cardTitle: siteContent.newsletterArchiveConfig?.cardTitle || '',
  cardDesc: siteContent.newsletterArchiveConfig?.cardDesc || '',
  cardBtn: siteContent.newsletterArchiveConfig?.cardBtn || '',
  emptyState: siteContent.newsletterArchiveConfig?.emptyState || ''
})

// HOME
const homeData = ref({ 
  heroTitle: siteContent.home?.heroTitle || '', 
  heroTitleAccent: siteContent.home?.heroTitleAccent || '', 
  marqueeText: siteContent.home?.marqueeText || '',
  radarEditorialTitle: siteContent.home?.radarEditorialTitle || '', 
  radarEditorialSubtitle: siteContent.home?.radarEditorialSubtitle || '',
  eixosTitle: siteContent.home?.eixosTitle || '', 
  eixosSubtitle: siteContent.home?.eixosSubtitle || '',
  opportunitiesEyebrow: siteContent.home?.opportunitiesEyebrow || '', 
  opportunitiesTitle: siteContent.home?.opportunitiesTitle || '', 
  opportunitiesDesc: siteContent.home?.opportunitiesDesc || '',
  newsletterEyebrow: siteContent.home?.newsletterEyebrow || '', 
  newsletterTitle: siteContent.home?.newsletterTitle || '', 
  newsletterDescription: siteContent.home?.newsletterDescription || '', 
  newsletterPlaceholder: siteContent.home?.newsletterPlaceholder || '', 
  newsletterButton: siteContent.home?.newsletterButton || ''
})
// EDITORIAL GERAL
const articlesConfigData = ref({
  searchPlaceholder: siteContent.articlesConfig?.searchPlaceholder || '', 
  column1Title: siteContent.articlesConfig?.column1Title || '', 
  column2Title: siteContent.articlesConfig?.column2Title || '',
  backButtonText: siteContent.articlesConfig?.backButtonText || '', 
  newsletterTitle: siteContent.articlesConfig?.newsletterTitle || '', 
  newsletterDesc: siteContent.articlesConfig?.newsletterDesc || '', 
  relatedTitle: siteContent.articlesConfig?.relatedTitle || ''
})
// EDITORIAL
const artigos = ref(siteContent.posts || [])
const novoArtigo = ref({ title: '', subtitle: '', author: '', type: 'Artigo', category: '', featured: false, content: '', image: '' })
// VAGAS E OPORTUNIDADES
const oppsConfigData = ref({
  pageTitle1: '', pageTitle2: '', searchPlaceholder: '', toggleText: '',
  detailBackBtn: '', detailApplyBtn: '', detailShareTitle: '', detailStatusBadge: ''
})
const vagas = ref(siteContent.opportunities || [])
const novaVaga = ref({ title: '', category: 'Vagas de Emprego', type: 'Remoto', location: '', deadline: '', link: '', description: '', fullDescription: '' })
// LMS / TRILHAS
const trilhas = ref(siteContent.tracks || [])
const novaTrilha = ref({
  name: '', description: '', hours: '', status: 'GRATUITO', hasCertificate: true, color: '#FF6BCA',
  mod1: '', mod2: '', mod3: ''
})
// SERVIÇOS / EIXOS DE AÇÃO
const servicosConfigData = ref({
  pageTitle1: '', pageTitle2: '', cardButton: '', ctaTitle: '', ctaDesc: '', ctaButton: '',
  newsletterEyebrow: '', newsletterTitle: '', newsletterDesc: '', newsletterBtn: ''
})
const servicos = ref(siteContent.services || [])
const novoServico = ref({ title: '', description: '', icon: 'Zap', bg: '#FF6BCA', textColor: '#FFFFFF' })
// BIBLIOTECA
const bibliotecaConfigData = ref({
  pageTitle1: '', pageTitle2: '', pageSubtitle: '', searchPlaceholder: '', filterLabel: '',
  btnDownload: '', btnSource: '', emptyTitle: '', emptyDesc: '', emptyBtn: ''
})
const docs = ref(siteContent.library || [])
const novoDoc = ref({ title: '', description: '', category: 'Relatório', fileUrl: '', externalLink: '' })

// SOBRE MIM
const sobreData = ref({ 
  heroTitlePart1: '', heroTitlePart2: '', subtitle: '', 
  name: '', role: '', bioInstitucional: '', expertise: '', image: '',
  ctaEyebrow: '', ctaTitle: '', ctaDesc: '', ctaBtn: ''
})

// --- FUNÇÕES DE NEWSLETTER ---
const saveNewsletter = async () => {
  if (!novaNewsletter.value.titulo || !novaNewsletter.value.conteudo) {
    alert("Título e Conteúdo são obrigatórios.")
    return
  }
  isSaving.value = true
  try {
    const payload = {
      ...novaNewsletter.value,
      enviado_em: new Date().toISOString()
    }
    
    if (supabase) {
      const { error } = await supabase.from('newsletters').insert([payload])
      if (error) throw error
    }
    
    setTimeout(() => { 
      siteContent.newsletters.unshift({ ...payload, id: Date.now() })
      novaNewsletter.value = { titulo: '', descricao: '', conteudo: '', capa_url: '', tag: 'Política' }
      isSaving.value = false 
      alert('Newsletter salva e publicada no arquivo!') 
    }, 600)
  } catch(e) { 
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar newsletter.')
  }
}

const exportarInscritos = () => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Email,Nome,Data\n"
    + inscritos.value.map(s => `${s.email},${s.nome || ''},${s.created_at}`).join("\n")
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "inscritos_newsletter.csv")
  document.body.appendChild(link)
  link.click()
}

const saveNewsletterArchiveConfig = async () => {
  isSaving.value = true
  try {
    Object.keys(newsletterArchiveConfigData.value).forEach(k => {
      siteContent.newsletterArchiveConfig[k] = newsletterArchiveConfigData.value[k]
    })
    setTimeout(() => { isSaving.value = false; alert('Configurações do Acervo Salvas!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveDonateConfig = async () => {
  isSaving.value = true
  try {
    siteContent.donateConfig = {
      headlinePart1: donateConfigData.value.headlinePart1,
      headlinePart2: donateConfigData.value.headlinePart2,
      sub: donateConfigData.value.sub,
      toggleLabelSingle: donateConfigData.value.toggleLabelSingle,
      toggleLabelMonthly: donateConfigData.value.toggleLabelMonthly,
      cardEyebrow: donateConfigData.value.cardEyebrow,
      cardTitle: donateConfigData.value.cardTitle,
      cardDesc: donateConfigData.value.cardDesc,
      buttonText: donateConfigData.value.buttonText,
      stats: {
        leaders: donateConfigData.value.statsLeaders,
        campaigns: donateConfigData.value.statsCampaigns,
        reports: donateConfigData.value.statsReports
      }
    }
    setTimeout(() => { isSaving.value = false; alert('Configurações de Doação Salvas!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

// --- FUNÇÕES DE INTELIGÊNCIA (SEO / SOCIAL) ---
const seoScore = computed(() => {
  let score = 0
  if (novoArtigo.value.title.length > 30) score += 25
  if (novoArtigo.value.subtitle.length > 50) score += 25
  if (novoArtigo.value.content.length > 500) score += 25
  if (novoArtigo.value.image) score += 25
  return score
})

const copyCaption = () => {
  const text = `${novoArtigo.value.title} 🚀\n\nAcabamos de publicar uma nova análise estratégica no Radar Editorial da Narrativa Política.\n\nLeia o ensaio completo em nosso portal. #NarrativaPolitica #Advocacy #Impacto`
  navigator.clipboard.writeText(text)
  alert('Legenda copiada para o seu clipboard!')
}

// --- FUNÇÕES DE BANCO DE DADOS (SUPABASE) ---
const loadData = async () => {
  // Simulação de chamadas para o Supabase
  try {
    // const { data: hData } = await supabase.from('site_config').select('*').eq('page', 'home').single()
    // if(hData) homeData.value = hData.content
  } catch (error) {
    console.error('Erro ao carregar dados', error)
  }
}

const saveHome = async () => {
  isSaving.value = true
  try {
    // Atualiza a memória local para reflexo imediato no site
    Object.assign(siteContent.home, homeData.value)

    if (supabase) {
      const { error } = await supabase.from('home').upsert({ id: 1, ...homeData.value })
      if (error) console.warn('Supabase erro:', error)
    }
    setTimeout(() => { isSaving.value = false; alert('Home salva com sucesso no Banco de Dados!') }, 600)
  } catch(e) { console.error(e); isSaving.value = false; alert('Erro ao salvar no banco.') }
}

const saveArtigo = async () => {
  if (!novoArtigo.value.title && !novoArtigo.value.content) {
    // Se o artigo está vazio, salva apenas os textos fixos da página
    isSaving.value = true
    Object.assign(siteContent.articlesConfig, articlesConfigData.value)
    setTimeout(() => { isSaving.value = false; alert('Configurações da Página de Artigos salvas!') }, 400)
    return
  }

  if (!novoArtigo.value.title) {
    alert("O título do artigo é obrigatório.")
    return
  }
  isSaving.value = true
  try {
    Object.assign(siteContent.articlesConfig, articlesConfigData.value) // Salva os textos fixos também
    
    const payload = {
      ...novoArtigo.value,
      date: new Date().toISOString()
    }
    
    if (supabase) {
      const { error } = await supabase.from('articles').insert([payload])
      if (error) throw error
    }
    
    setTimeout(() => { 
      siteContent.posts.unshift({ ...payload, id: Date.now() })
      novoArtigo.value = { title: '', subtitle: '', author: '', type: 'Artigo', category: '', featured: false, content: '', image: '' }
      isSaving.value = false 
      alert('Artigo salvo permanentemente no Banco de Dados!') 
    }, 600)
  } catch(e) { console.error(e); isSaving.value = false; alert('Erro ao publicar artigo.') }
}

const saveSobre = async () => {
  isSaving.value = true
  try {
    Object.keys(sobreData.value).forEach(k => {
      siteContent.about[k] = sobreData.value[k]
    })
    setTimeout(() => { isSaving.value = false; alert('Página Sobre atualizada com sucesso!') }, 800)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveSettings = async () => {
  isSaving.value = true
  try {
    // A visibilidade já altera diretamente o siteContent pelas checkboxes
    setTimeout(() => { isSaving.value = false; alert('Configurações de Visibilidade salvas com sucesso!') }, 500)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveVaga = async () => {
  if (!novaVaga.value.title && !novaVaga.value.description) {
    isSaving.value = true
    Object.assign(siteContent.opportunitiesConfig, oppsConfigData.value)
    setTimeout(() => { isSaving.value = false; alert('Configurações do Hub de Talentos salvas!') }, 400)
    return
  }

  if (!novaVaga.value.title) {
    alert("O título da vaga é obrigatório.")
    return
  }
  isSaving.value = true
  try {
    Object.assign(siteContent.opportunitiesConfig, oppsConfigData.value)
    const payload = { ...novaVaga.value, id: Date.now() }
    siteContent.opportunities.unshift(payload)
    novaVaga.value = { title: '', category: 'Vagas de Emprego', type: 'Remoto', location: '', deadline: '', link: '', description: '', fullDescription: '' }
    setTimeout(() => { isSaving.value = false; alert('Oportunidade salva!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveTrilha = async () => {
  if (!novaTrilha.value.name) {
    alert("O nome da trilha é obrigatório.")
    return
  }
  isSaving.value = true
  try {
    const payload = { 
      id: 'trilha_' + Date.now(),
      name: novaTrilha.value.name,
      description: novaTrilha.value.description,
      hours: novaTrilha.value.hours,
      status: novaTrilha.value.status,
      hasCertificate: novaTrilha.value.hasCertificate,
      color: novaTrilha.value.color,
      modules: [novaTrilha.value.mod1, novaTrilha.value.mod2, novaTrilha.value.mod3].filter(Boolean)
    }
    if (!siteContent.tracks) siteContent.tracks = []
    siteContent.tracks.push(payload)
    novaTrilha.value = { name: '', description: '', hours: '', status: 'GRATUITO', hasCertificate: true, color: '#FF6BCA', mod1: '', mod2: '', mod3: '' }
    setTimeout(() => { isSaving.value = false; alert('Trilha salva com sucesso!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveServico = async () => {
  if (!novoServico.value.title) {
    alert("O nome do eixo de ação é obrigatório.")
    return
  }
  isSaving.value = true
  try {
    const payload = { ...novoServico.value, id: Date.now() }
    siteContent.services.push(payload)
    
    // Salvar config do servico tbm
    Object.keys(servicosConfigData.value).forEach(k => {
      siteContent.servicesConfig[k] = servicosConfigData.value[k]
    })

    novoServico.value = { title: '', description: '', icon: 'Zap', bg: '#FF6BCA', textColor: '#FFFFFF' }
    setTimeout(() => { isSaving.value = false; alert('Eixo de Ação e Configurações Salvos!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveBiblioteca = async () => {
  if (!novoDoc.value.title) {
    alert("O título do documento é obrigatório.")
    return
  }
  isSaving.value = true
  try {
    const payload = { ...novoDoc.value, id: Date.now() }
    if (!siteContent.library) siteContent.library = []
    siteContent.library.push(payload)
    
    // Salvar config global
    Object.keys(bibliotecaConfigData.value).forEach(k => {
      siteContent.libraryConfig[k] = bibliotecaConfigData.value[k]
    })

    novoDoc.value = { title: '', description: '', category: 'Relatório', fileUrl: '', externalLink: '' }
    setTimeout(() => { isSaving.value = false; alert('Biblioteca Atualizada!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const deleteServico = (id) => {
  if (confirm('Tem certeza que deseja excluir este eixo?')) {
    siteContent.services = siteContent.services.filter(s => s.id !== id)
  }
}

const deleteDoc = (id) => {
  if (confirm('Tem certeza que deseja excluir este documento?')) {
    siteContent.library = siteContent.library.filter(d => d.id !== id)
  }
}

const deleteTrilha = (id) => {
  window.open('/', '_blank')
}

const handleLogout = () => {
  logout()
  router.push('/login')
}

onMounted(() => {
  // Preencher homeData com os dados atuais do store
  if (siteContent.home) {
    Object.keys(homeData.value).forEach(key => {
      if (siteContent.home[key] !== undefined) {
        homeData.value[key] = siteContent.home[key]
      }
    })
  }
  // Preencher newsletterArchiveConfig
  if (siteContent.newsletterArchiveConfig) {
    Object.keys(newsletterArchiveConfigData.value).forEach(key => {
      if (siteContent.newsletterArchiveConfig[key] !== undefined) {
        newsletterArchiveConfigData.value[key] = siteContent.newsletterArchiveConfig[key]
      }
    })
  }
  // Preencher donateConfig
  if (siteContent.donateConfig) {
    donateConfigData.value.headlinePart1 = siteContent.donateConfig.headlinePart1 || ''
    donateConfigData.value.headlinePart2 = siteContent.donateConfig.headlinePart2 || ''
    donateConfigData.value.sub = siteContent.donateConfig.sub || ''
    donateConfigData.value.toggleLabelSingle = siteContent.donateConfig.toggleLabelSingle || ''
    donateConfigData.value.toggleLabelMonthly = siteContent.donateConfig.toggleLabelMonthly || ''
    donateConfigData.value.cardEyebrow = siteContent.donateConfig.cardEyebrow || ''
    donateConfigData.value.cardTitle = siteContent.donateConfig.cardTitle || ''
    donateConfigData.value.cardDesc = siteContent.donateConfig.cardDesc || ''
    donateConfigData.value.buttonText = siteContent.donateConfig.buttonText || ''
    donateConfigData.value.statsLeaders = siteContent.donateConfig.stats?.leaders || ''
    donateConfigData.value.statsCampaigns = siteContent.donateConfig.stats?.campaigns || ''
    donateConfigData.value.statsReports = siteContent.donateConfig.stats?.reports || ''
  }
  // Preencher articlesConfigData
  if (siteContent.articlesConfig) {
    Object.keys(articlesConfigData.value).forEach(key => {
      if (siteContent.articlesConfig[key] !== undefined) {
        articlesConfigData.value[key] = siteContent.articlesConfig[key]
      }
    })
  }
  // Preencher oppsConfigData
  if (siteContent.opportunitiesConfig) {
    Object.keys(oppsConfigData.value).forEach(key => {
      if (siteContent.opportunitiesConfig[key] !== undefined) {
        oppsConfigData.value[key] = siteContent.opportunitiesConfig[key]
      }
    })
  }
  // Preencher servicosConfigData
  if (siteContent.servicesConfig) {
    Object.keys(servicosConfigData.value).forEach(key => {
      if (siteContent.servicesConfig[key] !== undefined) {
        servicosConfigData.value[key] = siteContent.servicesConfig[key]
      }
    })
  }
  // Preencher bibliotecaConfigData
  if (siteContent.libraryConfig) {
    Object.keys(bibliotecaConfigData.value).forEach(key => {
      if (siteContent.libraryConfig[key] !== undefined) {
        bibliotecaConfigData.value[key] = siteContent.libraryConfig[key]
      }
    })
  }
  // Preencher sobreData
  if (siteContent.about) {
    Object.keys(sobreData.value).forEach(key => {
      if (siteContent.about[key] !== undefined) {
        sobreData.value[key] = siteContent.about[key]
      }
    })
  }

  loadData()
  window.scrollTo(0, 0)
  
  if (!user.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="admin-dashboard-premium">
    <!-- TEXTURA DE FILME (FUNDO GERAL) -->
    <div class="film-grain-bg"></div>

    <!-- SIDEBAR LATERAL FIXA (PRETA) -->
    <aside class="sidebar-black-fixed">
      <div class="sidebar-header">
        <div class="logo-brutal-white">
          <span class="logo-txt">NP</span>
        </div>
        <span class="badge-admin">SISTEMA ADMIN</span>
      </div>

      <nav class="sidebar-nav-stack">
        <span class="nav-section-label">CONTEÚDO</span>
        <button class="nav-btn" :class="{ active: activeTab === 'home' }" @click="activeTab = 'home'">
          <Home :size="18" /> GESTÃO DA HOME
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'editorial' }" @click="activeTab = 'editorial'">
          <FileText :size="18" /> HUB EDITORIAL
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'newsletter' }" @click="activeTab = 'newsletter'">
          <Mail :size="18" /> NEWSLETTER
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'sobre' }" @click="activeTab = 'sobre'">
          <User :size="18" /> SOBRE MIM
        </button>

        <span class="nav-section-label">PLATAFORMA</span>
        <button class="nav-btn" :class="{ active: activeTab === 'vagas' }" @click="activeTab = 'vagas'">
          <Briefcase :size="18" /> OPORTUNIDADES
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'trilhas' }" @click="activeTab = 'trilhas'">
          <BookOpen :size="18" /> GESTÃO LMS
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'servicos' }" @click="activeTab = 'servicos'">
          <Package :size="18" /> SERVIÇOS
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'biblioteca' }" @click="activeTab = 'biblioteca'">
          <Library :size="18" /> BIBLIOTECA
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'projetos' }" @click="activeTab = 'projetos'">
          <Folder :size="18" /> PROJETOS
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'doacao' }" @click="activeTab = 'doacao'">
          <Heart :size="18" /> DOAÇÕES
        </button>

        <span class="nav-section-label">SISTEMA</span>
        <button class="nav-btn" :class="{ active: activeTab === 'visibilidade' }" @click="activeTab = 'visibilidade'">
          <Eye :size="18" /> MÓDULOS
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'configuracoes' }" @click="activeTab = 'configuracoes'">
          <Settings :size="18" /> CONFIGURAÇÕES
        </button>
      </nav>
      
      <div class="sidebar-footer mt-auto">
        <button class="btn-logout-white" @click="handleLogout">
          <LogOut :size="18" /> SAIR DO PAINEL
        </button>
      </div>
    </aside>

    <!-- CONTEÚDO PRINCIPAL (COM RESPIRO pt-48 E px-12) -->
    <main class="main-content-area pt-48 pb-32 px-12">
      
      <!-- HEADER DO CONTEÚDO -->
      <header class="admin-top-header mb-12">
        <div class="header-titles">
           <h1 class="admin-main-title">{{ activeTab.toUpperCase() }}</h1>
           <p class="admin-subtitle">Gerencie os dados e publicações da plataforma em tempo real.</p>
        </div>
        
        <div class="header-actions-row">
           <div class="user-pill-brutal">
              <span>{{ user?.nome_completo || 'Administradora' }}</span>
              <div class="avatar-sm">A</div>
           </div>
           <button class="btn-preview-solid" @click="router.push('/')">
              <Eye :size="18" /> VOLTAR PARA O SITE
           </button>
        </div>
      </header>

      <!-- 1. GESTÃO DA HOME -->
      <section v-if="activeTab === 'home'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid">
          <h2 class="card-label-black mb-8">HERO SECTION (TOPO)</h2>
          <div class="form-grid-2">
             <div class="input-group">
                <label>TÍTULO PRINCIPAL (BRANCO)</label>
                <input v-model="homeData.heroTitle" type="text" placeholder="Ex: NÚCLEO PELA LUTA SOCIAL" />
             </div>
             <div class="input-group">
                <label>TÍTULO PARTE 2 (AMARELO)</label>
                <input v-model="homeData.heroTitleAccent" type="text" placeholder="Ex: A Bancada de Impacto..." />
             </div>
          </div>
          <div class="input-group mt-4">
             <label>TEXTO DO MARQUEE (LETREIRO ROLANTE)</label>
             <input v-model="homeData.marqueeText" type="text" placeholder="Ex: NOTÍCIAS DE LUTA •" />
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mt-10">
          <h2 class="card-label-black mb-8">RADAR EDITORIAL</h2>
          <div class="form-grid-2">
             <div class="input-group">
                <label>TÍTULO DO RADAR (PRETO)</label>
                <input v-model="homeData.radarEditorialTitle" type="text" placeholder="Ex: Conteúdos e" />
             </div>
             <div class="input-group">
                <label>SUBTÍTULO DO RADAR (DEGRADÊ)</label>
                <input v-model="homeData.radarEditorialSubtitle" type="text" placeholder="Ex: Artigos" />
             </div>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mt-10">
          <h2 class="card-label-black mb-8">NOSSOS EIXOS DE AÇÃO</h2>
          <div class="form-grid-2">
             <div class="input-group">
                <label>TÍTULO PRINCIPAL (BRANCO)</label>
                <input v-model="homeData.eixosTitle" type="text" placeholder="Ex: NOSSOS" />
             </div>
             <div class="input-group">
                <label>TÍTULO EM DESTAQUE (AMARELO)</label>
                <input v-model="homeData.eixosSubtitle" type="text" placeholder="Ex: EIXOS DE AÇÃO" />
             </div>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mt-10">
          <h2 class="card-label-black mb-8">OPORTUNIDADES</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>MARCADOR TOPO (VERMELHO)</label>
                <input v-model="homeData.opportunitiesEyebrow" type="text" placeholder="Ex: O Radar Ativista" />
             </div>
             <div class="input-group">
                <label>TÍTULO DA SEÇÃO</label>
                <input v-model="homeData.opportunitiesTitle" type="text" placeholder="Ex: Oportunidades" />
             </div>
          </div>
          <div class="input-group">
             <label>DESCRIÇÃO</label>
             <textarea v-model="homeData.opportunitiesDesc" rows="3" placeholder="Vagas, subsídios e bolsas..."></textarea>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mt-10 mb-10">
          <h2 class="card-label-black mb-8">NEWSLETTER</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>MARCADOR (TOPO)</label>
                <input v-model="homeData.newsletterEyebrow" type="text" placeholder="Ex: Rede de Mobilização" />
             </div>
             <div class="input-group">
                <label>TÍTULO PRINCIPAL</label>
                <input v-model="homeData.newsletterTitle" type="text" placeholder="Ex: Junte-se ao Movimento." />
             </div>
          </div>
          <div class="input-group mb-4">
             <label>DESCRIÇÃO DA NEWSLETTER</label>
             <textarea v-model="homeData.newsletterDescription" rows="2" placeholder="Receba despachos estratégicos..."></textarea>
          </div>
          <div class="form-grid-2">
             <div class="input-group">
                <label>PLACEHOLDER DO CAMPO DE EMAIL</label>
                <input v-model="homeData.newsletterPlaceholder" type="text" placeholder="Ex: Digite seu email..." />
             </div>
             <div class="input-group">
                <label>TEXTO DO BOTÃO</label>
                <input v-model="homeData.newsletterButton" type="text" placeholder="Ex: QUERO FAZER PARTE" />
             </div>
          </div>
        </div>
        
        <button class="btn-save-brutal mb-12" @click="saveHome" :disabled="isSaving">
             <Save :size="18" /> {{ isSaving ? 'SALVANDO...' : 'SALVAR TODAS AS MUDANÇAS DA HOME' }}
        </button>
      </section>

      <!-- 2. HUB EDITORIAL -->
      <section v-if="activeTab === 'editorial'" class="admin-section fade-in-up">
        
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CONFIGURAÇÕES DA PÁGINA (TEXTOS FIXOS)</h2>
          <div class="form-grid-3 mb-4">
             <div class="input-group">
                <label>TEXTO DA BUSCA</label>
                <input v-model="articlesConfigData.searchPlaceholder" type="text" placeholder="Ex: Pesquisar..." />
             </div>
             <div class="input-group">
                <label>TÍTULO COLUNA 1</label>
                <input v-model="articlesConfigData.column1Title" type="text" placeholder="Ex: ARTIGOS E ANÁLISES" />
             </div>
             <div class="input-group">
                <label>TÍTULO COLUNA 2</label>
                <input v-model="articlesConfigData.column2Title" type="text" placeholder="Ex: NOTÍCIAS" />
             </div>
          </div>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>BOTÃO VOLTAR (PÁG. DO ARTIGO)</label>
                <input v-model="articlesConfigData.backButtonText" type="text" placeholder="Ex: VOLTAR AO RADAR" />
             </div>
             <div class="input-group">
                <label>TÍTULO SEÇÃO INFERIOR</label>
                <input v-model="articlesConfigData.relatedTitle" type="text" placeholder="Ex: CONTINUE EXPLORANDO" />
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO NEWSLETTER</label>
                <input v-model="articlesConfigData.newsletterTitle" type="text" placeholder="Ex: GOSTOU DESTE ENSAIO?" />
             </div>
             <div class="input-group">
                <label>DESCRIÇÃO NEWSLETTER</label>
                <input v-model="articlesConfigData.newsletterDesc" type="text" placeholder="Ex: Receba nossa curadoria..." />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveArtigo" :disabled="isSaving">
             <Save :size="18" /> SALVAR TEXTOS DA PÁGINA
          </button>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">PUBLICAR NOVO ARTIGO</h2>
          <div class="input-group mb-6">
             <label>TÍTULO DO ARTIGO</label>
             <input v-model="novoArtigo.title" type="text" class="input-large" />
          </div>
          <div class="input-group mb-6">
             <label>RESUMO (EXCERPT) / LINHA FINA</label>
             <textarea v-model="novoArtigo.subtitle" rows="2" placeholder="Resumo curto que aparece no card..."></textarea>
          </div>
          <div class="form-grid-3 mb-6">
             <div class="input-group">
                <label>AUTOR</label>
                <input v-model="novoArtigo.author" type="text" placeholder="Nome do Autor" />
             </div>
             <div class="input-group">
                <label>TIPO DE CONTEÚDO</label>
                <div class="category-pill-group">
                   <button v-for="typ in ['Artigo', 'Análise', 'Notícia']" :key="typ" class="cat-pill" :class="{ active: novoArtigo.type === typ }" @click.prevent="novoArtigo.type = typ">
                     {{ typ }}
                   </button>
                </div>
             </div>
             <div class="input-group">
                <label>CATEGORIA / EIXO</label>
                <input v-model="novoArtigo.category" type="text" placeholder="Ex: Clima, Mobilização..." />
             </div>
          </div>
          <div class="mb-6">
             <ImageUploader v-model="novoArtigo.image" label="IMAGEM DE CAPA (ARRASTE OU CLIQUE)" />
          </div>
          <div class="input-group flex items-center justify-start gap-4 mb-6">
             <label class="checkbox-container">
                <input type="checkbox" v-model="novoArtigo.featured" />
                <span class="checkmark"></span>
                <span class="check-label font-bold text-magenta-500">DESTAQUE PRINCIPAL NA HOME</span>
             </label>
          </div>
          <div class="input-group mb-6">
             <label>CORPO DO TEXTO (RICH TEXT)</label>
             <div class="editor-workspace-dual">
                <div class="main-editor-area">
                   <BrutalEditor v-model="novoArtigo.content" placeholder="Escreva o conteúdo do seu artigo aqui..." />
                </div>
                
                <!-- SEO & SOCIAL SIDEBAR -->
                <aside class="seo-sidebar shadow-solid">
                   <div class="seo-card mb-6">
                      <h4 class="card-label-black text-xs mb-4">SEO SCORECARD</h4>
                      <div class="score-circle-container">
                         <div class="score-circle" :style="{ borderColor: seoScore > 70 ? '#A4CD39' : '#FFE65A' }">
                            {{ seoScore }}
                         </div>
                         <span class="score-label">OTIMIZAÇÃO</span>
                      </div>
                      <ul class="seo-checklist">
                         <li :class="{ ok: novoArtigo.title.length > 30 }">Título impactante (>30 chars)</li>
                         <li :class="{ ok: novoArtigo.subtitle.length > 50 }">Resumo estratégico (>50 chars)</li>
                         <li :class="{ ok: novoArtigo.content.length > 500 }">Conteúdo denso (>500 chars)</li>
                         <li :class="{ ok: novoArtigo.image }">Imagem de capa definida</li>
                      </ul>
                   </div>

                   <div class="social-helper-card">
                      <h4 class="card-label-black text-xs mb-4">SOCIAL HELPER</h4>
                      <p class="text-xs opacity-50 mb-4">Sugestão de legenda para LinkedIn/Instagram:</p>
                      <div class="caption-box">
                         "{{ novoArtigo.title }} 🚀\n\nAcabamos de publicar uma nova análise estratégica no Radar Editorial da Narrativa Política. {{ novoArtigo.subtitle }}\n\nLeia o ensaio completo em nosso portal. #NarrativaPolitica #Advocacy #Impacto"
                      </div>
                      <button class="btn-copy-sm mt-3" @click="copyCaption">COPIAR LEGENDA</button>
                   </div>
                </aside>
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveArtigo" :disabled="isSaving">
             <Plus :size="18" /> PUBLICAR ARTIGO
          </button>
        </div>

        <!-- LISTA DE ARTIGOS -->
        <div class="editor-card-brutal shadow-solid">
           <h2 class="card-label-black mb-8">ARTIGOS PUBLICADOS</h2>
           <table class="table-brutal">
              <thead>
                 <tr>
                    <th>TÍTULO</th>
                    <th>AUTOR</th>
                    <th>TIPO / CATEGORIA</th>
                    <th>DESTAQUE</th>
                    <th>AÇÕES</th>
                 </tr>
              </thead>
              <tbody>
                 <tr v-for="art in siteContent.posts" :key="art.id">
                    <td class="font-bold">{{ art.title }}</td>
                    <td>{{ art.author }}</td>
                    <td>{{ art.type }} <span class="opacity-50">({{ art.category }})</span></td>
                    <td>
                       <span v-if="art.featured" class="badge-featured">SIM</span>
                       <span v-else class="badge-normal">NÃO</span>
                    </td>
                    <td class="actions-td">
                       <button class="icon-action"><Edit :size="16" /></button>
                       <button class="icon-action text-red-500"><Trash :size="16" /></button>
                    </td>
                 </tr>
                 <tr v-if="siteContent.posts.length === 0">
                    <td colspan="5" class="text-center opacity-50 py-6">Nenhum artigo publicado ainda.</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <!-- 3. VAGAS E OPORTUNIDADES -->
      <section v-if="activeTab === 'vagas'" class="admin-section fade-in-up">
        
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CONFIGURAÇÕES GERAIS (TEXTOS FIXOS)</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 1)</label>
                <input v-model="oppsConfigData.pageTitle1" type="text" placeholder="Ex: HUB DE" />
             </div>
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 2 - DESTAQUE)</label>
                <input v-model="oppsConfigData.pageTitle2" type="text" placeholder="Ex: TALENTOS" />
             </div>
          </div>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TEXTO DA BUSCA</label>
                <input v-model="oppsConfigData.searchPlaceholder" type="text" placeholder="Ex: Cargo, local..." />
             </div>
             <div class="input-group">
                <label>TEXTO DO TOGGLE (CHAVE SELETORA)</label>
                <input v-model="oppsConfigData.toggleText" type="text" placeholder="Ex: DESTAQUE NORDESTE" />
             </div>
          </div>
          <div class="form-grid-3 mb-6">
             <div class="input-group">
                <label>BOTÃO VOLTAR (INTERNO)</label>
                <input v-model="oppsConfigData.detailBackBtn" type="text" placeholder="Ex: PORTAL DE TALENTOS" />
             </div>
             <div class="input-group">
                <label>BOTÃO PRINCIPAL (INTERNO)</label>
                <input v-model="oppsConfigData.detailApplyBtn" type="text" placeholder="Ex: CANDIDATAR-SE" />
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO COMPARTILHAR</label>
                <input v-model="oppsConfigData.detailShareTitle" type="text" placeholder="Ex: COMPARTILHAR" />
             </div>
             <div class="input-group">
                <label>BADGE DE STATUS (VERDE)</label>
                <input v-model="oppsConfigData.detailStatusBadge" type="text" placeholder="Ex: INSCRIÇÕES ABERTAS" />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveVaga" :disabled="isSaving">
             <Save :size="18" /> SALVAR CONFIGURAÇÕES DO HUB
          </button>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CADASTRAR OPORTUNIDADE</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO DA VAGA / OPORTUNIDADE</label>
                <input v-model="novaVaga.title" type="text" placeholder="Ex: Bolsas para Mulheres em Dados" />
             </div>
             <div class="input-group">
                <label>CATEGORIA</label>
                <div class="category-pill-group">
                   <button v-for="cat in ['Vagas de Emprego', 'Bolsas', 'Editais', 'Educação', 'Gênero', 'Clima', 'Internacional']" :key="cat" class="cat-pill" :class="{ active: novaVaga.category === cat }" @click.prevent="novaVaga.category = cat">
                     {{ cat }}
                   </button>
                </div>
             </div>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO CURTA (Aparece no card de fora)</label>
             <textarea v-model="novaVaga.description" rows="2" placeholder="Impacto focado em liderança..."></textarea>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO COMPLETA DA VAGA (Aparece na página de detalhe)</label>
             <BrutalEditor v-model="novaVaga.fullDescription" placeholder="Detalhes, requisitos, benefícios..." />
          </div>
          <div class="form-grid-3 mb-6">
             <div class="input-group">
                <label>MODELO</label>
                <div class="category-pill-group">
                   <button v-for="typ in ['Remoto', 'Híbrido', 'Presencial']" :key="typ" class="cat-pill" :class="{ active: novaVaga.type === typ }" @click.prevent="novaVaga.type = typ">
                     {{ typ }}
                   </button>
                </div>
             </div>
             <div class="input-group">
                <label>LOCALIZAÇÃO</label>
                <input v-model="novaVaga.location" type="text" placeholder="Ex: Nacional, São Paulo..." />
             </div>
             <div class="input-group">
                <label>PRAZO (DEADLINE)</label>
                <input v-model="novaVaga.deadline" type="text" placeholder="Ex: ABERTO ou 25 MAI" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>LINK PARA INSCRIÇÃO</label>
             <input v-model="novaVaga.link" type="url" placeholder="https://..." />
          </div>
          <button class="btn-save-brutal" @click="saveVaga" :disabled="isSaving"><Plus :size="18" /> ADICIONAR OPORTUNIDADE</button>
        </div>

        <div class="editor-card-brutal shadow-solid">
           <h2 class="card-label-black mb-8">OPORTUNIDADES ATIVAS</h2>
           <table class="table-brutal">
              <thead>
                 <tr>
                    <th>TÍTULO</th>
                    <th>CATEGORIA</th>
                    <th>PRAZO</th>
                    <th>AÇÕES</th>
                 </tr>
              </thead>
              <tbody>
                 <tr v-for="vaga in siteContent.opportunities" :key="vaga.id">
                    <td class="font-bold">{{ vaga.title }}</td>
                    <td>{{ vaga.category }}</td>
                    <td>{{ vaga.deadline }}</td>
                    <td class="actions-td">
                       <button class="icon-action"><Edit :size="16" /></button>
                       <button class="icon-action text-red-500"><Trash :size="16" /></button>
                    </td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <!-- 4. GESTÃO LMS (TRILHAS) -->
      <section v-if="activeTab === 'trilhas'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CRIAR NOVA TRILHA</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>NOME DA TRILHA</label>
                <input v-model="novaTrilha.name" type="text" placeholder="Ex: ADVOCACY EM POLÍTICAS PÚBLICAS" />
             </div>
             <div class="input-group">
                <label>COR DO TEMA</label>
                <select v-model="novaTrilha.color" class="select-brutal">
                   <option value="#FF6BCA">Magenta (Rosa)</option>
                   <option value="#20B2AA">Verde Água</option>
                   <option value="#3D78E0">Azul</option>
                   <option value="#FFE65A">Amarelo</option>
                </select>
             </div>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO CURTA</label>
             <textarea v-model="novaTrilha.description" rows="2" placeholder="Resumo do que a pessoa vai aprender..."></textarea>
          </div>
          <div class="form-grid-3 mb-6">
             <div class="input-group">
                <label>DURAÇÃO (HORAS)</label>
                <input v-model="novaTrilha.hours" type="text" placeholder="Ex: 12h" />
             </div>
             <div class="input-group">
                <label>STATUS DE ACESSO</label>
                <select v-model="novaTrilha.status" class="select-brutal">
                   <option>GRATUITO</option>
                   <option>PREMIUM</option>
                </select>
             </div>
             <div class="input-group flex items-center justify-start mt-6">
                <label class="checkbox-container">
                   <input type="checkbox" v-model="novaTrilha.hasCertificate" />
                   <span class="checkmark"></span>
                   <span class="check-label font-bold text-dark">INCLUI CERTIFICADO</span>
                </label>
             </div>
          </div>
          <h3 class="font-display uppercase text-lg mb-4 mt-8">O QUE VOCÊ VAI APRENDER (3 PASSOS):</h3>
          <div class="form-grid-3 mb-8">
             <div class="input-group">
                <label>PASSO 1</label>
                <input v-model="novaTrilha.mod1" type="text" placeholder="Ex: Poder Local" />
             </div>
             <div class="input-group">
                <label>PASSO 2</label>
                <input v-model="novaTrilha.mod2" type="text" placeholder="Ex: Mapeamento" />
             </div>
             <div class="input-group">
                <label>PASSO 3</label>
                <input v-model="novaTrilha.mod3" type="text" placeholder="Ex: Influência" />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveTrilha" :disabled="isSaving"><Plus :size="18" /> SALVAR TRILHA</button>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
           <h2 class="card-label-black mb-8">TRILHAS CADASTRADAS</h2>
           <table class="table-brutal">
              <thead>
                 <tr>
                    <th>NOME</th>
                    <th>DURAÇÃO</th>
                    <th>ACESSO</th>
                    <th>CERTIFICADO</th>
                    <th>AÇÕES</th>
                 </tr>
              </thead>
              <tbody>
                 <tr v-for="t in siteContent.tracks" :key="t.id">
                    <td class="font-bold">{{ t.name }}</td>
                    <td>{{ t.hours }}</td>
                    <td>
                       <span :class="t.status === 'PREMIUM' ? 'badge-featured' : 'badge-normal'">{{ t.status }}</span>
                    </td>
                    <td>{{ t.hasCertificate ? 'SIM' : 'NÃO' }}</td>
                    <td class="actions-td">
                       <button class="icon-action text-red-500"><Trash :size="16" /></button>
                    </td>
                 </tr>
                 <tr v-if="!siteContent.tracks || siteContent.tracks.length === 0">
                    <td colspan="5" class="text-center opacity-50 py-6">Nenhuma trilha cadastrada.</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div class="editor-card-brutal shadow-solid">
           <h2 class="card-label-black mb-6">GERENCIADOR DE MÓDULOS E AULAS</h2>
           <p class="text-sm opacity-70 mb-8">Selecione uma trilha existente para adicionar módulos, links de vídeo (YouTube/Vimeo) e PDFs de apoio.</p>
           <!-- Exemplo visual do gerenciador -->
           <div class="mock-manager-box">
              <span class="opacity-50 font-bold">Nenhuma trilha selecionada.</span>
           </div>
        </div>
      </section>

      <!-- 5. BIBLIOTECA TÉCNICA -->
      <section v-if="activeTab === 'biblioteca'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CONFIGURAÇÕES GERAIS (PÁGINA DA BIBLIOTECA)</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 1)</label>
                <input v-model="bibliotecaConfigData.pageTitle1" type="text" placeholder="Ex: NOSSA" />
             </div>
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 2)</label>
                <input v-model="bibliotecaConfigData.pageTitle2" type="text" placeholder="Ex: BIBLIOTECA" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>SUBTÍTULO</label>
             <textarea v-model="bibliotecaConfigData.pageSubtitle" rows="2"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>PLACEHOLDER DA BUSCA</label>
                <input v-model="bibliotecaConfigData.searchPlaceholder" type="text" placeholder="Ex: BUSCAR DOCUMENTO..." />
             </div>
             <div class="input-group">
                <label>RÓTULO DE FILTROS</label>
                <input v-model="bibliotecaConfigData.filterLabel" type="text" placeholder="Ex: FILTRAR:" />
             </div>
          </div>
          <h3 class="font-display uppercase text-lg mb-4 mt-8">BOTÕES DOS CARDS:</h3>
          <div class="form-grid-2 mb-8">
             <div class="input-group">
                <label>BOTÃO PRINCIPAL (DOWNLOAD)</label>
                <input v-model="bibliotecaConfigData.btnDownload" type="text" placeholder="Ex: DOWNLOAD PDF" />
             </div>
             <div class="input-group">
                <label>BOTÃO SECUNDÁRIO (LINK EXTERNO)</label>
                <input v-model="bibliotecaConfigData.btnSource" type="text" placeholder="Ex: FONTE" />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveBiblioteca" :disabled="isSaving"><Save :size="18" /> SALVAR CONFIGURAÇÕES DA PÁGINA</button>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">ADICIONAR DOCUMENTO</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO DO DOCUMENTO</label>
                <input v-model="novoDoc.title" type="text" placeholder="Ex: Impacto Econômico..." />
             </div>
             <div class="input-group">
                <label>CATEGORIA</label>
                <div class="category-pill-group">
                   <button v-for="cat in ['Relatório', 'Dataset', 'Nota Técnica', 'Guia']" :key="cat" class="cat-pill" :class="{ active: novoDoc.category === cat }" @click.prevent="novoDoc.category = cat">
                     {{ cat }}
                   </button>
                </div>
             </div>
          </div>
          <div class="input-group mb-6">
             <label>RESUMO / DESCRIÇÃO</label>
             <textarea v-model="novoDoc.description" rows="3"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>LINK PARA DOWNLOAD (PDF/XLSX)</label>
                <input v-model="novoDoc.fileUrl" type="url" placeholder="https://" />
             </div>
             <div class="input-group">
                <label>LINK EXTERNO (FONTE) - Opcional</label>
                <input v-model="novoDoc.externalLink" type="url" placeholder="https://" />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveBiblioteca" :disabled="isSaving"><Plus :size="18" /> CADASTRAR DOCUMENTO</button>
        </div>

        <div class="editor-card-brutal shadow-solid">
           <h2 class="card-label-black mb-8">ACERVO CADASTRADO</h2>
           <table class="table-brutal">
              <thead>
                 <tr>
                    <th>TÍTULO</th>
                    <th>CATEGORIA</th>
                    <th>AÇÕES</th>
                 </tr>
              </thead>
              <tbody>
                 <tr v-for="doc in siteContent.library" :key="doc.id">
                    <td class="font-bold">{{ doc.title }}</td>
                    <td><span class="badge-normal">{{ doc.category }}</span></td>
                    <td class="actions-td">
                       <button class="icon-action"><Edit :size="16" /></button>
                       <button class="icon-action text-red-500" @click="deleteDoc(doc.id)"><Trash :size="16" /></button>
                    </td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <!-- 6. NEWSLETTER CREATOR SUITE -->
      <section v-if="activeTab === 'newsletter'" class="admin-section fade-in-up">
        
        <!-- HEADER METRICS (PREMIUM GLASS) -->
        <div class="metrics-grid-premium mb-12">
           <div class="metric-card-glass shadow-solid">
              <div class="metric-label">INSCRITOS TOTAIS</div>
              <div class="metric-value">{{ siteContent.subscribers?.length || 0 }}</div>
              <div class="metric-trend text-green-500">+12% esta semana</div>
           </div>
           <div class="metric-card-glass shadow-solid">
              <div class="metric-label">TAXA DE ABERTURA</div>
              <div class="metric-value">68.4%</div>
              <div class="metric-trend text-blue-500">Acima da média</div>
           </div>
           <div class="metric-card-glass shadow-solid">
              <div class="metric-label">EDIÇÕES ENVIADAS</div>
              <div class="metric-value">{{ siteContent.newsletters?.length || 0 }}</div>
              <div class="metric-trend opacity-50">Histórico completo</div>
           </div>
        </div>

        <!-- CONFIGURAÇÕES DA PÁGINA DE ACERVO -->
        <div class="editor-card-brutal shadow-solid mb-12">
          <div class="flex justify-between items-center mb-8">
             <h2 class="card-label-black mb-0">CONFIGURAÇÕES DA PÁGINA (ACERVO)</h2>
          </div>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PRETO)</label>
                <input v-model="newsletterArchiveConfigData.heroTitle1" type="text" placeholder="Ex: ACERVO DE" />
             </div>
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (VERMELHO)</label>
                <input v-model="newsletterArchiveConfigData.heroTitle2" type="text" placeholder="Ex: EDIÇÕES" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>SUBTÍTULO</label>
             <textarea v-model="newsletterArchiveConfigData.heroSubtitle" rows="2"></textarea>
          </div>
          
          <h3 class="font-display uppercase text-lg mb-4 mt-8">CARD DE ASSINATURA</h3>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>RÓTULO MENOR (EYEBROW)</label>
                <input v-model="newsletterArchiveConfigData.cardEyebrow" type="text" />
             </div>
             <div class="input-group">
                <label>TÍTULO DO CARD</label>
                <input v-model="newsletterArchiveConfigData.cardTitle" type="text" />
             </div>
          </div>
          <div class="input-group mb-4">
             <label>DESCRIÇÃO DO CARD</label>
             <textarea v-model="newsletterArchiveConfigData.cardDesc" rows="2"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>BOTÃO DO CARD</label>
                <input v-model="newsletterArchiveConfigData.cardBtn" type="text" />
             </div>
             <div class="input-group">
                <label>MENSAGEM DE ACERVO VAZIO</label>
                <input v-model="newsletterArchiveConfigData.emptyState" type="text" />
             </div>
          </div>
          
          <button class="btn-save-brutal" @click="saveNewsletterArchiveConfig" :disabled="isSaving">
             <Save :size="18" /> {{ isSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES DO ACERVO' }}
          </button>
        </div>

        <!-- CONFIGURAÇÕES DA PÁGINA DE DOAÇÃO -->
        <div class="editor-card-brutal shadow-solid mb-12">
          <div class="flex justify-between items-center mb-8">
             <h2 class="card-label-black mb-0">CONFIGURAÇÕES DA PÁGINA (DOAÇÃO)</h2>
          </div>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>HEADLINE PARTE 1 (PRETO)</label>
                <input v-model="donateConfigData.headlinePart1" type="text" placeholder="Ex: TRANSFORME" />
             </div>
             <div class="input-group">
                <label>HEADLINE PARTE 2 (DESTAQUE)</label>
                <input v-model="donateConfigData.headlinePart2" type="text" placeholder="Ex: NARRATIVA EM AÇÃO" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>SUBTÍTULO</label>
             <textarea v-model="donateConfigData.sub" rows="2"></textarea>
          </div>
          
          <div class="form-grid-2 mb-8">
             <div class="input-group">
                <label>RÓTULO ÚNICA</label>
                <input v-model="donateConfigData.toggleLabelSingle" type="text" />
             </div>
             <div class="input-group">
                <label>RÓTULO MENSAL</label>
                <input v-model="donateConfigData.toggleLabelMonthly" type="text" />
             </div>
          </div>

          <h3 class="font-display uppercase text-lg mb-4 mt-8">CARD DE ASSINATURA</h3>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>EYEBROW</label>
                <input v-model="donateConfigData.cardEyebrow" type="text" />
             </div>
             <div class="input-group">
                <label>TÍTULO</label>
                <input v-model="donateConfigData.cardTitle" type="text" />
             </div>
          </div>
          <div class="input-group mb-4">
             <label>DESCRIÇÃO</label>
             <textarea v-model="donateConfigData.cardDesc" rows="2"></textarea>
          </div>
          <div class="input-group mb-6">
             <label>TEXTO DO BOTÃO</label>
             <input v-model="donateConfigData.buttonText" type="text" />
          </div>

          <h3 class="font-display uppercase text-lg mb-4 mt-8">ESTATÍSTICAS DE IMPACTO</h3>
          <div class="form-grid-3 mb-8">
             <div class="input-group">
                <label>LÍDERES</label>
                <input v-model="donateConfigData.statsLeaders" type="text" />
             </div>
             <div class="input-group">
                <label>CAMPANHAS</label>
                <input v-model="donateConfigData.statsCampaigns" type="text" />
             </div>
             <div class="input-group">
                <label>RELATÓRIOS</label>
                <input v-model="donateConfigData.statsReports" type="text" />
             </div>
          </div>
          
          <button class="btn-save-brutal" @click="saveDonateConfig" :disabled="isSaving">
             <Save :size="18" /> {{ isSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES DE DOAÇÃO' }}
          </button>
        </div>

        <!-- CREATOR DUAL PANE -->
        <div class="creator-workspace">
           
           <!-- ESQUERDA: EDITOR -->
           <div class="editor-pane shadow-solid">
              <div class="pane-header mb-8">
                 <h2 class="card-label-black mb-0">COMPOSIÇÃO DE ELITE</h2>
                 <div class="flex gap-2">
                    <button class="btn-tool-sm"><Eye :size="14" /> TESTE</button>
                    <button class="btn-tool-sm"><Save :size="14" /> RASCUNHO</button>
                 </div>
              </div>

              <div class="input-group mb-6">
                 <label>ASSUNTO DO E-MAIL (O QUE AS PESSOAS VERÃO NA CAIXA DE ENTRADA)</label>
                 <input v-model="novaNewsletter.titulo" type="text" class="input-premium" placeholder="Ex: Por que a geopolítica está mudando..." />
              </div>

              <div class="input-group mb-6">
                 <label>DESCRIÇÃO CURTA (SEO / ARQUIVO)</label>
                 <textarea v-model="novaNewsletter.descricao" rows="2" class="input-premium" placeholder="Um resumo magnético para atrair o clique..."></textarea>
              </div>

              <div class="form-grid-2 mb-6">
                 <div class="input-group">
                    <label>TAG DA EDIÇÃO</label>
                    <input v-model="novaNewsletter.tag" type="text" class="input-premium" />
                 </div>
                 <div class="input-group">
                    <label>CAPA DE IMPACTO</label>
                    <ImageUploader v-model="novaNewsletter.capa_url" label="UPLOAD DA CAPA" />
                 </div>
              </div>

              <div class="input-group mb-8">
                 <label>CONTEÚDO MAGNÉTICO (EDITOR RICO)</label>
                 <BrutalEditor v-model="novaNewsletter.conteudo" />
              </div>

              <div class="flex gap-4">
                 <button class="btn-launch-premium" @click="saveNewsletter" :disabled="isSaving">
                    <Zap :size="20" /> DISPARAR PARA A REDE
                 </button>
                 <button class="btn-schedule-premium">
                    <Calendar :size="20" /> AGENDAR
                 </button>
              </div>
           </div>

           <!-- DIREITA: LIVE PREVIEW (MOCKUP) -->
           <div class="preview-pane">
              <div class="sticky-preview">
                 <div class="device-mockup shadow-solid">
                    <div class="device-screen">
                       <div class="email-preview-content">
                          <div class="email-header-mock">
                             <div class="logo-circle">NP</div>
                             <span>Narrativa Política</span>
                          </div>
                          <div class="email-body-mock">
                             <img v-if="novaNewsletter.capa_url" :src="novaNewsletter.capa_url" class="preview-img-mock" />
                             <div class="preview-title-mock">{{ novaNewsletter.titulo || 'Assunto da Newsletter...' }}</div>
                             <div class="preview-text-mock" v-html="novaNewsletter.conteudo || 'O conteúdo do seu e-mail aparecerá aqui em tempo real...'"></div>
                             <div class="preview-footer-mock">
                                © 2026 Narrativa Política. <br>
                                Você recebeu este e-mail porque faz parte da nossa rede.
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="device-home-bar"></div>
                 </div>
                 <p class="text-center mt-6 font-bold opacity-50 uppercase text-xs tracking-widest">Live Preview: Mobile View</p>
              </div>
           </div>

        </div>

        <!-- LISTA DE INSCRITOS (ESTILO TABELA DE LUXO) -->
        <div class="editor-card-brutal shadow-solid mt-12">
             <div class="flex justify-between items-center mb-8">
                <h2 class="card-label-black mb-0">GESTÃO DA REDE (INSCRITOS)</h2>
                <button class="btn-preview-solid" @click="exportarInscritos">
                   <Save :size="16" /> EXPORTAR LISTA (CSV)
                </button>
             </div>
             <table class="table-premium">
                <thead>
                   <tr>
                      <th>USUÁRIO</th>
                      <th>DATA DE ADESÃO</th>
                      <th>INTERESSE</th>
                      <th>STATUS</th>
                   </tr>
                </thead>
                <tbody>
                   <tr v-for="sub in siteContent.subscribers" :key="sub.id">
                      <td class="font-bold flex items-center gap-3">
                         <div class="avatar-table">{{ sub.email[0].toUpperCase() }}</div>
                         {{ sub.email }}
                      </td>
                      <td>{{ new Date(sub.created_at).toLocaleDateString() }}</td>
                      <td><span class="badge-tag">{{ novaNewsletter.tag }}</span></td>
                      <td><span class="badge-status-active">ATIVO</span></td>
                   </tr>
                   <tr v-if="!siteContent.subscribers || siteContent.subscribers.length === 0">
                      <td colspan="4" class="text-center py-12 opacity-50 font-bold uppercase">Nenhum integrante na rede ainda.</td>
                   </tr>
                </tbody>
             </table>
        </div>

      </section>

      <!-- 6. SOBRE MIM -->
      <section v-if="activeTab === 'sobre'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">HERO (CABEÇALHO)</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO PARTE 1 (PRETO)</label>
                <input v-model="sobreData.heroTitlePart1" type="text" placeholder="Ex: IDEIAS QUE" />
             </div>
             <div class="input-group">
                <label>TÍTULO PARTE 2 (VERMELHO)</label>
                <input v-model="sobreData.heroTitlePart2" type="text" placeholder="Ex: MOVEM ESTRUTURAS" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>SUBTÍTULO</label>
             <textarea v-model="sobreData.subtitle" rows="2"></textarea>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">DOSSIÊ DO PERFIL</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>NOME DE EXIBIÇÃO</label>
                <input v-model="sobreData.name" type="text" placeholder="Ex: ANNE DORNELAS" />
             </div>
             <div class="input-group">
                <label>CARGO / RÓTULO</label>
                <input v-model="sobreData.role" type="text" placeholder="Ex: Estrategista Política..." />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>TRAJETÓRIA E VISÃO (BIO)</label>
             <textarea v-model="sobreData.bioInstitucional" rows="5"></textarea>
             <p class="text-xs opacity-50 mt-2">* Pule duas linhas (Enter Enter) para criar novos parágrafos.</p>
          </div>
          <div class="input-group mb-6">
             <label>ÁREAS DE ATUAÇÃO (HABILIDADES)</label>
             <input v-model="sobreData.expertise" type="text" placeholder="Ex: Análise Econométrica, Advocacy de Gênero, Comunicação..." />
             <p class="text-xs opacity-50 mt-2">* Separe as áreas por vírgula.</p>
          </div>
          <div class="mb-6">
             <ImageUploader label="IMAGEM DE PERFIL" />
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid">
          <h2 class="card-label-black mb-8">CTA DE FECHAMENTO (CHAMADA)</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TEXTO PEQUENO (EYEBROW)</label>
                <input v-model="sobreData.ctaEyebrow" type="text" placeholder="Ex: Conexão de Impacto" />
             </div>
             <div class="input-group">
                <label>TÍTULO PRINCIPAL</label>
                <input v-model="sobreData.ctaTitle" type="text" />
             </div>
          </div>
          <div class="input-group mb-4">
             <label>DESCRIÇÃO DA CHAMADA</label>
             <textarea v-model="sobreData.ctaDesc" rows="2"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>COR DE FUNDO DO HERO</label>
                <select v-model="sobreData.heroBgColor" class="select-brutal">
                   <option value="#1C1C1C">Preto (Padrão)</option>
                   <option value="#FF6BCA">Magenta</option>
                   <option value="#A4CD39">Verde Lima</option>
                   <option value="#3D78E0">Azul</option>
                </select>
             </div>
             <div class="input-group">
                <label>COR DO BOTÃO CTA</label>
                <select v-model="sobreData.ctaBtnColor" class="select-brutal">
                   <option value="#FFE65A">Amarelo (Padrão)</option>
                   <option value="#FF6BCA">Magenta</option>
                   <option value="#A4CD39">Verde Lima</option>
                </select>
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TEXTO DO BOTÃO</label>
                <input v-model="sobreData.ctaBtn" type="text" placeholder="Ex: FALAR AGORA" />
             </div>
          </div>

          <button class="btn-save-brutal" @click="saveSobre" :disabled="isSaving">
             <Save :size="18" /> {{ isSaving ? 'ATUALIZANDO...' : 'SALVAR PÁGINA SOBRE' }}
          </button>
        </div>
      </section>
      <!-- 6. SERVIÇOS E EIXOS -->
      <section v-if="activeTab === 'servicos'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">CONFIGURAÇÕES GERAIS (PÁGINA DE EIXOS)</h2>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 1)</label>
                <input v-model="servicosConfigData.pageTitle1" type="text" placeholder="Ex: NOSSOS EIXOS" />
             </div>
             <div class="input-group">
                <label>TÍTULO DA PÁGINA (PARTE 2 - DESTAQUE)</label>
                <input v-model="servicosConfigData.pageTitle2" type="text" placeholder="Ex: DE AÇÃO" />
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TEXTO DO BOTÃO NO CARD</label>
                <input v-model="servicosConfigData.cardButton" type="text" placeholder="Ex: SOLICITAR CONSULTORIA" />
             </div>
          </div>
          <h3 class="font-display uppercase text-lg mb-4 mt-8">BLOCO: DEMANDAS SOB MEDIDA</h3>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TÍTULO DO BLOCO</label>
                <input v-model="servicosConfigData.ctaTitle" type="text" placeholder="Ex: DEMANDAS SOB MEDIDA?" />
             </div>
             <div class="input-group">
                <label>BOTÃO DO BLOCO</label>
                <input v-model="servicosConfigData.ctaButton" type="text" placeholder="Ex: FALAR COM ESPECIALISTA" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO DO BLOCO</label>
             <textarea v-model="servicosConfigData.ctaDesc" rows="2"></textarea>
          </div>
          <h3 class="font-display uppercase text-lg mb-4 mt-8">BLOCO: NEWSLETTER DE IMPACTO</h3>
          <div class="form-grid-2 mb-4">
             <div class="input-group">
                <label>TEXTO PEQUENO (EYEBROW)</label>
                <input v-model="servicosConfigData.newsletterEyebrow" type="text" placeholder="Ex: Rede de Mobilização" />
             </div>
             <div class="input-group">
                <label>TÍTULO PRINCIPAL</label>
                <input v-model="servicosConfigData.newsletterTitle" type="text" />
             </div>
          </div>
          <div class="input-group mb-4">
             <label>DESCRIÇÃO DA NEWSLETTER</label>
             <textarea v-model="servicosConfigData.newsletterDesc" rows="2"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TEXTO DO BOTÃO</label>
                <input v-model="servicosConfigData.newsletterBtn" type="text" placeholder="Ex: QUERO FAZER PARTE" />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveServico" :disabled="isSaving"><Save :size="18" /> SALVAR CONFIGURAÇÕES DA PÁGINA</button>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">ADICIONAR EIXO DE AÇÃO / SERVIÇO</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO DO EIXO</label>
                <input v-model="novoServico.title" type="text" placeholder="Ex: Escola de Formação" />
             </div>
             <div class="input-group">
                <label>ÍCONE (LUCIDE)</label>
                <select v-model="novoServico.icon" class="select-brutal">
                   <option value="Zap">Zap (Raio)</option>
                   <option value="Database">Database (Dados)</option>
                   <option value="Users">Users (Usuários)</option>
                   <option value="Briefcase">Briefcase (Maleta)</option>
                   <option value="Globe">Globe (Mundo)</option>
                   <option value="Target">Target (Alvo)</option>
                </select>
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>COR DE FUNDO (CARD)</label>
                <select v-model="novoServico.bg" class="select-brutal">
                   <option value="#FF6BCA">Magenta (Rosa)</option>
                   <option value="#A4CD39">Verde Água (Lima)</option>
                   <option value="#3D78E0">Azul</option>
                   <option value="#FFE65A">Amarelo</option>
                   <option value="#1C1C1C">Preto</option>
                </select>
             </div>
             <div class="input-group">
                <label>COR DO TEXTO</label>
                <select v-model="novoServico.textColor" class="select-brutal">
                   <option value="#FFFFFF">Branco</option>
                   <option value="#000000">Preto</option>
                </select>
             </div>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO CURTA</label>
             <textarea v-model="novoServico.description" rows="3" placeholder="Resumo do que o eixo entrega..."></textarea>
          </div>
          <button class="btn-save-brutal" @click="saveServico" :disabled="isSaving"><Plus :size="18" /> CADASTRAR EIXO</button>
        </div>

        <div class="editor-card-brutal shadow-solid">
           <h2 class="card-label-black mb-8">EIXOS DE AÇÃO CADASTRADOS</h2>
           <table class="table-brutal">
              <thead>
                 <tr>
                    <th>TÍTULO</th>
                    <th>COR</th>
                    <th>LINK</th>
                    <th>AÇÕES</th>
                 </tr>
              </thead>
              <tbody>
                 <tr v-for="srv in siteContent.services" :key="srv.id">
                    <td class="font-bold">{{ srv.title }}</td>
                    <td><span class="badge-pill" :style="{ background: srv.bg, color: srv.textColor }">{{ srv.icon }}</span></td>
                    <td>{{ srv.description ? srv.description.substring(0, 30) + '...' : '' }}</td>
                    <td class="actions-td">
                       <button class="icon-action"><Edit :size="16" /></button>
                       <button class="icon-action text-red-500" @click="deleteServico(srv.id)"><Trash :size="16" /></button>
                    </td>
                 </tr>
                 <tr v-if="!siteContent.services || siteContent.services.length === 0">
                    <td colspan="4" class="text-center opacity-50 py-6">Nenhum eixo cadastrado. (Usando eixos padrão no site)</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <!-- 7. PROJETOS -->
      <section v-if="activeTab === 'projetos'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">ADICIONAR PROJETO / CASE DE SUCESSO</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO DO PROJETO</label>
                <input type="text" placeholder="Ex: Campanha Prefeituras 2024" />
             </div>
             <div class="input-group">
                <label>CLIENTE / ORGANIZAÇÃO</label>
                <input type="text" placeholder="Ex: Instituto XPTO" />
             </div>
          </div>
          <div class="mb-6">
             <ImageUploader label="IMAGEM DE CAPA DO PROJETO" />
          </div>
          <button class="btn-save-brutal"><Plus :size="18" /> SALVAR PROJETO</button>
        </div>
      </section>

      <!-- 8. CONFIGURAÇÕES GLOBAIS -->
      <section v-if="activeTab === 'configuracoes'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">ESTÉTICA DA PLATAFORMA (CORES E LOGO)</h2>
          <div class="mb-6">
             <ImageUploader label="LOGO PRINCIPAL DO SITE (Fundo Escuro)" />
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>COR PRIMÁRIA (AÇÕES PRINCIPAIS)</label>
                <input type="color" value="#FFE65A" style="height: 50px; padding: 5px; cursor: pointer;" class="select-brutal" />
             </div>
             <div class="input-group">
                <label>COR SECUNDÁRIA (DESTAQUES)</label>
                <input type="color" value="#FF6BCA" style="height: 50px; padding: 5px; cursor: pointer;" class="select-brutal" />
             </div>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group flex items-center justify-start gap-4">
                <label class="checkbox-container" style="margin-top: 20px;">
                   <input type="checkbox" checked />
                   <span class="checkmark"></span>
                   <span class="check-label font-bold">ATIVAR MODO ESCURO (DARK MODE) POR PADRÃO</span>
                </label>
             </div>
             <div class="input-group flex items-center justify-start gap-4">
                <label class="checkbox-container" style="margin-top: 20px;">
                   <input type="checkbox" checked />
                   <span class="checkmark"></span>
                   <span class="check-label font-bold">HABILITAR SOMBRAS BRUTALISTAS SOLIDAS</span>
                </label>
             </div>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid">
          <h2 class="card-label-black mb-8">SEO E REDES SOCIAIS</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO BASE DO SITE (SEO)</label>
                <input type="text" placeholder="Ex: Narrativa Política - Inteligência..." />
             </div>
             <div class="input-group">
                <label>PALAVRAS-CHAVE (SEPARADAS POR VÍRGULA)</label>
                <input type="text" placeholder="Ex: advocacy, mobilização, dados..." />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>DESCRIÇÃO GLOBAL (META DESCRIPTION)</label>
             <textarea rows="2" placeholder="O ecossistema que conecta lideranças políticas..."></textarea>
          </div>
          <h3 class="font-display uppercase text-lg mb-4 mt-8">RODAPÉ / INFORMAÇÕES DE CONTATO</h3>
          <div class="input-group mb-6">
             <label>TEXTO DE COPYRIGHT (RODAPÉ)</label>
             <input type="text" placeholder="© 2026 Narrativa Política. Todos os direitos reservados." />
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>LINK DO INSTAGRAM</label>
                <input type="url" placeholder="https://instagram.com/..." />
             </div>
             <div class="input-group">
                <label>LINK DO LINKEDIN</label>
                <input type="url" placeholder="https://linkedin.com/in/..." />
             </div>
             <div class="input-group">
                <label>CHAVE PIX (DOAÇÕES)</label>
                <input type="text" placeholder="CNPJ ou E-mail PIX" />
             </div>
             <div class="input-group">
                <label>LINK DO WHATSAPP DE CONTATO</label>
                <input type="url" placeholder="https://wa.me/55..." />
             </div>
          </div>
          <button class="btn-save-brutal" @click="saveSobre" :disabled="isSaving">
             <Save :size="18" /> {{ isSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES GERAIS' }}
          </button>
        </div>
      </section>

      <!-- TAB DOAÇÕES -->
      <section v-if="activeTab === 'doacao'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">HEADLINE DA PÁGINA</h2>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>TÍTULO PARTE 1 (PRETO)</label>
                <input v-model="donateConfigData.headlinePart1" type="text" placeholder="Ex: TRANSFORME" />
             </div>
             <div class="input-group">
                <label>TÍTULO PARTE 2 (COLORIDO)</label>
                <input v-model="donateConfigData.headlinePart2" type="text" placeholder="Ex: NARRATIVA EM AÇÃO" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>SUBTÍTULO</label>
             <textarea v-model="donateConfigData.sub" rows="2" placeholder="Descrição motivacional para doar"></textarea>
          </div>
          <div class="form-grid-2 mb-6">
             <div class="input-group">
                <label>RÓTULO TOGGLE (ÚNICA)</label>
                <input v-model="donateConfigData.toggleLabelSingle" type="text" placeholder="ÚNICA" />
             </div>
             <div class="input-group">
                <label>RÓTULO TOGGLE (MENSAL)</label>
                <input v-model="donateConfigData.toggleLabelMonthly" type="text" placeholder="MENSAL" />
             </div>
          </div>
          <div class="input-group mb-6">
             <label>TEXTO DO BOTÃO CONTRIBUIR</label>
             <input v-model="donateConfigData.buttonText" type="text" placeholder="CONTRIBUIR AGORA" />
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">ESTATÍSTICAS DE IMPACTO</h2>
          <div class="form-grid-3">
             <div class="input-group">
                <label>LÍDERES</label>
                <input v-model="donateConfigData.statsLeaders" type="text" placeholder="2.500+ LÍDERES" />
             </div>
             <div class="input-group">
                <label>CAMPANHAS</label>
                <input v-model="donateConfigData.statsCampaigns" type="text" placeholder="10+ CAMPANHAS" />
             </div>
             <div class="input-group">
                <label>RELATÓRIOS</label>
                <input v-model="donateConfigData.statsReports" type="text" placeholder="80+ RELATÓRIOS" />
             </div>
          </div>
        </div>

        <button class="btn-save-brutal w-full" @click="saveDonateConfig" :disabled="isSaving">
           <Save :size="18" /> {{ isSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES DE DOAÇÃO' }}
        </button>
      </section>

      <!-- TAB VISIBILIDADE / MÓDULOS -->
      <section v-if="activeTab === 'visibilidade'" class="admin-section fade-in-up">
        <div class="editor-card-brutal shadow-solid mb-10">
          <h2 class="card-label-black mb-8">VISIBILIDADE DAS PÁGINAS</h2>
          <p class="mb-6 text-sm" style="font-family: 'Inter'; font-weight: 700;">Ative ou desative páginas e botões no menu principal da plataforma.</p>
          
          <div class="form-grid-2">
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuHome" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Página Inicial (Movimento)</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuArticles" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Artigos</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuOpportunities" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Oportunidades</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuPaths" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Trilhas (LMS)</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuServices" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Serviços</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuLibrary" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Biblioteca</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.menuAbout" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Sobre Mim</label>
             </div>
          </div>
        </div>

        <div class="editor-card-brutal shadow-solid mt-10 mb-10">
          <h2 class="card-label-black mb-8">ÁREA DO USUÁRIO</h2>
          <p class="mb-6 text-sm" style="font-family: 'Inter'; font-weight: 700;">Controle se as pessoas podem acessar a área do aluno ou criar novas contas.</p>
          <div class="form-grid-2">
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.showLogin" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Exibir botão de LOGIN no topo</label>
             </div>
             <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px;">
                <input type="checkbox" v-model="siteContent.settings.allowRegistration" style="width: 24px; height: 24px; flex-shrink: 0;" />
                <label style="margin: 0;">Permitir Criar Nova Conta</label>
             </div>
          </div>
        </div>

        <button class="btn-save-brutal w-full mt-10" @click="saveSettings">
           {{ isSaving ? 'SALVANDO...' : 'SALVAR VISIBILIDADE' }}
        </button>
      </section>

    </main>
  </div>
</template>

<style scoped>
.admin-dashboard-premium { display: flex; min-height: 100vh; background: #F1F5F9; position: relative; font-family: "Inter", sans-serif; }

/* FUNDO TEXTURA */
.film-grain-bg { position: fixed; inset: 0; z-index: 1; pointer-events: none; background-image: radial-gradient(#1C1C1C 1px, transparent 1px); background-size: 20px 20px; opacity: 0.05; }

/* SIDEBAR FIXA (ESCURA BRUTAL) */
.sidebar-black-fixed { 
  width: 320px; background: #1C1C1C; color: #FFF; 
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
  display: flex; flex-direction: column; padding: 40px 30px;
  border-right: 4px solid #1C1C1C;
  overflow-y: auto;
}
.sidebar-black-fixed::-webkit-scrollbar { width: 4px; }
.sidebar-black-fixed::-webkit-scrollbar-track { background: transparent; }
.sidebar-black-fixed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }

.sidebar-header { display: flex; align-items: center; gap: 15px; margin-bottom: 40px; padding-left: 10px; flex-shrink: 0; }
.logo-brutal-white { width: 50px; height: 50px; border: 3px solid #FFF; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: #FF6BCA; box-shadow: 4px 4px 0px #FFF; }
.logo-txt { font-family: "Archivo Black", sans-serif; font-size: 1.5rem; color: #1C1C1C; }
.badge-admin { background: #A4CD39; color: #1C1C1C; padding: 6px 12px; font-weight: 900; font-family: "Archivo Black"; font-size: 10px; border-radius: 6px; letter-spacing: 1px; border: 2px solid #1C1C1C; }

.nav-section-label {
  font-family: "Archivo Black", sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  padding: 20px 20px 8px;
  display: block;
}
.nav-section-label:first-child { padding-top: 0; }

.sidebar-nav-stack { display: flex; flex-direction: column; gap: 12px; }
.nav-btn { 
  background: transparent; color: rgba(255,255,255,0.7); border: 3px solid transparent; 
  padding: 16px 20px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; font-family: "Archivo Black";
  display: flex; align-items: center; gap: 15px; cursor: pointer; transition: all 0.2s ease; text-transform: uppercase;
}
.nav-btn:hover { color: #FFF; border-color: rgba(255,255,255,0.2); }
.nav-btn.active { background: #FF6BCA; color: #1C1C1C; border-color: #1C1C1C; box-shadow: 6px 6px 0px #A4CD39; transform: translate(-2px, -2px); }

.sidebar-footer { padding: 0 10px; }
.btn-logout-white { background: #FFF; border: 3px solid #1C1C1C; color: #1C1C1C; padding: 16px; border-radius: 12px; font-weight: 900; font-family: "Archivo Black"; font-size: 0.85rem; display: flex; justify-content: center; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s; width: 100%; box-shadow: 4px 4px 0px #FF6BCA; }
.btn-logout-white:hover { border-color: #DF2028; color: #FFF; background: #DF2028; box-shadow: 6px 6px 0px #1C1C1C; transform: translate(-2px, -2px); }

/* CONTEÚDO PRINCIPAL */
.main-content-area { 
  margin-left: 320px; flex-grow: 1; position: relative; z-index: 10;
  padding-top: 50px; padding-bottom: 120px; padding-left: 4rem; padding-right: 4rem;
  max-width: 1400px;
}

/* HEADER DO CONTEÚDO BRUTAL */
.admin-top-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 4px solid #1C1C1C; padding-bottom: 30px; margin-bottom: 40px; }
.admin-main-title { font-family: "Archivo Black", sans-serif; font-size: 3.5rem; letter-spacing: -0.02em; color: #1C1C1C; text-shadow: 4px 4px 0px #A4CD39; line-height: 1.1; }
.admin-subtitle { font-weight: 700; font-family: "Inter"; font-size: 1rem; color: #1C1C1C; opacity: 0.7; margin-top: 10px; }

.header-actions-row { display: flex; align-items: center; gap: 20px; }
.user-pill-brutal { 
  display: flex; align-items: center; gap: 15px; background: #FFF; border: 3px solid #1C1C1C; 
  padding: 8px 15px 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 0.8rem; color: #1C1C1C;
  box-shadow: 4px 4px 0px #1C1C1C; text-transform: uppercase;
}
.avatar-sm { width: 32px; height: 32px; background: #FF6BCA; border: 2px solid #1C1C1C; border-radius: 50%; color: #1C1C1C; display: flex; align-items: center; justify-content: center; font-weight: 900; }

.btn-preview-solid { 
  background: #3D78E0; color: #FFF; padding: 14px 28px; border-radius: 9999px; border: 3px solid #1C1C1C; 
  font-weight: 900; font-family: "Archivo Black"; font-size: 0.8rem; display: flex; align-items: center; gap: 10px; cursor: pointer; 
  transition: all 0.2s; box-shadow: 4px 4px 0px #1C1C1C; 
}
.btn-preview-solid:hover { background: #FFE65A; color: #1C1C1C; transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #1C1C1C; }

/* SEÇÕES E CARDS DE EDIÇÃO BRUTALISTAS */
.editor-card-brutal { background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 20px; padding: 50px; box-shadow: 12px 12px 0px #1C1C1C; transition: all 0.3s ease; }
.editor-card-brutal:hover { box-shadow: 16px 16px 0px #FF6BCA; transform: translate(-2px, -2px); }

.card-label-black { 
  font-family: "Archivo Black", sans-serif; font-size: 1.2rem; color: #1C1C1C; 
  letter-spacing: 1px; border-left: 8px solid #FFE65A; padding-left: 15px; text-transform: uppercase; margin-bottom: 30px; 
}

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; }

.input-group { display: flex; flex-direction: column; gap: 10px; }
.input-group label { font-family: "Archivo Black"; font-size: 12px; color: #1C1C1C; letter-spacing: 1px; text-transform: uppercase; }
.input-group input, .input-group textarea, .select-brutal { 
  width: 100%; padding: 18px 20px; border: 3px solid #1C1C1C; border-radius: 12px; 
  font-family: "Inter", sans-serif; font-weight: 700; font-size: 1rem; color: #1C1C1C; outline: none; transition: all 0.2s; background: #FFF; box-shadow: 4px 4px 0px rgba(0,0,0,0.05);
}
.input-group input:focus, .input-group textarea:focus, .select-brutal:focus { 
  border-color: #3D78E0; box-shadow: 6px 6px 0px #1C1C1C; transform: translate(-2px, -2px);
}
.input-group input::placeholder, .input-group textarea::placeholder { color: #1C1C1C; opacity: 0.4; font-weight: 500; }

/* PILLS PARA CATEGORIA BRUTAL */
.category-pill-group { display: flex; flex-wrap: wrap; gap: 10px; }
.cat-pill { 
  background: #FFF; border: 3px solid #1C1C1C; color: #1C1C1C; 
  padding: 12px 20px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; 
  cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: "Archivo Black", sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); text-transform: uppercase;
}
.cat-pill:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #1C1C1C; background: #F1F5F9; }
.cat-pill.active { background: #A4CD39; color: #1C1C1C; border-color: #1C1C1C; box-shadow: 6px 6px 0px #1C1C1C; transform: translate(-2px, -2px); }

/* CHECKBOX CUSTOM */
.checkbox-container { display: flex; align-items: center; gap: 12px; cursor: pointer; position: relative; margin-top: 5px; }
.checkbox-container input { position: absolute; opacity: 0; width: 0; }
.checkmark { height: 26px; width: 26px; background-color: #FFF; border: 3px solid #1C1C1C; border-radius: 8px; position: relative; transition: 0.2s; box-shadow: 2px 2px 0px #1C1C1C; }
.checkbox-container input:checked ~ .checkmark { background-color: #FF6BCA; }
.checkmark:after { content: ""; position: absolute; display: none; left: 8px; top: 3px; width: 6px; height: 12px; border: solid #1C1C1C; border-width: 0 3px 3px 0; transform: rotate(45deg); }
.checkbox-container input:checked ~ .checkmark:after { display: block; }
.check-label { font-weight: 900; font-size: 13px; color: #1C1C1C; font-family: "Inter"; text-transform: uppercase; }

/* BOTÕES DE AÇÃO BRUTALISTAS */
.btn-save-brutal { 
  background: #FFE65A; color: #1C1C1C; padding: 22px 45px; 
  border-radius: 16px; border: 4px solid #1C1C1C; font-family: "Archivo Black"; font-size: 1rem; text-transform: uppercase; 
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; 
  box-shadow: 8px 8px 0px #1C1C1C; transition: all 0.2s ease;
}
.btn-save-brutal:hover:not(:disabled) { background: #A4CD39; transform: translate(-4px, -4px); box-shadow: 12px 12px 0px #1C1C1C; }
.btn-save-brutal:disabled { opacity: 0.6; cursor: not-allowed; background: #CBD5E1; }

/* TABELA DE REGISTROS BRUTAL */
.table-brutal { width: 100%; border-collapse: separate; border-spacing: 0; border: 4px solid #1C1C1C; border-radius: 16px; overflow: hidden; background: #FFF; box-shadow: 8px 8px 0px #1C1C1C; }
.table-brutal th { background: #1C1C1C; color: #FFF; font-family: "Archivo Black"; font-size: 11px; padding: 20px 24px; text-align: left; letter-spacing: 1px; border-bottom: 4px solid #1C1C1C; text-transform: uppercase; }
.table-brutal td { padding: 20px 24px; border-bottom: 3px solid #F1F5F9; font-size: 1rem; font-weight: 700; color: #1C1C1C; vertical-align: middle; font-family: "Inter"; }
.table-brutal tr:last-child td { border-bottom: none; }

.badge-featured { background: #FF6BCA; color: #1C1C1C; padding: 6px 12px; border-radius: 8px; font-weight: 900; font-family: "Archivo Black"; font-size: 10px; border: 2px solid #1C1C1C; }
.badge-normal { background: #FFF; color: #1C1C1C; padding: 6px 12px; border-radius: 8px; font-weight: 900; font-family: "Archivo Black"; font-size: 10px; border: 2px solid #1C1C1C; }
.badge-pill { padding: 8px 16px; border-radius: 12px; font-weight: 900; font-family: "Archivo Black"; font-size: 11px; display: inline-block; border: 2px solid #1C1C1C; }

.actions-td { display: flex; gap: 15px; }
.icon-action { background: #FFF; border: 3px solid #1C1C1C; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; color: #1C1C1C; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); }
.icon-action:hover { background: #FFE65A; transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #1C1C1C; }
.icon-action.text-red-500:hover { color: #FFF; background: #DF2028; }

.mock-manager-box { width: 100%; height: 200px; background: #F8FAFC; border: 4px dashed #1C1C1C; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #1C1C1C; font-weight: 900; font-family: "Archivo Black"; font-size: 1.2rem; }

/* ANIMAÇÃO */
.fade-in-up { opacity: 0; transform: translateY(20px); animation: fadeInUp 0.5s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .sidebar-black-fixed { width: 90px; padding: 30px 15px; }
  .logo-txt { display: none; }
  .badge-admin, .sidebar-nav-stack span, .sidebar-footer span { display: none; }
  .nav-btn { padding: 15px; justify-content: center; }
  .main-content-area { margin-left: 90px; padding: 100px 20px 80px; }
  .admin-main-title { font-size: 2.5rem; }
  .form-grid-2, .form-grid-3 { grid-template-columns: 1fr; }
  .header-actions-row .btn-preview-solid span { display: none; }
}

/* --- NEWSLETTER CREATOR SUITE (PREMIUM) --- */
.metrics-grid-premium { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.metric-card-glass { 
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); 
  border: 3px solid #1C1C1C; padding: 30px; border-radius: 24px; 
}
.metric-label { font-family: "Archivo Black"; font-size: 11px; opacity: 0.6; letter-spacing: 1px; margin-bottom: 10px; }
.metric-value { font-family: "Archivo Black"; font-size: 3rem; color: #1C1C1C; line-height: 1; margin-bottom: 5px; }
.metric-trend { font-size: 12px; font-weight: 800; }

.creator-workspace { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 40px; align-items: start; }

.editor-pane { background: #FFF; border: 4px solid #1C1C1C; border-radius: 30px; padding: 50px; }
.input-premium { 
  background: #F8FAFC; border: 3px solid #1C1C1C !important; border-radius: 16px !important; 
  font-size: 1.1rem !important; padding: 20px !important; 
}

.btn-tool-sm { background: #F1F5F9; border: 2px solid #1C1C1C; padding: 8px 15px; border-radius: 8px; font-weight: 800; font-size: 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.btn-tool-sm:hover { background: #FFE65A; }

.btn-launch-premium { 
  background: #FF6BCA; color: #1C1C1C; padding: 22px 40px; border-radius: 16px; border: 4px solid #1C1C1C;
  font-family: "Archivo Black"; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 15px;
  box-shadow: 8px 8px 0px #1C1C1C; flex-grow: 1; justify-content: center;
}
.btn-launch-premium:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0px #3D78E0; background: #FFE65A; }

.btn-schedule-premium { 
  background: #FFF; color: #1C1C1C; padding: 22px 30px; border-radius: 16px; border: 4px solid #1C1C1C;
  font-family: "Archivo Black"; cursor: pointer; box-shadow: 8px 8px 0px #1C1C1C;
}

/* MOCKUP DE DISPOSITIVO */
.device-mockup { 
  width: 100%; max-width: 320px; height: 640px; background: #1C1C1C; border: 12px solid #1C1C1C; 
  border-radius: 50px; position: relative; overflow: hidden; margin: 0 auto;
}
.device-screen { width: 100%; height: 100%; background: #FFF; overflow-y: auto; padding: 20px; }
.device-screen::-webkit-scrollbar { width: 0px; }
.device-home-bar { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; background: #000; border-radius: 10px; opacity: 0.2; }

.email-header-mock { display: flex; items-center: center; gap: 10px; padding-bottom: 20px; border-bottom: 1px solid #EEE; margin-bottom: 20px; }
.logo-circle { width: 30px; height: 30px; background: #FF6BCA; color: #1C1C1C; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; border: 1.5px solid #1C1C1C; }
.email-header-mock span { font-weight: 900; font-size: 12px; }

.preview-img-mock { width: 100%; border-radius: 12px; margin-bottom: 20px; border: 2px solid #1C1C1C; }
.preview-title-mock { font-family: "Archivo Black"; font-size: 1.4rem; line-height: 1.2; margin-bottom: 15px; }
.preview-text-mock { font-size: 0.9rem; line-height: 1.5; color: #444; }
.preview-footer-mock { margin-top: 30px; padding-top: 20px; border-top: 1px solid #EEE; font-size: 10px; opacity: 0.5; text-align: center; }

/* TABELA PREMIUM */
.table-premium { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
.table-premium th { font-family: "Archivo Black"; font-size: 11px; opacity: 0.5; text-align: left; padding: 0 20px; }
.table-premium td { background: #FFF; padding: 20px; border-top: 2px solid #1C1C1C; border-bottom: 2px solid #1C1C1C; font-weight: 800; font-size: 14px; }
.table-premium td:first-child { border-left: 2px solid #1C1C1C; border-radius: 15px 0 0 15px; }
.table-premium td:last-child { border-right: 2px solid #1C1C1C; border-radius: 0 15px 15px 0; }

.avatar-table { width: 35px; height: 35px; background: #FFE65A; border: 2px solid #1C1C1C; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; }
.badge-tag { background: #F1F5F9; padding: 5px 12px; border-radius: 6px; font-size: 10px; border: 1.5px solid #1C1C1C; }
.badge-status-active { background: #A4CD39; padding: 5px 12px; border-radius: 6px; font-size: 10px; border: 1.5px solid #1C1C1C; }

.sticky-preview { position: sticky; top: 120px; }

/* REAJUSTES DE CORES E FORMAS */
.card-label-black { border-left: 12px solid #FF6BCA; font-size: 1.4rem; }
.pane-header { display: flex; justify-content: space-between; align-items: center; }

@media (max-width: 1400px) {
   .creator-workspace { grid-template-columns: 1fr; }
   .preview-pane { display: none; }
}

/* --- SEO & SOCIAL SIDEBAR --- */
.editor-workspace-dual { display: grid; grid-template-columns: 1fr 300px; gap: 30px; align-items: start; }
.seo-sidebar { background: #F8FAFC; border: 3px solid #1C1C1C; border-radius: 20px; padding: 25px; position: sticky; top: 120px; }

.seo-card, .social-helper-card { border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; }
.score-circle-container { display: flex; flex-direction: column; align-items: center; margin: 20px 0; }
.score-circle { width: 80px; height: 80px; border: 6px solid #FFE65A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: "Archivo Black"; font-size: 1.5rem; color: #1C1C1C; background: #FFF; box-shadow: 4px 4px 0px rgba(0,0,0,0.05); }
.score-label { font-family: "Archivo Black"; font-size: 10px; margin-top: 10px; opacity: 0.5; }

.seo-checklist { list-style: none; padding: 0; margin-top: 20px; }
.seo-checklist li { font-size: 11px; font-weight: 700; color: #64748B; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.seo-checklist li::before { content: "○"; color: #CBD5E1; font-weight: 900; }
.seo-checklist li.ok { color: #1C1C1C; }
.seo-checklist li.ok::before { content: "●"; color: #A4CD39; }

.caption-box { background: #FFF; border: 2px solid #1C1C1C; border-radius: 10px; padding: 15px; font-size: 11px; font-weight: 600; line-height: 1.4; color: #475569; max-height: 150px; overflow-y: auto; white-space: pre-wrap; }
.btn-copy-sm { background: #1C1C1C; color: #FFF; border: none; padding: 8px 15px; border-radius: 6px; font-family: "Archivo Black"; font-size: 9px; cursor: pointer; transition: 0.2s; width: 100%; }
.btn-copy-sm:hover { background: #3D78E0; transform: translateY(-2px); }

/* CLASSES UTILITÁRIAS FALTANTES */
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2.5rem; }
.mb-10 { margin-bottom: 3.5rem; }
.mb-12 { margin-bottom: 4rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mt-10 { margin-top: 3rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-start { justify-content: flex-start; }
.gap-4 { gap: 1rem; }
.font-bold { font-weight: 700; }
.text-center { text-align: center; }
.opacity-50 { opacity: 0.5; }
.opacity-70 { opacity: 0.7; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
</style>