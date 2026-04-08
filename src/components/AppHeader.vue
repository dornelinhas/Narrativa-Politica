<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo-container">
        <div class="logo-np">
          <span class="np-text">NP</span>
          <!-- Formas geométricas idênticas à imagem -->
          <div class="shape dot-red"></div>
          <div class="shape dot-green"></div>
          <div class="shape rect-pink"></div>
          <div class="shape rect-yellow"></div>
          <div class="shape rect-green-light"></div>
          <div class="shape dot-blue"></div>
        </div>
        <div class="brand-text">
          <span class="main-name">Narrativa</span>
          <span class="sub-name">Política</span>
        </div>
      </router-link>

      <nav class="nav" :class="{ 'nav-active': isMobileMenuOpen }">
        <router-link @click="closeMenu" to="/" class="nav-link">Home</router-link>
        <router-link @click="closeMenu" to="/artigos" class="nav-link">Artigos</router-link>
        <router-link @click="closeMenu" to="/oportunidades" class="nav-link">Oportunidades</router-link>
        <router-link @click="closeMenu" to="/trilhas" class="nav-link">Trilhas</router-link>
        <router-link @click="closeMenu" to="/mentoria" class="nav-link">Mentoria</router-link>
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
  isScrolled.value = window.scrollY > 20
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
  height: 90px;
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
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  height: 80px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

/* Logo NP inspirado na imagem */
.logo-np {
  position: relative;
  width: 56px;
  height: 56px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.np-text {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.8rem;
  z-index: 10;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Criando o efeito NP com fundo "transparente" (as letras parecem buracos mas são brancas) */
/* Aqui usaremos a cor branca sólida como na logo original da imagem */
.np-text {
  color: white;
  -webkit-text-stroke: 1px rgba(0,0,0,0.05);
}

.shape {
  position: absolute;
  z-index: 5;
}

.dot-red {
  width: 22px;
  height: 22px;
  background: var(--color-red);
  border-radius: 50%;
  top: -2px;
  left: 8px;
}

.dot-green {
  width: 12px;
  height: 12px;
  background: #C4D38D; /* Verde musgo claro como na imagem */
  border-radius: 50%;
  top: 10px;
  left: 28px;
}

.rect-pink {
  width: 28px;
  height: 14px;
  background: var(--color-pink);
  top: 4px;
  right: -2px;
}

.rect-yellow {
  width: 14px;
  height: 28px;
  background: var(--color-yellow);
  bottom: -2px;
  left: 12px;
}

.rect-green-light {
  width: 16px;
  height: 16px;
  background: #C4D38D;
  bottom: 8px;
  right: 6px;
}

.dot-blue {
  width: 8px;
  height: 8px;
  background: #4481EB;
  bottom: 0px;
  right: 18px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.main-name {
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--text-dark);
}

.sub-name {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: var(--color-pink);
  font-weight: 700;
  margin-top: 2px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-dark);
  opacity: 0.6;
  position: relative;
}

.nav-link:hover, .router-link-active {
  opacity: 1;
  color: var(--color-pink);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--grad-main);
  transition: var(--transition);
}

.nav-link:hover::after, .router-link-active::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.bar {
  width: 28px;
  height: 3px;
  background-color: var(--text-dark);
  border-radius: 4px;
}

@media (max-width: 992px) {
  .nav {
    display: none; /* Simplificando mobile */
  }
}
</style>
