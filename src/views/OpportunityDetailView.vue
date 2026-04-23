<template>
  <div v-if="op" class="op-magazine-layout">
    <!-- FUNDO TEXTURIZADO PREMIUM -->
    <div class="film-grain-overlay"></div>

    <div class="container-mag">
      
      <header class="detail-top-nav">
        <router-link to="/oportunidades" class="back-link-mag">
          <ArrowLeft :size="16" /> {{ siteContent.opportunitiesConfig?.detailBackBtn || 'PORTAL DE TALENTOS' }}
        </router-link>
      </header>

      <div class="magazine-columns-grid">
        
        <!-- CONTEÚDO -->
        <main class="content-area fade-in-up">
          <div class="cat-header mb-8">
            <span class="cat-pill" :style="{ backgroundColor: getCategoryColor(op.category) }">
              {{ op.category }}
            </span>
          </div>

          <h1 class="huge-magazine-title mb-16">
            {{ op.title.toUpperCase() }}
          </h1>
          
          <div class="serif-magazine-desc">
            <div v-if="op.fullDescription" v-html="op.fullDescription"></div>
            <div v-else class="placeholder-content">
              <p class="editorial-intro">Convocatória estratégica para lideranças territoriais.</p>
              
              <div class="content-block-editorial">
                <h2 class="title-brutal">MISSÃO E IMPACTO</h2>
                <p>Infraestruturas para movimentos sociais que pautam o debate público com autonomia.</p>
              </div>

              <div class="content-block-editorial">
                <h2 class="title-brutal">RESPONSABILIDADES</h2>
                <ul class="mag-list">
                  <li>Advocacy regional e articulação de redes.</li>
                  <li>Relatórios técnicos de incidência.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-20">
            <a :href="op.link || '#'" target="_blank" class="pill-btn-black-matte">
              {{ siteContent.opportunitiesConfig?.detailApplyBtn || 'ACESSAR OPORTUNIDADE' }} <ExternalLink :size="18" />
            </a>
          </div>
        </main>

        <!-- SIDEBAR COM ÁREA DE CONTRATO (CARDS COLORIDOS) -->
        <aside class="sidebar-area fade-in-up" style="animation-delay: 0.2s">
          <div class="sticky-info-card-brutal">
            <div class="status-indicator-lime">
              <div class="pulse"></div>
              <span>{{ siteContent.opportunitiesConfig?.detailStatusBadge || 'INSCRIÇÕES ABERTAS' }}</span>
            </div>

            <!-- ÁREA DE CONTRATO COM CARDS SEPARADOS -->
            <div class="contract-info-cards mt-8">
              <div class="info-mini-card pink-card">
                <span class="l">PRAZO</span>
                <span class="v text-red">{{ op.deadline }}</span>
              </div>
              <div class="info-mini-card blue-card">
                <span class="l">LOCAL</span>
                <span class="v">{{ op.location || 'Nacional' }}</span>
              </div>
              <div class="info-mini-card yellow-card">
                <span class="l">MODELO</span>
                <span class="v">Híbrido / CLT</span>
              </div>
            </div>
            
            <a :href="op.link || '#'" target="_blank" class="btn-action-brutal mt-10">
              {{ siteContent.opportunitiesConfig?.detailApplyBtn || 'CANDIDATAR-SE' }}
            </a>
          </div>

          <div class="share-box-mag text-center">
            <span class="s-label">{{ siteContent.opportunitiesConfig?.detailShareTitle || 'COMPARTILHAR' }}</span>
            <div class="s-row">
              <button class="circle-s-btn" @click="copyLink"><Link :size="14" /></button>
              <button class="circle-s-btn"><Linkedin :size="14" /></button>
              <button class="circle-s-btn"><MessageCircle :size="14" /></button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { ArrowLeft, ExternalLink, Linkedin, MessageCircle, Link } from 'lucide-vue-next'

const route = useRoute()
const op = computed(() => siteContent.opportunities?.find(o => String(o.id) === String(route.params.id)) || {
  id: 1, title: 'Bolsa de Pesquisa', category: 'Bolsas', deadline: '25 MAI', location: 'Remoto'
})

const getCategoryColor = (cat) => ({ 'Gênero': '#FF6BCA', 'Clima': '#A4CD39', 'Internacional': '#3D78E0', 'Editais': '#FFE65A', 'Urgente': '#DF2028', 'Vagas de Emprego': '#FFE65A', 'Vagas': '#FFE65A' }[cat] || '#FFE65A')
const copyLink = () => { navigator.clipboard.writeText(window.location.href); alert('Link copiado!') }
</script>

<style scoped>
.op-magazine-layout { min-height: 100vh; background-color: #FFFFFF; position: relative; overflow-x: hidden; }

.film-grain-overlay {
  position: fixed; inset: 0; z-index: 5; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.container-mag { max-width: 1200px; margin: 0 auto; padding: 180px 2rem 140px 2rem; position: relative; z-index: 10; }
.back-link-mag { display: inline-flex; align-items: center; gap: 8px; font-weight: 900; font-size: 11px; color: #000; text-decoration: none; opacity: 0.4; margin-bottom: 40px; }

.magazine-columns-grid { display: grid; grid-template-columns: 1fr 380px; gap: 100px; }
.sidebar-area { position: sticky; top: 140px; align-self: start; }

.cat-pill { padding: 8px 18px; font-weight: 900; font-size: 11px; border-radius: 6px; text-transform: uppercase; color: #000 !important; border: 2px solid #000; box-shadow: 3px 3px 0px #000; }
.huge-magazine-title { font-family: "Archivo Black", sans-serif; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 0.9; color: #000; letter-spacing: -0.05em; }

.serif-magazine-desc { font-family: "Georgia", serif; font-size: 1.35rem; line-height: 1.8; color: #1e293b; }
.editorial-intro { font-size: 1.6rem; font-weight: 800; color: #000; margin-bottom: 4rem; border-left: 6px solid #A4CD39; padding-left: 2.5rem; }

.content-block-editorial { margin-bottom: 4rem; }
.title-brutal { font-family: "Archivo Black", sans-serif; font-size: 1.25rem; margin-bottom: 1.5rem; text-transform: uppercase; }
.mag-list { list-style: none; padding: 0; }
.mag-list li { position: relative; padding-left: 2.5rem; margin-bottom: 1.5rem; font-weight: 600; font-size: 1.2rem; }
.mag-list li::before { content: "→"; position: absolute; left: 0; color: #FF6BCA; font-weight: 900; }

.pill-btn-black-matte { display: inline-flex; align-items: center; gap: 15px; background: #1C1C1C; color: #FFF; padding: 1.5rem 3.5rem; border-radius: 9999px; font-weight: 900; font-size: 14px; text-decoration: none; text-transform: uppercase; transition: 0.3s; }
.pill-btn-black-matte:hover { background: #DF2028; transform: scale(1.05); }

.sticky-info-card-brutal { background: white; border: 4px solid #000; border-radius: 3rem; padding: 3rem; box-shadow: 12px 12px 0px #000; }

/* BADGE LIMA VIBRANTE */
.status-indicator-lime { display: flex; align-items: center; gap: 10px; background: #A4CD39; color: #000; padding: 12px 20px; border-radius: 9999px; font-weight: 900; font-size: 11px; justify-content: center; border: 2px solid #000; }
.pulse { width: 10px; height: 10px; background: #000; border-radius: 50%; animation: pulse 2s infinite; }

/* CARDS DE CONTRATO COLORIDOS */
.contract-info-cards { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; margin-bottom: 40px; }
.info-mini-card { padding: 15px 20px; border: 3px solid #1C1C1C; border-radius: 1.2rem; display: flex; flex-direction: column; }
.info-mini-card .l { font-size: 9px; font-weight: 900; color: #1C1C1C; opacity: 0.6; letter-spacing: 0.1em; }
.info-mini-card .v { font-family: "Archivo Black", sans-serif; font-size: 1.2rem; }
.pink-card { background: #FF6BCA22; border-color: #FF6BCA; }
.blue-card { background: #3D78E022; border-color: #3D78E0; }
.yellow-card { background: #FFE65A22; border-color: #FFE65A; }

.btn-action-brutal { display: flex; align-items: center; justify-content: center; background: #000; color: white; padding: 1.5rem; border-radius: 9999px; font-weight: 900; font-size: 14px; text-decoration: none; text-transform: uppercase; transition: 0.3s; width: 100%; border: none; cursor: pointer; }
.btn-action-brutal:hover { background: #FF6BCA; transform: translateY(-4px); }

/* COMPARTILHAMENTO */
.share-box-mag { margin-top: 60px; text-align: center; }
.s-label { display: block; font-family: "Archivo Black", sans-serif; font-size: 12px; letter-spacing: 0.1em; color: #000; margin-bottom: 20px; }
.s-row { display: flex; justify-content: center; align-items: center; gap: 16px; }

.circle-s-btn { width: 48px; height: 48px; border-radius: 50%; border: 3px solid #000; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #000; transition: 0.3s; }
.circle-s-btn:hover { transform: translateY(-4px); box-shadow: 4px 4px 0px #000; background: #FF6BCA; color: white; }

@keyframes pulse { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.2); opacity: 0.5; } 100% { transform: scale(0.95); opacity: 1; } }

@media (max-width: 1024px) { .magazine-columns-grid { grid-template-columns: 1fr; } .sidebar-area { order: -1; } }
</style>