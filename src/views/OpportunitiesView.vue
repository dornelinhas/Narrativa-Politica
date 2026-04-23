<script setup>
import { ref, computed } from 'vue'
import { Bookmark, MapPin, Briefcase, Search, Star, ArrowRight, AlertCircle, Sparkles, Filter } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const searchQuery = ref('')
const selectedCategory = ref('Tudo')
const destaqueNordeste = ref(false)
const favorites = ref(new Set())

// MAPEAMENTO RÍGIDO DE CORES DA LOGO NP
const colorMap = {
  'Tudo': '#3D78E0',
  'Gênero': '#FF6BCA',
  'Vagas de Emprego': '#FF6BCA',
  'Clima': '#A4CD39',
  'Internacional': '#3D78E0',
  'Bolsas': '#3D78E0',
  'Editais': '#FFE65A',
  'Chamada para Artigos': '#FFE65A',
  'Urgente': '#DF2028'
}

const categories = ['Tudo', 'Gênero', 'Clima', 'Internacional', 'Vagas de Emprego', 'Editais']

const mockOpportunities = [
  { id: 1, title: 'Formação em Advocacy Internacional', category: 'Internacional', deadline: '25 MAI', location: 'Remoto', type: 'Bolsa', description: 'Programa focado em incidência política na ONU e organismos internacionais para líderes do sul global.' },
  { id: 2, title: 'Gestão de Projetos: Clima e Território', category: 'Clima', deadline: '30 ABR', location: 'Recife/PE', type: 'PJ', description: 'Vaga para atuação direta em projetos de adaptação climática no semiárido.' },
  { id: 3, title: 'Analista de Gênero e Raça', category: 'Gênero', deadline: '15 JUN', location: 'Híbrido', type: 'Vagas de Emprego', description: 'Implementação de políticas de diversidade e inclusão em organizações do terceiro setor.' },
  { id: 4, title: 'Desenvolvedor de Impacto', category: 'Vagas de Emprego', deadline: '20 MAI', location: 'São Paulo', type: 'CLT', description: 'Atuação técnica em plataforma de dados abertos para o setor público.' },
  { id: 5, title: 'Edital de Apoio a Coletivos', category: 'Editais', deadline: '10 MAI', location: 'Nordeste', type: 'Edital', description: 'Apoio financeiro para coletivos periféricos e redes locais.' }
]

const filteredOpportunities = computed(() => {
  let ops = (siteContent.opportunities?.length ? siteContent.opportunities : mockOpportunities)
  if (selectedCategory.value !== 'Tudo') ops = ops.filter(op => op.category === selectedCategory.value)
  if (destaqueNordeste.value) ops = ops.filter(op => op.location?.toLowerCase().includes('pe') || op.location?.toLowerCase().includes('nordeste'))
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    ops = ops.filter(op => op.title.toLowerCase().includes(q) || op.description.toLowerCase().includes(q))
  }
  return ops
})

const getCategoryColor = (cat) => colorMap[cat] || '#3D78E0'

const toggleFavorite = (id) => {
  if (favorites.value.has(id)) favorites.value.delete(id)
  else favorites.value.add(id)
}
</script>

<template>
  <div class="ops-technical-layout">
    <!-- PONTILHADO LIMA E MAGENTA ULTRA VISÍVEL -->
    <div class="super-visible-dots"></div>

    <div class="container-editorial">
      <header class="ops-hero-section">
        <!-- NOME TALENTOS EM VERDE (LIMA) -->
        <h1 class="editorial-title">
          {{ siteContent.opportunitiesConfig?.pageTitle1 || 'HUB DE' }} <span class="text-lima-accent">{{ siteContent.opportunitiesConfig?.pageTitle2 || 'TALENTOS' }}</span>
        </h1>

        <div class="editorial-controls">
          <div class="search-box-clean shadow-lg">
            <Search :size="20" class="text-dark opacity-80" />
            <input v-model="searchQuery" type="text" :placeholder="siteContent.opportunitiesConfig?.searchPlaceholder || 'Cargo, local ou organização...'" />
          </div>

          <div class="filters-container">
            <div class="pills-row">
              <button 
                v-for="cat in categories" :key="cat"
                @click="selectedCategory = cat"
                class="pill-btn-dynamic" 
                :class="{ 'active': selectedCategory === cat }"
                :style="{ '--hover-color': getCategoryColor(cat) }"
              >
                {{ cat }}
              </button>
            </div>

            <div class="nordeste-toggle-box">
              <span class="toggle-label">{{ siteContent.opportunitiesConfig?.toggleText || 'DESTAQUE NORDESTE' }}</span>
              <button @click="destaqueNordeste = !destaqueNordeste" class="toggle-switch" :class="{ 'on': destaqueNordeste }">
                <div class="toggle-handle"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div v-if="filteredOpportunities.length > 0" class="ops-grid-clean">
        <div v-for="op in filteredOpportunities" :key="op.id" 
          class="op-card-premium group"
          :style="{ '--hover-color': getCategoryColor(op.category) }"
        >
          <div class="card-header">
            <div class="category-badge" :style="{ backgroundColor: getCategoryColor(op.category) }">
              {{ op.category }}
            </div>
            <button @click="toggleFavorite(op.id)" class="fav-btn" :class="{ 'is-fav': favorites.has(op.id) }">
              <Bookmark :size="20" :fill="favorites.has(op.id) ? 'currentColor' : 'none'" />
            </button>
          </div>

          <h3 class="op-title">{{ op.title }}</h3>
          <p class="op-description">{{ op.description }}</p>

          <div class="op-meta-info">
            <div class="meta-tags">
              <div class="tag-item"><MapPin :size="14" /> <span>{{ op.location }}</span></div>
              <div class="tag-item"><Briefcase :size="14" /> <span>{{ op.type }}</span></div>
            </div>
            
            <div class="action-footer">
              <div class="deadline-pill">FECHA EM: <strong>{{ op.deadline }}</strong></div>
              <router-link :to="`/oportunidades/${op.id}`" class="btn-details">
                VER DETALHES <ArrowRight :size="16" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-spacer-secure"></div>
    </div>
  </div>
</template>

<style scoped>
.ops-technical-layout { min-height: 100vh; background-color: #FFFFFF; position: relative; overflow-x: hidden; }

/* PONTILHADO LIMA E MAGENTA - OPACIDADE ALTA (0.35) */
.super-visible-dots {
  position: fixed; inset: 0;
  background-image: 
    radial-gradient(#A4CD39 2.5px, transparent 2.5px),
    radial-gradient(#FF6BCA 2.5px, transparent 2.5px);
  background-size: 44px 44px;
  background-position: 0 0, 22px 22px;
  opacity: 0.35;
  pointer-events: none;
  z-index: 1;
}

.container-editorial { max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 10; }

.ops-hero-section { padding-top: 176px; margin-bottom: 5rem; }
.editorial-title { font-family: "Archivo Black", sans-serif; font-size: clamp(3rem, 10vw, 7rem); line-height: 0.85; text-transform: uppercase; color: #000000; margin-bottom: 3.5rem; letter-spacing: -0.05em; }

/* NOME TALENTOS EM VERDE LIMA */
.text-lima-accent { color: #A4CD39; }

/* CONTROLS */
.search-box-clean {
  max-width: 750px; background: white; border: 3px solid #000000; height: 68px; border-radius: 14px;
  display: flex; align-items: center; padding: 0 1.5rem; gap: 1rem; margin-bottom: 3rem;
}
.search-box-clean input { flex: 1; border: none; outline: none; font-weight: 800; font-size: 1.1rem; color: #000000; }

.filters-container { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2.5rem; }
.pills-row { display: flex; gap: 10px; flex-wrap: wrap; }

/* BOTÕES DE FILTRO COM HOVER COLORIDO DINÂMICO */
.pill-btn-dynamic {
  background: white; border: 2.5px solid #000000; padding: 10px 24px; border-radius: 100px;
  font-weight: 900; font-size: 11px; text-transform: uppercase; color: #000000; cursor: pointer; transition: all 0.3s;
}
.pill-btn-dynamic:hover {
  background: var(--hover-color);
  border-color: var(--hover-color);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.pill-btn-dynamic.active {
  background: #000000;
  color: #FFFFFF !important;
  border-color: #000000;
}

/* TOGGLE */
.nordeste-toggle-box { display: flex; align-items: center; gap: 12px; background: white; padding: 8px 16px; border: 2.5px solid #000; border-radius: 100px; }
.toggle-label { font-weight: 900; font-size: 11px; color: #000000; }
.toggle-switch { width: 44px; height: 22px; background: #EEE; border-radius: 100px; border: none; cursor: pointer; position: relative; transition: 0.3s; }
.toggle-handle { width: 16px; height: 16px; background: white; border-radius: 50%; position: absolute; left: 3px; top: 3px; transition: 0.3s; border: 1.5px solid #000; }
.toggle-switch.on { background: #A4CD39; }
.toggle-switch.on .toggle-handle { left: 25px; }

/* GRID & CARDS */
.ops-grid-clean { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 3rem; }
.op-card-premium {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border: 3px solid #000000;
  border-radius: 2rem;
  padding: 3rem;
  display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 10px 10px 0 rgba(0,0,0,0.05);
}
.op-card-premium:hover {
  transform: translateY(-12px);
  border-color: var(--hover-color);
  box-shadow: 20px 20px 0 var(--hover-color);
}

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
.category-badge { 
  padding: 8px 18px; border-radius: 10px; font-weight: 900; font-size: 10px; 
  text-transform: uppercase; color: #FFFFFF !important; border: 2px solid #000;
}
.fav-btn { background: transparent; border: none; color: #DDD; cursor: pointer; transition: 0.3s; }
.fav-btn.is-fav { color: #FF6BCA; }

.op-title { font-family: "Archivo Black", sans-serif; font-size: 1.75rem; line-height: 1.1; margin-bottom: 1.5rem; color: #000000; }
.op-description { font-size: 1.05rem; line-height: 1.7; color: #000000; font-weight: 600; margin-bottom: 3.5rem; flex: 1; }

.op-meta-info { padding-top: 2rem; border-top: 3px solid #000000; }
.meta-tags { display: flex; gap: 2rem; margin-bottom: 2rem; }
.tag-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 900; color: #000000; }

.action-footer { display: flex; justify-content: space-between; align-items: center; }
.deadline-pill { font-size: 11px; font-weight: 900; color: #000000; }
.deadline-pill strong { color: #DF2028; text-decoration: underline; }
.btn-details { font-weight: 900; font-size: 12px; color: #000000; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
.btn-details:hover { color: #FF6BCA; transform: translateX(8px); }

.footer-spacer-secure { height: 180px; }

@media (max-width: 768px) { .ops-grid-clean { grid-template-columns: 1fr; } .editorial-title { font-size: 3.5rem; } }
</style>