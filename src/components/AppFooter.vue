<script setup>
import { computed } from 'vue'
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-vue-next'
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <!-- FOOTER — EXATO DA REFERÊNCIA -->
  <footer class="footer-brutalist">
    <div class="footer-top">
      <div class="container footer-grid">
        <div class="footer-brand-section">
          <div class="footer-logo">
            <div class="logo-np-brutalist">
              <div class="shape s1"></div>
              <div class="shape s2"></div>
              <div class="shape s3"></div>
              <div class="shape s4"></div>
              <div class="shape s5"></div>
              <span class="logo-text">NP</span>
            </div>
          </div>
          <div class="footer-headline">
            Núcleo Pela <br/> Luta Social.
          </div>
          <p class="footer-desc">
            Apoio estratégico, comunicação e infraestrutura financeira para os movimentos que ousam desenhar um novo amanhã.
          </p>
        </div>

        <div class="footer-nav-section">
          <div class="nav-col-brutalist yellow">
            <router-link to="/sobre">Quem Somos</router-link>
            <router-link to="/sobre">Manifesto</router-link>
            <router-link to="/privacidade">Transparência</router-link>
          </div>
          <div class="nav-col-brutalist pink">
            <router-link to="/doacao">Doe Agora</router-link>
            <router-link to="/contatos">Seja Voluntário</router-link>
            <router-link to="/contatos">Contato</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom-brutalist">
      <div class="container bottom-flex">
        <p>© {{ currentYear }} NARRATIVA POLÍTICA. TODOS OS DIREITOS RESERVADOS.</p>
        
        <div class="footer-socials">
          <a href="#" target="_blank" class="social-icon"><Instagram :size="18" /></a>
          <a href="#" target="_blank" class="social-icon"><Twitter :size="18" /></a>
          <a href="#" target="_blank" class="social-icon"><Linkedin :size="18" /></a>
          <a href="#" target="_blank" class="social-icon"><Youtube :size="18" /></a>
        </div>

        <div class="legal-links">
          <router-link to="/privacidade">POLÍTICA DE PRIVACIDADE</router-link>
          <span>•</span>
          <router-link to="/termos">TERMOS DE USO</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* FOOTER — EXATO DA REFERÊNCIA */
.footer-brutalist {
  background: var(--color-bg);
  color: var(--color-dark);
  padding-top: 80px;
  padding-bottom: 32px;
}

.footer-top {
  border-bottom: 4px solid var(--color-dark);
  padding-bottom: 64px;
  margin-bottom: 32px;
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
}

/* BRAND SECTION */
.footer-logo {
  margin-bottom: 32px;
}

.footer-logo .logo-np-brutalist {
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
}

.footer-headline {
  font-family: var(--font-display);
  font-size: clamp(1.875rem, 4vw, 3rem);
  text-transform: uppercase;
  letter-spacing: -0.04em;
  line-height: 0.9;
  margin-bottom: 16px;
}

.footer-desc {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.875rem;
  color: rgba(28, 28, 28, 0.6);
  max-width: 24rem;
}

/* NAV SECTION — EXATO DA REFERÊNCIA */
.footer-nav-section {
  display: flex;
  gap: 48px;
}

.nav-col-brutalist {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 24px;
  border-left: 4px solid var(--color-dark);
}

.nav-col-brutalist.yellow { border-color: var(--color-yellow); }
.nav-col-brutalist.pink { border-color: var(--color-pink); }

.nav-col-brutalist a {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: var(--color-dark);
  transition: color 0.2s;
}

.nav-col-brutalist.yellow a:hover { color: var(--color-red); }
.nav-col-brutalist.pink a:hover { color: var(--color-yellow); }

/* BOTTOM BAR — EXATO DA REFERÊNCIA */
.footer-bottom-brutalist {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(28, 28, 28, 0.6);
  border-top: 1px solid rgba(28, 28, 28, 0.1);
  padding-top: 24px;
}

.bottom-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-socials {
  display: flex;
  gap: 12px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-dark);
  color: var(--color-dark);
  transition: all 0.2s;
  background: transparent;
}

.social-icon:hover {
  background: var(--color-yellow);
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 var(--color-dark);
}

.bottom-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.legal-links { display: flex; gap: 16px; }
.legal-links a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}
.legal-links a:hover { color: var(--color-dark); }

@media (max-width: 992px) {
  .footer-grid { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 640px) {
  .footer-nav-section { flex-direction: column; gap: 32px; }
  .bottom-flex { flex-direction: column; gap: 16px; text-align: center; }
}
</style>