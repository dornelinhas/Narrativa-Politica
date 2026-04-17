<template>
  <footer class="footer-np">
    <div class="container footer-inner">
      <!-- BRAND -->
      <div class="footer-brand">
        <router-link to="/" class="logo-group" style="text-decoration: none;">
          <div class="logo-icon-transparent">
            <span class="logo-np">NP</span>
          </div>
          <div class="logo-text">
            <span class="name-top">Narrativa</span>
            <span class="name-bottom">Política</span>
          </div>
        </router-link>
        <p class="brand-desc">Transformando teoria econômica em impacto real através de dados, estratégia e liderança.</p>
        <div class="social-links">
          <a href="https://www.instagram.com/narrativapolitica/" target="_blank" class="social-icon" aria-label="Instagram"><Instagram :size="18" /></a>
          <a href="https://www.linkedin.com/company/narrativa-políticaorg" target="_blank" class="social-icon" aria-label="LinkedIn"><Linkedin :size="18" /></a>
        </div>
      </div>

      <!-- NAV COLUMNS -->
      <div class="footer-nav-grid">
        <div class="nav-col">
          <h4>Plataforma</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/sobre">Sobre Mim</router-link>
          <router-link to="/servicos">Serviços</router-link>
          <router-link to="/projetos">Projetos</router-link>
        </div>
        <div class="nav-col">
          <h4>Recursos</h4>
          <router-link to="/conteudo">Artigos</router-link>
          <router-link to="/trilhas">Trilhas</router-link>
          <router-link to="/biblioteca">Biblioteca</router-link>
          <router-link to="/doacao">Apoie/Doar</router-link>
        </div>
        <div class="nav-col">
          <h4>Apoio</h4>
          <router-link to="/doacao" class="donate-link-footer">Apoie a Causa</router-link>
          <router-link to="/contatos">Contato</router-link>
        </div>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <span>© {{ currentYear }} Narrativa Política. Todos os direitos reservados.</span>
        <div class="bottom-links">
          <router-link to="/privacidade">Privacidade</router-link>
          <a href="#">Termos</a>
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
.footer-np {
  background: linear-gradient(135deg, #FF2D55 0%, #8A2BE2 50%, #111827 100%);
  color: #fff;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
}

.footer-np::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  padding-bottom: 60px;
}

/* BRAND */
.logo-group { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.logo-icon-transparent {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border-radius: 12px;
}
.logo-np { font-weight: 900; font-size: 1.8rem; color: #fff; }
.logo-text { display: flex; flex-direction: column; line-height: 1; }
.name-top { font-weight: 900; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }
.name-bottom { font-weight: 500; font-size: 0.85rem; color: rgba(255,255,255,0.5); }

.brand-desc { color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.6; margin-bottom: 32px; max-width: 320px; }

.social-links { display: flex; gap: 12px; }
.social-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.05); color: #fff;
  transition: all 0.3s;
}
.social-icon:hover { background: #FF2D55; transform: translateY(-3px); }

/* NAV */
.footer-nav-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.nav-col h4 { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
.nav-col a { display: block; color: #fff; text-decoration: none; font-size: 0.95rem; margin-bottom: 12px; font-weight: 600; opacity: 0.7; transition: 0.2s; }
.nav-col a:hover { opacity: 1; transform: translateX(5px); }

.donate-link-footer { color: #FF2D55 !important; font-weight: 800 !important; opacity: 1 !important; }

/* BOTTOM */
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 32px 0; }
.bottom-inner { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: rgba(255,255,255,0.3); }
.bottom-links { display: flex; gap: 24px; }
.bottom-links a { text-decoration: none; color: inherit; transition: 0.2s; }
.bottom-links a:hover { color: #fff; }

@media (max-width: 1024px) {
  .footer-inner { grid-template-columns: 1fr; gap: 60px; }
}
@media (max-width: 640px) {
  .footer-nav-grid { grid-template-columns: 1fr; gap: 32px; }
}
</style>