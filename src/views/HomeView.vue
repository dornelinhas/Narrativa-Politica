<template>
  <div class="home">
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">Narrativas que <span class="text-gradient">transformam</span> o mundo.</h1>
        <p class="hero-subtitle">
          Análise acadêmica, curadoria estratégica de oportunidades e mentoria de carreira em Relações Internacionais.
        </p>
        <div class="hero-actions">
          <router-link to="/artigos" class="btn btn-primary">Ver Artigos</router-link>
          <router-link to="/mentoria" class="btn btn-outline">Mentoria</router-link>
        </div>
      </div>
    </section>

    <section class="container section-padding">
      <div class="grid-features">
        <div class="feature-card glass-card">
          <div class="dot grad-blue"></div>
          <h3>Excelência Acadêmica</h3>
          <p>Análises profundas fundamentadas em teoria política e rigor científico.</p>
        </div>
        <div class="feature-card glass-card">
          <div class="dot grad-pink"></div>
          <h3>Inteligência de Mercado</h3>
          <p>Curadoria de oportunidades com análise estratégica de diferencial.</p>
        </div>
        <div class="feature-card glass-card">
          <div class="dot grad-yellow"></div>
          <h3>Impacto Social</h3>
          <p>Fomento à liderança feminina nas Relações Internacionais.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 120px 0 80px;
  text-align: center;
}

.hero-title {
  font-size: 4.5rem;
  max-width: 900px;
  margin: 0 auto 30px;
  color: var(--text-main);
  font-family: var(--font-serif);
}

.text-vibrant {
  color: var(--color-blue);
  font-style: italic;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 40px;
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.section-padding { padding: 80px 0; }

.grid-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  padding: 50px 40px;
  position: relative;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.grad-blue { background: var(--color-blue); }
.grad-pink { background: var(--color-pink); }
.grad-yellow { background: var(--color-yellow); }

.feature-card h3 { font-size: 1.4rem; margin-bottom: 15px; }
.feature-card p { color: var(--text-muted); font-size: 0.95rem; }

@media (max-width: 992px) {
  .hero-title { font-size: 3rem; }
  .grid-features { grid-template-columns: 1fr; }
}
</style>
