<template>
  <div class="image-uploader" :class="{ 'has-image': modelValue, 'is-dragging': isDragging, 'circular-mode': circular }" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop">
    
    <div v-if="!modelValue" class="upload-prompt">
      <div class="upload-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
      </div>
      <p>Arraste e solte uma imagem ou <strong>clique aqui</strong></p>
      <input type="file" accept="image/*" @change="handleFileSelect" class="hidden-input">
    </div>

    <div v-else class="preview-container">
      <img :src="modelValue" alt="Preview da imagem" class="image-preview" :class="{ 'circular-img': circular }">
      <button type="button" @click="clearImage" class="clear-btn" aria-label="Remover">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  circular: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])
const isDragging = ref(false)

const processFile = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    alert('Por favor, faça upload apenas de imagens.')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    emit('update:modelValue', e.target.result)
  }
  reader.readAsDataURL(file)
}

const handleFileSelect = (event) => {
  processFile(event.target.files[0])
}

const handleDrop = (event) => {
  isDragging.value = false
  processFile(event.dataTransfer.files[0])
}

const clearImage = () => {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
  min-height: 160px;
  border: 2px dashed #E5E7EB;
  border-radius: 16px;
  background: #F9FAFB;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}

.image-uploader.circular-mode {
  width: 180px;
  height: 180px;
  min-height: 180px;
  border-radius: 50%;
  margin: 0 auto;
}

.image-uploader:hover {
  border-color: #8B5CF6;
  background: #F5F3FF;
}

.image-uploader.is-dragging {
  border-color: #8B5CF6;
  background: #EDE9FE;
  transform: scale(1.01);
}

.upload-prompt {
  text-align: center;
  color: #6B7280;
  padding: 20px;
}

.upload-icon {
  margin-bottom: 12px;
  color: #9CA3AF;
  display: flex;
  justify-content: center;
}

.upload-prompt p {
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

.upload-prompt strong {
  color: #8B5CF6;
  font-weight: 700;
}

.hidden-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.image-preview {
  max-width: 100%;
  max-height: 240px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.circular-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
}

.clear-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #FFFFFF;
  color: #EF4444;
  border: 1px solid #FEE2E2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.clear-btn:hover {
  background: #FEF2F2;
  transform: scale(1.1);
}
</style>
