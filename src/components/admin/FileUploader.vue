<template>
  <div class="file-uploader" :class="{ 'has-file': modelValue, 'is-dragging': isDragging }" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop">
    
    <div v-if="!modelValue" class="upload-prompt">
      <div class="upload-icon">
        <File :size="32" />
      </div>
      <p>Arraste seu PDF ou <strong>clique aqui</strong></p>
      <input type="file" accept=".pdf" @change="handleFileSelect" class="hidden-input">
    </div>

    <div v-else class="file-info-container">
      <div class="flex items-center gap-4" style="display: flex; align-items: center; gap: 16px;">
        <div class="file-icon"><FileText :size="20" /></div>
        <div class="text-left">
          <p class="text-graphite">{{ fileName || 'Arquivo Selecionado' }}</p>
          <p class="text-xs">PDF Pronto para Salvar</p>
        </div>
      </div>
      <button type="button" @click="clearFile" class="btn-remove-v2">
        <X :size="18" />
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { File, FileText, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  fileName: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'update:fileName'])
const isDragging = ref(false)

const processFile = (file) => {
  if (!file) return
  if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
    alert('Por favor, faça upload apenas de arquivos PDF.')
    return
  }
  
  // Em uma aplicação real, aqui faríamos o upload para um bucket (S3, Cloudinary, etc.)
  // No mock, vamos converter para Base64 se for pequeno (< 1MB) ou apenas simular o path
  const reader = new FileReader()
  reader.onload = (e) => {
    emit('update:modelValue', e.target.result)
    emit('update:fileName', file.name)
  }
  
  if (file.size < 1024 * 1024) {
    reader.readAsDataURL(file)
  } else {
    // Para arquivos grandes no mock, apenas guardamos o nome e simulamos um link
    emit('update:modelValue', `mock://uploads/${file.name}`)
    emit('update:fileName', file.name)
  }
}

const handleFileSelect = (event) => {
  processFile(event.target.files[0])
}

const handleDrop = (event) => {
  isDragging.value = false
  processFile(event.dataTransfer.files[0])
}

const clearFile = () => {
  emit('update:modelValue', '')
  emit('update:fileName', '')
}
</script>

<style scoped>
.file-uploader {
  width: 100%;
  min-height: 140px;
  border: 2px dashed #E5E7EB;
  border-radius: 16px;
  background: #F9FAFB;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.file-uploader.is-dragging {
  border-color: #8B5CF6;
  background: #F5F3FF;
  transform: scale(1.01);
}

.upload-prompt {
  text-align: center;
  color: #6B7280;
  padding: 32px;
}

.upload-icon { 
  margin-bottom: 16px; 
  color: #9CA3AF; 
  display: flex; 
  justify-content: center; 
}

.upload-prompt p {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
}

.upload-prompt strong { color: #8B5CF6; }

.hidden-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-info-container {
  width: 100%;
  padding: 24px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.file-icon {
  background: #F5F3FF;
  color: #8B5CF6;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-graphite { color: #111827; font-weight: 700; font-size: 0.9rem; }
.text-xs { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #9CA3AF; }

.btn-remove-v2 {
  background: #FEF2F2;
  color: #EF4444;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-remove-v2:hover {
  background: #FEE2E2;
  transform: scale(1.1);
}
</style>
