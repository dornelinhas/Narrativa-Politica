<template>
  <div class="privacy-brutalist">
    <section class="privacy-hero activist-gradient">
      <div class="container hero-inner">
        <span class="eyebrow">DOCUMENTO LEGAL</span>
        <h1 class="hero-title">POLÍTICA DE<br/><span class="text-yellow">PRIVACIDADE</span></h1>
      </div>
    </section>

    <section class="dashboard-section">
      <div class="container">
        <div class="privacy-card brutalist-card">
          <div class="card-accent red"></div>
          <div class="prose">
            <p>A sua privacidade é importante para nós. É política do Narrativa Política respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Narrativa Política, e outros sites que possuímos e operamos.</p>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
            <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
            <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
            <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
            <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.</p>

            <h2>COMPROMISSO DO USUÁRIO</h2>
            <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Narrativa Política oferece no site:</p>
            <ul>
              <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
              <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>C) Não causar danos aos sistemas do Narrativa Política ou de terceiros.</li>
            </ul>

            <p class="effective-date">Esta política é efetiva a partir de Abril 2026.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.privacy-brutalist { background: var(--color-bg); min-height: 100vh; }

.privacy-hero { position: relative; padding: 180px 0 100px; border-bottom: 8px solid var(--color-dark); overflow: hidden; }
.hero-inner { position: relative; z-index: 10; }
.eyebrow { font-family: var(--font-sans); font-weight: 900; letter-spacing: 0.4em; font-size: 0.8rem; color: white; display: block; margin-bottom: 20px; opacity: 0.8; }
.hero-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 7rem); color: white; line-height: 0.85; margin-bottom: 30px; text-transform: uppercase; letter-spacing: -0.04em; }
.text-yellow { color: var(--color-yellow); }

.dashboard-section { padding: 80px 0; margin-top: -60px; position: relative; z-index: 20; }
.privacy-card { background: white; padding: 60px; max-width: 900px; margin: 0 auto; }
.privacy-card:hover { transform: none; box-shadow: none; }
.card-accent { height: 10px; margin: -60px -60px 40px; }
.card-accent.red { background: var(--color-red); border-bottom: 4px solid var(--color-dark); }

.prose p { font-family: var(--font-sans); font-weight: 500; font-size: 1rem; line-height: 1.8; color: rgba(28,28,28,0.7); margin-bottom: 1.5rem; }
.prose h2 { font-family: var(--font-display); font-size: 1.5rem; margin: 48px 0 20px; color: var(--color-dark); text-transform: uppercase; letter-spacing: -0.04em; }
.prose ul { margin: 16px 0 24px 24px; }
.prose li { font-weight: 600; margin-bottom: 12px; line-height: 1.6; color: rgba(28,28,28,0.7); }
.effective-date { font-weight: 800 !important; color: var(--color-dark) !important; margin-top: 48px !important; }

@media (max-width: 768px) { .privacy-card { padding: 30px; } .card-accent { margin: -30px -30px 30px; } }
</style>
