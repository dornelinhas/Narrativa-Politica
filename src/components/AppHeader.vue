<template>
  <div class="app-header-wrapper" :class="{ 'scrolled-wrapper': isScrolled }">
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-inner">
      <!-- LOGO -->
      <router-link to="/" class="logo-group">
        <div v-if="siteContent.settings.siteLogo" class="logo-dynamic">
          <img :src="siteContent.settings.siteLogo" alt="Narrativa Política" />
        </div>
        <div v-else class="logo-icon-compact">
          <span class="logo-np">NP</span>
          <div class="decoration sq-1"></div>
          <div class="decoration sq-2"></div>
        </div>
        <div class="logo-text">
          <span class="name-top">Narrativa</span>
          <span class="name-bottom">Política</span>
        </div>
      </router-link>

      <!-- NAVIGATION -->
      <nav class="nav-desktop">
        <router-link v-if="siteContent.settings.menuHome" to="/" class="nav-item">Home</router-link>
        <router-link to="/conteudo" class="nav-item">Conteúdo</router-link>
        
        <div v-if="siteContent.settings.menuServices || siteContent.settings.menuPaths || siteContent.settings.menuLibrary || siteContent.settings.menuProjects" 
             class="dropdown-wrapper" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false">
          <button class="nav-item dropdown-toggle">Nossa Atuação ▾</button>
          <div v-show="isDropdownOpen" class="dropdown-menu">
            <router-link v-if="siteContent.settings.menuServices" to="/servicos" class="dropdown-item" @click="isDropdownOpen = false">Serviços</router-link>
            <router-link v-if="siteContent.settings.menuPaths" to="/trilhas" class="dropdown-item" @click="isDropdownOpen = false">Trilhas</router-link>
            <router-link v-if="siteContent.settings.menuLibrary" to="/biblioteca" class="dropdown-item" @click="isDropdownOpen = false">Biblioteca</router-link>
            <router-link v-if="siteContent.settings.menuProjects" to="/projetos" class="dropdown-item" @click="isDropdownOpen = false">Projetos</router-link>
          </div>
        </div>

        <router-link v-if="siteContent.settings.menuAbout" to="/sobre" class="nav-item">Sobre Mim</router-link>
        <router-link v-if="siteContent.settings.menuContact" to="/contatos" class="nav-item nav-highlight">Fale Conosco</router-link>
      </nav>

      <!-- AUTH ACTIONS -->
      <div class="header-actions">
        <!-- ... (acessibilidade mantida) ... -->
        <div class="accessibility-dropdown">
          <button class="acc-toggle-btn" @click.stop="isAccOpen = !isAccOpen" aria-label="Acessibilidade">
            <Type :size="20" />
          </button>
          <!-- (resto do menu de acessibilidade) -->
        </div>

        <button v-if="!isAuthenticated && siteContent.settings.showLogin" @click="openLogin" class="login-btn-outline">
          <div class="btn-inner">
            <User :size="16" /> <span>Entrar</span>
          </div>
        </button>
        
        <div v-else class="user-profile-glow" @click="$router.push(loginRoute)">
          <div class="avatar-wrapper">
            <div class="avatar-main">
              <img v-if="user?.image" :src="user.image" class="avatar-img" />
              <span v-else>{{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}</span>
            </div>
            <div class="avatar-ring"></div>
          </div>
          <span class="user-name-header">{{ user?.role === 'admin' ? 'Meu Painel' : (user?.name ? user.name.split(' ')[0] : 'Minha Conta') }}</span>
        </div>

        <button class="menu-toggle" @click="toggleMenu" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="nav-mobile-overlay" @click.self="closeMenu">
        <nav class="nav-mobile">
          <router-link @click="closeMenu" to="/">Home</router-link>
          <router-link @click="closeMenu" to="/conteudo">Conteúdo</router-link>
          <span class="mobile-section-title">Nossa Atuação</span>
          <router-link @click="closeMenu" to="/servicos" class="mobile-sublink">- Serviços</router-link>
          <router-link @click="closeMenu" to="/trilhas" class="mobile-sublink">- Trilhas</router-link>
          <router-link @click="closeMenu" to="/projetos" class="mobile-sublink">- Projetos</router-link>
          <router-link @click="closeMenu" to="/oportunidades">Oportunidades</router-link>
          <router-link @click="closeMenu" to="/sobre">Sobre Mim</router-link>
          <router-link @click="closeMenu" to="/contatos">Fale Conosco</router-link>
          <button @click="openLogin(); closeMenu()" class="mobile-login-btn">Acessar Conta</button>
        </nav>
      </div>
    </transition>
    </header>

    <LoginModal :isOpen="isLoginModalOpen" @close="closeLogin" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { User, Type, RotateCcw } from 'lucide-vue-next'
import { useAuth } from '../store/auth'
import { settings, resetSettings } from '../store/settings'
import { siteContent } from '../store/content'
import LoginModal from './LoginModal.vue'

const router = useRouter()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const isAccOpen = ref(false)
const { user, isAuthenticated, isLoginModalOpen, openLogin, closeLogin } = useAuth()

const handleReset = () => { resetSettings() }
const changeFont = (delta) => {
  const newSize = settings.fontSize + delta
  if (newSize >= 80 && newSize <= 150) settings.fontSize = newSize
}

const loginRoute = computed(() => {
  if (!isAuthenticated.value) return '/login'
  return user.value?.role === 'admin' ? '/admin' : '/area-do-aluno'
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }
const closeMenu = () => { isMobileMenuOpen.value = false }

onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
.app-header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.header-scrolled {
  height: 60px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.06);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* LOGO */
.logo-group {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-dynamic {
  height: 38px;
  display: flex;
  align-items: center;
}
.logo-dynamic img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.logo-icon-compact {
  position: relative;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-np {
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-graphite);
  z-index: 2;
  position: relative;
}

.decoration {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  opacity: 0.85;
  transition: transform 0.4s ease;
}

.sq-1 { background: var(--color-pink); top: -2px; left: -2px; }
.sq-2 { background: var(--color-purple); bottom: -2px; right: -2px; }

.logo-group:hover .sq-1 { transform: translate(-2px, -2px); }
.logo-group:hover .sq-2 { transform: translate(2px, 2px); }

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  padding-left: 5px;
}

.name-top {
  font-weight: 900;
  font-size: 1.1rem;
  color: var(--color-graphite);
}

.name-bottom {
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-pink);
  font-weight: 800;
}

/* NAVIGATION */
.nav-desktop {
  display: flex;
  gap: 6px;
  align-items: center;
}

.nav-item {
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-graphite);
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 10px;
  position: relative;
  border: none;
  background: transparent;
  z-index: 10;
}

/* DROPDOWN */
.dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1000;
}

.dropdown-item {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-graphite);
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #F1F5F9;
  color: var(--color-purple);
  padding-left: 20px;
}

.nav-item:hover {
  color: var(--color-pink);
  background: rgba(255,45,85,0.06);
}

.nav-highlight {
  color: var(--color-pink) !important;
  font-weight: 800 !important;
}

.nav-highlight:hover {
  background: rgba(255,45,85,0.1) !important;
}

/* AUTH */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* ACCESSIBILITY */
.accessibility-dropdown { position: relative; }
.acc-toggle-btn {
  background: none; border: none; padding: 8px; cursor: pointer; color: #64748B;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.acc-toggle-btn:hover { color: #111827; }

.acc-menu {
  position: absolute; top: 100%; right: 0; width: 220px; background: #fff;
  border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; margin-top: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08); z-index: 100;
}
.acc-menu-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.acc-menu-item:last-child { margin-bottom: 0; }
.acc-menu-item span { font-size: 0.85rem; font-weight: 700; color: #111827; }

.acc-menu-divider { height: 1px; background: #F1F5F9; margin: 12px 0; }
.acc-reset-btn {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
  background: #F9FAFB; border: 1.5px solid #E5E7EB; padding: 10px; border-radius: 8px;
  font-size: 0.75rem; font-weight: 800; color: #64748B; cursor: pointer; transition: all 0.2s;
}
.acc-reset-btn:hover { background: #fff; border-color: #FF2D55; color: #FF2D55; }

.acc-action-btn { font-size: 0.75rem; font-weight: 800; padding: 6px 12px; border-radius: 6px; border: 1.5px solid #E5E7EB; background: #fff; cursor: pointer; }
.acc-action-btn.active { background: #111827; color: #fff; border-color: #111827; }

.acc-info { font-size: 0.7rem; color: #94A3B8; margin-top: 8px; text-align: center; font-weight: 600; }

.font-controls { display: flex; gap: 4px; }
.font-btn { padding: 6px 10px; border-radius: 6px; border: 1.5px solid #E5E7EB; background: #fff; font-weight: 800; cursor: pointer; font-size: 0.75rem; }
.font-btn:hover { border-color: #111827; }

.login-btn-outline {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-pink);
  border: 2px solid var(--color-pink);
  background: transparent;
  padding: 8px 24px;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  display: block;
}

.login-btn-outline:hover {
  background: var(--color-pink);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 45, 85, 0.2);
}

.btn-inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-profile-glow {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: rgba(255,255,255,0.8);
  padding: 6px 18px 6px 6px;
  border-radius: 100px;
  border: 1px solid rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  position: relative;
}

.user-profile-glow:hover {
  background: #fff;
  border-color: var(--color-pink);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255,45,85,0.1);
}

.avatar-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
}

.avatar-main {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #D4E157 0%, #E6EE9C 100%);
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.95rem;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-pink), var(--color-purple));
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-profile-glow:hover .avatar-ring {
  opacity: 1;
}

.user-name-header {
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--color-graphite);
  letter-spacing: -0.3px;
}

/* MOBILE */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  position: relative;
  z-index: 1001;
}

.menu-toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-graphite);
  border-radius: 2px;
  transition: 0.3s;
}

@media (max-width: 992px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: flex; }
}

.nav-mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-mobile {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.nav-mobile a {
  font-size: 1.4rem;
  font-weight: 900;
  text-decoration: none;
  color: var(--color-graphite);
  padding: 8px 0;
  transition: color 0.2s;
}

.nav-mobile a:hover {
  color: var(--color-pink);
}

.mobile-section-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-purple);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
}

.mobile-sublink {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  color: #64748B !important;
}

.mobile-login-btn {
  margin-top: 16px;
  background: var(--color-graphite) !important;
  color: #fff !important;
  padding: 14px 40px !important;
  border-radius: 14px !important;
  font-size: 1rem !important;
}
</style>