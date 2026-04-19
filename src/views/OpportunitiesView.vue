<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
const selectedCategory = ref('Tudo')

const categories = computed(() => ['Tudo', 'Bolsas', 'Vagas de Emprego', 'Chamada para Artigos', 'Editais'])

const filteredOpportunities = computed(() => {
  if (selectedCategory.value === 'Tudo') return siteContent.opportunities
  return siteContent.opportunities.filter(op => op.category === selectedCategory.value)
})
</script>

<template>
  <div class="oportunidades-page grid-pattern selection-custom">
    <!-- HEADER -->
    <header class="page-hero pt-48 pb-16">
      <div class="container-custom">
        <h1 class="font-display text-5xl md-text-7xl uppercase tracking-tighter leading-none mb-12">
          Portal de <span class="accent">Oportunidades</span>
        </h1>

        <!-- SISTEMA DE FILTROS (FUNCIONAL) -->
        <div class="filter-pills-brutalist mb-12">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            class="pill-btn-dark"
            :class="{ active: selectedCategory === cat }"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </header>

    <div class="ops-grid container-custom pb-48">
      <!-- DECORATIVOS (LIMPOS E SEM O QUADRADO CINZA) -->
      <div class="deco-left">
        <div style="width:8px;height:120px;background:#FF2D78;border-radius:4px;margin-left:10px"></div>
        <div style="width:20px;height:20px;background:#FF2D78;border-radius:50%"></div>
      </div>
      
      <div class="deco-connector">
        <svg viewBox="0 0 20 300" style="width:100%;height:100%">
          <path d="M 10 0 L 10 200 Q 10 230 0 250" stroke="#AAFF00" stroke-width="3" fill="none"/>
          <circle cx="10" cy="260" r="10" fill="#FF2D78"/>
          <circle cx="10" cy="10" r="6" fill="#1B8FFF"/>
        </svg>
      </div>

      <!-- CARDS DINÂMICOS COM ESTÉTICA DARK PREMIUM -->
      <div v-for="op in filteredOpportunities" :key="op.id" class="op-card-premium" :class="getBorderClass(op.category)">
        <span class="op-tag-premium" :class="getTagClass(op.category)">{{ op.category }}</span>
        <h3 class="font-display text-3xl uppercase tracking-tighter leading-tight text-white mb-4">
          {{ op.title }}
        </h3>
        <p class="font-sans text-sm font-medium text-white opacity-60 mb-8 flex-1">
          {{ op.description }}
        </p>
        <div class="op-deadline font-sans font-black text-xs tracking-widest opacity-40 uppercase">
          PRAZO: <strong class="text-white">{{ op.deadline }}</strong>
        </div>
        <router-link :to="`/oportunidades/${op.id}`" class="op-btn-premium" :class="getTagClass(op.category)">
          CANDIDATE-SE AGORA
        </router-link>
      </div>

      <!-- EMPTY STATE DARK -->
      <div v-if="filteredOpportunities.length === 0" class="empty-state-dark">
        <h3 class="font-display text-3xl mb-4">SEM OPORTUNIDADES NESTA CATEGORIA</h3>
        <button @click="selectedCategory = 'Tudo'" class="op-btn-premium green">VER TODAS</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getBorderClass(cat) {
      const map = {
        'Bolsas': 'border-green',
        'Vagas de Emprego': 'border-pink',
        'Chamada para Artigos': 'border-blue',
        'Editais': 'border-yellow'
      }
      return map[cat] || 'border-white'
    },
    getTagClass(cat) {
      const map = {
        'Bolsas': 'green',
        'Vagas de Emprego': 'pink',
        'Chamada para Artigos': 'blue',
        'Editais': 'yellow'
      }
      return map[cat] || 'white'
    }
  }
}
</script>

<style scoped>
.oportunidades-page { background: #0A0A0A; color: #fff; min-height: 100vh; }
.container-custom { max-width: 85rem; margin: 0 auto; padding: 0 2.5rem; }

.grid-pattern {
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
  background-size: 40px 40px;
}

.page-hero { text-align: left; }
.accent { color: #AAFF00; }

/* FILTROS DARK */
.filter-pills-brutalist { display: flex; gap: 1rem; flex-wrap: wrap; }
.pill-btn-dark {
  padding: 0.8rem 1.5rem; border: 3px solid #333; background: transparent;
  color: #666; font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem;
  text-transform: uppercase; cursor: pointer; transition: all 0.2s;
}
.pill-btn-dark:hover { color: white; border-color: white; }
.pill-btn-dark.active { background: white; color: black; border-color: white; box-shadow: 6px 6px 0 #AAFF00; }

/* GRID E CARDS */
.ops-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; position: relative; }

.op-card-premium {
  background: #141414; border: 4px solid; padding: 2.5rem; border-radius: 4px;
  display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.op-card-premium.border-green { border-color: #AAFF00; }
.op-card-premium.border-pink { border-color: #FF2D78; }
.op-card-premium.border-blue { border-color: #1B8FFF; }
.op-card-premium.border-yellow { border-color: #FFE65A; }

.op-card-premium:hover { transform: translate(-8px, -8px); box-shadow: 12px 12px 0 rgba(255,255,255,0.05); }

.op-tag-premium {
  display: inline-block; font-family: "Inter", sans-serif; font-weight: 900; font-size: 11px;
  letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 50px;
  margin-bottom: 2rem; align-self: flex-start;
}
.op-tag-premium.green { background: #AAFF00; color: #000; }
.op-tag-premium.pink { background: #FF2D78; color: #fff; }
.op-tag-premium.blue { background: #1B8FFF; color: #fff; }
.op-tag-premium.yellow { background: #FFE65A; color: #000; }

.op-btn-premium {
  display: block; text-align: center; font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 13px; letter-spacing: 2px; text-transform: uppercase; padding: 1.2rem;
  border-radius: 4px; text-decoration: none; transition: all 0.2s; margin-top: 2rem;
}
.op-btn-premium.green { background: #AAFF00; color: #000; }
.op-btn-premium.pink { background: #FF2D78; color: #fff; }
.op-btn-premium.blue { background: #1B8FFF; color: #fff; }
.op-btn-premium.yellow { background: #FFE65A; color: #000; }
.op-btn-premium:hover { filter: brightness(1.2); transform: scale(1.02); }

/* DECO */
.deco-left { position: absolute; left: -4rem; top: 100px; display: flex; flex-direction: column; gap: 1rem; opacity: 0.3; }
.deco-connector { position: absolute; right: -2rem; top: 20%; width: 20px; height: 300px; opacity: 0.2; }

.empty-state-dark { grid-column: span 3; text-align: center; padding: 5rem; border: 4px dashed #333; }

@media (max-width: 1100px) { .ops-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .ops-grid { grid-template-columns: 1fr; } .container-custom { padding: 0 1.5rem; } }
</style>