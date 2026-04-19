<template>
  <div class="home-brutalist antialiased selection-custom">
    
    <!-- HERO SECTION -->
    <section class="hero-section activist-gradient border-hero-bottom">
      <!-- Floating GeoShapes -->
      <div class="floating-shape shape-pill-y pink-bg shape-1"></div>
      <div class="floating-shape shape-square yellow-bg shape-2"></div>
      <div class="floating-shape shape-circle blue-bg shape-4"></div>
      <div class="floating-shape shape-pill-x yellow-bg shape-7"></div>

      <div class="hero-content z-20">
        <h1 class="hero-title font-hero text-white drop-shadow-md uppercase" :style="{ fontSize: heroFontSize }">
          {{ siteContent.home.heroTitle }} <br />
          <span class="text-yellow">{{ siteContent.home.heroTitleAccent }}</span>
        </h1>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee-wrapper pink-bg border-marquee-bottom" :style="{ padding: marqueePadding + 'rem 0' }">
      <div class="marquee-track font-display uppercase text-lg text-dark">
        <span v-for="n in 16" :key="n" class="marquee-item-rel">
          {{ siteContent.home.marqueeText }}
          <div class="sun-container-abs">
            <svg viewBox="0 0 100 100" class="sun-icon-mini" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1C1C1C" d="M50 30c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0-5c2-10-5-15 0-25 5 10-2 15 0 25zm18 7c8-8 15-2 20-10-10 5-2 15-20 10zm12 18c10-2 15 5 25 0-10-5-15 2-25 0zm-7 18c8 8 2 15 10 20-5-10-15-2-10-20zm-18 12c-2 10 5 15 0 25-5-10 2-15 0-25zm-18-7c-8 8-15 2-20 10 10-5 2-15 20-10zm-12-18c-10 2-15-5-25 0 10 5 15-2 25 0zm7-18c-8-8-2-15-10-20 5 10 15 2 10 20z" />
            </svg>
          </div>
        </span>
      </div>
    </div>

    <!-- FEATURED WRITING (Radar Editorial) -->
    <section id="essays" class="pt-6 pb-32 px-6 md-px-12 bg-light text-dark relative overflow-hidden">
      
      <div class="absolute inset-0 grid-pattern-light pointer-events-none z-0"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-10 flex flex-col items-center">
          <h2 class="font-display text-5xl md-text-7xl uppercase tracking-tighter leading-none inline-block transform md:-translateX-12">
            {{ siteContent.home.radarEditorialTitle || 'Radar' }} <br /> 
            <span class="activist-gradient-text block mt-2 padding-left-step">{{ siteContent.home.radarEditorialSubtitle || 'Editorial' }}</span>
          </h2>
        </div>

        <div class="grid-writing gap-8">
          <!-- Coluna Maior (Mais Recente) -->
          <div class="flex-col h-full large-col">
            <div class="flex-center-left gap-3 mb-4">
              <div class="geo-circle pink-bg border-dark" style="width: 24px; height: 24px; flex-shrink: 0;"></div>
              <div class="font-sans font-black text-xs uppercase opacity-60" style="letter-spacing: 0.15em;">
                Mais Recente
              </div>
            </div>
            
            <div v-if="featuredArticle" class="large-card group cursor-pointer border-dark bg-white flex-col md-flex-row flex-1" @click="$router.push(`/conteudo/${featuredArticle.id}`)">
              <div class="large-card-img-wrapper relative border-b-dark md-border-r-dark w-full md-w-half h-64 md-h-auto">
                <img 
                  :src="featuredArticle.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" 
                  class="full-img object-cover grayscale mix-blend-multiply opacity-80 transition-all duration-500 w-full h-full" 
                  :alt="featuredArticle.title"
                />
                <div class="img-overlay bg-lime-20 transition-colors absolute inset-0"></div>
                <div class="absolute top-4 left-4">
                  <div class="tag yellow-bg text-dark font-sans font-bold uppercase tracking-widest">{{ featuredArticle.category || 'Editorial' }}</div>
                </div>
              </div>
              <div class="large-card-content w-full md-w-half p-8 lg-p-12 flex-col justify-center">
                <h3 class="font-display text-3xl md-text-4xl uppercase tracking-tighter leading-tight mb-6">
                  {{ featuredArticle.title }}
                </h3>
                <p class="font-sans text-sm font-medium opacity-80 leading-relaxed mb-8">
                  {{ featuredArticle.excerpt || featuredArticle.subtitle || 'Sem descrição.' }}
                </p>
                <div class="mt-auto">
                  <span class="read-more font-sans font-black text-xs uppercase tracking-widest flex-center-left gap-2 transition-colors">
                    Ler Ensaio Completo <ArrowRight class="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="large-card group border-dark bg-white flex-col p-12 justify-center items-center flex-1">
              <p class="font-sans font-bold text-dark opacity-60">Nenhum ensaio publicado no momento.</p>
            </div>
          </div>

          <!-- Coluna Menor (Mais Lidos) -->
          <div class="flex-col h-full" v-if="secondaryArticles.length > 0">
            <div class="flex-center-left gap-3 mb-4">
              <div class="geo-circle blue-bg border-dark" style="width: 24px; height: 24px; flex-shrink: 0;"></div>
              <div class="font-sans font-black text-xs uppercase opacity-60" style="letter-spacing: 0.15em;">
                Mais Lidos
              </div>
            </div>
            <div class="flex-col gap-8 flex-1">
              <div v-for="(article, idx) in secondaryArticles" :key="article.id" class="small-card group cursor-pointer border-dark p-8 bg-white transition-all h-full flex-col" @click="$router.push(`/conteudo/${article.id}`)">
                <div class="flex-between items-start mb-6">
                  <div class="tag text-white font-sans font-bold uppercase tracking-widest" :class="idx === 0 ? 'pink-bg rounded-full' : 'blue-bg'">{{ article.category || 'News' }}</div>
                  <ArrowRight class="w-6 h-6 opacity-30 transition-all card-arrow" />
                </div>
                <h4 class="font-display text-2xl uppercase tracking-tighter leading-tight mt-auto">
                  {{ article.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OPPORTUNITIES -->
    <section id="opportunities" class="bg-lime py-24 px-6 md-px-12 border-y-dark relative">
      <div class="max-w-7xl mx-auto grid-opps gap-12 relative z-10">
        <div class="flex-col justify-start">
          <div class="mb-8">
            <div class="inline-flex-center gap-3 mb-6">
              <div class="geo-square red-bg border-dark" style="width: 20px; height: 20px; flex-shrink: 0;"></div>
              <span class="font-sans font-black text-sm uppercase tracking-widest text-dark">O Radar Ativista</span>
            </div>
            <h2 class="font-display text-4xl md-text-5xl lg-text-6xl leading-none tracking-tighter uppercase mb-6 text-dark" style="letter-spacing: -0.06em; word-break: keep-all; white-space: nowrap;">
              Oportunidades
            </h2>
          </div>
          <p class="font-sans font-semibold text-lg text-dark mb-8 bg-white p-6 border-dark-4 shadow-solid">
            Vagas, subsídios e bolsas para lideranças que constroem a base e não apenas a marca. Atualizado pela nossa rede.
          </p>
        </div>
        
        <div class="flex-col gap-6">
          <div v-for="opp in displayOpportunities" :key="opp.id" class="opp-item group bg-white border-dark-4 transition-all p-6 md-p-8 flex-col sm-flex-row justify-between items-start sm-items-center gap-6 cursor-pointer">
            <div>
              <div class="flex-center-left gap-3 mb-3">
                <div class="geo-circle pink-bg border-dark" style="width: 24px; height: 24px; flex-shrink: 0;"></div>
                <span class="font-sans font-black text-xs uppercase tracking-widest">{{ opp.category }}</span>
              </div>
              <h4 class="font-display text-2xl uppercase tracking-tighter leading-tight bg-gradient-hover transition-all">{{ opp.title }}</h4>
              <p class="font-sans font-semibold mt-2 opacity-70">{{ opp.description }}</p>
            </div>
            <div class="opp-deadline text-center font-sans font-black text-sm uppercase tracking-widest border-dark-2 px-6 py-4 bg-light transition-colors">
              PRAZO:<br/>{{ opp.deadline }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-dark py-24 px-6 md-px-12 text-light relative overflow-hidden">
      <!-- Grid Background -->
      <div class="absolute inset-0 opacity-5 grid-pattern-bg"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex-col md-flex-row items-center gap-6 mb-16">
          <div class="geo-circle red-bg w-12 h-12 border-white-2"></div>
          <h2 class="font-display text-5xl md-text-6xl uppercase tracking-tighter">
            Nossos <span class="text-yellow">Eixos de Ação</span>
          </h2>
        </div>
        
        <div class="grid-services gap-8">
          <div class="svc-card group p-8 bg-gray-dark border-white-20 transition-all border-hover-pink">
            <Users class="w-12 h-12 text-pink mb-8" :stroke-width="2.5" />
            <h3 class="font-display text-3xl uppercase tracking-tighter mb-4 text-white">Escola de Formação</h3>
            <p class="font-sans font-medium opacity-80 leading-relaxed min-h-5rem text-sm md-text-base">Cursos e materiais para desenvolvimento de novas lideranças comunitárias.</p>
            <div class="svc-footer mt-8 pt-6 border-t-white-10 font-sans font-black text-xs uppercase tracking-widest flex-between">
              <span>Conheça os Projetos</span><ArrowRight class="w-4 h-4" />
            </div>
          </div>
          
          <div class="svc-card group p-8 bg-gray-dark border-white-20 transition-all border-hover-lime">
            <Globe class="w-12 h-12 text-lime mb-8" :stroke-width="2.5" />
            <h3 class="font-display text-3xl uppercase tracking-tighter mb-4 text-white">Incidência Política</h3>
            <p class="font-sans font-medium opacity-80 leading-relaxed min-h-5rem text-sm md-text-base">Acompanhamento legislativo e construção de campanhas de pressão pública.</p>
            <div class="svc-footer mt-8 pt-6 border-t-white-10 font-sans font-black text-xs uppercase tracking-widest flex-between">
              <span>Conheça os Projetos</span><ArrowRight class="w-4 h-4" />
            </div>
          </div>
          
          <div class="svc-card group p-8 bg-gray-dark border-white-20 transition-all border-hover-blue">
            <Zap class="w-12 h-12 text-blue mb-8" :stroke-width="2.5" />
            <h3 class="font-display text-3xl uppercase tracking-tighter mb-4 text-white">Apoio a Territórios</h3>
            <p class="font-sans font-medium opacity-80 leading-relaxed min-h-5rem text-sm md-text-base">Suporte logístico e intelectual para movimentos sociais na linha de frente.</p>
            <div class="svc-footer mt-8 pt-6 border-t-white-10 font-sans font-black text-xs uppercase tracking-widest flex-between">
              <span>Conheça os Projetos</span><ArrowRight class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="bg-blue-primary py-24 px-6 md-px-12 border-b-dark">
      <div class="max-w-5xl mx-auto bg-yellow border-dark-4 p-8 md-p-16 flex-col md-flex-row gap-12 items-center shadow-solid-lg relative">
        <div class="flex-1">
          <div class="inline-flex-center gap-2 mb-4">
             <Zap class="text-red" style="fill: #DF2028; color: #DF2028; width: 24px; height: 24px; flex-shrink: 0;" />
             <span class="font-sans font-black text-xs uppercase tracking-widest text-dark">{{ siteContent.home?.newsletterEyebrow || 'Rede de Mobilização' }}</span>
          </div>
          <h2 class="font-display text-4xl md-text-5xl uppercase tracking-tighter text-dark leading-none mb-4" v-html="siteContent.home?.newsletterTitle || 'Junte-se ao <br /> Movimento.'"></h2>
          <p class="font-sans font-bold text-dark-80">
            {{ siteContent.home?.newsletterDescription || 'Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.' }}
          </p>
        </div>
        
        <div class="flex-1 w-full relative">
          <form @submit.prevent class="flex-col gap-4 relative z-10 bg-white border-dark-4" style="padding: 2.5rem;">
             <input 
               type="email" 
               :placeholder="siteContent.home?.newsletterPlaceholder || 'Digite seu email...'" 
               class="w-full bg-light px-6 py-4 font-sans font-bold text-lg text-dark focus-outline transition-colors nl-input"
               style="border: 4px solid #1C1C1C;"
             />
             <button class="btn-red w-full" style="border: 4px solid #1C1C1C; padding: 1rem 1.5rem; justify-content: flex-start; font-size: 1rem;">{{ siteContent.home?.newsletterButton || 'QUERO FAZER PARTE' }}</button>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowRight, Globe, Users, Zap, Sun } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const heroFontSize = computed(() => {
  const size = siteContent.home.heroFontSize || '11'
  return window.innerWidth < 768 ? '16vw' : `${size}vw`
})

const marqueePadding = computed(() => siteContent.home.marqueePadding || '2.2')

const mockOpportunities = [
  {
    id: 1,
    category: "ECONOMIA DE GÊNERO",
    title: "FORMAÇÃO EM POLÍTICAS PÚBLICAS",
    description: "Impacto focado em economia de gênero",
    deadline: "ABERTO"
  },
  {
    id: 2,
    category: "LIDERANÇA STEM",
    title: "BOLSAS PARA MULHERES EM DADOS",
    description: "Impacto focado em liderança stem",
    deadline: "ABERTO"
  }
]

const displayOpportunities = computed(() => {
  return siteContent.opportunities && siteContent.opportunities.length > 0 
    ? siteContent.opportunities 
    : mockOpportunities
})

const mockPosts = [
  {
    id: 1,
    title: "Por que o ativismo corporativo fracassa.",
    excerpt: "Um mergulho profundo na cooptação de movimentos radicais e o que o impacto autêntico exige dos organizadores comunitários no cenário atual.",
    category: "Mobilização",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800",
    date: "2026-04-18"
  },
  {
    id: 2,
    title: "Como estruturar um sindicato local no modelo 2026",
    excerpt: "A nova onda de sindicalismo que está transformando a relação entre capital e trabalho nas cidades.",
    category: "Educação",
    image: "",
    date: "2026-04-15"
  },
  {
    id: 3,
    title: "A geopolítica da descarbonização nos países em desenvolvimento",
    excerpt: "Como o sul global está liderando e sofrendo com a transição energética global.",
    category: "Clima",
    image: "",
    date: "2026-04-10"
  }
]

const displayPosts = computed(() => {
  return siteContent.posts && siteContent.posts.length > 0 ? siteContent.posts : mockPosts
})

const featuredArticle = computed(() => {
  return displayPosts.value.length > 0 ? displayPosts.value[0] : null
})

const secondaryArticles = computed(() => {
  return displayPosts.value.length > 1 ? displayPosts.value.slice(1, 3) : []
})
</script>

<style scoped>
/* CORES BASE */
.text-dark { color: #1C1C1C; }
.text-white { color: #FFFFFF; }
.text-light { color: #F7F7F5; }
.text-yellow { color: #FFE65A; }
.text-red { color: #DF2028; }
.text-pink { color: #FF6BCA; }
.text-lime { color: #A4CD39; }
.text-blue { color: #3D78E0; }
.text-dark-80 { color: rgba(28,28,28,0.8); }

.bg-white { background-color: #FFFFFF; }
.bg-light { background-color: #F7F7F5; }
.bg-dark { background-color: #1C1C1C; }
.bg-lime { background-color: #A4CD39; }
.bg-blue-primary { background-color: #3D78E0; }
.bg-gray-dark { background-color: #2A2A2A; }

.yellow-bg { background-color: #FFE65A; }
.pink-bg { background-color: #FF6BCA; }
.blue-bg { background-color: #3D78E0; }
.red-bg { background-color: #DF2028; }
.lime-bg { background-color: #A4CD39; }
.mint-bg { background-color: #A2E3B1; }
.dark-bg { background-color: #1C1C1C; }
.fill-dark { fill: #1C1C1C; }

/* LAYOUT & SPACING */
.max-w-7xl { max-width: 80rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-xs { max-width: 20rem; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.mx-auto { margin-left: auto; margin-right: auto; }
.py-24 { padding-top: 6rem; padding-bottom: 6rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.p-8 { padding: 2rem; }
.p-6 { padding: 1.5rem; }
.pb-32 { padding-bottom: 8rem; }
.mb-16 { margin-bottom: 4rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mt-auto { margin-top: auto; }
.mt-8 { margin-top: 2rem; }
.mt-2 { margin-top: 0.5rem; }
.pl-4 { padding-left: 1rem; }
.gap-12 { gap: 3rem; }
.gap-8 { gap: 2rem; }
.gap-6 { gap: 1.5rem; }
.gap-4 { gap: 1rem; }
.gap-3 { gap: 0.75rem; }
.gap-2 { gap: 0.5rem; }
.flex-1 { flex: 1 1 0%; }
.shrink-0 { flex-shrink: 0; }

.absolute { position: absolute; }
.relative { position: relative; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.overflow-hidden { overflow: hidden; }
.inline-block { display: inline-block; }

/* FLEXBOX */
.flex-col { display: flex; flex-direction: column; }
.flex-between { display: flex; justify-content: space-between; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-center-left { display: flex; align-items: center; }
.inline-flex-center { display: inline-flex; align-items: center; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-start { align-items: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* TYPOGRAPHY */
.font-display { font-family: "Archivo Black", sans-serif; }
.font-hero { font-family: "Space Grotesk", sans-serif; font-weight: 800; letter-spacing: -0.05em; }
.font-sans { font-family: "Inter", sans-serif; }
.uppercase { text-transform: uppercase; }
.tracking-tighter { letter-spacing: -0.04em; }
.tracking-widest { letter-spacing: 0.1em; }
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.1; }
.leading-relaxed { line-height: 1.625; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.font-black { font-weight: 900; }
.text-5xl { font-size: 3rem; }
.text-4xl { font-size: 2.25rem; }
.text-3xl { font-size: 1.875rem; }
.text-2xl { font-size: 1.5rem; }
.text-lg { font-size: 1.125rem; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* BORDERS & SHADOWS */
.border-dark { border: 4px solid #1C1C1C; }
.border-dark-4 { border: 4px solid #1C1C1C; }
.border-dark-2 { border: 2px solid #1C1C1C; }
.border-y-dark { border-top: 4px solid #1C1C1C; border-bottom: 4px solid #1C1C1C; }
.border-b-dark { border-bottom: 4px solid #1C1C1C; }
.border-b-brutalist { border-bottom: 4px solid #1C1C1C; }
.border-l-lime { border-left: 4px solid #A4CD39; }
.border-white-20 { border: 4px solid rgba(255,255,255,0.2); }
.border-white-2 { border: 2px solid #FFFFFF; }
.border-pink { border-color: #FF6BCA; }
.border-2 { border-width: 2px; border-style: solid; }
.border-t-white-10 { border-top: 1px solid rgba(255,255,255,0.1); }
.shadow-solid { box-shadow: 6px 6px 0px #1C1C1C; }
.shadow-solid-lg { box-shadow: 12px 12px 0px #1C1C1C; }
.drop-shadow-md { filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07)) drop-shadow(0 2px 2px rgba(0,0,0,0.06)); }

/* OPACITY & EFFECTS */
.opacity-5 { opacity: 0.05; }
.opacity-30 { opacity: 0.3; }
.opacity-50 { opacity: 0.5; }
.opacity-70 { opacity: 0.7; }
.opacity-80 { opacity: 0.8; }
.mix-blend-multiply { mix-blend-mode: multiply; }
.grayscale { filter: grayscale(100%); }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.transition-all { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.transition-colors { transition: background-color 0.3s, border-color 0.3s, color 0.3s; }
.cursor-pointer { cursor: pointer; }

/* --- HERO SPECIFIC --- */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  overflow: hidden;
}
.activist-gradient { background: linear-gradient(110deg, #A80022 0%, #DF2028 35%, #A4CD39 75%, #1D976C 100%); }
.border-hero-bottom { border-bottom: 6px solid #1C1C1C; }

.hero-content {
  display: flex; flex-direction: column; align-items: center; /* Centraliza a caixa de conteúdo */
  justify-content: center;
  flex-grow: 1; max-width: 80rem; margin: 0 auto; width: 100%;
}
.hero-title { 
  font-size: 16vw; 
  line-height: 1.1; /* Espaçamento real para evitar a colisão do Q */
  margin-bottom: 1.5rem; 
  text-align: left;
  transform: translate(-10%, -15%);
}
.hero-title span {
  display: block;
  margin-top: 0.1em; /* Espaço positivo para separar as linhas */
  padding-left: 0.8em; /* Puxa a segunda linha mais para a direita, criando o efeito degrau conceitual */
}
@media (min-width: 768px) { 
  .hero-title { 
    font-size: 11vw; 
    line-height: 1.05;
    transform: translate(-15%, -20%);
  } 
  .hero-title span {
    padding-left: 1.2em; /* No desktop o efeito degrau é mais acentuado */
  }
}
.hero-box {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2rem; margin-top: 2rem;
  background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1.5rem; border: 2px solid rgba(255,255,255,0.3);
}
@media (min-width: 768px) { .hero-box { flex-direction: row; align-items: center; gap: 3rem; } }
.hero-desc { max-width: 28rem; }

/* GEOMETRIC SHAPES */
.geo-circle { border-radius: 50%; aspect-ratio: 1/1; }
.geo-square { border-radius: 0; aspect-ratio: 1/1; }
.shape-pill-y { border-radius: 9999px; height: 8rem; width: 3rem; }
.shape-pill-x { border-radius: 9999px; height: 1.5rem; width: 3rem; }
@media (min-width: 768px) { 
  .shape-pill-y { height: 12rem; width: 5rem; }
  .shape-pill-x { height: 2.5rem; width: 5rem; }
}

.floating-shape { position: absolute; z-index: 10; border: 4px solid #1C1C1C; }
.shape-1 { top: 20%; right: 10%; box-shadow: 8px 8px 0px rgba(28,28,28,0.5); animation: float-1 4s ease-in-out infinite; }
@media (min-width: 768px) { .shape-1 { right: 20%; } }
.shape-2 { bottom: 15%; left: 5%; width: 4rem; height: 4rem; box-shadow: -8px 8px 0px rgba(28,28,28,0.5); transform: rotate(12deg); animation: float-2 5s ease-in-out infinite 1s; }
@media (min-width: 768px) { .shape-2 { left: 10%; width: 6rem; height: 6rem; } }
.shape-4 { bottom: 30%; right: 5%; width: 2.5rem; height: 2.5rem; border-radius: 50%; animation: pulse-1 5s ease-in-out infinite 1s; }
.shape-7 { bottom: 22%; right: 12%; animation: float-1 6s ease-in-out infinite 0.5s; }

@keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes float-2 { 0%, 100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(30px) rotate(12deg); } }
@keyframes pulse-1 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
@keyframes pulse-fast { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.6; } }
.animate-pulse-fast { animation: pulse-fast 1.5s ease-in-out infinite; }

/* BUTTONS */
.btn-primary {
  display: inline-flex; align-items: center; gap: 1rem; padding: 1rem 2rem;
  font-family: "Inter", sans-serif; text-transform: uppercase; font-weight: 900;
  letter-spacing: 0.1em; font-size: 0.875rem; border: 2px solid #1C1C1C;
  background-color: #FFE65A; color: #1C1C1C; transition: all 0.3s; cursor: pointer;
}
.btn-primary:hover { transform: translateY(-4px); box-shadow: 4px 4px 0px #1C1C1C; }
.btn-red {
  display: inline-flex; align-items: center; gap: 1rem; padding: 1rem 2rem;
  font-family: "Inter", sans-serif; text-transform: uppercase; font-weight: 900;
  letter-spacing: 0.1em; font-size: 0.875rem; border: 2px solid #1C1C1C;
  background-color: #DF2028; color: #F7F7F5; transition: all 0.3s; cursor: pointer;
}
.btn-red:hover { transform: translateY(-4px); box-shadow: 4px 4px 0px #1C1C1C; }

/* MARQUEE */
.marquee-wrapper { 
  display: flex; 
  overflow-x: hidden; 
  padding: 2.2rem 0; /* Alongada, mas não tanto */
}
.border-marquee-bottom { border-bottom: 6px solid #1C1C1C; }
.marquee-track { display: flex; white-space: nowrap; animation: marquee-scroll 25s linear infinite; }
.marquee-item-rel { 
  display: inline-flex; 
  align-items: center; 
  padding-left: 2rem; 
  padding-right: 4rem; /* Espaço total reservado para o sol e margens */
  white-space: nowrap; 
  position: relative;
}
.sun-container-abs {
  position: absolute;
  right: 0;
  width: 4rem; /* Mesma largura do padding-right para centralizar o sol dentro dela */
  display: flex;
  justify-content: center;
  align-items: center;
}
.sun-icon-mini { width: 1.5rem; height: 1.5rem; flex-shrink: 0; }
@keyframes marquee-scroll { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }

/* FEATURED WRITING */
.activist-gradient-text {
  background: linear-gradient(110deg, #DF2028 0%, #A4CD39 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.padding-left-step { padding-left: 1.5em; }
@media (max-width: 768px) { .padding-left-step { padding-left: 1em; } }
.md--translateX-12 { transform: translateX(-3rem); }
.grid-writing { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) { .grid-writing { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid-writing { grid-template-columns: repeat(3, 1fr); } }
.large-col { grid-column: span 1; }
@media (min-width: 768px) { .large-col { grid-column: span 2; } }
.large-card { display: flex; overflow: hidden; }
.large-card:hover { box-shadow: 8px 8px 0px #A4CD39; }
.large-card:hover .full-img { filter: grayscale(0%); opacity: 1; }
.large-card:hover .img-overlay { background-color: transparent; }
.large-card:hover .read-more { color: #DF2028; }
.bg-lime-20 { background-color: rgba(164, 205, 57, 0.2); }
.tag { padding: 0.5rem 1rem; font-size: 0.6875rem; display: inline-flex; align-items: center; justify-content: center; }
.small-card:hover { box-shadow: 8px 8px 0px #FF6BCA; }
.small-card:hover .card-arrow { opacity: 1; transform: rotate(-45deg); }

/* OPPORTUNITIES */
.bottom-left-shape { bottom: -5rem; left: -5rem; width: 16rem; height: 16rem; border: 4px solid #1C1C1C; }
.grid-opps { display: grid; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .grid-opps { grid-template-columns: repeat(12, minmax(0, 1fr)); } .grid-opps > div:first-child { grid-column: span 4 / span 4; } .grid-opps > div:last-child { grid-column: span 8 / span 8; } }
.opp-item:hover { transform: translateY(-4px); box-shadow: 8px 8px 0px #1C1C1C; }
.bg-gradient-hover { background-image: linear-gradient(to right, transparent, transparent); background-size: 100% 12px; background-repeat: no-repeat; background-position: bottom; }
.opp-item:hover .bg-gradient-hover { background-image: linear-gradient(to right, #FFE65A, #FFE65A); }
.opp-item:hover .opp-deadline { background-color: #1C1C1C; color: #FFFFFF; }

/* SERVICES */
.grid-pattern-light {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
.grid-pattern-bg { background-image: linear-gradient(#F7F7F5 2px, transparent 2px), linear-gradient(90deg, #F7F7F5 2px, transparent 2px); background-size: 60px 60px; }
.grid-services { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) { .grid-services { grid-template-columns: repeat(3, 1fr); } }
.svc-card:hover { transform: translateY(-8px); }
.border-hover-pink:hover { border-color: #FF6BCA; }
.border-hover-lime:hover { border-color: #A4CD39; }
.border-hover-blue:hover { border-color: #3D78E0; }
.svc-card:hover .svc-footer { border-color: currentColor; }

/* NEWSLETTER */
.nl-shape-top { top: -1.5rem; right: -1.5rem; }
.nl-shape-bottom { bottom: -1.5rem; left: -1.5rem; }
.focus-outline:focus { outline: none; background-color: #FFFFFF; }

/* RESPONSIVE UTILS */
@media (max-width: 768px) {
  .hidden-mobile { display: none; }
  .md-flex-row { flex-direction: column; }
  .md-w-half { width: 100%; }
  .md-h-auto { height: 16rem; }
  .md-border-r-dark { border-right: none; }
  .border-b-dark { border-bottom: 4px solid #1C1C1C; }
}
@media (min-width: 768px) {
  .md-px-12 { padding-left: 3rem; padding-right: 3rem; }
  .md-text-7xl { font-size: 4.5rem; }
  .md-text-6xl { font-size: 3.75rem; }
  .md-text-5xl { font-size: 3rem; }
  .md-text-4xl { font-size: 2.25rem; }
  .md-text-base { font-size: 1rem; }
  .md-flex-row { flex-direction: row; }
  .md-w-half { width: 50%; }
  .md-h-auto { height: auto; }
  .md-p-12 { padding: 3rem; }
  .md-p-16 { padding: 4rem; }
  .md-p-8 { padding: 2rem; }
  .md-border-r-dark { border-right: 4px solid #1C1C1C; }
  .sm-flex-row { flex-direction: row; }
  .sm-items-center { align-items: center; }
}
</style>
