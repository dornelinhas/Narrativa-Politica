<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <div class="logo-box">
          <span class="logo-letters">NP</span>
          <div class="logo-shape dot-red"></div>
          <div class="logo-shape rect-pink"></div>
          <div class="logo-shape square-yellow"></div>
        </div>
        <div class="logo-text-group">
          <span class="logo-text">Narrativa</span>
          <span class="logo-subtext">Política</span>
        </div>
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
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.logo-box {
  position: relative;
  width: 50px;
  height: 50px;
  background: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
}

.logo-letters {
  color: white;
  font-weight: 900;
  font-size: 1.4rem;
  z-index: 2;
  font-family: var(--font-sans);
}

.logo-shape {
  position: absolute;
  z-index: 1;
}

.dot-red {
  width: 15px;
  height: 15px;
  background: var(--accent-red);
  border-radius: 50%;
  top: 5px;
  left: 5px;
}

.rect-pink {
  width: 20px;
  height: 10px;
  background: var(--accent-pink);
  top: 5px;
  right: -5px;
}

.square-yellow {
  width: 15px;
  height: 15px;
  background: var(--accent-yellow);
  bottom: 5px;
  left: 10px;
}

.logo-text-group {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1;
}

.logo-subtext {
  font-size: 0.65rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-pink);
  font-weight: 800;
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
