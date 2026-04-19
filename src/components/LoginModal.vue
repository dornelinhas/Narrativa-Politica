<template>
  <transition name="fade-scale">
    <div v-if="isOpen" class="login-modal-overlay" @click.self="handleClose">
      <div class="login-modal-card">
        <button class="close-modal-btn" @click="handleClose"><X :size="20" /></button>
        
        <div class="login-modal-header">
          <div class="modal-logo">
            <div class="logo-np-brutalist">
              <div class="shape s1"></div>
              <div class="shape s2"></div>
              <div class="shape s3"></div>
              <div class="shape s4"></div>
              <div class="shape s5"></div>
              <span class="logo-text">NP</span>
            </div>
          </div>
          <h2 class="font-display">{{ isRegisterMode ? 'Criar Conta' : 'Boas-vindas' }}</h2>
          <p class="font-sans font-bold opacity-60">{{ isRegisterMode ? 'Junte-se à nossa comunidade de impacto social.' : 'Acesse sua conta para gerenciar conteúdos e trilhas.' }}</p>
        </div>

        <!-- ABAS DE NAVEGAÇÃO INTERNA -->
        <div class="modal-auth-tabs" v-if="siteContent.settings.allowRegistration || isRegisterMode">
          <button @click="isRegisterMode = false" :class="{ active: !isRegisterMode }">Entrar</button>
          <button @click="isRegisterMode = true" :class="{ active: isRegisterMode }">Cadastrar</button>
        </div>

        <!-- FORMULÁRIO DE LOGIN -->
        <form v-if="!isRegisterMode" @submit.prevent="handleLogin" class="login-modal-form">
          <div class="form-group">
            <label>E-mail</label>
            <input type="email" v-model="loginForm.email" placeholder="seu@email.com" required autofocus />
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" v-model="loginForm.password" placeholder="••••••••" required />
          </div>
          
          <div v-if="error" class="login-error-msg">
            <AlertCircle :size="16" />
            <span>{{ error }}</span>
          </div>

          <button type="submit" class="btn-login-modal" :disabled="isLoading">
            {{ isLoading ? 'Entrando...' : 'Entrar na Plataforma' }}
          </button>
        </form>

        <!-- FORMULÁRIO DE CADASTRO -->
        <form v-else @submit.prevent="handleRegister" class="login-modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome</label>
              <input type="text" v-model="regForm.name" placeholder="Nome" required />
            </div>
            <div class="form-group">
              <label>Sobrenome</label>
              <input type="text" v-model="regForm.lastName" placeholder="Sobrenome" required />
            </div>
          </div>
          <div class="form-group">
            <label>E-mail</label>
            <input type="email" v-model="regForm.email" placeholder="seu@email.com" required />
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" v-model="regForm.password" placeholder="Mínimo 6 caracteres" required />
          </div>

          <div class="modal-check-group">
            <label class="modal-custom-check">
              <input type="checkbox" v-model="regForm.privacy" required>
              <span class="checkmark"></span>
              <span class="check-text">Aceito os <router-link to="/privacidade" @click="handleClose">termos de privacidade</router-link>.</span>
            </label>
            <label class="modal-custom-check">
              <input type="checkbox" v-model="regForm.newsletter">
              <span class="checkmark"></span>
              <span class="check-text">Quero receber novidades e editais por e-mail.</span>
            </label>
          </div>
          
          <div v-if="error" class="login-error-msg">
            <AlertCircle :size="16" />
            <span>{{ error }}</span>
          </div>

          <button type="submit" class="btn-login-modal" :disabled="isLoading">
            {{ isLoading ? 'Criando conta...' : 'Concluir Cadastro' }}
          </button>
        </form>

        <div class="login-modal-footer">
          <p v-if="!isRegisterMode">Problemas com acesso? <router-link to="/contatos" @click="handleClose">Fale com o suporte</router-link>.</p>
          <p v-else>Já tem uma conta? <a href="#" @click.prevent="isRegisterMode = false">Faça login aqui</a>.</p>
          <p v-if="!isRegisterMode && !siteContent.settings.allowRegistration" style="font-size: 0.75rem; color: #FF2D55; font-weight: 700; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            Novos cadastros estão suspensos temporariamente.
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { X, AlertCircle } from 'lucide-vue-next'
import { useAuth } from '../store/auth'
import { siteContent, saveContent } from '../store/content'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const { login, register, closeLogin } = useAuth()

const isRegisterMode = ref(false)
const error = ref('')
const isLoading = ref(false)

const loginForm = reactive({
  email: '',
  password: ''
})

const regForm = reactive({
  name: '',
  lastName: '',
  email: '',
  password: '',
  privacy: false,
  newsletter: false
})

const resetForms = () => {
  error.value = ''
  loginForm.email = ''
  loginForm.password = ''
  regForm.name = ''
  regForm.lastName = ''
  regForm.email = ''
  regForm.password = ''
  regForm.privacy = false
  regForm.newsletter = false
  isRegisterMode.value = false
}

const handleClose = () => {
  resetForms()
  closeLogin()
}

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    const result = await login(loginForm.email, loginForm.password)
    if (result.success) {
      handleClose()
      if (result.role === 'admin') router.push('/admin')
      else router.push('/area-do-aluno')
    } else {
      error.value = result.message
    }
  } catch (e) {
    error.value = 'Erro ao tentar entrar.'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  error.value = ''
  isLoading.value = true

  if (regForm.password.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    isLoading.value = false
    return
  }

  try {
    const result = await register({
      name: `${regForm.name} ${regForm.lastName}`,
      email: regForm.email,
      password: regForm.password
    })

    if (result.success) {
      // Newsletter integration
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
      handleClose()
      router.push('/area-do-aluno')
    } else {
      error.value = result.message
    }
  } catch (e) {
    error.value = 'Erro ao criar conta.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-modal-card {
  background: #fff;
  width: 100%;
  max-width: 480px;
  border: 4px solid var(--color-dark);
  padding: 48px;
  position: relative;
  box-shadow: 15px 15px 0 var(--color-dark);
  max-height: 90vh;
  overflow-y: auto;
}

.close-modal-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--color-bg);
  border: 2px solid var(--color-dark);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark);
  cursor: pointer;
  transition: 0.2s;
}
.close-modal-btn:hover { background: var(--color-red); color: white; }

.modal-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.login-modal-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-modal-header h2 {
  font-size: 2rem;
  margin-bottom: 12px;
}

/* TABS */
.modal-auth-tabs {
  display: flex;
  background: var(--color-bg);
  border: 3px solid var(--color-dark);
  padding: 4px;
  margin-bottom: 32px;
}

.modal-auth-tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--color-dark);
  cursor: pointer;
  transition: all 0.3s;
}

.modal-auth-tabs button.active {
  background: var(--color-dark);
  color: white;
}

.login-modal-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-dark);
  text-align: left;
}

.form-group input {
  width: 100%;
  padding: 15px;
  border: 3px solid var(--color-dark);
  background: var(--color-bg);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus {
  background: white;
  box-shadow: 4px 4px 0 var(--color-yellow);
}

.modal-check-group { 
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px; 
}

.modal-custom-check {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-dark);
  cursor: pointer;
  text-align: left;
}

.modal-custom-check input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-dark);
  cursor: pointer;
}

.modal-custom-check a { color: var(--color-red); text-decoration: underline; }

.btn-login-modal {
  background: var(--color-yellow);
  color: var(--color-dark);
  border: 3px solid var(--color-dark);
  padding: 18px;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 8px;
}

.btn-login-modal:hover {
  transform: translate(-4px, -4px);
  box-shadow: 6px 6px 0 var(--color-dark);
}

.btn-login-modal:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.login-error-msg {
  background: #FFF;
  color: var(--color-red);
  padding: 14px;
  border: 2px solid var(--color-red);
  font-size: 0.85rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-modal-footer {
  margin-top: 32px;
  text-align: center;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.9rem;
}

.login-modal-footer a {
  color: var(--color-red);
  font-weight: 900;
}

@media (max-width: 480px) {
  .login-modal-card { padding: 32px 24px; }
  .form-row { grid-template-columns: 1fr; }
}

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: translateY(20px); }
</style>
