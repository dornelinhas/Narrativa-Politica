<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <span class="logo-text">Narrativa</span>
        <span class="logo-subtext">Política</span>
      </router-link>

      <nav class="nav" :class="{ 'nav-active': isMobileMenuOpen }">
        <router-link @click="closeMenu" to="/" class="nav-link">Home</router-link>
        <router-link @click="closeMenu" to="/artigos" class="nav-link">Artigos</router-link>
        <router-link @click="closeMenu" to="/oportunidades" class="nav-link">Oportunidades</router-link>
        <router-link @click="closeMenu" to="/trilhas" class="nav-link">Trilhas</router-link>
        <router-link @click="closeMenu" to="/projetos" class="nav-link">Projetos</router-link>
        <router-link @click="closeMenu" to="/mentoria" class="nav-link">Mentoria</router-link>
        <router-link @click="closeMenu" to="/sobre" class="nav-link">Sobre</router-link>
      </nav>

      <div class="mobile-toggle" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
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
  height: var(--header-height);
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: var(--transition);
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  height: 70px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-text {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.logo-subtext {
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-gold);
  transition: var(--transition);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 2px;
  background-color: var(--text-main);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    transform: translateY(-150%);
    transition: var(--transition);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  }

  .nav-active {
    transform: translateY(0);
  }
}
</style>
