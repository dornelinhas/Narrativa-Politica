<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { siteContent, filterPublicProjects } from '../store/content'
import { ArrowRight, Zap } from 'lucide-vue-next'

const router = useRouter()
const projects = computed(() => filterPublicProjects(siteContent.projects || []))

const staticProjects = [
  { id: 1, title: 'Liderança Feminina Reestruturando as Bases', desc: 'Projeto focado em capacitar vozes femininas na política local.', impact: '+500 LIDERANÇAS', tags: [{ label: 'GÊNERO' }, { label: 'EDUCAÇÃO' }], image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Incidência Climática no Parlamento', desc: 'Análise e advocacy no congresso nacional focado em transição verde.', impact: '3 LEIS APROVADAS', tags: [{ label: 'CLIMA' }, { label: 'ADVOCACY' }], image: 'https://images.unsplash.com/photo-1611270402409-e85d8d3215be?auto=format&fit=crop&q=80&w=800' }
]

const displayProjects = computed(() => {
  return projects.value.length > 0 ? projects.value : staticProjects
})

const normalizeProjectTags = (tags) => {
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map(label => ({ label: label.trim() }))
  }
  return []
}

const getTagBg = (index) => {
  const bgs = ['bg-amarelo', 'bg-rosa', 'bg-verde', 'bg-azul']
  return bgs[index % bgs.length]
}

const openProject = (id) => {
  router.push(`/projetos/${id}`)
}
</script>

<template>
  <div class="projects-page bg-creme">
    <div class="container-max section-padding">
      
      <header class="page-hero-np text-center border-b-thick mb-16 pt-12 pb-16">
        <span class="tag-solid bg-preto text-white">● LAB DE IMPACTO</span>
        <h1 class="display-xl mt-4 text-preto uppercase">
          PORTFÓLIO DE <br/><span class="text-lilas">PROJETOS</span>
        </h1>
        <p class="body-lg mt-4 mx-auto max-w-md text-variant">
          Mapeamento de impacto, incidência direta e desenvolvimento de tecnologias sociais nos territórios.
        </p>
      </header>

      <section class="projects-section">
        <div class="projects-grid">
          <router-link v-for="(p, idx) in displayProjects" :key="p.id" :to="`/projetos/${p.id}`" class="card-editorial bg-white paper-shadow flex-col h-full p-0 fade-in-up group" :style="{ animationDelay: `${idx * 0.15}s` }">
            <div class="accent-bar-top" :class="getTagBg(idx) + '-bar'"></div>
            
            <div class="project-media halftone border-b-thick group-hover:filter-none">
              <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800'" :alt="p.title" class="w-full h-full object-cover" />
            </div>
            
            <div class="p-8 flex-col flex-grow">
              <div class="project-tags-row mb-4 flex flex-wrap gap-2">
                <span v-for="(tag, ti) in normalizeProjectTags(p.tags)" :key="ti" class="tag-solid text-preto" :class="getTagBg(ti)">
                  {{ tag.label }}
                </span>
              </div>
              
              <h3 class="headline-md mb-4 group-hover-color-vermelho">{{ p.title }}</h3>
              <p class="body-md text-variant mb-6 flex-grow">{{ p.desc || p.description || p.excerpt }}</p>
              
              <div class="project-impact pb-4 mb-4 border-b-thick" v-if="p.impact">
                <div class="flex align-center gap-2 label-bold">
                  <Zap class="text-vermelho" :size="16" />
                  <span>IMPACTO: <span class="text-vermelho">{{ p.impact }}</span></span>
                </div>
              </div>
              
              <div class="mt-auto pt-4 flex-between align-center label-bold hover-red">
                <span>LER CASE COMPLETO</span>
                <span class="material-symbols-outlined arrow">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* UTILS */
.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }
.border-b-thick { border-bottom: var(--border-thick); }

.mt-4 { margin-top: 16px; }
.mt-auto { margin-top: auto; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-16 { margin-bottom: 64px; }
.pt-4 { padding-top: 16px; }
.pt-12 { padding-top: 48px; }
.pb-4 { padding-bottom: 16px; }
.pb-16 { padding-bottom: 64px; }
.p-0 { padding: 0 !important; }
.p-8 { padding: 32px; }

.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-md { max-width: 500px; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.gap-2 { gap: 8px; }
.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-grow { flex-grow: 1; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-wrap { flex-wrap: wrap; }
.align-center { align-items: center; }
.text-center { text-align: center; }
.uppercase { text-transform: uppercase; }
.object-cover { object-fit: cover; }

/* PROJECTS HUB */
.projects-page { min-height: 100vh; position: relative; padding-bottom: 100px; }

/* GRID E CARDS */
.projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px; }

.project-media { height: 280px; overflow: hidden; position: relative; }
.project-media img { transition: transform 0.4s; }
.group:hover .project-media img { transform: scale(1.05); }

.group-hover-color-vermelho { transition: color 0.2s; }
.group:hover .group-hover-color-vermelho { color: var(--np-vermelho); }

.hover-red { color: var(--np-black); transition: color 0.2s; }
.group:hover .hover-red { color: var(--np-vermelho); }

.arrow { transition: transform 0.2s; }
.group:hover .arrow { transform: translateX(8px); }

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: 1fr; max-width: 600px; margin: 0 auto; }
}
</style>
