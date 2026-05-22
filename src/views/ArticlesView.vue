<script setup>
import { ref, computed } from 'vue'
import { siteContent, filterPublicPosts } from '../store/content'
import { Search, Mail, Filter } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('Tudo')
const emailNewsletter = ref('')

const mockPosts = [
  { 
    id: 'm1', 
    title: "Democracia - O Custo Oculto da Desinformação", 
    excerpt: "Como as campanhas de desinformação afetam não apenas o resultado nas urnas, mas também o tecido social e a confiança nas instituições democráticas brasileiras.", 
    category: "DEMOCRACIA",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80",
    date: "12 OUTUBRO 2024"
  },
  { 
    id: 'm2', 
    title: "Economia e Desigualdade Tributária", 
    excerpt: "Por que quem ganha menos acaba pagando proporcionalmente mais impostos no Brasil e como a reforma tributária pode mudar esse cenário.", 
    category: "ECONOMIA",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80",
    date: "05 SETEMBRO 2024"
  },
  { 
    id: 'm3', 
    title: "Lideranças Femininas: Ocupar para Transformar", 
    excerpt: "A importância de ter mulheres em cargos de decisão e os desafios enfrentados no ambiente político institucional.", 
    category: "GÊNERO",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80",
    date: "28 AGOSTO 2024"
  },
  { 
    id: 'm4', 
    title: "Orçamento Secreto e Transparência", 
    excerpt: "Entenda o impacto das emendas parlamentares na governabilidade e o que está em jogo na suprema corte.", 
    category: "BRASÍLIA",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    date: "15 AGOSTO 2024"
  }
]

const allPosts = computed(() => {
  const posts = filterPublicPosts(siteContent.posts || [])
  return posts.length > 0 ? posts : mockPosts
})
const featuredPost = computed(() => allPosts.value[0])
const secondRowPosts = computed(() => allPosts.value.slice(1, 3))
const bannerPost = computed(() => allPosts.value[3])
const otherPosts = computed(() => allPosts.value.slice(4))
</script>

<template>
  <div class="articles-view bg-surface-container pb-section">
    <!-- Header Section -->
    <header class="art-header container-max mb-12">
      <div class="art-header-left">
        <h1 class="art-title">ARTIGOS</h1>
        <p class="art-subtitle">
          Análises profundas, dados concretos e perspectivas sobre o cenário político e social brasileiro.
        </p>
      </div>

      <div class="art-header-right">
        <div class="art-filters-row">
          <button class="pill-badge pill-black">2025</button>
          <button class="pill-badge pill-white filter-btn">FILTROS <Filter :size="12" /></button>
        </div>
        <div class="art-search-box paper-shadow">
          <input type="text" placeholder="Pesquisar artigos..." class="art-search-input" />
          <button class="art-search-btn">
            <Search :size="18" class="text-white" />
          </button>
        </div>
      </div>
    </header>

    <main class="container-max art-main-grid">
      
      <!-- Left Column (Grid-8) -->
      <div class="art-col-left">
        
        <!-- Featured Post -->
        <router-link v-if="featuredPost" :to="`/conteudo/${featuredPost.id}`" class="art-featured-card paper-shadow">
          <div class="featured-shadow-decor"></div>
          
          <div class="featured-inner">
            <div class="featured-image-box">
              <span class="featured-badge border-primary">DEMOCRACIA</span>
              <img :src="featuredPost.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80'" class="featured-img" alt="Cover" />
            </div>
            
            <div class="featured-content">
              <div class="featured-corner-decor"></div>
              
              <div>
                <span class="art-date">12 OUTUBRO 2024</span>
                <h2 class="featured-title">
                  {{ featuredPost.title }}
                </h2>
                <p class="art-excerpt line-clamp-3">
                  {{ featuredPost.excerpt || 'Como as campanhas de desinformação afetam não apenas o resultado nas urnas, mas também o tecido social e a confiança...' }}
                </p>
              </div>
              
              <div class="featured-footer">
                <span class="art-read-more border-b-thick">
                  LER ARTIGO COMPLETO <span class="material-symbols-outlined text-sm pt-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Second Row (2 posts) -->
        <div class="art-second-row">
          <router-link v-for="(post, index) in secondRowPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="art-small-card paper-shadow">
            <div class="small-card-image-box">
              <span class="small-badge border-primary text-preto" :class="index === 0 ? 'bg-verde' : 'bg-rosa text-white'">
                {{ index === 0 ? 'ECONOMIA' : 'GÊNERO' }}
              </span>
              <img :src="post.image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80'" class="small-img" alt="Cover" />
            </div>
            
            <div class="small-card-content">
              <span class="art-date">05 SETEMBRO 2024</span>
              <h3 class="small-card-title">
                {{ post.title }}
              </h3>
              <p class="art-excerpt line-clamp-2 mt-auto">
                {{ post.excerpt || 'Por que quem ganha menos acaba pagando proporcionalmente mais impostos no Brasil.' }}
              </p>
            </div>
          </router-link>
        </div>

        <!-- Horizontal Dark Banner -->
        <router-link v-if="bannerPost" :to="`/conteudo/${bannerPost.id}`" class="art-banner-card paper-shadow">
          <div class="banner-decor-left"></div>
          
          <div class="banner-content-left">
            <span class="art-date text-amarelo">ORÇAMENTO SECRETO</span>
            <h3 class="banner-title text-white">
              {{ bannerPost.title }}
            </h3>
          </div>
          
          <div class="banner-content-right">
            <p class="banner-excerpt">
              {{ bannerPost.excerpt || 'Um raio-X nas emendas RP9 e como a falta de clareza sobre o destino dos recursos afeta o desenvolvimento de políticas estruturantes no país.' }}
            </p>
            <div class="banner-footer">
              <span class="banner-date">10 JULHO 2024</span>
              <span class="banner-btn">
                LER ANÁLISE
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Right Column (Grid-4) -->
      <aside class="art-col-right">
        
        <!-- Temas Populares -->
        <div class="art-topics-box paper-shadow">
          <div class="topics-corner-decor border-thick"></div>
          
          <h3 class="side-title border-b-thick">TEMAS POPULARES</h3>
          
          <div class="topics-list">
            <span class="topic-pill bg-verde border-thick">ECONOMIA</span>
            <span class="topic-pill bg-rosa text-white border-thick">GÊNERO</span>
            <span class="topic-pill bg-azul text-white border-thick">DEMOCRACIA</span>
            <span class="topic-pill bg-amarelo border-thick">TRANSPARÊNCIA</span>
            <span class="topic-pill bg-white border-thick">MEIO AMBIENTE</span>
            <span class="topic-pill bg-white border-thick">POLÍTICA URBANA</span>
          </div>
        </div>

        <!-- Newsletter sidebar -->
        <div class="art-newsletter-premium-v4 bg-preto text-white paper-shadow-lg border-thick relative overflow-hidden">
          <div class="nl-texture-grid-v4"></div>
          
          <div class="relative z-10 p-10 flex flex-col items-center text-center">
             <div class="proof-icon-box bg-rosa mb-8 shadow-solid">
                <Mail :size="32" class="text-preto" />
             </div>
             
             <h3 class="headline-md mb-6 text-white uppercase tracking-tighter leading-none">NEWSLETTER <br><span class="text-amarelo">NARRATIVA</span></h3>
             <p class="body-sm text-white opacity-90 mb-10 font-bold leading-relaxed max-w-[240px]">
               Receba inteligência política e curadoria estratégica diretamente na sua rede.
             </p>
             
             <div class="substack-sidebar-action w-full">
                <a href="https://substack.com/@narrativapolitica" target="_blank" class="btn-brutal btn-amarelo w-full py-5 paper-shadow-sm uppercase font-black tracking-widest block text-center text-sm hover-white-shadow">
                  ASSINAR NO SUBSTACK
                </a>
                <p class="text-[10px] font-black uppercase text-white opacity-40 mt-6 tracking-widest">Link oficial Substack</p>
             </div>
          </div>
        </div>

        <!-- Quote -->
        <div class="art-quote-box">
          <div class="quote-bar bg-vermelho"></div>
          <p class="quote-text">
            "A transparência não é um favor do Estado, é um direito de quem o financia."
          </p>
        </div>
        
      </aside>

    </main>
  </div>
</template>

<style scoped>
/* VARIABLES SPECIFIC */
:root {
  --surface-bg: #f1edec;
  --surface-alt: #fdf8f8;
  --surface-dim: #ddd9d8;
}

.text-white { color: #fff; }
.text-preto { color: var(--np-black); }
.text-amarelo { color: var(--np-amarelo); }
.bg-vermelho { background-color: var(--np-vermelho); }
.bg-amarelo { background-color: var(--np-amarelo); }
.bg-rosa { background-color: var(--np-rosa); }
.bg-azul { background-color: var(--np-azul); }
.bg-verde { background-color: var(--np-verde); }
.bg-white { background-color: #fff; }
.border-primary { border-color: var(--np-black); }
.border-thick { border: var(--border-thick); }
.border-b-thick { border-bottom: var(--border-thick); }

.articles-view {
  background-color: #fcf9f8;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* HEADER */
.art-header {
  padding-top: 64px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: var(--border-thick);
  margin-bottom: 48px;
}
@media (min-width: 768px) {
  .art-header { flex-direction: row; align-items: flex-end; }
}

.art-title {
  font-family: var(--font-display);
  font-size: clamp(60px, 8vw, 100px);
  line-height: 0.85;
  color: var(--np-black);
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: -2px;
  margin: 0;
}
.art-subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  color: #444748;
  margin-top: 16px;
  max-width: 480px;
}

.art-header-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}
@media (min-width: 768px) {
  .art-header-right { margin-top: 0; width: 320px; }
}

.art-filters-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.pill-badge {
  border: var(--border-thick);
  border-radius: 99px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
}
.pill-black { background: var(--np-black); color: #fff; }
.pill-white { background: #fff; color: var(--np-black); }
.filter-btn { display: flex; align-items: center; gap: 4px; }

.art-search-box {
  display: flex;
  height: 40px;
  border: var(--border-thick);
  background: #fff;
}
.art-search-input {
  flex: 1;
  border: none;
  padding: 0 12px;
  outline: none;
  font-family: var(--font-sans);
  font-size: 14px;
}
.art-search-btn {
  background: var(--np-vermelho);
  border-left: var(--border-thick);
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* MAIN GRID */
.art-main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 1024px) {
  .art-main-grid { grid-template-columns: 8fr 4fr; }
}

.art-col-left { display: flex; flex-direction: column; gap: 32px; }
.art-col-right { display: flex; flex-direction: column; gap: 32px; }

/* SHARED */
.art-date {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #868381;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}
.art-excerpt {
  font-family: var(--font-sans);
  font-size: 16px;
  color: #444748;
  opacity: 0.9;
  line-height: 1.5;
}
/* line-clamp handled globally */

/* FEATURED POST */
.art-featured-card {
  display: block;
  border: var(--border-thick);
  background: #fdf8f8;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.art-featured-card:hover { transform: translateY(-4px); }
.featured-shadow-decor {
  position: absolute; left: -2px; bottom: -8px; 
  width: 100%; height: 100%;
  border-bottom: 4px solid var(--np-vermelho);
  border-right: 4px solid var(--np-vermelho);
  pointer-events: none;
}
.featured-inner { display: flex; flex-direction: column; height: 100%; }
@media (min-width: 768px) {
  .featured-inner { flex-direction: row; }
}
.featured-image-box {
  position: relative;
  border-bottom: var(--border-thick);
  background: #ddd9d8;
  min-height: 300px;
}
@media (min-width: 768px) {
  .featured-image-box { width: 50%; border-bottom: none; border-right: var(--border-thick); }
}
.featured-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--np-azul); color: #fff;
  font-family: var(--font-sans); font-size: 10px; font-weight: 700;
  padding: 4px 12px; border-radius: 99px; z-index: 10;
  border: var(--border-thick);
}
.featured-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.25); mix-blend-mode: multiply; position: absolute; top: 0; left: 0; transition: all 0.3s ease; }
.art-featured-card:hover .featured-img { filter: none; mix-blend-mode: normal; }
.featured-content {
  padding: 32px; background: #fff; position: relative;
  display: flex; flex-direction: column; justify-content: space-between;
}
@media (min-width: 768px) {
  .featured-content { width: 50%; }
}
.featured-corner-decor {
  position: absolute; top: 0; right: 0;
  width: 32px; height: 32px; background: var(--np-amarelo);
  border-bottom: var(--border-thick); border-left: var(--border-thick);
}
.featured-title {
  font-family: var(--font-display); font-size: 44px; line-height: 1; font-weight: 800;
  color: var(--np-black); text-transform: uppercase; margin-bottom: 16px; padding-right: 24px;
}
.featured-footer { margin-top: 32px; }
.art-read-more {
  font-family: var(--font-sans); font-size: 12px; font-weight: 700; text-transform: uppercase;
  color: var(--np-black); padding-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;
  border-bottom-color: var(--np-vermelho); transition: color 0.2s;
}
.art-featured-card:hover .art-read-more { color: var(--np-vermelho); }

/* SECOND ROW */
.art-second-row { display: grid; grid-template-columns: 1fr; gap: 32px; }
@media (min-width: 768px) {
  .art-second-row { grid-template-columns: 1fr 1fr; }
}
.art-small-card {
  display: flex; flex-direction: column; border: var(--border-thick); background: #fff; text-decoration: none; color: inherit; transition: transform 0.2s;
}
.art-small-card:hover { transform: translateY(-4px); }
.small-card-image-box {
  height: 192px; position: relative; border-bottom: var(--border-thick); background: #ddd9d8;
}
.small-badge {
  position: absolute; top: 16px; left: 16px;
  font-family: var(--font-sans); font-size: 10px; font-weight: 700;
  padding: 4px 12px; border-radius: 99px; z-index: 10;
}
.small-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.25); mix-blend-mode: multiply; transition: all 0.3s ease; }
.art-small-card:hover .small-img { filter: none; mix-blend-mode: normal; }
.small-card-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
.small-card-title {
  font-family: var(--font-display); font-size: 28px; line-height: 1.1; font-weight: 800;
  color: var(--np-black); text-transform: uppercase; margin-bottom: 12px;
}
.art-small-card .art-excerpt { font-size: 14px; margin-top: auto; }

/* BANNER */
.art-banner-card {
  display: flex; flex-direction: column;
  border: var(--border-thick); background: #1c1b1a; color: #fff;
  text-decoration: none; transition: transform 0.2s;
  padding: 32px; position: relative; overflow: hidden; gap: 24px;
}
@media (min-width: 768px) {
  .art-banner-card { flex-direction: row; align-items: center; }
}
.art-banner-card:hover { transform: translateY(-4px); }
.banner-decor-left {
  position: absolute; left: 24px; top: 24px; bottom: 24px; width: 4px; background: var(--np-amarelo);
}
.banner-content-left { padding-left: 24px; }
@media (min-width: 768px) {
  .banner-content-left { width: 42%; }
}
.banner-title {
  font-family: var(--font-display); font-size: 36px; line-height: 1; font-weight: 800;
  text-transform: uppercase; color: #fff; margin: 0; padding-right: 16px;
}
@media (min-width: 768px) {
  .banner-content-right {
    width: 58%; border-left: 1px solid #5f5e5e; padding-left: 24px;
    display: flex; flex-direction: column; justify-content: space-between; align-self: stretch;
  }
}
.banner-excerpt {
  font-family: var(--font-sans); font-size: 14px; color: #f1edec; opacity: 0.8; margin-bottom: 24px; margin-top: 16px;
}
@media (min-width: 768px) { .banner-excerpt { margin-top: 0; } }
.banner-footer { display: flex; justify-content: space-between; align-items: flex-end; }
.banner-date {
  font-family: var(--font-sans); font-size: 9px; font-weight: 700; letter-spacing: 0.2em; color: #e5e2e1; text-transform: uppercase;
}
.banner-btn {
  background: #fff; color: var(--np-black); font-family: var(--font-sans); font-size: 10px; font-weight: 700;
  padding: 8px 16px; text-transform: uppercase; border: var(--border-thick);
}

/* RIGHT COLUMN */
.art-topics-box {
  background: #fff; border: var(--border-thick); padding: 24px; position: relative;
}
.topics-corner-decor {
  position: absolute; top: -16px; right: -16px; width: 32px; height: 32px;
  background: var(--np-rosa); transform: rotate(12deg);
}
.side-title {
  font-family: var(--font-display); font-size: 24px; font-weight: 800; text-transform: uppercase;
  color: var(--np-black); padding-bottom: 8px; margin-bottom: 24px;
}
.topics-list { display: flex; flex-wrap: wrap; gap: 8px; }
.topic-pill {
  border-radius: 99px; font-family: var(--font-sans); font-size: 10px; font-weight: 700; text-transform: uppercase;
  padding: 4px 12px;
}

.art-newsletter-box {
  background: #fff; border: var(--border-thick); padding: 24px;
  position: relative; text-align: center; margin-top: 16px;
}
.news-corner-top {
  position: absolute; top: 0; left: 0; width: 64px; height: 64px;
  background: var(--np-amarelo); border-bottom: var(--border-thick); border-right: var(--border-thick);
  mix-blend-mode: multiply;
}
.news-corner-bottom {
  position: absolute; bottom: 0; right: 0; width: 48px; height: 48px;
  background: var(--np-vermelho); clip-path: polygon(100% 0, 100% 100%, 0 100%);
}
.art-newsletter-box .side-title { margin-bottom: 8px; }
.news-desc {
  font-family: var(--font-sans); font-size: 12px; color: #444748; margin-bottom: 24px; padding: 0 16px;
}
.news-form {
  position: relative; z-index: 10; width: 100%; padding-bottom: 16px;
}
.news-input {
  width: 100%; background: #f1edec; padding: 12px; margin-bottom: 8px;
  font-family: var(--font-sans); font-size: 14px; text-align: center; outline: none;
}
.news-input:focus { background: #fff; }
.news-submit {
  width: 100%; background: var(--np-black); color: #fff;
  font-family: var(--font-sans); font-size: 14px; font-weight: 700; text-transform: uppercase;
  padding: 12px; cursor: pointer; transition: background 0.2s;
}
.news-submit:hover { background: var(--np-vermelho); }
.news-disclaimer {
  font-family: var(--font-sans); font-size: 9px; color: #444748; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px;
}

.input-brutal {
  padding: 12px;
  border: var(--border-thick);
  font-family: var(--font-sans);
  font-size: 14px;
  outline: none;
}
.input-brutal:focus { background: var(--np-creme); }

/* NEWSLETTER V4 SIDEBAR */
.art-newsletter-premium-v4 {
  position: relative;
  overflow: hidden;
}

.nl-texture-grid-v4 {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
  pointer-events: none;
}

.proof-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: var(--border-thin);
  display: flex;
  align-items: center;
  justify-content: center;
}

.headline-md {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}

.btn-amarelo {
  background: var(--np-amarelo);
  color: var(--np-black);
}
.btn-amarelo:hover {
  background: white;
}

.art-quote-box {
  margin-top: 32px; display: flex; gap: 16px; padding-right: 16px; padding-left: 8px;
}
.quote-bar { width: 6px; flex-shrink: 0; }
.quote-text {
  font-family: var(--font-sans); font-size: 18px; font-style: italic; color: #444748; line-height: 1.4;
}

/* ── RESPONSIVE V4 ───────────────────────────── */
@media (max-width: 1023px) {
  .art-main-grid { grid-template-columns: 1fr; gap: 64px; }
  .art-title { font-size: 60px; }
  .art-header-right { width: 100%; }
}

@media (max-width: 767px) {
  .section-padding { padding: 60px 0; }
  .art-header { margin-bottom: 32px; }
  .art-title { font-size: 48px; }
  .featured-title { font-size: 32px; }
  .featured-image-box { min-height: 240px; }
  .small-card-title { font-size: 24px; }
  .banner-title { font-size: 28px; }
  .art-newsletter-premium-v4 .relative.z-10 { padding: 32px 20px !important; }
  .headline-md { font-size: 28px; }
}
</style>
