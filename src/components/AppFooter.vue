<template>
  <footer class="footer">
    <!-- MAIN FOOTER -->
    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- BRAND -->
          <div class="footer-brand">
            <h3 class="footer-brand-name">NARRATIVA POLÍTICA</h3>
            <p class="footer-description">
              Impacto Social, Política e Gênero. Um hub para transformação.
            </p>
            <p class="footer-copy-inline">© {{ currentYear }} Narrativa Política.</p>
          </div>

          <!-- COLUNA 1 — LINKS ÚTEIS -->
          <div class="footer-col">
            <div class="footer-links">
              <router-link v-if="siteContent.settings?.menuAbout !== false" to="/sobre">INSTITUCIONAL</router-link>
              <a href="#" @click.prevent>TRANSPARÊNCIA</a>
              <router-link v-if="siteContent.settings?.menuContact !== false" to="/contatos">CONTATO</router-link>
              <router-link to="/login" class="footer-admin-link">ADMINISTRAÇÃO</router-link>
            </div>
          </div>

          <!-- COLUNA 2 -->
          <div class="footer-col">
            <div class="footer-links">
              <a href="https://substack.com/@narrativapolitica" target="_blank">NEWSLETTER</a>
              <router-link to="/privacidade">PRIVACIDADE</router-link>
            </div>
            
            <div class="mt-8">
              <router-link to="/doacao" class="btn-brutal paper-shadow-sm border-white" style="background: var(--np-white); color: var(--np-black); padding: 12px 24px; font-size: 14px;">
                APOIE AGORA
              </router-link>
            </div>

            <div class="social-row">
              <a href="#" class="social-btn" aria-label="Compartilhar">
                <span class="material-symbols-outlined dropdown-icon">share</span>
              </a>
              <a href="#" class="social-btn" aria-label="WhatsApp">
                <span class="material-symbols-outlined dropdown-icon">chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { siteContent } from '../store/content'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* ── MAIN FOOTER ─────────────────────────────── */
.footer-main {
  background: var(--np-black);
  padding: 64px 0 48px;
  border-top: 4px solid var(--np-amarelo);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
}

/* BRAND */
.footer-brand-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 32px;
  color: var(--np-white);
  margin: 0 0 16px;
  letter-spacing: -1px;
  text-transform: uppercase;
  line-height: 1;
}

.footer-description {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--np-white);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 280px;
  opacity: 0.8;
}

.footer-copy-inline {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--np-white);
  opacity: 0.6;
}

/* SOCIAL */
.social-row {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.social-btn {
  width: 48px;
  height: 48px;
  border: 1px solid var(--np-white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--np-white);
  transition: all 0.25s;
}

.social-btn:hover {
  color: var(--np-black);
  background: var(--np-white);
}

/* COLUMNS */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-links a {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--np-white);
  text-decoration: none;
  transition: all 0.25s;
}

.footer-admin-link {
  font-size: 10px !important;
  opacity: 0.3;
  margin-top: 24px;
}
.footer-admin-link:hover {
  opacity: 1 !important;
  text-decoration: none !important;
  color: var(--np-amarelo) !important;
}

.footer-links a:hover {
  color: var(--np-white);
  text-decoration: underline;
  text-decoration-color: var(--np-rosa);
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.mt-8 { margin-top: 32px; }


/* ── RESPONSIVE ──────────────────────────────── */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
</style>