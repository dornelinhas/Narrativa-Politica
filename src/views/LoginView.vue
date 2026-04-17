<template>
  <div class="login-v2">
    <div class="login-auth-box">
      <!-- MUDANÇA DE ABAS -->
      <div class="auth-tabs">
        <button @click="authMode = 'login'" :class="{ active: authMode === 'login' }">Entrar</button>
        <button @click="authMode = 'register'" :class="{ active: authMode === 'register' }">Cadastrar</button>
      </div>

      <div class="auth-header">
        <h1 class="auth-title">{{ authMode === 'login' ? 'Acesso Restrito' : 'Criar Conta' }}</h1>
        <p>{{ authMode === 'login' ? 'Entre para gerenciar conteúdos ou materiais exclusivos.' : 'Junte-se à nossa comunidade de impacto social.' }}</p>
      </div>

      <!-- FORMULÁRIO LOGIN -->
      <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" v-model="email" placeholder="seu@email.com" required>
        </div>
        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="password" placeholder="••••••••" required>
        </div>
        
        <div v-if="error" class="error-box">{{ error }}</div>

        <button type="submit" class="btn btn-brand-gradient w-full" :disabled="loading">
          {{ loading ? 'Autenticando...' : 'Acessar Conta' }}
        </button>
      </form>

      <!-- FORMULÁRIO CADASTRO -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label>Nome</label>
            <input type="text" v-model="regForm.name" placeholder="Nome" required>
          </div>
          <div class="form-group">
            <label>Sobrenome</label>
            <input type="text" v-model="regForm.lastName" placeholder="Sobrenome" required>
          </div>
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" v-model="regForm.email" placeholder="seu@email.com" required>
        </div>
        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="regForm.password" placeholder="Mínimo 6 caracteres" required>
        </div>

        <!-- CHECKBOXES -->
        <div class="check-group">
          <label class="custom-check">
            <input type="checkbox" v-model="regForm.privacy" required>
            <span class="checkmark"></span>
            <span class="check-text">Aceito os termos de <router-link to="/privacidade" target="_blank">privacidade e uso de dados</router-link>.</span>
          </label>
          <label class="custom-check">
            <input type="checkbox" v-model="regForm.newsletter">
            <span class="checkmark"></span>
            <span class="check-text">Quero receber novidades e editais por e-mail.</span>
          </label>
        </div>
        
        <div v-if="error" class="error-box">{{ error }}</div>

        <button type="submit" class="btn btn-brand-gradient w-full" :disabled="loading">
          {{ loading ? 'Criando conta...' : 'Concluir Cadastro' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>Problemas com acesso? <router-link to="/contatos">Fale com o suporte</router-link>.</p>
        <div v-if="authMode === 'login'" class="auth-hints">
          <span><strong>Admin:</strong> contatonarrativapolitica@gmail.com / admin123</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent, saveContent } from '../store/content'

const router = useRouter()
const { login, register } = useAuth()

const authMode = ref('login')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const regForm = reactive({
  name: '',
  lastName: '',
  email: '',
  password: '',
  privacy: false,
  newsletter: false
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const result = await login(email.value, password.value)
    if (result.success) {
      if (result.role === 'admin') router.push('/admin')
      else router.push('/area-do-aluno')
    } else {
      error.value = result.message
    }
  } catch (e) {
    error.value = 'Erro ao tentar entrar.'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  if (regForm.password.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    loading.value = false
    return
  }

  try {
    const result = await register({
      name: `${regForm.name} ${regForm.lastName}`,
      email: regForm.email,
      password: regForm.password,
      newsletter: regForm.newsletter
    })

    if (result.success) {
      // INTEGRAÇÃO NEWSLETTER: Se marcou o checkbox, salvar na lista global
      if (regForm.newsletter) {
        if (!siteContent.subscribers) siteContent.subscribers = []
        const exists = siteContent.subscribers.find(s => s.email === regForm.email)
        if (!exists) {
          siteContent.subscribers.push({
            email: regForm.email,
            date: new Date().toLocaleDateString('pt-BR')
          })
          saveContent()
        }
      }
      router.push('/area-do-aluno')
    } else {
      error.value = result.message
    }
  } catch (e) {
    error.value = 'Erro ao criar conta.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-v2 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* MESH GRADIENT SUAVE */
  background-color: #F9FAFB;
  background-image: 
    radial-gradient(at 0% 0%, rgba(255, 45, 85, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(138, 43, 226, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(0, 206, 209, 0.03) 0px, transparent 50%);
  padding: 100px 20px;
}

.login-auth-box {
  max-width: 520px;
  width: 100%;
  padding: 48px;
  background: #fff;
  border-radius: 32px;
  /* SOMBRA SUAVE ELEGANTE */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.03);
}

.auth-tabs {
  display: flex;
  background: #F1F5F9;
  padding: 6px;
  border-radius: 16px;
  margin-bottom: 40px;
}

.auth-tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  font-weight: 800;
  color: #64748B;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s;
}

.auth-tabs button.active {
  background: #fff;
  color: #111827;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.auth-header { margin-bottom: 32px; text-align: center; }
.auth-title { 
  font-size: 2.2rem; 
  font-weight: 900; 
  letter-spacing: -1.5px; 
  color: #111827; 
  margin-bottom: 12px;
}
.auth-header p { color: #64748B; font-size: 0.95rem; font-weight: 500; }

.auth-form { text-align: left; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 800; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 8px; color: #111827; }
.form-group input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #E2E8F0;
  border-radius: 14px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.3s ease;
}
.form-group input:focus {
  border-color: #8A2BE2;
}

/* CHECKBOXES */
.check-group { margin-bottom: 24px; display: flex; flex-direction: column; gap: 12px; }
.custom-check {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #475569;
}

.check-text a { color: #8A2BE2; font-weight: 700; text-decoration: underline; }

/* BTNS */
.btn { 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-brand-gradient {
  background: linear-gradient(135deg, #FF2D55 0%, #8A2BE2 100%);
  color: #fff;
  box-shadow: 0 10px 25px rgba(138, 43, 226, 0.2);
}

.btn-brand-gradient:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(138, 43, 226, 0.3);
}

.error-box { background: #FEF2F2; color: #DC2626; padding: 12px; border-radius: 10px; margin-bottom: 20px; font-size: 0.85rem; font-weight: 700; text-align: center; }
.w-full { width: 100%; }

.auth-footer { margin-top: 32px; border-top: 1px solid #F1F5F9; padding-top: 24px; text-align: center; font-size: 0.85rem; color: #64748B; }
.auth-footer a { font-weight: 800; color: #FF2D55; text-decoration: none; }

.auth-hints { margin-top: 20px; display: flex; flex-direction: column; gap: 8px; opacity: 0.5; font-size: 0.7rem; }

@media (max-width: 600px) {
  .login-auth-box { padding: 32px 24px; }
  .form-row { grid-template-columns: 1fr; gap: 0; }
}
</style>