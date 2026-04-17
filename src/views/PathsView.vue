<template>
  <div class="paths-np">
    <!-- HERO -->
    <section class="paths-hero">
      <div class="container paths-hero-inner">
        <div class="hero-accent" style="background: var(--color-purple, #8A2BE2);"></div>
        <span class="hero-eyebrow">JORNADAS DE CONHECIMENTO</span>
        <h1>Trilhas de <span class="hero-hl">Aprendizado</span></h1>
        <p>Percorra caminhos visuais projetados para transformar conhecimento em ação estratégica de impacto.</p>
      </div>
    </section>

    <!-- TRAILS -->
    <section class="paths-content">
      <div class="container">
        <div class="paths-list">
          <div v-for="(path, pIdx) in paths" :key="path.id"
               class="trail-card reveal-item"
               :class="'trail-accent-' + accentClasses[pIdx % accentClasses.length]"
               :style="{ transitionDelay: (pIdx * 0.15) + 's' }">

            <!-- TRAIL HEADER -->
            <div class="trail-header" :style="{ background: headerColors[pIdx % headerColors.length] }">
              <div class="trail-header-content">
                <div class="trail-meta-badges">
                  <span class="trail-badge-type" :class="path.isPremium ? 'premium' : 'gratuita'">{{ path.isPremium ? 'Sócio NP' : 'Gratuito' }}</span>
                  <span class="trail-badge-level">{{ path.level }}</span>
                </div>
                <h2 class="trail-title">{{ path.title }}</h2>
                <p class="trail-desc">{{ path.description }}</p>
                
                <div class="trail-perks">
                  <div class="perk-item" v-if="path.hasCertificate">
                    <CheckCircle :size="14" />
                    Certificado Incluso
                  </div>
                  <div class="perk-item">
                    <BookOpen :size="14" />
                    {{ path.modules?.length || 0 }} Módulos
                  </div>
                </div>

                <router-link to="/login" class="btn-trail-start">
                  Começar Jornada
                  <ArrowRight :size="16" />
                </router-link>
              </div>
            </div>

            <!-- TRAIL MODULES -->
            <div class="trail-modules">
              <h3 class="modules-title">Módulos da Trilha</h3>
              <div class="modules-list">
                <div v-for="(mod, idx) in path.modules" :key="idx"
                     class="module-step"
                     :style="{ transitionDelay: (idx * 0.1) + 's' }">
                  <div class="step-number" :style="{ background: nodeColors[idx % nodeColors.length] }">
                    {{ idx + 1 }}
                  </div>
                  <div class="step-info">
                    <span class="step-label">Módulo {{ idx + 1 }} • {{ mod.lessons?.length || 0 }} aulas</span>
                    <strong class="step-name">{{ mod.title }}</strong>
                  </div>
                  <div v-if="idx < path.modules.length - 1" class="step-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA: Login Required -->
    <section class="paths-cta">
      <div class="container paths-cta-inner">
        <div class="cta-icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
        </div>
        <h2>Pronto para começar?</h2>
        <p>Crie sua conta gratuita para acessar as trilhas, acompanhar seu progresso e transformar conhecimento em impacto.</p>
        <router-link to="/login" class="btn-cta-white">
          Criar Conta Gratuita
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { siteContent } from '../store/content'
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-vue-next'

const nodeColors = ['#FF2D55', '#8A2BE2', '#00CED1', '#D4E157']
const headerColors = ['linear-gradient(135deg, #FF2D55, #C72E70)', 'linear-gradient(135deg, #8A2BE2, #5B1FA0)']
const accentClasses = ['pink', 'purple']

const paths = computed(() => siteContent.paths)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-visible { opacity: 1; transform: translateY(0); }

/* ═══════════════════════════════════════════════
   HERO — MINIMAL ELEGANT
   ═══════════════════════════════════════════════ */
.paths-hero {
  background: #F9FAFB;
  padding: 160px 0 80px;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.paths-hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-accent {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 24px;
}

.hero-eyebrow {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 2.5px;
  color: var(--text-soft, #9CA3AF);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.paths-np {
  font-family: 'Inter', 'Poppins', sans-serif;
}

.paths-hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--color-graphite, #1A1C2E);
  margin-bottom: 16px;
}

.hero-hl {
  color: var(--color-purple, #8A2BE2);
}

.paths-hero p {
  font-size: 1.1rem;
  color: var(--text-muted, #6B7280);
  max-width: 560px;
  line-height: 1.65;
}

/* ═══════════════════════════════════════════════
   TRAILS CONTENT
   ═══════════════════════════════════════════════ */
.paths-content {
  padding: 100px 0;
  background: linear-gradient(180deg, rgba(138,43,226,0.03) 0%, rgba(255,45,85,0.05) 100%);
}

.paths-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.trail-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  display: grid;
  grid-template-columns: 420px 1fr;
  background: #fff;
  transition: all 0.4s ease;
}

.trail-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.trail-accent-pink { border: 2px solid var(--color-pink-mid, #FFD6DE); }
.trail-accent-purple { border: 2px solid var(--color-purple-mid, #D8C4F7); }

/* TRAIL HEADER (colored side) */
.trail-header {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.trail-badge-type {
  display: inline-block;
  align-self: flex-start;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
}

.trail-badge-type.gratuita { background: rgba(255,255,255,0.15); color: #fff; }
.trail-badge-type.premium { background: #D4E157; color: #111; }

.trail-badge-level {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
}

.trail-meta-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.trail-perks {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
}

.perk-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
}

.trail-title {
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 12px;
}

.trail-desc {
  font-size: 1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin-bottom: 32px;
}

.btn-trail-start {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: var(--color-graphite);
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.btn-trail-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,255,255,0.3);
}

/* TRAIL MODULES */
.trail-modules {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modules-title {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-soft, #9CA3AF);
  margin-bottom: 28px;
}

.modules-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.module-step {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  position: relative;
  transition: transform 0.3s ease;
}

.module-step:hover { transform: translateX(8px); }

.step-number {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.95rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.module-step:hover .step-number { transform: scale(1.15); }

.step-line {
  position: absolute;
  left: 21px;
  top: 58px;
  width: 2px;
  height: 20px;
  background: #e5e7eb;
}

.step-info { display: flex; flex-direction: column; }

.step-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-soft, #9CA3AF);
  margin-bottom: 2px;
}

.step-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-graphite);
}

/* ═══════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════ */
.paths-cta {
  background: linear-gradient(135deg, var(--color-petrol), var(--color-purple));
  padding: 80px 0;
  text-align: center;
}

.paths-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.paths-cta h2 {
  font-size: 2.4rem;
  color: #fff;
  margin-bottom: 16px;
}

.paths-cta p {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 36px;
}

.btn-cta-white {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: var(--color-graphite);
  padding: 16px 40px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-cta-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255,255,255,0.25);
}

.cta-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #fff;
}

.btn-text-primary {
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-purple);
  text-decoration: none;
  transition: color 0.2s ease;
}

.btn-text-primary:hover {
  color: var(--color-graphite);
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .trail-card { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .trail-header { padding: 36px; }
  .trail-modules { padding: 36px; }
  .trail-title { font-size: 1.8rem; }
  .paths-hero h1 { font-size: 2.4rem; }
}
</style>
