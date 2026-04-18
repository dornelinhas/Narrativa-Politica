<template>
  <footer class="footer-brutalist">
    <div class="footer-top">
      <div class="container footer-grid">
        <div class="footer-brand-section">
          <div class="logo-np-brutalist mb-8">
            <div class="shape s1"></div>
            <div class="shape s2"></div>
            <div class="shape s3"></div>
            <div class="shape s4"></div>
            <span class="logo-text">NP</span>
          </div>
          <h2 class="font-display text-4xl mb-6">NÚCLEO PELA <br/> LUTA SOCIAL.</h2>
          <p class="font-sans font-bold opacity-70 max-w-sm">
            Apoio estratégico, comunicação e infraestrutura para movimentos que ousam desenhar um novo amanhã.
          </p>
          <div class="social-links-brutalist mt-8">
            <a href="#" class="social-box"><Instagram /></a>
            <a href="#" class="social-box"><Linkedin /></a>
          </div>
        </div>

        <div class="footer-nav-section">
          <div class="nav-col-brutalist yellow">
            <h3>Plataforma</h3>
            <router-link to="/">Movimento</router-link>
            <router-link to="/sobre">Manifesto</router-link>
            <router-link to="/transparencia">Transparência</router-link>
          </div>
          <div class="nav-col-brutalist pink">
            <h3>Envolva-se</h3>
            <router-link to="/doacao">Doe Agora</router-link>
            <router-link to="/voluntariado">Seja Voluntário</router-link>
            <router-link to="/contatos">Contato</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom-brutalist">
      <div class="container bottom-flex">
        <p>© {{ currentYear }} ORGANIZAÇÃO "NP". TODOS OS DIREITOS RESERVADOS.</p>
        <div class="legal-links">
          <router-link to="/privacidade">Privacidade</router-link>
          <span>•</span>
          <router-link to="/termos">Termos</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Instagram, Linkedin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-brutalist {
  background: var(--color-bg);
  color: var(--color-dark);
  border-top: 8px solid var(--color-dark);
  padding-top: 80px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  padding-bottom: 80px;
}

.footer-brand-section .logo-np-brutalist {
  width: 60px;
  height: 60px;
  font-size: 2.2rem;
  margin-bottom: 40px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
}

/* Duplicando estilos do logo para garantir consistência sem depender de global se for scoped */
.logo-np-brutalist .shape { position: absolute; border-radius: 2px; }
.s1 { top: -4px; left: -4px; width: 14px; height: 14px; background: var(--color-red); border-radius: 50% !important; }
.s2 { top: 4px; right: -14px; width: 20px; height: 14px; background: var(--color-pink); }
.s3 { bottom: -4px; right: -8px; width: 14px; height: 14px; background: var(--color-lime); }
.s4 { bottom: -8px; left: 4px; width: 14px; height: 24px; background: var(--color-yellow); }

.mb-8 { margin-bottom: 2rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.text-4xl { font-size: 2.5rem; line-height: 1; }

.social-links-brutalist { display: flex; gap: 15px; }
.social-box {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--color-dark);
  transition: all 0.2s;
}
.social-box:hover {
  background: var(--color-yellow);
  transform: translate(-4px, -4px);
  box-shadow: 6px 6px 0px var(--color-dark);
}

.footer-nav-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.nav-col-brutalist {
  padding-left: 20px;
  border-left: 6px solid var(--color-dark);
}

.nav-col-brutalist.yellow { border-color: var(--color-yellow); }
.nav-col-brutalist.pink { border-color: var(--color-pink); }

.nav-col-brutalist h3 {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 20px;
  opacity: 0.5;
}

.nav-col-brutalist a {
  display: block;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 12px;
  text-decoration: none;
  color: var(--color-dark);
  transition: color 0.2s;
}

.nav-col-brutalist a:hover {
  color: var(--color-red);
}

.footer-bottom-brutalist {
  border-top: 4px solid var(--color-dark);
  padding: 40px 0;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.bottom-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legal-links { display: flex; gap: 15px; }

@media (max-width: 992px) {
  .footer-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .footer-nav-section { grid-template-columns: 1fr; }
  .bottom-flex { flex-direction: column; gap: 20px; text-align: center; }
}
</style>