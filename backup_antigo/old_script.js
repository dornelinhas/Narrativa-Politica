
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { supabase } from '../lib/supabase'
import { Settings, LogOut, CheckCircle, Clock, Trash2, Home, Search, BookOpen, Briefcase, ChevronDown, Package, FileText, User, Mail, Folder, Download, Eye, Heart, Library, Save, Plus, Edit, Trash, Zap, Calendar, X, ExternalLink, ArrowUp, Sparkles } from 'lucide-vue-next'
import BrutalEditor from '../components/BrutalEditor.vue'
import ImageUploader from '../components/ImageUploader.vue'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { siteContent, fetchAllContent, getOpportunityVisibilityState, logActivity, parseOpportunityDeadline, getPageViews } from '../store/content'

const router = useRouter()
const { user, logout } = useAuth()
const activeTab = ref('home')
const isSaving = ref(false)
const analytics = ref([])

const defaultArticleForm = () => ({ title: '', subtitle: '', author: '', type: 'Artigo', category: '', featured: false, content: '', image: '', imageDescription: '', imageCaption: '', references: '', highlightQuote: '', status: 'publicado' })
const defaultOpportunityForm = () => ({ title: '', category: 'Vagas de Emprego', type: 'Remoto', location: '', deadline: '', link: '', description: '', fullDescription: '', image: '', status: 'approved', sourceUrl: '', reviewNotes: '', featured: false, showOnHome: false })
const defaultCurationForm = () => ({
  minScore: 60,
  maxAgeDays: 30,
  rejectIfMissingDeadline: false,
  includeKeywords: 'vaga, bolsa, edital, chamada, oportunidade, inscri├º├úo',
  excludeKeywords: 'voluntariado n├úo remunerado, spam, marketing multin├¡vel',
  acceptedCategories: 'Vagas de Emprego, Bolsas, Editais, Estudos, Educa├º├úo',
  acceptedLocations: 'Brasil, Remoto, H├¡brido, Presencial, Nordeste',
  requireSourceMatch: true
})
const defaultTrackForm = () => ({
  name: '', description: '', hours: '', status: 'GRATUITO', hasCertificate: true, color: '#FF6BCA',
  mod1: '', mod2: '', mod3: ''
})
const defaultServiceForm = () => ({ title: '', description: '', icon: 'Zap', bg: '#FF6BCA', textColor: '#FFFFFF' })
const defaultProjectForm = () => ({ title: '', organization: '', description: '', impact: '', image: '', tags: '', status: 'publicado' })
const defaultDocForm = () => ({ title: '', description: '', category: 'Relat├│rio', fileUrl: '', externalLink: '', status: 'publicado' })

const editingArtigoId = ref(null)
const editingVagaId = ref(null)
const editingTrilhaId = ref(null)
const editingServicoId = ref(null)
const editingProjectId = ref(null)
const editingDocId = ref(null)

const isEditingArtigo = computed(() => editingArtigoId.value !== null)
const isEditingVaga = computed(() => editingVagaId.value !== null)
const isEditingTrilha = computed(() => editingTrilhaId.value !== null)
const isEditingServico = computed(() => editingServicoId.value !== null)
const isEditingProject = computed(() => editingProjectId.value !== null)
const isEditingDoc = computed(() => editingDocId.value !== null)

const scrollToForm = (id) => {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 0)
}

const normalizeOpportunityDeadline = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const parsed = parseOpportunityDeadline(raw)
  if (!parsed) return raw.toUpperCase() === 'ABERTO' ? 'ABERTO' : raw
  return parsed.toISOString().slice(0, 10)
}

const isValidHttpUrl = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return true
  try {
    const parsed = new URL(raw)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const recordActivity = async (title, type = 'Edi├º├úo') => {
  logActivity(title, type)
  await persistSiteSetting('lastActivity', siteContent.lastActivity)
}

const persistSiteSetting = async (key, value) => {
  if (!supabase) return
  const { error } = await supabase.from('site_settings').upsert({ key, value })
  if (error) throw error
}

// --- ESTADOS DO DASHBOARD ---
// NEWSLETTER
const newsletters = ref(siteContent.newsletters || [])
const inscritos = ref(siteContent.subscribers || [])
const novaNewsletter = ref({ titulo: '', descricao: '', conteudo: '', capa_url: '', tag: 'Pol├¡tica' })
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
const novoArtigo = ref(defaultArticleForm())
const categoriasDisponiveis = ref(['Mobiliza├º├úo', 'Educa├º├úo', 'Clima', 'Not├¡cias', 'An├ílise'])
const isGeneratingSummary = ref(false)
const projetos = ref(siteContent.projects || [])
const novoProjeto = ref(defaultProjectForm())

const adicionarNovaCategoria = () => {
  const nova = prompt("Digite o nome da nova categoria:")
  if (nova && !categoriasDisponiveis.value.includes(nova)) {
    categoriasDisponiveis.value.push(nova)
    novoArtigo.value.category = nova
  }
}

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
    alert("N├úo foi poss├¡vel gerar o resumo autom├ítico. Verifique se a GEMINI_API_KEY est├í configurada.")
  } finally {
    isGeneratingSummary.value = false
  }
}
// VAGAS E OPORTUNIDADES
const oppsConfigData = ref({
  pageTitle1: '', pageTitle2: '', searchPlaceholder: '', toggleText: '',
  detailBackBtn: '', detailApplyBtn: '', detailShareTitle: '', detailStatusBadge: ''
})
const curationConfigData = ref({
  minScore: siteContent.opportunitiesCurationConfig?.minScore ?? 60,
  maxAgeDays: siteContent.opportunitiesCurationConfig?.maxAgeDays ?? 30,
  rejectIfMissingDeadline: siteContent.opportunitiesCurationConfig?.rejectIfMissingDeadline ?? false,
  includeKeywords: (siteContent.opportunitiesCurationConfig?.includeKeywords || []).join(', '),
  excludeKeywords: (siteContent.opportunitiesCurationConfig?.excludeKeywords || []).join(', '),
  acceptedCategories: (siteContent.opportunitiesCurationConfig?.acceptedCategories || []).join(', '),
  acceptedLocations: (siteContent.opportunitiesCurationConfig?.acceptedLocations || []).join(', '),
  requireSourceMatch: siteContent.opportunitiesCurationConfig?.requireSourceMatch ?? true
})
const vagas = ref(siteContent.opportunities || [])
const novaVaga = ref(defaultOpportunityForm())
const opportunityImportUrl = ref('')
const isImportingOpportunity = ref(false)
const reviewQueue = computed(() => (siteContent.opportunities || []).filter(v => getOpportunityVisibilityState(v) === 'pending'))
const publishedVagas = computed(() => (siteContent.opportunities || []).filter(v => getOpportunityVisibilityState(v) === 'public'))
const rejectedVagas = computed(() => (siteContent.opportunities || []).filter(v => getOpportunityVisibilityState(v) === 'rejected'))
const researchSites = [
  { id: 'opportunitiesforyouth', label: 'Opportunities for Youth', url: 'https://opportunitiesforyouth.org/', note: 'Editais, bolsas e chamadas' },
  { id: 'terceirosetor', label: 'Vagas Terceiro Setor', url: 'https://vagas.terceirosetor.net/', note: 'Vagas e oportunidades do setor' }
]
const opportunityStatusLabel = (vaga) => ({
  public: 'PUBLICADA',
  pending: 'EM REVIS├âO',
  rejected: 'N├âO PUBLICADA',
  expired: 'ENCERRADA',
  closed: 'ENCERRADA'
}[getOpportunityVisibilityState(vaga)] || 'EM REVIS├âO')
const opportunityStatusClass = (vaga) => ({
  public: 'badge-normal',
  pending: 'badge-featured',
  rejected: 'badge-danger',
  expired: 'badge-danger',
  closed: 'badge-danger'
}[getOpportunityVisibilityState(vaga)] || 'badge-featured')
const curationRules = computed(() => ({
  minScore: Number(curationConfigData.value.minScore || 0),
  maxAgeDays: Number(curationConfigData.value.maxAgeDays || 0),
  rejectIfMissingDeadline: !!curationConfigData.value.rejectIfMissingDeadline,
  includeKeywords: curationConfigData.value.includeKeywords,
  excludeKeywords: curationConfigData.value.excludeKeywords,
  acceptedCategories: curationConfigData.value.acceptedCategories,
  acceptedLocations: curationConfigData.value.acceptedLocations,
  requireSourceMatch: !!curationConfigData.value.requireSourceMatch
}))
const curationMetrics = computed(() => {
  const includeCount = curationConfigData.value.includeKeywords.split(',').map(s => s.trim()).filter(Boolean).length
  const excludeCount = curationConfigData.value.excludeKeywords.split(',').map(s => s.trim()).filter(Boolean).length
  return {
    includeCount,
    excludeCount,
    pending: reviewQueue.value.length,
    published: publishedVagas.value.length,
    rejected: rejectedVagas.value.length
  }
})
const recentActivity = computed(() => (siteContent.lastActivity || []).slice(0, 8))
// LMS / TRILHAS
const trilhas = ref(siteContent.tracks || [])
const novaTrilha = ref(defaultTrackForm())
// SERVI├çOS / EIXOS DE A├ç├âO
const servicosConfigData = ref({
  pageTitle1: '', pageTitle2: '', cardButton: '', ctaTitle: '', ctaDesc: '', ctaButton: '',
  newsletterEyebrow: '', newsletterTitle: '', newsletterDesc: '', newsletterBtn: ''
})
const servicos = ref(siteContent.services || [])
const novoServico = ref(defaultServiceForm())
// BIBLIOTECA
const bibliotecaConfigData = ref({
  pageTitle1: '', pageTitle2: '', pageSubtitle: '', searchPlaceholder: '', filterLabel: '',
  btnDownload: '', btnSource: '', emptyTitle: '', emptyDesc: '', emptyBtn: ''
})
const docs = ref(siteContent.library || [])
const novoDoc = ref(defaultDocForm())

// SOBRE MIM
const sobreData = ref({ 
  heroTitlePart1: '', heroTitlePart2: '', subtitle: '', 
  name: '', role: '', bioInstitucional: '', expertise: '', image: '',
  ctaEyebrow: '', ctaTitle: '', ctaDesc: '', ctaBtn: ''
})

import { sendNewsletterEmail } from '../lib/emailSender'

const showScrollTop = ref(false)
const handleAdminScroll = () => {
  showScrollTop.value = window.scrollY > 400
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
import { onUnmounted } from 'vue'

// --- FUN├ç├òES DE NEWSLETTER ---
const saveNewsletter = async () => {
  if (!novaNewsletter.value.titulo || !novaNewsletter.value.conteudo) {
    alert("T├¡tulo e Conte├║do s├úo obrigat├│rios.")
    return
  }

  const confirmSend = confirm("Deseja SALVAR e DISPARAR esta newsletter por e-mail para todos os inscritos agora?")
  
  isSaving.value = true
  try {
    const payload = {
      ...novaNewsletter.value,
      enviado_em: new Date().toISOString()
    }
    
    // 1. Salva no Banco de Dados (Acervo)
    if (supabase) {
      const { error } = await supabase.from('newsletters').insert([payload])
      if (error) throw error
    }

    // 2. Dispara E-mails se confirmado
    if (confirmSend) {
      const emails = inscritos.value.map(s => s.email).filter(e => e)
      if (emails.length > 0) {
        const htmlBody = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 10px solid #1C1C1C; padding: 40px;">
            <h1 style="font-size: 24px; text-transform: uppercase; border-bottom: 5px solid #1C1C1C; padding-bottom: 10px;">${novaNewsletter.value.titulo}</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">${novaNewsletter.value.descricao}</p>
            <div style="margin: 30px 0;">
              ${novaNewsletter.value.conteudo}
            </div>
            <hr style="border: 0; border-top: 2px solid #EEE;" />
            <p style="font-size: 12px; color: #999;">Voc├¬ recebeu este e-mail da Narrativa Pol├¡tica.</p>
          </div>
        `
        const success = await sendNewsletterEmail(novaNewsletter.value.titulo, htmlBody, emails)
        if (!success) alert("Newsletter salva no arquivo, mas houve um erro no disparo dos e-mails.")
      }
    }
    
    siteContent.newsletters.unshift({ ...payload, id: Date.now() })
    novaNewsletter.value = { titulo: '', descricao: '', conteudo: '', capa_url: '', tag: 'Pol├¡tica' }
    await recordActivity(`Newsletter: ${payload.titulo}`, confirmSend ? 'Envio' : 'Cria├º├úo')
    isSaving.value = false 
    alert(confirmSend ? 'Newsletter salva e enviada com sucesso!' : 'Newsletter salva no arquivo!') 
  } catch(e) { 
    console.error(e)
    isSaving.value = false
    alert('Erro ao processar newsletter.')
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
    Object.assign(siteContent.newsletterArchiveConfig, newsletterArchiveConfigData.value)
    if (supabase) {
      await supabase.from('site_settings').upsert({ key: 'newsletterArchiveConfig', value: newsletterArchiveConfigData.value })
    }
    await recordActivity('Acervo de newsletter', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes do Acervo Salvas!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveDonateConfig = async () => {
  isSaving.value = true
  try {
    const config = {
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
    siteContent.donateConfig = config
    if (supabase) {
      await supabase.from('site_settings').upsert({ key: 'donateConfig', value: config })
    }
    await recordActivity('P├ígina de doa├º├úo', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes de Doa├º├úo Salvas!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

// --- FUN├ç├òES DE INTELIG├èNCIA (SEO / SOCIAL) ---
const seoScore = computed(() => {
  let score = 0
  if (novoArtigo.value.title.length > 30) score += 25
  if (novoArtigo.value.subtitle.length > 50) score += 25
  if (novoArtigo.value.content.length > 500) score += 25
  if (novoArtigo.value.image) score += 25
  return score
})

const copyCaption = () => {
  const text = `${novoArtigo.value.title} ­ƒÜÇ\n\nAcabamos de publicar uma nova an├ílise estrat├®gica no Radar Editorial da Narrativa Pol├¡tica.\n\nLeia o ensaio completo em nosso portal. #NarrativaPolitica #Advocacy #Impacto`
  navigator.clipboard.writeText(text)
  alert('Legenda copiada para o seu clipboard!')
}

// --- FUN├ç├òES DE BANCO DE DADOS (SUPABASE) ---
const loadData = async () => {
  isSaving.value = true
  try {
    await fetchAllContent()
    // Sincroniza refs locais com o store reativo
    artigos.value = siteContent.posts || []
    vagas.value = siteContent.opportunities || []
    trilhas.value = siteContent.tracks || []
    servicos.value = siteContent.services || []
    docs.value = siteContent.library || []
    inscritos.value = siteContent.subscribers || []
    newsletters.value = siteContent.newsletters || []
    
    // Atualiza outros dados de configura├º├úo
    if (siteContent.home) Object.assign(homeData.value, siteContent.home)
    if (siteContent.about) Object.assign(sobreData.value, siteContent.about)
    if (siteContent.articlesConfig) Object.assign(articlesConfigData.value, siteContent.articlesConfig)
    if (siteContent.opportunitiesConfig) Object.assign(oppsConfigData.value, siteContent.opportunitiesConfig)
    if (siteContent.servicesConfig) Object.assign(servicosConfigData.value, siteContent.servicesConfig)
    if (siteContent.libraryConfig) Object.assign(bibliotecaConfigData.value, siteContent.libraryConfig)
    if (siteContent.donateConfig) {
      const d = siteContent.donateConfig
      donateConfigData.value = {
        ...donateConfigData.value,
        ...d,
        statsLeaders: d.stats?.leaders || '',
        statsCampaigns: d.stats?.campaigns || '',
        statsReports: d.stats?.reports || ''
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados do banco:', error)
  } finally {
    isSaving.value = false
  }
}

const saveHome = async () => {
  isSaving.value = true
  try {
    // Atualiza a mem├│ria local
    Object.assign(siteContent.home, homeData.value)

    if (supabase) {
      const { error } = await supabase.from('site_settings').upsert({ 
        key: 'home', 
        value: homeData.value 
      })
      if (error) throw error
    }
    await recordActivity('Home', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('Home salva com sucesso!') }, 400)
  } catch(e) { 
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar no banco: ' + (e.message || e)) 
  }
}

const saveArticlesConfig = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.articlesConfig, articlesConfigData.value)
    await persistSiteSetting('articlesConfig', articlesConfigData.value)
    await recordActivity('Editorial geral', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes da P├ígina salvas!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar configura├º├Áes: ' + (e.message || e))
  }
}

const resetArtigoForm = () => {
  novoArtigo.value = defaultArticleForm()
  editingArtigoId.value = null
}

const editArtigo = (art) => {
  editingArtigoId.value = art.id
  novoArtigo.value = {
    title: art.title || '',
    subtitle: art.subtitle || art.excerpt || '',
    author: art.author || '',
    type: art.type || 'Artigo',
    category: art.category || '',
    featured: Boolean(art.featured),
    content: art.content || '',
    image: art.image || '',
    imageDescription: art.imageDescription || '',
    references: art.references || '',
    highlightQuote: art.highlightQuote || '',
    status: art.status || 'publicado'
  }
  scrollToForm('article-editor-form')
}

const previewArtigo = (id) => {
  const href = router.resolve({ name: 'content-detail', params: { id } }).href
  window.open(href, '_blank')
}

// Version: 2026-04-26-FINAL-FIX
const saveArtigo = async (statusOverride = null) => {
  if (!novoArtigo.value.title) {
    alert("O t├¡tulo do artigo ├® obrigat├│rio.")
    return
  }
  isSaving.value = true
  // Captura o estado de edi├º├úo antes de qualquer processamento
  const wasEditing = Boolean(editingArtigoId.value !== null)
  
  try {
    if (!siteContent.posts) siteContent.posts = []
    const existing = siteContent.posts.find(p => String(p.id) === String(editingArtigoId.value))
    
    // Preparar o payload para o Supabase
    const wordCount = novoArtigo.value.content ? novoArtigo.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0
    const calcReadingTime = Math.max(1, Math.ceil(wordCount / 200))

    const finalStatus = statusOverride || novoArtigo.value.status || 'publicado'

    const payload = {
      title: novoArtigo.value.title,
      subtitle: novoArtigo.value.subtitle,
      excerpt: novoArtigo.value.subtitle,
      author: novoArtigo.value.author,
      type: novoArtigo.value.type,
      category: novoArtigo.value.category,
      featured: novoArtigo.value.featured,
      content: novoArtigo.value.content,
      image: novoArtigo.value.image,
      imageDescription: novoArtigo.value.imageDescription,
      imageCaption: novoArtigo.value.imageCaption,
      references: novoArtigo.value.references,
      highlightQuote: novoArtigo.value.highlightQuote,
      reading_time: calcReadingTime, // Novo campo calculado
      status: finalStatus,
      date: existing?.date || new Date().toISOString()
    }

    if (editingArtigoId.value) {
      payload.id = editingArtigoId.value
    }

    let savedArticle = { ...payload }

    if (supabase) {
      const { data, error } = await supabase.from('articles').upsert(payload).select().maybeSingle()
      if (error) throw error
      if (data) savedArticle = { ...data }
    } else {
      if (!savedArticle.id) savedArticle.id = Date.now()
    }

    // Atualiza a lista global com seguran├ºa
    await fetchAllContent() 
    artigos.value = [...siteContent.posts]
    await recordActivity(`Artigo: ${payload.title}`, wasEditing ? 'Edi├º├úo' : 'Cria├º├úo')
    
    resetArtigoForm()
    isSaving.value = false
    alert(wasEditing ? 'Artigo atualizado!' : 'Artigo publicado com sucesso!')
  } catch(e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar artigo: ' + (e.message || e))
  }
}

const deleteArtigo = async (art) => {
  if (!confirm(`Excluir o artigo "${art.title}"?`)) return
  isSaving.value = true
  try {
    if (supabase) {
      const { error } = await supabase.from('articles').delete().eq('id', art.id)
      if (error) throw error
    }
    siteContent.posts = (siteContent.posts || []).filter(p => String(p.id) !== String(art.id))
    artigos.value = siteContent.posts
    await recordActivity(`Artigo exclu├¡do: ${art.title}`, 'Exclus├úo')
    if (String(editingArtigoId.value) === String(art.id)) resetArtigoForm()
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir artigo: ' + (e.message || e))
  }
}

const saveSobre = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.about, sobreData.value)
    if (supabase) {
      await supabase.from('site_settings').upsert({ key: 'about', value: sobreData.value })
    }
    await recordActivity('P├ígina Sobre', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('P├ígina Sobre atualizada!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveSettings = async () => {
  isSaving.value = true
  try {
    if (supabase) {
      await supabase.from('site_settings').upsert({ key: 'settings', value: siteContent.settings })
    }
    await recordActivity('Visibilidade do site', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('M├│dulos atualizados!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveOpportunitiesConfig = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.opportunitiesConfig, oppsConfigData.value)
    await persistSiteSetting('opportunitiesConfig', oppsConfigData.value)
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes do Hub salvas!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar configura├º├Áes: ' + (e.message || e))
  }
}

const resetVagaForm = () => {
  novaVaga.value = defaultOpportunityForm()
  editingVagaId.value = null
}

const editVaga = (vaga) => {
  editingVagaId.value = vaga.id
  novaVaga.value = {
    title: vaga.title || '',
    category: vaga.category || 'Vagas de Emprego',
    type: vaga.type || 'Remoto',
    location: vaga.location || '',
    deadline: vaga.deadline || '',
    link: vaga.link || '',
    description: vaga.description || '',
    fullDescription: vaga.fullDescription || '',
    image: vaga.image || '',
    status: vaga.status || 'approved',
    sourceUrl: vaga.sourceUrl || vaga.link || '',
    reviewNotes: vaga.reviewNotes || '',
    featured: Boolean(vaga.featured),
    showOnHome: Boolean(vaga.showOnHome)
  }
  scrollToForm('opportunity-editor-form')
}

const previewVaga = (id) => {
  const href = router.resolve({ name: 'opportunity-detail', params: { id } }).href
  window.open(href, '_blank')
}

const saveVaga = async (statusOverride = null) => {
  if (!novaVaga.value.title) {
    alert("O t├¡tulo da vaga ├® obrigat├│rio.")
    return
  }
  isSaving.value = true
  try {
    const opportunitiesList = siteContent.opportunities ? [...siteContent.opportunities] : []
    const normalizedDeadline = normalizeOpportunityDeadline(novaVaga.value.deadline)
    const finalStatus = statusOverride || novaVaga.value.status || 'approved'
    
    const payload = {
      ...novaVaga.value,
      status: finalStatus,
      deadline: normalizedDeadline,
      id: editingVagaId.value || Date.now()
    }
    
    const wasEditing = isEditingVaga.value
    if (wasEditing) {
      const index = opportunitiesList.findIndex(v => String(v.id) === String(editingVagaId.value))
      if (index !== -1) {
        opportunitiesList[index] = payload
      }
    } else {
      opportunitiesList.unshift(payload)
    }
    
    // Atualiza o store global E a ref local clonando o array para garantir reatividade
    siteContent.opportunities = [...opportunitiesList]
    vagas.value = [...opportunitiesList]
    
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`Oportunidade: ${payload.title}`, wasEditing ? 'Edi├º├úo' : 'Cria├º├úo')
    
    resetVagaForm()
    isSaving.value = false
    alert(wasEditing ? 'Oportunidade atualizada com sucesso!' : 'Oportunidade salva com sucesso!')
  } catch(e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar no banco: ' + (e.message || e))
  }
}

const saveCurationConfig = async () => {
  isSaving.value = true
  try {
    const payload = {
      minScore: Number(curationConfigData.value.minScore || 0),
      maxAgeDays: Number(curationConfigData.value.maxAgeDays || 0),
      rejectIfMissingDeadline: !!curationConfigData.value.rejectIfMissingDeadline,
      includeKeywords: curationConfigData.value.includeKeywords.split(',').map(s => s.trim()).filter(Boolean),
      excludeKeywords: curationConfigData.value.excludeKeywords.split(',').map(s => s.trim()).filter(Boolean),
      acceptedCategories: curationConfigData.value.acceptedCategories.split(',').map(s => s.trim()).filter(Boolean),
      acceptedLocations: curationConfigData.value.acceptedLocations.split(',').map(s => s.trim()).filter(Boolean),
      requireSourceMatch: !!curationConfigData.value.requireSourceMatch
    }
    siteContent.opportunitiesCurationConfig = {
      ...(siteContent.opportunitiesCurationConfig || {}),
      ...payload
    }
    await persistSiteSetting('opportunitiesCurationConfig', siteContent.opportunitiesCurationConfig)
    await recordActivity('Regras de curadoria', 'Configura├º├úo')
    setTimeout(() => { isSaving.value = false; alert('Regras de curadoria salvas!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar regras: ' + (e.message || e))
  }
}

const updateVagaStatus = async (vaga, status) => {
  isSaving.value = true
  try {
    if (!siteContent.opportunities) siteContent.opportunities = []
    const index = siteContent.opportunities.findIndex(v => String(v.id) === String(vaga.id))
    if (index === -1) throw new Error('Oportunidade n├úo encontrada.')

    const updated = { ...siteContent.opportunities[index], status }
    siteContent.opportunities.splice(index, 1, updated)
    vagas.value = siteContent.opportunities
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`Oportunidade: ${updated.title}`, `Status ${status}`)

    if (String(editingVagaId.value) === String(vaga.id)) {
      novaVaga.value = { ...novaVaga.value, status }
    }
  } finally {
    isSaving.value = false
  }
}

const approveVaga = async (vaga) => updateVagaStatus(vaga, 'approved')
const rejectVaga = async (vaga) => updateVagaStatus(vaga, 'rejected')
const moveVagaToReview = async (vaga) => updateVagaStatus(vaga, 'pending')

const toggleFeatured = async (vaga) => {
  try {
    vaga.featured = !vaga.featured
    // Garantir reatividade total for├ºando atualiza├º├úo da lista
    siteContent.opportunities = [...siteContent.opportunities]
    vagas.value = siteContent.opportunities
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`Oportunidade ${vaga.featured ? 'em destaque' : 'removida do destaque'}: ${vaga.title}`, 'Edi├º├úo')
  } catch (e) {
    console.error('Erro ao alternar destaque:', e)
    alert('Erro ao salvar altera├º├úo de destaque.')
  }
}

const toggleShowOnHome = async (vaga) => {
  try {
    vaga.showOnHome = !vaga.showOnHome
    // Garantir reatividade total
    siteContent.opportunities = [...siteContent.opportunities]
    vagas.value = siteContent.opportunities
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`Oportunidade ${vaga.showOnHome ? 'exibida na home' : 'removida da home'}: ${vaga.title}`, 'Edi├º├úo')
  } catch (e) {
    console.error('Erro ao alternar exibi├º├úo na home:', e)
    alert('Erro ao salvar altera├º├úo de exibi├º├úo.')
  }
}

const deleteVaga = async (vaga) => {
  if (!confirm(`Excluir a oportunidade "${vaga.title}"?`)) return
  isSaving.value = true
  try {
    siteContent.opportunities = (siteContent.opportunities || []).filter(v => String(v.id) !== String(vaga.id))
    vagas.value = siteContent.opportunities
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`Oportunidade exclu├¡da: ${vaga.title}`, 'Exclus├úo')
    if (String(editingVagaId.value) === String(vaga.id)) resetVagaForm()
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir oportunidade: ' + (e.message || e))
  }
}

const saveTrilha = async () => {
  if (!novaTrilha.value.name) {
    alert("O nome da trilha ├® obrigat├│rio.")
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
    await persistSiteSetting('tracks', siteContent.tracks)
    novaTrilha.value = defaultTrackForm()
    setTimeout(() => { isSaving.value = false; alert('Trilha salva!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const saveServicesConfig = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.servicesConfig, servicosConfigData.value)
    await persistSiteSetting('servicesConfig', servicosConfigData.value)
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes da p├ígina salvas!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar configura├º├Áes: ' + (e.message || e))
  }
}

const resetServicoForm = () => {
  novoServico.value = defaultServiceForm()
  editingServicoId.value = null
}

const editServico = (srv) => {
  editingServicoId.value = srv.id
  novoServico.value = {
    title: srv.title || '',
    description: srv.description || '',
    icon: srv.icon || 'Zap',
    bg: srv.bg || '#FF6BCA',
    textColor: srv.textColor || '#FFFFFF'
  }
  scrollToForm('service-editor-form')
}

const saveServico = async () => {
  if (!novoServico.value.title) {
    alert("O nome do eixo de a├º├úo ├® obrigat├│rio.")
    return
  }
  isSaving.value = true
  try {
    if (!siteContent.services) siteContent.services = []
    const payload = { ...novoServico.value, id: editingServicoId.value || Date.now() }
    const wasEditing = isEditingServico.value
    if (wasEditing) {
      const index = siteContent.services.findIndex(s => String(s.id) === String(editingServicoId.value))
      if (index !== -1) siteContent.services.splice(index, 1, payload)
    } else {
      siteContent.services.push(payload)
    }
    
    await persistSiteSetting('services', siteContent.services)

    resetServicoForm()
    setTimeout(() => { isSaving.value = false; alert(wasEditing ? 'Eixo atualizado!' : 'Eixo cadastrado!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const importOpportunityFromUrl = async () => {
  if (!opportunityImportUrl.value.trim()) {
    alert('Cole a URL da oportunidade.')
    return
  }
  isImportingOpportunity.value = true
  try {
    const response = await fetch('/api/import-opportunity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: opportunityImportUrl.value.trim(),
        rules: curationRules.value
      })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'N├úo foi poss├¡vel importar.')

    const items = data.items || []
    if (items.length === 0) throw new Error('Nenhuma vaga encontrada nesta URL.')
    
    // Para importa├º├úo manual, pegamos a primeira vaga encontrada para preencher o formul├írio
    const firstItem = items[0]

    novaVaga.value = {
      ...novaVaga.value,
      title: firstItem.title || novaVaga.value.title,
      category: firstItem.category || novaVaga.value.category,
      type: firstItem.type || novaVaga.value.type,
      location: firstItem.location || novaVaga.value.location,
      deadline: firstItem.deadline || novaVaga.value.deadline,
      link: firstItem.link || opportunityImportUrl.value.trim(),
      description: firstItem.description || novaVaga.value.description,
      fullDescription: firstItem.fullDescription || novaVaga.value.fullDescription,
      status: firstItem.status || 'pending',
      sourceUrl: opportunityImportUrl.value.trim(),
      reviewNotes: firstItem.reviewNotes || firstItem.publicationDecision || '',
    }
    if (firstItem.image) {
      novaVaga.value.image = firstItem.image
    }
    
    if (items.length > 1) {
      alert(`Foram encontradas ${items.length} vagas. A primeira foi carregada no formul├írio. Considere usar a Descoberta Autom├ítica para importar todas em lote.`)
    } else {
      alert('Conte├║do importado. Revise antes de publicar.')
    }
  } catch (e) {
    console.error(e)
    alert('Falha ao importar: ' + (e.message || e))
  } finally {
    isImportingOpportunity.value = false
  }
}

const discoveredLinks = ref([])
const isDiscovering = ref(false)
const selectedDiscoveryLinks = ref([])

const customDiscoveryUrl = ref('')

const runDiscovery = async () => {
  isDiscovering.value = true
  discoveredLinks.value = []
  
  // Combina as fontes padr├úo com a customizada se houver
  const sources = [...researchSites]
  if (customDiscoveryUrl.value.trim()) {
    sources.push({ label: 'Link Customizado', url: customDiscoveryUrl.value.trim() })
  }

  try {
    const response = await fetch('/api/discover-opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sources })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro na descoberta.')
    
    // Filtra links que j├í existem no siteContent.opportunities
    const existingLinks = new Set((siteContent.opportunities || []).map(o => o.sourceUrl || o.link))
    discoveredLinks.value = (data.links || []).filter(l => !existingLinks.has(l.url) && l.score > 20)
    
    if (discoveredLinks.value.length === 0) {
      alert('Nenhum link novo relevante encontrado.')
    } else {
      customDiscoveryUrl.value = '' // Limpa se teve sucesso
    }
  } catch (e) {
    console.error(e)
    alert('Falha ao descobrir links: ' + e.message)
  } finally {
    isDiscovering.value = false
  }
}

const importSelectedLinks = async () => {
  if (selectedDiscoveryLinks.value.length === 0) return
  
  const toImport = [...selectedDiscoveryLinks.value]
  selectedDiscoveryLinks.value = []
  
  let successCount = 0
  let failCount = 0
  
  isSaving.value = true
  
  for (const url of toImport) {
    try {
      const response = await fetch('/api/import-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, rules: curationRules.value })
      })
      const data = await response.json()
      if (response.ok) {
        const items = data.items || []
        for (const item of items) {
          const payload = {
            ...item,
            id: Date.now() + Math.random(),
            status: item.status || 'pending'
          }
          siteContent.opportunities.unshift(payload)
          successCount++
        }
      } else {
        failCount++
      }
    } catch (e) {
      console.error(e)
      failCount++
    }
  }
  
  vagas.value = siteContent.opportunities
  await persistSiteSetting('opportunities', siteContent.opportunities)
  await recordActivity(`${successCount} vagas importadas em lote`, 'Importa├º├úo')
  
  isSaving.value = false
  alert(`Importa├º├úo conclu├¡da: ${successCount} sucessos individuais, ${failCount} falhas de URL. Verifique a Fila de Revis├úo.`)
  
  // Remove os importados da lista de descobertos
  discoveredLinks.value = discoveredLinks.value.filter(l => !toImport.includes(l.url))
}

const bulkImportText = ref('')
const isImportingBulk = ref(false)

const importBulkText = async () => {
  if (!bulkImportText.value.trim()) return
  
  isImportingBulk.value = true
  try {
    const response = await fetch('/api/import-opportunity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: bulkImportText.value, // Passamos o texto no campo que a API j├í aceita
        rules: curationRules.value 
      })
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erro ao processar texto.')
    
    const items = data.items || []
    if (items.length === 0) {
      alert('A IA n├úo conseguiu identificar vagas claras neste texto. Tente copiar um trecho menor ou mais espec├¡fico.')
      return
    }

    let successCount = 0
    for (const item of items) {
      const payload = {
        ...item,
        id: Date.now() + Math.random(),
        status: item.status || 'pending'
      }
      siteContent.opportunities.unshift(payload)
      successCount++
    }
    
    vagas.value = siteContent.opportunities
    await persistSiteSetting('opportunities', siteContent.opportunities)
    await recordActivity(`${successCount} vagas extra├¡das de texto colado`, 'Importa├º├úo')
    
    bulkImportText.value = ''
    alert(`Sucesso! A IA encontrou e separou ${successCount} vagas. Confira na Fila de Revis├úo abaixo.`)
  } catch (e) {
    console.error(e)
    alert('Falha na an├ílise: ' + e.message)
  } finally {
    isImportingBulk.value = false
  }
}

const useResearchSiteUrl = (site) => {
  if (!site?.url) return
  opportunityImportUrl.value = site.url
  scrollToForm('opportunity-editor-form')
}

const openResearchSite = (site) => {
  if (!site?.url) return
  window.open(site.url, '_blank', 'noopener,noreferrer')
}

const resetProjectForm = () => {
  novoProjeto.value = defaultProjectForm()
  editingProjectId.value = null
}

const editProject = (project) => {
  editingProjectId.value = project.id
  novoProjeto.value = {
    title: project.title || '',
    organization: project.organization || '',
    description: project.description || project.desc || '',
    impact: project.impact || '',
    image: project.image || '',
    tags: Array.isArray(project.tags) ? project.tags.map(tag => tag.label).join(', ') : (project.tags || ''),
    status: project.status || 'publicado'
  }
  scrollToForm('project-editor-form')
}

const saveProject = async (statusOverride = null) => {
  if (!novoProjeto.value.title) {
    alert('O t├¡tulo do projeto ├® obrigat├│rio.')
    return
  }
  isSaving.value = true
  try {
    if (!siteContent.projects) siteContent.projects = []
    const finalStatus = statusOverride || novoProjeto.value.status || 'publicado'
    const payload = {
      id: editingProjectId.value || Date.now(),
      title: novoProjeto.value.title,
      organization: novoProjeto.value.organization,
      description: novoProjeto.value.description,
      desc: novoProjeto.value.description,
      impact: novoProjeto.value.impact,
      image: novoProjeto.value.image,
      status: finalStatus,
      tags: novoProjeto.value.tags
        ? novoProjeto.value.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(label => ({ label }))
        : []
    }
    const wasEditing = isEditingProject.value
    if (wasEditing) {
      const index = siteContent.projects.findIndex(p => String(p.id) === String(editingProjectId.value))
      if (index !== -1) siteContent.projects.splice(index, 1, payload)
    } else {
      siteContent.projects.push(payload)
    }

    await persistSiteSetting('projects', siteContent.projects)

    resetProjectForm()
    setTimeout(() => { isSaving.value = false; alert(wasEditing ? 'Projeto atualizado!' : 'Projeto cadastrado!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar projeto: ' + (e.message || e))
  }
}

const projectTagList = computed(() =>
  novoProjeto.value.tags
    ? novoProjeto.value.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : []
)

const addProjectTag = (tag) => {
  const current = projectTagList.value
  if (current.includes(tag)) return
  novoProjeto.value.tags = [...current, tag].join(', ')
}

const removeProjectTag = (tag) => {
  novoProjeto.value.tags = projectTagList.value.filter(t => t !== tag).join(', ')
}

const deleteProject = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este projeto?')) return
  isSaving.value = true
  try {
    siteContent.projects = (siteContent.projects || []).filter(p => String(p.id) !== String(id))
    await persistSiteSetting('projects', siteContent.projects)
    if (String(editingProjectId.value) === String(id)) resetProjectForm()
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir projeto: ' + (e.message || e))
  }
}

const saveLibraryConfig = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.libraryConfig, bibliotecaConfigData.value)
    await persistSiteSetting('libraryConfig', bibliotecaConfigData.value)
    setTimeout(() => { isSaving.value = false; alert('Configura├º├Áes da biblioteca salvas!') }, 400)
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao salvar configura├º├Áes: ' + (e.message || e))
  }
}

const resetDocForm = () => {
  novoDoc.value = defaultDocForm()
  editingDocId.value = null
}

const editDoc = (doc) => {
  editingDocId.value = doc.id
  novoDoc.value = {
    title: doc.title || '',
    description: doc.description || '',
    category: doc.category || 'Relat├│rio',
    fileUrl: doc.fileUrl || '',
    externalLink: doc.externalLink || '',
    status: doc.status || 'publicado'
  }
  scrollToForm('library-editor-form')
}

const saveBiblioteca = async (statusOverride = null) => {
  if (!novoDoc.value.title) {
    alert("O t├¡tulo do documento ├® obrigat├│rio.")
    return
  }
  isSaving.value = true
  try {
    if (!siteContent.library) siteContent.library = []
    const finalStatus = statusOverride || novoDoc.value.status || 'publicado'
    const payload = { ...novoDoc.value, status: finalStatus, id: editingDocId.value || Date.now() }
    const wasEditing = isEditingDoc.value
    if (wasEditing) {
      const index = siteContent.library.findIndex(d => String(d.id) === String(editingDocId.value))
      if (index !== -1) siteContent.library.splice(index, 1, payload)
    } else {
      siteContent.library.push(payload)
    }
    
    await persistSiteSetting('library', siteContent.library)

    resetDocForm()
    setTimeout(() => { isSaving.value = false; alert(wasEditing ? 'Documento atualizado!' : 'Documento cadastrado!') }, 400)
  } catch(e) { console.error(e); isSaving.value = false; }
}

const deleteServico = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este eixo?')) return
  isSaving.value = true
  try {
    siteContent.services = (siteContent.services || []).filter(s => String(s.id) !== String(id))
    await persistSiteSetting('services', siteContent.services)
    if (String(editingServicoId.value) === String(id)) resetServicoForm()
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir eixo: ' + (e.message || e))
  }
}

const deleteDoc = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este documento?')) return
  isSaving.value = true
  try {
    siteContent.library = (siteContent.library || []).filter(d => String(d.id) !== String(id))
    await persistSiteSetting('library', siteContent.library)
    if (String(editingDocId.value) === String(id)) resetDocForm()
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir documento: ' + (e.message || e))
  }
}

const deleteTrilha = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta trilha?')) return
  isSaving.value = true
  try {
    siteContent.tracks = (siteContent.tracks || []).filter(t => String(t.id) !== String(id))
    await persistSiteSetting('tracks', siteContent.tracks)
    isSaving.value = false
  } catch (e) {
    console.error(e)
    isSaving.value = false
    alert('Erro ao excluir trilha: ' + (e.message || e))
  }
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
  window.addEventListener('scroll', handleAdminScroll)
  
  if (!user.value) {
    router.push('/login')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleAdminScroll)
})
