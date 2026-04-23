<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { 
  ArrowLeft, ArrowRight, Play, CheckCircle2, 
  Lock, Clock, Award, BookOpen, FileText
} from 'lucide-vue-next'

import { siteContent } from '../store/content'

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth()

const track = computed(() => {
  return siteContent.tracks?.find(t => t.id === route.params.id) || siteContent.tracks[0]
})

const startLesson = (id) => {
  router.push(`/aula/${id}`)
}
</script>

<template>
  <div v-if="isAuthenticated" class="modules-percurso-reset">
    <div class="fine-grain-overlay"></div>

    <!-- 2. CONTAINER CENTRALIZADO (pt-60 / pb-32) -->
    <div class="main-container-fixed pt-60 pb-32 px-6 md:px-12">
      
      <!-- 5. TÍTULOS ALINHADOS À ESQUERDA -->
      <header class="grade-header-left mb-16 fade-in-up">
         <router-link to="/area-do-aluno" class="back-link-brutal-sm mb-6">
            <ArrowLeft :size="14" /> VOLTAR AO PAINEL
         </router-link>
         <h1 class="percurso-title-archivo">PERCURSO DA TRILHA</h1>
         <p class="percurso-subtitle-serif mt-4">{{ track.title }}</p>
      </header>

      <!-- 3. GAPS AUMENTADOS (gap-12) -->
      <div class="modules-grid-reset gap-12">
         <div v-for="mod in track.modules" :key="mod.id" 
           class="mod-card-brutal shadow-brutal-fixed fade-in-up"
           :class="{ 'is-locked': mod.locked }"
           :style="{ '--mod-color': mod.color || track.color }"
         >
            <div class="mod-header-status" :style="{ backgroundColor: mod.locked ? '#e2e8f0' : (mod.completed ? '#10b981' : (mod.color || track.color)) }">
               <span class="mod-label-white">{{ mod.title }}</span>
               <Lock v-if="mod.locked" :size="16" class="text-slate-500" />
               <CheckCircle2 v-else-if="mod.completed" :size="18" class="text-white" />
            </div>

            <div class="mod-body-content">
               <h2 class="mod-name-archivo">{{ mod.name }}</h2>
               
               <div class="mod-meta-row mb-6">
                  <span><Clock :size="12" /> {{ mod.duration }}</span>
                  <span><BookOpen :size="12" /> {{ mod.lessonsCount }} Aulas</span>
               </div>

               <div class="mod-lessons-list mt-6">
                  <div v-for="less in mod.lessons" :key="less.id" class="less-item-row" @click="!mod.locked && startLesson(less.id)">
                     <div class="flex items-center gap-3">
                        <Play v-if="less.type === 'video'" :size="12" :class="less.active ? 'text-theme' : 'opacity-30'" />
                        <span class="less-title-font">{{ less.title }}</span>
                     </div>
                     <CheckCircle2 v-if="less.done" :size="14" class="text-green-500" />
                  </div>
               </div>

               <div class="mod-action-footer mt-auto pt-8">
                  <button v-if="mod.completed" class="btn-mod-outline" @click="startLesson(mod.lessons[0].id)">REVISAR</button>
                  <button v-else-if="!mod.locked" class="btn-mod-solid-black" @click="startLesson(mod.lessons[0].id)">{{ mod.active ? 'CONTINUAR' : 'INICIAR' }} <ArrowRight :size="18" /></button>
               </div>
            </div>
         </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modules-percurso-reset { background: #FDFCF0; min-height: 100vh; position: relative; overflow-x: hidden; z-index: 0; }
.fine-grain-overlay { position: fixed; inset: 0; z-index: -1; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.1; mix-blend-mode: multiply; }

.main-container-fixed { max-width: 1440px; margin: 0 auto; }
.pt-60 { padding-top: 240px; }
.pb-32 { padding-bottom: 128px; }

.grade-header-left { text-align: left; }
.percurso-title-archivo { font-family: "Archivo Black"; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 0.85; text-transform: uppercase; color: #1C1C1C; }
.percurso-subtitle-serif { font-family: "Georgia"; font-size: 1.6rem; color: #000; }

.back-link-brutal-sm { display: inline-flex; align-items: center; gap: 8px; font-weight: 900; font-size: 10px; color: #000; text-decoration: none; border: 2px solid #1C1C1C; padding: 10px 20px; border-radius: 9999px; }

.modules-grid-reset { display: grid; grid-template-columns: repeat(auto-fit, 440px); justify-content: flex-start; }

.mod-card-brutal { background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 3.5rem; overflow: visible; display: flex; flex-direction: column; height: 620px; transition: 0.3s; }
.mod-card-brutal:hover { transform: translate(-5px, -5px); box-shadow: 18px 18px 0px #1C1C1C; }
.mod-card-brutal.is-locked { opacity: 0.7; grayscale: 1; }

.mod-header-status { padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #1C1C1C; border-top-left-radius: 3.2rem; border-top-right-radius: 3.2rem; }
.mod-label-white { font-family: "Archivo Black"; font-size: 11px; color: #FFF; letter-spacing: 2px; }

.mod-body-content { padding: 40px; flex-grow: 1; display: flex; flex-direction: column; text-align: left; }
.mod-name-archivo { font-family: "Archivo Black"; font-size: 1.8rem; line-height: 1.1; color: #1C1C1C; margin-bottom: 10px; text-transform: uppercase; min-height: 60px; }

.mod-meta-row { display: flex; gap: 20px; font-weight: 800; font-size: 10px; color: #94a3b8; text-transform: uppercase; }

.less-item-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1.5px solid #f1f5f9; cursor: pointer; transition: 0.2s; }
.less-title-font { font-weight: 800; font-size: 0.9rem; color: #1C1C1C; }

.btn-mod-solid-black { width: 100%; padding: 18px; border-radius: 9999px; background: #1C1C1C; color: #FFF; border: none; font-family: "Inter"; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; }
.btn-mod-outline { width: 100%; padding: 18px; border-radius: 9999px; border: 3.5px solid #1C1C1C; background: transparent; color: #1C1C1C; font-family: "Inter"; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; }

.text-theme { color: var(--mod-color); }
.shadow-brutal-fixed { box-shadow: 15px 15px 0px #1C1C1C; }

.fade-in-up { opacity: 0; transform: translateY(20px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1200px) { .modules-grid-reset { grid-template-columns: 1fr 1fr; } }
@media (max-width: 900px) { .modules-grid-reset { grid-template-columns: 1fr; } .percurso-title-archivo { font-size: 2.8rem; } }
</style>