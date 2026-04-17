import { reactive, watch } from 'vue'

const STORAGE_KEY = 'np_settings_v1'
const DEFAULT_SETTINGS = { fontSize: 100, highContrast: false }

const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_SETTINGS))

export const settings = reactive(savedSettings)

watch(settings, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  applySettings()
}, { deep: true })

export const applySettings = () => {
  const root = document.documentElement
  root.style.setProperty('--base-font-scale', `${settings.fontSize}%`)
  
  if (settings.highContrast) {
    document.body.classList.add('high-contrast')
  } else {
    document.body.classList.remove('high-contrast')
  }
}

export const resetSettings = () => {
  settings.fontSize = DEFAULT_SETTINGS.fontSize
  settings.highContrast = DEFAULT_SETTINGS.highContrast
}

if (typeof window !== 'undefined') {
  applySettings()
}
