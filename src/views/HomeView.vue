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
    <section id="essays" class="pt-6 pb-32 px-6 md-px-12 bg-light text-dark relative overflow-hidden" style="z-index: 10; position: relative;">
      
      <div class="absolute inset-0 grid-pattern-light pointer-events-none z-0"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-16 flex flex-col items-center">
          <h2 class="font-display text-5xl md-text-7xl uppercase tracking-tighter leading-none inline-block transform md:-translateX-12 text-center text-dark">
            {{ siteContent.home.radarEditorialTitle || 'Conteúdos e' }} <br /> 
            <span class="activist-gradient-text block mt-2 padding-left-step">{{ siteContent.home.radarEditorialSubtitle || 'Artigos' }}</span>
          </h2>
          
          <!-- FUNCTIONAL TABS SYSTEM (Medium-like Brutalist) -->
          <div class="flex gap-8 mt-12 border-b-dark w-full justify-center overflow-x-auto no-scrollbar">
            <button 
              v-for="tab in ['TODOS', 'MOBILIZAÇÃO', 'EDUCAÇÃO', 'CLIMA', 'DADOS']" 
              :key="tab"
              class="tab-medium-brutalist" 
              :class="{ 'active-tab': selectedTab === tab }"
              @click="selectedTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div class="grid-writing gap-8">
          <!-- Coluna Maior (Mais Recente) -->
          <div class="flex-col h-full large-col">
            <div class="flex-center-left gap-3 mb-4">
              <div class="geo-circle pink-bg border-dark" style="width: 24px; height: 24px; flex-shrink: 0;"></div>
              <div class="font-sans font-black text-xs uppercase opacity-60" style="letter-spacing: 0.15em;">
                {{ selectedTab === 'TODOS' ? 'Mais Recente' : selectedTab }}
              </div>
            </div>
            
            <router-link v-if="filteredPosts.length > 0" :to="`/conteudo/${filteredPosts[0].id}`" class="large-card group cursor-pointer border-dark bg-white flex-col md-flex-row flex-1 no-underline text-dark" style="max-height: 500px; display: flex;">
              <div class="large-card-img-wrapper relative border-b-dark md-border-r-dark w-full md-w-half h-48 md-h-auto">
                <img 
                  :src="filteredPosts[0].image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" 
                  class="full-img object-cover grayscale mix-blend-multiply opacity-80 transition-all duration-500 w-full h-full" 
                  :alt="filteredPosts[0].title"
                />
                <div class="img-overlay bg-lime-20 transition-colors absolute inset-0"></div>
                <div class="absolute top-4 left-4">
                  <div class="tag yellow-bg text-dark font-sans font-bold uppercase tracking-widest">{{ filteredPosts[0].category || 'Editorial' }}</div>
                </div>
              </div>
              <div class="large-card-content w-full md-w-half p-6 lg-p-8 flex-col justify-center">
                <h3 class="font-display text-2xl md-text-3xl uppercase tracking-tighter leading-tight mb-4 text-dark">
                  {{ filteredPosts[0].title }}
                </h3>
                <p class="font-sans text-xs font-medium opacity-80 leading-relaxed mb-6 text-dark">
                  {{ filteredPosts[0].excerpt || filteredPosts[0].subtitle || 'Sem descrição.' }}
                </p>
                <div class="mt-auto">
                  <span class="read-more font-sans font-black text-xs uppercase tracking-widest flex-center-left gap-2 transition-colors text-dark">
                    Ler Ensaio Completo <ArrowRight class="w-4 h-4" />
                  </span>
                </div>
              </div>
            </router-link>
            <div v-else class="large-card group border-dark bg-white flex-col p-12 justify-center items-center flex-1">
              <p class="font-sans font-bold text-dark opacity-60">Nenhum ensaio publicado nesta categoria.</p>
            </div>
          </div>

          <!-- Coluna Menor (Mais Lidos / Outros) -->
          <div class="flex-col h-full" v-if="filteredPosts.length > 1">
            <div class="flex-center-left gap-3 mb-4">
              <div class="geo-circle blue-bg border-dark" style="width: 24px; height: 24px; flex-shrink: 0;"></div>
              <div class="font-sans font-black text-xs uppercase opacity-60" style="letter-spacing: 0.15em;">
                Próximas Leituras
              </div>
            </div>
            <div class="flex-col gap-8 flex-1">
              <router-link v-for="(article, idx) in filteredPosts.slice(1, 3)" :key="article.id" :to="`/conteudo/${article.id}`" class="small-card group cursor-pointer border-dark p-8 bg-white transition-all h-full flex-col no-underline text-dark" style="display: flex;">
                <div class="flex-between items-start mb-6">
                  <div class="tag text-white font-sans font-bold uppercase tracking-widest" :class="idx === 0 ? 'pink-bg rounded-full' : 'blue-bg'">{{ article.category || 'News' }}</div>
                  <ArrowRight class="w-6 h-6 opacity-30 transition-all card-arrow text-dark" />
                </div>
                <h4 class="font-display text-2xl uppercase tracking-tighter leading-tight mt-auto text-dark">
                  {{ article.title }}
                </h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OPPORTUNITIES -->
    <section id="opportunities" class="bg-lime py-24 px-6 md-px-12 border-y-dark relative" style="z-index: 10;">
      <div class="max-w-7xl mx-auto grid-opps gap-12 relative z-10">
        <div class="flex-col justify-start">
          <div class="mb-8">
            <div class="inline-flex-center gap-3 mb-6">
              <div class="geo-square red-bg border-dark" style="width: 20px; height: 20px; flex-shrink: 0;"></div>
              <span class="font-sans font-black text-sm uppercase tracking-widest text-dark">{{ siteContent.home?.opportunitiesEyebrow || 'O Radar Ativista' }}</span>
            </div>
            <h2 class="font-display text-4xl md-text-5xl lg-text-6xl leading-none tracking-tighter uppercase mb-6 text-dark" style="letter-spacing: -0.06em; word-break: keep-all; white-space: nowrap;">
              {{ siteContent.home?.opportunitiesTitle || 'Oportunidades' }}
            </h2>
          </div>
          <p class="font-sans font-semibold text-lg text-dark mb-8 bg-white p-6 border-dark-4 shadow-solid">
            {{ siteContent.home?.opportunitiesDesc || 'Vagas, subsídios e bolsas para lideranças que constroem a base e não apenas a marca. Atualizado pela nossa rede.' }}
          </p>
        </div>
        
        <div class="grid-opps-list gap-6 flex-col">
          <router-link v-for="(opp, idx) in displayOpportunities" :key="opp.id" :to="`/oportunidades/${opp.id}`" class="opp-item-brutalist group border-dark bg-white flex-col sm-flex-row justify-between no-underline transition-all" style="display: flex;">
            <div class="opp-content p-6 md-p-8 flex-1">
              <div class="flex-center-left gap-3 mb-4">
                <div class="tag text-dark font-sans font-bold uppercase tracking-widest" :class="idx % 2 === 0 ? 'pink-bg rounded-full' : 'blue-bg'">{{ opp.category }}</div>
              </div>
              <h4 class="font-display text-3xl uppercase tracking-tighter leading-tight text-dark mb-2 group-hover:text-red transition-colors">{{ opp.title }}</h4>
              <p class="font-sans font-semibold mt-2 opacity-80 text-dark">{{ opp.description }}</p>
            </div>
            <div class="opp-action flex-col items-center justify-center border-t-dark sm-border-t-0 sm-border-l-dark p-6 md-p-8 bg-light group-hover:bg-yellow transition-colors shrink-0" style="display: flex;">
              <div class="font-sans font-black text-xs uppercase tracking-widest text-dark mb-2 opacity-60">PRAZO</div>
              <div class="font-display text-xl uppercase text-dark text-center">{{ opp.deadline }}</div>
              <div class="mt-4 text-dark opacity-0 group-hover:opacity-100 transition-opacity flex items-center font-black text-xs uppercase">
                Ver Detalhes <ArrowRight :size="16" class="ml-1" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SERVICES / EIXOS DE AÇÃO (PREMIUM DARK UI) -->
    <section id="services" class="bg-dark py-48 px-6 md-px-12 text-light relative overflow-hidden" style="z-index: 10;">
      <!-- Grid Background -->
      <div class="absolute inset-0 opacity-10 grid-pattern-bg"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-32 flex flex-col items-center">
          <h2 class="font-display text-5xl md-text-7xl uppercase tracking-tighter leading-none inline-block text-center text-white">
            {{ siteContent.home?.eixosTitle || 'NOSSOS' }} <span class="text-yellow">{{ siteContent.home?.eixosSubtitle || 'EIXOS DE AÇÃO' }}</span>
          </h2>
        </div>

        <!-- BRUTALIST 3-GRID -->
        <div class="grid-services-brutalist mb-24">
          <router-link 
            v-for="(service, idx) in displayServices.slice(0, 3)" 
            :key="idx" 
            :to="service.link || '/servicos'" 
            :class="['service-card-brutalist group', idx === 0 ? 'card-pink' : idx === 1 ? 'card-lime' : 'card-blue']"
          >
            <div class="service-icon-box mb-8 transition-colors" :class="service.textClass"><component :is="service.icon" :size="48" /></div>
            <h3 class="font-display text-3xl md-text-4xl uppercase mb-6 leading-none text-white transition-colors">{{ service.title }}</h3>
            <p class="font-sans font-bold opacity-80 text-base leading-relaxed mb-10 text-white transition-colors">{{ service.description }}</p>
            <div class="brutalist-link-action mt-auto flex-between items-center text-white opacity-60 transition-all font-sans font-black text-sm uppercase tracking-widest">
              <span>EXPLORAR</span>
              <ArrowRight :size="24" class="transform group-hover:translate-x-2 transition-transform" />
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="bg-blue-primary py-24 px-6 md-px-12" style="z-index: 10; position: relative;">
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
          <form @submit.prevent="handleNewsletter" class="flex-col gap-4 relative z-10 bg-white border-dark-4" style="padding: 2.5rem;">
             <div v-if="nlSuccess" class="bg-lime p-4 border-dark-4 text-center font-black text-dark mb-4 uppercase tracking-widest text-xs">
               Você agora receberá nossas atualizações!
             </div>
             <input 
               type="email" 
               v-model="nlEmail"
               required
               :placeholder="siteContent.home?.newsletterPlaceholder || 'Digite seu email...'" 
               class="w-full bg-light px-6 py-4 font-sans font-bold text-lg text-dark focus-outline transition-colors nl-input"
               style="border: 4px solid #1C1C1C;"
             />
             <button type="submit" class="btn-red w-full" style="border: 4px solid #1C1C1C; padding: 1rem 1.5rem; justify-content: flex-start; font-size: 1rem;">{{ siteContent.home?.newsletterButton || 'QUERO FAZER PARTE' }}</button>
             
             <!-- FRASE CLICÁVEL -->
             <div class="mt-6 text-center">
                <router-link to="/arquivo-newsletter" class="nl-archive-link">
                   Quer ler nossas últimas edições antes de assinar? <span class="underline">Clique aqui →</span>
                </router-link>
             </div>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, Globe, Users, Zap, Sun, Database, ShieldCheck, Mic2, Cpu } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const servicesIcons = { Globe, Users, Zap, Database, ShieldCheck, Mic2, Cpu }

const nlSuccess = ref(false)
const nlEmail = ref('')
const selectedTab = ref('TODOS')

const handleNewsletter = () => {
  if (nlEmail.value) {
    nlSuccess.value = true
    nlEmail.value = ''
    setTimeout(() => { nlSuccess.value = false }, 5000)
  }
}

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
    category: "MOBILIZAÇÃO",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800",
    date: "2026-04-18"
  },
  {
    id: 2,
    title: "Como estruturar um sindicato local no modelo 2026",
    excerpt: "A nova onda de sindicalismo que está transformando a relação entre capital e trabalho nas cidades.",
    category: "EDUCAÇÃO",
    image: "",
    date: "2026-04-15"
  },
  {
    id: 3,
    title: "A geopolítica da descarbonização nos países em desenvolvimento",
    excerpt: "Como o sul global está liderando e sofrendo com a transição energética global.",
    category: "CLIMA",
    image: "",
    date: "2026-04-10"
  }
]

const displayPosts = computed(() => {
  return siteContent.posts && siteContent.posts.length > 0 ? siteContent.posts : mockPosts
})

const filteredPosts = computed(() => {
  if (selectedTab.value === 'TODOS') return displayPosts.value
  return displayPosts.value.filter(post => post.category?.toUpperCase() === selectedTab.value)
})

const featuredArticle = computed(() => {
  return displayPosts.value.length > 0 ? displayPosts.value[0] : null
})

const secondaryArticles = computed(() => {
  return displayPosts.value.length > 1 ? displayPosts.value.slice(1, 3) : []
})

const defaultServices = [
  { title: 'Escola de Formação', description: 'Cursos e materiais para desenvolvimento de novas lideranças comunitárias.', icon: Users, textClass: 'text-pink', link: '/trilhas' },
  { title: 'Incidência Política', description: 'Acompanhamento legislativo e construção de campanhas de pressão pública.', icon: Globe, textClass: 'text-lime', link: '/oportunidades' },
  { title: 'Apoio a Territórios', description: 'Suporte logístico e intelectual para movimentos sociais na linha de frente.', icon: Zap, textClass: 'text-blue', link: '/servicos' },
  { title: 'Pesquisa & Dados', description: 'Produção de conhecimento estratégico, mapeamento de atores e análise de conjuntura.', icon: Database, textClass: 'text-yellow', link: '/biblioteca' }
]
const displayServices = computed(() => siteContent.services?.length ? siteContent.services : defaultServices)
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
.py-32 { padding-top: 8rem; padding-bottom: 8rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.p-8 { padding: 2rem; }
.p-6 { padding: 1.5rem; }
.pb-32 { padding-bottom: 8rem; }
.mb-16 { margin-bottom: 4rem; }
.mb-24 { margin-bottom: 6rem; }
.mb-12 { margin-bottom: 3rem; }
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
.text-7xl { font-size: 4.5rem; }
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
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
.activist-gradient { background: linear-gradient(110deg, #A80022 0%, #DF2028 35%, #A4CD39 75%, #1D976C 100%); }
.border-hero-bottom { border-bottom: 6px solid #1C1C1C; }

.hero-content {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center;
  flex-grow: 1; max-width: 80rem; margin: 0 auto; width: 100%;
}
.hero-title { 
  font-size: 16vw; 
  line-height: 1.1;
  margin-bottom: 1.5rem; 
  text-align: left;
  transform: translate(-10%, -15%);
}
.hero-title span {
  display: block;
  margin-top: 0.1em;
  padding-left: 0.8em;
}
@media (min-width: 768px) { 
  .hero-title { 
    font-size: 11vw; 
    line-height: 1.05;
    transform: translate(-15%, -20%);
  } 
  .hero-title span {
    padding-left: 1.2em;
  }
}

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

/* BUTTONS */
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
  padding: 2.2rem 0;
}
.border-marquee-bottom { border-bottom: 6px solid #1C1C1C; }
.marquee-track { display: flex; white-space: nowrap; animation: marquee-scroll 25s linear infinite; }
.marquee-item-rel { 
  display: inline-flex; 
  align-items: center; 
  padding-left: 2rem; 
  padding-right: 4rem;
  white-space: nowrap; 
  position: relative;
}
.sun-container-abs {
  position: absolute;
  right: 0;
  width: 4rem;
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
.grid-opps { display: grid; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .grid-opps { grid-template-columns: repeat(12, minmax(0, 1fr)); } .grid-opps > div:first-child { grid-column: span 4 / span 4; } .grid-opps > div:last-child { grid-column: span 8 / span 8; } }
.opp-item:hover { transform: translateY(-4px); box-shadow: 8px 8px 0px #1C1C1C; }
.bg-gradient-hover { background-image: linear-gradient(to right, transparent, transparent); background-size: 100% 12px; background-repeat: no-repeat; background-position: bottom; }
.opp-item:hover .bg-gradient-hover { background-image: linear-gradient(to right, #FFE65A, #FFE65A); }
.opp-item:hover .opp-deadline { background-color: #1C1C1C; color: #FFFFFF; }

/* MEDIUM-LIKE BRUTALIST TABS */
.tab-medium-brutalist {
  background: transparent;
  border: none;
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1C1C1C;
  opacity: 0.4;
  cursor: pointer;
  padding: 0.5rem 1rem 1rem 1rem;
  position: relative;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-medium-brutalist:hover { opacity: 0.8; }
.tab-medium-brutalist.active-tab { opacity: 1; }
.tab-medium-brutalist.active-tab::after {
  content: '';
  position: absolute;
  bottom: -4px; /* matches border-b-dark */
  left: 0;
  width: 100%;
  height: 4px;
  background: #1C1C1C;
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* SERVICES BRUTALIST 3 GRID */
.grid-services-brutalist {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 1024px) {
  .grid-services-brutalist { grid-template-columns: repeat(3, 1fr); }
}
.service-card-brutalist {
  background: transparent;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.2);
}

/* BACKGROUND PATTERNS */
.grid-pattern-bg {
  background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.grid-pattern-light {
  background-image: radial-gradient(circle at center, rgba(0,0,0,0.08) 2px, transparent 2px);
  background-size: 24px 24px;
}

/* Card Specific Colors */
.card-pink { border-color: #FF6BCA; }
.card-pink:hover { background-color: #FF6BCA; }

.card-lime { border-color: #A4CD39; }
.card-lime:hover { background-color: #A4CD39; }

.card-blue { border-color: #3D78E0; }
.card-blue:hover { background-color: #3D78E0; }

.service-card-brutalist:hover h3, 
.service-card-brutalist:hover p, 
.service-card-brutalist:hover .brutalist-link-action,
.service-card-brutalist:hover .service-icon-box {
  color: #1C1C1C !important;
  opacity: 1;
}

/* OPPORTUNITIES REWORK */
.opp-item-brutalist:hover {
  transform: translateY(-4px);
  box-shadow: 8px 8px 0px #1C1C1C;
}
.group-hover\:text-red:hover { color: #DF2028; }
.group-hover\:bg-yellow:hover { background-color: #FFE65A; }
.group-hover\:opacity-100:hover { opacity: 1; }
.sm-border-l-dark { border-left: none; }
.sm-border-t-0 { border-top: 4px solid #1C1C1C; }
@media (min-width: 640px) {
  .sm-border-l-dark { border-left: 4px solid #1C1C1C; }
  .sm-border-t-0 { border-top: none; }
}

/* NEWSLETTER */
.nl-input { border: 4px solid #1C1C1C; }
.nl-archive-link {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 13px;
  color: #1C1C1C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  opacity: 0.7;
  transition: 0.2s;
  display: inline-block;
  cursor: pointer;
}
.nl-archive-link:hover {
  opacity: 1;
  color: #DF2028;
  transform: scale(1.02);
}
.focus-outline:focus { outline: none; background-color: #FFFFFF; }

/* RESPONSIVE UTILS */
@media (max-width: 768px) {
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