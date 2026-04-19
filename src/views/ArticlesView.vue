<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { Search, ArrowRight } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('Tudo')

const categories = computed(() => ['Tudo', ...siteContent.categories])

const filteredPosts = computed(() => {
  let posts = [...(siteContent.posts || [])]
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(p => p.title.toLowerCase().includes(query))
  }
  if (selectedCategory.value !== 'Tudo') {
    posts = posts.filter(p => p.category === selectedCategory.value)
  }
  return posts
})

const featuredPost = computed(() => filteredPosts.value[0])
const remainingPosts = computed(() => filteredPosts.value.slice(1))

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
}
</script>

<template>
  <div class="articles-brutalist-page selection-custom">
    <!-- HERO SECTION ARTIGOS -->
    <section class="page-intro bg-light">
      <!-- PADDING TOP AUMENTADO PARA NÃO ENCOSTAR NO MENU -->
      <div class="container-custom pt-64 pb-16">
        <h1 class="font-display text-5xl md-text-7xl uppercase tracking-tighter leading-none mb-20 text-dark">
          Radar <span class="activist-gradient-text">Editorial</span>
        </h1>
        
        <!-- BARRA DE BUSCA E FILTROS COM MAIS RESPIRO -->
        <div class="search-filter-grid mb-24">
          <div class="search-box-brutalist">
            <Search class="search-icon" :size="20" />
            <input v-model="searchQuery" type="text" placeholder="BUSCAR POR TÍTULO..." />
          </div>
          <div class="filter-pills">
            <button 
              v-for="cat in categories" 
              :key="cat" 
              @click="selectedCategory = cat"
              class="pill-btn"
              :class="{ active: selectedCategory === cat }"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="bg-light pb-64">
      <div class="container-custom">
        
        <!-- ARTIGO EM DESTAQUE (ESTÉTICA PREMIUM) -->
        <div v-if="featuredPost && !searchQuery" class="featured-wrapper mb-40">
          <div class="flex-center-left gap-4 mb-10">
            <div class="geo-circle pink-bg border-dark" style="width: 28px; height: 28px;"></div>
            <span class="font-sans font-black text-sm uppercase tracking-widest text-dark opacity-60">Destaque Editorial</span>
          </div>

          <router-link :to="`/conteudo/${featuredPost.id}`" class="large-card-brutalist group">
            <div class="card-img-side">
              <img :src="featuredPost.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" :alt="featuredPost.title" />
              <div class="img-overlay-lime"></div>
              <div class="category-tag-abs font-sans">{{ featuredPost.category }}</div>
            </div>
            <div class="card-content-side">
              <h2 class="font-display text-4xl md-text-6xl uppercase tracking-tighter leading-tight mb-8 text-dark">
                {{ featuredPost.title }}
              </h2>
              <p class="font-sans text-xl font-medium text-dark opacity-70 leading-relaxed mb-12">
                {{ featuredPost.excerpt }}
              </p>
              <div class="flex-between items-center mt-auto">
                <span class="meta-info font-sans font-black text-xs uppercase tracking-widest text-dark opacity-40">
                  {{ formatDate(featuredPost.date) }} — 5 MIN LEITURA
                </span>
                <span class="read-more-link font-sans font-black text-dark">
                  LER ENSAIO COMPLETO <ArrowRight :size="18" />
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- GRID DE ARTIGOS COM GAP AUMENTADO -->
        <div class="articles-grid-brutalist">
          <div v-for="(post, idx) in (searchQuery || selectedCategory !== 'Tudo' ? filteredPosts : remainingPosts)" :key="post.id" class="grid-item">
            <router-link :to="`/conteudo/${post.id}`" class="small-card-brutalist group">
              <div class="small-card-img">
                <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" :alt="post.title" />
                <div class="category-tag-mini font-sans" :class="idx % 2 === 0 ? 'pink-bg' : 'blue-bg'">{{ post.category }}</div>
              </div>
              <div class="small-card-body">
                <h3 class="font-display text-2xl uppercase tracking-tighter leading-tight mb-6 text-dark">
                  {{ post.title }}
                </h3>
                <p class="font-sans text-sm font-medium text-dark opacity-60 mb-8 line-clamp-3">
                  {{ post.excerpt }}
                </p>
                <div class="small-card-footer">
                  <span class="text-xs font-sans font-black text-dark opacity-30 tracking-widest">{{ formatDate(post.date) }}</span>
                  <ArrowRight class="card-arrow" :size="20" />
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredPosts.length === 0" class="empty-state-brutalist mt-20">
          <h3 class="font-display text-3xl mb-4 text-dark">NADA ENCONTRADO NO RADAR</h3>
          <p class="font-sans font-medium text-dark opacity-60 mb-10">Tente ajustar seus filtros de busca.</p>
          <button @click="searchQuery = ''; selectedCategory = 'Tudo'" class="btn-clear-brutalist">REDEFINIR FILTROS</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.articles-brutalist-page { background-color: #F7F7F5; min-height: 100vh; }
.container-custom { max-width: 85rem; margin: 0 auto; padding: 0 2.5rem; }
.bg-light { background-color: #F7F7F5; }
.text-dark { color: #1C1C1C; }

.activist-gradient-text {
  background: linear-gradient(110deg, #DF2028 0%, #FF6BCA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* BUSCA E FILTROS */
.search-filter-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; align-items: center; }

.search-box-brutalist {
  position: relative; background: white; border: 4px solid #1C1C1C; display: flex; align-items: center;
}
.search-box-brutalist .search-icon { position: absolute; left: 1.5rem; color: #1C1C1C; }
.search-box-brutalist input {
  width: 100%; padding: 1.5rem 1.5rem 1.5rem 4rem; border: none;
  font-family: "Inter", sans-serif; font-weight: 800; font-size: 0.9rem; outline: none;
}

.filter-pills { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: flex-end; }

.pill-btn {
  padding: 1rem 2rem; border: 4px solid #1C1C1C; background: white;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem;
  text-transform: uppercase; cursor: pointer; transition: all 0.2s;
}
.pill-btn:hover, .pill-btn.active {
  background: #1C1C1C; color: white; transform: translate(-4px, -4px); box-shadow: 4px 4px 0 #FF6BCA;
}

/* DESTAQUE */
.large-card-brutalist {
  display: grid; grid-template-columns: 1.3fr 1fr; background: white;
  border: 4px solid #1C1C1C; text-decoration: none; color: inherit;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-img-side { position: relative; border-right: 4px solid #1C1C1C; overflow: hidden; height: 550px; }
.card-img-side img { width: 100%; height: 100%; object-fit: cover; transition: all 0.6s; }
.category-tag-abs {
  position: absolute; top: 2.5rem; left: 2.5rem; background: #FFE65A; padding: 0.6rem 1.2rem;
  font-weight: 900; font-size: 0.75rem; text-transform: uppercase; border: 3px solid #1C1C1C;
}
.card-content-side { padding: 5rem; display: flex; flex-direction: column; }
.read-more-link { display: flex; align-items: center; gap: 0.75rem; transition: color 0.2s; }

.large-card-brutalist:hover { transform: translate(-10px, -10px); box-shadow: 15px 15px 0 #A4CD39; }
.large-card-brutalist:hover .read-more-link { color: #DF2028; }

/* GRID ARTIGOS */
.articles-grid-brutalist { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; }

.small-card-brutalist {
  display: flex; flex-direction: column; background: white; border: 4px solid #1C1C1C;
  text-decoration: none; color: inherit; height: 100%;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.small-card-img { height: 260px; position: relative; border-bottom: 4px solid #1C1C1C; overflow: hidden; }
.small-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.category-tag-mini {
  position: absolute; top: 1.5rem; left: 1.5rem; padding: 0.5rem 1rem;
  font-weight: 900; font-size: 0.7rem; text-transform: uppercase; border: 2.5px solid #1C1C1C; color: white;
}
.pink-bg { background-color: #FF6BCA; }
.blue-bg { background-color: #3D78E0; }
.small-card-body { padding: 2.5rem; flex-grow: 1; display: flex; flex-direction: column; }
.small-card-footer { margin-top: auto; padding-top: 2rem; border-top: 2px dashed rgba(28,28,28,0.1); display: flex; justify-content: space-between; align-items: center; }
.card-arrow { opacity: 0.3; transition: all 0.3s; color: #1C1C1C; }

.small-card-brutalist:hover { transform: translate(-8px, -8px); box-shadow: 10px 10px 0 #3D78E0; }
.small-card-brutalist:hover .card-arrow { opacity: 1; transform: rotate(-45deg) scale(1.3); color: #DF2028; }

.btn-clear-brutalist {
  padding: 1.2rem 3rem; background: #DF2028; color: white; border: 4px solid #1C1C1C;
  font-family: "Inter", sans-serif; font-weight: 900; cursor: pointer;
}

@media (max-width: 1200px) { .articles-grid-brutalist { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .search-filter-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .filter-pills { justify-content: flex-start; }
  .large-card-brutalist { grid-template-columns: 1fr; }
  .card-img-side { height: 350px; border-right: none; border-bottom: 4px solid #1C1C1C; }
  .card-content-side { padding: 2.5rem; }
  .articles-grid-brutalist { grid-template-columns: 1fr; }
}
</style>