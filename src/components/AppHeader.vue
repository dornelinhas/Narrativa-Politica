<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled || isLightPage }">
    <div class="header-inner">
      <!-- LOGO NP (EXATO DA REFERÊNCIA) -->
      <router-link to="/" class="logo-group">
        <div class="logo-np-brutalist">
          <div class="shape s1"></div>
          <div class="shape s2"></div>
          <div class="shape s3"></div>
          <div class="shape s4"></div>
          <div class="shape s5"></div>
          <span class="logo-text">NP</span>
        </div>
        <div class="logo-label">A Bancada de Impacto</div>
      </router-link>

      <!-- NAVIGATION (ESTILO REFERÊNCIA) -->
      <nav class="nav-desktop">
        <template v-for="item in (siteContent.settings.menu || [])" :key="item.name">
          <!-- Dropdown -->
          <div v-if="item.submenu" class="dropdown-brutalist" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false">
            <button class="nav-item dropdown-toggle">
              {{ item.name }} 
              <svg viewBox="0 0 24 24" class="chevron-icon" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <transition name="fade-fast">
              <div v-show="isDropdownOpen" class="dropdown-content-brutalist">
                <router-link v-for="sub in item.submenu" :key="sub.name" :to="sub.link" class="dropdown-link">{{ sub.name }}</router-link>
              </div>
            </transition>
          </div>

          <!-- Regular Item -->
          <router-link v-else :to="item.link" class="nav-item" :class="{ 'nav-highlight': item.highlight }">
            {{ item.name }}
          </router-link>
        </template>
      </nav>

      <!-- ACTIONS -->
      <div class="header-actions">
        <button v-if="!isAuthenticated && siteContent.settings.showLogin" @click="openLogin" class="brutalist-button-mini">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="user-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Login</span>
        </button>
        
        <div v-else-if="isAuthenticated" class="user-avatar-brutalist" @click="$router.push(loginRoute)">
          <div class="avatar-box">
             <img v-if="user?.image" :src="user.image" class="avatar-img" />
             <span v-else>{{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}</span>
          </div>
        </div>

        <button class="menu-toggle-brutalist" @click="toggleMenu" aria-label="Menu">
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-nav-overlay">
        <div class="mobile-nav-content">
          <button class="close-menu" @click="closeMenu">✕</button>
          <nav class="nav-links-mobile">
            <router-link @click="closeMenu" to="/">Movimento</router-link>
            <router-link @click="closeMenu" to="/conteudo">Artigos</router-link>
            <router-link @click="closeMenu" to="/oportunidades">Oportunidades</router-link>
            <router-link @click="closeMenu" to="/servicos">Serviços</router-link>
            <router-link @click="closeMenu" to="/trilhas">Trilhas</router-link>
            <router-link @click="closeMenu" to="/sobre">Sobre</router-link>
            <router-link @click="closeMenu" to="/contatos">Envolva-se</router-link>
            <button v-if="!isAuthenticated" @click="openLogin(); closeMenu()" class="brutalist-button red">Acessar Conta</button>
          </nav>
        </div>
      </div>
    </transition>

    <LoginModal :isOpen="isLoginModalOpen" @close="closeLogin" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'
import LoginModal from './LoginModal.vue'

const router = useRouter()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const { user, isAuthenticated, isLoginModalOpen, openLogin, closeLogin } = useAuth()

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
/* HEADER — EXATO DA REFERÊNCIA (mix-blend-mode: difference) */
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  padding: 24px 0;
  background: transparent;
  color: #FFFFFF;
  transition: all 0.3s ease;
}

.header-scrolled {
  position: fixed;
  padding: 14px 0;
  background: #FFFFFF;
  color: #1C1C1C;
  border-bottom: 4px solid #1C1C1C;
  box-shadow: 10px 10px 0px rgba(0,0,0,0.05);
}

.header-scrolled .logo-text,
.header-scrolled .logo-label,
.header-scrolled .nav-item,
.header-scrolled .chevron-icon {
  color: #1C1C1C;
}

.header-scrolled .nav-item:hover {
  color: var(--color-red);
}

.header-scrolled .nav-highlight {
  color: #FF6BCA !important;
}

.header-scrolled .brutalist-button-mini {
  border-color: #1C1C1C;
  color: #1C1C1C;
}

.header-scrolled .brutalist-button-mini:hover {
  background: #1C1C1C;
  color: #FFFFFF;
}

.header-scrolled .avatar-box {
  background: #1C1C1C;
  border-color: #1C1C1C;
  color: #FFFFFF;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* LOGO */
.logo-group {
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: #FFFFFF;
}

.logo-text {
  color: #FFFFFF;
  z-index: 2;
}

/* Formas voltam a ter cores, apenas o texto fica branco */
.logo-np-brutalist .shape {
  z-index: 1;
}

.logo-label {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 4px;
  color: #FFFFFF;
}

@media (max-width: 640px) {
  .logo-label { display: none; }
}

/* NAVIGATION — EXATO DA REFERÊNCIA */
.nav-desktop {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-item {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 5px;
  transition: color 0.2s;
  text-decoration: none;
}

.nav-item:hover { color: var(--color-yellow); }
.nav-highlight { color: #FFE65A !important; }
.nav-highlight:hover { color: #FFE65A !important; opacity: 0.8; }

/* DROPDOWN BRUTALISTA */
.dropdown-brutalist { position: relative; }
.dropdown-toggle { display: flex; align-items: center; gap: 8px; }
.chevron-icon { width: 12px; height: 12px; color: #FFFFFF; }

.dropdown-content-brutalist {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 3px solid var(--color-dark);
  min-width: 180px;
  width: max-content;
  box-shadow: 6px 6px 0 var(--color-dark);
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 100;
}

.dropdown-link {
  padding: 12px 20px;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-dark);
  text-decoration: none;
  white-space: nowrap;
  display: block;
}

.dropdown-link:hover { background: var(--color-bg); color: var(--color-red); }

/* ACTIONS */
.header-actions { display: flex; align-items: center; gap: 15px; }

.brutalist-button-mini {
  background: transparent;
  border: 3px solid #FFFFFF;
  color: #FFFFFF;
  padding: 8px 16px;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.brutalist-button-mini:hover {
  background: #FFFFFF;
  color: #000000;
}

.avatar-box {
  width: 35px; height: 35px;
  background: #FFFFFF;
  border: 3px solid #FFFFFF;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; color: #000000;
  cursor: pointer;
}

.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.menu-toggle-brutalist {
  display: none; background: none; border: none; flex-direction: column; gap: 6px; cursor: pointer;
}
.menu-toggle-brutalist .bar { width: 28px; height: 4px; background: currentColor; }

@media (max-width: 1024px) {
  .nav-desktop { display: none; }
  .menu-toggle-brutalist { display: flex; }
}

/* MOBILE MENU */
.mobile-nav-overlay {
  position: fixed; inset: 0; background: var(--color-dark); color: white; z-index: 3000; padding: 40px;
}
.close-menu { position: absolute; top: 30px; right: 30px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; }
.nav-links-mobile { display: flex; flex-direction: column; gap: 20px; margin-top: 60px; }
.nav-links-mobile a { font-family: var(--font-display); font-size: 2rem; text-decoration: none; color: white; text-transform: uppercase; }
.nav-links-mobile a:hover { color: var(--color-yellow); }

.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

.fade-fast-enter-active, .fade-fast-leave-active { transition: opacity 0.2s ease; }
.fade-fast-enter-from, .fade-fast-leave-to { opacity: 0; }
</style>