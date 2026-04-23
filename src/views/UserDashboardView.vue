<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { Clock, Award, ArrowRight, Zap, History, Library, Download } from 'lucide-vue-next'

const router = useRouter()
const { user } = useAuth()

import { siteContent } from '../store/content'

const activeTracks = computed(() => {
  if (!siteContent.tracks) return []
  return siteContent.tracks.map((track, i) => {
    const isFirst = i === 0;
    return {
      id: track.id,
      name: `TRILHA DE ${track.name}`,
      tag: track.id.toUpperCase(),
      progress: isFirst ? 60 : 25,
      lessonsDone: isFirst ? 6 : 2,
      totalLessons: track.modules?.reduce((acc, mod) => acc + (mod.lessonsCount || 0), 0) || (isFirst ? 10 : 8),
      color: track.color || '#FF6BCA',
      image: track.image || (isFirst ? 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800')
    }
  }).slice(0, 2)
})

const recentResources = [
  { title: 'Guia de Incidência 2024.pdf', size: '2.4MB' },
  { title: 'Template de Mapeamento.xlsx', size: '1.1MB' }
]

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <div class="student-dashboard-reset">
    <div class="paper-noise-overlay"></div>
    
    <!-- 2. CONTAINER CENTRALIZADO E COM MARGENS (pt-60 / pb-32) -->
    <div class="main-container-fixed pt-60 pb-32 px-6 md:px-12">
      
      <div class="dashboard-grid-reset">
        
        <!-- COLUNA PRINCIPAL (75%) -->
        <main class="content-area">
          
          <!-- 5. TÍTULOS ALINHADOS À ESQUERDA -->
          <header class="welcome-header-left mb-16 fade-in-up">
            <span class="eyebrow-tech-black mb-2">PORTAL ESTRATÉGICO</span>
            <h1 class="title-black-monumental">OLÁ, ANA SILVA.</h1>
            <p class="subtitle-serif-editorial mt-4">Sua jornada de impacto continua aqui.</p>
          </header>

          <section class="tracks-area">
            <h2 class="section-label-brutal mb-12">TRILHAS EM ANDAMENTO</h2>
            
            <!-- 3. GAPS AUMENTADOS (gap-12) -->
            <div class="tracks-grid-standard gap-12">
              <div v-for="track in activeTracks" :key="track.id" class="track-object shadow-brutal-fixed fade-in-up">
                <div class="track-cover-duotone" :style="{ '--track-color': track.color }">
                  <img :src="track.image" :alt="track.name" />
                  <div class="tint-overlay"></div>
                  <div class="track-badge-pill">{{ track.tag }}</div>
                </div>

                <div class="track-body-editorial">
                  <h3 class="track-title-archivo-sm">{{ track.name }}</h3>
                  
                  <div class="progress-info-row mt-8">
                    <div class="circle-progress-mini">
                       <svg viewBox="0 0 36 36" class="circle-svg">
                          <path class="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path class="fill" :stroke="track.color" :stroke-dasharray="`${track.progress}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       </svg>
                       <span class="pct">{{ track.progress }}%</span>
                    </div>
                    <span class="lesson-meta-black">{{ track.lessonsDone }} de {{ track.totalLessons }} concluídas</span>
                  </div>

                  <div class="footer-action-right mt-auto pt-10 flex justify-end">
                    <button @click="router.push(`/trilhas/${track.id}`)" class="btn-pill-action-black">
                      CONTINUAR JORNADA <ArrowRight :size="18" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- SIDEBAR (25%) -->
        <aside class="sidebar-area-reset">
          <div class="util-box-vibrant mb-12">
             <h3 class="section-label-brutal mb-8">HUB DE ACESSO</h3>
             <div class="shortcuts-stack gap-4 flex flex-col">
                <a href="#" class="shortcut-item-brutal bg-brand-magenta">
                   <Award :size="20" /> <span>Meus Certificados</span>
                </a>
                <a href="#" class="shortcut-item-brutal bg-brand-lima">
                   <History :size="20" /> <span>Meu Histórico</span>
                </a>
                <a href="#" class="shortcut-item-brutal bg-brand-blue">
                   <Library :size="20" /> <span>Biblioteca Técnica</span>
                </a>
             </div>
          </div>

          <div class="util-card-yellow-brutal shadow-brutal-fixed">
             <h3 class="section-label-brutal mb-8">DOWNLOADS RÁPIDOS</h3>
             <div class="downloads-stack-internal">
                <div v-for="res in recentResources" :key="res.title" class="download-row">
                   <div class="file-icon-bg"><Download :size="14" /></div>
                   <div class="file-info-text">
                      <span class="f-bold">{{ res.title }}</span>
                      <span class="f-mini">{{ res.size }}</span>
                   </div>
                </div>
             </div>
             <button class="btn-black-outline-full mt-10">VER TODOS OS ARQUIVOS</button>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<style scoped>
.student-dashboard-reset { background: #FDFCF0; min-height: 100vh; position: relative; overflow-x: hidden; z-index: 0; }
.paper-noise-overlay { position: fixed; inset: 0; z-index: -1; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.1; mix-blend-mode: multiply; }

.main-container-fixed { max-width: 1440px; margin: 0 auto; }
.pt-60 { padding-top: 240px; } /* 1. FIM DO ATROPELO */
.pb-32 { padding-bottom: 128px; } /* 2. FIM DO ESMAGAMENTO */

.dashboard-grid-reset { display: grid; grid-template-columns: 1fr 340px; gap: 80px; align-items: start; }

/* TIPOGRAFIA ESQUERDA */
.welcome-header-left { text-align: left; }
.eyebrow-tech-black { font-family: "Inter", sans-serif; font-weight: 900; font-size: 11px; letter-spacing: 3px; color: #000; display: block; }
.title-black-monumental { font-family: "Archivo Black", sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; color: #1C1C1C; text-transform: uppercase; }
.subtitle-serif-editorial { font-family: "Georgia", serif; font-size: 1.6rem; color: #000; }

.section-label-brutal { font-family: "Archivo Black"; font-size: 0.85rem; letter-spacing: 2px; color: #1C1C1C; border-left: 8px solid #1C1C1C; padding-left: 20px; }

/* GRIDS E CARDS */
.tracks-grid-standard { display: grid; grid-template-columns: 1fr 1fr; }
.track-object { background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 3rem; overflow: visible; display: flex; flex-direction: column; height: 580px; transition: 0.3s; }
.track-object:hover { transform: translate(-5px, -5px); box-shadow: 20px 20px 0px #1C1C1C; }

.track-cover-duotone { height: 220px; position: relative; overflow: hidden; border-bottom: 4px solid #1C1C1C; border-top-left-radius: 2.8rem; border-top-right-radius: 2.8rem; }
.track-cover-duotone img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); }
.tint-overlay { position: absolute; inset: 0; background: var(--track-color); mix-blend-mode: multiply; opacity: 0.5; }
.track-badge-pill { position: absolute; top: 20px; left: 20px; background: #1C1C1C; color: #FFF; padding: 8px 16px; font-weight: 900; font-size: 10px; border-radius: 8px; text-transform: uppercase; }

.track-body-editorial { padding: 40px; flex-grow: 1; display: flex; flex-direction: column; text-align: left; }
.track-title-archivo-sm { font-family: "Archivo Black"; font-size: 1.6rem; line-height: 1.1; color: #000; text-transform: uppercase; min-height: 60px; }

.progress-info-row { display: flex; align-items: center; gap: 20px; }
.circle-progress-mini { width: 60px; height: 60px; position: relative; display: flex; align-items: center; justify-content: center; }
.circle-svg .bg { fill: none; stroke: #F1F5F9; stroke-width: 4; }
.circle-svg .fill { fill: none; stroke-width: 4; stroke-linecap: round; }
.pct { position: absolute; font-family: "Archivo Black"; font-size: 12px; color: #000; }
.lesson-meta-black { font-weight: 900; font-size: 12px; color: #000; opacity: 0.8; }

.btn-pill-action-black { background: #1C1C1C; color: #FFF; padding: 18px 40px; border-radius: 9999px; font-family: "Inter"; font-weight: 900; font-size: 0.9rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 12px; border: none; cursor: pointer; transition: 0.3s; }
.btn-pill-action-black:hover { transform: scale(1.05); }

/* SIDEBAR */
.shortcut-item-brutal { display: flex; align-items: center; gap: 15px; padding: 22px; border-radius: 1.8rem; border: 3.5px solid #1C1C1C; text-decoration: none; color: #FFF; font-weight: 900; font-size: 11px; text-transform: uppercase; box-shadow: 6px 6px 0px #1C1C1C; }
.bg-brand-magenta { background: #FF6BCA; }
.bg-brand-lima { background: #A4CD39; color: #000 !important; }
.bg-brand-blue { background: #3D78E0; }

.util-card-yellow-brutal { background: #FFE65A; border: 4px solid #1C1C1C; border-radius: 2.5rem; padding: 40px; }
.download-row { display: flex; align-items: center; gap: 15px; padding: 15px 0; border-bottom: 2px solid rgba(0,0,0,0.1); }
.file-icon-bg { width: 36px; height: 36px; background: #FFF; border: 2px solid #1C1C1C; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.f-bold { display: block; font-weight: 900; font-size: 12px; color: #000; }
.f-mini { font-size: 10px; font-weight: 700; opacity: 0.5; }

.btn-black-outline-full { width: 100%; padding: 15px; border-radius: 9999px; border: 3px solid #1C1C1C; background: transparent; font-weight: 900; font-size: 11px; text-transform: uppercase; }

.shadow-brutal-fixed { box-shadow: 15px 15px 0px #1C1C1C; }
.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1200px) { .dashboard-grid-reset { grid-template-columns: 1fr; } .tracks-grid-standard { grid-template-columns: 1fr; } }
</style>