<template>
  <header v-if="!isAdminPage" class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-inner">
      <!-- LOGO NP -->
      <router-link to="/" class="logo-group">
        <span class="logo-wordmark">NARRATIVA POLÍTICA</span>
      </router-link>

      <!-- MENU DE ABAS -->
      <nav class="nav-desktop">
        <router-link v-if="siteContent.settings?.menuHome !== false" to="/" class="nav-link" :class="{ active: $route.path === '/' }">MOVIMENTO</router-link>
        <div class="nav-dropdown" @mouseenter="isArticlesDropdownOpen = true" @mouseleave="isArticlesDropdownOpen = false" v-if="siteContent.settings?.menuArticles !== false">
          <router-link to="/conteudo" class="nav-link dropdown-trigger" :class="{ active: $route.path.startsWith('/conteudo') || $route.path.startsWith('/arquivo-newsletter') }">
            ARTIGOS
          </router-link>
          <transition name="dropdown-fade">
            <div v-show="isArticlesDropdownOpen" class="dropdown-panel paper-shadow" style="min-width: 240px;">
              <router-link to="/conteudo" class="drop-item">
                <span class="drop-icon" style="background-color: var(--np-rosa);"></span>
                <div>
                  <span class="drop-label">Artigos</span>
                  <span class="drop-desc">Análises e ensaios</span>
                </div>
              </router-link>
              <router-link to="/arquivo-newsletter" class="drop-item">
                <span class="drop-icon" style="background-color: var(--np-azul);"></span>
                <div>
                  <span class="drop-label">Notícias</span>
                  <span class="drop-desc">Arquivo de newsletters</span>
                </div>
              </router-link>
            </div>
          </transition>
        </div>
        
        <div class="nav-dropdown" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false" v-if="siteContent.settings?.menuAtuacao !== false">
          <router-link to="/#atuacao" class="nav-link dropdown-trigger" :class="{ active: isAtuacaoActive }">
            ATUAÇÃO
          </router-link>
          <transition name="dropdown-fade">
            <div v-show="isDropdownOpen" class="dropdown-panel paper-shadow">
              <router-link to="/agenda" class="drop-item">
                <span class="drop-icon" style="background-color: var(--np-black);"></span>
                <div>
                  <span class="drop-label">Agenda</span>
                  <span class="drop-desc">Eventos e Aulas</span>
                </div>
              </router-link>
              <router-link v-if="siteContent.settings?.menuOpportunities !== false" to="/oportunidades" class="drop-item">
                <span class="drop-icon drop-icon-vermelho"></span>
                <div>
                  <span class="drop-label">Oportunidades</span>
                  <span class="drop-desc">Vagas e bolsas</span>
                </div>
              </router-link>
              <router-link v-if="siteContent.settings?.menuPaths !== false" to="/trilhas" class="drop-item">
                <span class="drop-icon drop-icon-lilas"></span>
                <div>
                  <span class="drop-label">Trilhas</span>
                  <span class="drop-desc">Formação política</span>
                </div>
              </router-link>
              <router-link v-if="siteContent.settings?.menuServices !== false" to="/servicos" class="drop-item">
                <span class="drop-icon drop-icon-amarelo"></span>
                <div>
                  <span class="drop-label">Serviços</span>
                  <span class="drop-desc">Consultoria e apoio</span>
                </div>
              </router-link>
              <router-link v-if="siteContent.settings?.menuProjects !== false" to="/projetos" class="drop-item">
                <span class="drop-icon drop-icon-verde"></span>
                <div>
                  <span class="drop-label">Projetos</span>
                  <span class="drop-desc">Impacto social</span>
                </div>
              </router-link>
              <router-link v-if="siteContent.settings?.menuLibrary !== false" to="/biblioteca" class="drop-item">
                <span class="drop-icon drop-icon-azul"></span>
                <div>
                  <span class="drop-label">Biblioteca</span>
                  <span class="drop-desc">Documentos e relatórios</span>
                </div>
              </router-link>
            </div>
          </transition>
        </div>

        <router-link v-if="siteContent.settings?.menuAbout !== false" to="/sobre" class="nav-link" :class="{ active: $route.path === '/sobre' }">SOBRE MIM</router-link>
        
        <!-- CTA -->
        <router-link to="/contatos" class="nav-link" :class="{ active: $route.path === '/contatos' }">ENVOLVA-SE</router-link>
      </nav>

      <div class="header-actions">
        <!-- ÁREA DO USUÁRIO -->
        <div v-if="isAuthenticated" class="user-nav-group">
           <div class="user-access" @click="$router.push(loginRoute)">
              <div class="user-avatar">
                {{ (user?.nome_completo || 'U').charAt(0).toUpperCase() }}
              </div>
              <span class="user-name">{{ user?.nome_completo || 'Usuário' }}</span>
           </div>
           <button class="logout-btn" @click="handleLogout">
             Sair
           </button>
        </div>
        <button v-else-if="siteContent.settings?.showLogin !== false" class="login-btn" @click="$router.push('/login')">
          Entrar
        </button>

        <!-- CTA DESKTOP REMOVIDO PARA O FOOTER -->

        <button class="mobile-toggle" @click="toggleMobile" :class="{ 'is-open': mobileOpen }" aria-label="Abrir Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="mobile-slide">
      <div v-if="mobileOpen" class="mobile-menu">
        <router-link v-if="siteContent.settings?.menuHome !== false" to="/" class="mobile-link" @click="mobileOpen = false">Início</router-link>
        <router-link v-if="siteContent.settings?.menuArticles !== false" to="/conteudo" class="mobile-link" @click="mobileOpen = false">Artigos & Notícias</router-link>
        <router-link v-if="siteContent.settings?.menuOpportunities !== false" to="/oportunidades" class="mobile-link" @click="mobileOpen = false">Oportunidades</router-link>
        <router-link v-if="siteContent.settings?.menuPaths !== false" to="/trilhas" class="mobile-link" @click="mobileOpen = false">Trilhas</router-link>
        <router-link v-if="siteContent.settings?.menuServices !== false" to="/servicos" class="mobile-link" @click="mobileOpen = false">Serviços</router-link>
        <router-link v-if="siteContent.settings?.menuProjects !== false" to="/projetos" class="mobile-link" @click="mobileOpen = false">Projetos</router-link>
        <router-link v-if="siteContent.settings?.menuLibrary !== false" to="/biblioteca" class="mobile-link" @click="mobileOpen = false">Biblioteca</router-link>
        <router-link to="/agenda" class="mobile-link" @click="mobileOpen = false">Agenda</router-link>
        <router-link v-if="siteContent.settings?.menuAbout !== false" to="/sobre" class="mobile-link" @click="mobileOpen = false">Sobre</router-link>
        <router-link to="/contatos" class="mobile-link mobile-cta" @click="mobileOpen = false">Envolva-se</router-link>
        <router-link to="/doacao" class="mobile-link mobile-cta-secondary" @click="mobileOpen = false">Apoie Agora →</router-link>
        <router-link to="/login" class="mobile-admin-link" @click="mobileOpen = false">Administração</router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'

const isScrolled = ref(false)
const isDropdownOpen = ref(false)
const isArticlesDropdownOpen = ref(false)
const mobileOpen = ref(false)
const { isAuthenticated, user, logout } = useAuth()
const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}

const isAtuacaoActive = computed(() => {
  const path = route.path
  return ['/oportunidades', '/trilhas', '/servicos', '/projetos', '/biblioteca'].some(p => path.startsWith(p))
})

const isAdminPage = computed(() => route.path.startsWith('/admin'))

const loginRoute = computed(() => {
  if (!isAuthenticated.value) return '/login'
  return user.value?.role === 'admin' ? '/admin' : '/area-do-aluno'
})

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
const toggleMobile = () => { mobileOpen.value = !mobileOpen.value }

onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
/* ── HEADER BASE ────────────────────────────── */
.header {
  position: sticky;
  top: 0; left: 0; right: 0;
  z-index: 9990;
  background: var(--np-creme);
  border-bottom: var(--border-thick);
  transition: all 0.3s ease;
}

.header-scrolled {
  background: var(--np-creme); /* Solid bg for scrolled state, no blur to keep it brutal */
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; /* Thicker header */
}

/* ── LOGO ────────────────────────────────────── */
.logo-group {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--np-black);
}

.logo-wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 32px; /* Bigger logo following the reference */
  line-height: 1;
  text-transform: uppercase;
  color: var(--np-black);
  letter-spacing: -1px;
}

/* ── NAV LINKS ───────────────────────────────── */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 16px; /* More spacing */
}

.nav-link {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px; /* Big brutalist nav */
  color: var(--text-variant);
  text-decoration: none;
  padding: 8px 12px;
  transition: all 0.2s;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0;
}

.nav-link:hover {
  color: var(--np-black);
}

.nav-link.active {
  color: var(--np-black);
  font-weight: 800;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 4px; /* Thick red border bottom */
  background: var(--np-vermelho);
}

/* ── DROPDOWN ────────────────────────────────── */
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--np-white);
  border: var(--border-thick);
  min-width: 280px;
  padding: 0;
  z-index: 100;
  margin-top: 8px; /* Added margin instead of top offset */
}
/* Bridge pseudo-element to prevent closing when moving from trigger to panel */
.dropdown-panel::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  height: 12px;
  background: transparent;
}

.drop-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  text-decoration: none;
  color: var(--np-black);
  transition: all 0.2s;
  border-bottom: 1px solid var(--np-black);
}
.drop-item:last-child {
  border-bottom: none;
}

.drop-item:hover {
  background: var(--np-creme);
}

.drop-icon {
  width: 14px;
  height: 14px;
  display: block;
  flex-shrink: 0;
  border: 1px solid var(--np-black);
  border-radius: 50%;
}

.drop-icon-vermelho { background: var(--np-vermelho); }
.drop-icon-lilas { background: var(--np-lilas); }
.drop-icon-amarelo { background: var(--np-amarelo); }
.drop-icon-verde { background: var(--np-verde); }
.drop-icon-azul { background: var(--np-azul); }

.drop-label {
  display: block;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 14px;
  color: var(--np-black);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.drop-desc {
  display: block;
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ── CTA BUTTON ──────────────────────────────── */
.nav-cta-btn {
  display: none;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--np-black);
  color: var(--np-white);
  text-decoration: none;
  transition: all 0.25s;
  border: var(--border-thick);
}

.nav-cta-btn:hover {
  background: var(--np-vermelho);
}

@media (min-width: 1025px) {
  .nav-cta-btn {
    display: inline-flex;
  }
}

/* ── USER AREA ───────────────────────────────── */
.user-nav-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-access {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px;
  border: var(--border-thick);
  background: var(--np-white);
  box-shadow: var(--shadow-paper-sm);
  transition: transform 0.2s;
}

.user-access:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-paper);
}

.user-avatar {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 14px;
  color: var(--np-white);
  background: var(--np-black);
}

.user-name {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  color: var(--np-black);
}

.login-btn {
  padding: 12px 24px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--np-white);
  color: var(--np-black);
  border: var(--border-thick);
  box-shadow: var(--shadow-paper-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.login-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-paper);
  background: var(--np-amarelo);
}

.logout-btn {
  padding: 8px 12px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--np-white);
  color: var(--np-black);
  border: var(--border-thick);
  cursor: pointer;
}

.logout-btn:hover {
  background: var(--np-vermelho);
  color: var(--np-white);
}

/* ── MOBILE TOGGLE ───────────────────────────── */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: var(--np-white);
  border: 2px solid var(--np-black);
  cursor: pointer;
  padding: 8px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-paper-sm);
}

.mobile-toggle:hover {
  background: var(--np-amarelo);
}

.mobile-toggle span {
  display: block;
  width: 24px;
  height: 3px;
  background: var(--np-black);
  transition: all 0.3s;
}

.mobile-toggle.is-open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.mobile-toggle.is-open span:nth-child(2) { opacity: 0; }
.mobile-toggle.is-open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* ── MOBILE MENU ─────────────────────────────── */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--np-white);
  padding: 0;
  border-bottom: var(--border-thick);
  box-shadow: var(--shadow-paper);
}

.mobile-link {
  display: block;
  padding: 20px 24px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 24px;
  color: var(--np-black);
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 2px solid var(--np-black);
  transition: background 0.2s;
}

.mobile-link:hover {
  background: var(--np-creme);
  color: var(--np-vermelho);
}

.mobile-cta {
  background: var(--np-black);
  color: var(--np-white) !important;
  text-align: center;
}
.mobile-cta:hover { background: var(--np-vermelho); color: var(--np-white) !important; }

.mobile-cta-secondary {
  background: var(--np-amarelo);
  color: var(--np-black) !important;
  text-align: center;
  border-bottom: none;
}

.mobile-admin-link {
  display: block;
  padding: 12px;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--np-black);
  opacity: 0.3;
  text-decoration: none;
}

.mobile-slide-enter-active, .mobile-slide-leave-active { transition: opacity 0.3s, transform 0.3s; }
.mobile-slide-enter-from, .mobile-slide-leave-to { opacity: 0; transform: translateY(-12px); }

@media (max-width: 991px) {
  .nav-desktop { display: none; }
  .nav-cta-btn { display: none; }
  .mobile-toggle { display: flex; }
  .header-inner { padding: 0 20px; }
}
</style>
