<template>
  <div class="opportunities-view section-padding container">
    <div class="page-header text-center reveal-on-scroll">
      <span class="badge">Vagas & Editais</span>
      <h1 class="page-title">Oportunidades</h1>
      <p class="subtitle">Conectando talentos a chamadas de impacto social, vagas e editais que potencializam o seu desenvolvimento.</p>
    </div>

    <div class="opportunities-controls container reveal-on-scroll delay-1">
      <div class="search-opps">
        <Search :size="18" class="search-icon-opps" />
        <input type="text" v-model="oppSearch" placeholder="Filtrar por cargo, instituição ou tema...">
      </div>
      <div class="filter-tabs-opps">
        <button v-for="tab in ['Todas', 'Vagas', 'Editais', 'Bolsas']" 
                :key="tab"
                :class="{ active: currentFilter === tab }" 
                @click="currentFilter = tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="opportunities-grid reveal-on-scroll delay-2">
      <div v-for="opp in filteredOpps" :key="opp.id" class="opp-card">
        <div class="opp-header">
          <span class="opp-type-badge" :class="opp.type.toLowerCase()">{{ opp.type }}</span>
          <div class="opp-deadline">
            <Clock :size="14" />
            <span>Até {{ opp.deadline }}</span>
          </div>
        </div>
        <h3 class="opp-title">{{ opp.title }}</h3>
        <p class="opp-org">{{ opp.organization || opp.org }}</p>
        <div v-if="opp.tags" class="opp-tags">
          <span v-for="tag in opp.tags.split(',')" :key="tag" class="opp-tag">#{{ tag.trim().replace('#', '') }}</span>
        </div>
        <p class="opp-desc">{{ opp.description }}</p>
        <div class="opp-footer">
          <a :href="opp.link || '#'" target="_blank" class="btn-opp-link">Saber mais <ArrowRight :size="16" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { Search, Clock, ArrowRight } from 'lucide-vue-next'

const currentFilter = ref('Todas')
const oppSearch = ref('')

const filteredOpps = computed(() => {
  const opps = siteContent.opportunities || []
  return opps.filter(o => {
    const matchesTab = currentFilter.value === 'Todas' || o.type === currentFilter.value
    const query = oppSearch.value.toLowerCase()
    const matchesSearch = o.title.toLowerCase().includes(query) || 
                          (o.organization && o.organization.toLowerCase().includes(query)) ||
                          (o.org && o.org.toLowerCase().includes(query))
    return matchesTab && matchesSearch
  })
})
</script>

<style scoped>
.opportunities-view {
  position: relative;
  z-index: 10;
  padding-top: 160px;
  padding-bottom: 100px;
}

.page-header { margin-bottom: 60px; }
.page-title { font-size: 3.5rem; font-weight: 900; color: #1A1C2E; margin-bottom: 15px; letter-spacing: -2px; }
.subtitle { font-size: 1.25rem; color: #64748B; max-width: 600px; margin: 0 auto; line-height: 1.6; }

.badge { background: #8A2BE2; color: white; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; margin-bottom: 16px; display: inline-block; }

/* CONTROLS */
.opportunities-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
}

.search-opps {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-icon-opps {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
}

.search-opps input {
  width: 100%;
  padding: 14px 18px 14px 50px;
  border-radius: 14px;
  border: 2.5px solid #F1F5F9;
  background: #F8FAFC;
  font-size: 0.95rem;
  transition: all 0.3s;
  outline: none;
}

.search-opps input:focus { border-color: #8A2BE2; background: #fff; }

.filter-tabs-opps { display: flex; gap: 8px; }
.filter-tabs-opps button { padding: 12px 24px; border-radius: 12px; border: none; background: #F1F5F9; font-weight: 800; cursor: pointer; transition: all 0.2s; color: #64748B; font-size: 0.8rem; text-transform: uppercase; }
.filter-tabs-opps button.active { background: #8A2BE2; color: white; }

.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

.opp-card {
  background: #FFFFFF;
  border: 1px solid #F1F5F9;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: visible; /* Prevents badge cutting */
}

.opp-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
  border-color: #E2E8F0;
}

.opp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.opp-type-badge {
  background: #F3E8FF;
  color: #8A2BE2;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.opp-deadline { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94A3B8; font-weight: 700; }

.opp-title { font-size: 1.5rem; font-weight: 900; color: #1A1C2E; margin-bottom: 8px; line-height: 1.3; }
.opp-org { color: #FF2D55; font-weight: 800; font-size: 0.95rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }

.opp-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.opp-tag { font-size: 0.75rem; font-weight: 800; color: #8A2BE2; background: rgba(138, 43, 226, 0.05); padding: 4px 10px; border-radius: 6px; }

.opp-desc { font-size: 1rem; color: #475569; line-height: 1.7; margin-bottom: 24px; flex: 1; }

.btn-opp-link {
  font-weight: 800;
  color: #1A1C2E;
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-opp-link:hover { color: #8A2BE2; transform: translateX(5px); }

@media (max-width: 992px) {
  .opportunities-controls { flex-direction: column; align-items: stretch; }
}

@media (max-width: 768px) {
  .opportunities-view { padding-top: 120px; }
  .page-title { font-size: 2.5rem; }
}
</style>
