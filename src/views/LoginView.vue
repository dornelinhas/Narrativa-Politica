<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-vue-next'

const router = useRouter()
const { login } = useAuth()

const email = ref(localStorage.getItem('np_remember_email') || '')
const password = ref('')
const nome = ref('')
const showPassword = ref(false)
const rememberMe = ref(!!localStorage.getItem('np_remember_email'))
const acceptPrivacy = ref(false)
const acceptNewsletter = ref(false)
const loading = ref(false)
const error = ref('')

const isRegistering = ref(false)
const allowRegistration = computed(() => siteContent.settings?.allowRegistration)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  if (isRegistering.value) {
    if (!acceptPrivacy.value) {
      error.value = 'Você precisa aceitar a Política de Privacidade.'
      loading.value = false
      return
    }
    if (!nome.value || !email.value || !password.value) {
      error.value = 'Preencha todos os campos.'
      loading.value = false
      return
    }
    // TODO: Connect to actual register function in Supabase/Auth store
    setTimeout(() => {
      alert('Cadastro realizado com sucesso! Bem-vindo(a) à Narrativa Política.')
      isRegistering.value = false
      loading.value = false
    }, 800)
  } else {
    const result = await login(email.value, password.value)
    if (result.success) {
      if (rememberMe.value) localStorage.setItem('np_remember_email', email.value)
      else localStorage.removeItem('np_remember_email')
      
      if (result.user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/area-do-aluno')
      }
    } else {
      error.value = 'Credenciais inválidas.'
    }
    loading.value = false
  }
}

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <div class="login-premium-page">
    <div class="paper-noise-bg"></div>

    <div class="login-wrapper-compact">
      <!-- CARD COMPACTO INTEGRADO -->
      <div class="login-card-brutal-compact">
        <header class="login-header mb-10">
          <h1 class="login-title-small">{{ isRegistering ? 'CRIAR CONTA' : 'ACESSO' }}</h1>
          <p class="login-subtitle-small">
            {{ isRegistering ? 'Faça parte da nossa rede de mobilização.' : 'Continue sua jornada estratégica.' }}
          </p>
        </header>

        <form @submit.prevent="handleSubmit" class="login-form">
          <div v-if="isRegistering" class="input-group-compact mb-6">
            <label class="input-label-mini">NOME COMPLETO</label>
            <div class="input-inner">
              <User class="icon-sm" :size="16" />
              <input v-model="nome" type="text" placeholder="Seu nome" required />
            </div>
          </div>

          <div class="input-group-compact mb-6">
            <label class="input-label-mini">E-MAIL INSTITUCIONAL</label>
            <div class="input-inner">
              <Mail class="icon-sm" :size="16" />
              <input v-model="email" type="email" placeholder="seu@email.com" required />
            </div>
          </div>

          <div class="input-group-compact mb-8">
            <label class="input-label-mini">CHAVE DE ACESSO</label>
            <div class="input-inner">
              <Lock class="icon-sm" :size="16" />
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required />
              <button type="button" @click="showPassword = !showPassword" class="toggle-eye">
                <Eye v-if="!showPassword" :size="16" />
                <EyeOff v-else :size="16" />
              </button>
            </div>
          </div>

          <div v-if="!isRegistering" class="options-row flex-between items-center mb-14 mt-10">
            <label class="custom-check-sm">
              <input type="checkbox" v-model="rememberMe" />
              <span class="box-sq"></span>
              <span class="txt">LEMBRAR MEU ACESSO</span>
            </label>
            <a href="#" class="forgot-txt">ESQUECI A SENHA</a>
          </div>

          <div v-else class="options-column mb-10 mt-6">
            <label class="custom-check-sm mb-4">
              <input type="checkbox" v-model="acceptPrivacy" required />
              <span class="box-sq"></span>
              <span class="txt">ACEITO A <router-link to="/privacidade" target="_blank" style="color: #DF2028;">POLÍTICA DE PRIVACIDADE</router-link></span>
            </label>
            <label class="custom-check-sm">
              <input type="checkbox" v-model="acceptNewsletter" />
              <span class="box-sq"></span>
              <span class="txt">QUERO RECEBER A NEWSLETTER E CONVOCAÇÕES</span>
            </label>
          </div>

          <div v-if="error" class="error-sm mb-4" style="color: #DF2028; font-weight: bold; font-size: 12px; text-align: center;">{{ error }}</div>

          <button type="submit" class="btn-action-red-brutal" :disabled="loading">
            {{ loading ? 'PROCESSANDO...' : (isRegistering ? 'FINALIZAR CADASTRO' : 'ENTRAR NA PLATAFORMA') }}
            <ArrowRight v-if="!loading" :size="18" />
          </button>
        </form>

        <!-- LINKS DE VOLTA PARA DENTRO DO CARD -->
        <footer class="login-footer-internal mt-12">
          <div class="divider-thin"></div>
          
          <template v-if="!isRegistering && allowRegistration">
            <span class="lbl-small">NÃO POSSUI CONTA?</span>
            <button @click="isRegistering = true; error = ''" class="link-bold-red" style="background: none; border: none; cursor: pointer;">CRIAR UMA CONTA AGORA</button>
          </template>
          
          <template v-else-if="isRegistering">
            <span class="lbl-small">JÁ POSSUI CONTA?</span>
            <button @click="isRegistering = false; error = ''" class="link-bold-red" style="background: none; border: none; cursor: pointer;">FAZER LOGIN</button>
          </template>

          <template v-if="!allowRegistration && !isRegistering">
             <span class="lbl-small">NOVOS CADASTROS ESTÃO TEMPORARIAMENTE FECHADOS.</span>
             <router-link to="/trilhas" class="link-bold-red mt-2">VEJA AS TRILHAS ABERTAS</router-link>
          </template>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-premium-page { background: #FFFFFF; min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow-y: auto; padding: 40px 20px; }
.paper-noise-bg { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: 0.05; pointer-events: none; }

.login-wrapper-compact { width: 100%; max-width: 420px; z-index: 10; }

.login-card-brutal-compact { 
  background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 2.5rem; 
  padding: 40px 40px; box-shadow: 12px 12px 0px #1C1C1C;
}

.login-title-small { 
  font-family: "Archivo Black", sans-serif; 
  font-size: 2.5rem; line-height: 1; color: #1C1C1C; 
  text-transform: uppercase; margin-bottom: 12px; text-align: center; 
  letter-spacing: -0.02em; /* Tracking ajustado */
}
.login-subtitle-small { 
  font-family: "Georgia", serif; font-size: 1rem; color: #000; 
  text-align: center; margin-bottom: 35px; opacity: 0.8; 
  letter-spacing: 0.01em;
}

.input-label-mini { 
  display: block; font-weight: 900; font-size: 9px; color: #000; 
  letter-spacing: 2px; /* Tracking ampliado */
  margin-bottom: 10px; 
}
.input-inner { position: relative; display: flex; align-items: center; }
.icon-sm { position: absolute; left: 15px; color: #000; }
input { 
  width: 100%; padding: 18px 15px 18px 45px; border: 3px solid #1C1C1C; 
  border-radius: 12px; font-family: "Inter", sans-serif; font-weight: 800; 
  font-size: 0.9rem; outline: none; color: #000; 
  letter-spacing: 0.02em;
}
input:focus { border-color: #DF2028; box-shadow: 6px 6px 0px rgba(223, 32, 40, 0.1); }

.toggle-eye { position: absolute; right: 15px; background: none; border: none; cursor: pointer; color: #000; }

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;    /* AUMENTADO: Afasta dos balões */
  margin-bottom: 45px; /* AUMENTADO: Afasta do botão vermelho */
  width: 100%;
}

/* CHECKBOX COMPACTO */
.custom-check-sm { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.custom-check-sm input { position: absolute; opacity: 0; width: 0; }
.box-sq { height: 18px; width: 18px; background-color: #FFF; border: 2.5px solid #1C1C1C; border-radius: 4px; position: relative; }
.custom-check-sm input:checked ~ .box-sq { background-color: #1C1C1C; }
.box-sq:after { content: ""; position: absolute; display: none; left: 5px; top: 1px; width: 4px; height: 9px; border: solid white; border-width: 0 3px 3px 0; transform: rotate(45deg); }
.custom-check-sm input:checked ~ .box-sq:after { display: block; }
.txt { font-weight: 900; font-size: 9px; color: #000; letter-spacing: 1px; }

.forgot-txt { font-weight: 900; font-size: 9px; color: #000; text-decoration: none; border-bottom: 1.5px solid #EEE; letter-spacing: 1px; }

/* BOTÃO COMPACTO */
.btn-action-red-brutal { 
  width: 100%; padding: 20px; background: #DF2028; color: #FFF; border: 3px solid #1C1C1C; border-radius: 9999px; 
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; 
  display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: 0.3s; 
  box-shadow: 6px 6px 0px #1C1C1C; letter-spacing: 1.5px; /* Tracking ampliado */
}
.btn-action-red-brutal:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0px #1C1C1C; background: #000; }

/* FOOTER INTERNO REDUZIDO */
.login-footer-internal { text-align: center; display: flex; flex-direction: column; gap: 8px; }
.divider-thin { width: 40px; height: 3px; background: #1C1C1C; margin: 0 auto 18px; }
.lbl-small { font-weight: 900; font-size: 9px; color: #000; opacity: 0.6; letter-spacing: 1.5px; }
.link-bold-red { color: #DF2028; font-weight: 900; font-size: 11px; text-decoration: none; text-transform: uppercase; border-bottom: 1.5px solid transparent; letter-spacing: 1px; }
.link-bold-red:hover { border-bottom-color: #DF2028; }

@media (max-height: 700px) {
  .login-premium-page { padding-top: 100px; }
  .login-card-brutal-compact { padding: 30px; }
  .login-title-small { font-size: 2.2rem; }
}
</style>