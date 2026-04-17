<template>
  <div class="about-minimal-page">
    <div class="container-refined">
      
      <div class="about-grid-new">
        <!-- LEFT COLUMN: PHOTO & QUICK INFO -->
        <aside class="about-aside">
          <div class="portrait-container">
            <img :src="siteContent.about.image || '/images/anne-dornelas.png'" alt="Anne Dornelas" class="portrait-img" />
          </div>
          <div class="aside-info">
            <h2 class="name-title">{{ siteContent.about.name }}</h2>
            <p class="role-subtitle">{{ siteContent.about.role }}</p>
            <div class="contact-links-aside">
              <a href="https://www.linkedin.com/company/narrativa-políticaorg" target="_blank">LinkedIn</a>
              <a href="mailto:contatonarrativapolitica@gmail.com">Contato</a>
            </div>
          </div>
        </aside>

        <!-- RIGHT COLUMN: BIO & EXPERTISE -->
        <main class="about-main-content">
          <section class="bio-intro-section">
            <p class="professional-mission">
              {{ siteContent.about.mission }}
            </p>
          </section>

          <div class="divider-line"></div>

          <section class="bio-narrative text-readable" v-html="formatBio(siteContent.about.bioInstitucional)"></section>

          <section class="expertise-areas">
            <h3>Áreas de Atuação</h3>
            <div class="expertise-list">
              <span>Análise Econométrica</span>
              <span>Advocacy de Gênero</span>
              <span>Estratégia de Impacto Social</span>
              <span>Articulação Política</span>
            </div>
          </section>

          <footer class="about-footer-simple">
            <router-link to="/contatos" class="link-standard">Solicitar consultoria ou palestra →</router-link>
          </footer>
        </main>
      </div>

    </div>
  </div>
</template>

<script setup>
import { siteContent } from '../store/content'

const formatBio = (text) => {
  if (!text) return ''
  return text.split('\n\n').map(p => `<p>${p}</p>`).join('')
}
</script>

<style scoped>
.about-minimal-page {
  background: #fff;
  padding-top: 140px;
  padding-bottom: 100px;
  min-height: 100vh;
  color: #111827;
}

.container-refined {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px;
}

.about-grid-new {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
  align-items: start;
}

/* ASIDE */
.portrait-container {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 12px;
  background: #f1f5f9;
  margin-bottom: 24px;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
}

.name-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.role-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 24px;
}

.contact-links-aside {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-links-aside a {
  font-size: 0.85rem;
  font-weight: 700;
  color: #FF2D55;
  text-decoration: none;
}

/* MAIN CONTENT */
.professional-mission {
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 600;
  color: #111827;
  margin-bottom: 40px;
}

.divider-line {
  width: 60px;
  height: 2px;
  background: #E5E7EB;
  margin-bottom: 40px;
}

.bio-narrative :deep(p) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 1.5rem;
}

.expertise-areas {
  margin-top: 60px;
}

.expertise-areas h3 {
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #94A3B8;
  margin-bottom: 20px;
}

.expertise-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.expertise-list span {
  font-size: 0.85rem;
  font-weight: 700;
  background: #F8FAFC;
  color: #475569;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.about-footer-simple {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid #F1F5F9;
}

.link-standard {
  font-weight: 800;
  color: #111827;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
}

.link-standard:hover {
  color: #FF2D55;
}

@media (max-width: 850px) {
  .about-grid-new {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .about-aside {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .portrait-container {
    width: 140px;
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {
  .about-aside {
    flex-direction: column;
    align-items: flex-start;
  }
  .professional-mission {
    font-size: 1.2rem;
  }
}
</style>
