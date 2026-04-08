<template>
  <div class="paths container section-padding">
    <h1 class="page-title">Trilhas de Aprendizado</h1>
    <p class="subtitle">Caminhos estruturados para quem deseja excelência profissional e acadêmica.</p>

    <div class="paths-container">
      <div v-for="path in paths" :key="path.id" class="path-section">
        <h2 class="path-title">{{ path.title }}</h2>
        <p class="path-desc">{{ path.description }}</p>

        <div class="steps">
          <div v-for="(step, index) in path.steps" :key="index" class="step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <p>{{ step }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
const paths = mockData.paths
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

.paths-container {
  display: flex;
  flex-direction: column;
  gap: 100px;
  max-width: 800px;
  margin: 0 auto;
}

.path-title {
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: var(--accent-gold);
}

.path-desc {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 40px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--gray-light);
  z-index: 1;
}

.step {
  display: flex;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: white;
  border: 2px solid var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--accent-gold);
  flex-shrink: 0;
}

.step-content {
  background: white;
  padding: 20px 25px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-light);
  flex: 1;
  transition: var(--transition);
}

.step:hover .step-content {
  border-color: var(--accent-coral);
  transform: translateX(10px);
}
</style>
