<script setup>
import { ref, onMounted, computed } from 'vue'
import { siteContent } from '../store/content'
import { Zap, Mail } from 'lucide-vue-next'

const config = computed(() => siteContent.newsletterArchiveConfig || {})
const newslettersList = computed(() => {
  if (siteContent.isLoading) return []
  const issues = siteContent.posts?.filter(p => p.type === 'Newsletter' || p.category === 'Newsletter') || []
  return issues.sort((a, b) => new Date(b.date) - new Date(a.date))
})

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="newsletter-archive-page bg-creme">
    <div class="container-max section-padding">
      
      <!-- HERO -->
      <header class="newsletter-hero text-center mb-16 pt-16 pb-16 relative">
        <div class="hero-decorative-blob-1"></div>
        <div class="hero-decorative-blob-2"></div>
        
        <span class="tag-solid bg-preto text-white rotate-neg-2 mx-auto">● O ACERVO ESTRATÉGICO</span>
        <h1 class="display-xl mt-8 mb-6 text-preto uppercase tracking-tighter text-center">
          {{ config.heroTitle1 || 'NEWSLETTER' }} <br/> 
          <span class="text-vermelho bg-amarelo px-4 py-1 paper-shadow-sm">{{ config.heroTitle2 || 'NARRATIVA' }}</span>
        </h1>
        <p class="body-lg mx-auto max-w-xl text-preto font-bold leading-relaxed text-center">
          {{ config.heroSubtitle || 'Uma curadoria de análises e convocações estratégicas para ampliar o repertório crítico de quem atua na transformação social.' }}
        </p>
      </header>

      <!-- SUBSCRIBE CARD (NATIVO PREMIUM) -->
      <section class="subscribe-section mb-20">
        <div class="nl-premium-card paper-shadow-lg">
          
          <!-- Lado Esquerdo: Identidade -->
          <div class="nl-brand-side">
             <div class="nl-texture-overlay"></div>
             <div class="nl-brand-content">
                <span class="tag-solid bg-vermelho text-white nl-exclusive-badge">EXCLUSIVO</span>
                <h2 class="display-xl nl-brand-title">NEWSLETTER <br><span class="text-amarelo">NARRATIVA</span></h2>
                <p class="body-lg nl-brand-desc">Sua dose semanal de inteligência política e impacto social.</p>
             </div>
             
             <div class="nl-meta">
                <div class="nl-meta-icon">
                   <span class="material-symbols-outlined">mail</span>
                </div>
                <span class="label-bold text-xs tracking-widest">+5.000 INSCRITOS</span>
             </div>
          </div>

          <!-- Lado Direito: Ação -->
          <div class="nl-action-side bg-amarelo">
             <div class="nl-action-inner w-full">
                <h3 class="headline-md nl-action-title text-preto">Receba as próximas edições</h3>
                <p class="body-md nl-action-desc text-preto font-bold">Cadastre-se para não perder nenhuma Newsletter Narrativa enviada diretamente para a nossa base via Substack.</p>
                
                <div class="nl-substack-action-container mt-8">
                   <a href="https://substack.com/@narrativapolitica" target="_blank" class="btn-brutal btn-preto w-full py-6 text-xl font-black uppercase flex items-center justify-center gap-4 hover-white-shadow shadow-brutal">
                      ASSINAR NO SUBSTACK <span class="material-symbols-outlined">rocket_launch</span>
                   </a>
                   <p class="nl-disclaimer mt-6 text-[10px] font-black uppercase text-preto opacity-40 text-center">Ao assinar, você será redirecionado para a plataforma oficial.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      <!-- GRID DE ARQUIVO -->
      <section class="archive-grid-section">
        <div class="section-header text-center mb-16">
          <h3 class="headline-md border-b-thick inline-block pb-4 uppercase m-0 text-center">EDIÇÕES ANTERIORES</h3>
        </div>

        <div v-if="newslettersList.length > 0" class="archive-grid">
          <router-link v-for="(ed, i) in newslettersList" :key="i" :to="'/conteudo/' + ed.id" class="card-editorial bg-white paper-shadow p-0 flex-col group">
            <div class="nl-img-wrapper halftone border-b-thick group-hover:filter-none">
              <img :src="ed.image || 'https://images.unsplash.com/photo-1585829365234-781fcdb4c8ef?w=800&h=600&fit=crop'" :alt="ed.title" loading="lazy" class="w-full h-full object-cover transition-all duration-300" />
              <div class="tag-solid bg-rosa text-white" style="position: absolute; top: 16px; left: 16px; z-index: 20;">
                <Mail :size="16" class="mr-2" style="display: inline;" /> {{ ed.category || 'NEWSLETTER' }}
              </div>
            </div>
            
            <div class="p-8 flex-col flex-grow bg-white">
              <div class="label-bold text-vermelho mb-4">{{ new Date(ed.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }}</div>
              <h3 class="headline-sm mb-6 group-hover-color-vermelho">{{ ed.title }}</h3>
              <p class="body-md text-variant flex-grow excerpt-clamp">{{ ed.excerpt || ed.subtitle }}</p>
              
              <div class="mt-6 pt-4 border-t-thick flex-between align-center label-bold hover-red">
                <span>LER EDIÇÃO</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>
        
        <div v-else class="card-editorial bg-white paper-shadow-sm p-12 mx-auto max-w-lg text-center" style="border: 2px dashed var(--np-black); margin-bottom: 80px;">
          <h3 class="headline-md mb-2 uppercase m-0 text-center">ARQUIVO VAZIO</h3>
          <p class="body-md text-variant text-center">{{ config.emptyState || 'Nenhuma edição encontrada no arquivo.' }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.newsletter-archive-page { min-height: 100vh; position: relative; background: var(--np-creme); }

.container-max { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
.section-padding { padding: 80px 0; }

/* HERO */
.newsletter-hero { position: relative; }
.rotate-neg-2 { transform: rotate(-2deg); display: block; width: fit-content; margin-bottom: 24px; }
.tracking-tighter { letter-spacing: -2px; }
.hero-decorative-blob-1 { position: absolute; top: 0; left: 10%; width: 100px; height: 100px; background: var(--np-rosa); opacity: 0.1; filter: blur(50px); z-index: 0; }
.hero-decorative-blob-2 { position: absolute; bottom: 0; right: 10%; width: 150px; height: 150px; background: var(--np-azul); opacity: 0.1; filter: blur(60px); z-index: 0; }

/* NEWSLETTER PREMIUM CARD - Globalized */

/* ARCHIVE GRID */
.archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 48px; }

.nl-img-wrapper { 
  height: 260px; 
  position: relative; 
  overflow: hidden; 
  background: var(--np-creme); 
  filter: grayscale(100%) contrast(1.2) brightness(0.9);
  mix-blend-mode: multiply;
  transition: all 0.3s ease;
}

.group:hover .nl-img-wrapper { filter: none; mix-blend-mode: normal; }

.group-hover-color-vermelho { transition: color 0.2s; }
.group:hover .group-hover-color-vermelho { color: var(--np-vermelho); }
.hover-red { transition: color 0.2s; }
.group:hover .hover-red { color: var(--np-vermelho); }

.excerpt-clamp { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.flex-between { display: flex; justify-content: space-between; align-items: center; }
.p-8 { padding: 32px; }
.flex-col { display: flex; flex-direction: column; }
.flex-grow { flex-grow: 1; }
.mt-6 { margin-top: 24px; }
.pt-4 { padding-top: 16px; }

.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }

@media (max-width: 1024px) {
  .nl-premium-card { flex-direction: column; min-height: auto; }
  .nl-brand-side { padding: 40px; min-height: auto; }
  .nl-action-side { padding: 40px; }
  .nl-meta { margin-top: 32px; }
}

@media (max-width: 768px) {
  .section-padding { padding: 60px 0; }
  .newsletter-hero { padding-top: 40px; padding-bottom: 40px; }
  .archive-grid { grid-template-columns: 1fr; gap: 32px; }
  .display-xl { font-size: 44px; }
  .headline-md { font-size: 28px; }
  .nl-brand-side, .nl-action-side { padding: 32px; }
}
</style>