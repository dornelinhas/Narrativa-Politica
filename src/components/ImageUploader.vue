<script setup>
import { ref } from 'vue'
import { uploadImage } from '../lib/supabaseStorage'
import { UploadCloud } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'IMAGEM DE CAPA' }
})

const emit = defineEmits(['update:modelValue'])

const isDragging = ref(false)
const fileInput = ref(null)
const isUploading = ref(false)
const localPreview = ref('')

const handleDrop = async (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    await processFile(files[0])
  }
}

const handleFileSelect = async (e) => {
  if (e.target.files && e.target.files[0]) {
    await processFile(e.target.files[0])
  }
}

const processFile = async (file) => {
  isUploading.value = true
  localPreview.value = URL.createObjectURL(file) // Mostra preview local instantâneo
  console.log('Iniciando processamento do arquivo:', file.name)
  try {
    const publicUrl = await uploadImage(file, 'uploads')
    console.log('URL recebida do Supabase:', publicUrl)
    localPreview.value = publicUrl // Atualiza para a URL final do servidor
    emit('update:modelValue', publicUrl)
  } catch (err) {
    console.error('Erro no processamento do arquivo:', err)
    localPreview.value = '' 
    alert(`Erro ao subir imagem: ${err.message || 'verifique se o bucket "media" foi criado no Supabase.'}`)
  } finally {
    isUploading.value = false
  }
}

const onImageError = (e) => {
  console.error('Erro ao carregar a imagem do servidor:', e.target.src)
  // Se a imagem do servidor falhou, podemos tentar manter a local ou mostrar erro
}

const triggerInput = () => {
  fileInput.value.click()
}
</script>

<template>
  <div class="input-group">
    <label>{{ label }}</label>
    
    <div 
      class="upload-zone"
      :class="{ 'is-dragging': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerInput"
    >
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden-input" 
        accept="image/*" 
        @change="handleFileSelect"
      />
      
      <div v-if="isUploading" class="upload-loading">
        <div class="spinner"></div>
        <span>SUBINDO PARA O SERVIDOR...</span>
      </div>

      <div v-else-if="modelValue || localPreview" class="preview-container">
        <img :src="localPreview || modelValue" class="image-preview" @error="onImageError" />
        <div class="preview-overlay">
          <UploadCloud :size="24" />
          <span>Trocar imagem</span>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <UploadCloud :size="32" class="mb-2" />
        <span class="upload-title">Clique ou arraste a imagem aqui</span>
        <span class="upload-subtitle">Formatos aceitos: JPG, PNG, WEBP</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-family: "Archivo Black", sans-serif; font-weight: 700; font-size: 11px; color: #1C1C1C; letter-spacing: 0.5px; text-transform: uppercase; }

.upload-zone {
  border: 4px dashed #1C1C1C;
  border-radius: 16px;
  background: #FFE65A;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  box-shadow: inset 4px 4px 0px rgba(0,0,0,0.05);
}

.upload-zone:hover, .upload-zone.is-dragging {
  background: #FF6BCA;
  border-style: solid;
  border-color: #1C1C1C;
  box-shadow: 8px 8px 0px #1C1C1C;
  transform: translate(-4px, -4px);
}

.upload-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #1C1C1C;
  font-family: "Archivo Black", sans-serif;
  font-size: 0.8rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(28, 28, 28, 0.1);
  border-left-color: #1C1C1C;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hidden-input {
  display: none;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  color: #1C1C1C;
  transition: 0.3s;
}

.upload-zone:hover .empty-state { color: #FFF; }

.upload-title {
  font-family: "Archivo Black", sans-serif;
  font-size: 0.95rem;
  margin-top: 8px;
  text-transform: uppercase;
}

.upload-subtitle {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  margin-top: 6px;
  opacity: 0.8;
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.image-preview {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28,28,28,0.8);
  backdrop-filter: blur(2px);
  color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  font-weight: 900;
  font-family: "Archivo Black";
  gap: 10px;
  text-transform: uppercase;
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

.mb-2 { margin-bottom: 8px; }
</style>
