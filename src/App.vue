<template>
  <div class="app-layout">
    <!-- BARRA DE PROGRESSO DE LEITURA -->
    <div v-if="showReadingProgress" class="reading-progress-container">
      <div class="reading-progress-bar" :style="{ width: scrollPercent + '%' }"></div>
    </div>
    
    <!-- TELA DE CARREGAMENTO GLOBAL -->
    <transition name="fade-slow">
      <div v-if="isLoading" class="editorial-loader">
        <div class="loader-content">
          <div class="loader-logo">
            <span>NP</span>
          </div>
          <h2 class="loading-text">{{ loadingMessage }}</h2>
          
          <div v-if="hasError" class="error-state fade-in">
            <p class="text-xs font-black text-vermelho mb-6 uppercase tracking-widest">Falha na conexão com o banco de dados</p>
            <button @click="retryLoading" class="btn-brutal bg-white px-8 py-3 text-xs text-preto">Tentar Novamente</button>
          </div>
          <div v-else class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    </transition>

    <AppHeader v-if="!$route?.path?.startsWith('/admin') && !$route?.meta?.hideHeader" />
    
    <main class="main-content" :class="{ 'content-loading': isLoading }">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter v-if="!$route?.path?.startsWith('/admin') && !$route?.meta?.hideHeader" />
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
const hasError = ref(false)
const loadingMessage = ref('Carregando inteligência...')
const scrollPercent = ref(0)

const showReadingProgress = computed(() => {
  const routes = ['content-detail', 'newsletter-detail', 'lesson']
  return routes.includes(route.name)
})

const handleScroll = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const percent = (scrollTop / (documentHeight - windowHeight)) * 100
  scrollPercent.value = Math.min(100, Math.max(0, percent))
}

const retryLoading = () => {
  hasError.value = false
  initApp()
}

const initApp = async () => {
  const hasCache = !!localStorage.getItem('np_content_v6')
  
  // Se já temos cache, não precisamos bloquear a interface
  if (hasCache) {
    isLoading.value = false
  } else {
    isLoading.value = true
    loadingMessage.value = 'Iniciando plataforma...'
  }
  
  const safetyTimer = setTimeout(() => {
    if (isLoading.value && !hasError.value) {
      console.warn('Timeout de segurança. Liberando interface.')
      isLoading.value = false
    }
  }, 10000)

  try {
    applySettings()
    
    if (!hasCache) {
      loadingMessage.value = 'Buscando dados estratégicos...'
    }

    const result = await fetchAllContent()
    
    if (!result.success && !hasCache) {
      console.error('Falha no carregamento inicial:', result.error)
      hasError.value = true
      loadingMessage.value = 'Erro ao conectar'
    }
  } catch (e) {
    console.error('Erro fatal no init:', e)
    if (!hasCache) {
      hasError.value = true
      loadingMessage.value = 'Erro ao conectar'
    }
  } finally {
    clearTimeout(safetyTimer)
    // Se ainda estivermos em modo loading (novo usuário), libera agora
    if (isLoading.value && !hasError.value) {
      isLoading.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initApp()
})

// Lógica de SEO e Meta Tags Dinâmicas
watch(() => route.path, () => {
  const settings = siteContent.settings || {}
  const siteName = settings.siteName || 'Narrativa Politica'
  
  document.title = siteName

  const updateMeta = (name, content, isProperty = false) => {
    let el = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      if (isProperty) el.setAttribute('property', name)
      else el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  const description = settings.seoDescription || 'Plataforma de formação política e cidadania ativa.'
  const image = settings.siteLogo || '/favicon.svg'

  updateMeta('description', description)
  updateMeta('og:title', document.title, true)
  updateMeta('og:description', description, true)
  updateMeta('og:image', image, true)
  updateMeta('og:url', window.location.href, true)
  updateMeta('twitter:card', 'summary_large_image')
}, { immediate: true })

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
/* PAGE TRANSITIONS */
.page-fade-enter-active, .page-fade-leave-active { transition: opacity 0.25s ease; }
.page-fade-enter-from, .page-fade-leave-to { opacity: 0; }

/* LOADER — EDITORIAL */
.editorial-loader {
  position: fixed; inset: 0; background: var(--np-black, #000);
  z-index: 100000; display: flex; align-items: center; justify-content: center;
}
.loader-content { text-align: center; display: flex; flex-direction: column; align-items: center; }
.loader-logo {
  position: relative; width: 72px; height: 72px;
  background: var(--np-black, #000);
  border: 2px solid var(--np-white, #fff);
  display: flex; align-items: center; justify-content: center;
  font-family: "Barlow Condensed", sans-serif; font-weight: 800;
  font-size: 1.8rem; color: #FFF; margin-bottom: 28px;
  animation: float-pulse 2s infinite;
}
.loading-text {
  font-family: "DM Sans", sans-serif; color: rgba(255,255,255,0.5);
  font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em;
  margin-bottom: 20px; animation: blink 1.5s infinite;
  text-transform: uppercase;
}
.progress-bar { width: 200px; height: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
.progress-fill { height: 100%; background: var(--np-vermelho, #D22828); width: 0%; animation: load-fill 0.8s ease-out forwards; }
@keyframes load-fill { 0%{width:0%} 100%{width:100%} }
@keyframes float-pulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.5} }
.fade-slow-enter-active, .fade-slow-leave-active { transition: opacity 0.6s ease; }
.fade-slow-enter-from, .fade-slow-leave-to { opacity: 0; }

/* APP STRUCTURE */
#app { width: 100%; min-height: 100vh; }
.app-layout { display: flex; flex-direction: column; min-height: 100vh; position: relative; }
.main-content { flex: 1; position: relative; z-index: 1; }

/* READING PROGRESS */
.reading-progress-container { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 10001; background: transparent; }
.reading-progress-bar { height: 100%; background: linear-gradient(90deg, var(--np-vermelho, #D22828), var(--np-rosa, #FF3C82)); transition: width 0.1s ease-out; }
</style>
