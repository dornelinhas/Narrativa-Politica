<template>
  <div class="donation-impact-card" :class="{ 'is-compact': compact }">
    <div class="donation-glow"></div>
    <div class="donation-content">
      <div class="donation-text-side">
        <span class="donation-badge">APOIE NOSSA MISSÃO</span>
        <h2>{{ settings.donationTitle }}</h2>
        <p>{{ settings.donationText }}</p>
        
        <div class="pix-box-vibrant">
          <div class="pix-header">
            <Zap :size="16" />
            <span>CONTRIBUA VIA PIX</span>
          </div>
          <div class="pix-key-row">
            <code>{{ settings.pixKey }}</code>
            <button @click="copyPix" class="btn-copy-mini" title="Copiar Chave">
              <Copy v-if="!copied" :size="16" />
              <Check v-else :size="16" />
            </button>
          </div>
        </div>
      </div>

      <div class="donation-visual-side" v-if="!compact">
        <div class="qr-code-wrapper">
          <img :src="settings.qrCodePlaceholder" alt="QR Code PIX" />
          <span>Aponte a câmera para doar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { siteContent } from '../store/content'
import { Zap, Copy, Check } from 'lucide-vue-next'

defineProps({
  compact: { type: Boolean, default: false }
})

const settings = computed(() => siteContent.settings)
const copied = ref(false)

const copyPix = () => {
  navigator.clipboard.writeText(settings.value.pixKey)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<style scoped>
.donation-impact-card {
  position: relative;
  background: linear-gradient(135deg, #111827 0%, #1A1C2E 100%);
  border-radius: 32px;
  padding: 60px;
  overflow: hidden;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.donation-glow {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 70%);
  z-index: 1;
}

.donation-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
}

.donation-badge {
  font-size: 0.7rem;
  font-weight: 900;
  color: #FF2D55;
  letter-spacing: 2px;
  margin-bottom: 16px;
  display: block;
}

.donation-text-side h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 16px; letter-spacing: -1.5px; color: #fff !important; }
.donation-text-side p { color: #94A3B8 !important; font-size: 1.1rem; line-height: 1.6; margin-bottom: 32px; max-width: 500px; }

.pix-box-vibrant {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 20px 24px;
  display: inline-block;
  backdrop-filter: blur(10px);
}

.pix-header { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 900; color: #FF2D55; margin-bottom: 12px; }
.pix-key-row { display: flex; align-items: center; gap: 20px; }
.pix-key-row code { font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #fff; }

.btn-copy-mini {
  background: #fff; border: none; width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; color: #111827;
  cursor: pointer; transition: all 0.2s;
}
.btn-copy-mini:hover { transform: scale(1.1); background: #FF2D55; color: #fff; }

.qr-code-wrapper {
  background: #fff; padding: 24px; border-radius: 24px; text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
.qr-code-wrapper img { width: 160px; height: 160px; margin-bottom: 12px; border-radius: 8px; }
.qr-code-wrapper span { color: #111827; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }

/* COMPACT VERSION */
.is-compact { padding: 40px; }
.is-compact .donation-content { grid-template-columns: 1fr; text-align: center; gap: 24px; }
.is-compact .donation-text-side p { margin-left: auto; margin-right: auto; }
.is-compact .pix-box-vibrant { width: 100%; display: flex; flex-direction: column; align-items: center; }

@media (max-width: 768px) {
  .donation-impact-card { padding: 40px 24px; }
  .donation-content { grid-template-columns: 1fr; text-align: center; }
  .donation-text-side p { margin: 0 auto 32px; }
  .donation-visual-side { display: none; }
}
</style>