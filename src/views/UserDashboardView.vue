<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'
import { BookOpen, Award, PlayCircle, Lock } from 'lucide-vue-next'

const router = useRouter()
const { user, isAuthenticated } = useAuth()

const paths = computed(() => siteContent.paths || [])
const fallbackPaths = [
  { id: 1, title: 'Introdução à Economia Política', excerpt: 'Compreenda a relação intrínseca entre as políticas econômicas e o poder de Estado no século XXI.', isPremium: false, image: '/images/projects/diplomacy.png' },
  { id: 2, title: 'Organização Comunitária', excerpt: 'Táticas para mobilização e articulação em territórios vulneráveis.', isPremium: true, image: '/images/projects/grassroots.png' }
]
const displayPaths = computed(() => paths.value.length ? paths.value : fallbackPaths)

const getPathProgress = (id) => {
  const completed = JSON.parse(localStorage.getItem(`np_progress_lessons_${id}`) || '[]')
  return completed.length > 0 ? 50 : 0 // Fake progress for visual
}
</script>

<template>
  <div class="user-dashboard-brutalist">
    <div class="grid-overlay-light"></div>

    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="welcome-text">OLÁ, <span class="text-red">{{ user?.name?.toUpperCase() || 'ALUNO' }}</span>.</h1>
        <p class="welcome-sub">Bem-vindo à sua área de desenvolvimento de lideranças. Continue de onde parou.</p>
      </div>

      <div class="dashboard-content">
        <aside class="dashboard-sidebar">
          <div class="user-card brutalist-card">
            <div class="user-avatar-lg">
              <span v-if="!user?.image">{{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}</span>
              <img v-else :src="user.image" />
            </div>
            <h3 class="user-name">{{ user?.name || 'Usuário' }}</h3>
            <div class="user-role-badge" :class="user?.isPremium ? 'premium-badge' : 'free-badge'">
              {{ user?.isPremium ? 'ASSINANTE PREMIUM' : 'PLANO GRATUITO' }}
            </div>
          </div>

          <div class="stats-card brutalist-card">
            <h4>MÉTRICAS</h4>
            <div class="stat-row">
              <span>Trilhas Iniciadas</span>
              <strong>{{ displayPaths.filter(p => getPathProgress(p.id) > 0).length }}</strong>
            </div>
            <div class="stat-row">
              <span>Certificados</span>
              <strong>0</strong>
            </div>
          </div>
        </aside>

        <main class="dashboard-main">
          <div class="section-header-box">
            <h2>TRILHAS DE APRENDIZAGEM</h2>
          </div>

          <div class="paths-grid">
            <div v-for="p in displayPaths" :key="p.id" class="path-card brutalist-card" @click="router.push(`/aula/${p.id}`)">
              <div class="path-img-wrap">
                <img :src="p.image || '/images/default-path.jpg'" :alt="p.title" />
                <div class="path-status-badge">
                  <span v-if="getPathProgress(p.id) > 0" class="badge-progress">EM ANDAMENTO</span>
                  <span v-else class="badge-new">NÃO INICIADO</span>
                </div>
                <div v-if="p.isPremium && (!user || !user.isPremium)" class="premium-lock">
                  <Lock :size="32" />
                  <span>CONTEÚDO PREMIUM</span>
                </div>
              </div>
              <div class="path-body">
                <div class="path-progress-bar">
                  <div class="fill" :style="{ width: getPathProgress(p.id) + '%' }"></div>
                </div>
                <h3 class="path-title">{{ p.title }}</h3>
                <p class="path-desc">{{ p.excerpt || p.description }}</p>
                <div class="path-action">
                  <button class="btn-action">ACESSAR MÓDULOS <PlayCircle :size="16"/></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.user-dashboard-brutalist { background: #F7F7F5; min-height: 100vh; position: relative; padding-top: 140px; padding-bottom: 80px; }
.grid-overlay-light { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
.dashboard-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 10; }

.dashboard-header { margin-bottom: 40px; border-bottom: 4px solid var(--color-dark); padding-bottom: 20px; }
.welcome-text { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); text-transform: uppercase; line-height: 1; margin-bottom: 10px; }
.welcome-sub { font-family: var(--font-sans); font-weight: 700; font-size: 1.1rem; color: rgba(28,28,28,0.7); }
.text-red { color: var(--color-red); }

.dashboard-content { display: grid; grid-template-columns: 300px 1fr; gap: 40px; }

.dashboard-sidebar { display: flex; flex-direction: column; gap: 20px; }
.brutalist-card { background: white; border: 4px solid var(--color-dark); padding: 30px; box-shadow: 6px 6px 0 var(--color-dark); }
.user-card { text-align: center; }
.user-avatar-lg { width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--color-dark); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; background: var(--color-yellow); font-family: var(--font-display); font-size: 3rem; overflow: hidden; }
.user-avatar-lg img { width: 100%; height: 100%; object-fit: cover; }
.user-name { font-family: var(--font-display); font-size: 1.5rem; text-transform: uppercase; margin-bottom: 10px; }
.user-role-badge { display: inline-block; padding: 6px 12px; font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; text-transform: uppercase; border-radius: 4px; }
.free-badge { background: #eee; color: #555; }
.premium-badge { background: var(--color-pink); color: white; }

.stats-card h4 { font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600; margin-bottom: 10px; }
.stat-row strong { font-size: 1.2rem; color: var(--color-red); }

.section-header-box { background: var(--color-dark); color: white; padding: 15px 25px; margin-bottom: 30px; display: inline-block; transform: rotate(-1deg); }
.section-header-box h2 { font-family: var(--font-display); font-size: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }

.paths-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
.path-card { padding: 0; display: flex; flex-direction: column; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; overflow: hidden; }
.path-card:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0 var(--color-dark); }

.path-img-wrap { height: 180px; position: relative; border-bottom: 4px solid var(--color-dark); background: #eee; overflow: hidden; }
.path-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.path-card:hover .path-img-wrap img { transform: scale(1.05); }

.path-status-badge { position: absolute; top: 15px; left: 15px; }
.badge-progress { background: var(--color-yellow); color: var(--color-dark); padding: 5px 10px; font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; text-transform: uppercase; border: 2px solid var(--color-dark); }
.badge-new { background: white; color: var(--color-dark); padding: 5px 10px; font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; text-transform: uppercase; border: 2px solid var(--color-dark); }

.premium-lock { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; letter-spacing: 0.1em; }

.path-body { padding: 25px; display: flex; flex-direction: column; flex: 1; }
.path-progress-bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; margin-bottom: 15px; border: 1px solid #ccc; }
.path-progress-bar .fill { height: 100%; background: var(--color-lime); }

.path-title { font-family: var(--font-display); font-size: 1.4rem; text-transform: uppercase; line-height: 1.1; margin-bottom: 10px; }
.path-desc { font-family: var(--font-sans); font-size: 0.9rem; font-weight: 500; color: rgba(28,28,28,0.7); line-height: 1.5; margin-bottom: 20px; flex: 1; }

.path-action { margin-top: auto; }
.btn-action { width: 100%; background: transparent; border: 2px solid var(--color-dark); padding: 12px; font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
.path-card:hover .btn-action { background: var(--color-dark); color: white; }

@media (max-width: 900px) { .dashboard-content { grid-template-columns: 1fr; } .paths-grid { grid-template-columns: 1fr; } }
</style>