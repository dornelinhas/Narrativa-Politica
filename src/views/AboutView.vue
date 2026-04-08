<template>
  <div class="about container section-padding">
    <div class="about-grid">
      <div class="about-image">
        <!-- Using a placeholder but designed to be replaced by the owner's photo -->
        <div class="image-box">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Sobre Nós">
        </div>
      </div>
      <div class="about-content">
        <h1 class="page-title">Sobre a Narrativa Política</h1>
        <p class="lead">Unindo rigor acadêmico e pragmatismo estratégico para navegar o cenário internacional.</p>
        
        <div class="text-body">
          <p>A <strong>Narrativa Política</strong> nasceu da necessidade de preencher a lacuna entre a teoria acadêmica e a prática no mercado de Relações Internacionais e Análise Política.</p>
          
          <p>Nossa missão é democratizar o acesso a análises de alta qualidade e oferecer as ferramentas necessárias para que jovens profissionais — especialmente mulheres — possam construir carreiras de impacto em um ambiente global competitivo.</p>
          
          <p>Acreditamos que a política não é apenas sobre o que acontece nos gabinetes, mas sobre as narrativas que construímos e as oportunidades que escolhemos cultivar.</p>
        </div>

        <div class="values">
          <div class="value-item">
            <h3>Visão</h3>
            <p>Ser a principal referência em curadoria estratégica e mentoria de carreira em RI no Brasil.</p>
          </div>
          <div class="value-item">
            <h3>Impacto</h3>
            <p>Fomentar uma geração de analistas críticos, preparados e diversificados.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-padding {
  padding: 100px 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
}

.about-image .image-box {
  position: relative;
  padding-left: 30px;
  padding-bottom: 30px;
}

.about-image .image-box::before {
  content: '';
  position: absolute;
  top: -30px;
  left: 0;
  width: 70%;
  height: 70%;
  border: 5px solid var(--accent-gold);
  z-index: -1;
}

.about-image img {
  border-radius: var(--border-radius);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.page-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: var(--text-main);
}

.lead {
  font-size: 1.4rem;
  font-family: var(--font-serif);
  color: var(--accent-coral);
  margin-bottom: 40px;
  font-style: italic;
}

.text-body p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.values {
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.value-item h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--accent-gold);
}

.value-item p {
  font-size: 0.95rem;
  color: #666;
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  .about-image {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
}
</style>
