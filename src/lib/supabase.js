import { createClient } from '@supabase/supabase-js'

// Garante que o app não quebre se as variáveis estiverem faltando
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_APP_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_APP_SUPABASE_KEY || ''

let supabaseInstance = null

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (e) {
  console.error('Falha ao inicializar o cliente Supabase:', e)
}

export const supabase = supabaseInstance

if (!supabase) {
  console.warn('⚠️ Supabase não configurado ou chaves inválidas no .env. O site funcionará em modo limitado.')
}
