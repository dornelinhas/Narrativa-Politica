<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { siteContent } from '../store/content'
import { Search, ArrowRight, Newspaper, FileText, BarChart3, Mail, Zap, Clock, Share2, Bookmark } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('Tudo')
const visibleCount = ref(7)
const scrollProgress = ref(0)

const categories = computed(() => ['Tudo', ...siteContent.categories])
const allPosts = computed(() => siteContent.posts || [])

// Progress bar logic
const updateScrollProgress = () => {
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => window.addEventListener('scroll', updateScrollProgress))
onUnmounted(() => window.removeEventListener('scroll', updateScrollProgress))

const newsItems = computed(() => allPosts.value.filter(p => p.type === 'Notícia' || p.category === 'Notícias').slice(0, 5))

const articlesItems = computed(() => {
  let posts = allPosts.value.filter(p => p.type !== 'Notícia' && p.category !== 'Notícias')
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(p => p.title.toLowerCase().includes(query))
  }
  if (selectedCategory.value !== 'Tudo') {
    posts = posts.filter(p => p.category === selectedCategory.value)
  }
  return posts
})

const paginatedArticles = computed(() => articlesItems.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < articlesItems.value.length)
const loadMore = () => { visibleCount.value += 6 }

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
}

const getMarkerIcon = (type) => {
  if (type === 'Análise') return BarChart3
  if (type === 'Notícia') return Newspaper
  return FileText
}

const getMarkerColor = (type) => {
  const map = { 
    'Análise': '#FF6BCA',
    'Notícia': '#FFE65A',
    'Artigo': '#3D78E0'
  }
  return map[type] || '#A4CD39'
}

const shareArticle = (post) => {
  const url = window.location.href + '/' + post.id
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + url)}`, '_blank')
}
</script>

<template>
  <div class="articles-main-wrapper bg-light">
    <!-- PROGRESS BAR -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- GRID BACKGROUND -->
    <div class="page-grid-overlay"></div>

    <!-- HERO SECTION -->
    <section class="hero-section-fixed bg-lime relative z-10">
      <div class="container-center">
        <div class="hero-text-content">
          <div class="radar-badge-top">
            <Zap :size="14" class="text-yellow animate-pulse" />
            <span>Radar Editorial</span>
          </div>
          <h1 class="hero-main-title">
            CONTEÚDOS & <br/><span class="text-white-outline">ARTIGOS</span>
          </h1>
          <p class="hero-description">
            Explorações profundas sobre economia, poder e a infraestrutura estratégica dos movimentos sociais no Brasil.
          </p>
        </div>
      </div>
    </section>

    <!-- CONTROLS SECTION -->
    <div class="controls-section relative z-10">
      <div class="container-center">
        <div class="controls-row">
          <div class="search-bar-clean">
            <Search :size="18" class="search-icon-dim" />
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="siteContent.articlesConfig?.searchPlaceholder || 'Pesquisar...'" 
              class="search-input-raw" 
            />
          </div>
          
          <div class="filters-pills-list">
            <button 
              v-for="cat in categories" 
              :key="cat" 
              @click="selectedCategory = cat"
              class="filter-pill"
              :class="{ 'active': selectedCategory === cat }"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <main class="content-section relative z-10">
      <div class="container-center">
        <div class="main-layout-columns">
          
          <!-- ARTICLES COLUMN -->
          <div class="articles-column">
            <div class="mb-12 border-b-[4px] border-dark pb-4 inline-block">
              <h2 class="font-display uppercase text-3xl tracking-tighter">{{ siteContent.articlesConfig?.column1Title || 'ARTIGOS E ANÁLISES' }}</h2>
            </div>

            <div class="articles-grid-layout">
              <div v-for="(post, idx) in paginatedArticles" :key="post.id" 
                class="article-card-item"
                :class="{ 'featured-item': idx === 0 && !searchQuery && selectedCategory === 'Tudo' }"
              >
                <div class="premium-card group" :style="{ '--accent-color': getMarkerColor(post.type) }">
                  <div class="card-image-box">
                    <img :src="post.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'" class="card-main-img" loading="lazy" alt="Capa do Artigo" />
                    <div class="card-image-overlay"></div>
                    
                    <div class="marker-tag" :style="{ backgroundColor: getMarkerColor(post.type) }">
                      <component :is="getMarkerIcon(post.type)" :size="12" />
                      <span>{{ post.type || 'Artigo' }}</span>
                    </div>

                    <div class="card-actions-top-right">
                      <button class="action-icon-btn bookmark-btn" title="Salvar para ler depois">
                        <Bookmark :size="14" />
                      </button>
                      <button class="action-icon-btn share-btn" @click.stop.prevent="shareArticle(post)" title="Compartilhar">
                        <Share2 :size="14" />
                      </button>
                    </div>
                  </div>

                  <div class="card-body-content">
                    <div class="card-meta-row">
                      <span class="card-date-label">{{ formatDate(post.date) }}</span>
                      <div class="read-time-box">
                        <Clock :size="12" />
                        <span>5 min de leitura</span>
                      </div>
                    </div>

                    <h3 class="card-title-v3 group-hover:text-red">{{ post.title }}</h3>
                    <p class="card-excerpt-v3">{{ post.excerpt }}</p>

                    <router-link :to="`/conteudo/${post.id}`" class="cta-button-solid">
                      <span>LER AGORA</span>
                      <ArrowRight :size="16" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="hasMore" class="load-more-center">
              <button @click="loadMore" class="load-more-btn-v3">Carregar mais</button>
            </div>
          </div>

          <!-- SIDEBAR COLUMN -->
          <aside class="sidebar-column">
            <!-- Cabeçalho Notícias -->
            <div class="mb-12 border-b-[4px] border-dark pb-4 inline-block w-full">
              <h2 class="font-display uppercase text-3xl tracking-tighter">{{ siteContent.articlesConfig?.column2Title || 'NOTÍCIAS' }}</h2>
            </div>

            <div class="news-list-sidebar">
              <router-link v-for="news in newsItems" :key="news.id" :to="`/conteudo/${news.id}`" class="news-item-link group">
                <span class="news-date-tag">{{ formatDate(news.date) }}</span>
                <h4 class="news-title-link group-hover:text-red">{{ news.title }}</h4>
              </router-link>
            </div>

            <!-- NEWSLETTER PREMIUM -->
            <div class="newsletter-card-premium">
              <div class="nl-inner-premium">
                <div class="nl-icon-circle"><Mail :size="24" /></div>
                <h3 class="nl-title-bold">NOSSA NEWSLETTER</h3>
                <p class="nl-desc-text">As análises estratégicas direto no seu e-mail.</p>
                <form @submit.prevent class="nl-form-row">
                  <input type="email" placeholder="Seu e-mail..." class="nl-input-premium" />
                  <button class="nl-btn-premium">ASSINAR</button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* RESET & FUNDAMENTALS */
.articles-main-wrapper { 
  min-height: 100vh; 
  padding-bottom: 128px;
  position: relative;
}

/* PROGRESS BAR */
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1000;
}
.progress-bar {
  height: 100%;
  background: #FF6BCA;
  width: 0%;
  transition: width 0.1s ease;
}

.page-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: 
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
}

.bg-light { background-color: #F7F7F5; }
.bg-lime { background-color: #A4CD39; }
.container-center {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* HERO SECTION */
.hero-section-fixed {
  padding-top: 140px;
  padding-bottom: 48px;
  border-bottom: 6px solid #1C1C1C;
  text-align: center;
}
.hero-text-content { max-width: 700px; margin: 0 auto; }
.hero-main-title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 1.5rem;
  color: #1C1C1C;
}
.text-white-outline {
  color: transparent;
  -webkit-text-stroke: 2px #FFFFFF;
}
.hero-description {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #1C1C1C;
  opacity: 0.9;
  line-height: 1.5;
}
.radar-badge-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1C1C1C;
  color: white;
  padding: 6px 16px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

/* CONTROLS & FILTERS PILLS */
.controls-section { padding: 40px 0; }
.controls-row {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
@media (min-width: 768px) {
  .controls-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
.search-bar-clean {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid #1C1C1C;
  padding: 0 16px;
  height: 52px;
  width: 100%;
  max-width: 480px;
  box-shadow: 4px 4px 0 #1C1C1C;
}
.search-input-raw { border: none; outline: none; font-weight: 700; flex: 1; font-size: 1rem; }

.filters-pills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.filter-pill {
  background: #EBEBE9;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  color: #1C1C1C;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.filter-pill:hover { background: #D6D6D4; transform: translateY(-2px); }
.filter-pill.active { background: #FF6BCA; color: white; box-shadow: 0 4px 12px rgba(255, 107, 202, 0.3); }

/* LAYOUT */
.main-layout-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  align-items: start;
}
@media (min-width: 1024px) {
  .main-layout-columns { grid-template-columns: 1fr 340px; }
}

.section-label-bold {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 40px;
  padding-bottom: 12px;
  border-bottom: 4px solid #1C1C1C;
  width: fit-content;
  line-height: 1;
}
.sidebar-label {
  margin-top: 0; /* Align with main column label */
}

/* ARTICLES GRID */
.articles-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 768px) {
  .articles-grid-layout { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 768px) {
  .featured-item { grid-column: span 2; }
  .featured-item .premium-card { flex-direction: row; min-height: 420px; }
  .featured-item .card-image-box { width: 50%; height: auto; border-bottom: none; border-right: 3px solid #1C1C1C; }
}

/* PREMIUM CARDS */
.premium-card {
  background: white;
  border: 3px solid #1C1C1C;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 8px 8px 0 rgba(0,0,0,0.05);
  position: relative;
}
.premium-card:hover {
  transform: translateY(-10px);
  box-shadow: 16px 16px 0 var(--accent-color);
  border-color: var(--accent-color);
}
.card-image-box {
  height: 240px;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid #1C1C1C;
}
.card-main-img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  filter: grayscale(100%); 
  transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1); 
}
.premium-card:hover .card-main-img { filter: grayscale(0%); transform: scale(1.05); }

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));
  opacity: 0.8;
}

.marker-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border: 2px solid #1C1C1C;
  font-weight: 900;
  font-size: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 5;
}

.card-actions-top-right {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 5;
}
.action-icon-btn {
  background: white;
  border: 2px solid #1C1C1C;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.action-icon-btn:hover { background: #FFE65A; transform: scale(1.1); }

.card-body-content { padding: 32px; flex: 1; display: flex; flex-direction: column; }
.card-meta-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-weight: 800; font-size: 10px; opacity: 0.6; text-transform: uppercase; }
.read-time-box { display: flex; align-items: center; gap: 4px; }

.card-title-v3 { font-family: "Archivo Black", sans-serif; font-size: 1.4rem; line-height: 1.15; margin-bottom: 1rem; }
.card-excerpt-v3 { font-size: 0.9rem; line-height: 1.6; color: #1C1C1C; opacity: 0.7; margin-bottom: 2rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.cta-button-solid {
  margin-top: auto;
  align-self: flex-start;
  background: #FFE65A;
  border: 2px solid #1C1C1C;
  padding: 10px 20px;
  font-weight: 900;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1C1C1C;
  text-decoration: none;
  transition: all 0.3s;
}
.cta-button-solid:hover { background: #1C1C1C; color: #FFE65A; }

/* NEWS SIDEBAR */
.news-list-sidebar {
  display: flex;
  flex-direction: column;
}
.news-item-link {
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.news-item-link:hover { transform: translateX(8px); }
.news-date-tag { color: #DF2028; font-weight: 900; font-size: 10px; margin-bottom: 6px; display: block; }
.news-title-link { font-family: "Archivo Black", sans-serif; font-size: 0.95rem; line-height: 1.3; }

/* NEWSLETTER PREMIUM */
.newsletter-card-premium {
  margin-top: 64px;
  background: #FF6BCA;
  border: 3px solid #1C1C1C;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 10px 10px 0 #1C1C1C;
}
.nl-inner-premium {
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 40px 28px;
  text-align: center;
}
.nl-icon-circle {
  width: 52px;
  height: 52px;
  background: #FFE65A;
  color: #1C1C1C;
  border: 2px solid #1C1C1C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.nl-title-bold { font-family: "Archivo Black", sans-serif; color: white; margin-bottom: 8px; font-size: 1.25rem; text-shadow: 2px 2px 0 rgba(0,0,0,0.1); }
.nl-desc-text { color: white; font-weight: 800; font-size: 0.85rem; margin-bottom: 32px; opacity: 0.95; }
.nl-form-row { display: flex; flex-direction: column; gap: 12px; }
.nl-input-premium { 
  background: white; 
  border: 2px solid #1C1C1C; 
  padding: 14px; 
  font-weight: 700; 
  outline: none; 
  border-radius: 8px;
  font-size: 0.9rem;
}
.nl-btn-premium { 
  background: #FFE65A; 
  color: #1C1C1C; 
  border: 2px solid #1C1C1C; 
  padding: 14px; 
  font-weight: 900; 
  cursor: pointer; 
  text-transform: uppercase;
  transition: all 0.3s;
  border-radius: 8px;
  box-shadow: 0 4px 0 #1C1C1C;
}
.nl-btn-premium:hover { background: #1C1C1C; color: #FFE65A; transform: translateY(-2px); box-shadow: 0 6px 0 #1C1C1C; }

.load-more-center { margin-top: 64px; text-align: center; }
.load-more-btn-v3 {
  background: white;
  border: 4px solid #1C1C1C;
  padding: 16px 40px;
  font-family: "Archivo Black", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  box-shadow: 8px 8px 0 #1C1C1C;
  cursor: pointer;
  transition: 0.2s;
}
.load-more-btn-v3:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0 #1C1C1C; background: #FFE65A; }
</style>
