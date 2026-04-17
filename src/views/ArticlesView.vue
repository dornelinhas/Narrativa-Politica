<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { Search, Calendar, ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const activeTab = ref('Todos')
const searchQuery = ref('')
const searchType = ref('name')

const onboardingPosts = computed(() => {
  return siteContent.posts.slice(0, 3)
})

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
    
    let matchesSearch = false
    const authorName = getAuthorName(p.authorId).toLowerCase()
    
    if (searchType.value === 'name') {
      matchesSearch = (p.title && p.title.toLowerCase().includes(query)) || 
                      (authorName.includes(query))
    } else {
      matchesSearch = (p.excerpt && p.excerpt.toLowerCase().includes(query)) || 
                      (p.category && p.category.toLowerCase().includes(query)) ||
                      (p.tags && p.tags.toLowerCase().includes(query))
    }
    
    return matchesTab && (query === '' || matchesSearch)
  })
})

const formatDate = (dateStr) => {
  try {
    if (!dateStr) return 'Data indisponível'
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch (e) {
    return 'Data inválida'
  }
}
</script>

<template>
  <div class="articles-v3">
    <!-- HERO -->
    <section class="articles-hero">
      <div class="container hero-inner">
        <div class="hero-accent" style="background: linear-gradient(135deg, #FF2D55, #8A2BE2);"></div>
        <span class="hero-badge">Curadoria Editorial</span>
        <h1 class="hero-title-light">Conteúdo & <span class="hero-gradient-text">Pesquisa</span></h1>
        <p class="hero-subtitle-dark">Análises autorais e notícias sobre economia, gênero, política e sustentabilidade.</p>
      </div>
    </section>

    <!-- MAIN ARTICLES HUB -->
    <div class="container articles-main-hub">
      <div class="articles-layout-grid">
        <!-- LISTAGEM -->
        <main class="articles-list-side">
          <!-- CONTROLS -->
          <section class="articles-controls-inline">
            <div class="articles-controls-top">
              <div class="search-box-wrapper">
                <div class="search-type-tabs">
                  <button @click="searchType = 'name'" :class="{ active: searchType === 'name' }">Por Nome</button>
                  <button @click="searchType = 'tag'" :class="{ active: searchType === 'tag' }">Por Hashtag</button>
                </div>
                <div class="search-box">
                  <Search :size="18" class="search-icon" />
                  <input type="text" v-model="searchQuery" :placeholder="searchType === 'name' ? 'Digite o título ou autor...' : 'Digite a #hashtag...'">
                </div>
              </div>
              
              <div class="articles-tabs">
                <button v-for="tab in ['Todos', 'Artigo', 'Análise', 'Notícia']" 
                  :key="tab"
                  @click="activeTab = tab" 
                  :class="{ active: activeTab === tab }"
                  class="tab-btn"
                >
                  {{ tab }}
                </button>
              </div>
            </div>

            <div class="tags-cloud">
              <span class="tags-label">Sugestões:</span>
              <button v-for="tag in ['#Economia', '#Gênero', '#Dados', '#Liderança', '#Advocacy']" 
                :key="tag" 
                @click="searchQuery = tag.replace('#', '')"
                class="tag-pill"
              >
                {{ tag }}
              </button>
            </div>
          </section>

          <!-- GRID -->
          <section class="articles-grid-section">
            <div v-if="filteredPosts.length" class="articles-grid-side">
              <router-link v-for="post in filteredPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="article-card-side">
                <div class="card-img-side">
                  <img :src="post.image" :alt="post.title" />
                  <span class="category-badge-side" v-if="post.category">{{ post.category }}</span>
                </div>
                <div class="card-content-side">
                  <span class="post-date-side">{{ formatDate(post.date) }}</span>
                  <h3 class="post-title-side">{{ post.title }}</h3>
                  <p class="post-excerpt-side text-readable">{{ post.excerpt }}</p>
                  <div class="card-footer-side">
                    <span class="author-name-side text-readable">Por {{ getAuthorName(post.authorId) }}</span>
                    <span class="read-more-side">Ler Análise →</span>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-else class="empty-results">
              <p>Nenhum artigo encontrado para sua busca.</p>
            </div>
          </section>
        </main>

        <!-- SIDEBAR ONBOARDING -->
        <aside class="articles-sidebar-onboarding">
          <div class="onboarding-sidebar-card">
            <div class="onboarding-mag-header">
              <span class="onboarding-kicker">É novo por aqui?</span>
              <h3>Guias de Início</h3>
              <p class="text-readable">Essenciais para entender nossa base técnica.</p>
            </div>
            <div class="onboarding-sidebar-list">
              <router-link v-for="post in onboardingPosts" :key="post.id" :to="`/conteudo/${post.id}`" class="onboarding-mini-item">
                <div class="mini-item-info">
                  <strong>{{ post.title }}</strong>
                  <span class="mini-item-cat" v-if="post.category">{{ post.category }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-v3 { background: #fff; min-height: 100vh; }

.articles-hero { background: #F9FAFB; padding: 160px 0 80px; text-align: center; border-bottom: 1px solid #F1F5F9; }
.hero-inner { display: flex; flex-direction: column; align-items: center; }
.hero-accent { width: 40px; height: 4px; border-radius: 2px; margin-bottom: 24px; }
.hero-badge { font-size: 0.7rem; font-weight: 900; letter-spacing: 2px; color: #94A3B8; text-transform: uppercase; margin-bottom: 16px; }
.hero-title-light { font-size: clamp(2.4rem, 5vw, 3.5rem); font-weight: 900; color: #111827; letter-spacing: -2px; }
.hero-gradient-text { background: linear-gradient(135deg, #FF2D55, #8A2BE2); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle-dark { font-size: 1.15rem; color: #374151; max-width: 580px; margin: 20px auto 0; line-height: 1.6; font-weight: 500; }

.articles-main-hub { padding: 80px 0; }
.articles-layout-grid { display: grid; grid-template-columns: 1fr 340px; gap: 64px; }

/* CONTROLS INLINE */
.articles-controls-inline { margin-bottom: 48px; }
.articles-controls-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 32px; }

.search-box-wrapper { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.search-type-tabs { display: flex; gap: 16px; }
.search-type-tabs button { background: none; border: none; font-size: 0.7rem; font-weight: 900; color: #94A3B8; text-transform: uppercase; cursor: pointer; padding: 0; letter-spacing: 1px; }
.search-type-tabs button.active { color: #8A2BE2; }

.search-box { position: relative; width: 100%; }
.search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #94A3B8; }
.search-box input { width: 100%; padding: 16px 20px 16px 52px; border-radius: 16px; border: 2px solid #F1F5F9; background: #F8FAFC; font-size: 1rem; color: #111827; outline: none; transition: all 0.3s; }
.search-box input:focus { border-color: #8A2BE2; background: #fff; box-shadow: 0 10px 30px rgba(138,43,226,0.05); }

.articles-tabs { display: flex; gap: 8px; }
.tab-btn { padding: 12px 20px; border: 2px solid #F1F5F9; background: #fff; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.2s; color: #64748B; font-size: 0.75rem; text-transform: uppercase; }
.tab-btn:hover { border-color: #FF2D55; color: #111827; }
.tab-btn.active { background: linear-gradient(135deg, #FF2D55, #8A2BE2); border-color: transparent; color: #fff !important; box-shadow: 0 8px 20px rgba(255, 45, 85, 0.2); }

.tags-cloud { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.tags-label { font-size: 0.75rem; font-weight: 800; color: #94A3B8; }
.tag-pill { background: #F8FAFC; color: #475569; border: 1.5px solid #F1F5F9; padding: 6px 14px; border-radius: 100px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.tag-pill:hover { 
  background: linear-gradient(135deg, #8A2BE2, #00CED1); 
  border-color: transparent; 
  color: #fff !important; 
  box-shadow: 0 8px 20px rgba(138, 43, 226, 0.2);
}

/* LIST COLUMN */
.articles-grid-side { display: flex; flex-direction: column; gap: 40px; }
.article-card-side { text-decoration: none; display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; transition: all 0.3s; }
.article-card-side:hover { transform: translateX(10px); }

.card-img-side { height: 200px; border-radius: 20px; overflow: hidden; position: relative; }
.card-img-side img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.article-card-side:hover .card-img-side img { transform: scale(1.05); }
.category-badge-side { position: absolute; top: 16px; left: 16px; background: #FF2D55; color: #fff; font-size: 0.65rem; font-weight: 900; text-transform: uppercase; padding: 6px 12px; border-radius: 6px; letter-spacing: 1px; }

.card-content-side { padding: 8px 0; }
.post-date-side { font-size: 0.85rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; display: block; margin-bottom: 12px; }
.post-title-side { font-size: 1.6rem; font-weight: 900; color: #111827; line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.5px; }
.post-excerpt-side { font-size: 1.05rem; color: #374151; line-height: 1.6; margin-bottom: 20px; }

.card-footer-side { display: flex; justify-content: space-between; align-items: center; }
.author-name-side { font-size: 0.85rem; font-weight: 800; color: #111827; }
.read-more-side { font-size: 0.85rem; font-weight: 800; color: #FF2D55; }

/* SIDEBAR ONBOARDING */
.articles-sidebar-onboarding { position: sticky; top: 100px; height: fit-content; }
.onboarding-sidebar-card { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 28px; padding: 32px; }
.onboarding-mag-header { margin-bottom: 24px; }
.onboarding-kicker { font-size: 0.7rem; font-weight: 900; color: #8A2BE2; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; display: block; }
.onboarding-mag-header h3 { font-size: 1.4rem; font-weight: 900; color: #111827; margin-bottom: 8px; }
.onboarding-mag-header p { font-size: 0.9rem; color: #64748B; font-weight: 600; line-height: 1.5; }

.onboarding-sidebar-list { display: flex; flex-direction: column; gap: 16px; }
.onboarding-mini-item { text-decoration: none; padding: 16px; background: #fff; border-radius: 16px; border: 1px solid #F1F5F9; transition: all 0.3s; }
.onboarding-mini-item:hover { border-color: #FF2D55; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.03); }
.mini-item-info strong { display: block; font-size: 0.95rem; font-weight: 800; color: #111827; line-height: 1.3; margin-bottom: 4px; }
.mini-item-cat { font-size: 0.7rem; font-weight: 900; color: #FF2D55; text-transform: uppercase; letter-spacing: 1px; }

@media (max-width: 1100px) {
  .articles-layout-grid { grid-template-columns: 1fr; }
  .article-card-side { grid-template-columns: 200px 1fr; }
}

@media (max-width: 768px) {
  .article-card-side { grid-template-columns: 1fr; }
  .articles-controls-top { flex-direction: column; align-items: stretch; }
}
</style>