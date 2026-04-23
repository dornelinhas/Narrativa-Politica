<template>
  <header v-if="!isAdminPage" class="header" :class="{ 'header-scrolled': isScrolled, 'is-light-page': isLightPage, 'is-login-page': isLoginPage }">
    <div class="header-inner">
      <!-- LOGO NP (PRETO) -->
      <router-link to="/" class="logo-group">
        <div class="logo-np-brutalist">
          <div class="shape s1"></div>
          <div class="shape s2"></div>
          <div class="shape s3"></div>
          <div class="shape s4"></div>
          <div class="shape s5"></div>
          <span class="logo-text">NP</span>
        </div>
      </router-link>

      <!-- MENU DE ABAS (PRETO) -->
      <nav class="nav-desktop">
        <router-link v-if="siteContent.settings?.menuHome !== false" to="/" class="nav-tab">MOVIMENTO</router-link>
        <router-link v-if="siteContent.settings?.menuArticles !== false" to="/conteudo" class="nav-tab">ARTIGOS</router-link>
        
        <div class="nav-tab-dropdown" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false" v-if="siteContent.settings?.menuAtuacao !== false">
          <button class="nav-tab dropdown-btn">
            ATUAÇÃO
          </button>
          <div v-show="isDropdownOpen" class="dropdown-menu-brutal">
            <router-link v-if="siteContent.settings?.menuOpportunities !== false" to="/oportunidades" class="drop-link">Oportunidades</router-link>
            <router-link v-if="siteContent.settings?.menuPaths !== false" to="/trilhas" class="drop-link">Trilhas</router-link>
            <router-link v-if="siteContent.settings?.menuServices !== false" to="/servicos" class="drop-link">Serviços</router-link>
            <router-link v-if="siteContent.settings?.menuLibrary !== false" to="/biblioteca" class="drop-link">Biblioteca</router-link>
          </div>
        </div>

        <router-link v-if="siteContent.settings?.menuAbout !== false" to="/sobre" class="nav-tab">SOBRE MIM</router-link>
        
        <!-- ENVOLVA-SE VIVO -->
        <router-link to="/contatos" class="envolva-btn-vibrant">
          ENVOLVA-SE
        </router-link>
      </nav>

      <div class="header-actions">
        <!-- ÁREA DO USUÁRIO INTEGRADA -->
        <div v-if="isAuthenticated" class="user-navigation-group">
           <div class="user-access-row" @click="$router.push(loginRoute)">
              <span class="user-name-label">{{ user?.nome_completo?.toUpperCase() || 'USUÁRIO' }}</span>
              <div class="user-status-raio">
                 <span>⚡</span>
              </div>
           </div>
           <button class="logout-btn-minimal" @click="handleLogout">
             SAIR
           </button>
        </div>
        <button v-else-if="siteContent.settings?.showLogin" class="login-btn-header" @click="$router.push('/login')">
          LOGIN
        </button>

        <button class="mobile-toggle" @click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'

const isScrolled = ref(false)
const isDropdownOpen = ref(false)
const { isAuthenticated, user, logout } = useAuth()
const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}

const isLightPage = computed(() => {
  const path = route.path
  // Páginas que devem ter o menu com texto preto (fundo claro)
  if (path === '/conteudo' || path === '/arquivo-newsletter') return true
  const lightPrefixes = ['/oportunidades', '/trilhas', '/servicos', '/sobre', '/login', '/area-do-aluno']
  return lightPrefixes.some(p => path.startsWith(p))
})

const isLoginPage = computed(() => route.path === '/login')
const isAdminPage = computed(() => route.path.startsWith('/admin'))

const loginRoute = computed(() => {
  if (!isAuthenticated.value) return '/login'
  return user.value?.role === 'admin' ? '/admin' : '/area-do-aluno'
})

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
const toggleMenu = () => { }

onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  height: 90px;
  display: flex;
  align-items: center;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.header-scrolled {
  height: 70px;
  background: #FFFFFF !important;
  border-bottom: 3px solid #1C1C1C;
}

.is-login-page { background: #DF2028 !important; border-bottom: 3px solid #1C1C1C; }

.header-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-desktop { display: flex; align-items: center; gap: 35px; }

/* ESTILO ABAS - PRETO POR PADRÃO NAS PÁGINAS LIGHT */
.nav-tab {
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
  text-decoration: none;
  transition: 0.3s;
}

.header-scrolled .nav-tab, .is-light-page .nav-tab { color: #1C1C1C !important; }
.is-login-page .nav-tab { color: #FFFFFF !important; }

.nav-tab-dropdown { position: relative; padding: 10px 0; }
.nav-tab-dropdown::after { content: ""; position: absolute; top: 100%; left: 0; width: 100%; height: 20px; background: transparent; }
.dropdown-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 0; }

.dropdown-menu-brutal {
  position: absolute; top: 100%; left: 0; margin-top: 15px;
  background: #FFF; border: 3px solid #1C1C1C;
  min-width: 220px; box-shadow: 8px 8px 0 #1C1C1C;
  display: flex; flex-direction: column;
}
.drop-link { padding: 12px 20px; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; color: #1C1C1C; text-decoration: none; border-bottom: 1px solid #EEE; }
.drop-link:hover { background: #FFE65A; }

.envolva-btn-vibrant {
  background: #DF2028;
  color: #FFF !important;
  padding: 10px 25px;
  border-radius: 9999px;
  font-weight: 900;
  font-size: 0.7rem;
  text-decoration: none;
  border: 2px solid #1C1C1C;
  transition: 0.3s;
}
.header-scrolled .envolva-btn-vibrant, .is-light-page .envolva-btn-vibrant {
  background: #1C1C1C;
  color: #FFE65A !important;
}

/* ÁREA DO USUÁRIO INTEGRADA NO MENU OFICIAL */
.user-navigation-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-access-row {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.logout-btn-minimal {
  background: transparent;
  color: #1C1C1C;
  border: 2px solid #1C1C1C;
  padding: 6px 15px;
  border-radius: 9999px;
  font-weight: 900;
  font-size: 0.65rem;
  cursor: pointer;
  transition: 0.2s;
  letter-spacing: 1px;
}

.logout-btn-minimal:hover {
  background: #DF2028;
  color: #FFF;
  border-color: #DF2028;
}

.is-login-page .logout-btn-minimal {
  color: #FFF;
  border-color: #FFF;
}

/* BOTÃO DE LOGIN RECUPERADO */
.login-btn-header {
  background: #FFE65A;
  color: #1C1C1C;
  border: 2px solid #1C1C1C;
  padding: 8px 20px;
  border-radius: 9999px;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  letter-spacing: 1px;
  box-shadow: 2px 2px 0 #1C1C1C;
}

.login-btn-header:hover {
  background: #FF6BCA;
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 #1C1C1C;
}

.header-scrolled .login-btn-header, .is-light-page .login-btn-header {
  background: #FFFFFF;
  color: #1C1C1C;
}

.header-scrolled .login-btn-header:hover, .is-light-page .login-btn-header:hover {
  background: #1C1C1C;
  color: #FFE65A;
}

.is-login-page .login-btn-header {
  background: #1C1C1C;
  color: #FFFFFF;
  border-color: #FFFFFF;
}

.user-name-label {
  font-family: "Archivo Black", sans-serif;
  font-size: 0.85rem;
  color: #1C1C1C;
  letter-spacing: 1px;
}
.is-login-page .user-name-label { color: #FFF; }

.user-status-raio {
  width: 40px; height: 40px; background: #FFE65A;
  border: 2px solid #1C1C1C; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; transition: 0.3s;
}

/* LOGO NP EM PRETO */
.logo-group { text-decoration: none; color: inherit; }
.logo-np-brutalist { position: relative; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; }
.logo-text { font-family: "Archivo Black", sans-serif; font-weight: 900; font-size: 1.5rem; z-index: 5; color: #FFF; }
.header-scrolled .logo-text, .is-light-page .logo-text { color: #1C1C1C !important; }
.is-login-page .logo-text { color: #FFFFFF !important; }

.logo-np-brutalist .shape { position: absolute; border: 2px solid #1C1C1C; }
.s1 { top: -4px; left: -4px; width: 14px; height: 14px; background: #DF2028; border-radius: 50% !important; }
.s2 { top: 4px; right: -10px; width: 18px; height: 12px; background: #FF6BCA; }
.s3 { bottom: -4px; right: -6px; width: 12px; height: 12px; background: #A4CD39; }
.s4 { bottom: -6px; left: 4px; width: 12px; height: 20px; background: #FFE65A; }
.s5 { top: 8px; right: 0; width: 10px; height: 10px; background: #3D78E0; border-radius: 50% !important; }

.mobile-toggle { display: none; background: none; border: none; flex-direction: column; gap: 6px; cursor: pointer; color: currentColor; }
.header-scrolled .mobile-toggle, .is-light-page .mobile-toggle { color: #1C1C1C; }

@media (max-width: 1100px) {
  .nav-desktop { display: none; }
  .mobile-toggle { display: flex; }
}
</style>