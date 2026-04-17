import { reactive } from 'vue'
import { supabase } from '../lib/supabase'

const initialContent = {
  lastActivity: [],
  posts: [
    { id: 1, title: 'Bem-vinda à Narrativa Política', excerpt: 'Estamos configurando o seu ecossistema. Em breve, seus artigos do Supabase aparecerão aqui.', category: 'Geral', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426' }
  ],
  services: [
    { id: 1, title: 'Mentoria Estratégica', description: 'Carregando serviços do banco de dados...', accent: 'pink', icon: 'Database' }
  ],
  projects: [],
  paths: [],
  library: [],
  subscribers: [],
  settings: {
    siteName: "Narrativa Política",
    siteTagline: "Transformando Teoria Econômica em Impacto",
    siteDescription: "Plataforma de economia, dados e impacto social.",
    contactEmail: "contatonarrativapolitica@gmail.com"
  },
  team: [],
  about: {
    name: 'Anne Dornelas',
    role: 'Administradora',
    mission: 'Transformar dados em narrativas de impacto.'
  },
  opportunities: []
}

export const siteContent = reactive({ ...initialContent })

// Função para carregar tudo do Supabase
export const fetchAllContent = async () => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }
  
  try {
    const fetchTable = async (table, options = {}) => {
      try {
        let query = supabase.from(table).select('*')
        if (options.order) query = query.order(options.order, options.orderOptions)
        if (options.single) {
          const { data } = await query.maybeSingle()
          return data
        }
        const { data } = await query
        return data || []
      } catch (err) {
        console.error(`Erro ao carregar tabela ${table}:`, err)
        return null
      }
    }

    const [
      posts,
      services,
      projects,
      settings,
      paths,
      library,
      team,
      about,
      opportunities,
      subscribers
    ] = await Promise.all([
      fetchTable('posts', { order: 'date', orderOptions: { ascending: false } }),
      fetchTable('services', { order: 'created_at' }),
      fetchTable('projects', { order: 'created_at' }),
      fetchTable('site_settings'),
      fetchTable('paths', { order: 'created_at' }),
      fetchTable('library', { order: 'created_at' }),
      fetchTable('team', { order: 'created_at' }),
      fetchTable('about', { single: true }),
      fetchTable('opportunities', { order: 'created_at' }),
      fetchTable('subscribers', { order: 'created_at' })
    ])

    if (posts) {
      siteContent.posts = posts.map(p => ({
        ...p,
        references: p.refs || []
      }))
    }
    if (services) siteContent.services = services
    if (projects) siteContent.projects = projects
    if (paths) siteContent.paths = paths
    if (library) siteContent.library = library
    if (team) siteContent.team = team
    if (about) siteContent.about = about
    if (opportunities) siteContent.opportunities = opportunities
    if (subscribers) siteContent.subscribers = subscribers
    
    if (settings) {
      settings.forEach(s => {
        siteContent.settings[s.key] = s.value
      })
    }
    
    return { success: true }
  } catch (e) {
    console.error('Erro crítico ao carregar conteúdo do Supabase:', e)
    return { success: false, error: e }
  }
}

// Função para salvar um item no Supabase
export const saveItemToSupabase = async (table, item, isNew = false) => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }

  try {
    let result
    // Mapeamento especial para 'posts' que usa 'refs' no banco
    const dataToSave = { ...item }
    if (table === 'posts' && dataToSave.references) {
      dataToSave.refs = dataToSave.references
      delete dataToSave.references
    }

    if (table === 'about' || table === 'settings') {
      // Tabelas de registro único ou chave-valor
      if (table === 'about') {
        result = await supabase.from('about').upsert(dataToSave)
      } else {
        // settings é chave-valor no banco: { key, value }
        const promises = Object.entries(item).map(([key, value]) => 
          supabase.from('site_settings').upsert({ key, value })
        )
        await Promise.all(promises)
        return { success: true }
      }
    } else {
      if (isNew) {
        // Remove ID se for novo para deixar o banco gerar (ou usa o gerado pelo app se preferir)
        // Aqui o app gera Date.now(), vamos manter para consistência com o front
        result = await supabase.from(table).insert(dataToSave)
      } else {
        result = await supabase.from(table).update(dataToSave).eq('id', item.id)
      }
    }

    if (result?.error) throw result.error
    return { success: true }
  } catch (e) {
    console.error(`Erro ao salvar em ${table}:`, e)
    return { success: false, error: e }
  }
}

// Função para deletar um item no Supabase
export const deleteItemFromSupabase = async (table, id) => {
  if (!supabase) return { success: false, error: 'Supabase não inicializado' }

  try {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (e) {
    console.error(`Erro ao deletar de ${table}:`, e)
    return { success: false, error: e }
  }
}

// Persistência local (mantida como backup)
export const saveContent = () => {
  localStorage.setItem('np_content_v6', JSON.stringify(siteContent))
}

export const logActivity = (title, type = 'Edição') => {
  if (!siteContent.lastActivity) siteContent.lastActivity = []
  siteContent.lastActivity.unshift({
    id: Date.now(),
    type,
    title,
    date: new Date().toLocaleString('pt-BR')
  })
  if (siteContent.lastActivity.length > 10) siteContent.lastActivity.pop()
}
