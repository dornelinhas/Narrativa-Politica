<template>
  <div class="projects container section-padding">
    <h1 class="page-title">Projetos de Impacto</h1>
    <p class="subtitle">Iniciativas que transformam a teoria em prática política e acadêmica.</p>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-info">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>
        </div>
        <div class="project-impact">
          <span class="impact-label">Impacto Gerado</span>
          <p class="impact-text">{{ project.impact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
const projects = mockData.projects
</script>

<style scoped>
.section-padding {
  padding: 80px 0;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 15px;
  text-align: center;
}

.subtitle {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 80px;
  color: #666;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
}

.project-card {
  background: white;
  padding: 50px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--text-main);
}

.project-desc {
  color: #666;
  margin-bottom: 40px;
  font-size: 1.05rem;
  line-height: 1.7;
}

.project-impact {
  border-top: 1px solid var(--gray-light);
  padding-top: 30px;
}

.impact-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.impact-text {
  font-weight: 600;
  color: var(--accent-coral);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
