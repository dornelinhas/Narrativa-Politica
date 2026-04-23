import { ref, computed } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('np_user')) || null)
const isAuthenticated = computed(() => !!user.value)

// FORÇANDO ACESSO PARA TESTE
const login = async (email, password) => {
  console.log('Tentativa de login:', email)
  
  const emailLower = email?.toLowerCase().trim() || '';
  const isAdmin = emailLower.includes('admin') || 
                  emailLower.includes('contatonarrativapolitica') || 
                  password === 'admin' || 
                  password === '1dmin 123';
                  
  const role = isAdmin ? 'admin' : 'aluno';
  const nome = isAdmin ? 'Anne Dornelas (Admin)' : 'Ana Silva (Aluna)';

  // Mock de Usuário
  const mockUser = {
    id: isAdmin ? 'admin_01' : 'user_123',
    nome_completo: nome,
    email: email || 'aluna@narrativapolitica.com.br',
    role: role,
    isPremium: true
  }

  user.value = mockUser
  localStorage.setItem('np_user', JSON.stringify(mockUser))
  return { success: true, user: mockUser }
}

const logout = () => {
  user.value = null
  localStorage.removeItem('np_user')
  localStorage.removeItem('np_remember_email')
}

export function useAuth() {
  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}