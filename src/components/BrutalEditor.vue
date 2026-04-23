<script setup>
import { ref, onMounted, watch } from 'vue'
import { Bold, Italic, List, Heading2, Image as ImageIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Escreva seu conteúdo aqui...' }
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)

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

const insertImage = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    execCmd('insertImage', e.target.result)
  }
  reader.readAsDataURL(file)
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
</script>

<template>
  <div class="brutal-editor-wrapper">
    <div class="editor-toolbar">
      <button type="button" @click="execCmd('bold')" title="Negrito"><Bold :size="16" /></button>
      <button type="button" @click="execCmd('italic')" title="Itálico"><Italic :size="16" /></button>
      <button type="button" @click="execCmd('formatBlock', 'H2')" title="Título"><Heading2 :size="16" /></button>
      <button type="button" @click="execCmd('insertUnorderedList')" title="Lista"><List :size="16" /></button>
      <button type="button" @click="triggerFileInput" title="Inserir Imagem"><ImageIcon :size="16" /></button>
    </div>
    
    <div 
      ref="editorRef"
      class="editor-content"
      contenteditable="true"
      @input="updateContent"
      @dragover.prevent
      @drop="handleDrop"
      @paste="handlePaste"
      :data-placeholder="placeholder"
    ></div>
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
  gap: 8px;
  padding: 12px 20px;
  background: #F8FAFC;
  border-bottom: 3px solid #1C1C1C;
}

.editor-toolbar button {
  background: none;
  border: 2px solid transparent;
  padding: 8px;
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

.editor-content {
  min-height: 200px;
  padding: 20px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #000;
  outline: none;
  position: relative;
}

.editor-content:empty:before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  position: absolute;
}

/* Base styles inside editor */
.editor-content :deep(h2) {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.editor-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  border: 2px solid #1C1C1C;
  margin: 1rem 0;
}

.editor-content :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
</style>
