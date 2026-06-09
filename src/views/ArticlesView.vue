<script setup>
import { ref, computed } from 'vue'
import { siteContent, filterPublicPosts } from '../store/content'
import { Search, Mail, Filter } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('Tudo')
const currentPage = ref(1)
const itemsPerPage = 4

const categories = ['Tudo', 'DEMOCRACIA', 'ECONOMIA', 'GÊNERO', 'BRASÍLIA', 'TRANSPARÊNCIA', 'MEIO AMBIENTE', 'POLÍTICA URBANA']

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

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    
    const day = date.getDate()
    const months = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day} ${month} ${year}`
  } catch {
    return dateStr
  }
}

const filteredPosts = computed(() => {
  let posts = filterPublicPosts(siteContent.posts || [])
  if (posts.length === 0) posts = mockPosts

  const query = searchQuery.value.toLowerCase()
  return posts.filter(post => {
    const matchesSearch = (post.title || '').toLowerCase().includes(query) || 
                          (post.excerpt && post.excerpt.toLowerCase().includes(query))
    const matchesCategory = selectedCategory.value === 'Tudo' || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const featuredPosts = computed(() => {
  if (currentPage.value !== 1) return []
  return filteredPosts.value.slice(0, 3)
})

const paginatedPosts = computed(() => {
  // If on page 1, skip the first 3 featured posts
  // If on page 2+, skip the 3 featured + (page-2)*itemsPerPage
  const offset = currentPage.value === 1 ? 3 : 3 + (currentPage.value - 2) * itemsPerPage
  return filteredPosts.value.slice(offset, offset + itemsPerPage)
})

const totalPages = computed(() => {
  const total = filteredPosts.value.length
  if (total <= 3) return 1
  return 1 + Math.ceil((total - 3) / itemsPerPage)
})

const setPage = (p) => {
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
          <input 
            type="text" 
            placeholder="Pesquisar artigos..." 
            class="art-search-input" 
            v-model="searchQuery"
          />
          <button class="art-search-btn">
            <Search :size="18" class="text-white" />
          </button>
        </div>
      </div>
    </header>

    <main class="container-max art-main-grid">

      <!-- Left Column (Grid-8) -->
      <div class="art-col-left">

        <!-- FEATURED POSTS (Large, Top 3) -->
        <div class="art-featured-grid" v-if="featuredPosts.length > 0">
          <router-link v-for="post in featuredPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="art-large-card paper-shadow">
            <div class="large-card-image-box">
              <span class="large-badge">{{ post.category || 'ARTIGO' }}</span>
              <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80'" class="large-img" alt="Cover" />
            </div>
            <div class="large-card-content">
              <span class="art-date">{{ formatDate(post.date) }}</span>
              <h3 class="large-card-title">{{ post.title }}</h3>
              <p class="art-excerpt line-clamp-3 mt-auto">{{ post.excerpt }}</p>
              <div class="large-card-footer">
                <span class="art-read-more border-b-thick">
                  LER MAIS <span class="material-symbols-outlined text-sm pt-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <div v-if="currentPage === 1 && paginatedPosts.length > 0" class="art-divider"></div>

        <!-- UNIFORM ARTICLES GRID (Smaller, rest of posts) -->
        <div class="art-uniform-grid" v-if="paginatedPosts.length">
          <router-link v-for="post in paginatedPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="art-mini-card paper-shadow">
            <div class="mini-card-image">
              <img :src="post.image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80'" alt="Cover" />
            </div>
            <div class="mini-card-content">
              <span class="mini-category">{{ post.category }}</span>
              <h4 class="mini-title">{{ post.title }}</h4>
              <span class="mini-date">{{ formatDate(post.date) }}</span>
            </div>
          </router-link>
        </div>

        <!-- PAGINATION CONTROLS -->
        <div class="art-pagination" v-if="totalPages > 1">
          <button 
            class="pag-btn paper-shadow-sm" 
            :disabled="currentPage === 1"
            @click="setPage(currentPage - 1)"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>

          <div class="pag-pages">
            <button 
              v-for="p in totalPages" 
              :key="p" 
              class="pag-page-num paper-shadow-sm"
              :class="{ active: currentPage === p }"
              @click="setPage(p)"
            >
              {{ p }}
            </button>
          </div>

          <button 
            class="pag-btn paper-shadow-sm" 
            :disabled="currentPage === totalPages"
            @click="setPage(currentPage + 1)"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="art-empty-state paper-shadow">
          <h3 class="empty-title">NENHUM ARTIGO ENCONTRADO</h3>
          <p class="empty-text">Tente ajustar seus termos de busca ou filtros.</p>
          <button @click="searchQuery = ''; selectedCategory = 'Tudo'" class="btn-brutal btn-amarelo">LIMPAR BUSCA</button>
        </div>

      </div>
      <!-- Right Column (Grid-4) -->
      <aside class="art-col-right">
        
        <!-- Temas Populares -->
        <div class="art-topics-box paper-shadow">
          <div class="topics-corner-decor border-thick"></div>
          
          <h3 class="side-title border-b-thick">TEMAS POPULARES</h3>
          
          <div class="topics-list">
            <button 
              v-for="cat in categories" 
              :key="cat"
              class="topic-pill border-thick"
              :class="selectedCategory === cat ? 'bg-preto text-white' : 'bg-white'"
              @click="selectedCategory = cat; currentPage = 1"
            >
              {{ cat }}
            </button>
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

/* UNIFORM GRID */
.art-uniform-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 640px) {
  .art-uniform-grid { grid-template-columns: 1fr 1fr; }
}

.art-mini-card {
  display: flex;
  gap: 16px;
  background: #fff;
  border: var(--border-thick);
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.art-mini-card:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow-paper); }
.mini-card-image {
  width: 100px; height: 100px; flex-shrink: 0;
  border: var(--border-thin); overflow: hidden;
  background: var(--surface-dim);
}
.mini-card-image img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.3s; }
.art-mini-card:hover .mini-card-image img { filter: none; }
.mini-card-content { display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
.mini-category { font-size: 10px; font-weight: 800; color: var(--np-vermelho); text-transform: uppercase; margin-bottom: 4px; }
.mini-title { font-family: var(--font-display); font-size: 18px; line-height: 1.1; font-weight: 800; text-transform: uppercase; margin: 0 0 8px 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.mini-date { font-size: 10px; color: #868381; font-weight: 700; }

/* PAGINATION COMPACT BOXED */
.art-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
  padding: 24px 0;
  border-top: var(--border-thick);
}
.pag-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: #fff;
  border: var(--border-thick);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--np-black);
}
.pag-btn:hover:not(:disabled) { background: var(--np-amarelo); transform: translate(-2px, -2px); }
.pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.pag-pages { display: flex; gap: 8px; }
.pag-page-num {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: var(--border-thick);
  font-family: var(--font-sans); font-size: 14px; font-weight: 900;
  background: #fff; cursor: pointer; transition: all 0.2s;
}
.pag-page-num.active { background: var(--np-black); color: #fff; transform: translate(-2px, -2px); box-shadow: 2px 2px 0 var(--np-amarelo); }
.pag-page-num:hover:not(.active) { background: var(--np-creme); transform: translate(-1px, -1px); }

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
  cursor: pointer;
  transition: all 0.2s;
}
.topic-pill:hover:not(.bg-preto) {
  background-color: var(--surface-container-high);
  transform: translate(-1px, -1px);
}

/* NEWSLETTER PREMIUM V4 */
.art-newsletter-premium-v4 {
  position: relative;
  overflow: hidden;
  background-color: var(--np-black);
  color: #fff;
  border: var(--border-thick);
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
  width: 56px; height: 56px; border-radius: 50%; border: var(--border-thin);
  display: flex; align-items: center; justify-content: center; background-color: var(--np-rosa);
}
.headline-md { font-family: var(--font-display); font-size: 32px; font-weight: 800; line-height: 1; }

/* QUOTE */
.art-quote-box {
  margin-top: 32px; display: flex; gap: 16px; padding-right: 16px; padding-left: 8px;
}
.quote-bar { width: 6px; flex-shrink: 0; }
.quote-text {
  font-family: var(--font-sans); font-size: 18px; font-style: italic; color: #444748; line-height: 1.4;
}

/* FEATURED GRID (TOP 3) */
.art-featured-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.art-large-card {
  display: flex; flex-direction: column; border: var(--border-thick); background: #fff; text-decoration: none; color: inherit; transition: transform 0.2s;
}
@media (min-width: 768px) {
  .art-large-card { flex-direction: row; }
}
.art-large-card:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-paper-lg); }
.large-card-image-box {
  position: relative; border-bottom: var(--border-thick); background: #ddd9d8; min-height: 240px;
}
@media (min-width: 768px) {
  .large-card-image-box { width: 45%; border-bottom: none; border-right: var(--border-thick); }
}
.large-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--np-black); color: #fff; border: var(--border-thick);
  font-family: var(--font-sans); font-size: 10px; font-weight: 800;
  padding: 4px 12px; border-radius: 99px; z-index: 10;
}
.large-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.25); mix-blend-mode: multiply; position: absolute; inset: 0; transition: all 0.3s ease; }
.art-large-card:hover .large-img { filter: none; mix-blend-mode: normal; }
.large-card-content { padding: 32px; display: flex; flex-direction: column; flex: 1; justify-content: space-between; }
.large-card-title {
  font-family: var(--font-display); font-size: 32px; line-height: 1.1; font-weight: 800;
  color: var(--np-black); text-transform: uppercase; margin-bottom: 16px;
}
.large-card-footer { margin-top: 32px; }
.art-read-more {
  font-family: var(--font-sans); font-size: 12px; font-weight: 800; text-transform: uppercase;
  color: var(--np-black); padding-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;
  border-bottom-color: var(--np-vermelho); transition: color 0.2s;
}
.art-large-card:hover .art-read-more { color: var(--np-vermelho); }

.art-divider {
  height: 4px;
  background-color: var(--np-black);
  margin: 48px 0;
  width: 100%;
}

/* UNIFORM GRID */

.art-empty-state {
  padding: 64px; text-align: center; background: #fff; border: var(--border-thick); margin-top: 32px;
}
.empty-title { font-family: var(--font-display); font-size: 32px; font-weight: 800; margin-bottom: 16px; }
.empty-text { font-family: var(--font-sans); color: #444748; margin-bottom: 24px; }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .art-main-grid { grid-template-columns: 1fr; gap: 64px; }
  .art-title { font-size: 60px; }
  .art-header-right { width: 100%; }
}
@media (max-width: 767px) {
  .art-header { margin-bottom: 32px; }
  .art-title { font-size: 48px; }
  .art-newsletter-premium-v4 .relative.z-10 { padding: 32px 20px !important; }
  .headline-md { font-size: 28px; }
}
</style>
