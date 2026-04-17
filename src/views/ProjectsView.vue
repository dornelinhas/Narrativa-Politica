<script setup>
import { onMounted } from 'vue'
import { siteContent } from '../store/content'
import { TrendingUp, ArrowRight } from 'lucide-vue-next'

const projects = siteContent.projects

const getImpactClass = (color) => {
  return 'impact-' + (color || 'purple')
}

const getBtnClass = (color) => {
  return 'btn-' + (color || 'purple')
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
  <div class="projects-np">
    <!-- HERO -->
    <section class="proj-hero">
      <div class="container proj-hero-inner">
        <div class="hero-accent" style="background: var(--color-lime, #D4E157);"></div>
        <span class="hero-eyebrow">LAB DE IMPACTO</span>
        <h1>Projetos de <span class="hero-hl">Impacto Social</span></h1>
        <p>Iniciativas estratégicas onde transformamos dados em mudança social real e tangível para lideranças femininas.</p>
      </div>
    </section>

    <!-- PROJECTS GRID -->
    <section class="proj-grid-section">
      <div class="container">
        <div v-if="projects.length" class="proj-grid">
          <div v-for="(project, idx) in projects" :key="project.id"
               class="proj-card reveal-item"
               :style="{ transitionDelay: (idx * 0.15) + 's' }">
            <div class="proj-cover">
              <img :src="project.image" :alt="project.title" loading="lazy" />
              <div class="proj-cover-overlay"></div>
            </div>
            <div class="proj-body">
              <div class="proj-meta-tags">
                <span class="tag-method">Case de Transformação</span>
                <span class="tag-focus" v-if="project.category">{{ project.category }}</span>
              </div>
              <h3>{{ project.title }}</h3>
              
              <div class="case-study-split">
                <div class="case-col">
                  <strong>O Desafio:</strong>
                  <p>{{ project.description }}</p>
                </div>
                <div class="case-col" v-if="project.solution">
                  <strong>A Solução:</strong>
                  <p>{{ project.solution }}</p>
                </div>
              </div>

              <div class="proj-impact" :class="getImpactClass(project.accentColor)">
                <div class="impact-header">
                  <TrendingUp :size="18" />
                  <span>IMPACTO REALIZADO</span>
                </div>
                <p>{{ project.impact }}</p>
              </div>

              <router-link :to="`/projetos/${project.id}`" class="btn-proj" :class="getBtnClass(project.accentColor)">
                Ver Estudo de Caso Completo
                <ArrowRight :size="16" />
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <h3>Nenhum projeto cadastrado no momento.</h3>
        </div>
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
.proj-hero {
  background: #F9FAFB;
  padding: 160px 0 80px;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.proj-hero-inner {
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

.proj-hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--color-graphite, #1A1C2E);
  margin-bottom: 16px;
}

.hero-hl {
  color: var(--color-lime, #D4E157);
}

.proj-hero p {
  font-size: 1.1rem;
  color: var(--text-muted, #6B7280);
  max-width: 600px;
  line-height: 1.65;
}

/* ═══════════════════════════════════════════════
   PROJECTS GRID
   ═══════════════════════════════════════════════ */
.proj-grid-section {
  padding: 100px 0;
  background: #fafafa;
}

.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  gap: 36px;
}

.proj-card {
  background: #fff;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 2px solid rgba(0,0,0,0.04);
  box-shadow: var(--shadow-sm);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

.proj-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.proj-cover {
  height: 280px;
  overflow: hidden;
  position: relative;
}

.proj-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.proj-card:hover .proj-cover img { transform: scale(1.05); }

.proj-cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(26,28,46,0.3));
  pointer-events: none;
}

.proj-body {
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.proj-meta-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.tag-method {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-pink);
  background: var(--color-pink-soft);
  padding: 4px 10px;
  border-radius: 4px;
}

.tag-focus {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-graphite);
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 4px;
}

.proj-body h3 {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-graphite);
  margin-bottom: 24px;
  line-height: 1.15;
}

.case-study-split {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.03);
}

.case-col strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-graphite);
  margin-bottom: 4px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.case-col p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.proj-impact {
  padding: 24px;
  border-radius: var(--radius);
  margin-bottom: 28px;
  border-left: 5px solid;
}

.impact-pink {
  background: var(--color-pink-soft, #FFF0F3);
  border-left-color: var(--color-pink);
}

.impact-purple {
  background: var(--color-purple-soft, #F3EAFF);
  border-left-color: var(--color-purple);
}

.impact-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.impact-pink .impact-header { color: var(--color-pink); }
.impact-purple .impact-header { color: var(--color-purple); }

.impact-header span {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 2px;
}

.proj-impact p {
  font-weight: 800;
  color: var(--color-graphite);
  font-size: 1.1rem;
  line-height: 1.35;
}

.btn-proj {
  width: 100%;
  padding: 16px 28px;
  border-radius: 14px;
  text-align: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-top: auto;
}

.btn-pink {
  background: var(--color-pink);
  box-shadow: 0 6px 20px rgba(255,45,85,0.25);
}

.btn-pink:hover {
  background: #E02048;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255,45,85,0.4);
}

.btn-purple {
  background: var(--color-purple);
  box-shadow: 0 6px 20px rgba(138,43,226,0.25);
}

.btn-purple:hover {
  background: #7522C9;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(138,43,226,0.4);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-muted);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .proj-grid { grid-template-columns: 1fr; }
  .proj-body { padding: 32px; }
  .proj-hero h1 { font-size: 2.6rem; }
  .proj-cover { height: 220px; }
}
</style>
