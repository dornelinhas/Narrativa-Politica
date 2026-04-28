<template>
  <div v-if="project" class="project-detail">
    <!-- CASE STUDY HEADER -->
    <header class="cs-header">
      <div class="container cs-header-inner">
        <router-link to="/projetos" class="cs-back-link">← Lab de Impacto</router-link>
        
        <div class="cs-meta">
          <span class="cs-tag">Estudo de Caso</span>
          <span class="cs-date">{{ project.id === 1 ? '2023 - 2024' : 'Ativo' }}</span>
        </div>
        
        <h1 class="cs-title">{{ project.title }}</h1>
        <p v-if="project.impact" class="cs-impact-highlight">{{ project.impact }}</p>
      </div>
    </header>

    <!-- CASE STUDY BODY -->
    <article class="cs-body">
      <div class="container">
        <div class="cs-grid">
          
          <div class="cs-visual">
            <div class="cs-image-wrapper">
              <img :src="project.image" :alt="project.title" />
            </div>
            
            <div class="cs-sidebar-card">
              <h3>Gostou deste modelo?</h3>
              <p>Trabalhamos com ONGs corporativas e multilaterais para aplicar soluções semelhantes de dados e advocacy.</p>
              <router-link to="/contatos" class="cs-btn-action">Falar com Consultoria</router-link>
            </div>
          </div>

          <div class="cs-content">
            <h2 class="cs-section-title">O Desafio</h2>
            <div class="cs-render" v-html="project.description || project.desc || 'Descrição do desafio não informada.'"></div>
            
            <div class="cs-divider"></div>
            
            <h2 class="cs-section-title">A Nossa Solução</h2>
            <div class="cs-render" v-html="project.content || project.solution || 'Detalhes da solução não informados.'"></div>
          </div>
          
        </div>
      </div>
    </article>
  </div>
  <div v-else class="container section-padding text-center" style="margin-top: 100px;">
    <h2>Projeto não encontrado</h2>
    <router-link to="/projetos" class="cs-btn-action" style="margin-top: 20px;">Voltar</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'

const route = useRoute()
const project = computed(() => siteContent.projects.find(p => p.id === parseInt(route.params.id)))

const formattedContent = computed(() => {
  if (!project.value?.content) return ''
  return project.value.content.split('\n\n').map(para => `<p class="cs-paragraph">${para}</p>`).join('')
})
</script>

<style scoped>
/* HEADER */
.cs-header {
  background: #F9FAFB;
  padding: 180px 0 80px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.cs-header-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.cs-back-link {
  display: inline-block;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-purple);
  text-decoration: none;
  font-size: 0.8rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.cs-meta {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}

.cs-tag {
  background: var(--color-lime);
  color: var(--color-graphite);
  font-weight: 900;
  font-size: 0.65rem;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cs-date {
  background: #E2E8F0;
  color: #475569;
  font-weight: 800;
  font-size: 0.65rem;
  padding: 4px 10px;
  border-radius: 4px;
}

.cs-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 900;
  color: var(--color-graphite);
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 24px;
}

.cs-impact-highlight {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-petrol);
}

/* BODY */
.cs-body {
  padding: 80px 0 120px;
  background: #fff;
}

.cs-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 80px;
  align-items: start;
}

.cs-visual {
  position: sticky;
  top: 100px;
}

.cs-image-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 40px;
}

.cs-image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.cs-sidebar-card {
  background: #F9FAFB;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.04);
}

.cs-sidebar-card h3 {
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: 15px;
  color: var(--color-graphite);
}

.cs-sidebar-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 24px;
  line-height: 1.6;
}

.cs-btn-action {
  display: block;
  width: 100%;
  text-align: center;
  background: var(--color-graphite);
  color: #fff;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-weight: 800;
  transition: opacity 0.2s;
}

.cs-btn-action:hover {
  opacity: 0.85;
}

.cs-content {
  max-width: 700px;
}

.cs-section-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-graphite);
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

:deep(.cs-paragraph) {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 24px;
}

.cs-divider {
  height: 1px;
  background: #E2E8F0;
  margin: 60px 0;
  width: 100px;
}

@media (max-width: 992px) {
  .cs-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .cs-visual {
    position: static;
    order: -1;
  }
  .cs-header {
    padding: 140px 0 60px;
  }
}
</style>
