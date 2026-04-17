<template>
  <div class="mentoring container section-padding">
    <h1 class="page-title">{{ siteSettings.mentoringTitle }}</h1>
    <p class="subtitle">{{ siteSettings.mentoringSubtitle }}</p>

    <div class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-desc">{{ service.description }}</p>
        <span class="service-price">{{ service.price }}</span>
        <button class="btn btn-primary">Agendar Conversa</button>
      </div>
    </div>

    <div class="contact-section glass-card-dark">
      <h2>Dúvidas ou Orçamentos Personalizados?</h2>
      <p>Estamos prontos para desenhar uma solução que atenda às suas necessidades específicas.</p>
      <router-link to="/contatos" class="btn btn-outline-white">Falar com Consultoria</router-link>
    </div>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
import { siteSettings } from '../store/settings'
const services = mockData.services
</script>

<style scoped>
.section-padding {
  padding: 80px 0;
}

.page-title {
  font-size: 3.5rem;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 900;
  letter-spacing: -1px;
}

.subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
  color: var(--text-muted);
  font-size: 1.2rem;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 100px;
}

.service-card {
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  border: 1px solid #F1F5F9;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  border-color: var(--color-logo-2);
}

.service-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--text-main);
  font-weight: 800;
}

.service-desc {
  color: var(--text-muted);
  margin-bottom: 30px;
  font-size: 1.05rem;
  line-height: 1.7;
}

.service-price {
  display: block;
  font-weight: 800;
  color: var(--color-logo-1);
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 2px;
}

.contact-section {
  padding: 80px;
  border-radius: 20px;
  text-align: center;
  background: var(--text-main);
  color: white;
}

.contact-section h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: 900;
}

.contact-section p {
  margin-bottom: 40px;
  opacity: 0.8;
  font-size: 1.2rem;
}

.btn-outline-white {
  border: 2px solid white;
  color: white;
  padding: 15px 35px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 800;
  display: inline-block;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 40px 20px;
  }
}
</style>
