<template>
  <div class="home">
    <!-- HERO SECTION: High Impact -->
    <section class="hero-section">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-tagline">Pesquisa, Análise e Ação</span>
          <h1 class="hero-title">
            Narrativas que <span class="text-gradient">transformam</span> o cenário global.
          </h1>
          <p class="hero-lead">
            Unimos o rigor acadêmico à estratégia de mercado para potencializar carreiras e gerar impacto real nas Relações Internacionais.
          </p>
          <div class="hero-btns">
            <router-link to="/artigos" class="btn btn-primary">Nossos Artigos</router-link>
            <router-link to="/sobre" class="btn btn-outline">Institucional</router-link>
          </div>
        </div>
      </div>
      <!-- Background elements for depth -->
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
      </div>
    </section>

    <!-- PILLARS SECTION: Modular Grid -->
    <section class="pillars-section section-padding">
      <div class="container">
        <div class="section-intro text-center">
          <h2 class="section-heading">O que fazemos?</h2>
          <p class="section-subheading">Nossa atuação é pautada em três pilares fundamentais para a formação de excelência.</p>
        </div>
        <div class="card-grid">
          <div class="pillar-card card">
            <div class="pillar-icon blue">01</div>
            <h3>Análise Política</h3>
            <p>Monitoramento e análise estratégica de cenários geopolíticos com foco em tendências emergentes e tomada de decisão.</p>
          </div>
          <div class="pillar-card card">
            <div class="pillar-icon purple">02</div>
            <h3>Curadoria de Vagas</h3>
            <p>Seleção inteligente de oportunidades com análise de fit cultural e diferencial estratégico para acelerar sua entrada no mercado.</p>
          </div>
          <div class="pillar-card card">
            <div class="pillar-icon pink">03</div>
            <h3>Gênero & Política</h3>
            <p>Espaço dedicado à pesquisa e fomento da liderança feminina, combatendo disparidades e promovendo a diversidade no setor.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED NEWS/ARTICLES -->
    <section class="featured-section section-padding bg-alt">
      <div class="container">
        <div class="section-header-flex">
          <h2 class="section-heading">Análises Recentes</h2>
          <router-link to="/artigos" class="link-arrow">Ver todas as publicações →</router-link>
        </div>
        <div class="article-grid-modern">
          <div v-for="article in featuredArticles" :key="article.id" class="modern-article-card">
            <div class="article-img-wrap">
              <div class="article-img" :style="{ backgroundImage: `url(${article.image})` }"></div>
              <span class="article-category-badge">{{ article.category }}</span>
            </div>
            <div class="article-info">
              <span class="article-date">{{ formatDate(article.date) }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
              <router-link :to="`/artigo/${article.id}`" class="read-more-link">Continuar lendo</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACT SECTION -->
    <section class="impact-section section-padding">
      <div class="container impact-inner">
        <div class="impact-text">
          <h2 class="section-heading">Nosso Impacto</h2>
          <p>Trabalhamos para democratizar o acesso à informação de qualidade e construir pontes entre a academia e o mercado de trabalho.</p>
          <div class="impact-stats">
            <div class="stat-item">
              <span class="stat-num">50+</span>
              <span class="stat-label">Artigos Publicados</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">100+</span>
              <span class="stat-label">Mulheres Mentoradas</span>
            </div>
          </div>
        </div>
        <div class="impact-cta-box glass-card">
          <h3>Pronta para o próximo passo?</h3>
          <p>Seja para palestras, workshops ou mentoria individual, estamos aqui para potencializar sua narrativa.</p>
          <router-link to="/mentoria" class="btn btn-primary w-full">Falar com Consultoria</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import mockData from '../data/mockData.json'
import { computed } from 'vue'

const featuredArticles = computed(() => mockData.articles.slice(0, 2))

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
/* Hero Design */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  padding-top: 100px;
  overflow: hidden;
}

.hero-inner {
  position: relative;
  z-index: 10;
}

.hero-content {
  max-width: 800px;
}

.hero-tagline {
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-blue);
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.hero-title {
  font-size: 4.5rem;
  margin-bottom: 30px;
}

.hero-lead {
  font-size: 1.4rem;
  color: var(--text-muted);
  margin-bottom: 40px;
  line-height: 1.5;
}

.hero-btns {
  display: flex;
  gap: 20px;
}

.hero-bg-shapes .shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: rgba(0, 123, 255, 0.1);
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: rgba(255, 77, 109, 0.08);
  bottom: 100px;
  left: -50px;
}

/* Pillar Cards */
.text-center { text-align: center; }
.section-intro { margin-bottom: 80px; }
.section-subheading { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

.pillar-card {
  text-align: left;
}

.pillar-icon {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 25px;
  opacity: 0.2;
}

.pillar-icon.blue { color: var(--color-blue); }
.pillar-icon.purple { color: var(--color-purple); }
.pillar-icon.pink { color: var(--color-pink); }

/* Modern Article Grid */
.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
}

.link-arrow {
  font-weight: 700;
  color: var(--color-blue);
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.article-grid-modern {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.modern-article-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  transition: var(--transition);
}

.modern-article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
}

.article-img-wrap {
  height: 300px;
  position: relative;
}

.article-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.article-category-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--color-blue);
  color: white;
  padding: 6px 15px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 4px;
}

.article-info {
  padding: 40px;
}

.article-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 15px;
}

.article-info h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.read-more-link {
  display: inline-block;
  margin-top: 25px;
  font-weight: 800;
  color: var(--color-blue);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

/* Impact Section */
.impact-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 100px;
  align-items: center;
}

.impact-stats {
  display: flex;
  gap: 50px;
  margin-top: 50px;
}

.stat-num {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-blue);
  display: block;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  color: var(--text-muted);
}

.impact-cta-box {
  padding: 60px;
  background: white;
  border: 1px solid #E2E8F0;
  text-align: center;
}

.impact-cta-box h3 { margin-bottom: 20px; }
.impact-cta-box p { margin-bottom: 35px; color: var(--text-muted); }
.w-full { width: 100%; text-align: center; }

@media (max-width: 992px) {
  .hero-title { font-size: 3rem; }
  .article-grid-modern { grid-template-columns: 1fr; }
  .impact-inner { grid-template-columns: 1fr; gap: 60px; }
}
</style>
