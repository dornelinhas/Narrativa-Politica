<template>
  <div class="contact-page">

    <!-- MODAL DE SUCESSO -->
    <transition name="fade">
      <div v-if="isSubmitted" class="success-overlay">
        <div class="success-card">
          <div class="accent-bar-top-green"></div>
          <div class="success-icon-box">
            <Check class="text-[#F5F0E8]" :size="40" stroke-width="3" />
          </div>
          <h2 class="pc-title text-center">MENSAGEM<br>ENVIADA!</h2>
          <p class="pc-desc text-center mb-6">Nossa equipe recebeu seu contato e retornará em até 48 horas.</p>
          <button @click="resetForm" class="btn-brutal btn-black-full">Voltar ao Portal</button>
        </div>
      </div>
    </transition>

    <div :class="{ 'submitted-state': isSubmitted }">
      
      <!-- HERO: CLEAN -->
      <section class="premium-hero">
        <div class="container-max relative z-10 text-center hero-content">
          <div class="hero-badge mx-auto mb-6 mt-4">
            <Sparkles :size="16" />
            <span>Rede de Transformação</span>
          </div>
          <h1 class="premium-title">ENVOLVA-SE<br><span class="text-preto">COM O FUTURO</span></h1>
          <p class="premium-subtitle">
            A Narrativa Política é movida por pessoas e organizações comprometidas com a mudança estrutural. Escolha sua frente de atuação e faça parte do ecossistema.
          </p>
        </div>
      </section>

      <!-- FORMULÁRIO DE CONTATO (VAMOS CONVERSAR) -->
      <section id="contato-form" class="form-section">
        <div class="container-max">
          <div class="form-wrapper">
            <div class="form-header text-center mb-12">
              <h2 class="form-title">VAMOS CONVERSAR?</h2>
              <p class="form-desc">Tem alguma dúvida, proposta ou quer entender melhor como podemos colaborar? Deixe sua mensagem abaixo.</p>
            </div>
            
            <form @submit.prevent="submitForm" class="brutal-form">
              <div class="form-row">
                <div class="input-group">
                  <label>NOME COMPLETO</label>
                  <input type="text" v-model="form.name" required placeholder="Como prefere ser chamado?" />
                </div>
                <div class="input-group">
                  <label>E-MAIL</label>
                  <input type="email" v-model="form.email" required placeholder="seu@email.com" />
                </div>
              </div>
              <div class="input-group mt-4">
                <label>ASSUNTO</label>
                <select v-model="form.subject" required>
                  <option value="">Selecione um assunto</option>
                  <option value="parceria">Proposta de Parceria</option>
                  <option value="imprensa">Imprensa</option>
                  <option value="duvida">Dúvida Geral</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div class="input-group mt-4">
                <label>MENSAGEM</label>
                <textarea v-model="form.message" rows="5" required placeholder="Escreva aqui a sua mensagem..."></textarea>
              </div>
              
              <button type="submit" class="btn-submit-brutal mt-6">
                <span>ENVIAR MENSAGEM</span>
                <Send :size="20" />
              </button>
            </form>

            <!-- CONTATO RÁPIDO -->
            <div class="quick-contact-row">
              <a href="mailto:contato.narrativapolitica@gmail.com" class="quick-contact-item" title="E-mail">
                <Mail :size="20" />
              </a>
              <a href="https://instagram.com" target="_blank" class="quick-contact-item" title="Instagram">
                <Instagram :size="20" />
              </a>
              <a href="https://linkedin.com" target="_blank" class="quick-contact-item" title="LinkedIn">
                <Linkedin :size="20" />
              </a>
              <a href="https://twitter.com" target="_blank" class="quick-contact-item" title="Twitter">
                <Twitter :size="20" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- PREMIUM CARDS DE ENVOLVIMENTO -->
      <section class="premium-cards-section">
        <div class="premium-cards-grid">
          <!-- CARD 1 -->
          <div class="premium-card bg-amarelo">
            <div class="pc-header">
              <span class="pc-number outlined-dark">01</span>
              <div class="pc-icon-wrapper"><Mail :size="32" /></div>
            </div>
            <div class="pc-body">
              <h3 class="pc-title">ASSINE A NEWS</h3>
              <p class="pc-desc text-[#202020]">Receba análises políticas profundas e atualizações do movimento direto na sua caixa de entrada.</p>
            </div>
            <router-link to="/arquivo-newsletter" class="pc-btn">
              Acessar <ArrowRight :size="20" />
            </router-link>
          </div>

          <!-- CARD 2 -->
          <div class="premium-card bg-azul">
            <div class="pc-header">
              <span class="pc-number outlined-light">02</span>
              <div class="pc-icon-wrapper"><Users :size="32" /></div>
            </div>
            <div class="pc-body">
              <h3 class="pc-title text-[#F5F0E8]">SEJA PARCEIRO</h3>
              <p class="pc-desc text-[#F5F0E8]">Junte sua organização à nossa rede para construirmos campanhas e projetos de impacto estrutural.</p>
            </div>
            <a href="#contato-form" class="pc-btn pc-btn-rosa">
              Fazer Parte <ArrowRight :size="20" />
            </a>
          </div>

          <!-- CARD 3 -->
          <div class="premium-card bg-verde">
            <div class="pc-header">
              <span class="pc-number outlined-dark">03</span>
              <div class="pc-icon-wrapper"><Heart :size="32" /></div>
            </div>
            <div class="pc-body">
              <h3 class="pc-title">APOIE</h3>
              <p class="pc-desc text-[#202020]">Sua contribuição financeira é fundamental para mantermos nossa independência e ampliarmos nosso alcance.</p>
            </div>
            <router-link to="/doacao" class="pc-btn">
              Contribuir <ArrowRight :size="20" />
            </router-link>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mail, ArrowRight, Heart, Users, Sparkles, Send, Check, Instagram, Linkedin, Twitter } from 'lucide-vue-next';

const isSubmitted = ref(false);
const form = ref({ name: '', email: '', subject: '', message: '' });

const submitForm = () => {
  setTimeout(() => {
    isSubmitted.value = true;
  }, 800);
};

const resetForm = () => {
  isSubmitted.value = false;
  form.value = { name: '', email: '', subject: '', message: '' };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.contact-page {
  background-color: var(--np-creme, #F5F0E8);
  min-height: 100vh;
  overflow-x: hidden;
}

.submitted-state {
  opacity: 0.1;
  pointer-events: none;
  filter: blur(8px);
  transition: all 0.5s ease;
}

/* HERO */
.premium-hero {
  position: relative;
  background-color: var(--np-creme, #F5F0E8);
  padding: 80px 0;
  overflow: hidden;
  border-bottom: 4px solid #1C1C1C;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container-max {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* QUICK CONTACT ROW */
.quick-contact-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid rgba(28,28,28,0.1);
}
.quick-contact-item {
  width: 48px; height: 48px;
  background: var(--np-black, #1C1C1C);
  color: #FFF;
  border: 2px solid var(--np-black, #1C1C1C);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  text-decoration: none;
}
.quick-contact-item:hover {
  background: var(--np-rosa, #FF3C82);
  border-color: var(--np-rosa, #FF3C82);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(255,60,130,0.4);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--np-rosa, #FF3C82); border: 2px solid var(--np-black, #1C1C1C); color: var(--np-white, #FFFFFF);
  padding: 10px 20px;
  border-radius: 40px;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 3px;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.premium-title {
  font-size: clamp(60px, 10vw, 120px);
  font-family: var(--font-display, 'Archivo Black', sans-serif);
  line-height: 0.9;
  letter-spacing: -3px;
  margin-bottom: 32px;
  text-transform: uppercase;
  color: var(--np-black, #1C1C1C);
}

.text-preto {
  color: var(--np-black, #1C1C1C);
}

.premium-subtitle {
  font-size: 20px;
  font-weight: 700;
  color: rgba(0,0,0,0.6);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
}

/* FORMULÁRIO DE CONTATO */
.form-section {
  padding: 80px 24px;
  background-color: var(--np-creme, #F5F0E8);
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border: 4px solid var(--np-black, #1C1C1C);
  border-radius: 2rem;
  padding: 60px;
  box-shadow: 12px 12px 0 var(--np-black, #1C1C1C);
}

.form-title {
  font-family: var(--font-display, 'Archivo Black', sans-serif);
  font-size: 40px;
  color: var(--np-black, #1C1C1C);
  margin-bottom: 16px;
  line-height: 1;
}

.form-desc {
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-size: 18px;
  font-weight: 700;
  color: rgba(0,0,0,0.6);
}

.brutal-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.brutal-form .input-group {
  display: flex;
  flex-direction: column;
}

.brutal-form label {
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-weight: 800;
  font-size: 12px;
  margin-bottom: 8px;
  color: var(--np-black, #1C1C1C);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.brutal-form input, .brutal-form textarea, .brutal-form select {
  width: 100%;
  padding: 16px 20px;
  border: 3px solid var(--np-black, #1C1C1C);
  outline: none;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-size: 16px;
  color: var(--np-black, #1C1C1C);
  background: var(--np-creme, #F5F0E8);
  border-radius: 12px;
  transition: all 0.2s;
}

.brutal-form input:focus, .brutal-form textarea:focus, .brutal-form select:focus {
  border-color: var(--np-rosa, #FF3C82);
  background: white;
  box-shadow: 4px 4px 0 var(--np-rosa, #FF3C82);
}

.btn-submit-brutal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  background: var(--np-black, #1C1C1C);
  color: white;
  padding: 20px;
  border: 3px solid var(--np-black, #1C1C1C);
  border-radius: 12px;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 6px 6px 0 var(--np-rosa, #FF3C82);
}

.btn-submit-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 var(--np-rosa, #FF3C82);
  background: white;
  color: var(--np-black, #1C1C1C);
}

/* PREMIUM CARDS */
.premium-cards-section {
  padding: 40px 24px 80px;
  background-color: var(--np-creme, #F5F0E8);
}

.premium-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.premium-card {
  border: 4px solid var(--np-black, #1C1C1C);
  border-radius: 2rem;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 12px 12px 0 var(--np-black, #1C1C1C);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.premium-card:hover {
  transform: translate(-8px, -8px);
  box-shadow: 20px 20px 0 var(--np-black, #1C1C1C);
}

.bg-amarelo { background-color: var(--np-amarelo, #E5C600); }
.bg-rosa { background-color: var(--np-rosa, #FF3C82); }
.bg-verde { background-color: var(--np-verde, #A0D246); }
.bg-azul { background-color: var(--np-azul, #3C64E6); }

.pc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.pc-number {
  font-family: var(--font-display, 'Archivo Black', sans-serif);
  font-size: 80px;
  line-height: 0.8;
  letter-spacing: -4px;
}

.outlined-dark { color: transparent; -webkit-text-stroke: 2px rgba(0,0,0,0.2); }
.outlined-light { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.4); }

.pc-icon-wrapper {
  background: var(--np-black, #1C1C1C);
  color: var(--np-white, #FFFFFF);
  padding: 16px;
  border-radius: 50%;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
}
.bg-rosa .pc-icon-wrapper { background: var(--np-white, #FFFFFF); color: var(--np-black, #1C1C1C); }
.bg-azul .pc-icon-wrapper { background: var(--np-white, #FFFFFF); color: var(--np-azul, #3C64E6); }

.pc-body {
  flex: 1;
}

.pc-title {
  font-family: var(--font-display, 'Archivo Black', sans-serif);
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.pc-desc {
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  opacity: 0.8;
  margin-bottom: 40px;
}

.pc-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--np-rosa, #FF3C82); border: 2px solid var(--np-black, #1C1C1C); color: var(--np-white, #FFFFFF);
  padding: 20px 24px;
  border-radius: 16px;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-weight: 900;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.pc-btn:hover {
  background-color: transparent;
  color: var(--np-black, #1C1C1C);
  box-shadow: 6px 6px 0 rgba(0,0,0,0.4);
}

.pc-btn.pc-btn-rosa {
  background-color: var(--np-rosa, #FF3C82) !important;
  color: var(--np-white, #FFFFFF) !important;
  border-color: var(--np-black, #1C1C1C) !important;
}

.pc-btn.pc-btn-rosa:hover {
  background-color: var(--np-black, #1C1C1C) !important;
  color: var(--np-white, #FFFFFF) !important;
}

/* OVERLAYS */
.success-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
}

.success-card {
  background-color: white;
  border: 4px solid var(--np-black, #1C1C1C);
  padding: 48px;
  max-width: 450px;
  width: 100%;
  text-align: center;
  border-radius: 2.5rem;
  box-shadow: 20px 20px 0 var(--np-black, #1C1C1C);
  position: relative;
}

.accent-bar-top-green {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 12px;
  background-color: var(--np-verde, #A0D246);
  border-bottom: 4px solid var(--np-black, #1C1C1C);
}

.success-icon-box {
  width: 80px;
  height: 80px;
  background-color: var(--np-verde, #A0D246);
  border: 4px solid var(--np-black, #1C1C1C);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.btn-black-full {
  display: block;
  width: 100%;
  background: var(--np-black, #1C1C1C);
  color: white;
  padding: 16px;
  border: 3px solid var(--np-black, #1C1C1C);
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 12px;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .premium-cards-grid { gap: 24px; }
  .form-wrapper { padding: 40px; }
}

@media (max-width: 768px) {
  .premium-cards-grid { grid-template-columns: 1fr; }
  .brutal-form .form-row { grid-template-columns: 1fr; gap: 0; }
  .premium-title { font-size: 48px; }
  .form-wrapper { border-radius: 2rem; padding: 24px; }
  .success-card { padding: 32px; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
