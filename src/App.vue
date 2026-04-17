<template>
  <div class="app-layout">
    <AppHeader v-if="!$route?.meta?.hideHeader" />
    <main class="main-content">
      <!-- Se o roteador falhar, este fallback ajudará a diagnosticar -->
      <router-view v-if="$route" />
      <div v-else style="padding: 50px; text-align: center; color: #333;">
        <h1>Carregando ecossistema...</h1>
        <p>Se esta mensagem persistir, há um problema com o carregamento das rotas.</p>
      </div>
    </main>
    <AppFooter v-if="!$route?.meta?.hideHeader" />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { applySettings } from './store/settings'
import { fetchAllContent, siteContent } from './store/content'

onMounted(async () => {
  console.log('App Mounted - Starting data fetch')
  try {
    applySettings()
    await fetchAllContent()
  } catch (e) {
    console.error('Erro na montagem inicial:', e)
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
/* Garantir que o app ocupe a tela */
#app {
  min-height: 100vh;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
