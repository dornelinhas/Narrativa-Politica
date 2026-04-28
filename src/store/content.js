import { reactive } from 'vue'
import { supabase } from '../lib/supabase'

const initialContent = {
  isLoading: true,
  lastActivity: [],
  posts: [],
  newsletters: [],
  newsletterArchiveConfig: {
    heroTitle1: "ACERVO DE",
    heroTitle2: "EDIÇÕES",
    heroSubtitle: "Explore as análises, despachos e convocações enviadas anteriormente para a nossa base.",
    cardEyebrow: "Assinatura Mensal",
    cardTitle: "Gostou das últimas edições?",
    cardDesc: "Receba nossos despachos estratégicos mensalmente na sua caixa de entrada. Junte-se à nossa rede de mobilização. Sem spam.",
    cardBtn: "QUERO RECEBER",
    emptyState: "Nenhuma edição encontrada no arquivo."
  },
  // DOAÇÃO – página Apoie
  donateConfig: {
    headlinePart1: "TRANSFORME",
    headlinePart2: "NARRATIVA EM AÇÃO",
    sub: "Sua contribuição financia inteligência, dados e formação para as lideranças que estão mudando o Brasil.",
    toggleLabelSingle: "ÚNICA",
    toggleLabelMonthly: "MENSAL",
    cardEyebrow: "Assinatura Mensal",
    cardTitle: "Gostou das últimas edições?",
    cardDesc: "Receba nossos despachos estratégicos mensalmente na sua caixa de entrada. Junte-se à nossa rede de mobilização. Sem spam.",
    buttonText: "CONTRIBUIR AGORA",
    stats: {
      leaders: "2.500+ LÍDERES",
      campaigns: "10+ CAMPANHAS",
      reports: "80+ RELATÓRIOS"
    }
  },
  servicesConfig: {
    pageTitle1: "NOSSOS EIXOS",
    pageTitle2: "DE AÇÃO",
    cardButton: "SOLICITAR CONSULTORIA",
    ctaTitle: "DEMANDAS SOB MEDIDA?",
    ctaDesc: "Construímos tecnologias sociais e estratégias de articulação específicas para a realidade do seu território ou instituição.",
    ctaButton: "FALAR COM ESPECIALISTA",
    newsletterEyebrow: "Rede de Mobilização",
    newsletterTitle: "Junte-se ao <br /> Movimento.",
    newsletterDesc: "Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.",
    newsletterBtn: "QUERO FAZER PARTE"
  },
  services: [
    { 
      id: 1, 
      title: 'Mentoria e Palestras', 
      description: 'Provocação intelectual e orientação estratégica para lideranças. Construção de capital político e narrativas de autoridade institucional.', 
      icon: 'Zap',
      bg: '#FF6BCA', // Magenta
      textColor: '#FFFFFF',
    },
    { 
      id: 2, 
      title: 'Análise Técnica', 
      description: 'Inteligência de dados aplicada à incidência política. Traduzimos indicadores complexos em ferramentas de negociação territorial.', 
      icon: 'Database',
      bg: '#A4CD39', // Lima
      textColor: '#000000',
    },
    { 
      id: 3, 
      title: 'Lideranças', 
      description: 'Academia de alta performance para tomadores de decisão. Metodologias avançadas em estratégia, articulação e governança de impacto.', 
      icon: 'Users',
      bg: '#3D78E0', // Azul
      textColor: '#FFFFFF',
    },
    { 
      id: 4, 
      title: 'Gestão de Projetos', 
      description: 'Engenharia social e operacionalização de causas complexas. Do planejamento à métrica, garantindo escala e sustentabilidade.', 
      icon: 'Briefcase',
      bg: '#FFE65A', // Amarelo
      textColor: '#000000',
    }
  ],
  projects: [],
  paths: [],
  libraryConfig: {
    pageTitle1: "NOSSA",
    pageTitle2: "BIBLIOTECA",
    pageSubtitle: "Acesso aberto a publicações, notas técnicas e datasets fundamentais para o debate político contemporâneo.",
    searchPlaceholder: "BUSCAR DOCUMENTO...",
    filterLabel: "FILTRAR:",
    btnDownload: "DOWNLOAD PDF",
    btnSource: "FONTE",
    emptyTitle: "NENHUM DOCUMENTO ENCONTRADO",
    emptyDesc: "Não há registros na base de dados para estes parâmetros. Ajuste os filtros ou tente novos termos de busca.",
    emptyBtn: "LIMPAR BUSCA"
  },
  library: [
    { id: 1, title: 'Impacto Econômico da Transição Energética', description: 'Relatório completo sobre o impacto da descarbonização nas economias emergentes da América Latina.', category: 'Relatório', fileUrl: '#', externalLink: '#' },
    { id: 2, title: 'Dataset: Participação Política Feminina', description: 'Dados abertos sobre a evolução da representação feminina em cargos eletivos entre 2010 e 2024.', category: 'Dataset', fileUrl: '#', externalLink: '#' },
    { id: 3, title: 'Nota Técnica: Reforma Tributária Solidária', description: 'Análise aprofundada dos impactos distributivos da nova proposta de reforma tributária.', category: 'Nota Técnica', fileUrl: '#', externalLink: '#' },
    { id: 4, title: 'Manual de Organização Comunitária', description: 'Guia prático para estruturação de movimentos sociais e táticas de mobilização local.', category: 'Guia', fileUrl: '#', externalLink: '#' },
    { id: 5, title: 'Mapeamento de Leis Ambientais Aprovadas', description: 'Compilado legislativo das principais vitórias ambientais no congresso nacional nos últimos 5 anos.', category: 'Dataset', fileUrl: '#', externalLink: '#' },
    { id: 6, title: 'Advocacy em Tempos de Crise', description: 'Estudo de caso sobre campanhas vitoriosas durante o período de retração democrática.', category: 'Relatório', fileUrl: '#', externalLink: '#' }
  ],
  subscribers: [],
  settings: {
    siteName: "Narrativa Politica",
    siteTagline: "Transformando Teoria Econômica em Impacto",
    siteDescription: "Plataforma de economia e dados.",
    contactEmail: "contatonarrativapolitica@gmail.com",
    showLogin: true,
    allowRegistration: false,
    menuHome: true,
    menuArticles: true,
    menuAtuacao: true,
    menuAbout: true,
    menuServices: true,
    menuProjects: true,
    menuPaths: true,
    menuLibrary: true,
    menuOpportunities: true,
    menuContact: true,
    menu: [
      { name: 'Movimento', link: '/' },
      { name: 'Artigos', link: '/conteudo' },
      { 
        name: 'Radar', 
        link: '#', 
        submenu: [
          { name: 'Oportunidades', link: '/oportunidades' },
          { name: 'Serviços', link: '/servicos' },
          { name: 'Trilhas', link: '/trilhas' },
          { name: 'Biblioteca', link: '/biblioteca' },
          { name: 'Projetos', link: '/projetos' }
        ]
      },
      { name: 'Sobre', link: '/sobre' },
      { name: 'Envolva-se', link: '/contatos', highlight: true }
    ]
  },
  home: {
    heroTitle: "REIVINDIQUE",
    heroTitleAccent: "O FUTURO.",
    heroDescription: "Uma plataforma para ativismo de alto impacto, análise política e mobilização comunitária. Não viemos para debater, viemos para mudar a estrutura.",
    heroButtonText: "AGIR AGORA",
    marqueeText: "POR DEMOCRACIA, TERRITÓRIO E JUSTIÇA SOCIAL",
    heroFontSize: "11",
    marqueePadding: "2.2",
    newsletterEyebrow: "Rede de Mobilização",
    newsletterTitle: "Junte-se ao <br /> Movimento.",
    newsletterDescription: "Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.",
    newsletterPlaceholder: "Digite seu email...",
    newsletterButton: "QUERO FAZER PARTE",
    radarEditorialTitle: "Radar",
    radarEditorialSubtitle: "Editorial"
  },
  articlesConfig: {
    searchPlaceholder: "Pesquisar...",
    column1Title: "ARTIGOS E ANÁLISES",
    column2Title: "NOTÍCIAS",
    backButtonText: "VOLTAR AO RADAR",
    newsletterTitle: "GOSTOU DESTE ENSAIO?",
    newsletterDesc: "Receba nossa curadoria direto no seu e-mail.",
    relatedTitle: "CONTINUE EXPLORANDO"
  },
  opportunitiesConfig: {
    pageTitle1: "HUB DE",
    pageTitle2: "TALENTOS",
    searchPlaceholder: "Cargo, local ou organização...",
    toggleText: "DESTAQUE NORDESTE",
    detailBackBtn: "PORTAL DE TALENTOS",
    detailApplyBtn: "CANDIDATAR-SE",
    detailShareTitle: "COMPARTILHAR",
    detailStatusBadge: "INSCRIÇÕES ABERTAS"
  },
  tracks: [
    {
      id: 'advocacy',
      name: 'ADVOCACY EM POLÍTICAS PÚBLICAS',
      description: 'Transforme causas em pautas públicas nacionais. Domine o mapeamento de atores e negociação institucional.',
      hours: '12h',
      status: 'GRATUITO',
      hasCertificate: true,
      color: '#FF6BCA', // Magenta
      topics: ['Poder Local', 'Mapeamento', 'Influência'],
      modules: [
        { 
          id: 1, title: 'Módulo 01', name: 'Conceitos de Poder Local', 
          lessonsCount: 4, duration: '2h 15m', completed: true,
          lessons: [
            { id: 101, title: 'Geopolítica Urbana e Território', type: 'video', done: true },
            { id: 102, title: 'As Fissuras do Poder Local', type: 'video', done: true }
          ]
        },
        { 
          id: 2, title: 'Módulo 02', name: 'Mapeamento de Redes', 
          lessonsCount: 6, duration: '3h 40m', active: true,
          lessons: [
            { id: 201, title: 'Matriz de Influência', type: 'video', active: true },
            { id: 202, title: 'Estratégias de Redes', type: 'doc', done: false }
          ]
        },
        { 
          id: 3, title: 'Módulo 03', name: 'Estratégia de Mídia', 
          lessonsCount: 5, duration: '2h 50m', locked: true, color: '#3D78E0', lessons: []
        },
        { 
          id: 4, title: 'Módulo 04', name: 'Articulação Global', 
          lessonsCount: 8, duration: '4h 10m', locked: true, color: '#A4CD39', lessons: []
        }
      ]
    },
    {
      id: 'economia',
      name: 'ECONOMIA TERRITORIAL E PODER',
      description: 'Entenda como o dinheiro se move no território. Orçamento público e ferramentas econômicas para autonomia.',
      hours: '18h',
      status: 'PREMIUM',
      hasCertificate: true,
      color: '#20B2AA', // Verde Água
      topics: ['Orçamento Público', 'Mercados Locais', 'Inteligência'],
      modules: []
    },
    {
      id: 'diplomacia',
      name: 'DIPLOMACIA DE BASE GLOBAL',
      description: 'Conecte seu território ao mundo. Incidência internacional e parcerias globais para líderes do sul.',
      hours: '15h',
      status: 'PREMIUM',
      hasCertificate: true,
      color: '#3D78E0', // Azul
      topics: ['Geopolítica Urbana', 'Organismos Mundiais', 'Financiamento'],
      modules: []
    },
    {
      id: 'genero',
      name: 'GÊNERO E LIDERANÇA POLÍTICA',
      description: 'Estratégias de incidência sob a perspectiva interseccional e construção de capital político feminino.',
      hours: '10h',
      status: 'GRATUITO',
      hasCertificate: true,
      color: '#FFE65A', // Amarelo
      topics: ['Interseccionalidade', 'Narrativas', 'Base'],
      modules: []
    }
  ],
  about: { 
    heroTitlePart1: 'IDEIAS QUE', 
    heroTitlePart2: 'MOVEM ESTRUTURAS', 
    subtitle: 'Estratégia focada em traduzir teoria econômica para a ação política.',
    name: 'Anne Dornelas', 
    role: 'Estrategista Política & Administradora', 
    bioInstitucional: "Sou uma estrategista focada em traduzir teoria econômica para a ação política. Nos últimos anos, dediquei minha carreira a construir pontes entre dados quantitativos rigorosos e as necessidades urgentes de movimentos sociais.", 
    expertise: 'Análise Econométrica, Advocacy de Gênero, Estratégia de Impacto Social, Articulação Política, Comunicação Estratégica, Pesquisa de Território',
    image: '',
    ctaEyebrow: 'Conexão de Impacto',
    ctaTitle: 'VAMOS MONTAR OU <br /> CRIAR ALGO JUNTOS?',
    ctaDesc: 'Construímos tecnologias sociais e infraestruturas estratégicas que permitem aos movimentos pautarem o debate público com total autonomia.',
    ctaBtn: 'FALAR AGORA'
  },
  opportunities: [
    {
      id: 1,
      category: "Bolsas",
      title: "FORMAÇÃO EM POLÍTICAS PÚBLICAS",
      description: "Impacto focado em economia de gênero",
      fullDescription: "Descrição detalhada sobre a formação em políticas públicas com foco em economia de gênero...",
      deadline: "ABERTO",
      link: "#"
    },
    {
      id: 2,
      category: "Vagas de Emprego",
      title: "BOLSAS PARA MULHERES EM DADOS",
      description: "Impacto focado em liderança stem",
      fullDescription: "Descrição detalhada sobre as bolsas para mulheres em dados com foco em liderança STEM...",
      deadline: "ABERTO",
      link: "#"
    }
  ],
  authors: [
    {
      id: 'anne',
      name: 'Anne Dornelas',
      role: 'Especialista em Impacto',
      bio: 'Liderança focada em transformar teoria econômica em ação política e social.',
      image: ''
    }
  ],
  categories: ['Artigos', 'Notícias', 'Análises']
}

export const siteContent = reactive({ ...initialContent })

const siteSettingKeys = [
  'home', 'about', 'settings', 'donateConfig', 'services', 'opportunities', 'tracks',
  'library', 'projects', 'newsletterArchiveConfig', 'articlesConfig', 'opportunitiesConfig',
  'servicesConfig', 'libraryConfig'
]

const normalizePost = (post) => ({
  ...post,
  title: post.title || post.titulo || '',
  subtitle: post.subtitle || post.subtitulo || post.excerpt || '',
  excerpt: post.excerpt || post.subtitle || post.subtitulo || '',
  author: post.author || post.autor || '',
  type: post.type || post.tipo || 'Artigo',
  category: post.category || post.categoria || '',
  featured: post.featured ?? post.destaque_home ?? false,
  content: post.content || post.conteudo || '',
  image: post.image || post.capa_url || '',
  imageDescription: post.imageDescription || post.imagedescription || '',
  references: post.references || '',
  highlightQuote: post.highlightQuote || post.highlightquote || '',
  date: post.date || post.created_at || ''
})

const mergeSettingValue = (currentValue, savedValue) => {
  if (Array.isArray(savedValue)) return savedValue
  if (Array.isArray(currentValue)) {
    return savedValue && typeof savedValue === 'object' ? Object.values(savedValue) : currentValue
  }
  if (savedValue && typeof savedValue === 'object') return { ...(currentValue || {}), ...savedValue }
  return savedValue ?? currentValue
}

export const fetchAllContent = async () => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  try {
    const fetchTable = async (table, opt = {}) => {
      let q = supabase.from(table).select('*')
      if (opt.order) q = q.order(opt.order, opt.orderOptions)
      const { data } = opt.single ? await q.maybeSingle() : await q
      return data || (opt.single ? null : [])
    }

    const [articles, newsletters, subscribers, settings] = await Promise.all([
      fetchTable('articles', { order: 'date', orderOptions: { ascending: false } }),
      fetchTable('newsletters', { order: 'created_at', orderOptions: { ascending: false } }),
      fetchTable('subscribers'),
      fetchTable('site_settings')
    ])

    if (articles && articles.length > 0) siteContent.posts = articles.map(normalizePost)
    if (newsletters && newsletters.length > 0) siteContent.newsletters = newsletters
    if (subscribers) siteContent.subscribers = subscribers
    
    if (settings) {
      settings.forEach(s => {
        // Se a chave for 'home', 'about', etc, mapeia para o objeto correto
        if (siteSettingKeys.includes(s.key)) {
           siteContent[s.key] = mergeSettingValue(siteContent[s.key], s.value)
        } else {
           // Outras chaves de configuração no siteContent.settings
           siteContent.settings[s.key] = s.value
        }
      })
    }

    siteContent.isLoading = false;
    return { success: true }
  } catch (e) {
    console.error('Erro ao buscar conteúdo:', e)
    siteContent.isLoading = false;
    return { success: false, error: e.message }
  }
}

export const saveItemToSupabase = async (table, item, isNew = false) => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  try {
    const tableMap = { 'posts': 'articles' }
    const actualTable = tableMap[table] || table
    
    let result
    if (siteSettingKeys.includes(actualTable)) {
      result = await supabase.from('site_settings').upsert({ key: actualTable, value: item })
    } else {
      result = isNew ? await supabase.from(actualTable).insert(item) : await supabase.from(actualTable).update(item).eq('id', item.id)
    }
    return result.error ? { success: false, error: result.error.message } : { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

export const deleteItemFromSupabase = async (table, id) => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  const { error } = await supabase.from(table).delete().eq('id', id)
  return error ? { success: false, error: error.message } : { success: true }
}

export const saveContent = () => localStorage.setItem('np_content_v6', JSON.stringify(siteContent))
export const logActivity = (title, type = 'Edição') => {
  if (!siteContent.lastActivity) siteContent.lastActivity = []
  siteContent.lastActivity.unshift({ id: Date.now(), title, type, date: new Date().toLocaleString('pt-BR') })
}
