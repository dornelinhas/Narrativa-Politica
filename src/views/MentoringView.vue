<template>
  <div class="mentoring container section-padding">
    <h1 class="page-title">Mentoria & Palestras</h1>
    <p class="subtitle">Apoio individualizado e workshops para organizações que buscam excelência estratégica.</p>

    <div class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-desc">{{ service.description }}</p>
        <span class="service-price">{{ service.price }}</span>
        <button class="btn btn-primary">Agendar Conversa</button>
      </div>
    </div>

    <div class="contact-section">
      <h2>Dúvidas ou Orçamentos Personalizados?</h2>
      <p>Estamos prontos para desenhar uma solução que atenda às suas necessidades específicas.</p>
      <a href="mailto:contato@narrativapolitica.com.br" class="btn btn-outline">Enviar Email</a>
    </div>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
const services = mockData.services
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 100px;
}

.service-card {
  background: white;
  padding: 50px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-light);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
  border-color: var(--accent-gold);
}

.service-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text-main);
}

.service-desc {
  color: #666;
  margin-bottom: 30px;
  font-size: 1rem;
  line-height: 1.6;
}

.service-price {
  display: block;
  font-weight: 700;
  color: var(--accent-gold);
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.contact-section {
  background-color: var(--text-main);
  color: white;
  padding: 80px;
  border-radius: var(--border-radius);
  text-align: center;
}

.contact-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-section p {
  margin-bottom: 40px;
  opacity: 0.8;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 40px;
  }
}
</style>
