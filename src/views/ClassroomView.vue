<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { 
  ArrowLeft, ArrowRight, Play, CheckCircle2, 
  Download, FileText, Link, MessageSquare, 
  HelpCircle, CheckCircle, ChevronRight, Menu, CloudDownload
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth()

const track = {
  id: 'advocacy',
  title: 'Advocacy em Políticas Públicas',
  color: '#FF6BCA',
  totalProgress: 45
}

const userNote = ref('')
const lessonCompleted = ref(false)

onMounted(() => {
  if (!isAuthenticated.value) router.push('/login')
  window.scrollTo(0, 0)
})
</script>

<template>
  <div v-if="isAuthenticated" class="classroom-premium-reset" :style="{ '--track-color': track.color }">
    <div class="global-progress-bar-fixed">
       <div class="fill" :style="{ width: track.totalProgress + '%' }"></div>
    </div>

    <div class="fine-grain-overlay"></div>

    <!-- 1. FIM DO ATROPELO: pt-60 (240px no scroller) -->
    <div class="scroller-content pt-60 pb-32 px-6 md:px-12">
      <div class="main-container-fixed">
        
        <!-- 5. TÍTULOS À ESQUERDA -->
        <header class="lesson-header-left mb-12 fade-in-up">
           <router-link to="/trilhas/advocacy" class="back-link-minimal-bold mb-6">
              <ArrowLeft :size="16" /> VOLTAR PARA O PERCURSO DA TRILHA
           </router-link>
           <h1 class="lesson-main-title">Aula 2.1: Matriz de Influência e Poder</h1>
           <div class="lesson-meta-row mt-4">
              <span class="badge-type-pill">VÍDEO AULA TÉCNICA</span>
           </div>
        </header>

        <!-- 4. PLAYER 100PX DE DISTÂNCIA DO TÍTULO -->
        <div class="classroom-layout-70-30 mt-24">
           
           <!-- LADO ESQUERDO: PLAYER -->
           <main class="player-focus-area">
              <div class="video-container shadow-brutal-fixed">
                 <div class="aspect-16-9">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
                 </div>
              </div>

              <div class="lesson-description-area mt-16">
                 <h3 class="label-tech-brutal mb-6">RESUMO DA AULA</h3>
                 <p class="serif-editorial-text">
                    Nesta aula, desconstruímos o mito da centralidade do poder e aprendemos a mapear as redes de influência que realmente determinam o sucesso de uma pauta pública nos territórios.
                 </p>
              </div>

              <div class="conclusion-zone mt-20">
                 <button class="btn-conclude-monumental" @click="lessonCompleted = !lessonCompleted" :class="{ 'is-done': lessonCompleted }">
                    <CheckCircle v-if="lessonCompleted" :size="24" />
                    {{ lessonCompleted ? 'AULA CONCLUÍDA' : 'CONCLUIR AULA E IR PARA A PRÓXIMA' }}
                    <ArrowRight v-if="!lessonCompleted" :size="24" />
                 </button>
              </div>
           </main>

           <!-- LADO DIREITO: SIDEBAR ALINHADA PELO TOPO -->
           <aside class="sidebar-technical-reset">
              
              <!-- NOTAS -->
              <div class="util-card-brutal mb-12">
                 <h3 class="label-tech-brutal mb-6 flex items-center gap-3">
                    <MessageSquare :size="18" /> MINHAS ANOTAÇÕES
                 </h3>
                 <textarea v-model="userNote" placeholder="Insights técnicos..."></textarea>
                 <div class="save-status-mini">Sincronizado</div>
              </div>

              <!-- MATERIAIS -->
              <div class="util-card-brutal">
                 <h3 class="label-tech-brutal mb-6">MATERIAIS DE APOIO</h3>
                 <div class="materials-list-vertical">
                    <a href="#" class="material-link-compact">
                       <CloudDownload :size="16" />
                       <div class="m-info">
                          <span class="m-name">Guia_Incidencia.pdf</span>
                          <span class="m-meta">2.4 MB</span>
                       </div>
                    </a>
                 </div>
              </div>
           </aside>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.classroom-premium-reset { background: #FDFCF0; min-height: 100vh; position: relative; overflow-x: hidden; z-index: 0; --track-color: #FF6BCA; }
.fine-grain-overlay { position: fixed; inset: 0; z-index: -1; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.1; mix-blend-mode: multiply; }

.global-progress-bar-fixed { position: fixed; top: 0; left: 0; width: 100%; height: 8px; background: #EEE; z-index: 10000; border-bottom: 2px solid #1C1C1C; }
.global-progress-bar-fixed .fill { height: 100%; background: var(--track-color); transition: 1.5s ease; }

.scroller-content { padding-top: 240px; } /* 1. FIM DO ATROPELO */
.main-container-fixed { max-width: 1440px; margin: 0 auto; }

.lesson-header-left { text-align: left; }
.back-link-minimal-bold { display: inline-flex; align-items: center; gap: 10px; font-weight: 900; font-size: 11px; color: #000; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; }
.lesson-main-title { font-family: "Archivo Black"; font-size: 3.5rem; line-height: 1; color: #1C1C1C; text-transform: uppercase; }

.classroom-layout-70-30 { display: grid; grid-template-columns: 1fr 400px; gap: 40px; align-items: start; }

.video-container { width: 100%; border: 4px solid #1C1C1C; border-radius: 3rem; overflow: hidden; background: #000; }
.aspect-16-9 { aspect-ratio: 16/9; }

.serif-editorial-text { font-family: "Georgia", serif; font-size: 1.5rem; color: #000; line-height: 1.8; }

.btn-conclude-monumental { width: 100%; padding: 30px; border-radius: 2rem; background: #1C1C1C; color: #FFF; border: none; font-family: "Inter"; font-weight: 900; font-size: 1.1rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 20px; cursor: pointer; transition: 0.3s; }
.btn-conclude-monumental.is-done { background: #10b981; }

.util-card-brutal { background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 2.5rem; padding: 35px; box-shadow: 12px 12px 0px #1C1C1C; }
.label-tech-brutal { font-family: "Archivo Black"; font-size: 10px; letter-spacing: 2px; color: #000; border-bottom: 2px solid #F1F5F9; padding-bottom: 15px; }

textarea { width: 100%; height: 220px; background: #FDFCF0; border: 2.5px solid #1C1C1C; border-radius: 1.2rem; padding: 20px; font-family: "Inter"; font-weight: 800; font-size: 0.95rem; outline: none; margin-top: 15px; }
.save-status-mini { font-size: 9px; font-weight: 900; color: #10b981; text-transform: uppercase; margin-top: 10px; text-align: right; }

.material-link-compact { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8fafc; border: 1.5px solid #EEE; border-radius: 12px; text-decoration: none; color: #000; }
.m-info .m-name { display: block; font-weight: 800; font-size: 11px; }
.m-info .m-meta { font-size: 9px; opacity: 0.6; }

.shadow-brutal-fixed { box-shadow: 15px 15px 0px #1C1C1C; }

.fade-in-up { opacity: 0; transform: translateY(20px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1280px) { .classroom-layout-70-30 { grid-template-columns: 1fr; } .sidebar-technical-reset { order: -1; } }
</style>