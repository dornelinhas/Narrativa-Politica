<template>
  <div class="home-brutalist">
    <!-- HERO SECTION -->
    <section class="hero-activist activist-gradient">
      <!-- Floating Shapes -->
      <div class="geo-shape shape-pill-y pink floating-1"></div>
      <div class="geo-shape shape-square yellow floating-2"></div>
      <div class="geo-shape shape-circle blue floating-3"></div>

      <div class="container hero-content">
        <h1 class="hero-title">
          REIVINDIQUE <br />
          <span class="text-yellow">O FUTURO</span>.
        </h1>
        
        <div class="hero-intro-box">
          <p class="hero-description">
            Uma plataforma para ativismo de alto impacto, análise política e mobilização comunitária. Não viemos para debater, viemos para mudar a estrutura.
          </p>
          <div class="hero-actions">
            <button class="brutalist-button" @click="$router.push('/contatos')">Agir Agora</button>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee-brutalist">
      <div class="marquee-content">
        <span v-for="n in 10" :key="n" class="marquee-item">
          POR DEMOCRACIA, TERRITÓRIO E JUSTIÇA SOCIAL 
          <div class="geo-shape shape-circle dark-mini"></div>
        </span>
      </div>
    </div>

    <!-- FEATURED WRITING (Articles) -->
    <section id="essays" class="section-padding bg-bg">
      <div class="container">
        <div class="section-header-brutalist">
          <h2 class="font-display text-7xl">
            Nossa <br /> <span class="activist-gradient-text">Voz Estratégica</span>
          </h2>
          <p class="header-side-text">
            Ensaios críticos, educação política e ferramentas de mobilização comunitária.
          </p>
        </div>

        <div class="featured-grid">
          <!-- Featured Article (Main) -->
          <div v-if="siteContent.posts.length > 0" class="featured-main brutalist-card-large" @click="$router.push('/conteudo/' + siteContent.posts[0].id)">
            <div class="card-image-wrap">
              <img :src="siteContent.posts[0].image" alt="Featured" class="card-img" />
              <div class="tag-overlay">
                <span class="tag">{{ siteContent.posts[0].category }}</span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title-lg">{{ siteContent.posts[0].title }}</h3>
              <p class="card-excerpt">{{ siteContent.posts[0].excerpt }}</p>
              <div class="card-footer">
                <span class="read-more">Ler Ensaio Completo <ArrowRight :size="16" /></span>
              </div>
            </div>
          </div>

          <!-- Side Articles -->
          <div class="featured-side">
            <div v-for="(post, i) in siteContent.posts.slice(1, 3)" :key="post.id" 
                 class="brutalist-card-small" 
                 :class="i % 2 === 0 ? 'pink-hover' : 'blue-hover'"
                 @click="$router.push('/conteudo/' + post.id)">
              <div class="card-header-mini">
                <span class="tag" :class="i % 2 === 0 ? 'pink' : 'blue'">{{ post.category }}</span>
                <ArrowRight :size="20" class="arrow-icon" />
              </div>
              <h4 class="card-title-sm">{{ post.title }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RADAR (Pillars / Opportunities) -->
    <section class="radar-section">
      <div class="geo-shape shape-circle yellow bg-shape-1"></div>
      <div class="container radar-grid">
        <div class="radar-info">
          <div class="radar-kicker">
            <div class="geo-shape shape-square red mini"></div>
            <span class="kicker-text">O Radar Ativista</span>
          </div>
          <h2 class="font-display text-7xl mb-8">Oportuni<br/>dades</h2>
          <div class="radar-highlight-box">
             Vagas, subsídios e bolsas para lideranças que constroem a base e não apenas a marca. Atualizado pela nossa rede.
          </div>
        </div>

        <div class="radar-list">
          <div v-for="(pillar, i) in pillars" :key="i" class="radar-item brutalist-card">
            <div class="radar-item-content">
              <div class="radar-item-header">
                <div class="geo-shape shape-circle mini" :class="pillar.color"></div>
                <span class="pillar-label">{{ pillar.label }}</span>
              </div>
              <h4 class="pillar-title">{{ pillar.desc }}</h4>
              <p class="pillar-org">Impacto focado em {{ pillar.label.toLowerCase() }}</p>
            </div>
            <div class="radar-action-box">
              PRAZO: ABERTO
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES (Eixos de Ação) -->
    <section class="services-dark">
      <div class="grid-bg"></div>
      <div class="container relative z-10">
        <div class="services-header">
          <div class="geo-shape shape-circle red mini border-white"></div>
          <h2 class="font-display text-6xl text-white">NOSSOS <span class="text-yellow">EIXOS DE AÇÃO</span></h2>
        </div>

        <div class="services-brutalist-grid">
          <div v-for="(svc, i) in services" :key="i" class="svc-brutalist-card" :class="svc.accent">
            <component :is="svc.icon" class="svc-icon" :class="svc.accent + '-text'" />
            <h3 class="svc-title">{{ svc.title }}</h3>
            <p class="svc-desc">{{ svc.description }}</p>
            <div class="svc-footer">
              <span>Conheça os Projetos</span>
              <ArrowRight :size="16" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter-brutalist-section">
      <div class="container">
        <div class="newsletter-box">
          <div class="newsletter-info">
            <div class="nl-kicker">
               <Zap :size="24" class="red-text" />
               <span>Rede de Mobilização</span>
            </div>
            <h2 class="font-display text-5xl mb-4">Junte-se ao <br /> Movimento.</h2>
            <p class="nl-text">Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.</p>
          </div>

          <div class="newsletter-action">
            <div class="geo-shape shape-circle red floating-nl-1"></div>
            <div class="geo-shape shape-square mint floating-nl-2"></div>
            
            <form @submit.prevent="handleSubscribe" class="nl-form-brutalist">
              <input 
                type="email" 
                v-model="newsletterEmail" 
                placeholder="Digite seu email..." 
                class="nl-input-brutalist"
                required
              />
              <button type="submit" class="brutalist-button red w-full justify-center">Quero Fazer Parte</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight, Zap, Database, ShieldCheck, Users, Mic2, BarChart3, TrendingUp, Globe, Heart } from 'lucide-vue-next'
import { siteContent, saveContent } from '../store/content'

const newsletterEmail = ref('')

const pillars = [
  { icon: BarChart3, label: 'Economia de Gênero', desc: 'Formação em Políticas Públicas', color: 'pink' },
  { icon: TrendingUp, label: 'Liderança STEM', desc: 'Bolsas para Mulheres em Dados', color: 'purple' },
  { icon: Globe, label: 'Advocacy', desc: 'Mentoria em Incidência Política', color: 'blue' },
  { icon: Heart, label: 'Impacto Social', desc: 'Fundo de Apoio a Territórios', color: 'lime' }
]

const services = [
  { icon: Database, accent: 'pink', title: 'Escola de Formação', description: 'Cursos e materiais para desenvolvimento de novas lideranças comunitárias.' },
  { icon: ShieldCheck, accent: 'lime', title: 'Incidência Política', description: 'Acompanhamento legislativo e construção de campanhas de pressão pública.' },
  { icon: Users, accent: 'blue', title: 'Apoio a Territórios', description: 'Suporte logístico e intelectual para movimentos sociais na linha de frente.' }
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
</script>

<style scoped>
.home-brutalist {
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-padding {
  padding: 100px 0;
}

.bg-bg { background: var(--color-bg); }

/* HERO */
.hero-activist {
  position: relative;
  min-height: 95vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 60px;
  border-bottom: 8px solid var(--color-dark);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
}

.hero-title {
  font-size: clamp(3rem, 12vw, 9rem);
  color: white;
  line-height: 0.85;
  margin-bottom: 40px;
}

.text-yellow { color: var(--color-yellow); }

.hero-intro-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 40px;
  max-width: 700px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.hero-description {
  font-family: var(--font-sans);
  font-weight: 600;
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-intro-box { flex-direction: column; align-items: flex-start; gap: 20px; }
  .hero-title { font-size: clamp(3rem, 15vw, 6rem); }
}

/* FLOATING SHAPES */
.geo-shape { display: inline-block; border: 4px solid var(--color-dark); }
.shape-pill-y { height: 180px; width: 80px; border-radius: 100px; }
.shape-square { aspect-ratio: 1; width: 100px; }
.shape-circle { aspect-ratio: 1; border-radius: 50%; width: 50px; }

.geo-shape.pink { background: var(--color-pink); }
.geo-shape.yellow { background: var(--color-yellow); }
.geo-shape.blue { background: var(--color-blue); }
.geo-shape.red { background: var(--color-red); }
.geo-shape.lime { background: var(--color-lime); }
.geo-shape.purple { background: var(--color-pink); } /* Using pink for purple as in ref */

.floating-1 { position: absolute; top: 15%; right: 15%; box-shadow: 8px 8px 0 rgba(28,28,28,0.3); animation: float 4s ease-in-out infinite; }
.floating-2 { position: absolute; bottom: 15%; left: 10%; transform: rotate(15deg); box-shadow: -8px 8px 0 rgba(28,28,28,0.3); animation: float 5s ease-in-out infinite 1s; }
.floating-3 { position: absolute; top: 40%; left: 55%; animation: pulse 6s ease-in-out infinite; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50% { transform: translateY(-20px) rotate(var(--rot, 0deg)); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* MARQUEE */
.marquee-brutalist {
  background: var(--color-pink);
  color: var(--color-dark);
  padding: 20px 0;
  border-top: 4px solid var(--color-dark);
  border-bottom: 4px solid var(--color-dark);
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}

.marquee-item {
  font-family: var(--font-display);
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 30px;
  display: inline-flex;
  align-items: center;
  gap: 30px;
}

.dark-mini { width: 15px !important; height: 15px !important; background: var(--color-dark) !important; border: none !important; }

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* SECTION HEADERS */
.section-header-brutalist {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
}

.text-7xl { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 0.9; }
.header-side-text {
  max-width: 300px;
  border-left: 6px solid var(--color-lime);
  padding-left: 20px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}

/* FEATURED GRID */
.featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.brutalist-card-large {
  display: flex;
  border: 4px solid var(--color-dark);
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.brutalist-card-large:hover {
  box-shadow: 12px 12px 0 var(--color-lime);
  transform: translate(-6px, -6px);
}

.card-image-wrap {
  width: 50%;
  position: relative;
  border-right: 4px solid var(--color-dark);
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: all 0.5s;
}

.brutalist-card-large:hover .card-img { filter: grayscale(0); transform: scale(1.05); }

.tag-overlay { position: absolute; top: 20px; left: 20px; }

.card-content { width: 50%; padding: 40px; display: flex; flex-direction: column; }
.card-title-lg { font-size: 2.2rem; margin-bottom: 20px; line-height: 1; }
.card-excerpt { font-weight: 500; opacity: 0.8; line-height: 1.6; margin-bottom: 30px; }
.read-more { font-weight: 900; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }
.brutalist-card-large:hover .read-more { color: var(--color-red); }

.featured-side { display: flex; flex-direction: column; gap: 30px; }
.brutalist-card-small {
  border: 4px solid var(--color-dark);
  background: white;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header-mini { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.tag.pink { background: var(--color-pink); color: white; }
.tag.blue { background: var(--color-blue); color: white; }
.arrow-icon { opacity: 0.3; transition: all 0.3s; }

.brutalist-card-small:hover { transform: translate(-4px, -4px); }
.pink-hover:hover { box-shadow: 8px 8px 0 var(--color-pink); }
.blue-hover:hover { box-shadow: 8px 8px 0 var(--color-blue); }
.brutalist-card-small:hover .arrow-icon { opacity: 1; transform: rotate(-45deg); }

.card-title-sm { font-size: 1.6rem; line-height: 1.1; }

@media (max-width: 1024px) {
  .featured-grid { grid-template-columns: 1fr; }
  .brutalist-card-large { flex-direction: column; }
  .card-image-wrap { width: 100%; height: 300px; border-right: none; border-bottom: 4px solid var(--color-dark); }
  .card-content { width: 100%; }
}

/* RADAR */
.radar-section {
  background: var(--color-lime);
  padding: 100px 0;
  border-top: 4px solid var(--color-dark);
  border-bottom: 4px solid var(--color-dark);
  position: relative;
  overflow: hidden;
}

.bg-shape-1 { position: absolute; bottom: -50px; left: -50px; width: 250px !important; opacity: 0.3; }

.radar-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 60px; position: relative; z-index: 10; }

.radar-kicker { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.shape-square.red.mini { width: 20px !important; border: 2px solid var(--color-dark); }
.kicker-text { font-weight: 900; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.15em; }

.radar-highlight-box {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 30px;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 8px 8px 0 var(--color-dark);
}

.radar-list { display: flex; flex-direction: column; gap: 20px; }
.radar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background: white;
  cursor: pointer;
}

.radar-item-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.geo-shape.mini { width: 12px !important; border: 2px solid var(--color-dark); }
.pillar-label { font-weight: 900; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; }
.pillar-title { font-family: var(--font-display); font-size: 1.8rem; line-height: 1; }
.pillar-org { font-weight: 600; opacity: 0.6; margin-top: 5px; }

.radar-action-box {
  border: 3px solid var(--color-dark);
  padding: 15px 25px;
  font-weight: 900;
  font-size: 0.8rem;
  background: var(--color-bg);
  transition: all 0.2s;
}

.radar-item:hover .radar-action-box { background: var(--color-dark); color: white; }

@media (max-width: 992px) {
  .radar-grid { grid-template-columns: 1fr; }
}

/* SERVICES DARK */
.services-dark {
  background: var(--color-dark);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
}

.grid-bg {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px);
  background-size: 50px 50px;
}

.services-header { display: flex; align-items: center; gap: 20px; margin-bottom: 60px; }
.text-6xl { font-size: clamp(2rem, 5vw, 4rem); }
.border-white { border-color: white !important; }
.text-white { color: white; }

.services-brutalist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.svc-brutalist-card {
  background: #2a2a2a;
  border: 4px solid rgba(255,255,255,0.1);
  padding: 40px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.svc-brutalist-card:hover {
  transform: translateY(-10px);
  border-color: currentColor;
}

.svc-icon { width: 50px; height: 50px; margin-bottom: 30px; }
.pink-text { color: var(--color-pink); }
.lime-text { color: var(--color-lime); }
.blue-text { color: var(--color-blue); }

.svc-title { font-family: var(--font-display); font-size: 2rem; color: white; margin-bottom: 15px; }
.svc-desc { color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem; margin-bottom: 30px; flex: 1; }

.svc-footer {
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: white;
}

@media (max-width: 1024px) {
  .services-brutalist-grid { grid-template-columns: 1fr; }
}

/* NEWSLETTER */
.newsletter-brutalist-section {
  background: var(--color-blue);
  padding: 100px 0;
}

.newsletter-box {
  background: var(--color-yellow);
  border: 4px solid var(--color-dark);
  padding: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  box-shadow: 15px 15px 0 var(--color-dark);
  position: relative;
}

.nl-kicker { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-weight: 900; text-transform: uppercase; font-size: 0.75rem; }
.red-text { color: var(--color-red); fill: currentColor; }

.text-5xl { font-size: 3rem; line-height: 1; }
.nl-text { font-weight: 700; opacity: 0.8; margin-bottom: 30px; }

.newsletter-action { position: relative; }
.floating-nl-1 { position: absolute; top: -30px; right: -30px; z-index: 20; }
.floating-nl-2 { position: absolute; bottom: -30px; left: -30px; background: var(--color-mint); }

.nl-form-brutalist {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 10;
}

.nl-input-brutalist {
  width: 100%;
  background: var(--color-bg);
  border: 3px solid var(--color-dark);
  padding: 15px 20px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.1rem;
  outline: none;
}

.w-full { width: 100%; }

@media (max-width: 992px) {
  .newsletter-box { grid-template-columns: 1fr; gap: 40px; padding: 40px; }
}

/* GLOBAL BRUTALIST COMPONENTS (Fallback) */
.brutalist-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 4px solid var(--color-dark);
  background: var(--color-yellow);
  color: var(--color-dark);
  cursor: pointer;
  transition: all 0.2s;
}

.brutalist-button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 6px 6px 0 var(--color-dark);
}

.brutalist-button.red { background: var(--color-red); color: white; }

.brutalist-card {
  background: white;
  border: 4px solid var(--color-dark);
  transition: all 0.2s;
}

.brutalist-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--color-dark);
}

.tag {
  display: inline-flex;
  padding: 8px 15px;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: var(--color-yellow);
  color: var(--color-dark);
}
</style>