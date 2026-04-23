<script setup>
import { ref, onMounted, computed } from 'vue'
import { siteContent } from '../store/content'
import { supabase } from '../lib/supabase'
import { Zap, ArrowRight, Mail } from 'lucide-vue-next'

const config = computed(() => siteContent.newsletterArchiveConfig || {})
const email = ref('')
const isSubscribing = ref(false)
const newsletters = ref([])
const subscribeStatus = ref(null)

onMounted(async () => {
  if (siteContent.newsletters && siteContent.newsletters.length > 0) {
    newsletters.value = siteContent.newsletters
  } else {
    const { data } = await supabase
      .from('newsletters')
      .select('*')
      .order('enviado_em', { ascending: false })
    if (data) newsletters.value = data
  }
  window.scrollTo(0, 0)
})

const subscribe = async () => {
  if (!email.value) return
  isSubscribing.value = true
  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email: email.value }])
    
    if (error) {
      if (error.code === '23505') alert('Este e-mail já está inscrito!')
      else throw error
    } else {
      subscribeStatus.value = 'success'
      email.value = ''
      setTimeout(() => { subscribeStatus.value = null }, 4000)
    }
  } catch (e) {
    console.error(e)
    alert('Erro ao se inscrever. Tente novamente.')
  } finally {
    isSubscribing.value = false
  }
}
</script>

<template>
  <div class="newsletter-archive-page">
    <div class="grid-pattern-bg"></div>

    <div class="content-wrapper">
      <!-- HERO -->
      <header class="archive-hero fade-in-up">
        <h1 class="archive-title">
          {{ config.heroTitle1 || 'ACERVO DE' }} <br/> <span class="text-red">{{ config.heroTitle2 || 'EDIÇÕES' }}</span>
        </h1>
        <p class="archive-subtitle">
          {{ config.heroSubtitle || 'Explore as análises, despachos e convocações enviadas anteriormente para a nossa base.' }}
        </p>
      </header>

      <!-- SUBSCRIBE CARD (AMARELINHO) -->
      <section class="subscribe-section fade-in-up" style="animation-delay: 0.2s">
        <div class="newsletter-container-brutalist">
          <div class="newsletter-text">
            <div class="inline-flex-center gap-2 mb-4">
              <Zap class="text-red-icon" />
              <span class="eyebrow-news">{{ config.cardEyebrow || 'Assinatura Mensal' }}</span>
            </div>
            <h2 class="newsletter-title-home">
              {{ config.cardTitle || 'Gostou das últimas edições?' }}
            </h2>
            <p class="newsletter-desc-home">
              {{ config.cardDesc || 'Receba nossos despachos estratégicos mensalmente na sua caixa de entrada. Junte-se à nossa rede de mobilização. Sem spam.' }}
            </p>
          </div>
          
          <div class="newsletter-form-container">
            <form @submit.prevent="subscribe" class="newsletter-form-brutalist">
              <div v-if="subscribeStatus === 'success'" class="success-banner">
                Você agora receberá nossas atualizações!
              </div>
              <input 
                type="email" 
                v-model="email"
                required
                placeholder="Digite seu email..." 
                class="nl-input-brutalist"
              />
              <button type="submit" class="btn-red-brutalist" :disabled="isSubscribing">
                {{ isSubscribing ? 'ENVIANDO...' : (config.cardBtn || 'QUERO RECEBER') }} <ArrowRight v-if="!isSubscribing" :size="18" class="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- GRID DE ARQUIVO -->
      <section class="archive-grid-section fade-in-up" style="animation-delay: 0.4s">
        <div class="section-divider">
          <h3 class="divider-title">EDIÇÕES ANTERIORES</h3>
        </div>

        <div v-if="newsletters.length > 0" class="archive-grid">
          <router-link 
            v-for="(ed, i) in newsletters" 
            :key="i" 
            :to="'/arquivo-newsletter/' + ed.id" 
            class="nl-card-brutal shadow-solid"
          >
            <div class="nl-img-wrapper">
              <img :src="ed.capa_url || 'https://images.unsplash.com/photo-1585829365234-781fcdb4c8ef?w=800&h=600&fit=crop'" :alt="ed.titulo" loading="lazy" />
              <div class="nl-img-overlay"></div>
              <div class="nl-tag">
                <Mail :size="14" /> {{ ed.tag || 'Newsletter' }}
              </div>
            </div>
            <div class="nl-content">
              <div class="nl-date">{{ new Date(ed.enviado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) }}</div>
              <h3 class="nl-title">{{ ed.titulo }}</h3>
              <p class="nl-desc">{{ ed.descricao }}</p>
              <div class="nl-action">
                <span>LER EDIÇÃO</span>
                <ArrowRight :size="18" class="arrow-icon" />
              </div>
            </div>
          </router-link>
        </div>
        
        <div v-else class="empty-state-brutal">
          <p>{{ config.emptyState || 'Nenhuma edição encontrada no arquivo.' }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ESTRUTURA BASE */
.newsletter-archive-page {
  min-height: 100vh;
  background-color: #F7F7F5; /* Fundo base claro */
  color: #1C1C1C;
  position: relative;
  overflow-x: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 160px 40px 100px;
}

.grid-pattern-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(28,28,28,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 1;
  pointer-events: none;
}

/* HERO */
.archive-hero {
  text-align: center;
  margin-bottom: 80px;
}

.archive-title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
  color: #1C1C1C;
}

.text-red { color: #DF2028; }

.archive-subtitle {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #475569;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

/* SUBSCRIBE CARD (AMARELINHO) */
.subscribe-section {
  margin-bottom: 100px;
}

.newsletter-container-brutalist {
  background-color: #FFE65A;
  border: 4px solid #1C1C1C;
  padding: 60px;
  display: flex;
  gap: 60px;
  align-items: center;
  box-shadow: 16px 16px 0px #1C1C1C;
}

.newsletter-text {
  flex: 1.2;
}

.newsletter-form-container {
  flex: 1;
}

.inline-flex-center {
  display: inline-flex;
  align-items: center;
}

.text-red-icon {
  fill: #DF2028;
  color: #DF2028;
}

.eyebrow-news {
  font-family: "Inter", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: #1C1C1C;
}

.newsletter-title-home {
  font-family: "Archivo Black", sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  line-height: 1.1;
  color: #1C1C1C;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.newsletter-desc-home {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: rgba(28,28,28,0.85);
  line-height: 1.5;
}

.newsletter-form-brutalist {
  background: white;
  border: 4px solid #1C1C1C;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nl-input-brutalist {
  width: 100%;
  border: 4px solid #1C1C1C;
  padding: 16px 20px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  outline: none;
  background: #F7F7F5;
  transition: all 0.2s;
}

.nl-input-brutalist:focus {
  background: #FFF;
  box-shadow: 4px 4px 0 #1C1C1C;
}

.btn-red-brutalist {
  background: #DF2028;
  color: white;
  border: 4px solid #1C1C1C;
  padding: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}

.btn-red-brutalist:hover:not(:disabled) {
  background: #1C1C1C;
  color: #FFE65A;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #DF2028;
}

.btn-red-brutalist:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.ml-2 { margin-left: 8px; }

.success-banner {
  background: #A4CD39;
  border: 4px solid #1C1C1C;
  padding: 16px;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 8px;
}

/* SECTION DIVIDER */
.section-divider {
  border-bottom: 4px solid #1C1C1C;
  margin-bottom: 40px;
  padding-bottom: 10px;
}

.divider-title {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  color: #1C1C1C;
  margin: 0;
}

/* ARCHIVE GRID */
.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
}

.nl-card-brutal {
  background: #FFF;
  border: 4px solid #1C1C1C;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.shadow-solid {
  box-shadow: 8px 8px 0px #1C1C1C;
}

.nl-card-brutal:hover {
  transform: translate(-6px, -6px);
  box-shadow: 14px 14px 0px #1C1C1C;
  border-color: #3D78E0;
}

.nl-img-wrapper {
  position: relative;
  height: 200px;
  border-bottom: 4px solid #1C1C1C;
  overflow: hidden;
}

.nl-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.5s ease;
}

.nl-card-brutal:hover .nl-img-wrapper img {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.nl-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5));
}

.nl-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #FF6BCA;
  color: #FFF;
  padding: 6px 12px;
  border: 2px solid #1C1C1C;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
}

.nl-content {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.nl-date {
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #DF2028;
  margin-bottom: 12px;
  letter-spacing: 0.1em;
}

.nl-title {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.5rem;
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.nl-desc {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nl-action {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #1C1C1C;
  padding-top: 20px;
  border-top: 2px dashed #CBD5E1;
  transition: color 0.2s;
}

.nl-card-brutal:hover .nl-action {
  color: #DF2028;
  border-top-color: #1C1C1C;
}

.arrow-icon {
  transition: transform 0.2s;
}

.nl-card-brutal:hover .arrow-icon {
  transform: translateX(4px);
}

.empty-state-brutal {
  padding: 60px;
  text-align: center;
  background: white;
  border: 4px dashed #1C1C1C;
  font-family: "Archivo Black", sans-serif;
  font-size: 1.25rem;
  color: #475569;
  text-transform: uppercase;
}

/* ANIMAÇÕES */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVO */
@media (max-width: 900px) {
  .newsletter-container-brutalist {
    flex-direction: column;
    padding: 40px;
    gap: 40px;
  }
  
  .newsletter-text {
    text-align: center;
  }
  
  .inline-flex-center {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 120px 20px 80px;
  }
  
  .archive-title {
    font-size: 2.5rem;
  }
  
  .newsletter-container-brutalist {
    padding: 30px 20px;
  }
  
  .newsletter-form-brutalist {
    padding: 24px;
  }
  
  .archive-grid {
    grid-template-columns: 1fr;
  }
}
</style>