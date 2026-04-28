<script setup>
import { computed } from 'vue'
import { siteContent } from '../store/content'
import { ArrowRight, Zap } from 'lucide-vue-next'

const projects = computed(() => siteContent.projects || [])

const staticProjects = [
  { id: 1, title: 'Women in Leadership: Bridging the Gender Gap', desc: 'Empowering female voices in politics and business to create equitable decision-making spaces.', impact: '+500 Lideranças Formadas', tags: [{ label: 'Gender', cls: 'pink-bg' }, { label: 'Leadership', cls: 'blue-bg' }], image: '/images/projects/women-leadership.png' },
  { id: 2, title: 'The Future of Green Economics', desc: 'Analyzing the shift towards sustainable and circular models for long-term prosperity.', impact: '3 Leis Aprovadas', tags: [{ label: 'Economy', cls: 'yellow-bg' }, { label: 'Sustainability', cls: 'lime-bg' }], image: '/images/projects/green-economics.png' }
]

const displayProjects = computed(() => {
  return projects.value.length > 0 ? projects.value : staticProjects
})
</script>

<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="projects-hero__grid"></div>
      <div class="container-custom projects-hero__content">
        <div class="projects-kicker">
          <span class="projects-kicker__dot"></span>
          <span>Lab de Impacto</span>
        </div>
        <h1 class="projects-title">
          Nossos <span>Projetos</span>
        </h1>
        <p class="projects-subtitle">
          Mapeamento de impacto, incidência direta e desenvolvimento de tecnologias sociais nos territórios.
        </p>
      </div>
    </section>

    <section class="projects-section">
      <div class="container-custom">
        <div class="projects-grid-vibrant">
          <div v-for="p in displayProjects" :key="p.id" class="project-card-vibrant group" @click="$router.push(`/projetos/${p.id}`)">
            <div class="project-media-vibrant">
              <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" :alt="p.title" />
              <div class="project-overlay-vibrant">
                <span class="view-case-text">ABRIR PROJETO</span>
              </div>
            </div>
            <div class="project-content-vibrant">
              <div class="project-tags-row">
                <span v-for="(tag, ti) in p.tags" :key="ti" class="tag-vibrant" :class="tag.cls">{{ tag.label }}</span>
              </div>
              <h3 class="project-title-vibrant group-hover:text-red transition-colors">
                {{ p.title }}
              </h3>
              <p class="project-excerpt-vibrant flex-1">
                {{ p.desc || p.description || p.excerpt }}
              </p>
              <div class="project-impact-box-vibrant" v-if="p.impact">
                <Zap class="w-5 h-5" />
                <span><strong>IMPACTO:</strong> {{ p.impact }}</span>
              </div>
              <div class="project-footer-vibrant">
                <span class="learn-more-text">LER MAIS <ArrowRight :size="16" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 230, 90, 0.22), transparent 28%),
    radial-gradient(circle at top right, rgba(223, 32, 40, 0.09), transparent 22%),
    #f6f2ea;
  color: #1c1c1c;
}

.container-custom {
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2.5rem;
  position: relative;
  z-index: 2;
}

.projects-hero {
  position: relative;
  padding: 190px 0 72px;
  overflow: hidden;
}

.projects-hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(28, 28, 28, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(28, 28, 28, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.6;
}

.projects-hero__content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.projects-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.projects-kicker__dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #df2028;
  box-shadow: 0 0 0 6px rgba(223, 32, 40, 0.12);
}

.projects-title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(3rem, 8vw, 6.2rem);
  line-height: 0.9;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  max-width: 10ch;
}

.projects-title span {
  color: #df2028;
}

.projects-subtitle {
  font-family: "Georgia", serif;
  font-size: 1.25rem;
  line-height: 1.7;
  max-width: 720px;
  color: #4b5563;
}

.projects-section {
  padding: 10px 0 120px;
}

.projects-grid-vibrant {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.project-card-vibrant {
  background: #ffffff;
  border: 3px solid #1c1c1c;
  display: flex;
  flex-direction: column;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  cursor: pointer;
  border-radius: 1.75rem;
  overflow: hidden;
  box-shadow: 10px 10px 0 rgba(28, 28, 28, 1);
}

.project-card-vibrant:hover {
  transform: translate(-6px, -6px);
  box-shadow: 16px 16px 0 rgba(28, 28, 28, 1);
  border-color: #df2028;
}

.project-media-vibrant {
  height: 250px;
  position: relative;
  overflow: hidden;
  background: #1c1c1c;
}

.project-media-vibrant img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transition: transform 0.55s ease, opacity 0.55s ease;
}

.project-card-vibrant:hover .project-media-vibrant img {
  transform: scale(1.06);
  opacity: 1;
}

.project-overlay-vibrant {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(223, 32, 40, 0.15), rgba(28, 28, 28, 0.72));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.28s ease;
}

.project-card-vibrant:hover .project-overlay-vibrant {
  opacity: 1;
}

.view-case-text {
  color: #fff;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background: rgba(28, 28, 28, 0.55);
  padding: 12px 22px;
  backdrop-filter: blur(4px);
}

.project-content-vibrant {
  padding: 2rem 2rem 2.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.project-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.2rem;
}

.tag-vibrant {
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 2px solid #1c1c1c;
  border-radius: 9999px;
}

.pink-bg { background: #ff6bca; color: #fff; border-color: #ff6bca; }
.blue-bg { background: #3d78e0; color: #fff; border-color: #3d78e0; }
.yellow-bg { background: #ffe65a; color: #000; border-color: #ffe65a; }
.lime-bg { background: #a4cd39; color: #000; border-color: #a4cd39; }

.project-title-vibrant {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.7rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #1c1c1c;
}

.project-excerpt-vibrant {
  font-family: "Inter", sans-serif;
  font-size: 0.98rem;
  font-weight: 600;
  color: #5b6472;
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.project-impact-box-vibrant {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 230, 90, 0.28);
  padding: 12px 16px;
  border: 2px solid rgba(28, 28, 28, 0.12);
  border-radius: 14px;
  font-family: "Inter", sans-serif;
  font-size: 0.82rem;
  font-weight: 900;
  color: #1c1c1c;
  margin-bottom: 1.4rem;
}

.project-footer-vibrant {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #ece7dc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.learn-more-text {
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 0.76rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #df2028;
  letter-spacing: 0.12em;
}

@media (max-width: 1200px) {
  .projects-grid-vibrant { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .projects-hero { padding-top: 140px; }
  .projects-grid-vibrant { grid-template-columns: 1fr; }
  .projects-title { max-width: 100%; }
  .container-custom { padding: 0 1.25rem; }
}
</style>
