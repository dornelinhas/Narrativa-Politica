<template>
  <div class="app-layout">
    <!-- TEXTURA DE GRÃO DE FILME (GLOBAL) -->
    <div class="film-grain-overlay"></div>

    <!-- BARRA DE PROGRESSO DE LEITURA (TOP) -->
    <div v-if="showReadingProgress" class="reading-progress-container">
      <div class="reading-progress-bar" :style="{ width: scrollPercent + '%' }"></div>
    </div>
    
    <!-- TELA DE CARREGAMENTO EDITORIAL -->
    <transition name="fade-slow">
      <div v-if="isLoading" class="editorial-loader">
        <div class="loader-content">
          <div class="logo-np-brutalist loader-logo">
            <div class="shape s1"></div>
            <div class="shape s2"></div>
            <div class="shape s3"></div>
            <div class="shape s4"></div>
            <div class="shape s5"></div>
            <span class="logo-text text-white">NP</span>
          </div>
          <h2 class="loading-text">CARREGANDO DADOS ESTRATÉGICOS...</h2>
          <div class="progress-bar-brutal"><div class="progress-fill"></div></div>
        </div>
      </div>
    </transition>

    <AppHeader v-if="!$route?.meta?.hideHeader" />
    
    <main class="main-content">
      <!-- TRANSIÇÃO SUAVE E RÁPIDA ENTRE PÁGINAS -->
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter v-if="!$route?.meta?.hideHeader" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { siteContent, fetchAllContent } from './store/content'
import { applySettings } from './store/settings'

const route = useRoute()
const isLoading = ref(true)
const scrollPercent = ref(0)

// Só mostra a barra de progresso em páginas de conteúdo
const showReadingProgress = computed(() => {
  const routes = ['article-detail', 'newsletter-detail', 'lesson-view']
  return routes.includes(route.name)
})

const handleScroll = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const percent = (scrollTop / (documentHeight - windowHeight)) * 100
  scrollPercent.value = Math.min(100, Math.max(0, percent))
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  // ... resto do onMounted
  console.log('App Mounted - Starting data fetch')
  try {
    applySettings()
    await fetchAllContent()
  } catch (e) {
    console.error('Erro na montagem inicial:', e)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 800) // Tempo reduzido para ser mais rápido
  }
})

// Atualiza o título e o ícone da aba automaticamente
watch(() => siteContent.settings.siteName, (newName) => {
  if (newName) document.title = newName
}, { immediate: true })

watch(() => siteContent.settings.siteLogo, (newLogo) => {
  if (newLogo) {
    const favicon = document.getElementById('favicon-link')
    if (favicon) favicon.href = newLogo
  }
}, { immediate: true })
</script>

<style>
/* TRANSIÇÕES DE PÁGINA SUAVES (Page Fade) */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* TELA DE CARREGAMENTO EDITORIAL */
.editorial-loader {
  position: fixed;
  inset: 0;
  background: #1C1C1C;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader-logo {
  transform: scale(2);
  margin-bottom: 60px;
  animation: float-pulse 2s infinite;
}

.loading-text {
  font-family: "Archivo Black", sans-serif;
  color: #FFFFFF;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  margin-bottom: 30px;
  animation: blink 1.5s infinite;
}

.progress-bar-brutal {
  width: 300px;
  height: 8px;
  background: rgba(255,255,255,0.1);
  border: 2px solid #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #FF6BCA; /* Magenta */
  width: 0%;
  animation: load-fill 0.8s ease-out forwards;
}

@keyframes load-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes float-pulse {
  0%, 100% { transform: scale(2) translateY(0); }
  50% { transform: scale(2) translateY(-10px); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.6s ease;
}
.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

/* ESTRUTURA BASE DO APP */
#app {
  width: 100%;
  min-height: 100vh;
}
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* OVERLAY DE GRÃO DE FILME */
.film-grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  pointer-events: none;
  opacity: 0.05;
  background-image: url('https://grainy-gradients.vercel.app/noise.svg');
  background-repeat: repeat;
}

/* BARRA DE PROGRESSO DE LEITURA */
.reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  z-index: 1001;
  background: transparent;
}
.reading-progress-bar {
  height: 100%;
  background: #FF6BCA;
  transition: width 0.1s ease-out;
  border-right: 2px solid #1C1C1C;
}
.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
  /* padding-top: 90px; REMOVIDO PARA PERMITIR TRANSPARÊNCIA REAL NO TOPO */
}
</style>