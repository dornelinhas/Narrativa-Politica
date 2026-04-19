<template>
  <div class="login-brutalist">
    <div class="login-box">
      <!-- TABS -->
      <div class="auth-tabs">
        <button @click="authMode = 'login'" :class="{ active: authMode === 'login' }">Login</button>
        <button @click="authMode = 'register'" :class="{ active: authMode === 'register' }">Criar Conta</button>
      </div>

      <div class="auth-header">
        <h1>{{ authMode === 'login' ? 'ACESSO RESTRITO' : 'CRIAR CONTA' }}</h1>
        <p>{{ authMode === 'login' ? 'Entre para gerenciar conteúdos ou materiais exclusivos.' : 'Junte-se à nossa comunidade de impacto social.' }}</p>
      </div>

      <!-- LOGIN FORM -->
      <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group"><label>E-MAIL</label><input type="email" v-model="email" placeholder="seu@email.com" required></div>
        <div class="form-group"><label>SENHA</label><input type="password" v-model="password" placeholder="••••••••" required></div>
        <div v-if="error" class="error-box">{{ error }}</div>
        <button type="submit" class="brutalist-button red full" :disabled="loading">{{ loading ? 'Autenticando...' : 'ACESSAR CONTA' }}</button>
      </form>

      <!-- REGISTER FORM -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-row">
          <div class="form-group"><label>NOME</label><input type="text" v-model="regForm.name" placeholder="Nome" required></div>
          <div class="form-group"><label>SOBRENOME</label><input type="text" v-model="regForm.lastName" placeholder="Sobrenome" required></div>
        </div>
        <div class="form-group"><label>E-MAIL</label><input type="email" v-model="regForm.email" placeholder="seu@email.com" required></div>
        <div class="form-group"><label>SENHA</label><input type="password" v-model="regForm.password" placeholder="Mínimo 6 caracteres" required></div>
        <div class="check-group">
          <label class="custom-check"><input type="checkbox" v-model="regForm.privacy" required><span>Aceito os termos de <router-link to="/privacidade" target="_blank">privacidade</router-link>.</span></label>
          <label class="custom-check"><input type="checkbox" v-model="regForm.newsletter"><span>Quero receber novidades por e-mail.</span></label>
        </div>
        <div v-if="error" class="error-box">{{ error }}</div>
        <button type="submit" class="brutalist-button red full" :disabled="loading">{{ loading ? 'Criando conta...' : 'CONCLUIR CADASTRO' }}</button>
      </form>

      <div class="auth-footer">
        <p>Problemas? <router-link to="/contatos">Fale com o suporte</router-link>.</p>
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
const regForm = reactive({ name: '', lastName: '', email: '', password: '', privacy: false, newsletter: false })

const handleLogin = async () => {
  loading.value = true; error.value = ''
  try {
    const result = await login(email.value, password.value)
    if (result.success) { result.role === 'admin' ? router.push('/admin') : router.push('/area-do-aluno') }
    else { error.value = result.message }
  } catch (e) { error.value = 'Erro ao tentar entrar.' }
  finally { loading.value = false }
}

const handleRegister = async () => {
  loading.value = true; error.value = ''
  if (regForm.password.length < 6) { error.value = 'Senha: mín. 6 caracteres.'; loading.value = false; return }
  try {
    const result = await register({ name: `${regForm.name} ${regForm.lastName}`, email: regForm.email, password: regForm.password, newsletter: regForm.newsletter })
    if (result.success) {
      if (regForm.newsletter) {
        if (!siteContent.subscribers) siteContent.subscribers = []
        if (!siteContent.subscribers.find(s => s.email === regForm.email)) {
          siteContent.subscribers.push({ email: regForm.email, date: new Date().toLocaleDateString('pt-BR') })
          saveContent()
        }
      }
      router.push('/area-do-aluno')
    } else { error.value = result.message }
  } catch (e) { error.value = 'Erro ao criar conta.' }
  finally { loading.value = false }
}
</script>

<style scoped>
.login-brutalist { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-bg); padding: 100px 20px; background-image: linear-gradient(var(--color-bg) 2px, transparent 2px), linear-gradient(90deg, var(--color-bg) 2px, transparent 2px); background-size: 60px 60px; }
.login-box { max-width: 520px; width: 100%; padding: 48px; background: white; border: 4px solid var(--color-dark); box-shadow: 12px 12px 0 var(--color-dark); }

.auth-tabs { display: flex; margin-bottom: 40px; border: 3px solid var(--color-dark); }
.auth-tabs button { flex: 1; padding: 14px; border: none; background: white; font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; color: var(--color-dark); }
.auth-tabs button.active { background: var(--color-dark); color: white; }

.auth-header { margin-bottom: 32px; }
.auth-header h1 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: -0.04em; line-height: 1; }
.auth-header p { color: rgba(28,28,28,0.6); font-weight: 600; }

.auth-form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--color-dark); }
.form-group input { width: 100%; padding: 14px 18px; border: 3px solid var(--color-dark); font-family: var(--font-sans); font-weight: 700; font-size: 1rem; background: var(--color-bg); outline: none; transition: all 0.2s; }
.form-group input:focus { border-color: var(--color-red); background: white; }

.check-group { display: flex; flex-direction: column; gap: 12px; }
.custom-check { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; font-size: 0.85rem; font-weight: 600; color: rgba(28,28,28,0.7); }
.custom-check a { color: var(--color-red); font-weight: 800; }

.brutalist-button.full { width: 100%; justify-content: center; padding: 18px; font-size: 0.9rem; }
.error-box { background: rgba(223,32,40,0.1); color: var(--color-red); padding: 12px; border: 2px solid var(--color-red); font-size: 0.85rem; font-weight: 700; text-align: center; }

.auth-footer { margin-top: 32px; border-top: 4px solid var(--color-dark); padding-top: 24px; text-align: center; font-size: 0.85rem; color: rgba(28,28,28,0.6); }
.auth-footer a { font-weight: 800; color: var(--color-red); }
.auth-hints { margin-top: 16px; opacity: 0.4; font-size: 0.7rem; }

@media (max-width: 600px) { .login-box { padding: 32px 24px; } .form-row { grid-template-columns: 1fr; } }
</style>