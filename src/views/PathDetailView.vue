<template>
  <div v-if="path" class="path-detail-page">
    <!-- HERO SECTION -->
    <section class="path-hero" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${path.image || 'https://images.unsplash.com/photo-1517245327032-96a1c4a161a7?auto=format&fit=crop&w=1200&q=80'})` }">
      <div class="container hero-inner">
        <router-link to="/trilhas" class="back-btn"><ChevronLeft :size="18" /> Voltar para Trilhas</router-link>
        
        <div class="hero-content">
          <div class="badge-group">
            <span class="type-badge">{{ path.type }}</span>
            <span class="difficulty-badge" :class="path.difficulty?.toLowerCase()">{{ path.difficulty }}</span>
          </div>
          <h1>{{ path.title }}</h1>
          <p class="path-desc-hero">{{ path.description }}</p>
          
          <div class="hero-stats">
            <div class="stat-item"><Clock :size="18" /> <span>{{ path.duration || 'Auto-guiado' }}</span></div>
            <div class="stat-item"><BookOpen :size="18" /> <span>{{ path.modules?.length || 0 }} Módulos</span></div>
            <div v-if="path.hasCertificate" class="stat-item"><Award :size="18" /> <span>Certificado Incluso</span></div>
          </div>

          <div class="hero-actions">
            <button v-if="isLocked" @click="goToCheckout" class="btn-main-action">
              <span>Desbloquear Agora</span>
              <span class="price-label">{{ path.price || 'Premium' }}</span>
            </button>
            <button v-else @click="goToClassroom" class="btn-main-action">
              <span>Começar a Estudar</span>
              <ArrowRight :size="18" />
            </button>
            <button v-if="path.syllabusContent" @click="scrollToSyllabus" class="btn-secondary-action">
              <FileText :size="18" />
              <span>Ver Ementa Detalhada</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB NAVIGATION -->
    <nav class="path-tabs-nav">
      <div class="container tabs-inner">
        <button @click="activeTab = 'content'" :class="{ active: activeTab === 'content' }">Conteúdo</button>
        <button v-if="path.syllabusContent" @click="activeTab = 'syllabus'" :class="{ active: activeTab === 'syllabus' }">Ementa Completa</button>
      </div>
    </nav>

    <!-- CONTENT SECTION -->
    <section class="path-body container">
      <div v-if="activeTab === 'content'" class="path-grid">
        <div class="path-main">
          <h2>Módulos do Curso</h2>
          <div class="modules-accordion">
            <div v-for="(mod, idx) in path.modules" :key="mod.id" class="module-item">
              <div class="module-header">
                <span class="mod-num">{{ idx + 1 }}</span>
                <div class="mod-titles">
                  <h3>{{ mod.title }}</h3>
                  <p>{{ mod.description }}</p>
                </div>
              </div>
              <div class="lessons-list-simple">
                <div v-for="lesson in mod.lessons" :key="lesson.id" class="lesson-simple-item">
                  <PlayCircle :size="14" /> <span>{{ lesson.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="path-sidebar">
          <div class="sidebar-card info-card">
            <h3>Informações Gerais</h3>
            <ul>
              <li><strong>Formato:</strong> {{ path.type }}</li>
              <li><strong>Acesso:</strong> Vitalício</li>
              <li><strong>Suporte:</strong> Incluso na comunidade</li>
              <li><strong>Requisitos:</strong> Nenhum</li>
            </ul>
          </div>
          
          <div class="sidebar-card instructor-card">
            <div class="instructor-header">
              <img :src="instructorProfile.image" :alt="instructorProfile.name" />
              <div>
                <strong>{{ instructorProfile.name }}</strong>
                <span>Sua Instrutora</span>
              </div>
            </div>
            <p>{{ instructorProfile.bioInstructor }}</p>
          </div>
        </aside>
      </div>

      <!-- SYLLABUS SECTION -->
      <div v-else-if="activeTab === 'syllabus'" class="syllabus-full-content">
        <div class="syllabus-card glass-card">
          <div class="syllabus-header">
            <FileText :size="32" class="syllabus-icon" />
            <h2>Ementa Estratégica</h2>
            <p>Confira o detalhamento técnico de cada tópico abordado nesta jornada.</p>
          </div>
          <div class="syllabus-body rich-text-view" v-html="path.syllabusContent"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '../store/content'
import { useAuth } from '../store/auth'
import { ChevronLeft, Clock, BookOpen, Award, ArrowRight, PlayCircle, FileText } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = useAuth()

const pathId = parseInt(route.params.id)
const path = computed(() => siteContent.paths.find(p => p.id === pathId))
const activeTab = ref('content')

const instructorProfile = computed(() => {
  if (!path.value?.teamMemberId) return siteContent.team.find(m => m.id === 'anne')
  return siteContent.team.find(m => m.id === path.value.teamMemberId) || siteContent.team.find(m => m.id === 'anne')
})

const isLocked = computed(() => {
  if (!path.value?.isPremium) return false
  return !isAuthenticated.value || !user.value?.isPremium
})

const scrollToSyllabus = () => {
  activeTab.value = 'syllabus'
  setTimeout(() => {
    window.scrollTo({ top: 600, behavior: 'smooth' })
  }, 100)
}

const goToCheckout = () => router.push(`/checkout/${pathId}`)
const goToClassroom = () => router.push(`/aula/${pathId}`)
</script>

<style scoped>
.path-detail-page { background: #fff; min-height: 100vh; }

.path-hero {
  padding: 120px 0 100px;
  background-size: cover;
  background-position: center;
  color: #fff;
}

.hero-inner { position: relative; }

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 40px;
  transition: color 0.2s;
}
.back-btn:hover { color: #fff; }

.hero-content { max-width: 800px; }

.badge-group { display: flex; gap: 12px; margin-bottom: 24px; }
.type-badge { background: #FF2D55; padding: 6px 14px; border-radius: 6px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; }
.difficulty-badge { background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 6px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; backdrop-filter: blur(4px); }
.difficulty-badge.iniciante { border-left: 3px solid #10B981; }
.difficulty-badge.intermediário { border-left: 3px solid #F59E0B; }
.difficulty-badge.avançado { border-left: 3px solid #EF4444; }

.hero-content h1 { font-size: 4.2rem; font-weight: 900; margin-bottom: 24px; letter-spacing: -2px; line-height: 1; }
.path-desc-hero { font-size: 1.4rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; line-height: 1.5; }

.hero-stats { display: flex; gap: 32px; margin-bottom: 48px; }
.stat-item { display: flex; align-items: center; gap: 10px; font-weight: 700; color: rgba(255,255,255,0.8); }

.hero-actions { display: flex; gap: 24px; align-items: center; }

.btn-main-action {
  background: #fff;
  color: #000;
  border: none;
  padding: 18px 40px;
  border-radius: 16px;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-main-action:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(255,255,255,0.2); }

.price-label { background: #000; color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 0.85rem; }

.btn-secondary-action {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 18px 32px;
  border-radius: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}
.btn-secondary-action:hover { background: rgba(255,255,255,0.2); border-color: #fff; }

/* TABS */
.path-tabs-nav {
  background: #fff;
  border-bottom: 1px solid #E2E8F0;
  position: sticky;
  top: 72px;
  z-index: 100;
}
.tabs-inner { display: flex; gap: 40px; }
.path-tabs-nav button {
  background: none; border: none;
  padding: 24px 0;
  font-weight: 800;
  font-size: 1rem;
  color: #64748B;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}
.path-tabs-nav button.active { color: #FF2D55; }
.path-tabs-nav button.active::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 4px; background: #FF2D55; border-radius: 4px 4px 0 0;
}

/* SYLLABUS */
.syllabus-full-content { padding: 60px 0; max-width: 900px; margin: 0 auto; }
.syllabus-card { background: #fff; padding: 60px; border-radius: 32px; border: 1px solid #E2E8F0; }
.syllabus-header { text-align: center; margin-bottom: 60px; }
.syllabus-header h2 { font-size: 2.5rem; font-weight: 900; margin: 16px 0 8px; }
.syllabus-header p { color: #64748B; font-size: 1.1rem; }
.syllabus-icon { color: #FF2D55; margin: 0 auto; }

.rich-text-view :deep(h2) { font-size: 1.8rem; font-weight: 800; margin: 2rem 0 1rem; color: #111827; }
.rich-text-view :deep(p) { font-size: 1.15rem; line-height: 1.8; color: #374151; margin-bottom: 1.5rem; }

/* BODY */
.path-body { padding: 80px 0; }
.path-grid { display: grid; grid-template-columns: 1fr 360px; gap: 60px; }

.path-main h2 { font-size: 2.2rem; font-weight: 900; margin-bottom: 40px; letter-spacing: -1px; }

.module-item { 
  background: #F8FAFC; 
  border-radius: 20px; 
  padding: 32px; 
  margin-bottom: 24px;
  border: 1px solid #E2E8F0;
}

.module-header { display: flex; gap: 24px; margin-bottom: 24px; }
.mod-num { 
  width: 44px; height: 44px; background: #111827; color: #fff; 
  border-radius: 12px; display: flex; align-items: center; justify-content: center; 
  font-weight: 900; flex-shrink: 0;
}

.mod-titles h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 4px; color: #111827; }
.mod-titles p { color: #64748B; font-weight: 500; font-size: 1rem; }

.lessons-list-simple { 
  display: flex; flex-direction: column; gap: 12px; 
  padding-left: 68px; border-top: 1px solid #E2E8F0; padding-top: 20px;
}
.lesson-simple-item { display: flex; align-items: center; gap: 10px; color: #475569; font-weight: 600; font-size: 0.95rem; }

/* SIDEBAR */
.sidebar-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 24px; padding: 32px; margin-bottom: 32px; }
.sidebar-card h3 { font-size: 1.2rem; font-weight: 900; margin-bottom: 20px; }

.info-card ul { list-style: none; padding: 0; }
.info-card li { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F1F5F9; font-size: 0.95rem; }
.info-card li:last-child { border-bottom: none; }

.instructor-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.instructor-header img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid #FF2D55; }
.instructor-header strong { display: block; font-size: 1.1rem; }
.instructor-header span { font-size: 0.85rem; color: #64748B; }
.instructor-card p { font-size: 0.9rem; line-height: 1.6; color: #475569; }

@media (max-width: 1024px) {
  .path-grid { grid-template-columns: 1fr; }
  .hero-content h1 { font-size: 3rem; }
}
</style>