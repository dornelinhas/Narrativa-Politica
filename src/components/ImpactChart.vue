<template>
  <div class="brutalist-card impact-chart-module">
    <div class="chart-header">
      <div class="chart-info">
        <div class="chart-icon-wrap"><TrendingUp :size="24" /></div>
        <div class="chart-titles">
          <h3 class="font-display">Engajamento</h3>
          <p class="font-sans font-bold opacity-60">Métricas de impacto social</p>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE BRUTALISTA -->
    <div class="chart-area-empty">
      <div class="grid-pattern"></div>
      <div class="empty-message">
        <div class="geo-circle red-bg w-16 h-16 border-dark flex-center mb-6 mx-auto">
           <BarChart3 :size="32" class="text-white" />
        </div>
        <p class="font-sans font-black uppercase text-sm tracking-widest">Aguardando dados estruturais</p>
        <p class="font-sans font-bold opacity-50 text-xs mt-2">VOLUME INSUFICIENTE PARA ANÁLISE</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, BarChart3 } from 'lucide-vue-next'
</script>

<style scoped>
.impact-chart-module {
  background: white;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  margin-bottom: 30px;
}

.chart-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.chart-icon-wrap {
  width: 50px;
  height: 50px;
  background: var(--color-yellow);
  border: 3px solid var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark);
}

.chart-titles h3 { font-size: 1.6rem; line-height: 1; margin-bottom: 5px; }
.chart-titles p { font-size: 0.85rem; }

/* EMPTY STATE */
.chart-area-empty {
  flex: 1;
  min-height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border: 4px solid var(--color-dark);
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 30px 30px;
}

.empty-message {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-dark);
}

.flex-center { display: flex; align-items: center; justify-content: center; }
.red-bg { background: var(--color-red); }
.text-white { color: white; }
.geo-circle { border-radius: 50%; }
.border-dark { border: 3px solid var(--color-dark); }
.w-16 { width: 4rem; }
.h-16 { height: 4rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-2 { margin-top: 0.5rem; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.tracking-widest { letter-spacing: 0.1em; }
</style>