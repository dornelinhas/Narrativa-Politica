<template>
  <div v-if="service" class="service-detail">
    <!-- HERO -->
    <header class="svc-header">
      <div class="container svc-header-inner">
        <router-link to="/servicos" class="svc-back-link">← Todos os Serviços</router-link>
        
        <div class="svc-meta">
          <span class="svc-tag">{{ service.type }}</span>
        </div>
        
        <h1 class="svc-title">{{ service.title }}</h1>
        <p class="svc-subtitle">{{ service.target }}</p>
      </div>
    </header>

    <!-- CONTENT -->
    <article class="svc-body">
      <div class="container svc-body-inner">
        
        <div class="svc-text-block">
          <h2 class="svc-heading">Visão Geral</h2>
          <div class="svc-paragraph" v-html="service.description || 'Nenhuma descrição disponível.'"></div>
        </div>

        <div class="svc-divider"></div>

        <div v-if="service.benefits" class="svc-text-block">
          <h2 class="svc-heading">Principais Benefícios</h2>
          <div class="svc-paragraph" v-html="service.benefits"></div>
          <div class="svc-divider"></div>
        </div>

        <div class="svc-text-block">
          <h2 class="svc-heading">Investimento</h2>
          <p class="svc-paragraph" style="font-weight: 800; color: var(--color-petrol);">{{ service.price || 'Sob consulta' }}</p>
        </div>

      </div>
    </article>

    <!-- BOTTOM CTA CAIXA DE IMPACTO -->
    <section class="svc-cta-section">
      <div class="container">
        <div class="svc-cta-vibrant">
          <div class="cta-vibrant-glow"></div>
          <div class="cta-vibrant-content">
            <div class="cta-vibrant-text">
              <div class="cta-label-vibrant">CONEXÃO E IMPACTO</div>
              <h3>Iniciar este <span>atendimento</span></h3>
              <p>Leve nossa expertise estratégica para sua organização ou inicie sua mentoria individual agora mesmo.</p>
            </div>
            <router-link to="/contatos" class="btn-cta-vibrant">
              <span>Solicitar Proposta Agora</span>
              <ArrowRight :size="20" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container section-padding text-center" style="margin-top: 100px;">
    <h2>Serviço não encontrado</h2>
    <router-link to="/servicos" class="svc-btn-primary" style="margin-top: 20px; display: inline-block;">Ver Serviços</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const service = computed(() => siteContent.services.find(s => s.id === parseInt(route.params.id)))
</script>

<style scoped>
/* HEADER */
.svc-header {
  background: #F9FAFB;
  padding: 160px 0 80px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  text-align: center;
}

.svc-header-inner {
  max-width: 800px;
  margin: 0 auto;
}

.svc-back-link {
  display: inline-block;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-petrol);
  text-decoration: none;
  font-size: 0.8rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.svc-meta {
  margin-bottom: 24px;
}

.svc-tag {
  background: var(--color-graphite);
  color: #fff;
  font-weight: 900;
  font-size: 0.7rem;
  padding: 6px 14px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.svc-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: var(--color-graphite);
  line-height: 1.15;
  margin-bottom: 16px;
  word-wrap: break-word; /* Prevents long names from getting cut off */
}

.svc-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* BODY */
.svc-body {
  padding: 80px 0;
  background: #fff;
}

.svc-body-inner {
  max-width: 760px;
  margin: 0 auto;
}

.svc-heading {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-graphite);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.svc-paragraph {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
}

.svc-divider {
  height: 1px;
  background: #E2E8F0;
  margin: 40px 0;
}

/* CTA */
.svc-cta-section {
  padding: 120px 0;
  background: #F9FAFB; /* OFF-WHITE LIMPO */
  border-top: 1px solid #E5E7EB;
}

.svc-cta-vibrant {
  background: #fff;
  border-radius: 32px;
  padding: 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  border: 1px solid #E5E7EB;
  text-align: center;
}

.cta-vibrant-glow {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,45,85,0.05) 0%, transparent 70%);
  z-index: 1;
}

.cta-vibrant-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.cta-label-vibrant {
  font-size: 0.8rem;
  font-weight: 800;
  color: #94A3B8;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.cta-vibrant-text h3 {
  font-size: 3rem;
  color: #111827;
  font-weight: 900;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.cta-vibrant-text h3 span {
  color: #FF2D55;
}

.cta-vibrant-text p {
  color: #64748B;
  font-size: 1.25rem;
  max-width: 600px;
  line-height: 1.6;
  margin: 0 auto;
}

.btn-cta-vibrant {
  background: #111827;
  color: #fff;
  text-decoration: none;
  font-weight: 900;
  padding: 24px 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.15rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  white-space: nowrap;
}

.btn-cta-vibrant:hover {
  transform: translateY(-5px);
  background: #FF2D55;
  box-shadow: 0 15px 35px rgba(255,45,85,0.3);
}

@media (max-width: 768px) {
  .svc-cta-vibrant { padding: 48px 24px; }
  .cta-vibrant-text h3 { font-size: 2.2rem; }
  .btn-cta-vibrant { width: 100%; justify-content: center; }
}
</style>
