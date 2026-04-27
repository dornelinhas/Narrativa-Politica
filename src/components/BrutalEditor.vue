<script setup>
import { ref, onMounted, watch } from 'vue'
import { Bold, Italic, List, Heading2, Heading3, Image as ImageIcon, Type, Trash2, Quote } from 'lucide-vue-next'
import { uploadImage } from '../lib/supabaseStorage'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Escreva seu conteúdo aqui...' }
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
const selectedImg = ref(null)
const floatingMenuPos = ref({ top: 0, left: 0 })

const updateContent = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== editorRef.value.innerHTML) {
    editorRef.value.innerHTML = newVal
  }
})

const execCmd = (cmd, arg = null) => {
  document.execCommand(cmd, false, arg)
  updateContent()
  editorRef.value.focus()
}

const setFontSize = (size) => {
  // execCommand('fontSize') uses 1-7, which is limited. 
  // We'll use a span with style for more control if needed, 
  // but for simplicity and to follow document.execCommand:
  execCmd('fontSize', size)
}

const handleDrop = (e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    insertImage(files[0])
  }
}

const handlePaste = (e) => {
  const items = e.clipboardData.items
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      e.preventDefault()
      const file = items[i].getAsFile()
      insertImage(file)
      break
    }
  }
}

const insertImage = async (file) => {
  try {
    const publicUrl = await uploadImage(file, 'articles')
    execCmd('insertImage', publicUrl)
  } catch (err) {
    console.error('Erro ao subir imagem do editor:', err)
    alert('Erro ao subir imagem: ' + err.message)
  }
}

const triggerFileInput = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    if (e.target.files && e.target.files[0]) {
      insertImage(e.target.files[0])
    }
  }
  input.click()
}

const handleEditorClick = (e) => {
  if (e.target.tagName === 'IMG') {
    selectedImg.value = e.target
    const rect = e.target.getBoundingClientRect()
    const editorRect = editorRef.value.getBoundingClientRect()
    floatingMenuPos.value = {
      top: rect.top - editorRect.top + 10,
      left: rect.left - editorRect.left + 10
    }
  } else {
    selectedImg.value = null
  }
}

const deleteSelectedImage = () => {
  if (selectedImg.value) {
    selectedImg.value.remove()
    selectedImg.value = null
    updateContent()
  }
}
</script>

<template>
  <div class="brutal-editor-wrapper">
    <div class="editor-toolbar">
      <div class="toolbar-group">
        <button type="button" @click="execCmd('bold')" title="Negrito"><Bold :size="16" /></button>
        <button type="button" @click="execCmd('italic')" title="Itálico"><Italic :size="16" /></button>
      </div>
      
      <div class="toolbar-group">
        <button type="button" @click="execCmd('formatBlock', 'H2')" title="Título 2"><Heading2 :size="16" /></button>
        <button type="button" @click="execCmd('formatBlock', 'H3')" title="Título 3"><Heading3 :size="16" /></button>
        <button type="button" @click="execCmd('formatBlock', 'blockquote')" title="Citação"><Quote :size="16" /></button>
      </div>

      <div class="toolbar-group">
        <select @change="setFontSize($event.target.value)" class="font-size-select" title="Tamanho da Letra">
          <option value="3">Médio</option>
          <option value="1">Pequeno</option>
          <option value="2">Normal</option>
          <option value="4">Grande</option>
          <option value="5">Extra G</option>
          <option value="6">Gigante</option>
          <option value="7">Máximo</option>
        </select>
      </div>

      <div class="toolbar-group">
        <button type="button" @click="execCmd('insertUnorderedList')" title="Lista"><List :size="16" /></button>
        <button type="button" @click="triggerFileInput" title="Inserir Imagem"><ImageIcon :size="16" /></button>
      </div>
    </div>
    
    <div class="editor-relative-container">
      <div 
        ref="editorRef"
        class="editor-content"
        contenteditable="true"
        @input="updateContent"
        @click="handleEditorClick"
        @dragover.prevent
        @drop="handleDrop"
        @paste="handlePaste"
        :data-placeholder="placeholder"
      ></div>

      <!-- Botão flutuante para apagar imagem -->
      <div 
        v-if="selectedImg" 
        class="image-floating-menu"
        :style="{ top: floatingMenuPos.top + 'px', left: floatingMenuPos.left + 'px' }"
      >
        <button @click="deleteSelectedImage" class="btn-delete-img" title="Remover Imagem">
          <Trash2 :size="14" /> APAGAR IMAGEM
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brutal-editor-wrapper {
  border: 3px solid #1C1C1C;
  border-radius: 12px;
  background: #FFFFFF;
  overflow: hidden;
  box-shadow: 2px 2px 0px rgba(0,0,0,0.05);
  transition: 0.2s;
}
.brutal-editor-wrapper:focus-within {
  border-color: #DF2028;
  box-shadow: 6px 6px 0px #1C1C1C;
  transform: translate(-2px, -2px);
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 16px;
  background: #F8FAFC;
  border-bottom: 3px solid #1C1C1C;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  align-items: center;
  border-right: 2px solid #E2E8F0;
  padding-right: 12px;
}
.toolbar-group:last-child {
  border-right: none;
}

.editor-toolbar button {
  background: none;
  border: 2px solid transparent;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  color: #1C1C1C;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.editor-toolbar button:hover {
  background: #E2E8F0;
  border-color: #1C1C1C;
}

.font-size-select {
  background: white;
  border: 2px solid #1C1C1C;
  border-radius: 4px;
  padding: 2px 4px;
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.editor-relative-container {
  position: relative;
}

.editor-content {
  min-height: 250px;
  padding: 20px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #000;
  outline: none;
}

.editor-content:empty:before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  position: absolute;
}

.image-floating-menu {
  position: absolute;
  z-index: 50;
}

.btn-delete-img {
  background: #DF2028;
  color: white;
  border: 2px solid #1C1C1C;
  padding: 6px 12px;
  font-family: "Archivo Black", sans-serif;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 4px 4px 0px #1C1C1C;
  transition: 0.2s;
}
.btn-delete-img:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #1C1C1C;
}

/* Base styles inside editor */
.editor-content :deep(h2) {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.editor-content :deep(h3) {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
  letter-spacing: -0.01em;
}

.editor-content :deep(blockquote) {
  border-left: 6px solid #FF6BCA;
  padding: 15px 25px;
  margin: 1.5rem 0;
  background: #F1F5F9;
  font-family: "Inter", sans-serif;
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.4;
  color: #1C1C1C;
  border-radius: 0 12px 12px 0;
}

.editor-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  border: 2px solid #1C1C1C;
  margin: 1rem 0;
  cursor: pointer;
}
.editor-content :deep(img):hover {
  outline: 4px solid #DF2028;
}

.editor-content :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

/* Font sizes from execCommand */
.editor-content :deep(font[size="1"]) { font-size: 0.75rem; }
.editor-content :deep(font[size="2"]) { font-size: 0.875rem; }
.editor-content :deep(font[size="3"]) { font-size: 1rem; }
.editor-content :deep(font[size="4"]) { font-size: 1.25rem; }
.editor-content :deep(font[size="5"]) { font-size: 1.5rem; }
.editor-content :deep(font[size="6"]) { font-size: 2rem; }
.editor-content :deep(font[size="7"]) { font-size: 2.5rem; }
</style>

