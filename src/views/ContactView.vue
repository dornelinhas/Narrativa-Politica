<template>
  <div class="contact-ultra-minimal">
    <div class="container contact-container-new">
      
      <!-- GRID EM DUAS COLUNAS -->
      <div class="contact-split-grid">
        
        <!-- COLUNA ESQUERDA: CANAIS DE CONTATO -->
        <div class="social-minimal-sidebar">
          <div class="sidebar-info-block">
            <h2 class="sidebar-label">Canais Diretos</h2>
            <div class="icon-stack-minimal">
              <a href="mailto:contatonarrativapolitica@gmail.com" class="social-row-btn box-pink">
                <Mail :size="20" />
                <span class="btn-text">E-mail</span>
              </a>
              <a href="https://www.linkedin.com/company/narrativa-políticaorg" target="_blank" class="social-row-btn box-purple">
                <Linkedin :size="20" />
                <span class="btn-text">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/narrativapolitica/" target="_blank" class="social-row-btn box-lime">
                <Instagram :size="20" />
                <span class="btn-text">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <!-- COLUNA DIREITA: FORMULÁRIO EM CARD -->
        <div class="form-card-area">
          <div class="minimal-card-form shadow-premium">
            <div class="form-header-minimal">
              <h3>Envie uma Mensagem</h3>
              <p>Retornamos em até 24 horas úteis.</p>
            </div>
            
            <form action="https://formsubmit.co/contatonarrativapolitica@gmail.com" method="POST" class="auth-form-refined">
              <input type="hidden" name="_next" value="http://localhost:5173/contatos?success=true">
              
              <div class="field-stack">
                <div class="minimal-input-group">
                  <label>Nome</label>
                  <input type="text" name="name" placeholder="Como podemos te chamar?" required />
                </div>
                
                <div class="minimal-input-group">
                  <label>Seu E-mail</label>
                  <input type="email" name="email" placeholder="exemplo@email.com" required />
                </div>

                <div class="minimal-input-group">
                  <label>Mensagem</label>
                  <textarea name="message" rows="5" placeholder="Descreva sua dúvida ou proposta..." required></textarea>
                </div>
              </div>

              <button type="submit" class="btn-submit-gradient-vibrant">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- BANNER DE APOIO CENTRALIZADO E PROEMINENTE -->
    <section class="integrated-donation-section">
      <div class="container-narrow text-center content-centered">
        <span class="eyebrow">Faça a Diferença</span>
        <h2 class="donation-title-fixed">Apoie a <span class="text-pink">Narrativa Política</span></h2>
        <p class="donation-desc-fixed">Sua contribuição financia a produção de dados técnicos e a formação de novas lideranças.</p>
        <div class="action-center">
          <router-link to="/doacao" class="btn-white-lux">Conhecer formas de apoio →</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Mail, Linkedin, Instagram } from 'lucide-vue-next'
</script>

<style scoped>
.contact-ultra-minimal {
  background: #F8F9FA;
  min-height: 100vh;
  padding: 180px 0 100px;
}

.contact-container-new {
  max-width: 900px !important;
}

.contact-split-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 80px;
  align-items: start;
}

/* SIDEBAR REFINADA */
.sidebar-label {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #CBD5E1;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.icon-stack-minimal {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-row-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-row-btn:hover {
  transform: translateX(10px) translateY(-2px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.box-pink { background: linear-gradient(135deg, #FF2D55 0%, #FF5E7E 100%); }
.box-purple { background: linear-gradient(135deg, #8A2BE2 0%, #A45FF1 100%); }
.box-lime { background: linear-gradient(135deg, #D4E157 0%, #E6EE9C 100%); color: #111827; }

/* FORM CARD LUX */
.minimal-card-form {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 60px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 
    0 40px 100px rgba(17, 24, 39, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.form-header-minimal {
  margin-bottom: 40px;
}

.form-header-minimal h3 {
  font-size: 1.8rem;
  font-weight: 900;
  color: #111827;
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.form-header-minimal p {
  color: #64748B;
  font-size: 0.95rem;
}

.shadow-premium {
  box-shadow: 0 40px 100px rgba(17, 24, 39, 0.04);
}

.field-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.minimal-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.minimal-input-group label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding-left: 4px;
}

.minimal-input-group input, 
.minimal-input-group textarea {
  padding: 18px 20px;
  background: #FFFFFF;
  border: 1.5px solid #F1F5F9;
  border-radius: 18px;
  font-size: 1rem;
  color: #111827;
  transition: all 0.3s ease;
}

.minimal-input-group input:focus, 
.minimal-input-group textarea:focus {
  background: #fff;
  border-color: #FF2D55;
  outline: none;
  box-shadow: 0 10px 30px rgba(255, 45, 85, 0.08);
}

.btn-submit-gradient-vibrant {
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #FF2D55 0%, #8A2BE2 100%);
  color: #fff;
  border: none;
  border-radius: 100px;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: 0 10px 30px rgba(255, 45, 85, 0.2);
}

.btn-submit-gradient-vibrant:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 45, 85, 0.35);
}

/* BANNER DE APOIO CENTRALIZADO */
.integrated-donation-section {
  background: linear-gradient(135deg, #FF2D55 0%, #8A2BE2 50%, #111827 100%);
  padding: 120px 0;
  margin-top: 100px;
  position: relative;
  overflow: hidden;
}

.content-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 16px;
}

.donation-title-fixed {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 900;
  color: #fff !important;
  margin-bottom: 24px;
  letter-spacing: -2px;
  line-height: 1.1;
}

.text-pink { color: #FF2D55; }

.donation-desc-fixed {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.85);
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

.btn-white-lux {
  display: inline-block;
  padding: 20px 60px;
  background: #fff;
  color: #111827;
  border-radius: 100px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-white-lux:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  color: #FF2D55;
}

@media (max-width: 900px) {
  .contact-split-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  .sidebar-info-block {
    text-align: center;
  }
  .icon-stack-minimal {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .social-row-btn {
    padding: 12px 20px;
  }
  .minimal-card-form {
    padding: 40px 20px;
  }
}
</style>
