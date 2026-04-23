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
  <div class="journey-white-editorial-page">
    <div class="background-master-layer">
       <div class="paper-texture"></div>
       <div class="watermarks-bg">
          <div class="w-shape circle"></div>
          <div class="w-shape square"></div>
          <div class="w-shape star">★</div>
       </div>
    </div>

    <div class="page-main-scroller">
      <header class="journey-header-central fade-in-up">
        <h1 class="stencil-title-main">
          MAPA DA <br/><span class="text-gradient">JORNADA</span>
        </h1>
        <p class="subtitle-editorial-center">
          PERCURSOS TÉCNICOS E DIDÁTICOS PROJETADOS PARA QUEM DISPUTA O PODER E CONSTRÓI AUTONOMIA TERRITORIAL.
        </p>
        <div class="divider-center"></div>
      </header>

      <div class="cards-section-container">
        <div class="map-path-complex-layer">
          <svg width="100%" height="100%" viewBox="0 0 1200 1400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150 C 150 150, 200 350, 300 350" stroke="#FF6BCA" stroke-width="8" stroke-dasharray="15 15" />
            <path d="M300 350 C 500 350, 700 350, 900 350" stroke="#20B2AA" stroke-width="8" stroke-dasharray="15 15" />
            <path d="M900 350 C 1100 550, 100 750, 300 1050" stroke="#3D78E0" stroke-width="8" stroke-dasharray="15 15" />
            <path d="M300 1050 C 500 1050, 700 1050, 900 1050" stroke="#FFE65A" stroke-width="8" stroke-dasharray="15 15" />
          </svg>
        </div>

        <div class="grid-layout-2x2">
          <section v-for="(track, index) in tracks" :key="track.id" 
            class="track-magazine-card-fixed fade-in-up"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <header class="card-meta">
              <div class="pill-group">
                <!-- BADGES LADO A LADO COM LETRA BRANCA -->
                <span class="badge-pill" :style="{ backgroundColor: track.color }">{{ track.status }}</span>
                <div v-if="track.hasCertificate" class="badge-pill cert-green">CERTIFICADO</div>
              </div>
              <div class="time-info"><Clock :size="16" /> {{ track.hours }}</div>
            </header>

            <div class="card-content-fixed">
              <div class="title-container-fixed">
                <h2 class="track-name">{{ track.name }}</h2>
              </div>
              
              <div class="desc-container-fixed">
                <p class="track-description">{{ track.description }}</p>
              </div>

              <div class="learning-path">
                <h4 class="path-label">O QUE VOCÊ VAI APRENDER:</h4>
                <div class="steps-stack">
                  <div v-for="(mod, mIdx) in track.topics" :key="mIdx" class="step-row">
                    <div class="step-bullet" :style="{ backgroundColor: track.color, color: track.id === 'economia' || track.id === 'genero' ? '#000' : '#FFF' }">{{ mIdx + 1 }}</div>
                    <span class="step-name">{{ mod }}</span>
                  </div>
                </div>
              </div>
            </div>

            <footer class="card-action">
              <button @click="handleAction(track)" class="pill-btn-action" :style="{ backgroundColor: track.color, color: track.id === 'economia' || track.id === 'genero' ? '#000' : '#FFF' }">
                INICIAR JORNADA <ArrowRight :size="18" />
              </button>
            </footer>
          </section>
        </div>
      </div>
      <div class="footer-spacer"></div>
    </div>
  </div>
</template>

<style scoped>
.journey-white-editorial-page { background-color: #FFFFFF; min-height: 100vh; position: relative; overflow-x: hidden; }
.background-master-layer { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.paper-texture { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: 0.08; mix-blend-mode: multiply; }
.watermarks-bg .w-shape { position: absolute; opacity: 0.06; font-family: "Archivo Black"; color: #000; }
.w-shape.circle { width: 400px; height: 400px; border: 40px solid #3D78E0; border-radius: 50%; top: -100px; left: -100px; }
.w-shape.square { width: 300px; height: 300px; border: 35px solid #20B2AA; bottom: 10%; right: -50px; transform: rotate(15deg); }
.w-shape.star { font-size: 500px; top: 15%; left: 65%; color: #FF6BCA; }
/* HEADER */
.journey-header-central { padding-top: 180px; padding-bottom: 60px; text-align: center; }
.stencil-title-main { font-family: "Archivo Black", sans-serif; font-size: clamp(3rem, 8vw, 6rem); line-height: 0.85; text-transform: uppercase; color: #1C1C1C; letter-spacing: -0.05em; }
.text-gradient { background: linear-gradient(90deg, #FF6BCA, #3D78E0, #A4CD39); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle-editorial-center { font-family: "Inter", sans-serif; font-weight: 800; font-size: 1.1rem; color: #000; max-width: 650px; margin: 30px auto 0; line-height: 1.4; text-transform: uppercase; }
.divider-center { width: 140px; height: 12px; background: #000; margin: 40px auto 0; }

.cards-section-container { max-width: 1300px; margin: 0 auto; position: relative; padding: 0 40px; }
.map-path-complex-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0.08; }

.grid-layout-2x2 { position: relative; z-index: 10; display: grid; grid-template-columns: repeat(2, 460px); gap: 3rem; justify-content: center; }

.track-magazine-card-fixed {
  width: 460px; height: 620px; 
  background: #FFFFFF; border: 4px solid #1C1C1C; border-radius: 4rem;
  padding: 40px; box-shadow: 12px 12px 0px #1C1C1C;
  display: flex; flex-direction: column; transition: 0.3s; overflow: hidden;
}
.track-magazine-card-fixed:hover { transform: translate(-4px, -4px); box-shadow: 18px 18px 0px #1C1C1C; }

/* HIERARQUIA INTERNA E BADGES LADO A LADO */
.card-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; }
.pill-group { display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: nowrap; }

.badge-pill { 
  display: inline-flex; align-items: center; justify-content: center;
  padding: 6px 16px; border-radius: 9999px; 
  font-weight: 900; font-size: 10px; 
  border: 2px solid #1C1C1C; text-transform: uppercase; 
  color: #FFFFFF !important; height: 32px; 
}
.cert-green { background: #10b981; }

.time-info { font-weight: 900; font-size: 13px; color: #000; display: flex; align-items: center; gap: 6px; }

.card-content-fixed { flex-grow: 1; display: flex; flex-direction: column; }
.title-container-fixed { min-height: 80px; display: flex; align-items: center; }
.track-name { font-family: "Archivo Black", sans-serif; font-size: 1.8rem; line-height: 1.1; color: #000; text-transform: uppercase; }

.desc-container-fixed { min-height: 80px; margin-bottom: 20px; }
.track-description { font-family: "Georgia", serif; font-size: 1.05rem; color: #000; line-height: 1.5; }

.path-label { font-family: "Archivo Black", sans-serif; font-weight: 900; font-size: 10px; color: #000; letter-spacing: 2px; margin-bottom: 15px; }
.steps-stack { display: flex; flex-direction: column; gap: 12px; }
.step-row { display: flex; align-items: center; gap: 12px; }
.step-bullet { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #1C1C1C; display: flex; align-items: center; justify-content: center; font-family: "Archivo Black"; font-size: 12px; flex-shrink: 0; }
.step-name { font-family: "Inter", sans-serif; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: #000; }

.card-action { margin-top: auto; display: flex; justify-content: center; padding-top: 20px; }
.pill-btn-action { width: 100%; max-width: 320px; padding: 18px; border-radius: 9999px; border: 3px solid #1C1C1C; font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.9rem; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: 0.3s; box-shadow: 4px 4px 0px #1C1C1C; }
.pill-btn-action:hover { transform: scale(1.05); box-shadow: 0px 0px 0px #1C1C1C; }

.footer-spacer { height: 200px; }
.fade-in-up { opacity: 0; transform: translateY(30px); animation: fadeInUp 1s forwards; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .grid-layout-2x2 { grid-template-columns: 1fr; width: 100%; max-width: 460px; }
  .track-magazine-card-fixed { height: auto; min-height: 620px; }
  .map-path-complex-layer { display: none; }
}
</style>