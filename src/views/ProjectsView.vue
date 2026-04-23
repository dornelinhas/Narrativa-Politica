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
  <div class="page-brutalist selection-custom">
    <div class="grid-overlay-dark"></div>
    
    <section class="page-hero-premium">
      <div class="container-custom">
        <span class="font-sans font-black text-xs uppercase tracking-widest text-red mb-4 block">Portfólio Estratégico</span>
        <h1 class="font-display text-6xl md-text-9xl uppercase tracking-tighter leading-none text-white mb-12">
          Nossos <br/><span class="text-neon-lime">Projetos</span>
        </h1>
        <p class="font-sans text-xl md-text-2xl font-bold text-white opacity-80 leading-tight max-w-4xl">
          Mapeamento de impacto, incidência direta e desenvolvimento de tecnologias sociais nos territórios.
        </p>
      </div>
    </section>

    <section class="projects-section pb-64">
      <div class="container-custom">
        <div class="projects-grid-vibrant">
          <div v-for="p in displayProjects" :key="p.id" class="project-card-vibrant group" @click="$router.push(`/projetos/${p.id}`)">
            <div class="project-media-vibrant">
              <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" :alt="p.title" />
              <div class="project-overlay-vibrant">
                <span class="view-case-text">VER CASE STUDY</span>
              </div>
            </div>
            <div class="project-content-vibrant">
              <div class="flex-wrap gap-2 mb-6">
                <span v-for="(tag, ti) in p.tags" :key="ti" class="tag-vibrant" :class="tag.cls">{{ tag.label }}</span>
              </div>
              <h3 class="project-title-vibrant group-hover:text-neon-lime transition-colors">
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
.page-brutalist { background: #0A0A0A; min-height: 100vh; position: relative; color: white; overflow: hidden; }
.grid-overlay-dark { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.container-custom { max-width: 90rem; margin: 0 auto; padding: 0 2.5rem; position: relative; z-index: 10; }

.page-hero-premium { padding-top: 200px; padding-bottom: 80px; }
.text-neon-lime { color: #AAFF00; text-shadow: 0 0 30px rgba(170, 255, 0, 0.3); }

.projects-grid-vibrant { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; }

.project-card-vibrant {
  background: #111; border: 4px solid #1C1C1C; display: flex; flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; border-radius: 4px; position: relative;
}
.project-card-vibrant:hover { transform: translate(-12px, -12px); box-shadow: 20px 20px 0 rgba(0,0,0,0.5); border-color: white; }

.project-media-vibrant { height: 280px; position: relative; border-bottom: 4px solid #1C1C1C; overflow: hidden; background: #000; }
.project-media-vibrant img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: all 0.6s; }
.project-card-vibrant:hover .project-media-vibrant img { transform: scale(1.1); opacity: 1; }

.project-overlay-vibrant { position: absolute; inset: 0; background: rgba(170, 255, 0, 0.9); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.3s; }
.project-card-vibrant:hover .project-overlay-vibrant { opacity: 1; }
.view-case-text { color: #000; font-family: "Inter", sans-serif; font-weight: 900; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 2px; border: 3px solid #000; padding: 12px 25px; }

.project-content-vibrant { padding: 3.5rem; flex: 1; display: flex; flex-direction: column; background: #111; }
.tag-vibrant { font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.65rem; text-transform: uppercase; padding: 6px 14px; border: 2px solid #1C1C1C; margin-right: 8px; }
.pink-bg { background: #FF6BCA; color: white; border-color: #FF6BCA; }
.blue-bg { background: #3D78E0; color: white; border-color: #3D78E0; }
.yellow-bg { background: #FFE65A; color: #000; border-color: #FFE65A; }
.lime-bg { background: #AAFF00; color: #000; border-color: #AAFF00; }

.project-title-vibrant { font-family: "Archivo Black", sans-serif; font-size: 2rem; text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1.1; letter-spacing: -0.5px; }
.project-excerpt-vibrant { font-family: "Inter", sans-serif; font-size: 1rem; font-weight: 600; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 2.5rem; }
.project-impact-box-vibrant { display: flex; align-items: center; gap: 12px; background: rgba(170, 255, 0, 0.05); padding: 15px 20px; border: 2px solid rgba(170, 255, 0, 0.2); font-family: "Inter", sans-serif; font-size: 0.85rem; font-weight: 800; color: #AAFF00; margin-bottom: 2rem; }

.project-footer-vibrant { margin-top: auto; padding-top: 25px; border-top: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
.learn-more-text { font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; display: flex; align-items: center; gap: 10px; color: #fff; letter-spacing: 1px; }

@media (max-width: 1200px) { .projects-grid-vibrant { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .projects-grid-vibrant { grid-template-columns: 1fr; } .page-hero-premium { padding-top: 140px; } }
</style>