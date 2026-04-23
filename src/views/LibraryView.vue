<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { FileText, Download, ExternalLink, Search } from 'lucide-vue-next'

const config = computed(() => siteContent.libraryConfig || {})
const libraryItems = computed(() => siteContent.library || [])
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const categories = computed(() => ['Todos', ...new Set(libraryItems.value.map(i => i.category))])
const filteredItems = computed(() => libraryItems.value.filter(i => {
  const matchesSearch = i.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  const matchesCat = selectedCategory.value === 'Todos' || i.category === selectedCategory.value
  return matchesSearch && matchesCat
}))
</script>

<template>
  <div class="page-library-dark">
    <div class="grid-texture"></div>

    <section class="page-hero">
      <div class="geo-decor circle blue-bg"></div>
      <div class="geo-decor square pink-bg"></div>
      <div class="geo-decor triangle lime-bg"></div>

      <div class="container-confinado hero-inner">
        <h1 class="hero-title">{{ config.pageTitle1 || 'NOSSA' }}<br/><span class="text-white">{{ config.pageTitle2 || 'BIBLIOTECA' }}</span></h1>
        <p class="hero-subtitle text-white opacity-80">{{ config.pageSubtitle || 'Acesso aberto a publicações, notas técnicas e datasets fundamentais para o debate político contemporâneo.' }}</p>
      </div>
    </section>

    <!-- ÁREA DE CONTROLES: COMPACTA E ALINHADA AO LADO -->
    <section class="controls-area">
      <div class="container-confinado">
        <div class="controls-row-compact">
          
          <!-- PESQUISA COM BORDA -->
          <div class="search-box-sleek">
            <div class="search-icon-side">
              <Search :size="18" class="text-red" />
            </div>
            <input type="text" v-model="searchQuery" :placeholder="config.searchPlaceholder || 'BUSCAR DOCUMENTO...'" />
          </div>

          <!-- FILTROS AO LADO (BALÃO BRANCO) -->
          <div class="filter-balloon-sleek">
            <span class="filter-label">{{ config.filterLabel || 'FILTRAR:' }}</span>
            <div class="filter-options">
              <button v-for="cat in categories" :key="cat" 
                @click="selectedCategory = cat" 
                :class="{ active: selectedCategory === cat }" 
                class="compact-pill-btn"
              >
                {{ cat }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="dashboard-section pt-0">
      <div class="container-confinado">
        <div v-if="filteredItems.length > 0" class="lib-grid">
          <div v-for="item in filteredItems" :key="item.id" class="lib-card-editorial">
            <div class="lib-icon-green"><FileText :size="32" /></div>
            <div class="lib-content">
              <span class="lib-tag-red">{{ item.category }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <div class="lib-actions-row">
              <a :href="item.fileUrl" target="_blank" class="lib-btn-centered black">
                <Download :size="16" /> {{ config.btnDownload || 'DOWNLOAD PDF' }}
              </a>
              <a v-if="item.externalLink" :href="item.externalLink" target="_blank" class="lib-btn-centered outline">
                <ExternalLink :size="16" /> {{ config.btnSource || 'FONTE' }}
              </a>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE BRUTALISTA -->
        <div v-else class="empty-state-brutal fade-in-up">
          <div class="empty-icon-box shadow-solid">
             <Search :size="48" class="text-white" />
          </div>
          <h2 class="empty-title">{{ config.emptyTitle || 'NENHUM DOCUMENTO ENCONTRADO' }}</h2>
          <p class="empty-desc">{{ config.emptyDesc || 'Não há registros na base de dados para estes parâmetros. Ajuste os filtros ou tente novos termos de busca.' }}</p>
          <button @click="searchQuery = ''; selectedCategory = 'Todos'" class="btn-clear-search mt-8">
            {{ config.emptyBtn || 'LIMPAR BUSCA' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-library-dark { background-color: #000; min-height: 100vh; position: relative; }
.grid-texture { position: fixed; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px; z-index: 1; pointer-events: none; }

.container-confinado { max-width: 1200px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 10; }

.page-hero { position: relative; padding: 200px 0 80px; overflow: hidden; }
.hero-title { font-family: "Archivo Black", sans-serif; font-size: clamp(3rem, 8vw, 6rem); color: #FFF; line-height: 0.85; margin-bottom: 20px; text-transform: uppercase; }
.hero-subtitle { font-family: "Inter", sans-serif; font-weight: 700; font-size: 1.1rem; max-width: 550px; line-height: 1.5; }

/* GEOMETRIA */
.geo-decor { position: absolute; border: 4px solid #1C1C1C; z-index: 1; }
.geo-decor.circle { width: 120px; height: 120px; border-radius: 50%; background: #3D78E0; top: 10%; left: -40px; }
.geo-decor.square { width: 80px; height: 80px; background: #FF6BCA; bottom: 10%; right: -20px; transform: rotate(15deg); }
.geo-decor.triangle { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 86px solid #A4CD39; top: 35%; right: 10%; opacity: 0.6; }

/* CONTROLES COMPACTOS E ALINHADOS AO LADO */
.controls-area { margin-top: -20px; margin-bottom: 60px; }
.controls-row-compact { display: flex; align-items: stretch; gap: 15px; }

.search-box-sleek { 
  background: white; border: 3px solid #1C1C1C; display: flex; align-items: center; 
  box-shadow: 8px 8px 0 #1C1C1C; flex: 1; height: 56px; overflow: hidden;
}
.search-icon-side { background: #f8fafc; border-right: 2px solid #1C1C1C; height: 100%; display: flex; align-items: center; padding: 0 15px; }
.search-box-sleek input { border: none; outline: none; flex: 1; padding: 0 20px; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: #1C1C1C; }

.filter-balloon-sleek { 
  background: white; border: 3px solid #1C1C1C; padding: 0 25px; 
  display: flex; align-items: center; gap: 15px; box-shadow: 8px 8px 0 #1C1C1C;
}
.filter-label { font-weight: 900; font-size: 0.65rem; color: #94a3b8; letter-spacing: 0.1em; }
.filter-options { display: flex; gap: 8px; }

.compact-pill-btn { 
  background: transparent; border: 2px solid #1C1C1C; padding: 6px 14px; border-radius: 9999px;
  font-weight: 800; font-size: 0.6rem; text-transform: uppercase; cursor: pointer; transition: 0.2s;
}
.compact-pill-btn:hover { background: #FF6BCA; color: white; }
.compact-pill-btn.active { background: #FFE65A; transform: translateY(-2px); box-shadow: 3px 3px 0 #1C1C1C; }

/* GRID CARDS */
.dashboard-section { padding-bottom: 100px; }
.lib-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

.lib-card-editorial { 
  background: white; padding: 35px; border: 4px solid #1C1C1C; box-shadow: 8px 8px 0 #1C1C1C;
  display: flex; flex-direction: column; gap: 20px; transition: 0.3s;
}
.lib-card-editorial:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0 #1C1C1C; }

.lib-icon-green { color: #A4CD39; }
.lib-tag-red { font-weight: 900; font-size: 0.65rem; text-transform: uppercase; color: #DF2028; }

.lib-card-editorial h3 { font-family: "Archivo Black", sans-serif; font-size: 1.3rem; text-transform: uppercase; line-height: 1.1; color: #1C1C1C; }
.lib-card-editorial p { font-family: "Georgia", serif; font-size: 0.9rem; line-height: 1.6; color: #475569; flex: 1; }

/* BOTÕES ALINHADOS NO CENTRO */
.lib-actions-row { display: flex; gap: 10px; margin-top: 10px; }

.lib-btn-centered { 
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; 
  padding: 12px 15px; border-radius: 9999px; border: 3px solid #1C1C1C; 
  font-weight: 900; font-size: 0.7rem; text-decoration: none; transition: 0.2s;
}
.lib-btn-centered.black { background: #1C1C1C; color: white; }
.lib-btn-centered.black:hover { background: #DF2028; }
.lib-btn-centered.outline { background: transparent; color: #1C1C1C; }
.lib-btn-centered.outline:hover { background: #f1f5f9; }

@media (max-width: 1100px) { 
  .lib-grid { grid-template-columns: 1fr 1fr; }
  .controls-row-compact { flex-direction: column; }
}
@media (max-width: 600px) { .lib-grid { grid-template-columns: 1fr; } }

/* EMPTY STATE BRUTALISTA */
.empty-state-brutal {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 20px; text-align: center;
}

.empty-icon-box {
  width: 100px; height: 100px; background: #DF2028; border: 4px solid #1C1C1C;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-bottom: 30px;
}

.empty-title { font-family: "Archivo Black", sans-serif; font-size: 2rem; color: #FFFFFF; text-transform: uppercase; margin-bottom: 15px; }
.empty-desc { font-family: "Georgia", serif; font-size: 1.2rem; color: #94a3b8; max-width: 500px; line-height: 1.6; }

.btn-clear-search {
  background: #FFE65A; color: #1C1C1C; padding: 15px 40px; border-radius: 9999px;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.85rem; text-transform: uppercase;
  border: 3px solid #1C1C1C; cursor: pointer; transition: 0.3s; box-shadow: 6px 6px 0px #1C1C1C;
}
.btn-clear-search:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0px #DF2028; background: #FFFFFF; }

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
</style>