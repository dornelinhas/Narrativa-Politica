<template>
  <div class="impact-chart-vibrant">
    <div class="chart-header-vibrant">
      <div class="chart-info">
        <div class="chart-icon-wrap"><TrendingUp :size="20" /></div>
        <div class="chart-titles">
          <h3>Projeção de Engajamento</h3>
          <p>Métricas de alcance em tempo real</p>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE PROFISSIONAL -->
    <div class="chart-area-empty">
      <div class="grid-background"></div>
      <div class="empty-message">
        <BarChart3 :size="48" class="empty-icon" />
        <p>Aguardando volume de dados suficientes <br>para gerar as análises.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, BarChart3 } from 'lucide-vue-next'
</script>

<style scoped>
.impact-chart-vibrant {
  background: #fff;
  border-radius: 28px;
  padding: 40px;
  color: #111827;
  border: 1.5px solid #F1F5F9;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chart-header-vibrant {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.chart-icon-wrap {
  width: 44px;
  height: 44px;
  background: rgba(255,45,85,0.1);
  color: #FF2D55;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.chart-titles h3 { font-size: 1.4rem; font-weight: 900; margin-bottom: 4px; letter-spacing: -0.5px; color: #111827; }
.chart-titles p { color: #64748B; font-size: 0.9rem; font-weight: 600; }

/* EMPTY STATE */
.chart-area-empty {
  flex: 1;
  min-height: 250px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
  border-radius: 20px;
  border: 1px dashed #E5E7EB;
  overflow: hidden;
}

.grid-background {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.empty-message {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #94A3B8;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
  color: #FF2D55;
}

.empty-message p {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}
</style>