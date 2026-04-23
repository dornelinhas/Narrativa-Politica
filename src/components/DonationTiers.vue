<script setup>
import { ref } from 'vue'
import { Heart, Target, Users, Zap } from 'lucide-vue-next'

const tiers = [
  {
    id: 1,
    value: '50',
    title: 'APOIO DE BASE',
    impact: 'Paga 1 hora de consultoria estratégica para uma líder comunitária em território de vulnerabilidade.',
    icon: Users,
    color: '#FFE65A'
  },
  {
    id: 2,
    value: '150',
    title: 'MOBILIZAÇÃO',
    impact: 'Financia a bolsa de estudos de 1 aluna em nossas trilhas de formação política e advocacy.',
    icon: Target,
    color: '#FF6BCA'
  },
  {
    id: 3,
    value: '500',
    title: 'IMPACTO ESTRUTURAL',
    impact: 'Viabiliza a produção técnica de 1 relatório de dados sobre desigualdade de gênero em sua região.',
    icon: Zap,
    color: '#A4CD39'
  }
]

const showToast = ref(false)
const toastMessage = ref('')

const handleDonate = (tier) => {
  toastMessage.value = `Doação de R$ ${tier.value} selecionada!`
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}
</script>

<template>
  <div class="donation-tiers-wrapper">
    <div v-for="tier in tiers" :key="tier.id" class="tier-card shadow-solid" :style="{ '--hover-color': tier.color }">
      <div class="tier-header">
        <component :is="tier.icon" :size="32" class="tier-icon" />
        <span class="tier-label">{{ tier.title }}</span>
      </div>
      <div class="tier-value">
        <span class="currency">R$</span>
        <span class="amount">{{ tier.value }}</span>
      </div>
      <p class="tier-impact">{{ tier.impact }}</p>
      <button class="btn-donate-tier" @click="handleDonate(tier)">DOAR ESTE VALOR →</button>
    </div>
    
    <transition name="toast">
      <div v-if="showToast" class="toast-brutal">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<style scoped>
.donation-tiers-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
}

.tier-card {
  background: #FFF;
  border: 4px solid #1C1C1C;
  padding: 40px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tier-card:hover {
  transform: translate(-8px, -8px);
  box-shadow: 12px 12px 0px var(--hover-color);
  border-color: #1C1C1C;
}

.tier-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.tier-icon { color: #1C1C1C; }

.tier-label {
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0.5;
}

.tier-value {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 20px;
  color: #1C1C1C;
}

.currency { font-family: 'Archivo Black'; font-size: 1.5rem; }
.amount { font-family: 'Archivo Black'; font-size: 4rem; line-height: 1; }

.tier-impact {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #1C1C1C;
  opacity: 0.8;
  margin-bottom: 40px;
  flex-grow: 1;
}

.btn-donate-tier {
  background: #1C1C1C;
  color: #FFF;
  border: none;
  padding: 15px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;
}

.tier-card:hover .btn-donate-tier {
  background: var(--hover-color);
  color: #1C1C1C;
}

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

@media (max-width: 1024px) {
  .donation-tiers-wrapper { grid-template-columns: 1fr; }
}
</style>