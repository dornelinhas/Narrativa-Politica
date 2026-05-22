<template>
  <div class="about-page-v4 bg-creme min-h-screen font-body-md">
    <div class="noise-bg-fixed"></div>
    
    <div class="container-max section-padding">
      <!-- VOLTAR AO INICIO -->
      <router-link to="/" class="btn-back-brutal mb-16">
        <span class="material-symbols-outlined">arrow_back</span> VOLTAR PARA O INÍCIO
      </router-link>
      
      <!-- HERO -->
      <header class="about-hero-v4 border-b-thick pb-16 mb-16">
        <div class="flex flex-col items-start">
           <span class="tag-solid bg-preto text-white mb-8 rotate-neg-2">● QUEM SOMOS</span>
           <h1 class="display-xl text-preto uppercase leading-none">
             {{ siteContent.about?.heroTitlePart1 || 'IDEIAS QUE' }} <br/>
             <span class="text-rosa">{{ siteContent.about?.heroTitlePart2 || 'MOVEM ESTRUTURAS' }}</span>
           </h1>
           <p class="body-lg text-variant mt-8 max-w-xl font-bold leading-relaxed">
             {{ siteContent.about?.subtitle || 'Estratégia focada em traduzir teoria econômica para a ação política no território.' }}
           </p>
        </div>
      </header>

      <!-- CONTENT GRID -->
      <div class="about-grid-v4">
        
        <!-- SIDEBAR -->
        <aside class="about-sidebar-v4">
          <div class="card-editorial bg-white paper-shadow p-8 border-thick relative">
            <div class="accent-bar-top bg-amarelo"></div>
            
            <div class="profile-photo-v4 halftone border-thick mb-8 overflow-hidden">
              <img :src="siteContent.about?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'" alt="Anne Dornelas" class="w-full h-full object-cover" />
            </div>
            
            <div class="profile-info-v4 text-center">
              <h2 class="headline-md m-0 uppercase font-black">{{ siteContent.about?.name || 'ANNE DORNELAS' }}</h2>
              <p class="label-bold opacity-40 mt-4 tracking-widest">{{ siteContent.about?.role || 'ESTRATEGISTA POLÍTICA' }}</p>
              
              <div class="flex justify-center gap-4 mt-8">
                 <a href="#" class="icon-btn-brutal"><Linkedin :size="20" /></a>
                 <a href="#" class="icon-btn-brutal"><Instagram :size="20" /></a>
                 <a href="#" class="icon-btn-brutal"><Mail :size="20" /></a>
              </div>

              <router-link v-if="siteContent.settings?.menuProjects !== false" to="/projetos" class="btn-brutal btn-amarelo w-full mt-10 uppercase font-black">
                VER PROJETOS →
              </router-link>
            </div>
          </div>
        </aside>

        <!-- MAIN -->
        <div class="about-main-v4 space-y-12">
           <!-- TRAJETÓRIA -->
           <section class="card-editorial bg-white paper-shadow p-12 border-thick relative">
              <div class="accent-bar-top bg-rosa"></div>
              <h3 class="label-bold text-vermelho mb-8 uppercase tracking-widest">TRAJETÓRIA & VISÃO</h3>
              <div class="body-lg bio-prose" v-html="sanitizeHtml(formatBio(siteContent.about?.bioInstitucional || defaultBio))"></div>
           </section>

           <!-- EXPERTISE -->
           <section class="card-editorial bg-white paper-shadow p-12 border-thick relative">
              <div class="accent-bar-top bg-azul"></div>
              <h3 class="label-bold text-azul mb-10 uppercase tracking-widest">ÁREAS DE EXPANSÃO</h3>
              <div class="expertise-grid-v4">
                 <div v-for="(skill, index) in expertiseList" :key="skill" class="skill-tag-v4 border-thick p-6 flex flex-col items-center justify-center text-center font-black uppercase text-sm bg-creme hover:bg-amarelo transition-colors">
                    <div class="accent-dot mb-4" :class="'bg-' + getColorClass(index)"></div>
                    {{ skill }}
                 </div>
              </div>
           </section>
        </div>

      </div>

      <!-- CTA -->
      <section class="mt-32">
        <div class="nl-premium-card paper-shadow-lg border-thick">
           <div class="nl-brand-side bg-amarelo text-preto">
              <div class="nl-brand-content">
                 <div class="flex items-center gap-4 mb-8">
                    <Zap class="text-preto" :size="32" />
                    <span class="tag-solid bg-preto text-white">CONEXÃO DE IMPACTO</span>
                 </div>
                 <h2 class="display-lg text-preto uppercase leading-tight m-0" v-html="sanitizeHtml(siteContent.about?.ctaTitle || 'VAMOS CONSTRUIR <br/> ALGO JUNTOS?')"></h2>
                 <p class="body-lg text-preto mt-8 max-w-xl font-bold">
                    {{ siteContent.about?.ctaDesc || 'Criamos infraestruturas que permitem aos movimentos pautarem o debate público com autonomia.' }}
                 </p>
              </div>
           </div>
           <div class="nl-action-side bg-preto text-white">
              <div class="nl-action-inner items-center justify-center w-full">
                 <router-link to="/contatos" class="btn-brutal btn-amarelo px-12 py-6 text-xl font-black uppercase shadow-white w-full text-center hover:bg-white hover:text-preto">
                    {{ siteContent.about?.ctaBtn || 'FALAR AGORA →' }}
                 </router-link>
                 <p class="text-[10px] font-black uppercase text-white opacity-40 mt-6 text-center">Agenda aberta para parcerias estratégicas</p>
              </div>
           </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { siteContent } from '../store/content'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { Linkedin, Instagram, Mail, Zap } from 'lucide-vue-next'

const getColorClass = (index) => {
  const colors = ['vermelho', 'verde', 'amarelo', 'rosa', 'azul', 'lilas']
  return colors[index % colors.length]
}

const defaultExpertise = ['Análise Econométrica', 'Advocacy de Gênero', 'Estratégia de Impacto Social', 'Articulação Política', 'Comunicação Estratégica', 'Pesquisa de Território']
const expertiseList = computed(() => siteContent.about?.expertise?.split(',').map(s => s.trim()) || defaultExpertise)

const defaultBio = "Sou uma estrategista focada em traduzir teoria econômica para a ação política. Nos últimos anos, dediquei minha carreira a construir pontes entre dados quantitativos rigorosos e as necessidades urgentes de movimentos sociais."
const formatBio = (text) => text.split('\n\n').map(p => `<p class="mb-6">${p}</p>`).join('')

onMounted(() => window.scrollTo(0, 0))
</script>

<style scoped>
.about-page-v4 { position: relative; overflow-x: hidden; }
.noise-bg-fixed { position: fixed; inset: 0; pointer-events: none; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); z-index: 1; }

.container-max { max-width: 1200px; margin: 0 auto; }
.section-padding { padding: 100px 32px; }

.btn-back-brutal {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--np-black);
  color: white;
  padding: 14px 28px;
  border: var(--border-thick);
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 6px 6px 0 var(--np-amarelo);
}
.btn-back-brutal:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--np-amarelo); }

/* GRID */
.about-grid-v4 { display: grid; grid-template-columns: 360px 1fr; gap: 80px; align-items: start; }
.about-sidebar-v4 { position: sticky; top: 120px; }

.profile-photo-v4 { 
  aspect-ratio: 1/1.2; 
  background: #000; 
  width: 100%;
  border: 4px solid var(--np-black);
}
.profile-photo-v4 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.icon-btn-brutal {
  width: 44px; height: 44px; border: 2px solid var(--np-black);
  display: flex; align-items: center; justify-content: center;
  color: var(--np-black); transition: all 0.2s;
  background: white;
}
.icon-btn-brutal:hover { background: var(--np-black); color: white; transform: translateY(-4px); box-shadow: 4px 4px 0 var(--np-rosa); }

.expertise-grid-v4 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.skill-tag-v4 { 
  position: relative; 
  min-height: 120px;
  box-shadow: 6px 6px 0 var(--np-black);
  background: white;
  transition: all 0.2s;
}
.skill-tag-v4:hover {
  transform: translate(-3px, -3px);
  box-shadow: 10px 10px 0 var(--np-black);
  background: var(--np-amarelo);
}
.accent-dot { width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--np-black); }

.bio-prose :deep(p) { line-height: 1.8; color: var(--np-black); font-weight: 700; font-size: 1.1rem; }

.shadow-white { box-shadow: 8px 8px 0 white; }

.bg-vermelho { background: var(--np-vermelho); }
.bg-verde { background: var(--np-verde); }
.bg-amarelo { background: var(--np-amarelo); }
.bg-rosa { background: var(--np-rosa); }
.bg-azul { background: var(--np-azul); }
.bg-lilas { background: var(--np-lilas); }

.bio-prose :deep(p) { line-height: 1.8; color: var(--np-black); font-weight: 500; }

@media (max-width: 1023px) {
  .about-grid-v4 { grid-template-columns: 1fr; gap: 64px; }
  .about-sidebar-v4 { position: relative; top: 0; max-width: 440px; margin: 0 auto; }
  .display-xl { font-size: 60px; }
}

@media (max-width: 768px) {
  .expertise-grid-v4 { grid-template-columns: 1fr; }
  .section-padding { padding: 64px 20px; }
  .display-xl { font-size: 48px; }
}
</style>
