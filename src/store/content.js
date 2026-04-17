import { reactive } from 'vue'
import { supabase } from '../lib/supabase'

const initialContent = {
  lastActivity: [],
  posts: [
    { id: 1, title: 'Bem-vinda à Narrativa Política', excerpt: 'Configurando ecossistema...', category: 'Geral', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426', date: new Date().toISOString() }
  ],
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
    siteLogo: ""
  },
  team: [],
  about: {
    name: 'Anne Dornelas',
    role: 'Administradora',
    mission: 'Transformar dados em narrativas de impacto.',
    image: '',
    bioInstitucional: '',
    bioAuthor: '',
    bioInstructor: ''
  },
  opportunities: []
}

export const siteContent = reactive({ ...initialContent })

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
      posts, services, projects, settings, paths, library, team, about, opportunities, subscribers
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

    if (posts?.length) siteContent.posts = posts.map(p => ({ ...p, references: p.refs || [] }))
    if (services?.length) siteContent.services = services
    if (projects?.length) siteContent.projects = projects
    if (paths?.length) siteContent.paths = paths
    if (library?.length) siteContent.library = library
    if (team?.length) siteContent.team = team
    if (about) siteContent.about = { ...siteContent.about, ...about }
    if (opportunities?.length) siteContent.opportunities = opportunities
    if (subscribers?.length) siteContent.subscribers = subscribers
    
    if (settings?.length) {
      settings.forEach(s => {
        // Só atualiza se o valor não for nulo ou vazio
        if (s.value !== null && s.value !== undefined) {
          siteContent.settings[s.key] = s.value
        }
      })
    }
    
    // Garantia final: Se o nome do site sumir, força o padrão
    if (!siteContent.settings.siteName) {
      siteContent.settings.siteName = "Narrativa Política"
    }
    
    return { success: true }
  } catch (e) {
    console.error('Erro crítico ao carregar conteúdo:', e)
    return { success: false, error: e }
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
      // Salva cada configuração individualmente na tabela site_settings
      for (const [key, value] of Object.entries(item)) {
        await supabase.from('site_settings').upsert({ key, value })
      }
      return { success: true }
    } else {
      if (isNew) result = await supabase.from(table).insert(dataToSave)
      else result = await supabase.from(table).update(dataToSave).eq('id', item.id)
    }
    if (result?.error) throw result.error
    return { success: true }
  } catch (e) {
    console.error(`Erro ao salvar em ${table}:`, e)
    return { success: false, error: e }
  }
}

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

export const saveContent = () => {
  localStorage.setItem('np_content_v6', JSON.stringify(siteContent))
}

export const logActivity = (title, type = 'Edição') => {
  if (!siteContent.lastActivity) siteContent.lastActivity = []
  siteContent.lastActivity.unshift({
    id: Date.now(),
    title,
    type,
    date: new Date().toLocaleString('pt-BR')
  })
  if (siteContent.lastActivity.length > 10) siteContent.lastActivity.pop()
}
