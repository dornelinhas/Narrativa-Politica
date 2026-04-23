<script setup>
import { ref } from 'vue'
import { Handshake, Megaphone, MessageSquare, CheckCircle, ArrowRight } from 'lucide-vue-next'

const activeType = ref('parcerias')
const types = [
  { key: 'parcerias', icon: Handshake, label: 'Parcerias', color: '#FF6BCA' },
  { key: 'imprensa', icon: Megaphone, label: 'Imprensa', color: '#A4CD39' },
  { key: 'geral', icon: MessageSquare, label: 'Geral', color: '#DF2028' }
]

const isSubmitted = ref(false)
const isLoading = ref(false)

const handleSubmit = () => {
  isLoading.value = true
  // Simulação de envio para a API
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
  }, 800)
}

const resetForm = () => {
  isSubmitted.value = false
}
</script>

<template>
  <div class="contato-page grid-pattern">
    
    <!-- MODAL DE SUCESSO (UX PREMIUM) -->
    <transition name="modal-fade">
      <div v-if="isSubmitted" class="success-modal-overlay">
        <div class="success-card shadow-brutal-20">
          <div class="success-icon-box">
            <CheckCircle :size="48" class="text-dark" />
          </div>
          <h2 class="success-title">MENSAGEM<br/>RECEBIDA!</h2>
          <p class="success-desc">Nossa equipe estratégica analisará sua solicitação e entrará em contato em breve.</p>
          <button @click="resetForm" class="btn-black-pill mt-8">
            VOLTAR AO CONTATO <ArrowRight :size="18" />
          </button>
        </div>
      </div>
    </transition>

    <div class="page-content" :class="{ 'blur-bg': isSubmitted }">
      <div class="contact-wrapper">
        <div class="contact-left">
          <h1>Contato</h1>
          <div class="contact-types">
            <div v-for="t in types" :key="t.key" class="contact-type-btn" :class="{ active: activeType === t.key }" @click="activeType = t.key">
              <span class="icon" :style="{ color: t.color }"><component :is="t.icon" :size="32" :stroke-width="3" /></span>
              <div class="contact-type-label">{{ t.label }}</div>
            </div>
          </div>
          
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <input type="text" placeholder="Nome" required>
              <input type="email" placeholder="Email" required>
            </div>
            <input type="text" placeholder="Assunto" required>
            <textarea placeholder="Mensagem" required></textarea>
            
            <button type="submit" class="contact-submit" :disabled="isLoading">
              {{ isLoading ? 'ENVIANDO...' : 'ENVIAR MENSAGEM' }}
            </button>
          </form>
        </div>

        <div class="geo-art">
          <!-- ARTE 100% PREENCHIDA - COMPOSIÇÃO POP-ART PREMIUM -->
          <svg viewBox="0 0 420 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" class="full-svg">
            <!-- GRID DE CORES SÓLIDAS -->
            <rect x="0" y="0" width="210" height="175" fill="#FF6BCA" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="210" y="0" width="210" height="175" fill="#FFE65A" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="0" y="175" width="210" height="175" fill="#3D78E0" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="210" y="175" width="210" height="175" fill="#A4CD39" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="0" y="350" width="210" height="175" fill="#DF2028" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="210" y="350" width="210" height="175" fill="#FF6BCA" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="0" y="525" width="210" height="175" fill="#FFE65A" stroke="#1C1C1C" stroke-width="8"/>
            <rect x="210" y="525" width="210" height="175" fill="#3D78E0" stroke="#1C1C1C" stroke-width="8"/>

            <!-- ELEMENTOS DE DESIGN REFINADOS -->
            <circle cx="105" cy="87" r="55" fill="#FFE65A" stroke="#1C1C1C" stroke-width="4"/>
            <rect x="90" y="72" width="30" height="30" fill="#1C1C1C" transform="rotate(45, 105, 87)"/>

            <polygon points="210,0 420,175 210,175" fill="#DF2028" stroke="#1C1C1C" stroke-width="6"/>
            <circle cx="350" cy="60" r="30" fill="#3D78E0" stroke="#1C1C1C" stroke-width="4"/>

            <rect x="20" y="210" width="170" height="100" rx="50" fill="#FFFFFF" stroke="#1C1C1C" stroke-width="4"/>
            <rect x="50" y="245" width="110" height="30" rx="15" fill="#FF6BCA" stroke="#1C1C1C" stroke-width="2"/>

            <circle cx="315" cy="262" r="65" fill="#FF6BCA" stroke="#1C1C1C" stroke-width="5"/>
            <circle cx="315" cy="262" r="35" fill="#FFE65A" stroke="#1C1C1C" stroke-width="3"/>
            <circle cx="315" cy="262" r="12" fill="#1C1C1C"/>

            <rect x="40" y="390" width="130" height="95" fill="#FFE65A" stroke="#1C1C1C" stroke-width="4"/>
            <rect x="65" y="415" width="80" height="45" fill="#3D78E0" stroke="#1C1C1C" stroke-width="2"/>

            <circle cx="315" cy="437" r="70" fill="#3D78E0" stroke="#1C1C1C" stroke-width="5"/>
            <text x="282" y="465" font-size="80" fill="#FFFFFF" font-weight="900" transform="rotate(-10, 315, 437)">★</text>

            <polygon points="105,525 210,700 0,700" fill="#A4CD39" stroke="#1C1C1C" stroke-width="6"/>
            <circle cx="105" cy="640" r="35" fill="#DF2028" stroke="#1C1C1C" stroke-width="4"/>

            <path d="M 240 670 A 70 70 0 0 1 390 670 L 390 700 L 240 700 Z" fill="#FF6BCA" stroke="#1C1C1C" stroke-width="4"/>
            <circle cx="315" cy="620" r="40" fill="#A4CD39" stroke="#1C1C1C" stroke-width="4"/>
            <rect x="305" y="610" width="20" height="20" fill="#1C1C1C"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contato-page { background: #3D78E0; min-height: 100vh; width: 100%; position: relative; }
.grid-pattern { background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px; }

/* BLUR EFFECT QUANDO MODAL ATIVO */
.blur-bg { filter: blur(8px); pointer-events: none; transition: 0.4s; }

/* MODAL DE SUCESSO */
.success-modal-overlay {
  position: fixed; inset: 0; z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  background: rgba(61, 120, 224, 0.4);
  backdrop-filter: blur(4px);
}

.success-card {
  background: #A4CD39; /* Verde Lima */
  border: 4px solid #1C1C1C;
  border-radius: 3rem;
  padding: 60px;
  max-width: 500px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center;
}

.shadow-brutal-20 { box-shadow: 16px 16px 0px #1C1C1C; }

.success-icon-box {
  width: 80px; height: 80px; background: #FFFFFF; border: 3px solid #1C1C1C;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-bottom: 30px; box-shadow: 4px 4px 0px #1C1C1C;
}

.success-title { font-family: "Archivo Black", sans-serif; font-size: 2.5rem; color: #1C1C1C; line-height: 1; margin-bottom: 20px; }
.success-desc { font-family: "Georgia", serif; font-size: 1.2rem; color: #1e293b; line-height: 1.6; }

.btn-black-pill {
  background: #1C1C1C; color: #FFF; padding: 20px 40px; border-radius: 9999px;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.85rem; text-transform: uppercase;
  border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; transition: 0.3s;
}
.btn-black-pill:hover { background: #FFFFFF; color: #1C1C1C; border: 3px solid #1C1C1C; transform: scale(1.05); }

/* ANIMAÇÃO DO MODAL */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s, transform 0.4s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

.page-content { display: flex; align-items: center; justify-content: center; padding: 160px 32px 80px; transition: 0.4s; }
.contact-wrapper { background: #FFE65A; border-radius: 40px; padding: 64px; max-width: 1200px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; border: 4px solid #1C1C1C; box-shadow: 16px 16px 0 #1C1C1C; }
.contact-left h1 { font-family: 'Archivo Black', sans-serif; font-size: clamp(40px, 6vw, 80px); text-transform: uppercase; color: #1C1C1C; margin-bottom: 40px; }
.contact-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
.contact-type-btn { background: white; border: 4px solid #1C1C1C; border-radius: 20px; padding: 24px 12px; text-align: center; cursor: pointer; transition: 0.3s; }
.contact-type-btn.active { background: #1C1C1C; }
.contact-type-btn.active .contact-type-label { color: white; }
.contact-type-label { font-family: 'Inter', sans-serif; font-weight: 900; font-size: 0.75rem; text-transform: uppercase; color: #1C1C1C; }
.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
input, textarea { font-family: 'Inter', sans-serif; font-weight: 700; padding: 20px; border: 4px solid #1C1C1C; border-radius: 12px; outline: none; transition: 0.2s; }
input:focus, textarea:focus { box-shadow: 4px 4px 0px #1C1C1C; transform: translate(-2px, -2px); }
.contact-textarea { min-height: 180px; }
.contact-submit { background: #DF2028; color: white; font-family: 'Archivo Black', sans-serif; text-transform: uppercase; padding: 24px; border: 4px solid #1C1C1C; border-radius: 12px; cursor: pointer; font-size: 1rem; letter-spacing: 0.1em; transition: 0.3s; }
.contact-submit:hover:not(:disabled) { background: #1C1C1C; transform: translateY(-4px); box-shadow: 8px 8px 0 rgba(0,0,0,0.2); }
.contact-submit:disabled { opacity: 0.7; cursor: not-allowed; }
.geo-art { border: 4px solid #1C1C1C; border-radius: 20px; overflow: hidden; height: 100%; min-height: 600px; }
.full-svg { width: 100%; height: 100%; display: block; }

@media (max-width: 900px) { .contact-wrapper { grid-template-columns: 1fr; padding: 40px; } .geo-art { display: none; } }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .contact-types { grid-template-columns: 1fr; } }
</style>