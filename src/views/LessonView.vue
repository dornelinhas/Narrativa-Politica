<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { 
  ArrowLeft, ArrowRight, Play, FileText, Download, 
  MessageSquare, Star, BookOpen, Clock, Award
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) router.push('/login')
})
</script>

<template>
  <div v-if="isAuthenticated" class="lesson-environment">
    <div class="magenta-bar-top"></div>
    <div class="technical-grain-bg"></div>

    <div class="content-wrapper pt-32 pb-44">
      <div class="container-editorial">
        
        <div class="lesson-grid-v2">
          <!-- ESQUERDA: PLAYER E DESCRIÇÃO -->
          <main class="player-column fade-in-up">
            <router-link to="/trilhas/advocacy" class="back-link mb-8">
              <ArrowLeft :size="14" /> VOLTAR PARA TRILHA
            </router-link>

            <div class="video-frame shadow-solid-12 mb-12">
               <div class="video-aspect">
                 <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
               </div>
            </div>

            <div class="lesson-info">
               <h1 class="lesson-title-brutal mb-6 uppercase">Aula 2.1: Matriz de Influência e Poder</h1>
               <div class="lesson-description-editorial">
                  <p>Uma aula fundamental para entender como o poder se distribui nos territórios e como identificar os pontos de pressão estratégica para sua causa.</p>
               </div>
            </div>
          </main>

          <!-- DIREITA: MATERIAIS E APOIO -->
          <aside class="support-column fade-in-up" style="animation-delay: 0.2s">
             <div class="sticky-side-box">
                <div class="support-card-brutal mb-8">
                   <h3 class="side-label mb-6 flex items-center gap-2"><FileText :size="16" /> MATERIAIS DE APOIO</h3>
                   <div class="files-stack">
                      <a href="#" class="file-download-item">
                        <div class="file-icon lime-bg"><Download :size="14" /></div>
                        <div class="flex flex-col">
                           <span class="fname">Matriz_Atores.pdf</span>
                           <span class="fsize">2.4 MB</span>
                        </div>
                      </a>
                   </div>
                </div>

                <div class="notes-card-brutal">
                   <h3 class="side-label mb-6 flex items-center gap-2"><MessageSquare :size="16" /> MINHAS NOTAS</h3>
                   <textarea placeholder="Anote seus insights aqui..." class="notes-area"></textarea>
                   <button class="btn-save-notes mt-4">SALVAR NOTA</button>
                </div>
             </div>
          </aside>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.lesson-environment { background: #FFF; min-height: 100vh; position: relative; }
.magenta-bar-top { position: fixed; top: 0; left: 0; width: 100%; height: 8px; background: #FF6BCA; z-index: 10000; }
.technical-grain-bg { position: fixed; inset: 0; z-index: 1; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.05; pointer-events: none; }

.container-editorial { max-width: 1400px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 10; }
.lesson-grid-v2 { display: grid; grid-template-columns: 1fr 400px; gap: 60px; }

.back-link { display: inline-flex; align-items: center; gap: 8px; font-weight: 900; font-size: 10px; color: #000; text-decoration: none; opacity: 0.4; }

.video-frame { border: 4px solid #000; border-radius: 2rem; overflow: hidden; background: #000; }
.video-aspect { width: 100%; aspect-ratio: 16/9; }
.shadow-solid-12 { box-shadow: 12px 12px 0px #000; }

.lesson-title-brutal { font-family: "Archivo Black", sans-serif; font-size: 2.5rem; line-height: 1; }
.lesson-description-editorial { font-family: "Georgia", serif; font-size: 1.25rem; line-height: 1.7; color: #475569; }

.sticky-side-box { position: sticky; top: 120px; }
.support-card-brutal, .notes-card-brutal { background: #FFF; border: 3px solid #000; padding: 30px; border-radius: 1.5rem; box-shadow: 8px 8px 0 #000; }

.side-label { font-family: "Archivo Black", sans-serif; font-size: 0.8rem; letter-spacing: 0.1em; color: #000; }
.file-download-item { display: flex; items-center: center; gap: 15px; text-decoration: none; color: #000; padding: 15px; border-radius: 12px; background: #f8fafc; border: 1px solid #EEE; transition: 0.2s; }
.file-download-item:hover { border-color: #000; }
.file-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.lime-bg { background: #A4CD39; }
.fname { font-weight: 800; font-size: 13px; }
.fsize { font-size: 10px; font-weight: 600; opacity: 0.5; }

.notes-area { width: 100%; height: 180px; border: 2px solid #EEE; border-radius: 12px; padding: 15px; font-family: "Inter", sans-serif; font-size: 14px; outline: none; transition: 0.2s; }
.notes-area:focus { border-color: #000; }
.btn-save-notes { width: 100%; padding: 12px; border-radius: 9999px; background: #1C1C1C; color: #FFF; font-weight: 900; font-size: 11px; border: none; cursor: pointer; transition: 0.3s; }
.btn-save-notes:hover { background: #FF6BCA; }

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .lesson-grid-v2 { grid-template-columns: 1fr; }
  .support-column { order: 1; }
}
</style>