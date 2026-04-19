<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '../store/content'
import { useAuth } from '../store/auth'
import { ChevronLeft, ChevronRight, CheckCircle, PlayCircle, FileText, Download, ArrowRight, Award, Layers } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = useAuth()

const pathId = parseInt(route.params.id)
const path = computed(() => siteContent.paths.find(p => p.id === pathId))

if (path.value && path.value.isPremium && (!isAuthenticated.value || !user.value?.isPremium)) {
  router.push(`/checkout/${path.value.id}`)
}

const activeModuleIndex = ref(0)
const activeLessonIndex = ref(0)
const activeLesson = computed(() => path.value?.modules?.[activeModuleIndex.value]?.lessons?.[activeLessonIndex.value])
const activeTab = ref('SUMMARY')

const completedLessons = ref(JSON.parse(localStorage.getItem(`np_progress_lessons_${pathId}`) || '[]'))

const getModuleProgress = (mod) => {
  if (!mod.lessons?.length) return 0
  const completed = mod.lessons.filter(l => completedLessons.value.includes(l.id)).length
  return Math.round((completed / mod.lessons.length) * 100)
}

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

<template>
  <div v-if="path" class="classroom-interface-page">
    <div class="grid-overlay-light"></div>

    <div class="classroom-container">
      <!-- MAIN AREA -->
      <main class="classroom-main">
        <h1 class="interface-title">COURSE LEARNING PATH INTERFACE</h1>

        <div class="video-player-box">
          <div class="player-header">
             <h2 class="current-lesson-title">{{ activeLesson?.title?.toUpperCase() || 'INTRODUÇÃO À ECONOMIA POLÍTICA GLOBAL' }}</h2>
          </div>
          <div class="player-body">
             <div v-if="activeLesson?.videoUrl" class="video-ratio">
                <iframe :src="activeLesson.videoUrl" frameborder="0" allowfullscreen></iframe>
             </div>
             <div v-else class="video-placeholder-thick">
                <FileText :size="80" stroke-width="1" />
             </div>
          </div>
        </div>

        <!-- TABS -->
        <div class="classroom-tabs">
          <button @click="activeTab = 'SUMMARY'" :class="{ active: activeTab === 'SUMMARY' }" class="c-tab yellow">SUMMARY</button>
          <button @click="activeTab = 'RESOURCES'" :class="{ active: activeTab === 'RESOURCES' }" class="c-tab pink">RESOURCES</button>
          <button @click="activeTab = 'FORUM'" :class="{ active: activeTab === 'FORUM' }" class="c-tab blue">FORUM</button>
        </div>

        <div class="tab-content-box brutalist-card">
           <div v-if="activeTab === 'SUMMARY'" class="rich-text-summary" v-html="activeLesson?.content || 'Utilize os materiais ao lado para complementar seus estudos.'"></div>
           <div v-if="activeTab === 'RESOURCES'" class="resources-list">
              <div v-for="(att, i) in activeLesson?.attachments" :key="i" class="resource-item">
                 <Download :size="20" /> <span>{{ att.label }}</span>
              </div>
              <p v-if="!activeLesson?.attachments?.length">Nenhum material adicional disponível para esta aula.</p>
           </div>
           <div v-if="activeTab === 'FORUM'" class="forum-placeholder">
              <p>O fórum de discussão está sendo preparado. Em breve você poderá interagir com outros alunos.</p>
           </div>
        </div>
      </main>

      <!-- SIDEBAR -->
      <aside class="classroom-sidebar">
        <div class="sidebar-header-thick">
           <h3>LEARNING PATH</h3>
        </div>

        <div class="learning-path-flow">
           <div class="path-vertical-line"></div>
           <div v-for="(mod, mIdx) in path.modules" :key="mod.id" class="flow-module-item">
              <div class="flow-icon-wrap" 
                   :class="{ active: activeModuleIndex === mIdx }"
                   @click="activeModuleIndex = mIdx">
                 <div class="icon-circle">
                    <Layers v-if="activeModuleIndex !== mIdx" :size="20" />
                    <PlayCircle v-else :size="20" />
                 </div>
              </div>
              <div class="flow-info">
                 <span class="mod-label">MÓDULO {{ mIdx + 1 }}:</span>
                 <h4 class="mod-name">{{ mod.title?.toUpperCase() }}</h4>
                 <div class="mod-mini-progress">
                    <div class="progress-bar-tiny">
                       <div class="fill" :style="{ width: getModuleProgress(mod) + '%' }"></div>
                    </div>
                    <span class="percent">{{ getModuleProgress(mod) }}%</span>
                 </div>
              </div>
           </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.classroom-interface-page {
  background: #fdfdfd;
  min-height: 100vh;
  position: relative;
  padding: 40px;
}

.grid-overlay-light {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.classroom-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  position: relative;
  z-index: 10;
}

.interface-title {
  font-family: var(--font-display);
  font-size: 3rem;
  margin-bottom: 40px;
  text-align: center;
}

.video-player-box {
  background: white;
  border: 4px solid #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.player-header {
  padding: 30px;
  border-bottom: 4px solid #000;
}

.current-lesson-title {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.player-body {
  background: #eee;
}

.video-ratio { position: relative; padding-top: 56.25%; }
.video-ratio iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

.video-placeholder-thick {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.classroom-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: -4px;
  position: relative;
  z-index: 20;
}

.c-tab {
  flex: 1;
  padding: 20px;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1rem;
  border: 4px solid #000;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
  transition: all 0.2s;
}

.c-tab.yellow { background: #FFD600; }
.c-tab.pink { background: #FF4D4D; color: white; }
.c-tab.blue { background: #2196F3; color: white; }

.c-tab:not(.active) { opacity: 0.6; transform: translateY(4px); }

.tab-content-box {
  background: white;
  border: 4px solid #000;
  border-radius: 0 0 12px 12px;
  padding: 40px;
  min-height: 300px;
}

.rich-text-summary { font-size: 1.1rem; line-height: 1.6; }

/* SIDEBAR */
.classroom-sidebar {
  background: #111;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header-thick {
  padding: 40px;
  border-bottom: 4px solid #000;
  text-align: center;
}

.sidebar-header-thick h3 {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.learning-path-flow {
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.path-vertical-line {
  position: absolute;
  top: 40px; left: 65px; bottom: 40px;
  width: 6px; background: #333;
}

.flow-module-item {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  position: relative;
  z-index: 10;
}

.flow-icon-wrap {
  width: 50px; height: 50px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
}

.icon-circle {
  width: 50px; height: 50px;
  background: #333;
  border: 3px solid #000;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}

.flow-icon-wrap.active .icon-circle {
  background: #FFD600;
  color: #000;
  box-shadow: 0 0 20px rgba(255, 214, 0, 0.5);
  transform: scale(1.2);
}

.mod-label { font-family: var(--font-sans); font-weight: 800; font-size: 0.7rem; color: #666; }
.mod-name { font-family: var(--font-sans); font-weight: 900; font-size: 0.9rem; margin: 4px 0 10px; }

.mod-mini-progress { display: flex; align-items: center; gap: 10px; }
.progress-bar-tiny { flex: 1; height: 6px; background: #333; border-radius: 3px; overflow: hidden; }
.progress-bar-tiny .fill { height: 100%; background: #666; transition: width 0.3s; }
.active .progress-bar-tiny .fill { background: #FFD600; }
.percent { font-family: var(--font-sans); font-weight: 800; font-size: 0.7rem; color: #666; }

@media (max-width: 1200px) {
  .classroom-container { grid-template-columns: 1fr; }
  .classroom-sidebar { margin-top: 40px; }
}
</style>