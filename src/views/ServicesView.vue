<script setup>
import { ref } from 'vue'
import { siteContent } from '../store/content'
import { Database, ShieldCheck, Users, Mic2, ArrowRight, Zap, Globe, Cpu } from 'lucide-vue-next'
const servicesIcons = { Database, ShieldCheck, Users, Mic2, Zap, Globe, Cpu }
</script>

<template>
  <div class="page-brutalist">
    <section class="page-hero activist-gradient">
      <div class="geo-decor pill-y pink-bg"></div>
      <div class="geo-decor circle yellow-bg"></div>
      <div class="container hero-inner">
        <span class="eyebrow">EIXOS DE IMPACTO</span>
        <h1 class="hero-title">NOSSOS<br/><span class="text-yellow">SERVIÇOS</span></h1>
        <p class="hero-subtitle">Consultoria estratégica, análise técnica de dados e formação de lideranças. Unimos rigor acadêmico à urgência da mobilização social.</p>
      </div>
    </section>

    <section class="dashboard-section">
      <div class="container">
        <div class="svc-grid">
          <div v-for="(service, index) in siteContent.services" :key="index" class="svc-card brutalist-card">
            <div class="svc-header">
              <div class="svc-number">0{{ index + 1 }}</div>
              <component :is="servicesIcons[service.icon] || Zap" class="svc-icon" />
            </div>
            <div class="svc-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
            <router-link :to="'/servicos/' + service.id" class="svc-footer">
              <span>VER DETALHES</span><ArrowRight :size="18" />
            </router-link>
          </div>
        </div>

        <div class="cta-module">
          <div class="cta-info">
            <h2>PRECISA DE UMA SOLUÇÃO SOB MEDIDA?</h2>
            <p>Nossa equipe está pronta para desenhar estratégias de dados e incidência exclusivas para seu território ou organização.</p>
          </div>
          <button class="brutalist-button" @click="$router.push('/contatos')">FALAR COM ESPECIALISTAS</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-brutalist { background: var(--color-bg); min-height: 100vh; }

.page-hero { position: relative; padding: 180px 0 100px; border-bottom: 8px solid var(--color-dark); overflow: hidden; }
.hero-inner { position: relative; z-index: 10; }
.eyebrow { font-family: var(--font-sans); font-weight: 900; letter-spacing: 0.4em; font-size: 0.8rem; color: white; display: block; margin-bottom: 20px; opacity: 0.8; }
.hero-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 7rem); color: white; line-height: 0.85; margin-bottom: 30px; text-transform: uppercase; letter-spacing: -0.04em; }
.text-yellow { color: var(--color-yellow); }
.hero-subtitle { font-family: var(--font-sans); font-weight: 700; font-size: 1.3rem; color: white; max-width: 700px; line-height: 1.5; opacity: 0.9; }

.geo-decor { position: absolute; border: 4px solid var(--color-dark); z-index: 1; }
.geo-decor.pill-y { width: 80px; height: 160px; border-radius: 100px; top: 10%; right: 5%; transform: rotate(15deg); }
.geo-decor.circle { width: 100px; height: 100px; border-radius: 50%; bottom: -20px; left: 15%; }
.pink-bg { background: var(--color-pink); }
.yellow-bg { background: var(--color-yellow); }

.dashboard-section { padding: 80px 0; margin-top: -60px; position: relative; z-index: 20; }

.svc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }

.svc-card { padding: 0; min-height: 380px; display: flex; flex-direction: column; }
.svc-card:hover { transform: translate(-4px, -4px); }
.svc-header { padding: 40px 40px 20px; display: flex; justify-content: space-between; align-items: flex-start; }
.svc-number { font-family: var(--font-display); font-size: 4rem; color: var(--color-bg); -webkit-text-stroke: 2px var(--color-dark); line-height: 1; }
.svc-icon { width: 50px; height: 50px; color: var(--color-red); }
.svc-content { padding: 0 40px 40px; flex: 1; }
.svc-content h3 { font-family: var(--font-display); font-size: 2.2rem; margin-bottom: 20px; color: var(--color-dark); text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.9; }
.svc-content p { font-weight: 600; opacity: 0.7; font-size: 1.1rem; line-height: 1.6; }
.svc-footer { padding: 25px 40px; border-top: 4px solid var(--color-dark); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-sans); font-weight: 900; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; text-decoration: none; color: var(--color-dark); transition: background 0.2s, color 0.2s; }
.svc-footer:hover { background: var(--color-dark); color: white; }

.cta-module { margin-top: 80px; background: var(--color-dark); border: 6px solid var(--color-lime); padding: 60px; display: flex; justify-content: space-between; align-items: center; gap: 40px; color: white; box-shadow: 15px 15px 0 var(--color-dark); }
.cta-info h2 { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.9; }
.cta-info p { font-weight: 600; opacity: 0.8; font-size: 1.1rem; max-width: 600px; }

@media (max-width: 1024px) { .svc-grid { grid-template-columns: 1fr; } .cta-module { flex-direction: column; text-align: center; padding: 40px 20px; } }
</style>