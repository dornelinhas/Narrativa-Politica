import { reactive } from 'vue'
import { supabase } from '../lib/supabase'

const initialContent = {
  lastActivity: [],
  posts: [],
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
    contactEmail: "contatonarrativapolitica@gmail.com"
  },
  team: [],
  about: { name: 'Anne Dornelas', role: 'Administradora', mission: '', bioInstitucional: '', bioAuthor: '', bioInstructor: '' },
  opportunities: []
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

    const [posts, newsletters, services, projects, settings, paths, library, team, about, opportunities, subscribers] = await Promise.all([
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
      fetchTable('subscribers')
    ])

    if (posts) siteContent.posts = posts
    if (newsletters) siteContent.newsletters = newsletters
    if (services) siteContent.services = services
    if (projects) siteContent.projects = projects
    if (paths) siteContent.paths = paths
    if (library) siteContent.library = library
    if (team) siteContent.team = team
    if (about) siteContent.about = { ...siteContent.about, ...about }
    if (opportunities) siteContent.opportunities = opportunities
    if (subscribers) siteContent.subscribers = subscribers
    if (settings) settings.forEach(s => { siteContent.settings[s.key] = s.value })

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
