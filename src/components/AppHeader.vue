<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo-container">
        <div class="logo-np">
          <span class="np-text">NP</span>
          <div class="shape dot-red"></div>
          <div class="shape dot-blue"></div>
          <div class="shape rect-pink"></div>
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
  height: 100px;
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  height: 80px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
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
  gap: 15px;
  text-decoration: none;
}

.logo-np {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.np-text {
  color: var(--text-main);
  font-weight: 900;
  font-size: 1.6rem;
  z-index: 10;
}

.shape {
  position: absolute;
  z-index: 5;
  opacity: 0.8;
}

.dot-red { width: 18px; height: 18px; background: var(--color-red); border-radius: 50%; top: 0; left: 5px; }
.dot-blue { width: 12px; height: 12px; background: var(--color-blue); border-radius: 50%; bottom: 5px; right: 5px; }
.rect-pink { width: 20px; height: 8px; background: var(--color-pink); top: 5px; right: 0; }

.brand-text { display: flex; flex-direction: column; line-height: 1; }
.main-name { font-weight: 800; font-size: 1.4rem; color: var(--text-main); }
.sub-name { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 4px; color: var(--color-pink); font-weight: 700; }

.nav { display: flex; gap: 30px; }

.nav-link {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-main);
  opacity: 0.6;
  position: relative;
  text-decoration: none;
  transition: var(--transition);
}

.nav-link:hover, .router-link-active {
  opacity: 1;
  color: var(--color-blue);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-blue);
  transition: var(--transition);
}

.nav-link:hover::after, .router-link-active::after { width: 100%; }

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.bar { width: 25px; height: 3px; background: var(--text-main); border-radius: 2px; }

@media (max-width: 992px) {
  .mobile-toggle { display: flex; }
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 30px;
    gap: 20px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: var(--transition);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .nav-active { transform: translateY(0); opacity: 1; pointer-events: all; }
}
</style>
