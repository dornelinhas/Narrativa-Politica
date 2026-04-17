<template>
  <div class="library-view">
    <!-- HERO MINIMALISTA -->
    <header class="library-header">
      <div class="container header-inner">
        <span class="lib-badge">RECURSOS TÉCNICOS</span>
        <h1>Biblioteca de <span>Impacto</span></h1>
        <p>Dados estruturados, Policy Briefs e pesquisas para fundamentar sua atuação política e social.</p>
      </div>
    </header>

    <!-- REPOSITÓRIO EDITORIAL -->
    <section class="library-content container section-padding">
      <div class="lib-filters">
        <div class="search-lib-refined">
          <Search :size="18" />
          <input type="text" v-model="searchQuery" placeholder="Pesquisar por tema ou título..." />
        </div>
      </div>

      <div class="lib-list">
        <div v-for="item in filteredLibrary" :key="item.id" class="lib-item-row">
          <div class="lib-item-meta">
            <span class="lib-type-tag">{{ item.type }}</span>
            <span class="lib-date-small">{{ formatDate(item.date) }}</span>
          </div>
          <div class="lib-item-main">
            <h3>{{ item.title }}</h3>
            <p class="text-readable">{{ item.description }}</p>
            <div class="lib-hashtags" v-if="item.tags">
              <span v-for="tag in item.tags.split(',')" :key="tag" class="lib-h-tag">#{{ tag.trim().replace('#', '') }}</span>
            </div>
          </div>
          <div class="lib-item-actions">
            <!-- Botão de Arquivo (Upload ou Link Principal) -->
            <a v-if="item.link" :href="item.link" target="_blank" class="btn-lib-action">
              <FileText v-if="item.type !== 'Link' && item.type !== 'Video'" :size="18" />
              <ExternalLink v-else :size="18" />
              <span>Acessar</span>
            </a>
            <!-- Botão de Link Externo Adicional -->
            <a v-if="item.externalLink" :href="item.externalLink" target="_blank" class="btn-lib-action outline">
              <ExternalLink :size="16" />
            </a>
          </div>
        </div>
      </div>

      <div v-if="!filteredLibrary.length" class="empty-state">
        <p>Nenhum recurso encontrado.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { Search, FileText, ExternalLink } from 'lucide-vue-next'

const searchQuery = ref('')

const filteredLibrary = computed(() => {
  const items = siteContent.library || []
  if (!searchQuery.value) return items
  const query = searchQuery.value.toLowerCase()
  return items.filter(i => 
    i.title.toLowerCase().includes(query) || 
    i.description.toLowerCase().includes(query) ||
    i.type.toLowerCase().includes(query) ||
    (i.tags && i.tags.toLowerCase().includes(query))
  )
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.library-view { background: #fff; padding-top: 140px; min-height: 100vh; }

.library-header { background: #fff; padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #F1F5F9; }
.lib-badge { font-size: 0.7rem; font-weight: 900; color: #FF2D55; letter-spacing: 2px; margin-bottom: 16px; display: block; text-transform: uppercase; }
.library-header h1 { font-size: 3.5rem; font-weight: 900; color: #111827; letter-spacing: -2.5px; margin-bottom: 20px; }
.library-header h1 span { color: #8A2BE2; }
.library-header p { font-size: 1.25rem; color: #64748B; max-width: 600px; margin: 0 auto; line-height: 1.6; }

.lib-filters { margin-bottom: 60px; display: flex; justify-content: center; margin-top: -32px; }
.search-lib-refined { 
  position: relative; width: 100%; max-width: 500px; 
  background: #fff; border-radius: 100px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.06); 
  border: 1px solid #E5E7EB;
}
.search-lib-refined svg { position: absolute; left: 24px; top: 50%; transform: translateY(-50%); color: #94A3B8; }
.search-lib-refined input { width: 100%; padding: 18px 24px 18px 60px; border-radius: 100px; border: none; font-size: 1rem; outline: none; }

.lib-list { max-width: 1000px; margin: 0 auto; }
.lib-item-row { 
  display: grid; grid-template-columns: 180px 1fr auto; gap: 40px; 
  padding: 40px 0; border-bottom: 1px solid #F1F5F9; align-items: flex-start;
  transition: all 0.3s;
}
.lib-item-row:hover { transform: translateX(10px); }

.lib-item-meta { display: flex; flex-direction: column; gap: 8px; }
.lib-type-tag { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #FF2D55; letter-spacing: 1px; }
.lib-date-small { font-size: 0.85rem; color: #94A3B8; font-weight: 600; }

.lib-item-main h3 { font-size: 1.4rem; font-weight: 800; color: #111827; margin-bottom: 12px; line-height: 1.3; }
.lib-item-main p { font-size: 1.05rem; color: #64748B; line-height: 1.6; margin-bottom: 16px; }

.lib-hashtags { display: flex; gap: 10px; }
.lib-h-tag { font-size: 0.75rem; font-weight: 700; color: #8A2BE2; }

.lib-item-actions { display: flex; gap: 12px; }
.btn-lib-action { 
  display: flex; align-items: center; gap: 10px; background: #111827; color: #fff; 
  text-decoration: none; padding: 12px 24px; border-radius: 100px; 
  font-weight: 800; font-size: 0.85rem; transition: all 0.3s;
}
.btn-lib-action:hover { background: #FF2D55; transform: scale(1.05); }
.btn-lib-action.outline { background: transparent; border: 1.5px solid #E5E7EB; color: #64748B; padding: 12px; }
.btn-lib-action.outline:hover { border-color: #111827; color: #111827; }

.empty-state { text-align: center; padding: 80px 0; color: #94A3B8; font-weight: 600; }

@media (max-width: 900px) {
  .lib-item-row { grid-template-columns: 1fr; gap: 20px; }
  .lib-item-meta { flex-direction: row; align-items: center; justify-content: space-between; }
  .lib-item-actions { margin-top: 10px; }
}
</style>