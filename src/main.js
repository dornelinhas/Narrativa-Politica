// Version: 2026-04-25-0026
import { createApp } from 'vue'
import { createUnhead } from '@unhead/vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

// Inicialização ultra-simples para evitar bloqueios
const app = createApp(App)
const head = createUnhead()

app.use(router)
app.use(head)

// Custom directive for scroll animations (Micro-interações)
app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal-hidden')
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    observer.observe(el)
  }
})

// Silenciar avisos que podem travar o console em alguns navegadores
app.config.errorHandler = (err) => {
  console.warn('Capturado erro de renderização:', err)
}

app.mount('#app')
console.log('✅ Tentativa de montagem final concluída.')
