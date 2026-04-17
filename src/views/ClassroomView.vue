<template>
  <div v-if="path" class="lms-premium-layout" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">

    <!-- SIDEBAR DE AULAS (HOTMART STYLE) -->
    <aside class="lms-sidebar">
      <button class="btn-toggle-sidebar" @click="isSidebarCollapsed = !isSidebarCollapsed" :title="isSidebarCollapsed ? 'Abrir Menu' : 'Recolher Menu'">
        <ChevronLeft v-if="!isSidebarCollapsed" :size="20" />
        <ChevronRight v-else :size="20" />
      </button>
      <div class="lms-sidebar-header">
        <router-link to="/area-do-aluno" class="btn-back-portal">
          <ChevronLeft :size="16" /> Painel do Aluno
        </router-link>
        <h2>{{ path.title }}</h2>
        <div class="lms-progress">
          <div class="progress-info">
            <span>Seu progresso</span>
            <strong>{{ Math.round(progress) }}%</strong>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="lms-module-list">
        <div v-for="(mod, mIdx) in path.modules" :key="mod.id" class="lms-module-group">
          <div class="module-group-header">
            <span class="mod-num">Módulo {{ mIdx + 1 }}</span>
            <h4>{{ mod.title }}</h4>
          </div>
          
          <div v-for="(lesson, lIdx) in mod.lessons" :key="lesson.id" 
               class="lms-lesson-item"
               :class="{ active: activeModuleIndex === mIdx && activeLessonIndex === lIdx, completed: completedLessons.includes(lesson.id) }"
               @click="activeModuleIndex = mIdx; activeLessonIndex = lIdx">
            <div class="lesson-status-icon">
              <CheckCircle v-if="completedLessons.includes(lesson.id)" :size="16" class="icon-done" />
              <PlayCircle v-else :size="16" class="icon-pending" />
            </div>
            <div class="lesson-info">
              <span class="lesson-title">{{ lesson.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- ÁREA DE CONTEÚDO CENTRAL -->
    <main class="lms-main-content">
      <div v-if="activeLesson" class="lms-content-wrapper">

        <!-- PLAYER -->
        <div class="lms-player-container">
          <div v-if="activeLesson.videoUrl" class="video-aspect-ratio">
            <iframe :src="activeLesson.videoUrl" frameborder="0" allowfullscreen></iframe>
          </div>
          <div v-else class="video-placeholder">
            <div class="placeholder-msg">
              <FileText :size="48" />
              <p>Esta aula é composta exclusivamente por material de leitura e apoio.</p>
            </div>
          </div>
        </div>

        <!-- TEXTO E APOIO -->
        <div class="lms-text-area">
          <div class="lms-lesson-header">
            <div class="lesson-title-meta">
              <span class="mod-indicator-tiny">Módulo {{ activeModuleIndex + 1 }} • Aula {{ activeLessonIndex + 1 }}</span>
              <h1>{{ activeLesson.title }}</h1>
            </div>
            <button @click="toggleComplete" class="btn-complete-lesson" :class="{ is_done: completedLessons.includes(activeLesson.id) }">
              {{ completedLessons.includes(activeLesson.id) ? 'Concluída' : 'Marcar como Concluída' }}
            </button>
          </div>

          <div class="lms-rich-content" v-html="activeLesson.content || '<p>Utilize os materiais abaixo para complementar seus estudos.</p>'"></div>

          <!-- BOTÃO PRÓXIMA AULA -->
          <div class="lms-navigation-bottom">
            <button v-if="hasNextLesson" @click="goNextLesson" class="btn-next-lesson">
              <span>Próxima Aula</span>
              <ArrowRight :size="20" />
            </button>
            <div v-else class="congrats-msg">
              <Award :size="24" />
              <span>Você concluiu esta trilha! Parabéns!</span>
            </div>
          </div>

          <!-- MATERIAIS PARA DOWNLOAD -->
          <div class="lms-attachments" v-if="activeLesson.attachments?.some(a => a.url)">
            <h3>Materiais de Apoio</h3>
            <div class="attachment-grid">
              <template v-for="(att, aIdx) in activeLesson.attachments" :key="aIdx">
                <a v-if="att.url" :href="att.url" target="_blank" class="attachment-card">
                  <Download :size="20" />
                  <div class="att-info">
                    <strong>{{ att.label || 'Material Auxiliar' }}</strong>
                    <span>Download PDF/Link</span>
                  </div>
                </a>
              </template>
            </div>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '../store/content'
import { useAuth } from '../store/auth'
import { ChevronLeft, ChevronRight, CheckCircle, PlayCircle, FileText, Download, ArrowRight, Award } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = useAuth()

const pathId = parseInt(route.params.id)
const path = computed(() => siteContent.paths.find(p => p.id === pathId))

if (path.value && path.value.isPremium && (!isAuthenticated.value || !user.value?.isPremium)) {
  router.push(`/checkout/${path.value.id}`)
}

const isSidebarCollapsed = ref(false)
const activeModuleIndex = ref(0)
const activeLessonIndex = ref(0)
const activeLesson = computed(() => path.value?.modules?.[activeModuleIndex.value]?.lessons?.[activeLessonIndex.value])

const hasNextLesson = computed(() => {
  const currentMod = path.value?.modules?.[activeModuleIndex.value]
  if (!currentMod) return false
  
  // Tem próxima aula no mesmo módulo?
  if (activeLessonIndex.value < currentMod.lessons.length - 1) return true
  
  // Tem próximo módulo com pelo menos uma aula?
  if (activeModuleIndex.value < (path.value?.modules?.length || 0) - 1) return true
  
  return false
})

const goNextLesson = () => {
  // Marcar a atual como concluída antes de pular
  if (!completedLessons.value.includes(activeLesson.value.id)) {
    toggleComplete()
  }

  const currentMod = path.value?.modules?.[activeModuleIndex.value]
  
  if (activeLessonIndex.value < currentMod.lessons.length - 1) {
    activeLessonIndex.value++
  } else {
    activeModuleIndex.value++
    activeLessonIndex.value = 0
  }
  
  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const completedLessons = ref(JSON.parse(localStorage.getItem(`np_progress_lessons_${pathId}`) || '[]'))

const progress = computed(() => {
  if (!path.value?.modules?.length) return 0
  const totalLessons = path.value.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0)
  if (totalLessons === 0) return 0
  return (completedLessons.value.length / totalLessons) * 100
})

const toggleComplete = () => {
  if (!activeLesson.value) return
  const lessonId = activeLesson.value.id
  if (completedLessons.value.includes(lessonId)) {
    completedLessons.value = completedLessons.value.filter(id => id !== lessonId)
  } else {
    completedLessons.value.push(lessonId)
  }
  localStorage.setItem(`np_progress_lessons_${pathId}`, JSON.stringify(completedLessons.value))
}
</script>

<style scoped>
.lms-premium-layout {
  display: flex;
  height: 100vh;
  background: #FFFFFF;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* SIDEBAR COLLAPSE */
.sidebar-collapsed .lms-sidebar { width: 0; padding: 0; overflow: hidden; opacity: 0; pointer-events: none; }
.btn-toggle-sidebar {
  position: absolute;
  top: 50%;
  right: -20px;
  width: 40px;
  height: 40px;
  background: #FF2D55;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-50%);
}

.sidebar-collapsed .btn-toggle-sidebar { right: auto; left: 20px; position: fixed; }

/* SIDEBAR */
.lms-sidebar {
  width: 380px;
  background: #111827;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 10px 0 40px rgba(0,0,0,0.1);
  z-index: 10;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lms-sidebar-header {
  padding: 40px 24px;
  background: #1F2937;
}

.btn-back-portal {
  display: flex; align-items: center; gap: 8px;
  color: #9CA3AF; font-size: 0.85rem; font-weight: 700;
  text-decoration: none; margin-bottom: 24px;
  transition: color 0.2s;
}

.btn-back-portal:hover { color: #fff; }

.lms-sidebar-header h2 { font-size: 1.4rem; font-weight: 900; color: #fff; margin-bottom: 24px; letter-spacing: -0.5px; }

.lms-progress { }
.progress-info { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 10px; color: #9CA3AF; font-weight: 700; text-transform: uppercase; }
.progress-bar-bg { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: #FF2D55; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

.lms-module-list { flex: 1; overflow-y: auto; padding: 20px; }

.lms-module-group { margin-bottom: 24px; }
.module-group-header { margin-bottom: 12px; padding: 0 4px; }
.mod-num { font-size: 0.7rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; }
.module-group-header h4 { font-size: 1rem; font-weight: 900; color: #F9FAFB; margin-top: 2px; }

.lms-lesson-item {
  display: flex; gap: 12px; padding: 14px 16px; border-radius: 10px;
  cursor: pointer; transition: all 0.2s; margin-bottom: 4px;
  border: 1px solid transparent;
}

.lms-lesson-item:hover { background: rgba(255,255,255,0.05); }
.lms-lesson-item.active { background: rgba(255,45,85,0.15); border-color: rgba(255,45,85,0.3); }

.lesson-status-icon { margin-top: 2px; }
.icon-done { color: #10B981; }
.icon-pending { color: #4B5563; }
.lms-lesson-item.active .lesson-title { color: #FF2D55; font-weight: 800; }

.lesson-info { display: flex; flex-direction: column; }
.lesson-title { font-size: 0.9rem; font-weight: 600; color: #D1D5DB; }

/* MAIN CONTENT */
.lms-main-content { flex: 1; overflow-y: auto; background: #F9FAFB; }

.lms-player-container {
  background: #000;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.video-aspect-ratio { position: relative; padding-top: 56.25%; }
.video-aspect-ratio iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

.video-placeholder {
  height: 480px; background: #111827; display: flex; align-items: center; justify-content: center;
  color: #9CA3AF; text-align: center;
}

.lms-text-area { max-width: 1000px; margin: 0 auto; padding: 80px 60px; }

.lms-lesson-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 56px; gap: 32px;
}

.mod-indicator-tiny { font-size: 0.8rem; font-weight: 800; color: #FF2D55; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: block; }
.lms-lesson-header h1 { font-size: 2.8rem; font-weight: 900; color: #111827; letter-spacing: -1.5px; line-height: 1.1; }

.btn-complete-lesson {
  background: #FFF; color: #111827; border: 2px solid #E5E7EB; padding: 14px 28px; border-radius: 12px;
  font-weight: 800; cursor: pointer; white-space: nowrap; transition: all 0.2s;
}

.btn-complete-lesson:hover { border-color: #111827; }
.btn-complete-lesson.is_done { background: #10B981; color: #fff; border-color: #10B981; }

.lms-rich-content { 
  font-family: "Inter", sans-serif;
  font-size: 1.2rem; line-height: 1.8; color: #374151; margin-bottom: 80px; 
}

/* NAVIGATION BOTTOM */
.lms-navigation-bottom {
  margin-bottom: 80px;
  padding: 40px;
  background: #F8FAFC;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  border: 2px solid #E2E8F0;
}

.btn-next-lesson {
  background: #111827;
  color: #fff;
  border: none;
  padding: 20px 48px;
  border-radius: 16px;
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
}

.btn-next-lesson:hover {
  background: #FF2D55;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(255,45,85,0.3);
}

.congrats-msg {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #10B981;
  font-weight: 900;
  font-size: 1.3rem;
}

/* ATTACHMENTS */
.lms-attachments {
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
}
.lms-attachments h3 { font-size: 1.3rem; font-weight: 900; margin-bottom: 24px; color: #111827; }
.attachment-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.attachment-card {
  display: flex; align-items: center; gap: 16px; padding: 20px;
  background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px;
  text-decoration: none; color: #111827; transition: all 0.2s;
}
.attachment-card:hover { border-color: #FF2D55; background: #FFF; transform: translateY(-2px); }
.att-info strong { display: block; font-size: 0.95rem; font-weight: 800; }
.att-info span { font-size: 0.8rem; color: #6B7280; font-weight: 600; }

@media (max-width: 1024px) {
  .lms-premium-layout { flex-direction: column; }
  .lms-sidebar { width: 100%; height: auto; max-height: 40vh; }
  .lms-main-content { height: 60vh; }
}
</style>

