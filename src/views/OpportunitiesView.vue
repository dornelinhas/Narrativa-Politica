<template>
  <div class="opportunities container section-padding">
    <h1 class="page-title">Curadoria de Oportunidades</h1>
    <p class="subtitle">Vagas e programas selecionados com uma análise estratégica para acelerar sua carreira.</p>

    <div class="opportunity-list">
      <div v-for="opp in opportunities" :key="opp.id" class="opp-card">
        <div class="opp-header">
          <div class="opp-main-info">
            <h3 class="opp-title">{{ opp.title }}</h3>
            <p class="opp-org">{{ opp.organization }}</p>
          </div>
          <div class="opp-meta">
            <span class="deadline">Prazo: {{ formatDate(opp.deadline) }}</span>
          </div>
        </div>

        <div class="opp-analysis">
          <div class="analysis-tag">✦ Diferencial Estratégico</div>
          <p>{{ opp.strategic_analysis }}</p>
        </div>

        <div class="opp-footer">
          <a :href="opp.link" target="_blank" class="btn btn-outline btn-small">Ver Detalhes Externos</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'

const opportunities = mockData.opportunities

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short'
  })
}
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
  margin: 0 auto 60px;
  color: #666;
}

.opportunity-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.opp-card {
  background: white;
  padding: 40px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-light);
  box-shadow: 0 5px 15px rgba(0,0,0,0.02);
  transition: var(--transition);
}

.opp-card:hover {
  border-color: var(--accent-gold);
  transform: translateX(5px);
}

.opp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.opp-title {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 5px;
}

.opp-org {
  color: var(--accent-coral);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.deadline {
  background: var(--bg-primary);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #888;
}

.opp-analysis {
  background: rgba(212, 175, 55, 0.05);
  padding: 25px;
  border-left: 3px solid var(--accent-gold);
  margin-bottom: 25px;
}

.analysis-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 10px;
}

.opp-analysis p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  font-style: italic;
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .opp-header {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
