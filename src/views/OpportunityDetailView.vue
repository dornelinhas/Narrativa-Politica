<template>
  <div v-if="op" class="opportunity-detail-premium selection-custom">
    <!-- HEADER AREA -->
    <header class="op-header-premium bg-light border-b-dark">
      <div class="container-narrow pt-48 pb-20">
        <router-link to="/oportunidades" class="back-link-brutalist mb-12 inline-flex items-center gap-2">
          <ArrowLeft :size="16" /> VOLTAR AO PORTAL
        </router-link>
        
        <div class="header-meta mb-8">
          <span class="cat-tag-brutalist" :class="getTagColor(op.category)">{{ op.category }}</span>
          <span class="reading-time-brutalist">PRAZO: {{ op.deadline }}</span>
        </div>

        <h1 class="font-display text-4xl md-text-7xl leading-none tracking-tighter text-dark mb-10">
          {{ op.title }}
        </h1>
        
        <p class="font-sans text-xl md-text-2xl font-semibold opacity-70 leading-tight max-w-3xl">
          {{ op.description }}
        </p>
      </div>
    </header>

    <!-- CONTENT AREA -->
    <div class="op-main-wrapper bg-white">
      <div class="container-custom py-24">
        <div class="op-layout-grid">
          <!-- MAIN CONTENT -->
          <main class="op-main-content">
            <div class="rich-text-brutalist font-sans" v-html="op.fullDescription || op.description"></div>
            
            <div class="mt-16 pt-12 border-t-dark">
              <a :href="op.link" target="_blank" class="btn-apply-main">
                CANDIDATAR-SE AGORA <ExternalLink :size="20" />
              </a>
            </div>
          </main>

          <!-- SIDEBAR -->
          <aside class="op-sidebar">
            <div class="sidebar-card-brutalist bg-yellow mb-8">
              <h3 class="font-display text-2xl mb-6 uppercase tracking-tighter">Detalhes</h3>
              <div class="detail-item mb-4">
                <span class="detail-label">CATEGORIA</span>
                <span class="detail-value">{{ op.category }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">FECHAMENTO</span>
                <span class="detail-value">{{ op.deadline }}</span>
              </div>
            </div>

            <div class="sidebar-card-brutalist bg-dark text-white">
              <h3 class="font-display text-2xl mb-4 uppercase tracking-tighter">Compartilhe</h3>
              <div class="share-row flex gap-4">
                <button @click="copyLink" class="share-btn-square"><LinkIcon :size="20" /></button>
                <a :href="whatsappLink" target="_blank" class="share-btn-square"><MessageCircle :size="20" /></a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { ArrowLeft, ExternalLink, Link as LinkIcon, MessageCircle } from 'lucide-vue-next'

const route = useRoute()
const op = computed(() => siteContent.opportunities?.find(o => o.id === parseInt(route.params.id)))

const getTagColor = (cat) => {
  const map = {
    'Bolsas': 'bg-lime text-dark',
    'Vagas de Emprego': 'bg-pink text-white',
    'Chamada para Artigos': 'bg-blue text-white',
    'Editais': 'bg-yellow text-dark'
  }
  return map[cat] || 'bg-dark text-white'
}

const whatsappLink = computed(() => {
  const text = encodeURIComponent(`Oportunidade na Narrativa Política: ${op.value?.title} - ${window.location.href}`)
  return `https://api.whatsapp.com/send?text=${text}`
})

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('Link copiado!')
}
</script>

<style scoped>
.opportunity-detail-premium { background: #F7F7F5; }
.container-custom { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; }
.container-narrow { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
.bg-light { background-color: #F7F7F5; }
.text-dark { color: #1C1C1C; }
.border-b-dark { border-bottom: 6px solid #1C1C1C; }
.border-t-dark { border-top: 6px solid #1C1C1C; }

.back-link-brutalist { 
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem; 
  letter-spacing: 0.1em; text-decoration: none; color: #1C1C1C; opacity: 0.5;
  transition: opacity 0.2s;
}
.back-link-brutalist:hover { opacity: 1; color: #DF2028; }

.cat-tag-brutalist {
  padding: 0.5rem 1rem; border: 3px solid #1C1C1C;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem; text-transform: uppercase;
  margin-right: 1.5rem;
}
.reading-time-brutalist { font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem; opacity: 0.4; }

.op-layout-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 5rem;
}

.rich-text-brutalist { font-size: 1.25rem; line-height: 1.8; color: #1C1C1C; font-weight: 500; }
.rich-text-brutalist :deep(p) { margin-bottom: 2rem; }
.rich-text-brutalist :deep(h2) { font-family: "Archivo Black", sans-serif; font-size: 2rem; margin: 3rem 0 1.5rem; }

.btn-apply-main {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #DF2028;
  color: white;
  padding: 1.5rem 3rem;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  text-decoration: none;
  border: 4px solid #1C1C1C;
  transition: all 0.2s;
}
.btn-apply-main:hover { transform: translate(-8px, -8px); box-shadow: 12px 12px 0 #1C1C1C; }

.sidebar-card-brutalist { padding: 2.5rem; border: 4px solid #1C1C1C; }
.bg-yellow { background-color: #FFE65A; }
.bg-dark { background-color: #1C1C1C; }
.bg-lime { background-color: #A4CD39; }
.bg-pink { background-color: #FF6BCA; }
.bg-blue { background-color: #3D78E0; }

.detail-label { display: block; font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.65rem; opacity: 0.5; margin-bottom: 0.5rem; }
.detail-value { font-family: "Inter", sans-serif; font-weight: 900; font-size: 1.1rem; color: #1C1C1C; }

.share-btn-square {
  width: 50px; height: 50px; background: white; border: 3px solid #1C1C1C; color: #1C1C1C;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
}
.share-btn-square:hover { transform: translate(-4px, -4px); box-shadow: 4px 4px 0 #1C1C1C; background: #DF2028; color: white; }

@media (max-width: 1024px) {
  .op-layout-grid { grid-template-columns: 1fr; }
  .op-sidebar { order: -1; }
}
</style>