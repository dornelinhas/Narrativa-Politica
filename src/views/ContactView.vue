<template>
  <div class="contact-brutalist">
    <!-- HERO -->
    <section class="contact-hero activist-gradient">
      <div class="container hero-inner">
        <h1 class="hero-title">FALE <br /><span class="text-yellow">CONOSCO</span></h1>
        <p class="hero-desc">Dúvidas, propostas de parcerias ou convocações para ação? Estamos prontos para ouvir.</p>
      </div>
    </section>

    <div class="container main-contact">
      <div class="contact-grid-brutalist">
        <!-- CHANNELS -->
        <aside class="contact-sidebar-brutalist">
          <h2 class="font-display mb-8 text-3xl">CANAIS DIRETOS</h2>
          <div class="channel-stack">
            <a href="mailto:contatonarrativapolitica@gmail.com" class="channel-box red-hover">
              <Mail :size="24" />
              <span>E-MAIL</span>
            </a>
            <a href="https://www.linkedin.com/company/narrativa-políticaorg" target="_blank" class="channel-box blue-hover">
              <Linkedin :size="24" />
              <span>LINKEDIN</span>
            </a>
            <a href="https://www.instagram.com/narrativapolitica/" target="_blank" class="channel-box pink-hover">
              <Instagram :size="24" />
              <span>INSTAGRAM</span>
            </a>
          </div>
        </aside>

        <!-- FORM -->
        <main class="contact-form-area">
          <div class="brutalist-form-card">
            <div class="form-header-brutalist">
              <h3 class="font-display">ENVIE UMA MENSAGEM</h3>
              <p class="font-sans font-bold opacity-60">Retornamos em até 24 horas úteis.</p>
            </div>
            
            <form action="https://formsubmit.co/contatonarrativapolitica@gmail.com" method="POST" class="brutalist-form">
              <input type="hidden" name="_next" value="https://narrativapolitica.org/contatos?success=true">
              
              <div class="form-group-brutalist">
                <label>NOME</label>
                <input type="text" name="name" placeholder="Como podemos te chamar?" required />
              </div>
              
              <div class="form-group-brutalist">
                <label>SEU E-MAIL</label>
                <input type="email" name="email" placeholder="exemplo@email.com" required />
              </div>

              <div class="form-group-brutalist">
                <label>MENSAGEM</label>
                <textarea name="message" rows="5" placeholder="Descreva sua dúvida ou proposta..." required></textarea>
              </div>

              <button type="submit" class="brutalist-button red w-full justify-center">
                ENVIAR MENSAGEM <ArrowRight :size="20" />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>

    <!-- DONATION BANNER -->
    <section class="action-banner-brutalist">
      <div class="container content-center-brutalist">
        <div class="geo-shape shape-square yellow mini mb-4"></div>
        <h2 class="font-display text-6xl text-white mb-6">APOIE A <span class="text-pink-brutalist">NARRATIVA POLÍTICA</span></h2>
        <p class="banner-text">Sua contribuição financia a produção de dados técnicos e a formação de novas lideranças para o campo progressista.</p>
        <router-link to="/doacao" class="brutalist-button">CONHECER FORMAS DE APOIO</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Mail, Linkedin, Instagram, ArrowRight } from 'lucide-vue-next'
</script>

<style scoped>
.contact-brutalist { background: var(--color-bg); min-height: 100vh; padding-bottom: 0; }

.contact-hero { padding: 180px 0 100px; border-bottom: 8px solid var(--color-dark); }
.hero-title { font-size: clamp(3rem, 10vw, 8rem); color: white; line-height: 0.85; margin-bottom: 30px; }
.text-yellow { color: var(--color-yellow); }
.hero-desc { font-family: var(--font-sans); font-weight: 700; color: white; font-size: 1.2rem; max-width: 600px; opacity: 0.9; }

.main-contact { margin-top: -60px; position: relative; z-index: 10; margin-bottom: 100px; }

.contact-grid-brutalist { display: grid; grid-template-columns: 300px 1fr; gap: 60px; }

.mb-8 { margin-bottom: 2rem; }
.text-3xl { font-size: 2rem; line-height: 1; }

.channel-stack { display: flex; flex-direction: column; gap: 20px; }
.channel-box {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}

.channel-box:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--color-dark); }
.red-hover:hover { box-shadow: 8px 8px 0 var(--color-red); }
.blue-hover:hover { box-shadow: 8px 8px 0 var(--color-blue); }
.pink-hover:hover { box-shadow: 8px 8px 0 var(--color-pink); }

.brutalist-form-card {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 60px;
  box-shadow: 15px 15px 0 var(--color-dark);
}

.form-header-brutalist { margin-bottom: 40px; }
.form-header-brutalist h3 { font-size: 2.2rem; margin-bottom: 10px; line-height: 1; }

.brutalist-form { display: flex; flex-direction: column; gap: 30px; }

.form-group-brutalist { display: flex; flex-direction: column; gap: 10px; }
.form-group-brutalist label { font-family: var(--font-sans); font-weight: 900; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--color-dark); }
.form-group-brutalist input, .form-group-brutalist textarea {
  background: var(--color-bg);
  border: 3px solid var(--color-dark);
  padding: 15px 20px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.1rem;
  outline: none;
}
.form-group-brutalist input:focus, .form-group-brutalist textarea:focus { border-color: var(--color-red); background: white; }

.action-banner-brutalist {
  background: var(--color-dark);
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.content-center-brutalist { display: flex; flex-direction: column; align-items: center; }
.text-6xl { font-size: clamp(2rem, 5vw, 4rem); }
.text-white { color: white; }
.text-pink-brutalist { color: var(--color-pink); }
.mb-6 { margin-bottom: 1.5rem; }
.banner-text { font-family: var(--font-sans); font-weight: 600; font-size: 1.3rem; color: rgba(255,255,255,0.8); max-width: 700px; margin-bottom: 40px; line-height: 1.6; }

.geo-shape.shape-square.yellow.mini { width: 30px !important; border: 3px solid white; }

.w-full { width: 100%; }
.justify-center { justify-content: center; }

@media (max-width: 992px) {
  .contact-grid-brutalist { grid-template-columns: 1fr; }
  .contact-sidebar-brutalist .channel-stack { flex-direction: row; flex-wrap: wrap; }
  .channel-box { flex: 1; min-width: 200px; }
}

@media (max-width: 600px) {
  .brutalist-form-card { padding: 30px; }
  .channel-box { width: 100%; }
}

/* GLOBAL REUSE */
.brutalist-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 3rem;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 4px solid var(--color-dark);
  background: var(--color-yellow);
  color: var(--color-dark);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.brutalist-button:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--color-dark); }
.brutalist-button.red { background: var(--color-red); color: white; border-color: var(--color-dark); }
</style>