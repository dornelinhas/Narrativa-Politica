<script setup>
import { ref, computed } from 'vue'
import DonationTiers from '../components/DonationTiers.vue'
import { siteContent } from '../store/content'

const isMonthly = ref(true)
const donateConfig = computed(() => siteContent.donateConfig || {})

const showToast = ref(false)
const toastMessage = ref('')
</script>

<template>
  <div class="apoie-page grid-bg-light">
    <div class="page-content container">
      
      <!-- HEADER ESTRATÉGICO -->
<header class="donation-header mb-16">
  <h1 class="donation-headline-brutal">
    {{ donateConfig.headlinePart1 }} 
    <span class="text-magenta">{{ donateConfig.headlinePart2?.split(' ')[0] || '' }}</span>
    <span class="text-lime" v-if="donateConfig.headlinePart2?.split(' ').length > 1"> {{ donateConfig.headlinePart2?.substring(donateConfig.headlinePart2.indexOf(' ') + 1) }}</span>.
  </h1>
  <p class="donation-sub">
    {{ donateConfig.sub }}
  </p>
  <div class="donation-toggle-row mt-10">
    <span class="toggle-label" :class="{ opacity: isMonthly }">{{ donateConfig.toggleLabelSingle }}</span>
    <div class="toggle shadow-solid" :class="{ active: isMonthly }" @click="isMonthly = !isMonthly" aria-label="Alternar modo de doação">
      <div class="toggle-knob"></div>
    </div>
    <span class="toggle-label" :class="{ opacity: !isMonthly }">{{ donateConfig.toggleLabelMonthly }}</span>
  </div>
</header>

      <!-- TIERS DE IMPACTO -->
      <DonationTiers />

      <!-- OUTROS VALORES -->
      <div class="other-amount-box shadow-solid mb-20">
        <h3 class="font-display text-2xl mb-6 uppercase">{{ donateConfig.otherAmountTitle || 'QUER APOIAR COM OUTRO VALOR?' }}</h3>
        <div class="custom-amount-row">
           <div class="input-wrapper-brutal">
              <span>R$</span>
              <input type="number" placeholder="0,00" />
           </div>
           <button class="btn-donate-custom" @click="showToast = true; toastMessage = 'Doação simulada enviada!'; setTimeout(() => showToast = false, 2000)">{{ donateConfig.buttonText || 'CONTRIBUIR AGORA' }} →</button>
           <transition name="toast">
             <div v-if="showToast" class="toast-brutal">{{ toastMessage }}</div>
           </transition>
        </div>
      </div>

      <!-- ESTATÍSTICAS DE IMPACTO -->
      <div class="stats-grid-brutal">
        <div class="stat-card-brutal shadow-solid">
          <div class="stat-icon-brutal bg-blue">👥</div>
          <div class="stat-content">
            <strong>{{ donateConfig.stats?.leaders || '2.500+ LÍDERES' }}</strong>
            <p>Formados em programas de incidência política territorial.</p>
          </div>
        </div>
        <div class="stat-card-brutal shadow-solid">
          <div class="stat-icon-brutal bg-magenta">📢</div>
          <div class="stat-content">
            <strong>{{ donateConfig.stats?.campaigns || '10+ CAMPANHAS' }}</strong>
            <p>Apoiadas tecnicamente com dados e estratégias de advocacy.</p>
          </div>
        </div>
        <div class="stat-card-brutal shadow-solid">
          <div class="stat-icon-brutal bg-lime">📊</div>
          <div class="stat-content">
            <strong>{{ donateConfig.stats?.reports || '80+ RELATÓRIOS' }}</strong>
            <p>De inteligência política produzidos para o terceiro setor.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.apoie-page { background: #f0ede8; min-height: 100vh; padding: 120px 0; }
.grid-bg-light { background-image: linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px); background-size: 50px 50px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.donation-header { text-align: center; max-width: 800px; margin: 0 auto 60px; }

.donation-headline-brutal { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); line-height: 0.9; letter-spacing: -3px; color: #1C1C1C; margin-bottom: 20px; text-transform: uppercase; }
.text-magenta { color: #FF6BCA; }
.text-lime { color: #A4CD39; }

.donation-sub { font-size: 1.25rem; font-weight: 700; color: #1C1C1C; opacity: 0.7; line-height: 1.4; }

/* TOGGLE BRUTAL */
.donation-toggle-row { display: flex; align-items: center; justify-content: center; gap: 20px; }
.toggle-label { font-family: 'Archivo Black'; font-size: 14px; letter-spacing: 1px; color: #1C1C1C; }
.toggle-label.opacity { opacity: 0.3; }
.toggle { width: 80px; height: 40px; background: #FFF; border: 4px solid #1C1C1C; border-radius: 999px; position: relative; cursor: pointer; }
.toggle.active { background: #FF6BCA; }
.toggle-knob { position: absolute; width: 28px; height: 28px; background: #1C1C1C; border-radius: 50%; top: 2px; left: 4px; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toggle.active .toggle-knob { left: 40px; background: #FFF; }
.shadow-solid { box-shadow: 8px 8px 0px #1C1C1C; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

/* Toast */
.toast-brutal { 
  position: fixed; 
  bottom: 80px; 
  right: 30px; 
  background: #1C1C1C; 
  color: #fff; 
  padding: 16px 32px; 
  border-radius: 12px; 
  font-family: 'Archivo Black', sans-serif; 
  font-size: 0.9rem; 
  box-shadow: 8px 8px 0 #FF6BCA; 
  z-index: 9999; 
  border: 3px solid #FFF;
}
.toast-enter-active { animation: toastIn .3s ease; }
.toast-leave-active { animation: toastOut .3s ease forwards; }
@keyframes toastIn { from { opacity: 0; transform: translateY(20px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-20px) scale(0.9); } }


/* OUTRO VALOR */
.other-amount-box { background: #FFF; border: 4px solid #1C1C1C; padding: 40px; text-align: center; }
.custom-amount-row { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; }
.input-wrapper-brutal { display: flex; align-items: center; background: #F1F5F9; border: 3px solid #1C1C1C; padding: 0 20px; border-radius: 12px; }
.input-wrapper-brutal span { font-family: 'Archivo Black'; margin-right: 10px; }
.input-wrapper-brutal input { background: transparent; border: none; padding: 15px 0; font-family: 'Archivo Black'; font-size: 1.5rem; width: 120px; outline: none; }
.btn-donate-custom { background: #A4CD39; color: #1C1C1C; border: 3px solid #1C1C1C; padding: 18px 30px; font-family: 'Archivo Black'; border-radius: 12px; cursor: pointer; transition: 0.2s; white-space: nowrap; }
.btn-donate-custom:hover { transform: translate(-4px, -4px); box-shadow: 4px 4px 0 #1C1C1C; }

/* STATS CARDS */
.stats-grid-brutal { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.stat-card-brutal { 
  background: #FFF; 
  border: 4px solid #1C1C1C; 
  padding: 30px; 
  display: flex; 
  align-items: center; 
  gap: 20px; 
  transition: all 0.3s ease;
  cursor: default;
}
.stat-card-brutal:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px #1C1C1C;
}
.stat-icon-brutal { width: 60px; height: 60px; border-radius: 15px; border: 3px solid #1C1C1C; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; transition: 0.3s; }
.stat-card-brutal:hover .stat-icon-brutal { transform: scale(1.1) rotate(5deg); }

.bg-blue { background: #3D78E0; }
.bg-magenta { background: #FF6BCA; }
.bg-lime { background: #A4CD39; }
.stat-content strong { font-family: 'Archivo Black'; font-size: 14px; color: #1C1C1C; display: block; margin-bottom: 5px; }
.stat-content p { font-size: 13px; font-weight: 700; opacity: 0.6; line-height: 1.3; }

@media (max-width: 900px) {
  .stats-grid-brutal { grid-template-columns: 1fr; }
  .donation-headline-brutal { font-size: 3rem; }
}
</style>