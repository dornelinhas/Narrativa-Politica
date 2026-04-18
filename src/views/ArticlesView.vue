<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { Search, ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const activeTab = ref('Todos')
const searchQuery = ref('')

const getAuthorName = (authorId) => {
  if (!authorId) return 'Anne Dornelas'
  const member = siteContent.team.find(m => m.id === authorId)
  return member ? member.name : 'Anne Dornelas'
}

onMounted(() => {
  if (route.query.tab === 'noticias') activeTab.value = 'Notícia'
  if (route.query.tab === 'artigos' || route.query.tab === 'analises') activeTab.value = 'Artigos'
})

const filteredPosts = computed(() => {
  if (!siteContent.posts) return []
  return siteContent.posts.filter(p => {
    const matchesTab = activeTab.value === 'Todos' || p.category === activeTab.value
    const query = searchQuery.value.toLowerCase()
    const matchesSearch = (p.title && p.title.toLowerCase().includes(query)) || 
                         (p.excerpt && p.excerpt.toLowerCase().includes(query))
    return matchesTab && (query === '' || matchesSearch)
  })
})

const formatDate = (dateStr) => {
  try {
    if (!dateStr) return 'Data indisponível'
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
  } catch (e) {
    return 'Data inválida'
  }
}
</script>

<template>
  <div class="articles-brutalist">
    <!-- HERO -->
    <section class="articles-hero activist-gradient">
      <div class="container hero-inner">
        <h1 class="hero-title">CONTEÚDO <br /><span class="text-yellow">& PESQUISA</span></h1>
        <p class="hero-desc">Análises autorais e notícias sobre economia, gênero, política e sustentabilidade.</p>
      </div>
    </section>

    <!-- HUB -->
    <div class="container main-hub">
      <div class="hub-header-brutalist">
        <div class="search-bar-brutalist">
          <Search :size="20" class="search-icon" />
          <input type="text" v-model="searchQuery" placeholder="Pesquisar por título ou tema..." />
        </div>
        
        <div class="filters-brutalist">
          <button v-for="tab in ['Todos', 'Artigo', 'Análise', 'Notícia']" 
            :key="tab"
            @click="activeTab = tab" 
            :class="{ active: activeTab === tab }"
            class="filter-btn"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="articles-layout">
        <div class="articles-grid-brutalist">
          <router-link v-for="post in filteredPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="brutalist-post-card">
            <div class="post-img-wrap">
              <img :src="post.image" :alt="post.title" />
              <div class="tag-overlay">
                <span class="tag">{{ post.category }}</span>
              </div>
            </div>
            <div class="post-info">
              <span class="post-meta">{{ formatDate(post.date) }} • Por {{ getAuthorName(post.authorId) }}</span>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-link">
                Ler Análise <ArrowRight :size="16" />
              </div>
            </div>
          </router-link>

          <div v-if="filteredPosts.length === 0" class="no-results-brutalist">
             <h2 class="font-display">NADA ENCONTRADO.</h2>
             <p>Tente ajustar sua pesquisa ou filtros.</p>
          </div>
        </div>

        <aside class="articles-sidebar">
          <div class="sidebar-box-brutalist pink">
            <h3 class="font-display">ESSENCIAIS</h3>
            <div class="mini-list">
              <router-link v-for="post in siteContent.posts.slice(0, 3)" :key="post.id" :to="`/conteudo/${post.id}`" class="mini-item">
                <strong>{{ post.title }}</strong>
                <ArrowRight :size="14" />
              </router-link>
            </div>
          </div>

          <div class="sidebar-box-brutalist yellow mt-8">
            <h3 class="font-display">NEWSLETTER</h3>
            <p class="font-sans font-bold text-sm mb-4">Receba análises estratégicas direto no seu e-mail.</p>
            <button class="brutalist-button-mini w-full">Inscrever-se</button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-brutalist { background: var(--color-bg); min-height: 100vh; padding-bottom: 100px; }

.articles-hero { padding: 180px 0 100px; border-bottom: 8px solid var(--color-dark); }
.hero-title { font-size: clamp(3rem, 10vw, 7rem); color: white; line-height: 0.85; margin-bottom: 30px; }
.text-yellow { color: var(--color-yellow); }
.hero-desc { font-family: var(--font-sans); font-weight: 700; color: white; font-size: 1.2rem; max-width: 600px; opacity: 0.9; }

.main-hub { margin-top: -60px; position: relative; z-index: 10; }

.hub-header-brutalist {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  box-shadow: 10px 10px 0 var(--color-dark);
  margin-bottom: 60px;
}

.search-bar-brutalist { flex: 1; position: relative; }
.search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--color-dark); }
.search-bar-brutalist input {
  width: 100%;
  padding: 15px 15px 15px 50px;
  border: 3px solid var(--color-dark);
  background: var(--color-bg);
  font-family: var(--font-sans);
  font-weight: 700;
  outline: none;
}

.filters-brutalist { display: flex; gap: 10px; }
.filter-btn {
  padding: 10px 20px;
  border: 3px solid var(--color-dark);
  background: white;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active, .filter-btn:hover {
  background: var(--color-dark);
  color: white;
  transform: translateY(-2px);
}

.articles-layout { display: grid; grid-template-columns: 1fr 320px; gap: 60px; }

.articles-grid-brutalist { display: flex; flex-direction: column; gap: 40px; }

.brutalist-post-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  background: white;
  border: 4px solid var(--color-dark);
  padding: 0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.brutalist-post-card:hover {
  transform: translate(-6px, -6px);
  box-shadow: 10px 10px 0 var(--color-red);
}

.post-img-wrap {
  position: relative;
  border-right: 4px solid var(--color-dark);
  height: 100%;
  min-height: 250px;
  overflow: hidden;
}

.post-img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); transition: all 0.5s; }
.brutalist-post-card:hover .post-img-wrap img { filter: grayscale(0); transform: scale(1.05); }

.post-info { padding: 40px; display: flex; flex-direction: column; justify-content: center; }
.post-meta { font-family: var(--font-sans); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: var(--color-red); margin-bottom: 15px; }
.post-title { font-size: 2.2rem; margin-bottom: 15px; line-height: 1; }
.post-excerpt { font-weight: 500; opacity: 0.7; line-height: 1.6; margin-bottom: 25px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.post-link { font-weight: 900; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }

.sidebar-box-brutalist {
  border: 4px solid var(--color-dark);
  padding: 30px;
  background: white;
  box-shadow: 8px 8px 0 var(--color-dark);
}

.sidebar-box-brutalist.pink { border-color: var(--color-pink); }
.sidebar-box-brutalist.yellow { border-color: var(--color-yellow); }

.mini-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
.mini-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 0.9rem;
  line-height: 1.3;
}
.mini-item:hover { color: var(--color-red); }

.mt-8 { margin-top: 2rem; }
.mb-4 { margin-bottom: 1rem; }
.w-full { width: 100%; }

.brutalist-button-mini {
  background: var(--color-dark);
  color: white;
  border: none;
  padding: 12px;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.brutalist-button-mini:hover { background: var(--color-red); }

.no-results-brutalist { padding: 80px 0; text-align: center; }

@media (max-width: 1100px) {
  .articles-layout { grid-template-columns: 1fr; }
  .articles-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
  .sidebar-box-brutalist { margin-top: 0 !important; }
}

@media (max-width: 850px) {
  .brutalist-post-card { grid-template-columns: 1fr; }
  .post-img-wrap { height: 250px; border-right: none; border-bottom: 4px solid var(--color-dark); }
  .hub-header-brutalist { flex-direction: column; align-items: stretch; }
}

@media (max-width: 600px) {
  .articles-sidebar { grid-template-columns: 1fr; }
}
</style>