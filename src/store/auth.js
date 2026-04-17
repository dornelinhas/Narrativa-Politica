import { reactive, toRefs } from 'vue'
import { supabase } from '../lib/supabase'

let savedUser = null
try {
  const data = localStorage.getItem('np_user')
  if (data && data !== 'undefined' && data !== 'null') {
    savedUser = JSON.parse(data)
  }
} catch (e) {
  console.warn('LocalStorage data is invalid, clearing it:', e)
  localStorage.removeItem('np_user')
}

const state = reactive({
  user: savedUser,
  isAuthenticated: !!savedUser,
  isLoginModalOpen: false
})

export const useAuth = () => {
  const openLogin = () => { state.isLoginModalOpen = true }
  const closeLogin = () => { state.isLoginModalOpen = false }

  const login = async (emailInput, passwordInput) => {
    const email = (emailInput || '').trim().toLowerCase()
    const password = (passwordInput || '').trim()

    // 1. Tentar login via Supabase
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (!error && data?.user) {
        // Se logou com sucesso no Supabase
        const user = {
          email: data.user.email,
          id: data.user.id,
          role: data.user.app_metadata?.role || 'user',
          name: data.user.user_metadata?.full_name || data.user.email,
          isPremium: data.user.app_metadata?.isPremium || false
        }

        setLoggedUser(user)
        return { success: true, role: user.role }
      }
    }

    // Fallback para contas de teste hardcoded
    if (email === 'contatonarrativapolitica@gmail.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin', name: 'Anne Dornela', isPremium: true }
      setLoggedUser(adminUser)
      return { success: true, role: 'admin' }
    }
    
    if (email === 'premium@teste.com' && password === 'premium123') {
      const premiumUser = { email, role: 'user', name: 'Estudante Premium', isPremium: true }
      setLoggedUser(premiumUser)
      return { success: true, role: 'user' }
    }
    
    if (email === 'aluno@teste.com' && password === 'gratis123') {
      const freeUser = { email, role: 'user', name: 'Estudante', isPremium: false }
      setLoggedUser(freeUser)
      return { success: true, role: 'user' }
    }

    return { success: false, message: 'Supabase não configurado ou credenciais inválidas.' }
  }

  const register = async (userData) => {
    if (!supabase) return { success: false, message: 'Supabase não configurado.' }
    
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.name
        }
      }
    })

    if (error) {
      return { success: false, message: error.message }
    }

    const newUser = {
      email: userData.email,
      id: data.user?.id,
      role: 'user',
      name: userData.name,
      isPremium: false
    }

    setLoggedUser(newUser)
    return { success: true }
  }

  const setLoggedUser = (user) => {
    state.user = user
    state.isAuthenticated = true
    try { localStorage.setItem('np_user', JSON.stringify(user)) } catch (e) {}
  }

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    state.user = null
    state.isAuthenticated = false
    try { localStorage.removeItem('np_user') } catch (e) {}
  }

  return {
    ...toRefs(state),
    login,
    register,
    logout,
    openLogin,
    closeLogin
  }
}
