<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Zap, Database, Users, Briefcase, Mail, ArrowRight } from 'lucide-vue-next'

import { siteContent } from '../store/content'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import * as icons from 'lucide-vue-next'

const mockServices = [
  { id: 's1', title: 'ESTRATÉGIA POLÍTICA', description: 'Consultoria para mandatos, campanhas e lideranças que buscam pautar a opinião pública.', icon: 'Zap' },
  { id: 's2', title: 'ANÁLISE DE DADOS', description: 'Transformamos números em narrativas poderosas para embasamento de políticas públicas.', icon: 'Database' },
  { id: 's3', title: 'MOBILIZAÇÃO SOCIAL', description: 'Metodologias para engajar comunidades e criar redes de apoio orgânicas.', icon: 'Users' },
  { id: 's4', title: 'COMUNICAÇÃO DE CAUSA', description: 'Campanhas de advocacy que movem estruturas e geram pressão institucional.', icon: 'Briefcase' }
]

const services = computed(() => {
  if (siteContent.isLoading) return []
  return siteContent.services?.length ? siteContent.services : mockServices
})
const config = computed(() => siteContent.servicesConfig || {})

const resolveIcon = (iconName) => {
  return icons[iconName] || icons.Zap
}

const email = ref('')
const subscribeStatus = ref(null)

const handleSubscribe = () => {
  if (email.value) {
    subscribeStatus.value = 'success'
    email.value = ''
    setTimeout(() => { subscribeStatus.value = null }, 3000)
  }
}

const getBgClass = (index) => {
  const classes = ['bg-amarelo', 'bg-rosa', 'bg-azul', 'bg-verde']
  return classes[index % classes.length]
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="services-hub-page bg-creme">
    <div class="container-max section-padding">
      
      <!-- CABEÇALHO EDITORIAL -->
      <header class="page-hero-np text-center border-b-thick mb-16 pt-12 pb-16">
        <h1 class="display-xl text-preto uppercase">
          {{ config.pageTitle1 || 'NOSSOS EIXOS' }} <br/> <span class="text-vermelho">{{ config.pageTitle2 || 'DE AÇÃO' }}</span>
        </h1>
        <div class="title-underline bg-amarelo mx-auto mt-6"></div>
      </header>

      <!-- GRID DE CARDS -->
      <main class="grid-container p-0">
        <div class="grid-2 gap-12 mx-auto max-w-xl">
          
          <div v-for="(service, index) in services" :key="service.id" 
            class="card-editorial paper-shadow p-12 flex-col fade-in-up border-thick"
            :class="getBgClass(index)"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="card-header flex-between items-start mb-6">
              <h2 class="display-sm text-preto max-w-sm m-0 uppercase leading-none">{{ service.title }}</h2>
              <div class="icon-box bg-white flex justify-center items-center paper-shadow-sm border-thick p-2">
                <component :is="resolveIcon(service.icon)" :size="32" stroke-width="2" class="text-preto" />
              </div>
            </div>
            
            <p class="body-lg text-preto mb-12 flex-grow font-bold opacity-80">
              {{ service.description }}
            </p>

            <div class="card-action mt-auto border-t-thick pt-6">
              <router-link to="/contatos" class="label-bold uppercase text-preto flex-between items-center hover-red">
                {{ config.cardButton || 'SOLICITAR CONSULTORIA' }} <span class="material-symbols-outlined">arrow_forward</span>
              </router-link>
            </div>
          </div>

          <!-- DEMANDAS SOB MEDIDA -->
          <div class="card-editorial bg-white paper-shadow-lg p-12 fade-in-up mt-12 cta-card-horizontal border-thick" style="animation-delay: 0.6s; border-style: dashed !important;">
            <div class="grid-2 items-center gap-16">
              <div>
                <h2 class="display-sm text-preto mb-4 m-0 uppercase">{{ config.ctaTitle || 'DEMANDAS SOB MEDIDA?' }}</h2>
                <p class="body-lg text-variant font-bold">
                  {{ config.ctaDesc || 'Construímos tecnologias sociais e estratégias de articulação específicas para a realidade do seu território ou instituição.' }}
                </p>
              </div>
              <div class="text-center">
                <router-link to="/contatos" class="btn-brutal btn-preto paper-shadow-sm p-6 w-full justify-center text-center text-lg hover-amarelo-shadow">
                  {{ config.ctaButton || 'FALAR COM UM ESPECIALISTA' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- NEWSLETTER DE IMPACTO -->
        <section class="newsletter-section mt-32 pt-16 border-t-thick fade-in-up" style="animation-delay: 0.8s">
          <div class="nl-premium-card paper-shadow-lg border-thick">
             <!-- Lado Identidade -->
             <div class="nl-brand-side bg-preto text-white">
                <div class="nl-texture-overlay"></div>
                <div class="nl-brand-content">
                   <span class="tag-solid bg-rosa text-white nl-exclusive-badge">REDE DE MOBILIZAÇÃO</span>
                   <h2 class="display-xl nl-brand-title" v-html="sanitizeHtml(config.newsletterTitle || 'NEWSLETTER <br /> NARRATIVA')"></h2>
                   <p class="body-lg nl-brand-desc opacity-90">
                     {{ config.newsletterDesc || 'Receba inteligência política, convocações de ação e a Newsletter Narrativa semanalmente.' }}
                   </p>
                </div>
             </div>
             
             <!-- Lado Ação -->
             <div class="nl-action-side bg-amarelo">
                <div class="nl-action-inner w-full">
                   <h3 class="headline-md nl-action-title text-preto">Faça parte do movimento</h3>
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
      </main>
    </div>
  </div>
</template>

<style scoped>
/* UTILS */
.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }
.border-thick { border: var(--border-thick); }
.border-t-thick { border-top: var(--border-thick); }
.border-b-thick { border-bottom: var(--border-thick); }

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-12 { margin-top: 48px; }
.mt-20 { margin-top: 80px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-12 { margin-bottom: 48px; }
.mb-16 { margin-bottom: 64px; }
.pt-6 { padding-top: 24px; }
.pt-12 { padding-top: 48px; }
.pt-16 { padding-top: 64px; }
.pb-16 { padding-bottom: 64px; }

.p-0 { padding: 0 !important; }
.p-2 { padding: 8px; }
.p-4 { padding: 16px; }
.p-8 { padding: 32px; }
.p-12 { padding: 48px; }

.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-sm { max-width: 320px; }
.max-w-md { max-width: 480px; }
.max-w-xl { max-width: 1000px; }
.w-full { width: 100%; }
.gap-0 { gap: 0; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-12 { gap: 48px; }
.gap-16 { gap: 64px; }
.flex-col { display: flex; flex-direction: column; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex { display: flex; }
.align-center { align-items: center; }
.justify-center { justify-content: center; }
.items-start { align-items: flex-start; }
.text-center { text-align: center; }
.flex-grow { flex-grow: 1; }
.mt-auto { margin-top: auto; }
.m-0 { margin: 0; }
.uppercase { text-transform: uppercase; }
.leading-tight { line-height: 1.1; }
.opacity-90 { opacity: 0.9; }
.overflow-hidden { overflow: hidden; }

.display-sm { font-family: var(--font-display); font-size: 32px; line-height: 1.1; font-weight: 700; }
.text-lg { font-size: 16px; }

/* SERVICES HUB */
.services-hub-page { min-height: 100vh; position: relative; }
.title-underline { width: 100px; height: 8px; }

/* CARDS */
.icon-box { width: 80px; height: 80px; border-radius: 50%; }

.hover-red { transition: color 0.2s; }
.hover-red:hover { color: var(--np-vermelho); }

.cta-card-horizontal { grid-column: 1 / -1; }

.contact-input { 
  background: var(--surface-dim); border: var(--border-thick); 
  padding: 16px; outline: none; transition: 0.2s; 
  font-family: var(--font-sans); color: var(--text-main);
  text-transform: uppercase; font-weight: 700;
}
.contact-input:focus { background: var(--np-white); border-color: var(--np-rosa); }

.border-right-dark-desktop { border-right: var(--border-thick); }

/* MICRO-ANIMAÇÕES */
.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* NEWSLETTER PREMIUM CARD - Globalized */

@media (max-width: 1024px) {
  .grid-2 { grid-template-columns: 1fr; }
  .border-right-dark-desktop { border-right: none; }
  .border-bottom-dark-mobile { border-bottom: var(--border-thick); }
  .p-12 { padding: 32px; }
  .gap-16 { gap: 32px; }
  .nl-premium-card { flex-direction: column; min-height: auto; }
}

</style>
