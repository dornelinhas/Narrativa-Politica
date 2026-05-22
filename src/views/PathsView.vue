<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { Clock, ArrowRight } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const router = useRouter()
const { user, isAuthenticated } = useAuth()

const tracks = computed(() => siteContent.tracks || [])

const handleAction = (track) => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  if (track.status === 'PREMIUM' && !user.value?.isPremium) {
    router.push(`/checkout/${track.id}`)
    return
  }
  router.push('/area-do-aluno')
}

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <div class="journey-white-editorial-page bg-creme">
    <div class="container-max section-padding">
      
      <header class="page-hero-np text-center border-b-thick mb-16 pt-12 pb-12">
        <span class="tag-solid bg-azul text-white">● ESCOLA DE LIDERANÇA</span>
        <h1 class="display-xl mt-4 text-preto uppercase">
          TRILHAS DE <br/><span class="text-verde">FORMAÇÃO</span>
        </h1>
        <p class="body-lg mx-auto mt-4 max-w-md text-variant">
          Percursos técnicos e didáticos projetados para quem disputa o poder e constrói autonomia territorial.
        </p>
      </header>

      <div class="cards-section-container">
        <div class="grid-layout-2x2">
          
          <section v-for="(track, index) in tracks" :key="track.id" class="card-editorial bg-white paper-shadow-lg p-12 flex-col h-full fade-in-up border-thick" :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="accent-bar-top" :style="{ backgroundColor: track.color }"></div>
            
            <header class="card-meta flex-between align-center mb-8">
              <div class="pill-group flex align-center gap-2">
                <span class="tag-solid text-white" :style="{ backgroundColor: track.color }">{{ track.status }}</span>
                <div v-if="track.hasCertificate" class="tag-solid bg-verde text-preto border-thick">CERTIFICADO</div>
              </div>
              <div class="time-info label-bold flex align-center gap-2"><Clock :size="16" /> {{ track.hours }}</div>
            </header>

            <div class="card-content flex-col flex-grow">
              <h2 class="display-sm mb-4 text-preto leading-tight m-0 uppercase">{{ track.name }}</h2>
              <p class="body-lg text-variant mb-12">{{ track.description }}</p>

              <div class="learning-path mt-auto">
                <h4 class="label-bold border-b-thick inline-block pb-2 mb-6 m-0 text-preto">O QUE VOCÊ VAI APRENDER:</h4>
                <div class="steps-stack flex-col gap-4">
                  <div v-for="(mod, mIdx) in track.topics" :key="mIdx" class="step-row flex align-center gap-4">
                    <div class="step-bullet paper-shadow-sm flex align-center justify-center border-thick" :style="{ backgroundColor: track.color, color: track.id === 'economia' || track.id === 'genero' ? '#000' : '#FFF' }">
                      {{ mIdx + 1 }}
                    </div>
                    <span class="step-name label-bold text-preto">{{ mod }}</span>
                  </div>
                </div>
              </div>
            </div>

            <footer class="card-action mt-12 w-full">
              <button @click="handleAction(track)" class="btn-brutal paper-shadow-sm w-full justify-center text-center font-display uppercase tracking-wide" :style="{ backgroundColor: track.color, color: track.id === 'economia' || track.id === 'genero' ? '#000' : '#FFF' }" style="font-size: 20px; padding: 24px; border: var(--border-thick);">
                INICIAR JORNADA <ArrowRight :size="20" class="ml-2" />
              </button>
            </footer>
          </section>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* UTILS */
.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }
.border-thick { border: var(--border-thick); }
.border-b-thick { border-bottom: var(--border-thick); }

.mt-4 { margin-top: 16px; }
.mt-12 { margin-top: 48px; }
.mt-auto { margin-top: auto; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-8 { margin-bottom: 32px; }
.mb-12 { margin-bottom: 48px; }
.mb-16 { margin-bottom: 64px; }

.pt-12 { padding-top: 48px; }
.pb-2 { padding-bottom: 8px; }
.pb-12 { padding-bottom: 48px; }
.p-12 { padding: 48px; }

.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-md { max-width: 500px; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.m-0 { margin: 0; }
.ml-2 { margin-left: 8px; }

.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-grow { flex-grow: 1; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.align-center { align-items: center; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.inline-block { display: inline-block; }
.uppercase { text-transform: uppercase; }
.tracking-wide { letter-spacing: 0.05em; }
.leading-tight { line-height: 1.1; }

.display-sm { font-family: var(--font-display); font-size: 32px; font-weight: 700; }

/* LAYOUT */
.journey-white-editorial-page { min-height: 100vh; position: relative; padding-bottom: 100px; }

/* GRID */
.grid-layout-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 64px; }

.step-bullet { width: 44px; height: 44px; border-radius: 50%; font-family: var(--font-display); font-size: 18px; flex-shrink: 0; font-weight: 800; }

.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.8s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .grid-layout-2x2 { grid-template-columns: 1fr; max-width: 600px; margin: 0 auto; gap: 48px; }
}
@media (max-width: 768px) {
  .p-12 { padding: 32px; }
}
</style>