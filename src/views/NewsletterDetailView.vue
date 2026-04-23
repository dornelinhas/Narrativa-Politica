<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { ChevronLeft, Calendar, Tag, Share2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const newsletter = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('id', route.params.id)
      .single()
    
    if (error) throw error
    newsletter.value = data
  } catch (e) {
    console.error('Erro ao carregar newsletter:', e)
    router.push('/arquivo-newsletter')
  } finally {
    isLoading.value = false
  }
})

const share = () => {
  if (navigator.share) {
    navigator.share({
      title: newsletter.value.titulo,
      url: window.location.href
    })
  }
}
</script>

<template>
  <div class="newsletter-detail-page grid-bg-light min-h-screen">
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="loader-brutal">CARREGANDO...</div>
    </div>

    <article v-else-if="newsletter" class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- VOLTAR -->
      <button @click="router.push('/arquivo-newsletter')" class="btn-back mb-8">
        <ChevronLeft :size="20" /> VOLTAR AO ARQUIVO
      </button>

      <!-- CABEÇALHO DA NEWSLETTER -->
      <header class="nl-header shadow-solid mb-12">
        <div class="nl-meta flex flex-wrap gap-4 mb-6">
          <span class="meta-item"><Calendar :size="16" /> {{ new Date(newsletter.enviado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }}</span>
          <span class="meta-item"><Tag :size="16" /> {{ newsletter.tag || 'Política' }}</span>
        </div>
        <h1 class="nl-title">{{ newsletter.titulo }}</h1>
        <p class="nl-subtitle">{{ newsletter.descricao }}</p>
      </header>

      <!-- IMAGEM DE CAPA -->
      <div v-if="newsletter.capa_url" class="nl-cover shadow-solid mb-12">
        <img :src="newsletter.capa_url" :alt="newsletter.titulo" />
      </div>

      <!-- CONTEÚDO HTML -->
      <div class="nl-content shadow-solid" v-html="newsletter.conteudo"></div>

      <!-- RODAPÉ DE AÇÃO -->
      <footer class="nl-footer mt-12 flex justify-between items-center">
        <button @click="share" class="btn-share">
          <Share2 :size="18" /> COMPARTILHAR EDIÇÃO
        </button>
        <div class="subscribe-mini shadow-solid">
          <span>Gostou? Assine para receber as próximas.</span>
          <button @click="router.push('/arquivo-newsletter')" class="btn-mini-sub">ASSINAR</button>
        </div>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.newsletter-detail-page { background: #f0ede8; color: #1C1C1C; font-family: 'Inter', sans-serif; padding-top: 120px; }
.grid-bg-light { background-image: linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px); background-size: 40px 40px; }

.container { margin-left: auto; margin-right: auto; }
.shadow-solid { background: #FFF; border: 3px solid #1C1C1C; box-shadow: 8px 8px 0px #1C1C1C; padding: 2.5rem; }

.btn-back { display: flex; align-items: center; gap: 8px; font-family: 'Archivo Black', sans-serif; font-size: 12px; background: #1C1C1C; color: #FFF; padding: 10px 20px; border: none; cursor: pointer; transition: 0.2s; }
.btn-back:hover { background: #FF6BCA; color: #1C1C1C; transform: translate(-2px, -2px); box-shadow: 4px 4px 0px #1C1C1C; }

.nl-meta { font-family: 'Archivo Black', sans-serif; font-size: 11px; text-transform: uppercase; }
.meta-item { display: flex; align-items: center; gap: 6px; background: #FFE65A; padding: 6px 12px; border: 2px solid #1C1C1C; }

.nl-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; letter-spacing: -2px; margin-bottom: 1rem; text-transform: uppercase; }
.nl-subtitle { font-size: 1.25rem; font-weight: 700; opacity: 0.8; line-height: 1.4; }

.nl-cover { padding: 0; overflow: hidden; }
.nl-cover img { width: 100%; height: auto; display: block; }

.nl-content :deep(p) { margin-bottom: 1.5rem; line-height: 1.6; font-size: 1.15rem; }
.nl-content :deep(h2) { font-family: 'Archivo Black', sans-serif; font-size: 2rem; margin: 2rem 0 1rem; text-transform: uppercase; border-bottom: 4px solid #FFE65A; display: inline-block; }
.nl-content :deep(blockquote) { border-left: 8px solid #FF6BCA; padding: 1.5rem 2rem; background: #f9f9f9; font-style: italic; margin: 2rem 0; font-size: 1.25rem; }
.nl-content :deep(img) { max-width: 100%; border: 3px solid #1C1C1C; margin: 2rem 0; box-shadow: 8px 8px 0px #1C1C1C; }

.btn-share { background: #3D78E0; color: #FFF; border: 3px solid #1C1C1C; padding: 12px 24px; font-family: 'Archivo Black', sans-serif; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px; }
.btn-share:hover { background: #FFE65A; color: #1C1C1C; transform: translate(-2px, -2px); box-shadow: 4px 4px 0px #1C1C1C; }

.subscribe-mini { padding: 1rem 1.5rem; display: flex; align-items: center; gap: 15px; font-weight: 800; font-size: 13px; }
.btn-mini-sub { background: #FF6BCA; border: 2px solid #1C1C1C; padding: 6px 12px; font-family: 'Archivo Black', sans-serif; font-size: 10px; cursor: pointer; }

.loader-brutal { font-family: 'Archivo Black', sans-serif; font-size: 2rem; animation: pulse 1s infinite alternate; }
@keyframes pulse { from { opacity: 0.5; } to { opacity: 1; } }

@media (max-width: 768px) {
  .nl-footer { flex-direction: column; gap: 2rem; align-items: flex-start; }
}
</style>