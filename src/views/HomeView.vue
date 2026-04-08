<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">Narrativas que <span class="text-gradient">transformam</span> o mundo.</h1>
        <p class="hero-subtitle">
          Uma plataforma dedicada à análise estratégica, mentoria de carreira e curadoria de oportunidades em Relações Internacionais e Política.
        </p>
        <div class="hero-actions">
          <router-link to="/artigos" class="btn btn-primary">Explorar Análises</router-link>
          <router-link to="/mentoria" class="btn btn-outline">Nossa Mentoria</router-link>
        </div>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="container section-padding">
      <div class="grid-highlights">
        <div class="glass-card highlight-card">
          <div class="icon-box grad-1">✦</div>
          <h3>Análise Acadêmica</h3>
          <p>Rigor teórico aplicado aos desafios contemporâneos da política global.</p>
        </div>
        <div class="glass-card highlight-card">
          <div class="icon-box grad-2">★</div>
          <h3>Curadoria Estratégica</h3>
          <p>Oportunidades selecionadas com análise de diferencial competitivo.</p>
        </div>
        <div class="glass-card highlight-card">
          <div class="icon-box grad-3">♥</div>
          <h3>Mentoria de Carreira</h3>
          <p>Aceleração profissional para mulheres em Relações Internacionais.</p>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured-section container section-padding">
      <div class="section-header">
        <h2 class="section-title">Últimas Publicações</h2>
        <router-link to="/artigos" class="link-more">Ver todas as análises &rarr;</router-link>
      </div>
      <div class="article-grid">
        <div v-for="article in featuredArticles" :key="article.id" class="article-card glass-card">
          <div class="card-image" :style="{ backgroundImage: `url(${article.image})` }"></div>
          <div class="card-content">
            <span class="badge">{{ article.category }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <router-link :to="`/artigo/${article.id}`" class="btn-text">Ler artigo completo</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
import { computed } from 'vue'

const featuredArticles = computed(() => mockData.articles.slice(0, 2))
</script>

<style scoped>
.hero {
  padding: 140px 0 100px;
  text-align: center;
}

.hero-title {
  font-size: 5.5rem;
  line-height: 0.95;
  margin-bottom: 30px;
  color: var(--text-white);
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto 50px;
  color: rgba(255,255,255,0.8);
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.section-title {
  color: white;
  margin-bottom: 60px;
}

.highlight-card h3 {
  color: white;
}

.highlight-card p {
  color: rgba(255,255,255,0.7);
}

.article-card {
  background: rgba(255, 255, 255, 0.05);
}

.article-card h3 {
  color: white;
}

.article-card p {
  color: rgba(255,255,255,0.6);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.section-padding {
  padding: 100px 0;
}

.grid-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.highlight-card {
  padding: 50px 40px;
  text-align: center;
  transition: var(--transition);
}

.highlight-card:hover {
  transform: translateY(-15px);
  background: white;
}

.icon-box {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 900;
}

.grad-1 { background: var(--color-red); }
.grad-2 { background: var(--color-pink); }
.grad-3 { background: var(--color-blue); }

.highlight-card h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.article-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-image {
  height: 280px;
  background-size: cover;
  background-position: center;
}

.card-content {
  padding: 40px;
}

.badge {
  background: var(--color-yellow);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: inline-block;
}

.btn-text {
  margin-top: 20px;
  display: inline-block;
  font-weight: 800;
  color: var(--color-pink);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

@media (max-width: 992px) {
  .hero-title { font-size: 3.5rem; }
  .grid-highlights { grid-template-columns: 1fr; }
  .article-grid { grid-template-columns: 1fr; }
}
</style>
