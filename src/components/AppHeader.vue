<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-inner">
      <!-- LOGO -->
      <router-link to="/" class="logo-group">
        <div class="logo-np-brutalist">
          <div class="shape s1"></div>
          <div class="shape s2"></div>
          <div class="shape s3"></div>
          <div class="shape s4"></div>
          <span class="logo-text">NP</span>
        </div>
        <div class="logo-label hidden-sm">
          A BANCADA DE IMPACTO
        </div>
      </router-link>

      <!-- NAVIGATION -->
      <nav class="nav-desktop">
        <router-link to="/" class="nav-item">Movimento</router-link>
        <router-link to="/conteudo" class="nav-item">Artigos</router-link>
        <router-link to="/oportunidades" class="nav-item">Radar</router-link>
        <router-link to="/sobre" class="nav-item">Sobre</router-link>
        <router-link to="/contatos" class="nav-item nav-highlight">Envolva-se</router-link>
      </nav>

      <!-- ACTIONS -->
      <div class="header-actions">
        <button v-if="!isAuthenticated && siteContent.settings.showLogin" @click="openLogin" class="brutalist-button-mini">
          <span>Entrar</span>
        </button>
        
        <div v-else class="user-avatar-brutalist" @click="$router.push(loginRoute)">
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
            <router-link @click="closeMenu" to="/oportunidades">Radar</router-link>
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
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  height: 90px;
  display: flex;
  align-items: center;
  background: transparent;
  mix-blend-difference: difference;
  color: white;
  transition: all 0.3s ease;
}

.header-scrolled {
  height: 70px;
  background: var(--color-bg);
  mix-blend-difference: normal;
  color: var(--color-dark);
  border-bottom: 4px solid var(--color-dark);
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

/* LOGO BRUTALISTA */
.logo-group {
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
}

.logo-np-brutalist {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.8rem;
}

.logo-np-brutalist .shape {
  position: absolute;
  border-radius: 2px;
}

.s1 { top: -4px; left: -4px; width: 12px; height: 12px; background: var(--color-red); border-radius: 50% !important; }
.s2 { top: 4px; right: -12px; width: 16px; height: 12px; background: var(--color-pink); }
.s3 { bottom: -4px; right: -8px; width: 12px; height: 12px; background: var(--color-lime); }
.s4 { bottom: -8px; left: 4px; width: 12px; height: 20px; background: var(--color-yellow); }

.logo-label {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 4px;
}

.hidden-sm {
  display: block;
}

@media (max-width: 640px) {
  .hidden-sm { display: none; }
}

/* NAVIGATION */
.nav-desktop {
  display: flex;
  gap: 30px;
}

.nav-item {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: inherit;
  transition: color 0.2s;
}

.nav-item:hover {
  color: var(--color-yellow);
}

.nav-highlight {
  color: var(--color-pink);
}

/* ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brutalist-button-mini {
  background: var(--color-yellow);
  color: var(--color-dark);
  border: 3px solid var(--color-dark);
  padding: 6px 16px;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
}

.brutalist-button-mini:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--color-dark);
}

.user-avatar-brutalist {
  cursor: pointer;
}

.avatar-box {
  width: 40px;
  height: 40px;
  background: var(--color-lime);
  border: 3px solid var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: var(--color-dark);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-toggle-brutalist {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.menu-toggle-brutalist .bar {
  width: 30px;
  height: 4px;
  background: currentColor;
}

@media (max-width: 1024px) {
  .nav-desktop { display: none; }
  .menu-toggle-brutalist { display: flex; }
}

/* MOBILE MENU */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-dark);
  color: white;
  z-index: 3000;
  padding: 40px;
}

.close-menu {
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.nav-links-mobile {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
}

.nav-links-mobile a {
  font-family: var(--font-display);
  font-size: 2.5rem;
  text-decoration: none;
  color: white;
}

.nav-links-mobile a:hover {
  color: var(--color-yellow);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>