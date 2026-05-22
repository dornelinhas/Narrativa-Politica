<script setup>
import { ref, computed } from 'vue'
import DonationTiers from '../components/DonationTiers.vue'
import { siteContent } from '../store/content'
import { Heart, Target, Users, Zap, TrendingUp, Mail, ArrowRight } from 'lucide-vue-next'

const isMonthly = ref(true)
const donateConfig = computed(() => siteContent.donateConfig || {})

const showToast = ref(false)
const toastMessage = ref('')
</script>

<template>
  <div class="apoie-page-v4 bg-surface-container min-h-screen font-body-md">
    <div class="noise-bg-fixed"></div>
    
    <!-- HERO STRATEGIC -->
    <header class="apoie-hero section-padding border-b-thick bg-white relative overflow-hidden">
       <div class="container-max grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div class="hero-text-side">
             <span class="tag-solid bg-vermelho text-white mb-6 rotate-neg-2">FINANCIE O IMPACTO</span>
             <h1 class="display-xl mb-8 leading-none tracking-tighter uppercase font-black">
                {{ donateConfig.headlinePart1 || 'INVESTIR NA' }} 
                <span class="text-rosa">{{ donateConfig.headlinePart2 || 'NARRATIVA' }}</span> É INVESTIR NA MUDANÇA.
             </h1>
             <p class="body-lg text-variant mb-12 max-w-xl font-bold leading-relaxed opacity-70">
                {{ donateConfig.sub || 'Sua contribuição sustenta nossa inteligência política, curadoria de oportunidades e formação de novas lideranças.' }}
             </p>
             
             <!-- TOGGLE FIXED -->
             <div class="donation-toggle-v3 flex items-center gap-6 mb-8 bg-gray-100 p-4 border-2 border-primary inline-flex">
                <span class="font-black text-xs uppercase" :class="{ 'opacity-20': isMonthly }">{{ donateConfig.toggleLabelSingle || 'Única' }}</span>
                <button @click="isMonthly = !isMonthly" class="toggle-switch-brutal" :class="{ active: isMonthly }">
                   <div class="toggle-knob"></div>
                </button>
                <span class="font-black text-xs uppercase" :class="{ 'opacity-20': !isMonthly }">{{ donateConfig.toggleLabelMonthly || 'Mensal' }}</span>
             </div>
          </div>
          
          <div class="hero-visual-side hidden md:block">
             <div class="image-stack-collage relative h-[500px]">
                <div class="brutal-frame-1 absolute inset-0 bg-white border-thick paper-shadow rotate-3">
                   <img src="https://images.unsplash.com/photo-1540910419892-f7e722a49268?w=800&q=80" class="w-full h-full object-cover halftone" />
                </div>
                <div class="absolute -bottom-8 -left-8 bg-amarelo border-thick p-4 rotate-neg-6 shadow-brutal font-black text-xl uppercase tracking-tighter">
                   Impacto Real
                </div>
             </div>
          </div>
       </div>
    </header>

    <!-- TIERS SECTION -->
    <section class="section-padding bg-surface-container border-b-thick">
       <div class="container-max">
          <div class="text-center mb-16">
             <h2 class="display-md inline-block border-b-thick pb-4 uppercase">Escolha seu nível de impacto</h2>
          </div>
          <DonationTiers />
       </div>
    </section>

    <!-- CUSTOM AMOUNT & STATS OVERHAUL -->
    <section class="section-padding bg-white">
       <div class="container-max">
          <div class="grid lg:grid-cols-12 gap-16 items-stretch">
             
             <!-- Outro Valor -->
             <div class="lg:col-span-5 bg-amarelo border-thick p-12 shadow-brutal flex flex-col justify-center">
                <h3 class="display-md mb-6 uppercase leading-tight font-black">QUER APOIAR COM OUTRO VALOR?</h3>
                <p class="body-md mb-10 font-bold opacity-60">Qualquer quantia faz a diferença na manutenção da nossa infraestrutura digital.</p>
                
                <div class="input-brutal-group flex items-center border-thick bg-white mb-8 overflow-hidden">
                   <span class="px-6 font-black text-2xl bg-gray-100 border-r-thick h-full flex items-center">R$</span>
                   <input type="number" placeholder="0,00" class="flex-1 py-6 px-4 text-3xl font-black outline-none border-none bg-white" />
                </div>
                
                <button @click="showToast = true; toastMessage = 'Redirecionando...'; setTimeout(() => showToast = false, 2000)" class="btn-brutal btn-preto w-full py-6 text-xl font-black uppercase tracking-widest flex items-center justify-center gap-4">
                   CONTRIBUIR AGORA <ArrowRight :size="24" />
                </button>
             </div>

             <!-- Impact Stats - No full width bars, clean grid -->
             <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-1 gap-8">
                <div v-for="(stat, key) in [
                   { label: donateConfig.statsLeaders || '2.500+ LÍDERES', desc: 'Formados em programas de incidência política territorial.', icon: Users, bg: 'bg-azul', color: 'text-white' },
                   { label: donateConfig.statsCampaigns || '10+ CAMPANHAS', desc: 'Apoiadas tecnicamente com dados e estratégias de advocacy.', icon: TrendingUp, bg: 'bg-rosa', color: 'text-white' },
                   { label: donateConfig.statsReports || '80+ RELATÓRIOS', desc: 'De inteligência política produzidos para o terceiro setor.', icon: Zap, bg: 'bg-verde', color: 'text-preto' }
                ]" :key="key" class="stat-impact-card flex items-center gap-8 bg-white border-thick p-8 hover:bg-gray-50 transition-all group shadow-solid">
                   <div class="w-20 h-20 flex-shrink-0 border-thick flex items-center justify-center text-4xl shadow-small group-hover:scale-110 transition-transform" :class="stat.bg">
                      <component :is="stat.icon" :size="40" :class="stat.color" />
                   </div>
                   <div class="flex-1">
                      <div class="text-3xl font-black uppercase tracking-tighter mb-1">{{ stat.label }}</div>
                      <p class="body-md font-bold opacity-40 uppercase tracking-wide text-xs leading-snug">{{ stat.desc }}</p>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </section>

    <!-- FINAL CTA / NEWSLETTER -->
    <section class="section-padding bg-azul border-y-thick">
       <div class="container-max">
          <div class="nl-premium-card paper-shadow-lg border-thick">
             <div class="nl-brand-side bg-preto text-white relative">
                <div class="nl-texture-overlay"></div>
                <div class="nl-brand-content relative z-10">
                   <span class="tag-solid bg-amarelo text-preto mb-8 rotate-neg-2">COMUNIDADE NP</span>
                   <h2 class="display-lg uppercase mb-4 leading-tight text-white">{{ donateConfig.cardTitle || 'GOSTOU DAS NOSSAS ANÁLISES?' }}</h2>
                   <p class="body-md font-bold mb-8 text-white">Receba a Newsletter Narrativa mensalmente na sua caixa de entrada. Junte-se à nossa rede de mobilização. Sem spam.</p>
                </div>
             </div>
             <div class="nl-action-side bg-white text-preto">
                <div class="nl-action-inner w-full">
                   <h3 class="headline-md text-preto uppercase mb-8">Newsletter Narrativa</h3>
                   <router-link to="/arquivo-newsletter" class="btn-brutal btn-preto w-full py-5 text-center text-xl font-black uppercase flex items-center justify-center gap-4 hover-white-shadow shadow-brutal">
                      LER A NEWSLETTER <ArrowRight :size="24" />
                   </router-link>
                   <p class="text-xs font-black uppercase text-preto mt-6 text-center">Conexão direta com a inteligência política</p>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- TOAST -->
    <transition name="toast">
       <div v-if="showToast" class="success-toast bg-black text-white border-thick p-6 fixed bottom-10 right-10 z-[1000] shadow-brutal">
          <div class="flex items-center gap-4">
             <div class="w-8 h-8 bg-verde rounded-full flex items-center justify-center text-black">
                <CheckCircle :size="16" />
             </div>
             <span class="font-black uppercase tracking-widest text-xs">{{ toastMessage }}</span>
          </div>
       </div>
    </transition>

  </div>
</template>

<style scoped>
.apoie-page-v4 { position: relative; overflow-x: hidden; }
.noise-bg-fixed { position: fixed; inset: 0; pointer-events: none; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); z-index: 1; }
.container-max { max-width: 1200px; margin: 0 auto; }
.section-padding { padding: 100px 0; }
.rotate-neg-2 { transform: rotate(-2deg); display: inline-block; }

/* TOGGLE V3 */
.toggle-switch-brutal {
  width: 64px; height: 32px; background: white; border: 3px solid var(--np-black);
  border-radius: 999px; position: relative; cursor: pointer; transition: all 0.3s;
}
.toggle-switch-brutal.active { background: var(--np-rosa); }
.toggle-knob {
  position: absolute; top: 3px; left: 4px; width: 20px; height: 20px;
  background: var(--np-black); border-radius: 50%; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toggle-switch-brutal.active .toggle-knob { left: 34px; background: white; }

/* IMPACT CARDS */
.stat-impact-card { transition: all 0.3s ease; }
.stat-impact-card:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0 var(--np-black); }

/* NEWSLETTER CARD */
.border-l-thick { border-left: 4px solid var(--np-black); }
@media (max-width: 767px) {
  .border-primary-desktop { border-left: none; border-top: 4px solid var(--np-black); }
}

.shadow-brutal { box-shadow: 10px 10px 0 var(--np-black); }
.halftone { filter: grayscale(1); mix-blend-mode: multiply; }

/* TOAST */
.success-toast { min-width: 300px; transform: translateY(0); animation: toastIn 0.4s ease-out; }
@keyframes toastIn { from { opacity: 0; transform: translateY(100px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .display-xl { font-size: 56px; }
  .display-lg { font-size: 44px; }
}
</style>