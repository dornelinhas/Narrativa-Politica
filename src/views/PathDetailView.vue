<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '../store/content'
import { useAuth } from '../store/auth'
import { supabase } from '../lib/supabase'
import { 
  ArrowLeft, ArrowRight, Clock, Award, Check, Play, Lock, 
  FileText, Download, Bookmark, Share2, MessageCircle,
  CheckCircle2, ChevronRight, PlayCircle
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = useAuth()

// 1. Localizar a trilha correta no store global
const trackId = route.params.id || 'advocacy'
const track = computed(() => {
  return siteContent.tracks.find(t => t.id === trackId) || siteContent.tracks[0]
})

// 2. Cálculo de Progresso Real
const totalLessons = computed(() => {
  if (!track.value?.modules) return 0
  return track.value.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0)
})

const completedLessonsCount = computed(() => {
  if (!track.value?.modules) return 0
  return track.value.modules.reduce((acc, mod) => {
    return acc + (mod.lessons?.filter(l => l.done).length || 0)
  }, 0)
})

const progressPercent = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((completedLessonsCount.value / totalLessons.value) * 100)
})

const isCourseComplete = computed(() => progressPercent.value === 100)

// 3. Marcar Aula como Concluída
const toggleLesson = (modId, lessonId) => {
  const module = track.value.modules.find(m => m.id === modId)
  if (!module) return
  const lesson = module.lessons.find(l => l.id === lessonId)
  if (lesson) {
    lesson.done = !lesson.done
    // Salvar no Supabase (Persistência)
    saveProgress()
  }
}

const saveProgress = async () => {
  try {
    // Salvamos a estrutura de tracks inteira para manter o progresso
    const { error } = await supabase.from('site_settings').upsert({
      key: 'tracks',
      value: siteContent.tracks
    })
    if (error) throw error
  } catch (err) {
    console.error('Erro ao salvar progresso:', err)
  }
}

const downloadCertificate = () => {
  alert('🏆 Parabéns! Gerando seu Certificado de Elite da Narrativa Política...')
  // Aqui poderia gerar um PDF real ou abrir um link
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div v-if="isAuthenticated" class="classroom-magazine-layout">
    <!-- 1. HEADER: BARRA DE PROGRESSO MAGENTA NO TOPO -->
    <div class="top-progress-container">
      <div class="progress-bar-magenta" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- TEXTURA FILM GRAIN -->
    <div class="film-grain-overlay"></div>

    <div class="content-wrapper pt-24 pb-44">
      <div class="container-editorial">
        
        <div class="classroom-grid">
          
          <!-- 2. SIDEBAR ESQUERDA: LISTA DE MÓDULOS -->
          <aside class="classroom-sidebar fade-in-up">
            <router-link to="/trilhas" class="back-to-map mb-10">
              <ArrowLeft :size="14" /> VOLTAR AO MAPA
            </router-link>

            <div class="sidebar-header-course mb-12">
              <span class="course-label mb-2">CURSO EM ANDAMENTO</span>
              <h2 class="sidebar-course-title">{{ track.title }}</h2>
              
              <!-- BOTÃO DE CERTIFICADO (SÓ APARECE EM 100%) -->
              <button 
                v-if="isCourseComplete" 
                class="btn-certificate-unlock mt-6"
                @click="downloadCertificate"
              >
                <Award :size="18" /> BAIXAR CERTIFICADO
              </button>
            </div>

            <nav class="curriculum-nav">
              <div v-for="mod in track.modules" :key="mod.id" class="curriculum-module mb-10">
                <h4 class="module-title-editorial mb-4">{{ mod.title }}</h4>
                <div class="lessons-stack">
                  <div v-for="lesson in mod.lessons" :key="lesson.id" 
                    class="lesson-row-item" 
                    :class="{ 'is-done': lesson.done, 'is-active': lesson.active, 'is-locked': lesson.locked }"
                    @click="!lesson.locked && toggleLesson(mod.id, lesson.id)"
                  >
                    <div class="flex items-center gap-3">
                      <div class="lesson-status-icon">
                        <CheckCircle2 v-if="lesson.done" :size="14" class="text-lime" />
                        <Lock v-else-if="lesson.locked" :size="14" class="opacity-30" />
                        <PlayCircle v-else :size="14" :class="lesson.active ? 'text-magenta' : 'opacity-40'" />
                      </div>
                      <span class="lesson-title-text">{{ lesson.title }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                       <span v-if="lesson.done" class="text-[10px] font-black text-lime">CONCLUÍDO</span>
                       <ChevronRight :size="12" class="opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          <!-- 3. PLAYER / CONTEÚDO CENTRALIZADO (MAX 720PX) -->
          <main class="classroom-main-content fade-in-up" style="animation-delay: 0.15s">
            <div class="central-content-720">
              
              <!-- ÁREA DE VÍDEO -->
              <div class="video-container-brutal mb-16 shadow-solid-lg">
                <div class="video-aspect-ratio">
                   <div class="play-overlay">
                      <button class="play-btn-brutal"><Play :size="48" fill="currentColor" /></button>
                   </div>
                   <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" alt="Aula" class="video-placeholder-img" />
                </div>
              </div>

              <div class="lesson-body-editorial">
                <div class="lesson-meta-top mb-8">
                  <span class="lesson-tag">MÓDULO 02 • AULA 2.1</span>
                  <h1 class="lesson-main-heading">MATRIZ DE INFLUÊNCIA E PODER</h1>
                </div>

                <div class="editorial-text-content">
                  <p class="lead-paragraph">Bem-vinda à área técnica. Nesta aula, vamos desconstruir as estruturas de poder tradicionais e aprender a identificar os pontos de ruptura para incidência política efetiva.</p>
                  
                  <p>Mapear atores não é apenas listar nomes; é entender as relações de dependência, os fluxos de capital e os interesses territoriais que sustentam cada decisão política.</p>

                  <div class="technical-callout mt-12 mb-12">
                    <h4 class="callout-title">DICA DE ESTRATEGISTA</h4>
                    <p>O poder nunca é absoluto. Ele é uma rede de concessões. Identifique quem o decisor ouve quando as luzes se apagam.</p>
                  </div>
                </div>

                <!-- DOWNLOADS -->
                <div class="lesson-resources mt-16 pt-12 border-t-brutal">
                  <h4 class="resources-heading mb-8">MATERIAIS DE APOIO</h4>
                  <div class="resources-grid-v2">
                    <a href="#" class="resource-card-magazine">
                      <div class="flex items-center gap-4">
                        <div class="file-box pink-bg"><FileText :size="20" /></div>
                        <div class="file-info">
                          <span class="file-name">Matriz_Influencia.pdf</span>
                          <span class="file-size">3.2 MB</span>
                        </div>
                      </div>
                      <Download :size="18" class="opacity-40" />
                    </a>
                  </div>
                </div>

                <div class="navigation-classroom mt-24">
                  <button class="nav-classroom-btn outline">AULA ANTERIOR</button>
                  <button class="nav-classroom-btn solid-black">PRÓXIMA AULA <ArrowRight :size="18" /></button>
                </div>
              </div>

            </div>
          </main>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-certificate-unlock {
  background: #FFE65A;
  color: #1C1C1C;
  border: 3px solid #1C1C1C;
  padding: 12px 20px;
  border-radius: 12px;
  font-family: "Archivo Black", sans-serif;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 4px 4px 0px #1C1C1C;
  width: 100%;
  justify-content: center;
  text-transform: uppercase;
}

.btn-certificate-unlock:hover {
  background: #FF6BCA;
  transform: translateY(-2px);
  box-shadow: 6px 6px 0px #1C1C1C;
}

.classroom-magazine-layout { background-color: #FFFFFF; min-height: 100vh; position: relative; overflow-x: hidden; }

/* 1. PROGRESS BAR MAGENTA NO TOPO */
.top-progress-container { position: fixed; top: 0; left: 0; width: 100%; height: 8px; background: #f1f5f9; z-index: 10000; }
.progress-bar-magenta { height: 100%; background-color: #FF6BCA; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

.film-grain-overlay {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.05; mix-blend-mode: multiply;
}

.content-wrapper { position: relative; z-index: 10; }
.container-editorial { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }

.classroom-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; align-items: start; }

/* 2. SIDEBAR */
.classroom-sidebar { position: sticky; top: 100px; }
.back-to-map { display: inline-flex; align-items: center; gap: 8px; font-weight: 900; font-size: 11px; color: #000; text-decoration: none; opacity: 0.4; }

.course-label { display: block; font-weight: 900; font-size: 9px; letter-spacing: 2px; color: #FF6BCA; }
.sidebar-course-title { font-family: "Archivo Black", sans-serif; font-size: 1.5rem; line-height: 1.1; color: #000; text-transform: uppercase; }

.module-title-editorial { font-family: "Georgia", serif; font-weight: 900; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }

.lesson-row-item { 
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 15px; border-radius: 8px; cursor: pointer; transition: 0.2s; 
  margin-bottom: 4px; border: 1px solid transparent;
}
.lesson-row-item:hover { background: #f8fafc; }
.lesson-row-item.is-active { background: #FFFFFF; border: 2px solid #000; box-shadow: 4px 4px 0px #000; }
.lesson-row-item.is-done { opacity: 0.6; }
.lesson-row-item.is-locked { opacity: 0.3; cursor: not-allowed; }

.lesson-title-text { font-size: 13px; font-weight: 700; color: #1C1C1C; }

/* 3. CONTEÚDO CENTRAL */
.central-content-720 { max-width: 720px; margin: 0 auto; }

.video-container-brutal { width: 100%; border: 4px solid #000; border-radius: 2rem; overflow: hidden; background: #000; }
.video-aspect-ratio { position: relative; width: 100%; aspect-ratio: 16/9; }
.video-placeholder-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
.play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 5; }
.play-btn-brutal { background: white; border: none; width: 80px; height: 80px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.play-btn-brutal:hover { transform: scale(1.1); background: #FF6BCA; color: white; }

.lesson-tag { display: block; font-weight: 900; font-size: 10px; color: #94a3b8; letter-spacing: 0.2em; margin-bottom: 15px; }
.lesson-main-heading { font-family: "Archivo Black", sans-serif; font-size: 3.5rem; line-height: 0.9; color: #000; text-transform: uppercase; letter-spacing: -0.04em; }

.editorial-text-content { font-family: "Georgia", serif; font-size: 1.35rem; line-height: 1.8; color: #1e293b; }
.lead-paragraph { font-size: 1.6rem; font-weight: 800; color: #000; line-height: 1.4; margin-bottom: 3rem; }

.technical-callout { background: #FFE65A; border: 3px solid #000; padding: 40px; border-radius: 2rem; box-shadow: 8px 8px 0px #000; }
.callout-title { font-family: "Archivo Black", sans-serif; font-size: 0.85rem; letter-spacing: 0.1em; margin-bottom: 10px; }

.border-t-brutal { border-top: 3px solid #000; }
.resources-heading { font-family: "Archivo Black", sans-serif; font-size: 0.8rem; letter-spacing: 0.2em; }

.resource-card-magazine { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 20px 30px; background: white; border: 3px solid #000; 
  border-radius: 1.5rem; text-decoration: none; transition: 0.2s;
}
.resource-card-magazine:hover { transform: translateY(-4px); box-shadow: 6px 6px 0px #000; }
.file-box { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.file-name { display: block; font-weight: 800; font-size: 14px; color: #000; }
.file-size { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; }

.navigation-classroom { display: flex; justify-content: space-between; gap: 30px; }
.nav-classroom-btn { 
  padding: 20px 40px; border-radius: 9999px; font-weight: 900; 
  font-size: 13px; text-transform: uppercase; cursor: pointer; transition: 0.3s;
}
.nav-classroom-btn.outline { background: transparent; border: 3px solid #000; color: #000; }
.nav-classroom-btn.outline:hover { background: #f1f5f9; }
.nav-classroom-btn.solid-black { background: #000; color: white; border: none; display: inline-flex; align-items: center; gap: 12px; }
.nav-classroom-btn.solid-black:hover { background: #FF6BCA; transform: scale(1.05); }

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 1s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .classroom-grid { grid-template-columns: 1fr; gap: 60px; }
  .classroom-sidebar { position: relative; top: 0; }
  .central-content-720 { max-width: 100%; }
}
</style>