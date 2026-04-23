<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Zap, Database, Users, Briefcase, Mail, ArrowRight } from 'lucide-vue-next'

import { siteContent } from '../store/content'
import * as icons from 'lucide-vue-next'

const services = computed(() => siteContent.services || [])
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

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="services-hub-page">
    <!-- BACKGROUND LAYERS -->
    <div class="sandy-texture-layer"></div>
    <div class="page-background-dots"></div>

    <div class="content-wrapper">
      
      <!-- 1. CABEÇALHO E TÍTULO -->
      <header class="page-header fade-in-up">
        <h1 class="main-title">
          {{ config.pageTitle1 || 'NOSSOS EIXOS' }} <br/> <span class="outline-text">{{ config.pageTitle2 || 'DE AÇÃO' }}</span>
        </h1>
        <div class="title-underline"></div>
      </header>

      <!-- 3. GRID DE CARDS (SIMETRIA E MARGENS) -->
      <main class="grid-container">
        <div class="services-grid">
          
          <!-- CARDS 2x2 -->
          <div v-for="(service, index) in services" :key="service.id" 
            class="service-card fade-in-up"
            :style="{ backgroundColor: service.bg, animationDelay: `${index * 0.15}s` }"
          >
            <div class="card-header">
              <h2 class="axis-title-display" :style="{ color: service.textColor }">
                {{ service.title }}
              </h2>
              <div class="icon-box" :style="{ borderColor: service.textColor }">
                <component :is="resolveIcon(service.icon)" :size="40" stroke-width="1.5" class="hand-drawn-icon" :style="{ color: service.textColor }" />
              </div>
            </div>
            
            <p class="axis-desc-sans" :style="{ color: service.textColor }">
              {{ service.description }}
            </p>

            <div class="card-action">
              <router-link to="/contatos" class="pill-button-action">
                {{ config.cardButton || 'SOLICITAR CONSULTORIA' }}
              </router-link>
            </div>
          </div>

          <!-- 5. QUINTA SEÇÃO: DEMANDAS SOB MEDIDA (FULL WIDTH) -->
          <div class="cta-card-horizontal fade-in-up" style="animation-delay: 0.6s">
            <div class="cta-inner">
              <div class="cta-text">
                <h2 class="demandas-title">{{ config.ctaTitle || 'DEMANDAS SOB MEDIDA?' }}</h2>
                <p class="demandas-desc">
                  {{ config.ctaDesc || 'Construímos tecnologias sociais e estratégias de articulação específicas para a realidade do seu território ou instituição.' }}
                </p>
              </div>
              <div class="cta-button">
                <router-link to="/contatos" class="pill-button-action big-pill">
                  {{ config.ctaButton || 'FALAR COM ESPECIALISTA' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. NEWSLETTER DE IMPACTO (ESTILO HOME: AMARELO, VERMELHO E BRANCO) -->
        <section class="newsletter-section-home fade-in-up" style="animation-delay: 0.8s">
          <div class="newsletter-container-brutalist">
            <div class="newsletter-text">
              <div class="inline-flex-center gap-2 mb-4">
                 <Zap class="text-red-icon" />
                 <span class="eyebrow-news">{{ config.newsletterEyebrow || 'Rede de Mobilização' }}</span>
              </div>
              <h2 class="newsletter-title-home" v-html="config.newsletterTitle || 'Junte-se ao <br /> Movimento.'"></h2>
              <p class="newsletter-desc-home">
                {{ config.newsletterDesc || 'Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.' }}
              </p>
            </div>
            
            <div class="newsletter-form-container">
              <form @submit.prevent="handleSubscribe" class="newsletter-form-brutalist">
                 <div v-if="subscribeStatus === 'success'" class="success-banner">
                   Você agora receberá nossas atualizações!
                 </div>
                 <input 
                   type="email" 
                   v-model="email"
                   required
                   placeholder="Digite seu email..." 
                   class="nl-input-brutalist"
                 />
                 <button type="submit" class="btn-red-brutalist">{{ config.newsletterBtn || 'QUERO FAZER PARTE' }}</button>
              </form>
            </div>
          </div>
        </section>
      </main>

    </div>
  </div>
</template>

<style scoped>
/* ESTRUTURA BASE */
.services-hub-page {
  min-height: 100vh;
  background-color: #F5F2E9; /* CREME QUENTE */
  position: relative;
  overflow-x: hidden;
  width: 100%;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  padding-top: 192px;
  padding-bottom: 128px;
}

/* TEXTURA AREINOSA (INTENSIFICADA) */
.sandy-texture-layer {
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05; /* Mais visível */
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: multiply;
}

.page-background-dots {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(#1C1C1C 1.5px, transparent 1.5px);
  background-size: 45px 45px;
  opacity: 0.1;
  z-index: 1;
  pointer-events: none;
}

/* CABEÇALHO EDITORIAL */
.page-header {
  text-align: center;
  margin-bottom: 140px;
  padding: 0 32px;
}

.main-title {
  font-family: var(--font-display, "Archivo Black", sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 8vw, 6.5rem);
  color: #1C1C1C;
  line-height: 1.0;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  margin: 0;
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 2px #1C1C1C;
}

.title-underline {
  width: 120px;
  height: 12px;
  background: #DF2028; /* Vermelho NP */
  margin: 40px auto 0;
}

/* GRID CONFINADO */
.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

/* CARDS BRUTALISTAS (FONTE DA TELA INICIAL) */
.service-card {
  padding: 48px;
  border-radius: 3.5rem;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  border: 4px solid #1C1C1C;
}

.service-card:hover {
  transform: translateY(-16px) rotate(1deg);
  box-shadow: 12px 12px 0px #1C1C1C;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 64px;
}

.axis-title-display {
  font-family: var(--font-display, "Archivo Black", sans-serif); /* IGUAL À TELA INICIAL */
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: 900;
  line-height: 1;
  max-width: 80%;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.axis-desc-sans {
  font-family: var(--font-sans, "Inter", sans-serif);
  font-weight: 600;
  font-size: 1.15rem;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 48px;
}

.card-action {
  margin-top: auto;
}

/* ÍCONES */
.icon-box {
  width: 72px;
  height: 72px;
  border: 2px solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hand-drawn-icon {
  transform: rotate(-8deg);
  transition: transform 0.4s ease;
}

.service-card:hover .hand-drawn-icon {
  transform: rotate(15deg) scale(1.2);
}

/* SEÇÃO SOB MEDIDA */
.cta-card-horizontal {
  grid-column: 1 / -1;
  background: white;
  border: 4px dashed #1C1C1C;
  border-radius: 3.5rem;
  padding: 64px;
  margin-top: 32px;
}

.demandas-title {
  font-family: var(--font-display, "Archivo Black", sans-serif);
  font-size: 2.5rem;
  color: #1C1C1C;
  margin: 0 0 16px 0;
}

.demandas-desc {
  font-family: var(--font-sans, "Inter", sans-serif);
  font-size: 1.25rem;
  color: #475569;
  max-width: 700px;
  margin: 0;
}

.cta-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
}

/* BOTÕES PILL (AGORA EM VERMELHO ATIVISTA) */
.pill-button-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #DF2028; /* VERMELHO NP */
  color: #FFFFFF !important;
  padding: 18px 48px;
  border-radius: 9999px;
  font-family: var(--font-sans, "Inter", sans-serif);
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.pill-button-action:hover {
  background: #1C1C1C;
  transform: scale(1.05);
}

.big-pill {
  padding: 22px 64px;
  font-size: 0.9rem;
}

/* NEWSLETTER (ESTILO HOME: AMARELO, VERMELHO E BRANCO) */
.newsletter-section-home {
  margin-top: 128px;
  width: 100%;
}

.newsletter-container-brutalist {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #FFE65A; /* AMARELO */
  border: 4px solid #1C1C1C;
  padding: 64px;
  display: flex;
  gap: 48px;
  align-items: center;
  box-shadow: 12px 12px 0px #1C1C1C;
  position: relative;
}

.newsletter-text {
  flex: 1;
}

.newsletter-form-container {
  flex: 1;
  width: 100%;
}

.newsletter-form-brutalist {
  background: white; /* BRANCO */
  border: 4px solid #1C1C1C;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inline-flex-center {
  display: flex;
  align-items: center;
}

.text-red-icon {
  fill: #DF2028;
  color: #DF2028;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.eyebrow-news {
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #1C1C1C;
}

.newsletter-title-home {
  font-family: var(--font-display, "Archivo Black", sans-serif);
  font-size: 3rem;
  text-transform: uppercase;
  line-height: 1;
  color: #1C1C1C;
  margin-bottom: 16px;
}

.newsletter-desc-home {
  font-family: var(--font-sans);
  font-weight: 700;
  color: rgba(28,28,28,0.8);
  line-height: 1.4;
}

.nl-input-brutalist {
  width: 100%;
  border: 4px solid #1C1C1C;
  padding: 16px 24px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.125rem;
  outline: none;
  background: #F7F7F5;
}

.btn-red-brutalist {
  background: #DF2028; /* VERMELHO */
  color: white;
  border: 4px solid #1C1C1C;
  padding: 16px;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-red-brutalist:hover {
  background: #1C1C1C;
  transform: translate(-2px, -2px);
}

.success-banner {
  background: #A4CD39;
  border: 4px solid #1C1C1C;
  padding: 16px;
  text-align: center;
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 16px;
}

/* MICRO-ANIMAÇÕES */
.fade-in-up {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVIDADE */
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: 1fr; gap: 32px; }
  .cta-inner { flex-direction: column; text-align: center; }
  .main-title { font-size: 4.5rem; }
  .newsletter-container-brutalist { flex-direction: column; padding: 40px; }
}

@media (max-width: 768px) {
  .service-card { padding: 32px; min-height: auto; border-radius: 2.5rem; }
  .cta-card-horizontal { padding: 32px; border-radius: 2.5rem; }
  .newsletter-form-brutalist { padding: 24px; }
  .newsletter-title-home { font-size: 2.25rem; }
  .content-wrapper { padding-top: 140px; }
}
</style>
