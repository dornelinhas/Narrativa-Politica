<template>
  <div class="a11y-widget" :class="{ 'is-open': isOpen }">
    <button class="a11y-toggle btn-brutal btn-preto" @click="isOpen = !isOpen" aria-label="Menu de Acessibilidade">
      <Accessibility :size="24" />
    </button>
    
    <div v-if="isOpen" class="a11y-menu paper-shadow border-thick">
      <h3 class="font-black text-sm mb-4 uppercase">Acessibilidade</h3>
      
      <div class="a11y-actions">
        <button class="a11y-btn" @click="toggleHighContrast">
          <Contrast :size="18" />
          <span>{{ isHighContrast ? 'Contraste Padrão' : 'Alto Contraste' }}</span>
        </button>
        
        <div class="font-controls">
          <button class="a11y-btn-small" @click="decreaseFont" aria-label="Diminuir Fonte">
            <AArrowDown :size="18" />
          </button>
          <span class="font-size-label">{{ fontSizePercent }}%</span>
          <button class="a11y-btn-small" @click="increaseFont" aria-label="Aumentar Fonte">
            <AArrowUp :size="18" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Accessibility, Contrast, AArrowUp, AArrowDown } from 'lucide-vue-next'

const isOpen = ref(false)
const isHighContrast = ref(false)
const fontSizeMultiplier = ref(1)

const fontSizePercent = ref(100)

const updateFontDisplay = () => {
  fontSizePercent.value = Math.round(fontSizeMultiplier.value * 100)
}

const toggleHighContrast = () => {
  isHighContrast.value = !isHighContrast.value
  if (isHighContrast.value) {
    document.body.classList.add('high-contrast-mode')
    localStorage.setItem('np_a11y_contrast', 'true')
  } else {
    document.body.classList.remove('high-contrast-mode')
    localStorage.setItem('np_a11y_contrast', 'false')
  }
}

const applyFontSize = () => {
  document.documentElement.style.fontSize = `${fontSizeMultiplier.value * 16}px`
  updateFontDisplay()
  localStorage.setItem('np_a11y_fontsize', fontSizeMultiplier.value.toString())
}

const increaseFont = () => {
  if (fontSizeMultiplier.value < 1.5) {
    fontSizeMultiplier.value += 0.1
    applyFontSize()
  }
}

const decreaseFont = () => {
  if (fontSizeMultiplier.value > 0.8) {
    fontSizeMultiplier.value -= 0.1
    applyFontSize()
  }
}

onMounted(() => {
  // Load saved preferences
  const savedContrast = localStorage.getItem('np_a11y_contrast')
  if (savedContrast === 'true') {
    toggleHighContrast()
  }
  
  const savedFontSize = localStorage.getItem('np_a11y_fontsize')
  if (savedFontSize) {
    fontSizeMultiplier.value = parseFloat(savedFontSize)
    applyFontSize()
  }
})
</script>

<style scoped>
.a11y-widget {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.a11y-toggle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px rgba(0,0,0,1);
  transition: all 0.2s ease;
}

.a11y-toggle:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(0,0,0,1);
}

.a11y-menu {
  position: absolute;
  bottom: 70px;
  left: 0;
  background: white;
  padding: 20px;
  width: 250px;
  border-radius: 0;
  transform-origin: bottom left;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.a11y-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.a11y-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px;
  background: #EFEFEF;
  border: 2px solid #000;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.a11y-btn:hover {
  background: #000;
  color: #FFF;
}

.font-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #EFEFEF;
  border: 2px solid #000;
  padding: 4px;
}

.a11y-btn-small {
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.a11y-btn-small:hover {
  background: rgba(0,0,0,0.1);
}

.font-size-label {
  font-weight: 800;
  font-size: 0.9rem;
}

/* Global High Contrast Mode Styles */
:global(body.high-contrast-mode) {
  background-color: #000 !important;
  color: #00FF00 !important; /* Classic terminal green for high contrast */
}

:global(body.high-contrast-mode *) {
  border-color: #00FF00 !important;
}

:global(body.high-contrast-mode .bg-white) {
  background-color: #000 !important;
  color: #00FF00 !important;
}

:global(body.high-contrast-mode .btn-preto) {
  background-color: #00FF00 !important;
  color: #000 !important;
}
</style>
