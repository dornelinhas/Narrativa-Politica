<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">Narrativas que moldam a <span class="highlight">política</span> global.</h1>
        <p class="hero-subtitle">
          Análise acadêmica, curadoria estratégica de oportunidades e mentoria de carreira para quem quer fazer a diferença nas Relações Internacionais.
        </p>
        <div class="hero-actions">
          <router-link to="/artigos" class="btn btn-primary">Ler Artigos</router-link>
          <router-link to="/mentoria" class="btn btn-outline">Conhecer Mentoria</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="featured section-padding container">
      <div class="section-header">
        <h2 class="section-title">Análises Recentes</h2>
        <router-link to="/artigos" class="view-all">Ver tudo</router-link>
      </div>
      <div class="article-grid">
        <div v-for="article in featuredArticles" :key="article.id" class="article-card">
          <div class="card-img" :style="{ backgroundImage: `url(${article.image})` }"></div>
          <div class="card-body">
            <span class="category">{{ article.category }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <router-link :to="`/artigo/${article.id}`" class="read-more">Leia mais &rarr;</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Opportunities -->
    <section class="cta-opportunities section-padding">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2>Curadoria Estratégica</h2>
          <p>Não entregamos apenas vagas, entregamos o caminho. Analisamos cada oportunidade sob uma ótica estratégica para que você saiba exatamente onde investir seu tempo.</p>
          <router-link to="/oportunidades" class="btn btn-primary">Ver Oportunidades</router-link>
        </div>
        <div class="cta-stats">
          <div class="stat-item">
            <span class="stat-number">100+</span>
            <span class="stat-label">Mentoradas</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50+</span>
            <span class="stat-label">Relatórios</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Paths Highlights -->
    <section class="paths-highlights section-padding container">
      <h2 class="section-title centered">Trilhas de Aprendizado</h2>
      <div class="paths-grid">
        <div v-for="path in paths" :key="path.id" class="path-card">
          <div class="path-icon">✦</div>
          <h3>{{ path.title }}</h3>
          <p>{{ path.description }}</p>
          <router-link to="/trilhas" class="link-elegant">Ver trilha completa</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
import { computed } from 'vue'

const featuredArticles = computed(() => mockData.articles.slice(0, 2))
const paths = computed(() => mockData.paths)
</script>

<style scoped>
.section-padding {
  padding: 100px 0;
}

.hero {
  height: 85vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #FFF9FB 0%, #F7F1F3 100%);
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  top: 10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--accent-coral) 0%, transparent 70%);
  opacity: 0.1;
  border-radius: 50%;
}

.hero-content {
  max-width: 800px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 30px;
  font-weight: 700;
}

.highlight {
  color: var(--accent-gold);
  font-style: italic;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 20px;
}

/* Featured Section */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
}

.section-title.centered {
  text-align: center;
  margin-bottom: 60px;
}

.view-all {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--accent-gold);
  border-bottom: 1px solid var(--accent-gold);
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.article-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.03);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.08);
}

.card-img {
  height: 300px;
  background-size: cover;
  background-position: center;
}

.card-body {
  padding: 30px;
}

.category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--accent-coral);
  font-weight: 700;
  letter-spacing: 1px;
}

.card-body h3 {
  margin: 15px 0;
  font-size: 1.5rem;
}

.card-body p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.read-more {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.9rem;
}

/* CTA Opportunities */
.cta-opportunities {
  background-color: var(--accent-teal);
  color: white;
}

.cta-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  gap: 80px;
}

.cta-text h2 {
  font-size: 3rem;
  margin-bottom: 25px;
}

.cta-text p {
  font-size: 1.1rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.cta-stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--accent-gold);
}

.stat-label {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Paths highlights */
.paths-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.path-card {
  padding: 40px;
  background: white;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
}

.path-icon {
  font-size: 2rem;
  color: var(--accent-gold);
  margin-bottom: 20px;
}

.path-card h3 {
  margin-bottom: 15px;
}

.link-elegant {
  display: inline-block;
  margin-top: 20px;
  font-weight: 600;
  color: var(--accent-coral);
}

@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }
  .article-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .cta-inner {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .paths-grid {
    grid-template-columns: 1fr;
  }
}
</style>
