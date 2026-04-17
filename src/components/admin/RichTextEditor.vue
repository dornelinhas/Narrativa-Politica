<template>
  <div class="rich-editor">
    <div class="editor-toolbar">
      <button type="button" @click="format('bold')" title="Negrito">
        <strong>B</strong>
      </button>
      <button type="button" @click="format('italic')" title="Itálico">
        <em>I</em>
      </button>
      <button type="button" @click="format('underline')" title="Sublinhado">
        <u>U</u>
      </button>
      <div class="toolbar-divider"></div>
      <button type="button" @click="formatBlock('H1')" title="Título 1">H1</button>
      <button type="button" @click="formatBlock('H2')" title="Título 2">H2</button>
      <button type="button" @click="formatBlock('BLOCKQUOTE')" title="Citação">“ ”</button>
      <button type="button" @click="formatBlock('P')" title="Parágrafo">P</button>
      <div class="toolbar-divider"></div>
      <button type="button" @click="format('insertUnorderedList')" title="Lista">
        • Lista
      </button>
      <button type="button" @click="addLink" title="Inserir Link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </button>
      <button type="button" @click="triggerImageUpload" title="Inserir Imagem">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      </button>
      <input type="file" ref="fileInputRef" @change="insertImage" style="display: none" accept="image/*" />
    </div>
    
    <div 
      class="editor-content"
      contenteditable="true"
      ref="editorRef"
      @input="handleInput"
      @blur="handleInput"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const editorRef = ref(null)
const fileInputRef = ref(null)

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && editorRef.value.innerHTML !== newVal) {
    editorRef.value.innerHTML = newVal
  }
})

const handleInput = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

const format = (command) => {
  document.execCommand(command, false, null)
  handleInput()
}

const formatBlock = (tag) => {
  document.execCommand('formatBlock', false, tag)
  handleInput()
}

const addLink = () => {
  const url = prompt('Cole a URL do link:')
  if (url) {
    document.execCommand('createLink', false, url)
    handleInput()
  }
}

const triggerImageUpload = () => {
  fileInputRef.value.click()
}

const insertImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imgHtml = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; margin: 10px 0;" />`
      document.execCommand('insertHTML', false, imgHtml)
      handleInput()
    }
    reader.readAsDataURL(file)
  }
  event.target.value = '' // Reset to allow same file again
}
</script>

<style scoped>
.rich-editor {
  border: 1.5px solid #E5E7EB;
  border-radius: 16px;
  background: white;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.rich-editor:focus-within {
  border-color: #8B5CF6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

.editor-toolbar {
  display: flex;
  gap: 6px;
  padding: 10px 16px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  align-items: center;
  flex-wrap: wrap;
}

.editor-toolbar button {
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #4B5563;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.editor-toolbar button:hover {
  background: #F3F4F6;
  color: #111827;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #E5E7EB;
  margin: 0 8px;
}

.editor-content {
  min-height: 280px;
  max-height: 600px;
  overflow-y: auto;
  padding: 24px 32px;
  outline: none;
  font-size: 1rem;
  line-height: 1.7;
  color: #1F2937;
}

/* Tipografia Editorial Premium */
.editor-content :deep(h1) { font-size: 2rem; margin-bottom: 1.2rem; font-weight: 900; color: #111827; letter-spacing: -0.02em; }
.editor-content :deep(h2) { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 800; color: #111827; }
.editor-content :deep(p) { margin-bottom: 1.2rem; }
.editor-content :deep(ul) { margin-bottom: 1.2rem; padding-left: 20px; }
.editor-content :deep(li) { margin-bottom: 0.5rem; }
.editor-content :deep(a) { color: #8B5CF6; text-decoration: underline; font-weight: 600; }
.editor-content :deep(img) { display: block; max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
.editor-content :deep(blockquote) {
  border-left: 4px solid #8B5CF6;
  padding: 16px 24px;
  margin: 24px 0;
  font-style: italic;
  color: #4B5563;
  background: #F5F3FF;
  border-radius: 0 12px 12px 0;
}
</style>
