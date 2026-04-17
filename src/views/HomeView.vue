<template>
  <div class="home-np">
    <!-- ═══════════════════════════════════════════
         HERO — Full Gradient Immersive
         ═══════════════════════════════════════════ -->
    <section class="hero-immersive">
      <div class="hero-bg-shapes">
        <div class="shape shape-circle"></div>
        <div class="shape shape-rect"></div>
        <div class="shape shape-square"></div>
        <div class="shape shape-dot"></div>
      </div>
      <div class="container hero-grid">
        <div class="hero-text">
          <div class="tagline-kicker">
            <span class="k-pink">ESTRATÉGIA</span>
            <span class="k-dot">•</span>
            <span class="k-petrol">IMPACTO</span>
            <span class="k-dot">•</span>
            <span class="k-lime">MUDANÇA</span>
          </div>
          <h1 class="hero-title-big">
            Transformando<br>
            teoria <span class="hero-highlight">econômica</span><br>
            em <span class="hero-highlight">ação real.</span>
          </h1>
          <p class="hero-lead">
            Análise de impacto, formação de lideranças e estruturação de narrativas políticas baseadas em dados e vivência acadêmica.
          </p>
        </div>
        <div class="hero-visual">
          <div class="hero-np-emblem">
            <span class="emblem-letters">NP</span>
            <div class="emblem-shape es-1"></div>
            <div class="emblem-shape es-2"></div>
            <div class="emblem-shape es-3"></div>
            <div class="emblem-shape es-4"></div>
            <div class="emblem-shape es-5"></div>
          </div>
        </div>
      </div>

      <!-- PILARES — Inside Hero Dark Block -->
      <div class="container pillars-container">
        <div class="pillars-grid-blocks">
          <div v-for="(pillar, i) in pillars" :key="i" class="pillar-block" :class="'pillar-' + pillar.color">
            <div class="pillar-block-icon">
              <component :is="pillar.icon" :size="32" />
            </div>
            <h3 class="pillar-block-title">{{ pillar.label }}</h3>
            <p class="pillar-block-desc">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         NOSSOS SERVIÇOS — Vibrant Grid
         ═══════════════════════════════════════════ -->
    <section class="services-home">
      <div class="container">
        <div class="section-intro">
          <span class="section-eyebrow">O QUE FAZEMOS</span>
          <h2 class="section-title-lg">Nossos <span class="text-gradient">Serviços</span></h2>
          <p class="section-desc">Consultoria, mentoria e palestras para quem quer gerar mudança real no mundo.</p>
        </div>
        <div class="services-grid-home">
          <router-link v-for="(service, index) in services" :key="index"
                       to="/servicos"
                       class="service-block-card reveal-item"
                       :class="'svc-' + service.accent"
                       :style="{ transitionDelay: (index * 0.1) + 's' }">
            <div class="svc-icon-wrap" :style="{ background: service.iconBg }">
              <component :is="service.icon" :size="28" color="#fff" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <span class="svc-link">
              Saiba mais
              <ArrowRight :size="14" />
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         ARTIGOS — Editorial com Capas Vibrantes
         ═══════════════════════════════════════════ -->
    <section class="articles-section">
      <div class="container">
        <div class="section-header-flex">
          <div>
            <span class="section-eyebrow">CONTEÚDO</span>
            <h2 class="section-title-lg section-title-dark">Artigos e <span class="text-gradient">Notícias</span></h2>
            <p class="section-desc">Análises autorais sobre economia, política e impacto social no Brasil.</p>
          </div>
          <router-link to="/conteudo" class="btn-np-sm">
            Ver todos
            <ArrowRight :size="14" />
          </router-link>
        </div>
        <div class="articles-grid">
          <article v-for="(post, idx) in siteContent.posts.slice(0, 3)" :key="post.id"
                   class="article-card reveal-item"
                   :style="{ transitionDelay: (idx * 0.12) + 's' }">
            <div class="article-cover">
              <img :src="post.image" :alt="post.title" loading="lazy" />
              <span class="article-tag tag-pink">{{ post.category }}</span>
            </div>
            <div class="article-body">
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt }}</p>
              <router-link :to="'/conteudo/' + post.id" class="article-link">
                Ler artigo →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         MANIFESTO — Faixa de Impacto NP
         ═══════════════════════════════════════════ -->
    <section class="manifesto-strip">
      <div class="container manifesto-grid">
        <div class="manifesto-text">
          <h2>Acreditamos que <span class="text-gradient">dados transformam</span> narrativas.</h2>
          <p>A Narrativa Política existe para conectar pesquisa acadêmica, ativismo de base e comunicação estratégica — entregando soluções que geram mudanças mensuráveis.</p>
          <router-link to="/sobre" class="btn-np-dark">
            Sobre a Narrativa
            <ArrowRight :size="16" />
          </router-link>
        </div>
        <div class="manifesto-visual">
          <div class="manifesto-stat" v-for="(stat, si) in manifestoStats" :key="si">
            <span class="stat-icon" :style="{ background: stat.bg }">
              <component :is="stat.icon" :size="22" color="#fff" />
            </span>
            <div>
              <strong>{{ stat.label }}</strong>
              <span>{{ stat.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         NEWSLETTER — Full-Width Gradient
         ═══════════════════════════════════════════ -->
    <section class="newsletter-fullwidth">
      <div class="newsletter-shapes">
        <div class="nl-shape nl-s1"></div>
        <div class="nl-shape nl-s2"></div>
        <div class="nl-shape nl-s3"></div>
      </div>
      <div class="container newsletter-center">
        <h2 class="newsletter-title">Receba <span style="color: var(--color-lime); text-shadow: 0 0 20px rgba(212,225,87,0.3);">Nossa Narrativa</span></h2>
        <p class="newsletter-subtitle" style="color: #FFFFFF; opacity: 1;">Receba nossa Newsletter. Inscreva-se para receber análises exclusivas sobre economia, gênero, política e sustentabilidade.</p>
        <form @submit.prevent="handleSubscribe" class="newsletter-form">
          <input type="email" v-model="newsletterEmail" placeholder="Seu melhor e-mail" required class="newsletter-input" aria-label="Endereço de e-mail" />
          <button type="submit" class="newsletter-btn">Inscrever-se</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Database, ShieldCheck, Users, Mic2, ArrowRight, TrendingUp, Heart, BarChart3, Globe, BookOpen, Award, Target } from 'lucide-vue-next'
import { siteContent, saveContent } from '../store/content'

const newsletterEmail = ref('')

const pillars = [
  { icon: BarChart3, label: 'Economia de Gênero', desc: 'Políticas econômicas centradas em gênero para impacto real.', color: 'pink' },
  { icon: TrendingUp, label: 'Liderança STEM', desc: 'Capacitando mulheres em ciência, tecnologia e dados.', color: 'purple' },
  { icon: Globe, label: 'Advocacy & Dados', desc: 'Dados públicos transformados em argumentos políticos.', color: 'petrol' },
  { icon: Heart, label: 'Impacto Social', desc: 'Projetos que conectam teoria à transformação real.', color: 'lime' }
]

const services = [
  { icon: Database, iconBg: '#FF2D55', accent: 'pink', title: 'Análise de Dados', description: 'Pesquisa econômica técnica focada em política e desigualdades.' },
  { icon: ShieldCheck, iconBg: '#8A2BE2', accent: 'purple', title: 'Consultoria ESG', description: 'Estratégias de impacto socioambiental para instituições.' },
  { icon: Users, iconBg: '#00CED1', accent: 'petrol', title: 'Mentorias', description: 'Programas de capacitação para lideranças femininas.' },
  { icon: Mic2, iconBg: '#D4E157', accent: 'lime', title: 'Palestras', description: 'Keynotes sobre economia, relações internacionais e gênero.' }
]

const manifestoStats = [
  { icon: BookOpen, bg: '#FF2D55', label: 'Pesquisa Aplicada', desc: 'Economia, gênero e políticas públicas' },
  { icon: Award, bg: '#8A2BE2', label: 'Formação de Líderes', desc: 'Mentorias e capacitações estratégicas' },
  { icon: Target, bg: '#00CED1', label: 'Impacto Direto', desc: 'Do dado ao projeto de transformação' }
]

const handleSubscribe = () => { 
  if (!siteContent.subscribers) siteContent.subscribers = []
  if (newsletterEmail.value && !siteContent.subscribers.find(s => s.email === newsletterEmail.value)) {
    siteContent.subscribers.push({ email: newsletterEmail.value, date: new Date().toLocaleDateString('pt-BR') })
    saveContent()
    alert('Obrigado! Você foi inscrita com sucesso.')
  } else if (newsletterEmail.value) {
    alert('Este e-mail já está inscrito!')
  }
  newsletterEmail.value = ''
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════ */
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* ═══════════════════════════════════════════════
   HERO — IMMERSIVE GRADIENT
   ═══════════════════════════════════════════════ */
.hero-immersive {
  min-height: auto;
  background: linear-gradient(150deg, #1A1C2E 0%, #2D1B4E 35%, #1A1C2E 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: pulse-glow 6s ease-in-out infinite;
}

.shape-circle {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,45,85,0.25), transparent 70%);
  top: -10%; left: -10%;
}

.shape-rect {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(138,43,226,0.2), transparent 70%);
  bottom: -5%; right: 10%;
  animation-delay: -2s;
}

.shape-square {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(0,206,209,0.15), transparent 70%);
  top: 30%; right: 25%;
  animation-delay: -4s;
}

.shape-dot {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(212,225,87,0.12), transparent 70%);
  bottom: 20%; left: 20%;
  animation-delay: -1s;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.tagline-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 2.5px;
}

.k-pink { color: var(--color-pink); }
.k-petrol { color: var(--color-petrol); }
.k-lime { color: var(--color-lime); }
.k-dot { color: rgba(255,255,255,0.3); }

.hero-title-big {
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: #FFFFFF !important;
  margin-bottom: 28px;
  letter-spacing: -0.03em;
}

.hero-highlight {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lead {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.85) !important;
  max-width: 600px;
  line-height: 1.8;
  font-weight: 500;
}

/* HERO VISUAL — Logo Emblem */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-np-emblem {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emblem-letters {
  font-size: 8rem;
  font-weight: 900;
  color: white;
  z-index: 2;
  position: relative;
  text-shadow: 0 0 60px rgba(255,45,85,0.3);
}

.emblem-shape {
  position: absolute;
  animation: float 5s ease-in-out infinite;
}

.es-1 {
  width: 40px; height: 40px;
  background: var(--color-pink);
  border-radius: 50%;
  top: 20px; left: 40%;
  animation-delay: 0s;
}

.es-2 {
  width: 20px; height: 20px;
  background: var(--color-lime);
  border-radius: 50%;
  top: 40px; left: 52%;
  animation-delay: -1s;
}

.es-3 {
  width: 60px; height: 36px;
  background: var(--color-pink);
  border-radius: 6px;
  top: 22px; right: 18%;
  animation-delay: -2s;
  opacity: 0.9;
}

.es-4 {
  width: 36px; height: 54px;
  background: var(--color-lime);
  border-radius: 6px;
  bottom: 40px; left: 28%;
  animation-delay: -0.5s;
  opacity: 0.85;
}

.es-5 {
  width: 28px; height: 28px;
  background: var(--color-petrol);
  border-radius: 6px;
  bottom: 50px; right: 30%;
  animation-delay: -3s;
  opacity: 0.8;
}

/* ═══════════════════════════════════════════════
   PILARES — INSIDE HERO DARK BLOCK
   ═══════════════════════════════════════════════ */
.pillars-container {
  position: relative;
  z-index: 5;
  padding-top: 60px;
}

.pillars-grid-blocks {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.pillar-block {
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 16px;
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
  position: relative;
  color: #FFFFFF !important;
}

.pillar-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.18);
}

.pillar-pink { background: var(--color-pink); }
.pillar-purple { background: var(--color-purple); }
.pillar-petrol { background: #008B8B; } 
.pillar-lime { background: #829400; } 

.pillar-block-icon {
  width: 52px;
  height: 52px;
  background: rgba(255,255,255,0.25);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF !important;
}

.pillar-block-title {
  font-size: 1.05rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #FFFFFF !important;
}

.pillar-block-desc {
  font-size: 0.85rem;
  line-height: 1.55;
  color: #FFFFFF !important;
  opacity: 0.95;
}

/* ═══════════════════════════════════════════════
   SERVICES HOME
   ═══════════════════════════════════════════════ */
.services-home {
  padding: 120px 0;
  background: #F9FAFB;
}

.section-intro {
  text-align: center;
  margin-bottom: 64px;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-pink);
  margin-bottom: 12px;
}

.section-title-lg {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  color: var(--color-graphite);
  margin-bottom: 12px;
}

.section-title-dark {
  color: var(--color-graphite) !important;
}

.section-desc {
  font-size: 1.1rem;
  color: var(--text-muted, #6B7280);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.services-grid-home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.service-block-card {
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  color: var(--text-main);
}

.svc-pink { background: var(--color-pink-soft); border-color: var(--color-pink-mid); }
.svc-purple { background: var(--color-purple-soft); border-color: var(--color-purple-mid); }
.svc-petrol { background: var(--color-petrol-soft); border-color: var(--color-petrol-mid); }
.svc-lime { background: var(--color-lime-soft); border-color: #E8EFA3; }

.service-block-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.svc-pink:hover { box-shadow: var(--shadow-glow-pink); }
.svc-purple:hover { box-shadow: var(--shadow-glow-purple); }
.svc-petrol:hover { box-shadow: var(--shadow-glow-petrol); }
.svc-lime:hover { box-shadow: 0 8px 32px rgba(212,225,87,0.4); }

.svc-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-block-card h3 {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-graphite);
}

.service-block-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.65;
  flex: 1;
}

.svc-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--color-pink);
  margin-top: auto;
  transition: gap 0.3s ease;
}

.service-block-card:hover .svc-link {
  gap: 10px;
}

/* ═══════════════════════════════════════════════
   ARTICLES — EDITORIAL CARDS
   ═══════════════════════════════════════════════ */
.articles-section {
  padding: 120px 0;
  background: linear-gradient(180deg, rgba(255,45,85,0.03) 0%, rgba(138,43,226,0.05) 100%);
}

.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 56px;
}

.btn-np-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  background: var(--color-graphite);
  color: #fff;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.85rem;
  text-decoration: none;
  transition: var(--transition);
  white-space: nowrap;
}

.btn-np-sm:hover {
  background: var(--color-pink);
  transform: translateY(-2px);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.article-card {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.article-cover {
  width: 100%;
  height: 210px;
  overflow: hidden;
  position: relative;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-cover img {
  transform: scale(1.06);
}

.article-tag {
  position: absolute;
  bottom: 14px;
  left: 14px;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 6px 14px;
  border-radius: 8px;
}

.tag-pink { background: var(--color-pink); }
.tag-purple { background: var(--color-purple); }
.tag-petrol { background: var(--color-petrol); color: var(--color-graphite); }
.tag-lime { background: var(--color-lime); color: var(--color-graphite); }

.article-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-body h4 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-graphite);
  line-height: 1.35;
  margin-bottom: 10px;
}

.article-body p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.article-link {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-pink);
  text-decoration: none;
  transition: color 0.2s;
  margin-top: auto;
}

.article-link:hover { color: var(--color-purple); }

/* ═══════════════════════════════════════════════
   MANIFESTO STRIP
   ═══════════════════════════════════════════════ */
.manifesto-strip {
  padding: 100px 0;
  background: var(--color-graphite);
  position: relative;
}

.manifesto-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}

.manifesto-text h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: #fff;
  line-height: 1.2;
  margin-bottom: 20px;
}

.manifesto-text p {
  color: rgba(255,255,255,0.6);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 36px;
}

.btn-np-dark {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--brand-gradient);
  color: #fff;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: var(--shadow-glow-pink);
}

.btn-np-dark:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255,45,85,0.5);
}

.manifesto-visual {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.manifesto-stat {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 24px 28px;
  border-radius: var(--radius);
  transition: var(--transition);
}

.manifesto-stat:hover {
  background: rgba(255,255,255,0.08);
  transform: translateX(6px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.manifesto-stat strong {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}

.manifesto-stat span {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}

/* ═══════════════════════════════════════════════
   NEWSLETTER — FULL-WIDTH GRADIENT
   ═══════════════════════════════════════════════ */
.newsletter-fullwidth {
  width: 100%;
  background: var(--brand-gradient);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.newsletter-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.nl-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  animation: float 8s ease-in-out infinite;
}

.nl-s1 { width: 300px; height: 300px; top: -100px; left: -50px; }
.nl-s2 { width: 200px; height: 200px; bottom: -50px; right: 10%; animation-delay: -3s; }
.nl-s3 { width: 150px; height: 150px; top: 20%; right: 30%; animation-delay: -5s; }

.newsletter-center {
  text-align: center;
  position: relative;
  z-index: 1;
}

.newsletter-title {
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.newsletter-subtitle {
  font-size: 1.2rem;
  color: #FFFFFF;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.8;
  opacity: 1;
}

.newsletter-form {
  display: flex;
  gap: 14px;
  max-width: 520px;
  margin: 0 auto;
}

.newsletter-input {
  flex: 1;
  padding: 16px 24px;
  border-radius: 14px;
  border: 2px solid rgba(255,255,255,0.25);
  background: #fff;
  font-size: 1rem;
  color: var(--color-graphite);
  outline: none;
  transition: var(--transition);
}

.newsletter-input:focus {
  border-color: rgba(255,255,255,0.7);
  box-shadow: 0 0 0 4px rgba(255,255,255,0.15);
}

.newsletter-input::placeholder { color: #9CA3AF; }

.newsletter-btn {
  background: var(--color-graphite);
  color: #fff;
  border: none;
  padding: 16px 36px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,28,46,0.4);
}

/* ═══════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .pillars-grid-blocks { grid-template-columns: repeat(2, 1fr); }
  .manifesto-grid { grid-template-columns: 1fr; gap: 48px; }
}

@media (max-width: 768px) {
  .services-grid-home { grid-template-columns: 1fr; }
  .articles-grid { grid-template-columns: 1fr 1fr; }
  .section-header-flex { flex-direction: column; align-items: flex-start; gap: 20px; }
  .hero-title-big { font-size: 2.6rem; }
  .newsletter-form { flex-direction: column; }
  .newsletter-btn { width: 100%; }
}

@media (max-width: 480px) {
  .pillars-grid-blocks { grid-template-columns: 1fr; }
  .articles-grid { grid-template-columns: 1fr; }
  .hero-buttons { flex-direction: column; }
  .hero-buttons a { text-align: center; justify-content: center; }
}
</style>