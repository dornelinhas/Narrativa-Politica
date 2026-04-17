import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

// Inicialização ultra-simples para evitar bloqueios
const app = createApp(App)

app.use(router)

// Silenciar avisos que podem travar o console em alguns navegadores
app.config.errorHandler = (err) => {
  console.warn('Capturado erro de renderização:', err)
}

app.mount('#app')
console.log('✅ Tentativa de montagem final concluída.')
