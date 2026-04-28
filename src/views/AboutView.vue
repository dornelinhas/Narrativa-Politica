<template>
  <div class="about-premium-page">
    <!-- TEXTURA FILM GRAIN (AUMENTADA CONFORME PEDIDO) -->
    <div class="film-grain-heavy-bg"></div>
    <div class="soft-mesh-accents"></div>

    <div class="content-wrapper">
      
      <!-- 1. HERO & TÍTULO (REDUZIDO E ALINHADO) -->
      <header class="editorial-hero-top fade-in-up">
        <h1 class="solid-impact-title">
          {{ siteContent.about.heroTitlePart1 || 'IDEIAS QUE' }} <br/>
          <span class="text-red-solid">{{ siteContent.about.heroTitlePart2 || 'MOVEM ESTRUTURAS' }}</span>
        </h1>
        <p class="serif-editorial-subtitle-aligned">
          {{ siteContent.about.subtitle || 'Estratégia focada em traduzir teoria econômica para a ação política.' }}
        </p>
      </header>

      <div class="container-editorial dossier-grid">
        
        <!-- ALINHAMENTO DO DOSSIÊ: FOTO -->
        <aside class="sidebar-profile-dossier fade-in-up" style="animation-delay: 0.2s">
          <div class="profile-card-anchored">
            <div class="photo-frame-matte-thick">
              <img :src="siteContent.about.image || '/images/anne-dornelas.png'" alt="Anne Dornelas" />
            </div>
            <div class="profile-meta-minimal">
              <h2 class="name-black-archivo">{{ siteContent.about.name || 'ANNE DORNELAS' }}</h2>
              <p class="role-sans-bold">{{ siteContent.about.role || 'Estrategista Política & Administradora' }}</p>
              
              <div class="social-row-editorial mt-6">
                <a href="#" class="s-icon-colored linkedin"><Linkedin :size="20" /></a>
                <a href="#" class="s-icon-colored instagram"><Instagram :size="20" /></a>
                <a href="#" class="s-icon-colored mail"><Mail :size="20" /></a>
              </div>

              <router-link
                v-if="siteContent.settings?.menuProjects !== false"
                to="/projetos"
                class="projects-profile-link"
              >
                Ver projetos
              </router-link>
            </div>
          </div>
        </aside>

        <!-- ALINHAMENTO DO DOSSIÊ: CAIXAS -->
        <main class="editorial-boxes-column">
          
          <!-- CAIXA TRAJETÓRIA -->
          <section class="yellow-box-editorial-anchored fade-in-up" style="animation-delay: 0.4s">
            <h3 class="box-label-black">TRAJETÓRIA & VISÃO</h3>
            <div class="serif-content-black" v-html="formatBio(siteContent.about.bioInstitucional || defaultBio)"></div>
          </section>

          <!-- CAIXA ATUAÇÃO (HABILIDADES COMO CARDS COLORIDOS COM MARGEM E PADDING) -->
          <section class="yellow-box-editorial-anchored fade-in-up" style="animation-delay: 0.6s">
            <h3 class="box-label-black">ÁREAS DE ATUAÇÃO</h3>
            <div class="expertise-multi-grid">
              <div v-for="(skill, index) in expertiseList" :key="skill" 
                class="skill-card-colored"
                :class="dotColors[index % 4]"
              >
                <span>{{ skill }}</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- 2. CTA FINAL (ESTILO NEWSLETTER DA HOME) -->
      <section class="cta-newsletter-zone fade-in-up" style="animation-delay: 0.8s">
        <div class="cta-container-brutalist">
          <div class="cta-text-content">
            <div class="inline-flex-center gap-2 mb-4">
               <Zap class="text-red-icon" />
               <span class="eyebrow-news">{{ siteContent.about.ctaEyebrow || 'Conexão de Impacto' }}</span>
            </div>
            <h2 class="cta-title-home" v-html="siteContent.about.ctaTitle || 'VAMOS MONTAR OU <br /> CRIAR ALGO JUNTOS?'"></h2>
            <p class="cta-desc-home">
              {{ siteContent.about.ctaDesc || 'Construímos tecnologias sociais e infraestruturas estratégicas que permitem aos movimentos pautarem o debate público com total autonomia.' }}
            </p>
          </div>
          
          <div class="cta-action-side">
            <router-link to="/contatos" class="btn-black-pill-giant">
              {{ siteContent.about.ctaBtn || 'FALAR AGORA' }}
            </router-link>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { siteContent } from '../store/content'
import { Linkedin, Instagram, Mail, Zap } from 'lucide-vue-next'

const dotColors = ['bg-magenta', 'bg-blue', 'bg-lime', 'bg-yellow-dark']
const defaultExpertise = ['Análise Econométrica', 'Advocacy de Gênero', 'Estratégia de Impacto Social', 'Articulação Política', 'Comunicação Estratégica', 'Pesquisa de Território']
const expertiseList = computed(() => siteContent.about.expertise?.split(',').map(s => s.trim()) || defaultExpertise)

const defaultBio = "Sou uma estrategista focada em traduzir teoria econômica para a ação política. Nos últimos anos, dediquei minha carreira a construir pontes entre dados quantitativos rigorosos e as necessidades urgentes de movimentos sociais."
const formatBio = (text) => text.split('\n\n').map(p => `<p class="paragraph-serif">${p}</p>`).join('')

onMounted(() => window.scrollTo(0, 0))
</script>

<style scoped>
.about-premium-page { background-color: #FFFFFF; min-height: 100vh; position: relative; overflow-x: hidden; }

/* TEXTURA FILM GRAIN (AUMENTADA) */
.film-grain-heavy-bg {
  position: fixed; inset: 0; z-index: 5; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.15; /* TEXTURA MAIS FORTE */
  mix-blend-mode: multiply;
}

.soft-mesh-accents {
  position: fixed; inset: 0; z-index: 1;
  background: radial-gradient(at 0% 0%, rgba(255, 107, 202, 0.03) 0%, transparent 40%),
              radial-gradient(at 100% 0%, rgba(164, 205, 57, 0.03) 0%, transparent 40%);
}

.content-wrapper { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 0 40px; }

/* 1. HERO & TÍTULO (pt-60 = 240px) */
.editorial-hero-top { padding-top: 240px; margin-bottom: 60px; text-align: left; }

.solid-impact-title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem); /* REDUZIDO CONFORME PEDIDO */
  line-height: 0.85;
  text-transform: uppercase;
  color: #000;
  letter-spacing: -0.05em;
}

.text-red-solid { color: #DF2028; } /* VERMELHO ATIVISTA SÓLIDO */

.serif-editorial-subtitle-aligned {
  font-family: "Georgia", serif;
  font-size: 1.1rem; /* SUBTÍTULO PEQUENO */
  color: #1C1C1C;
  margin-top: 20px;
  max-width: 450px;
  line-height: 1.5;
}

/* ALINHAMENTO DO DOSSIÊ */
.dossier-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; align-items: start; margin-bottom: 120px; }

.sidebar-profile-dossier { position: sticky; top: 140px; }
.photo-frame-matte-thick { border-radius: 2.5rem; overflow: hidden; border: 3px solid #000; box-shadow: 0 20px 40px rgba(0,0,0,0.05); margin-bottom: 30px; }
.photo-frame-matte-thick img { width: 100%; height: 100%; object-fit: cover; }

.name-black-archivo { font-family: "Archivo Black", sans-serif; font-weight: 900; font-size: 1.8rem; color: #000; text-transform: uppercase; }
.role-sans-bold { font-family: "Inter", sans-serif; font-weight: 800; color: #64748b; font-size: 0.85rem; text-transform: uppercase; }

.social-row-editorial { display: flex; gap: 15px; }
.s-icon-colored { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.s-icon-colored:hover { transform: translateY(-5px); }
.linkedin { color: #0077B5; }
.instagram { color: #E1306C; }
.mail { color: #DF2028; }

.projects-profile-link {
  display: inline-flex;
  margin-top: 18px;
  padding: 10px 16px;
  border: 2px solid #000;
  border-radius: 9999px;
  font-family: "Inter", sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #000;
  text-decoration: none;
  transition: 0.2s;
}

.projects-profile-link:hover {
  background: #FFE65A;
  transform: translateY(-2px);
}

/* CAIXAS AMARELAS */
.editorial-boxes-column { display: flex; flex-direction: column; gap: 40px; }
.yellow-box-editorial-anchored {
  background-color: #FFDE59;
  border: 4px solid #000;
  padding: 60px;
  box-shadow: 12px 12px 0px #000;
}

.box-label-black { font-family: "Archivo Black", sans-serif; font-size: 0.9rem; color: #000; letter-spacing: 0.2em; margin-bottom: 35px; }
.serif-content-black { font-family: "Georgia", serif; font-size: 1.45rem; line-height: 1.8; color: #000; }
.paragraph-serif { margin-bottom: 2rem; }

/* HABILIDADES (CARDS COLORIDOS COM MARGEM E PADDING) */
.expertise-multi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.skill-card-colored { 
  display: flex; align-items: center; justify-content: center; text-align: center;
  font-family: "Inter", sans-serif; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; 
  padding: 20px 25px; /* PADDING GENEROSO */
  border-radius: 1.5rem; border: 3px solid #1C1C1C; box-shadow: 6px 6px 0px #1C1C1C;
  transition: 0.2s;
}
.skill-card-colored:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0px #1C1C1C; }

/* CORES DOS CARDS DE HABILIDADE */
.bg-magenta { background: #FF6BCA; color: #FFF; }
.bg-blue { background: #3D78E0; color: #FFF; }
.bg-lime { background: #A4CD39; color: #1C1C1C; }
.bg-yellow-dark { background: #FFFFFF; color: #1C1C1C; }

/* 2. CTA FINAL (ESTILO NEWSLETTER DA HOME) */
.cta-newsletter-zone { margin: 120px 0 176px; width: 100%; display: flex; justify-content: center; }
.cta-container-brutalist {
  width: 100%; max-width: 1100px;
  background-color: #FFE65A; /* AMARELO NEWSLETTER */
  border: 4px solid #1C1C1C;
  padding: 80px;
  display: flex;
  gap: 60px;
  align-items: center;
  box-shadow: 15px 15px 0px #1C1C1C;
}

.cta-text-content { flex: 1.5; }
.cta-action-side { flex: 1; display: flex; justify-content: flex-end; }

.inline-flex-center { display: flex; align-items: center; }
.text-red-icon { fill: #DF2028; color: #DF2028; width: 28px; height: 28px; margin-right: 10px; }
.eyebrow-news { font-family: "Inter", sans-serif; font-weight: 900; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.15em; color: #1C1C1C; }

.cta-title-home {
  font-family: "Archivo Black", sans-serif;
  font-size: 3.2rem;
  text-transform: uppercase;
  line-height: 1;
  color: #1C1C1C;
  margin-bottom: 20px;
}

.cta-desc-home { font-family: "Inter", sans-serif; font-weight: 700; color: rgba(28,28,28,0.8); line-height: 1.5; font-size: 1.1rem; }

.btn-black-pill-giant {
  background: #1C1C1C;
  color: #FFFFFF !important;
  padding: 24px 64px;
  border-radius: 9999px;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 1.1rem; text-transform: uppercase;
  text-decoration: none; transition: all 0.3s;
  border: none;
  text-align: center;
}

.btn-black-pill-giant:hover {
  background: #000000;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 1s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .editorial-hero-top { padding-top: 180px; }
  .dossier-grid { grid-template-columns: 1fr; }
  .sidebar-profile-dossier { position: relative; top: 0; margin-bottom: 60px; text-align: center; }
  .social-row-editorial { justify-content: center; }
  .expertise-multi-grid { grid-template-columns: 1fr; }
  .cta-container-brutalist { flex-direction: column; padding: 50px; text-align: center; }
  .cta-action-side { justify-content: center; width: 100%; }
  .cta-title-home { font-size: 2.2rem; }
}
</style>
