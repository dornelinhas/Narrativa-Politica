<template>
  <div class="brutalist-card donation-module" :class="{ 'is-compact': compact }">
    <div class="donation-content">
      <div class="donation-text-side">
        <div class="tag-brutalist pink mb-6">APOIE NOSSA MISSÃO</div>
        <h2 class="font-display mb-6">{{ settings.donationTitle }}</h2>
        <p class="font-sans font-bold opacity-70 mb-12">{{ settings.donationText }}</p>

        <div class="pix-box-brutalist">
          <div class="pix-header">
            <Zap :size="18" fill="currentColor" />
            <span>CONTRIBUA VIA PIX</span>
          </div>
          <div class="pix-key-row">
            <code>{{ settings.pixKey }}</code>
            <button @click="copyPix" class="btn-copy-brutalist" title="Copiar Chave">
              <Copy v-if="!copied" :size="20" />
              <Check v-else :size="20" />
            </button>
          </div>
        </div>
      </div>

      <div class="donation-visual-side" v-if="!compact">
        <div class="qr-code-brutalist">
          <img :src="settings.qrCodePlaceholder" alt="QR Code PIX" />
          <div class="qr-footer">
             <div class="geo-circle red w-4 h-4 border-dark-2"></div>
             <span>ESCANEIE PARA DOAR</span>
          </div>
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
.donation-module {
  background: white;
  padding: 80px;
  position: relative;
  overflow: hidden;
}

.donation-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  position: relative;
  z-index: 10;
}

.tag-brutalist {
  display: inline-flex;
  padding: 8px 16px;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  border: 3px solid var(--color-dark);
}
.tag-brutalist.pink { background: var(--color-pink); color: white; }

h2 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 0.9; margin-bottom: 24px; color: var(--color-dark); }
p { font-size: 1.2rem; line-height: 1.5; color: var(--color-dark); max-width: 550px; }

.pix-box-brutalist {
  background: var(--color-bg);
  border: 4px solid var(--color-dark);
  padding: 30px 40px;
  display: inline-flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 10px 10px 0 var(--color-dark);
}

.pix-header { display: flex; align-items: center; gap: 12px; font-weight: 900; font-size: 0.8rem; color: var(--color-red); }
.pix-key-row { display: flex; align-items: center; gap: 30px; }
.pix-key-row code { font-family: var(--font-sans); font-size: 1.4rem; font-weight: 900; color: var(--color-dark); }

.btn-copy-brutalist {
  background: var(--color-yellow);
  border: 3px solid var(--color-dark);
  width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.btn-copy-brutalist:hover { transform: translate(-4px, -4px); box-shadow: 4px 4px 0 var(--color-dark); }

.qr-code-brutalist {
  background: white;
  border: 4px solid var(--color-dark);
  padding: 30px;
  box-shadow: 15px 15px 0 var(--color-lime);
}
.qr-code-brutalist img { width: 220px; height: 220px; border-bottom: 4px solid var(--color-dark); padding-bottom: 20px; margin-bottom: 20px; }
.qr-footer { display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 900; font-size: 0.75rem; color: var(--color-dark); }

/* COMPACT VERSION */
.is-compact { padding: 50px; }
.is-compact .donation-content { flex-direction: column; text-align: center; gap: 40px; }
.is-compact .donation-text-side p { margin: 0 auto 40px; }
.is-compact .pix-box-brutalist { width: 100%; display: flex; }

.mb-6 { margin-bottom: 1.5rem; }
.mb-12 { margin-bottom: 3rem; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.border-dark-2 { border: 2px solid var(--color-dark); }
.geo-circle { border-radius: 50%; }
.red { background: var(--color-red); }

@media (max-width: 900px) {
  .donation-module { padding: 60px 30px; }
  .donation-content { flex-direction: column; text-align: center; gap: 50px; }
  .donation-text-side p { margin-left: auto; margin-right: auto; }
  .donation-visual-side { display: none; }
}
</style>