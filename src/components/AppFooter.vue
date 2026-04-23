<template>
  <footer class="footer-brutalist bg-light border-t-dark-2">
    <div class="footer-container">
      <div class="footer-main-grid">
        
        <!-- COLUNA 1: BRAND -->
        <div class="footer-brand-section">
          <div class="brand-header-flex">
            <div class="logo-np-brutalist small">
              <div class="shape s1"></div>
              <div class="shape s2"></div>
              <div class="shape s3"></div>
              <div class="shape s4"></div>
              <div class="shape s5"></div>
              <span class="logo-text">NP</span>
            </div>
            <h2 class="brand-name-stacked">
              NARRATIVA <br/>
              <span class="text-red">POLÍTICA</span>
            </h2>
          </div>
          <p class="brand-description">
            Apoio estratégico, comunicação e infraestrutura financeira para os movimentos que ousam desenhar um novo amanhã.
          </p>
        </div>

        <!-- COLUNA 2: LINKS (LADO A LADO) -->
        <div class="footer-links-columns">
          <div class="link-group">
            <h4 class="group-title">
              <div class="dot pink-bg"></div> PLATAFORMA
            </h4>
            <div class="links-list">
              <router-link to="/conteudo">Artigos</router-link>
              <router-link to="/oportunidades">Oportunidades</router-link>
              <router-link to="/trilhas">Trilhas</router-link>
              <router-link to="/biblioteca">Biblioteca</router-link>
            </div>
          </div>

          <div class="link-group">
            <h4 class="group-title">
              <div class="square lime-bg"></div> INSTITUCIONAL
            </h4>
            <div class="links-list">
              <router-link to="/sobre">Quem Somos</router-link>
              <router-link to="/servicos">Serviços</router-link>
              <router-link to="/doacao">Apoie</router-link>
              <router-link to="/contatos">Contato</router-link>
            </div>
          </div>
        </div>

      </div>

      <!-- BARRA INFERIOR -->
      <div class="footer-bottom-bar">
        <div class="social-links-horizontal">
          <a href="#" class="social-box pink-bg"><Instagram :size="18" /></a>
          <a href="#" class="social-box lime-bg"><Twitter :size="18" /></a>
          <a href="#" class="social-box yellow-bg"><Linkedin :size="18" /></a>
        </div>
        <div class="copyright-text">
          © {{ currentYear }} NARRATIVA POLÍTICA.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Instagram, Twitter, Linkedin } from 'lucide-vue-next'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-brutalist { background-color: #F7F7F5; border-top: 3px solid #1C1C1C; padding: 80px 0 40px; }
.footer-container { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

/* GRID PRINCIPAL */
.footer-main-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  margin-bottom: 60px;
}

/* MARCA */
.brand-header-flex { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
.brand-name-stacked { font-family: "Archivo Black", sans-serif; font-size: 1.8rem; line-height: 0.9; text-transform: uppercase; color: #1C1C1C; }
.text-red { color: #DF2028; }
.brand-description { font-family: "Inter", sans-serif; font-weight: 700; font-size: 0.9rem; color: #1C1C1C; max-width: 450px; line-height: 1.6; opacity: 0.8; }

/* LINKS LADO A LADO */
.footer-links-columns { display: flex; gap: 60px; }
.link-group { flex: 1; }
.group-title { display: flex; align-items: center; gap: 10px; font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.75rem; letter-spacing: 0.1em; color: #1C1C1C; margin-bottom: 24px; }
.dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #1C1C1C; }
.square { width: 12px; height: 12px; border: 2px solid #1C1C1C; }
.pink-bg { background: #FF6BCA; }
.lime-bg { background: #A4CD39; }
.yellow-bg { background: #FFE65A; }

.links-list { display: flex; flex-direction: column; gap: 12px; }
.links-list a { font-family: "Inter", sans-serif; font-weight: 700; font-size: 0.9rem; color: #1C1C1C; text-decoration: none; transition: 0.2s; }
.links-list a:hover { color: #DF2028; transform: translateX(5px); }

/* BARRA INFERIOR HORIZONTAL */
.footer-bottom-bar {
  border-top: 3px solid #1C1C1C;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links-horizontal { display: flex; gap: 12px; }
.social-box { width: 40px; height: 40px; border: 2px solid #1C1C1C; display: flex; align-items: center; justify-content: center; color: #1C1C1C; transition: 0.2s; }
.social-box:hover { transform: translateY(-4px); box-shadow: 4px 4px 0px #1C1C1C; }

.copyright-text { font-family: "Inter", sans-serif; font-weight: 900; font-size: 11px; text-transform: uppercase; color: #1C1C1C; }

/* LOGO NP */
.logo-np-brutalist.small { position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
.logo-text { font-family: "Archivo Black", sans-serif; font-weight: 900; font-size: 1.2rem; z-index: 5; color: #1C1C1C; }
.logo-np-brutalist .shape { position: absolute; border: 1.5px solid #1C1C1C; }
.s1 { top: -2px; left: -2px; width: 12px; height: 12px; background: #DF2028; border-radius: 50% !important; }
.s2 { top: 2px; right: -8px; width: 14px; height: 10px; background: #FF6BCA; }
.s3 { bottom: -2px; right: -4px; width: 10px; height: 10px; background: #A4CD39; }
.s4 { bottom: -4px; left: 2px; width: 10px; height: 16px; background: #FFE65A; }
.s5 { top: 6px; right: 0; width: 8px; height: 8px; background: #3D78E0; border-radius: 50% !important; }

@media (max-width: 1000px) {
  .footer-main-grid { grid-template-columns: 1fr; gap: 40px; }
  .footer-links-columns { gap: 30px; }
  .footer-bottom-bar { flex-direction: column; gap: 30px; text-align: center; }
}
</style>