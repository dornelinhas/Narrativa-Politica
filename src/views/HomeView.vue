<template>
<div class="home">
  <!-- CSS Noise Overlay from Global -->
  
  <!-- HERO SECTION -->
  <section v-reveal class="home-hero">
    <div class="container-max home-hero-grid">
      
      <!-- Lado Esquerdo: Textos -->
      <div class="hero-left">
        <!-- Blobs (Amarelo) -->
        <div class="blob-amarelo"></div>
        
        <div class="hero-badge">
          IMPACTO & TRANSFORMAÇÃO
        </div>
        
        <h1 class="hero-title">
          {{ siteContent.home?.heroTitle || 'O HUB DE IMPACTO PARA QUEM ATUA NA' }}<br>
          <span>{{ siteContent.home?.heroTitleAccent || 'TRANSFORMAÇÃO SOCIAL.' }}</span>
        </h1>
        
        <p class="hero-subtitle">
          {{ siteContent.home?.heroSubtitle || 'Uma curadoria Narrativa para ampliar repertório crítico sobre o mundo contemporâneo, política, sociedade e gênero.' }}
        </p>
        
        <div class="hero-actions">
          <router-link to="/conteudo" class="btn-brutal btn-preto paper-shadow">EXPLORAR HUB</router-link>
          <a href="#newsletter" class="btn-brutal btn-outline paper-shadow">ASSINAR NEWSLETTER</a>
        </div>
      </div>

      <!-- Lado Direito: Imagem Grayscale Brutalista -->
      <div class="hero-right">
        <!-- Foto Central Paper-Cut -->
        <div class="hero-img-wrap paper-cut paper-shadow">
          <img :src="siteContent.home?.heroImage || 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800'" alt="Hero" class="hero-halftone" @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800'" />
        </div>
        <!-- Blobs (Verde) -->
        <div class="blob-verde"></div>
        <!-- Selo flutuante -->
        <div class="hero-floating-seal paper-shadow">
          <span class="material-symbols-outlined">campaign</span>
        </div>
      </div>

    </div>
  </section>

  <!-- MOVIMENTO SECTION (ARTICLES/POSTS) -->
  <section v-reveal class="section-padding bg-creme home-movimento pb-12">
    <div class="container-max">
      <div class="movimento-header">
        <div>
          <h2 class="display-xl m-0">Movimento</h2>
          <p class="body-lg text-variant mt-2">Destaque para impacto social e ações em andamento.</p>
        </div>
        <router-link to="/conteudo" class="movimento-link">
          VER TODAS AS AÇÕES <span class="material-symbols-outlined">arrow_forward</span>
        </router-link>
      </div>

      <!-- GRID CARDS -->
      <div class="grid-3">
        <!-- Card 1 -->
        <router-link v-if="displayPosts[0]" :to="`/conteudo/${displayPosts[0].id}`" class="card-editorial paper-shadow group">
          <div class="accent-bar-top bg-azul-bar"></div>
          <div class="card-tags">
            <span class="tag-solid bg-preto text-white">{{ displayPosts[0].category || 'MOBILIZAÇÃO' }}</span>
          </div>
          <h3 class="card-title hover-azul">{{ displayPosts[0].title }}</h3>
          <p class="card-excerpt line-clamp-3">{{ displayPosts[0].excerpt || '' }}</p>
          <div class="card-footer">
            <span class="label-bold text-preto">LER ARTIGO</span>
            <span class="material-symbols-outlined text-azul">auto_stories</span>
          </div>
        </router-link>

        <!-- Card 2 (Centro) -->
        <router-link v-if="displayPosts[1]" :to="`/conteudo/${displayPosts[1].id}`" class="card-editorial paper-shadow group card-inverted">
          <div class="accent-bar-top bg-amarelo-bar"></div>
          <div class="card-tags">
            <span class="tag-solid bg-amarelo text-preto">{{ displayPosts[1].category || 'SOCIEDADE' }}</span>
          </div>
          <h3 class="card-title hover-amarelo">{{ displayPosts[1].title }}</h3>
          <p class="card-excerpt line-clamp-3">{{ displayPosts[1].excerpt || '' }}</p>
          <div class="card-footer">
            <span class="label-bold text-preto">LER ARTIGO</span>
            <span class="material-symbols-outlined text-amarelo">diversity_3</span>
          </div>
        </router-link>

        <!-- Card 3 -->
        <router-link v-if="displayPosts[2]" :to="`/conteudo/${displayPosts[2].id}`" class="card-editorial paper-shadow group">
          <div class="accent-bar-top bg-rosa-bar"></div>
          <div class="card-tags">
            <span class="tag-solid bg-preto text-white">{{ displayPosts[2].category || 'GÊNERO' }}</span>
          </div>
          <h3 class="card-title hover-rosa">{{ displayPosts[2].title }}</h3>
          <p class="card-excerpt line-clamp-3">{{ displayPosts[2].excerpt || '' }}</p>
          <div class="card-footer">
            <span class="label-bold text-preto">LER ARTIGO</span>
            <span class="material-symbols-outlined text-rosa">female</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  <!-- ÁREAS DE ATUAÇÃO (TABBED INTERFACE) -->
  <section v-reveal id="atuacao" class="section-padding bg-white border-y-thick">
    <div class="container-max">
      <div class="atuacao-header-flex">
        <div class="atuacao-title-group">
          <h2 class="headline-lg">ÁREAS DE ATUAÇÃO</h2>
          <div class="title-underline bg-azul"></div>
        </div>
        
        <!-- ABAS (Tabs) -->
        <div class="atuacao-tabs-nav">
           <button v-for="(item, idx) in atuacaoItems" :key="idx" 
                   @click="activeAtuacao = idx"
                   class="btn-tab-brutal" :class="{ active: activeAtuacao === idx }">
             {{ item.title }}
           </button>
        </div>
      </div>

      <div class="atuacao-display-area">
        <!-- Card Ativo (Destaque) -->
        <div v-if="atuacaoItems[activeAtuacao]" class="card-atuacao-active bg-creme paper-shadow">
          
          <div class="accent-bar-top" :style="{ backgroundColor: atuacaoItems[activeAtuacao].accentColor || 'var(--np-rosa)' }"></div>
          
          <!-- Lado do Texto -->
          <div class="atuacao-main-info">
            <div class="atuacao-icon-large">
              <span class="material-symbols-outlined" :style="{ color: atuacaoItems[activeAtuacao].iconColor || 'var(--np-black)' }">
                {{ atuacaoItems[activeAtuacao].icon || 'groups' }}
              </span>
            </div>
            
            <h3 class="display-md mb-4">{{ atuacaoItems[activeAtuacao].title }}</h3>
            <p class="body-lg text-variant m-0 max-w-xl">
              {{ atuacaoItems[activeAtuacao].description }}
            </p>

            <div class="atuacao-footer-hint">
              <router-link to="/servicos" class="label-bold text-azul hover-underline">Explorar serviços nesta área →</router-link>
            </div>
          </div>

          <!-- Lado da Imagem (Halftone) -->
          <div class="atuacao-side-media">
             <img :src="atuacaoItems[activeAtuacao].image || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600'" 
                  :alt="atuacaoItems[activeAtuacao].title" 
                  class="halftone" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- OPPORTUNITIES -->
  <section v-reveal class="section-padding bg-lilas text-white border-top-thick align-radar">
    <div class="container-max opp-grid">
      <div class="opp-info">
        <span class="tag-solid bg-preto text-white">O RADAR</span>
        <h2 class="opp-title">
          {{ siteContent.home?.opportunitiesTitle || 'OPORTUNIDADES' }}
        </h2>
        <p class="opp-desc">
          {{ siteContent.home?.opportunitiesDesc || 'Vagas, bolsas e projetos para lideranças que constroem mudança social.' }}
        </p>
        <div class="opp-action">
          <router-link to="/oportunidades" class="btn-brutal btn-amarelo paper-shadow">VER TODAS AS VAGAS</router-link>
        </div>
      </div>

      <div class="opp-cards-wrapper">
        <router-link v-for="opp in displayOpportunities" :key="opp.id" :to="`/oportunidades/${opp.id}`" class="card-editorial bg-white paper-shadow opp-card">
          <div class="accent-bar-left bg-amarelo-bar"></div>
          <div class="opp-card-content">
            <div>
              <span class="tag-solid bg-verde text-preto">{{ opp.category }}</span>
              <h4 class="opp-card-title">{{ opp.title }}</h4>
              <span class="label-bold text-vermelho">PRAZO: {{ opp.deadline }}</span>
            </div>
            <span class="material-symbols-outlined text-icon-32 text-preto">arrow_outward</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER (SUBSCRIBE BLOCK) -->
  <section v-reveal id="newsletter" class="section-padding bg-amarelo border-y-thick">
    <div class="container-max">
      <div class="nl-premium-card paper-shadow-lg">
        
        <!-- LADO A: IDENTIDADE (PRETO) -->
        <div class="nl-brand-side">
           <div class="nl-texture-overlay"></div>
           <div class="nl-brand-content">
              <div class="nl-exclusive-badge">
                 <span class="tag-solid bg-vermelho text-white">CONTEÚDO EXCLUSIVO</span>
              </div>
              <h2 class="display-xl text-white uppercase leading-none mb-6">
                 NEWSLETTER <br><span class="text-amarelo">NARRATIVA</span>
              </h2>
              <p class="body-lg text-white opacity-60 font-bold max-w-sm">
                 Inteligência política, curadoria de oportunidades e análises estratégicas direto na sua caixa de entrada.
              </p>
           </div>
           
           <div class="nl-meta">
              <div class="nl-meta-icon bg-rosa">
                 <Mail :size="24" class="text-preto" />
              </div>
              <span class="label-bold text-white uppercase tracking-widest">+5.000 INSCRITOS ATIVOS</span>
           </div>
        </div>

        <!-- LADO B: AÇÃO (BRANCO) -->
        <div class="nl-action-side bg-white">
           <div class="nl-action-inner">
              <h3 class="headline-lg uppercase mb-4 text-preto">Faça parte do movimento</h3>
              <p class="body-md text-preto font-bold mb-10 leading-relaxed">
                 Junte-se à nossa rede e receba newsletters semanais sobre as frentes que estão movendo o Brasil. Inteligência direta no seu e-mail.
              </p>
              
              <!-- SUBSTACK INTEGRATION BOX -->
              <div class="substack-box-brutal border-thick bg-amarelo p-8 text-center relative overflow-hidden shadow-brutal">
                 <div class="accent-bar-top bg-preto"></div>
                 <h4 class="label-bold uppercase mb-6 text-preto tracking-widest">Assinatura Gratuita</h4>
                 
                 <a href="https://substack.com/@narrativapolitica" target="_blank" class="btn-brutal btn-preto w-full py-6 text-xl font-black uppercase flex items-center justify-center gap-4 hover-white-shadow">
                    ASSINAR NO SUBSTACK <span class="material-symbols-outlined">rocket_launch</span>
                 </a>
                 
                 <p class="text-[10px] font-black uppercase text-preto mt-6 tracking-tighter opacity-40">
                    Você será levado ao portal oficial da Narrativa Política.
                 </p>
              </div>
           </div>
           
           <div class="nl-archive-footer mt-12 pt-8 border-t-thick">
              <router-link to="/arquivo-newsletter" class="label-bold text-vermelho uppercase hover-underline flex items-center gap-2">
                 EXPLORAR EDIÇÕES ANTERIORES <span class="material-symbols-outlined">arrow_forward</span>
              </router-link>
           </div>
        </div>

      </div>
    </div>
  </section>

</div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { siteContent, filterPublicOpportunities, filterPublicPosts } from '../store/content'

const mockOps = [
  { id:1, category:"GÊNERO", title:"FORMAÇÃO EM POLÍTICAS PÚBLICAS", description:"Impacto focado em economia de gênero", deadline:"ABERTO" },
  { id:2, category:"LIDERANÇA", title:"BOLSAS PARA MULHERES EM DADOS", description:"Impacto focado em liderança stem", deadline:"ABERTO" },
  { id:3, category:"CLIMA", title:"INCIDÊNCIA CLIMÁTICA PARA JOVENS", description:"Programa de 6 meses para jovens ativistas", deadline:"15/06/2026" }
]
const mockPosts = [
  { id:1, title:"Por que o ativismo corporativo fracassa.", excerpt:"Um mergulho profundo na cooptação corporativa frente às demandas sociais.", category:"MOBILIZAÇÃO" },
  { id:2, title:"Construção de Novas Narrativas", excerpt:"Projetos focados em dar voz a comunidades marginalizadas e reescrever a história local.", category:"SOCIEDADE" },
  { id:3, title:"Liderança Feminina na Política", excerpt:"Capacitação e mentoria para mulheres que desejam ingressar na política.", category:"GÊNERO" }
]

const displayOpportunities = computed(() => {
  const all = siteContent.opportunities?.length ? filterPublicOpportunities(siteContent.opportunities) : mockOps
  let filtered = all.filter(o => o.showOnHome)
  if (!filtered.length) filtered = all.slice(0,4)
  return [...filtered].sort((a,b) => (a.featured&&!b.featured?-1:!a.featured&&b.featured?1:0)).slice(0,3)
})

const displayPosts = computed(() => {
  return filterPublicPosts(siteContent.posts?.length ? siteContent.posts : mockPosts)
})

const activeAtuacao = ref(0)
const atuacaoItems = computed(() => {
  if (siteContent.home?.atuacao && siteContent.home.atuacao.length > 0) {
    return siteContent.home.atuacao
  }
  return defaultAtuacao
})

const defaultAtuacao = [
  { title: 'GÊNERO', description: 'Análise e construção de narrativas que expõem e combatem as desigualdades estruturais, promovendo a equidade e a representatividade em todos os espaços de poder.', icon: 'groups', iconColor: 'var(--np-rosa)', accentColor: 'var(--np-rosa)' },
  { title: 'POLÍTICA', description: 'Estratégias de comunicação para campanhas, mandatos e movimentos sociais. Transformando dados e discursos em ação política concreta e engajamento popular.', icon: 'campaign', iconColor: 'var(--np-black)', accentColor: 'var(--np-amarelo)', bgColor: 'var(--np-black)', bgIcon: 'unarchive' },
  { title: 'IMPACTO SOCIAL', description: 'Consultoria e desenvolvimento de projetos para organizações que buscam gerar impacto real e mensurável nas comunidades em que atuam, unindo teoria e prática.', icon: 'public', iconColor: 'var(--np-verde)', accentColor: 'var(--np-verde)', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600' }
]
</script>

<style scoped>
/* ── LOCAL UTILS ──────────────────────────────── */
.home { background: var(--np-creme); font-family: var(--font-sans); color: var(--np-black); }
.border-top-thick { border-top: var(--border-thick); }
.border-y-thick { border-top: var(--border-thick); border-bottom: var(--border-thick); }
.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }
.text-icon-32 { font-size: 32px !important; }
.text-icon-80 { font-size: 80px !important; }

.m-0 { margin: 0; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }
.mb-2 { margin-bottom: 8px; }
.mb-4 { margin-bottom: 16px; }

.hover-underline:hover { text-decoration: underline; text-underline-offset: 4px; }

/* ── HERO SECTION ────────────────────────────── */
.home-hero {
  position: relative;
  padding: 80px 0 120px 0;
  overflow: hidden;
  border-bottom: var(--border-thick);
  background: var(--np-creme);
  z-index: 10;
}

.home-hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 32px;
}

.hero-left {
  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-block;
  background: var(--np-rosa);
  color: var(--np-white);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 13px;
  padding: 6px 16px;
  border: var(--border-thick);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transform: rotate(-2deg);
  margin-bottom: 32px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 80px;
  line-height: 0.95;
  font-weight: 800;
  color: var(--np-black);
  text-transform: uppercase;
  margin-bottom: 24px;
  letter-spacing: -1px;
}
.hero-title span { color: var(--np-black); }

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--text-variant);
  max-width: 500px;
  border-left: 4px solid var(--np-azul);
  padding-left: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
}
.btn-preto { background: var(--np-black); color: var(--np-white); }
.btn-outline { background: transparent; color: var(--np-black); }
.btn-outline:hover { background: var(--np-black); color: var(--np-white); }

.hero-right {
  position: relative;
  margin-top: 48px;
}

.hero-img-wrap {
  position: relative;
  height: 520px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  background: var(--surface-container-high);
  overflow: hidden;
  z-index: 10;
}

.hero-halftone {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.25);
  mix-blend-mode: luminosity;
}

.hero-floating-seal {
  position: absolute;
  bottom: -20px;
  left: -20px;
  z-index: 20;
  background: var(--np-vermelho);
  color: var(--np-white);
  padding: 16px;
  border: var(--border-thick);
  transform: rotate(-12deg);
}

.hero-floating-seal .material-symbols-outlined {
  font-size: 40px;
}

.blob-amarelo {
  position: absolute;
  top: -40px; left: -40px;
  width: 140px; height: 140px;
  background: var(--np-amarelo);
  border-radius: 50%;
  mix-blend-mode: multiply;
  opacity: 0.8;
  filter: blur(8px);
  z-index: -1;
}

.blob-verde {
  position: absolute;
  bottom: -20px; right: 2rem;
  width: 220px; height: 220px;
  background: var(--np-verde);
  border-radius: 50%;
  mix-blend-mode: multiply;
  opacity: 0.9;
  filter: blur(8px);
  z-index: -1;
}

/* ── MOVIMENTO SECTION ──────────────────────── */
.home-movimento { position: relative; z-index: 10; }

.movimento-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 4px solid var(--np-black);
  padding-bottom: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 16px;
}

.movimento-link {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--np-black);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.movimento-link span { font-size: 16px; }
.movimento-link:hover { text-decoration: underline; text-underline-offset: 4px; }

/* Cards */
.card-tags { margin-top: 8px; margin-bottom: 12px; }
.card-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.1;
  transition: color 0.2s;
}
.group:hover .hover-azul { color: var(--np-azul); }
.group:hover .hover-rosa { color: var(--np-rosa); }

.card-excerpt {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-variant);
  line-height: 1.5;
  flex-grow: 1;
}
.text-white-opacity { color: rgba(255,255,255,0.8) !important; }

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}

.card-inverted {
  transform: translateY(0);
}
.card-editorial:hover .card-inverted,
.card-editorial:hover {
  transform: translateY(-8px);
}

/* ── ÁREAS DE ATUAÇÃO (TABBED) ──────────────── */
.atuacao-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.title-underline {
  width: 128px;
  height: 4px;
  margin-top: 8px;
}

.atuacao-tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-tab-brutal {
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  background: var(--np-white);
  color: var(--text-variant);
  border: var(--border-thick);
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0;
}

.btn-tab-brutal:hover {
  background: var(--np-creme);
  color: var(--np-black);
}

.btn-tab-brutal.active {
  background: var(--np-black);
  color: var(--np-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-paper-sm);
}

.card-atuacao-active {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: var(--np-creme);
  border: var(--border-thick);
  position: relative;
  overflow: hidden;
  min-height: 400px;
  padding: 0 !important; /* Resetting card padding */
  transition: all 0.3s ease;
}

.atuacao-main-info {
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.atuacao-icon-large .material-symbols-outlined {
  font-size: 64px !important;
  margin-bottom: 24px;
  display: block;
}

.display-md {
  font-size: 48px;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 16px;
}

.atuacao-footer-hint {
  margin-top: 32px;
}

.atuacao-bg-icon-hint {
  position: absolute;
  bottom: -40px;
  right: -20px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.05;
}

.atuacao-bg-icon-hint .material-symbols-outlined {
  font-size: 160px;
  color: var(--np-black);
}

.atuacao-side-media {
  width: 35%;
  border-left: var(--border-thick);
  background: var(--surface-container);
  overflow: hidden;
  display: block;
}

.atuacao-side-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .atuacao-side-media { width: 40%; }
}

@media (max-width: 768px) {
  .display-md { font-size: 32px; }
  .atuacao-main-info { padding: 32px; }
  .card-atuacao-active { flex-direction: column; min-height: auto; }
  .atuacao-side-media { width: 100%; height: 250px; border-left: none; border-top: var(--border-thick); }
}

/* ── OPPORTUNITIES ──────────────────────────── */
.align-radar { position: relative; z-index: 10; }

.opp-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
}

.opp-info { padding-right: 32px; }
.opp-info .tag-solid { margin-bottom: 16px; }

.opp-title {
  font-family: var(--font-display);
  font-size: 80px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
  margin-bottom: 16px;
  text-transform: uppercase;
  color: var(--np-white);
}

.opp-desc {
  font-family: var(--font-sans);
  font-size: 18px;
  max-width: 400px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 32px;
}

.opp-cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.opp-card {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  gap: 24px;
  position: relative;
}

.opp-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.opp-card-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 8px;
  color: var(--np-black);
}

.border-t-thin { border-top: var(--border-thin); }

/* ── RESPONSIVO V4 ───────────────────────────── */
@media (max-width: 1100px) {
  .nl-premium-card { flex-direction: column; min-height: auto; }
  .nl-brand-side { padding: 48px; min-height: auto; }
  .nl-action-side { padding: 48px; }
  .nl-meta { margin-top: 32px; }
}

@media (max-width: 768px) {
  .nl-brand-side, .nl-action-side { padding: 32px; }
  .display-xl { font-size: 48px; }
  .headline-lg { font-size: 32px; }
  .substack-box-brutal { padding: 24px !important; }
}


</style>
