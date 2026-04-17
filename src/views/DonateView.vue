<template>
  <div class="donate-premium-view">
    <!-- HERO SECTION -->
    <header class="donate-hero">
      <div class="container-narrow text-center">
        <span class="eyebrow-brand">Investimento Social</span>
        <h1 class="main-title">Apoie a <span class="gradient-text">Narrativa Política.</span></h1>
        <p class="main-subtitle">{{ siteContent.settings.donationText }}</p>
      </div>
    </header>

    <!-- GRID PRINCIPAL -->
    <section class="donate-grid-section">
      <div class="container donate-main-grid">
        
        <!-- COLUNA ESQUERDA: POR QUE APOIAR -->
        <div class="impact-narrative">
          <h2 class="section-label">Por que apoiar?</h2>
          
          <div class="impact-items-stack">
            <div v-for="(cause, index) in donationCauses" :key="cause.id" class="impact-item-card">
              <div class="item-icon-circle" :class="colorClasses[index % colorClasses.length]">
                <component :is="iconMap[cause.icon] || Heart" :size="20" />
              </div>
              <div class="item-text">
                <h3>{{ cause.title }}</h3>
                <p>{{ cause.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUNA DIREITA: CARD PIX -->
        <div class="pix-action-area">
          <div class="pix-card-floating shadow-silk">
            <div class="qr-code-wrapper">
              <img v-if="siteContent.settings.pixQrCode" :src="siteContent.settings.pixQrCode" alt="QR Code PIX" />
              <img v-else :src="`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${siteContent.settings.pixKey}`" alt="QR Code PIX" />
              <div class="qr-overlay-hint">{{ siteContent.settings.pixQrCode ? 'PIX Identificado' : 'Escaneie para Doar' }}</div>
            </div>
            
            <div class="pix-key-wrapper">
              <label>Chave PIX (E-mail)</label>
              <div class="key-field">
                <span class="key-text">{{ siteContent.settings.pixKey }}</span>
                <button @click="copyKey" class="btn-copy-minimal" :title="copied ? 'Copiado!' : 'Copiar Chave'">
                  <Copy v-if="!copied" :size="18" />
                  <Check v-else :size="18" class="text-green" />
                </button>
              </div>
            </div>

            <p class="pix-security-note">Transação segura processada pelo seu banco via Banco Central do Brasil.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- MÉTRICAS DE IMPACTO (SOCIAL PROOF) -->
    <section class="impact-metrics-bar">
      <div class="container metrics-flex">
        <template v-for="(metric, idx) in metrics" :key="metric.id">
          <div class="metric-item">
            <strong class="metric-val">{{ metric.value }}</strong>
            <span class="metric-label">{{ metric.label }}</span>
          </div>
          <div v-if="idx < metrics.length - 1" class="metric-divider"></div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, Zap, Globe, Copy, Check, Star, Users } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const copied = ref(false)
const copyKey = () => {
  navigator.clipboard.writeText(siteContent.settings.pixKey)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const iconMap = {
  Heart, Zap, Globe, Star, Users
}

const colorClasses = ['pink-soft', 'purple-soft', 'blue-soft']

const donationCauses = computed(() => siteContent.settings.donationCauses || [])
const metrics = computed(() => siteContent.settings.metrics || [])
</script>

<style scoped>
.donate-premium-view {
  background: #FDFDFD;
  min-height: 100vh;
  padding-top: 140px;
}

.container-narrow { max-width: 800px; margin: 0 auto; padding: 0 40px; }

/* HERO */
.donate-hero { margin-bottom: 80px; }
.eyebrow-brand { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: #FF2D55; margin-bottom: 20px; display: block; }
.main-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; color: #111827; letter-spacing: -2px; line-height: 1.1; margin-bottom: 24px; }
.gradient-text { background: linear-gradient(135deg, #FF2D55, #8A2BE2); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.main-subtitle { font-size: 1.25rem; color: #64748B; line-height: 1.6; max-width: 600px; margin: 0 auto; }

/* GRID */
.donate-main-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 100px;
  padding-bottom: 120px;
  align-items: start;
}

.section-label { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #CBD5E1; margin-bottom: 40px; }

/* LEFT SIDE */
.impact-items-stack { display: flex; flex-direction: column; gap: 40px; }
.impact-item-card { display: flex; gap: 24px; align-items: flex-start; }
.item-icon-circle { 
  width: 56px; 
  height: 56px; 
  border-radius: 18px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  flex-shrink: 0; 
  box-shadow: 0 8px 15px rgba(0,0,0,0.03);
}
.pink-soft { background: #FFF1F2; color: #FF2D55; border: 1px solid #FFE4E6; }
.purple-soft { background: #F5F3FF; color: #8A2BE2; border: 1px solid #EDE9FE; }
.blue-soft { background: #EFF6FF; color: #3B82F6; border: 1px solid #DBEAFE; }

.item-text {
  background: #fff;
  padding: 24px 30px;
  border-radius: 24px;
  border: 1px solid #F1F5F9;
  transition: all 0.3s;
  width: 100%;
}

.item-text:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.03);
  border-color: #E2E8F0;
}

.item-text h3 { font-size: 1.15rem; font-weight: 800; color: #111827; margin-bottom: 8px; letter-spacing: -0.5px; }
.item-text p { font-size: 0.95rem; color: #64748B; line-height: 1.6; }

/* RIGHT SIDE: PIX CARD */
.pix-card-floating {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 40px;
  padding: 60px 40px;
  border: 1px solid rgba(255, 255, 255, 1);
  text-align: center;
  position: sticky;
  top: 120px;
}

.shadow-silk { 
  box-shadow: 
    0 40px 100px rgba(17, 24, 39, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5); 
}

.qr-code-wrapper {
  background: #F8FAFC;
  padding: 30px;
  border-radius: 24px;
  margin-bottom: 32px;
  position: relative;
}
.qr-code-wrapper img { width: 100%; height: auto; mix-blend-mode: multiply; }
.qr-overlay-hint { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #94A3B8; letter-spacing: 1px; margin-top: 12px; }

.pix-key-wrapper { text-align: left; margin-bottom: 32px; }
.pix-key-wrapper label { font-size: 0.7rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; display: block; margin-bottom: 10px; padding-left: 4px; }

.key-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F9FAFB;
  border: 1.5px solid #E5E7EB;
  padding: 16px 20px;
  border-radius: 16px;
  transition: all 0.3s;
}
.key-field:hover { border-color: #FF2D55; }

.key-text { font-size: 0.9rem; font-weight: 700; color: #111827; word-break: break-all; }
.btn-copy-minimal { background: none; border: none; cursor: pointer; color: #94A3B8; transition: 0.2s; padding: 4px; }
.btn-copy-minimal:hover { color: #FF2D55; }
.text-green { color: #10B981 !important; }

.pix-security-note { font-size: 0.75rem; color: #94A3B8; font-weight: 600; line-height: 1.4; }

/* METRICS BAR */
.impact-metrics-bar {
  background: #fff;
  border-top: 1px solid #F1F5F9;
  padding: 60px 0;
}

.metrics-flex { display: flex; justify-content: center; align-items: center; gap: 80px; }
.metric-item { text-align: center; }
.metric-val { display: block; font-size: 2.2rem; font-weight: 900; color: #111827; margin-bottom: 4px; letter-spacing: -1px; }
.metric-label { font-size: 0.75rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; }

.metric-divider { width: 1px; height: 40px; background: #E5E7EB; }

@media (max-width: 1024px) {
  .donate-main-grid { grid-template-columns: 1fr; gap: 60px; }
  .pix-action-area { max-width: 440px; margin: 0 auto; width: 100%; }
}

@media (max-width: 768px) {
  .metrics-flex { flex-direction: column; gap: 40px; }
  .metric-divider { display: none; }
  .main-title { font-size: 2.5rem; }
}
</style>
