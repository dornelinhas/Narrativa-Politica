<template>
  <div class="ad-container-brutal" :class="customClass">
    <div class="ad-label">PUBLICIDADE</div>
    <div class="ad-content">
      <!-- Google AdSense -->
      <ins class="adsbygoogle"
           style="display:block"
           :data-ad-client="adClient"
           :data-ad-slot="adSlot"
           :data-ad-format="adFormat"
           :data-full-width-responsive="fullWidthResponsive"></ins>
    </div>
    <div class="ad-corner-decoration"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  adSlot: {
    type: String,
    default: '' // O usuário deve preencher com o ID do bloco de anúncio criado no AdSense
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  fullWidthResponsive: {
    type: String,
    default: 'true'
  },
  customClass: {
    type: String,
    default: ''
  }
})

const adClient = 'ca-pub-9063540984100930'

onMounted(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error('Erro ao carregar AdSense:', e)
  }
})
</script>

<style scoped>
.ad-container-brutal {
  margin: 40px 0;
  border: 4px solid #000;
  background: #f0f0f0;
  position: relative;
  padding: 20px;
  box-shadow: 12px 12px 0px #000;
  overflow: hidden;
}

.ad-label {
  position: absolute;
  top: 0;
  right: 0;
  background: #000;
  color: #fff;
  font-family: 'Archivo Black', sans-serif;
  font-size: 10px;
  padding: 4px 12px;
  letter-spacing: 1px;
}

.ad-content {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-corner-decoration {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  background: #ff6bca; /* Rosa da sua paleta */
  transform: rotate(45deg);
  z-index: -1;
}

/* Responsividade para o card brutalista */
@media (max-width: 768px) {
  .ad-container-brutal {
    margin: 20px 0;
    box-shadow: 6px 6px 0px #000;
  }
}
</style>
