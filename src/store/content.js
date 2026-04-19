import { reactive } from 'vue'
import { supabase } from '../lib/supabase'

const initialContent = {
  lastActivity: [],
  posts: [
    {
      id: 1,
      title: "Por que o ativismo corporativo fracassa.",
      excerpt: "Um mergulho profundo na cooptação de movimentos radicais e o que o impacto autêntico exige dos organizadores comunitários no cenário atual.",
      category: "Mobilização",
      image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800",
      date: "2026-04-18"
    },
    {
      id: 2,
      title: "Como estruturar um sindicato local no modelo 2026",
      excerpt: "A nova onda de sindicalismo que está transformando a relação entre capital e trabalho nas cidades.",
      category: "Educação",
      image: "",
      date: "2026-04-15"
    },
    {
      id: 3,
      title: "A geopolítica da descarbonização nos países em desenvolvimento",
      excerpt: "Como o sul global está liderando e sofrendo com a transição energética global.",
      category: "Clima",
      image: "",
      date: "2026-04-10"
    }
  ],
  newsletters: [],
  services: [],
  projects: [],
  paths: [],
  library: [],
  subscribers: [],
  settings: {
    siteName: "Narrativa Política",
    siteTagline: "Transformando Teoria Econômica em Impacto",
    siteDescription: "Plataforma de economia e dados.",
    contactEmail: "contatonarrativapolitica@gmail.com",
    showLogin: true,
    allowRegistration: false,
    menuHome: true,
    menuAbout: true,
    menuServices: true,
    menuProjects: true,
    menuPaths: true,
    menuLibrary: true,
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
  about: { name: 'Anne Dornelas', role: 'Administradora', mission: '', bioInstitucional: '', bioAuthor: '', bioInstructor: '', image: '' },
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

export const fetchAllContent = async () => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  try {
    const fetchTable = async (table, opt = {}) => {
      let q = supabase.from(table).select('*')
      if (opt.order) q = q.order(opt.order, opt.orderOptions)
      const { data } = opt.single ? await q.maybeSingle() : await q
      return data || (opt.single ? null : [])
    }

    const [posts, newsletters, services, projects, settings, paths, library, team, about, opportunities, subscribers, home] = await Promise.all([
      fetchTable('posts', { order: 'date', orderOptions: { ascending: false } }),
      fetchTable('newsletters', { order: 'created_at', orderOptions: { ascending: false } }),
      fetchTable('services'),
      fetchTable('projects'),
      fetchTable('site_settings'),
      fetchTable('paths'),
      fetchTable('library'),
      fetchTable('team'),
      fetchTable('about', { single: true }),
      fetchTable('opportunities'),
      fetchTable('subscribers'),
      fetchTable('home', { single: true })
    ])

    if (posts && posts.length > 0) siteContent.posts = posts
    if (newsletters) siteContent.newsletters = newsletters
    if (services) siteContent.services = services
    if (projects) siteContent.projects = projects
    if (paths) siteContent.paths = paths
    if (library) siteContent.library = library
    if (team) siteContent.team = team
    if (about) siteContent.about = { ...siteContent.about, ...about }
    if (home) siteContent.home = { ...siteContent.home, ...home }
    if (opportunities && opportunities.length > 0) {
      siteContent.opportunities = opportunities
    } else {
      siteContent.opportunities = initialContent.opportunities
    }
    if (subscribers) siteContent.subscribers = subscribers
    if (settings) {
      settings.forEach(s => { siteContent.settings[s.key] = s.value })
    }
    
    // Garantir que o menu inicial exista se não vier do banco
    if (!siteContent.settings.menu) {
      siteContent.settings.menu = initialContent.settings.menu
    }

    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

export const saveItemToSupabase = async (table, item, isNew = false) => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  try {
    const dataToSave = { ...item }
    if (table === 'posts' && dataToSave.references) {
      dataToSave.refs = dataToSave.references
      delete dataToSave.references
    }
    
    let result
    if (table === 'about') {
      result = await supabase.from('about').upsert(dataToSave)
    } else if (table === 'settings') {
      for (const [key, value] of Object.entries(item)) {
        await supabase.from('site_settings').upsert({ key, value })
      }
      return { success: true }
    } else {
      result = isNew ? await supabase.from(table).insert(dataToSave) : await supabase.from(table).update(dataToSave).eq('id', item.id)
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
