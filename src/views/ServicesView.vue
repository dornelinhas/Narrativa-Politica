<script setup>
import { onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const services = siteContent.services

const getAccentColor = (accent) => {
  const map = {
    'pink': '#FF2D55',
    'purple': '#8A2BE2',
    'petrol': '#00CED1',
    'lime': '#D4E157'
  }
  return map[accent] || '#1A1C2E'
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="services-np">
    <!-- HERO -->
    <section class="svc-hero">
      <div class="container svc-hero-inner">
        <div class="hero-accent" style="background: var(--color-lime, #D4E157);"></div>
        <span class="hero-eyebrow">O QUE OFERECEMOS</span>
        <h1>Serviços de <span class="hero-highlight">Impacto Real</span></h1>
        <p class="hero-sub">Consultoria, mentoria e palestras para instituições e lideranças que querem comunicar e ampliar seu impacto social.</p>
      </div>
    </section>

    <!-- SERVICES GRID -->
    <section class="svc-grid-section">
      <div class="container">
        <div v-if="services.length" class="svc-grid">
          <div v-for="(service, idx) in services" :key="service.id"
               class="svc-card reveal-item"
               :class="['svc-accent-' + (service.accentColor || 'pink'), service.accentColor === 'lime' ? 'dark-text' : '']"
               :style="{ transitionDelay: (idx * 0.12) + 's' }">
            <div class="svc-card-top" :style="{ background: getAccentColor(service.accentColor) }">
              <span class="svc-type">{{ service.type }}</span>
            </div>
            <div class="svc-card-body">
              <h3>{{ service.title }}</h3>
              <p class="svc-desc">{{ service.description }}</p>

              <div class="svc-meta">
                <div class="meta-row" v-if="service.target">
                  <span class="meta-label">Público-alvo</span>
                  <span class="meta-value">{{ service.target }}</span>
                </div>
                <div class="meta-row" v-if="service.price">
                  <span class="meta-label">Investimento</span>
                  <span class="meta-value">{{ service.price }}</span>
                </div>
              </div>

              <div class="svc-actions">
                <router-link :to="service.ctaLink || '/contatos'" class="btn-svc-solid" :style="{ background: getAccentColor(service.accentColor), color: service.accentColor === 'lime' ? '#111' : '#fff' }">
                  {{ service.ctaText || 'Solicitar' }}
                  <ArrowRight :size="14" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BOTTOM -->
    <section class="svc-cta">
      <div class="container svc-cta-inner">
        <div class="cta-content">
          <span class="cta-badge">ESTRATÉGICO</span>
          <h2>Programas de Liderança Coletiva</h2>
          <p>Iniciativas estruturadas para grupos que desejam fomentar a equidade de gênero e o impacto social em escala.</p>
        </div>
        <router-link to="/contatos" class="btn-cta-gradient">
          Falar com Consultoria
          <ArrowRight :size="16" />
        </router-link>
      </div>
    </section>
  </div>
</template>

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
.svc-hero {
  background: #F9FAFB;
  padding: 160px 0 80px;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.svc-hero-inner {
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

.svc-hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--color-graphite, #1A1C2E);
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero-highlight {
  color: var(--color-petrol, #00CED1);
}

.hero-sub {
  font-size: 1.1rem;
  color: var(--text-muted, #6B7280);
  max-width: 560px;
  line-height: 1.65;
}

/* ═══════════════════════════════════════════════
   SERVICES GRID
   ═══════════════════════════════════════════════ */
.svc-grid-section {
  padding: 100px 0;
  background: #fafafa;
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
}

.svc-card {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.svc-accent-pink { border-color: var(--color-pink-mid, #FFD6DE); }
.svc-accent-purple { border-color: var(--color-purple-mid, #D8C4F7); }
.svc-accent-petrol { border-color: var(--color-petrol-mid, #A0EBEE); }

.svc-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.svc-accent-pink:hover { box-shadow: 0 16px 48px rgba(255,45,85,0.15); }
.svc-accent-purple:hover { box-shadow: 0 16px 48px rgba(138,43,226,0.15); }
.svc-accent-petrol:hover { box-shadow: 0 16px 48px rgba(0,206,209,0.15); }

.svc-card-top {
  padding: 20px 40px;
  display: flex;
  align-items: center;
}

.svc-type {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
}

.svc-card-body {
  padding: 36px 40px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.svc-card-body h3 {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-graphite);
  margin-bottom: 14px;
  line-height: 1.2;
}

.svc-desc {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 28px;
}

.svc-meta {
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.meta-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-soft, #9CA3AF);
  margin-bottom: 2px;
}

.meta-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-graphite);
}

.svc-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
}

.btn-svc-outline {
  flex: 1;
  min-width: 120px;
  padding: 14px 10px;
  border: 2px solid var(--color-graphite);
  border-radius: 14px;
  text-align: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--color-graphite);
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-svc-outline:hover {
  background: var(--color-graphite);
  color: #fff;
}

.btn-svc-solid {
  flex: 1;
  min-width: 120px;
  padding: 14px 10px;
  border-radius: 14px;
  text-align: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-svc-solid:hover {
  transform: translateY(-2px);
  filter: brightness(1.15);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* ═══════════════════════════════════════════════
   CTA BOTTOM
   ═══════════════════════════════════════════════ */
.svc-cta {
  background: linear-gradient(135deg, var(--color-pink), var(--color-purple));
  padding: 80px 0;
}

.svc-cta-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

.cta-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  color: #fff;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 2px;
}

.cta-content h2 {
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  margin: 16px 0 12px;
}

.cta-content p {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  max-width: 500px;
  line-height: 1.65;
}

.btn-cta-gradient {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: var(--color-graphite);
  padding: 18px 40px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-cta-gradient:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255,255,255,0.3);
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .svc-cta-inner { flex-direction: column; text-align: center; }
  .cta-content p { margin: 0 auto; }
  .svc-hero h1 { font-size: 2.8rem; }
}

@media (max-width: 640px) {
  .svc-grid { grid-template-columns: 1fr; }
  .svc-actions { flex-direction: column; }
  .svc-hero h1 { font-size: 2.2rem; }
}
</style>
