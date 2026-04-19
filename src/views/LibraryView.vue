<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { FileText, Download, ExternalLink, Search } from 'lucide-vue-next'

const staticDocs = [
  { id: 1, title: 'Impacto Econômico da Transição Energética', description: 'Relatório completo sobre o impacto da descarbonização nas economias emergentes da América Latina.', category: 'Relatório', fileUrl: '#', externalLink: '#' },
  { id: 2, title: 'Dataset: Participação Política Feminina', description: 'Dados abertos sobre a evolução da representação feminina em cargos eletivos entre 2010 e 2024.', category: 'Dataset', fileUrl: '#', externalLink: '#' },
  { id: 3, title: 'Nota Técnica: Reforma Tributária Solidária', description: 'Análise aprofundada dos impactos distributivos da nova proposta de reforma tributária.', category: 'Nota Técnica', fileUrl: '#', externalLink: '#' },
  { id: 4, title: 'Manual de Organização Comunitária', description: 'Guia prático para estruturação de movimentos sociais e táticas de mobilização local.', category: 'Guia', fileUrl: '#', externalLink: '#' },
  { id: 5, title: 'Mapeamento de Leis Ambientais Aprovadas', description: 'Compilado legislativo das principais vitórias ambientais no congresso nacional nos últimos 5 anos.', category: 'Dataset', fileUrl: '#', externalLink: '#' },
  { id: 6, title: 'Advocacy em Tempos de Crise', description: 'Estudo de caso sobre campanhas vitoriosas durante o período de retração democrática.', category: 'Relatório', fileUrl: '#', externalLink: '#' }
]

const libraryItems = computed(() => siteContent.library?.length ? siteContent.library : staticDocs)
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
  <div class="page-brutalist">
    <section class="page-hero activist-gradient">
      <div class="geo-decor circle blue-bg"></div>
      <div class="container hero-inner">
        <span class="eyebrow">REPOSITÓRIO TÉCNICO</span>
        <h1 class="hero-title">NOSSA<br/><span class="text-yellow">BIBLIOTECA</span></h1>
        <p class="hero-subtitle">Acesso aberto a publicações, notas técnicas e datasets fundamentais para o debate político contemporâneo.</p>
      </div>
    </section>

    <section class="controls-area">
      <div class="container">
        <div class="controls-box brutalist-card">
          <div class="search-module">
            <Search :size="20" />
            <input type="text" v-model="searchQuery" placeholder="PESQUISAR DOCUMENTO..." />
          </div>
          <div class="filter-module">
            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="{ active: selectedCategory === cat }" class="filter-btn">{{ cat }}</button>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard-section pt-0">
      <div class="container">
        <div class="lib-grid">
          <div v-for="item in filteredItems" :key="item.id" class="lib-card brutalist-card">
            <div class="lib-icon"><FileText :size="32" /></div>
            <div class="lib-content">
              <span class="lib-tag">{{ item.category }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <div class="lib-actions">
              <a :href="item.fileUrl" target="_blank" class="lib-btn"><Download :size="18" /> PDF</a>
              <a v-if="item.externalLink" :href="item.externalLink" target="_blank" class="lib-btn secondary"><ExternalLink :size="18" /> FONTE</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-brutalist { background: var(--color-bg); min-height: 100vh; }
.page-hero { position: relative; padding: 220px 0 100px; border-bottom: 8px solid var(--color-dark); overflow: hidden; }
.hero-inner { position: relative; z-index: 10; }
.eyebrow { font-family: var(--font-sans); font-weight: 900; letter-spacing: 0.4em; font-size: 0.8rem; color: white; display: block; margin-bottom: 20px; opacity: 0.8; }
.hero-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 7rem); color: white; line-height: 0.85; margin-bottom: 30px; text-transform: uppercase; letter-spacing: -0.04em; }
.text-yellow { color: var(--color-yellow); }
.hero-subtitle { font-family: var(--font-sans); font-weight: 700; font-size: 1.3rem; color: white; max-width: 700px; line-height: 1.5; opacity: 0.9; }
.geo-decor { position: absolute; border: 4px solid var(--color-dark); z-index: 1; }
.geo-decor.circle { width: 100px; height: 100px; border-radius: 50%; background: var(--color-blue); bottom: -20px; left: 15%; }

.controls-area { margin-top: -40px; position: relative; z-index: 30; margin-bottom: 40px; }
.controls-box { background: white; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; gap: 30px; }
.controls-box:hover { transform: none; box-shadow: none; }
.search-module { flex: 1; display: flex; align-items: center; gap: 15px; border-right: 3px solid var(--color-dark); padding-right: 20px; }
.search-module input { border: none; font-family: var(--font-sans); font-weight: 900; font-size: 1rem; width: 100%; outline: none; background: transparent; }
.filter-module { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-btn { background: none; border: 2px solid var(--color-dark); padding: 5px 15px; font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; cursor: pointer; text-transform: uppercase; transition: all 0.2s; }
.filter-btn.active { background: var(--color-yellow); }

.dashboard-section { padding: 0 0 80px; }
.pt-0 { padding-top: 0; }
.lib-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.lib-card { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
.lib-icon { color: var(--color-red); }
.lib-tag { font-family: var(--font-sans); font-weight: 900; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 0.1em; opacity: 0.5; }
.lib-card h3 { font-family: var(--font-display); font-size: 1.4rem; line-height: 1.1; text-transform: uppercase; letter-spacing: -0.04em; }
.lib-card p { font-weight: 600; opacity: 0.7; font-size: 0.9rem; flex: 1; }
.lib-actions { display: flex; gap: 10px; margin-top: 10px; }
.lib-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: 3px solid var(--color-dark); font-family: var(--font-sans); font-weight: 900; font-size: 0.75rem; text-decoration: none; color: var(--color-dark); transition: all 0.2s; text-transform: uppercase; }
.lib-btn:hover { background: var(--color-dark); color: white; }
.lib-btn.secondary { background: var(--color-lime); }

@media (max-width: 1024px) { .lib-grid { grid-template-columns: 1fr 1fr; } .controls-box { flex-direction: column; align-items: stretch; } .search-module { border-right: none; border-bottom: 3px solid var(--color-dark); padding-bottom: 20px; padding-right: 0; } }
@media (max-width: 600px) { .lib-grid { grid-template-columns: 1fr; } }
</style>