<template>
  <div class="page-brutalist">
    <section class="page-hero activist-gradient">
      <div class="geo-decor pill-y yellow-bg"></div>
      <div class="container hero-inner">
        <span class="eyebrow">SOBRE MIM</span>
        <h1 class="hero-title">IDEIAS QUE<br/><span class="text-yellow">MOVEM ESTRUTURAS</span></h1>
        <p class="hero-subtitle">{{ siteContent.about.mission }}</p>
      </div>
    </section>

    <section class="dashboard-section">
      <div class="container about-grid">
        <aside class="profile-sidebar">
          <div class="profile-card brutalist-card">
            <div class="profile-img">
              <img :src="siteContent.about.image || '/images/anne-dornelas.png'" alt="Perfil" />
            </div>
            <div class="profile-info">
              <h2>{{ siteContent.about.name }}</h2>
              <p class="role">{{ siteContent.about.role }}</p>
              <div class="social-stack">
                <a href="https://www.linkedin.com/company/narrativa-políticaorg" target="_blank" class="social-btn">LINKEDIN</a>
                <a href="mailto:contatonarrativapolitica@gmail.com" class="social-btn">E-MAIL</a>
              </div>
              <div class="edit-hint-box">
                <span class="edit-hint">✎ Perfil editável no Admin</span>
              </div>
            </div>
          </div>
        </aside>

        <main class="trajectory-main">
          <div class="brutalist-card trajectory-card">
            <div class="card-accent red"></div>
            <h3>TRAJETÓRIA & VISÃO</h3>
            <div class="rich-text" v-html="formatBio(siteContent.about.bioInstitucional || defaultBio)"></div>
            
            <div class="metrics-grid mt-8">
              <div class="metric-box">
                <span class="metric-num">{{ siteContent.about.metric1 || '+10' }}</span>
                <span class="metric-label">Anos de Atuação</span>
              </div>
              <div class="metric-box">
                <span class="metric-num">{{ siteContent.about.metric2 || '50+' }}</span>
                <span class="metric-label">Projetos Liderados</span>
              </div>
              <div class="metric-box">
                <span class="metric-num">{{ siteContent.about.metric3 || 'R$ 5M' }}</span>
                <span class="metric-label">Impacto Gerado</span>
              </div>
            </div>
          </div>

          <div class="brutalist-card expertise-card">
            <div class="card-accent lime"></div>
            <h3 class="text-lime">ÁREAS DE ATUAÇÃO</h3>
            <div class="expertise-grid">
              <div v-for="skill in expertise" :key="skill" class="skill-item">
                <Zap :size="18" class="text-yellow" /><span>{{ skill }}</span>
              </div>
            </div>
            <button class="brutalist-button full mt-12" @click="$router.push('/contatos')">SOLICITAR CONSULTORIA</button>
          </div>
        </main>
      </div>
    </section>
  </div>
</template>

<script setup>
import { siteContent } from '../store/content'
import { Zap } from 'lucide-vue-next'
const expertise = ['Análise Econométrica', 'Advocacy de Gênero', 'Estratégia de Impacto Social', 'Articulação Política', 'Comunicação Estratégica', 'Pesquisa de Território']
const defaultBio = "Sou uma estrategista focada em traduzir teoria econômica para a ação política. Nos últimos anos, dediquei minha carreira a construir pontes entre dados quantitativos rigorosos e as necessidades urgentes de movimentos sociais e formuladores de políticas.\n\nAcredito que o ativismo sem dados é cego, e os dados sem ativismo são estéreis. Minha missão é armar a base com as ferramentas necessárias para disputar o poder de forma qualificada e definitiva."
const formatBio = (text) => { if (!text) return ''; return text.split('\n\n').map(p => `<p>${p}</p>`).join('') }
</script>

<style scoped>
.page-brutalist { background: var(--color-bg); min-height: 100vh; }
.page-hero { position: relative; padding: 220px 0 100px; border-bottom: 8px solid var(--color-dark); overflow: hidden; }
.hero-inner { position: relative; z-index: 10; }
.eyebrow { font-family: var(--font-sans); font-weight: 900; letter-spacing: 0.4em; font-size: 0.8rem; color: white; display: block; margin-bottom: 20px; opacity: 0.8; }
.hero-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 7rem); color: white; line-height: 0.85; margin-bottom: 30px; text-transform: uppercase; letter-spacing: -0.04em; }
.text-yellow { color: var(--color-yellow); }
.text-lime { color: var(--color-lime); }
.hero-subtitle { font-family: var(--font-sans); font-weight: 700; font-size: 1.3rem; color: white; max-width: 700px; line-height: 1.5; opacity: 0.9; }
.geo-decor { position: absolute; border: 4px solid var(--color-dark); z-index: 1; }
.geo-decor.pill-y { width: 80px; height: 160px; border-radius: 100px; background: var(--color-yellow); top: 10%; right: 5%; transform: rotate(15deg); }

.dashboard-section { padding: 80px 0; margin-top: -60px; position: relative; z-index: 20; }
.about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 60px; }

.profile-card { padding: 0; overflow: hidden; }
.profile-card:hover { transform: none; box-shadow: none; }
.profile-img { height: 350px; border-bottom: 4px solid var(--color-dark); overflow: hidden; }
.profile-img img { width: 100%; height: 100%; object-fit: cover; }
.profile-info { padding: 30px; }
.profile-info h2 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: -0.04em; }
.role { font-weight: 700; opacity: 0.6; font-size: 0.875rem; margin-bottom: 24px; }
.social-stack { display: flex; flex-direction: column; gap: 10px; }
.social-btn { font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; color: var(--color-dark); text-decoration: none; padding: 10px; border: 2px solid var(--color-dark); text-align: center; transition: all 0.2s; }
.social-btn:hover { background: var(--color-red); color: white; transform: translate(-3px, -3px); box-shadow: 4px 4px 0 var(--color-dark); }

.trajectory-card, .expertise-card { padding: 50px; margin-bottom: 32px; }
.trajectory-card:hover, .expertise-card:hover { transform: none; box-shadow: none; }
.card-accent { height: 10px; border-bottom: 4px solid var(--color-dark); margin: -50px -50px 30px; }
.card-accent.red { background: var(--color-red); }
.card-accent.lime { background: var(--color-lime); }
.trajectory-card h3, .expertise-card h3 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 32px; text-transform: uppercase; letter-spacing: -0.04em; }

.expertise-card { background: var(--color-dark); color: white; }
.expertise-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.skill-item { display: flex; align-items: center; gap: 15px; font-weight: 800; font-size: 0.9rem; padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }

.rich-text :deep(p) { font-family: var(--font-sans); font-weight: 500; line-height: 1.8; color: rgba(28,28,28,0.7); margin-bottom: 1.5rem; }

.full { width: 100%; justify-content: center; }
.mt-8 { margin-top: 32px; }
.mt-12 { margin-top: 48px; }

.edit-hint-box { margin-top: 20px; padding-top: 20px; border-top: 2px dashed rgba(28,28,28,0.2); text-align: center; }
.edit-hint { font-size: 10px; text-transform: uppercase; color: rgba(28,28,28,0.5); font-weight: 800; letter-spacing: 1px; }

.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.metric-box { background: var(--color-bg); border: 2px solid var(--color-dark); padding: 20px 15px; text-align: center; display: flex; flex-direction: column; gap: 5px; }
.metric-num { font-family: var(--font-display); font-size: 2rem; color: var(--color-red); line-height: 1; }
.metric-label { font-family: var(--font-sans); font-weight: 800; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.8; }

@media (max-width: 1024px) { .about-grid { grid-template-columns: 1fr; } .profile-sidebar { max-width: 400px; margin: 0 auto; } }
@media (max-width: 600px) { .expertise-grid { grid-template-columns: 1fr; } .trajectory-card, .expertise-card { padding: 30px; } .card-accent { margin: -30px -30px 20px; } }
</style>