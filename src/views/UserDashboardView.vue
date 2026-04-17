<template>
  <div class="user-dashboard container section-padding">
    <div class="dashboard-header-premium">
      <div class="user-welcome-vibrant">
        <div class="vibrant-bg-decoration"></div>
        <span class="welcome-label">Boas-vindas de volta!</span>
        <h1>Área do <span>Estudante</span></h1>
        <p>Olá, <strong>{{ user?.name || 'Estudante' }}</strong>. Continue de onde você parou.</p>
        <div v-if="user?.isPremium" class="premium-badge-vibrant">
          <div class="badge-pulse"></div>
          <span>Acesso Premium Ativo ✨</span>
        </div>
      </div>
      <div class="dashboard-actions">
        <button @click="handleLogout" class="btn-logout-vibrant">
          <LogOut :size="18" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>

    <div class="dashboard-grid-vibrant">
      <!-- TRILHAS E CURSOS (MAIN HUB) -->
      <div class="dashboard-main-content">
        <div class="section-title-group">
          <h3>Suas Trilhas e Cursos</h3>
          <p>Explore o conteúdo e acelere seu impacto.</p>
        </div>
        
        <div class="paths-grid-vibrant">
          <div v-for="path in paths" :key="path.id" class="path-card-vibrant" :class="{ 'is-locked': path.isPremium && !user?.isPremium }">
            <div class="card-glass-overlay"></div>
            
            <div class="path-card-header">
              <div class="path-icon-premium">
                <div v-if="path.isPremium && !user?.isPremium" class="lock-icon">
                  <Lock :size="24" />
                </div>
                <div v-else class="play-icon">
                  <Play :size="24" />
                </div>
              </div>
              <div class="path-type-tag" :class="{ 'tag-premium': path.isPremium }">
                {{ path.type }}
              </div>
            </div>
            
            <div class="path-card-body">
              <strong>{{ path.title }}</strong>
              <p>{{ path.description }}</p>
              <div class="path-footer-meta">
                <span class="mod-indicator"><BookOpen :size="14" /> {{ path.modules?.length || 0 }} Módulos</span>
                <span v-if="path.hasCertificate" class="cert-indicator"><Award :size="14" /> Com Certificado</span>
              </div>
            </div>
            
            <div class="path-card-footer">
              <div class="progress-container-mini">
                <div class="progress-bar-mini">
                  <div class="progress-fill-mini" :style="{ width: getProgress(path.id) + '%' }"></div>
                </div>
                <span class="progress-text-mini">{{ Math.round(getProgress(path.id)) }}% completo</span>
              </div>
              <router-link :to="`/trilhas/${path.id}`" class="btn-action-premium btn-enter">
                <span>Ver Detalhes</span>
                <ArrowRight :size="16" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- SIDEBAR ATUALIZACOES -->
      <aside class="dashboard-sidebar-vibrant">
        <div class="sidebar-vibrant-box">
          <div class="box-icon-wrap"><FileText :size="20" /></div>
          <h3>Materiais Extra</h3>
          <p>Conteúdos exclusivos para apoiar sua jornada técnica.</p>
          <ul class="vibrant-materials">
            <li><a href="#">Guia: Liderança Feminina <Download :size="14" /></a></li>
            <li><a href="#">Glossário da Diversidade <Download :size="14" /></a></li>
          </ul>
        </div>
        
        <div class="sidebar-vibrant-box promo-card">
          <div class="promo-bg"></div>
          <div class="box-icon-wrap"><Calendar :size="20" /></div>
          <h3>Aulões ao Vivo</h3>
          <div class="event-item">
            <span class="event-date">15 ABR</span>
            <span class="event-title">Dados Censitários</span>
          </div>
          <div class="event-item">
            <span class="event-date">22 ABR</span>
            <span class="event-title">Mentoria Coletiva</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent } from '../store/content'
import { 
  LogOut, Lock, Play, BookOpen, ArrowRight, FileText, Download, Calendar, Award
} from 'lucide-vue-next'

const router = useRouter()
const { user, logout } = useAuth()
const paths = computed(() => siteContent.paths)

const getProgress = (pathId) => {
  const completed = JSON.parse(localStorage.getItem(`np_progress_lessons_${pathId}`) || '[]')
  const path = siteContent.paths.find(p => p.id === pathId)
  if (!path?.modules?.length) return 0
  const totalLessons = path.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0)
  if (totalLessons === 0) return 0
  return (completed.length / totalLessons) * 100
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.user-dashboard {
  padding-top: 140px;
  background: #fff;
  min-height: 100vh;
}

.dashboard-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
}

.user-welcome-vibrant {
  position: relative;
}

.vibrant-bg-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,45,85,0.15) 0%, rgba(255,45,85,0) 70%);
  z-index: -1;
}

.welcome-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-pink);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.user-welcome-vibrant h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--color-graphite);
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.user-welcome-vibrant h1 span {
  color: var(--color-pink);
  background: linear-gradient(120deg, var(--color-pink), var(--color-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-welcome-vibrant p {
  font-size: 1.2rem;
  color: #64748B;
  font-weight: 500;
}

.premium-badge-vibrant {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--color-graphite);
  color: #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 800;
  margin-top: 24px;
  position: relative;
  overflow: hidden;
}

.badge-pulse {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: pulse-shimmer 2s infinite;
}

@keyframes pulse-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* LOGOUT BTN */
.btn-logout-vibrant {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  color: #64748B;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout-vibrant:hover {
  background: #FEF2F2;
  color: #EF4444;
  border-color: #FCA5A5;
  transform: translateY(-2px);
}

/* DASHBOARD GRID */
.dashboard-grid-vibrant {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
}

.section-title-group { margin-bottom: 32px; }
.section-title-group h3 { font-size: 1.8rem; font-weight: 900; color: var(--color-graphite); margin-bottom: 4px; }
.section-title-group p { color: #94A3B8; font-weight: 600; }

.paths-grid-vibrant {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}

.path-card-vibrant {
  background: #fff;
  border-radius: 28px;
  border: 1px solid #F1F5F9;
  padding: 32px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

.card-glass-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%);
  z-index: 1;
}

.path-card-vibrant:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: var(--color-pink);
  box-shadow: 0 30px 60px rgba(255,45,85,0.08);
}

.path-card-header, .path-card-body, .path-card-footer { position: relative; z-index: 2; }

.path-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.path-icon-premium {
  width: 56px;
  height: 56px;
  background: #F8FAFC;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-graphite);
  transition: all 0.3s ease;
}

.path-card-vibrant:hover .path-icon-premium {
  background: var(--color-pink);
  color: #fff;
  transform: rotate(5deg);
}

.path-type-tag {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  background: #F1F5F9;
  color: #64748B;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 1px;
}

.tag-premium {
  background: rgba(255,45,85,0.1);
  color: var(--color-pink);
}

.path-card-body {
  flex: 1;
  margin-bottom: 32px;
}

.path-card-body strong {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-graphite);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.path-card-body p {
  font-size: 1rem;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 20px;
}

.path-footer-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #94A3B8;
}

.mod-indicator { display: flex; align-items: center; gap: 6px; }
.cert-indicator { display: flex; align-items: center; gap: 6px; color: #10B981; }

/* MINI PROGRESS */
.progress-container-mini { margin-bottom: 24px; }
.progress-bar-mini { height: 6px; background: #F1F5F9; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
.progress-fill-mini { height: 100%; background: linear-gradient(90deg, var(--color-pink), var(--color-purple)); transition: width 0.6s ease; }
.progress-text-mini { font-size: 0.75rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; }

/* ACTION BUTTONS */
.btn-action-premium {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 18px;
  text-decoration: none;
  font-weight: 800;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-enter {
  background: var(--color-graphite);
  color: #fff;
}

.btn-enter:hover {
  background: var(--color-pink);
  box-shadow: 0 10px 25px rgba(255,45,85,0.3);
}

.btn-unlock {
  background: #fff;
  border: 2px solid var(--color-graphite);
  color: var(--color-graphite);
}

.btn-unlock:hover {
  background: var(--color-graphite);
  color: #fff;
}

.btn-price {
  font-size: 0.8rem;
  background: rgba(0,0,0,0.1);
  padding: 4px 10px;
  border-radius: 8px;
}

.btn-unlock:hover .btn-price {
  background: rgba(255,255,255,0.2);
}

.is-locked .path-card-body { opacity: 0.7; }
.is-locked .path-icon-premium { color: #94A3B8; }

/* SIDEBAR */
.sidebar-vibrant-box {
  background: #F8FAFC;
  border-radius: 28px;
  padding: 32px;
  margin-bottom: 32px;
  position: relative;
  border: 1px solid #F1F5F9;
}

.box-icon-wrap {
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-pink);
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.sidebar-vibrant-box h3 { font-size: 1.2rem; font-weight: 900; color: var(--color-graphite); margin-bottom: 12px; }
.sidebar-vibrant-box p { font-size: 0.95rem; color: #64748B; margin-bottom: 24px; line-height: 1.5; }

.vibrant-materials { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.vibrant-materials a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: var(--color-graphite);
  font-weight: 800;
  font-size: 0.9rem;
  background: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  transition: all 0.2s;
}

.vibrant-materials a:hover {
  border-color: var(--color-pink);
  color: var(--color-pink);
  transform: translateX(4px);
}

.promo-card {
  background: var(--color-purple);
  color: #fff;
  border: none;
  overflow: hidden;
}

.promo-bg {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
}

.promo-card h3 { color: #fff; }
.promo-card .box-icon-wrap { background: rgba(255,255,255,0.2); color: #fff; box-shadow: none; }

.event-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  background: rgba(255,255,255,0.1);
  padding: 12px;
  border-radius: 14px;
}

.event-date { font-weight: 900; font-size: 0.75rem; background: #fff; color: var(--color-purple); padding: 4px 8px; border-radius: 6px; }
.event-title { font-weight: 800; font-size: 0.9rem; }

@media (max-width: 1200px) {
  .dashboard-grid-vibrant { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .user-welcome-vibrant h1 { font-size: 2.5rem; }
  .paths-grid-vibrant { grid-template-columns: 1fr; }
}
</style>