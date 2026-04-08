<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo-group">
        <div class="logo-icon">
          <span class="logo-np">NP</span>
          <div class="decoration dot-red"></div>
          <div class="decoration dot-blue"></div>
        </div>
        <div class="logo-text">
          <span class="name-top">Narrativa</span>
          <span class="name-bottom">Política</span>
        </div>
      </router-link>

      <nav class="nav-desktop">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/artigos" class="nav-item">Artigos</router-link>
        <router-link to="/oportunidades" class="nav-item">Oportunidades</router-link>
        <router-link to="/trilhas" class="nav-item">Trilhas</router-link>
        <router-link to="/mentoria" class="nav-item btn-cta">Mentoria</router-link>
      </nav>

      <button class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="nav-mobile-overlay">
        <nav class="nav-mobile">
          <router-link @click="closeMenu" to="/">Home</router-link>
          <router-link @click="closeMenu" to="/artigos">Artigos</router-link>
          <router-link @click="closeMenu" to="/oportunidades">Oportunidades</router-link>
          <router-link @click="closeMenu" to="/trilhas">Trilhas</router-link>
          <router-link @click="closeMenu" to="/mentoria">Mentoria</router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1000;
  transition: var(--transition);
  display: flex;
  align-items: center;
}

.header-scrolled {
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0,0,0,0.05);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.logo-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-np {
  font-weight: 900;
  font-size: 1.4rem;
  color: var(--text-main);
  z-index: 2;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
}

.dot-red {
  width: 20px;
  height: 20px;
  background: var(--color-red);
  top: 0;
  left: 0;
}

.dot-blue {
  width: 15px;
  height: 15px;
  background: var(--color-blue);
  bottom: 5px;
  right: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.name-top {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--text-main);
}

.name-bottom {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: var(--color-pink);
  font-weight: 700;
  margin-top: 2px;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 35px;
}

.nav-item {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-main);
  position: relative;
  transition: var(--transition);
}

.nav-item:hover {
  color: var(--color-blue);
}

.btn-cta {
  background: var(--color-blue);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.btn-cta:hover {
  background: var(--text-main);
  color: white;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.menu-toggle span {
  width: 30px;
  height: 2px;
  background: var(--text-main);
}

@media (max-width: 992px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: flex; }
}

.nav-mobile-overlay {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-mobile {
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
}

.nav-mobile a {
  font-size: 2rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--text-main);
}
</style>
</style>
