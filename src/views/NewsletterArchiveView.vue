<template>
  <div class="archive-view">
    <header class="archive-hero">
      <div class="container hero-inner">
        <span class="vault-kicker">THE VAULT</span>
        <h1>Arquivo <span>Editorial</span></h1>
        <p>Acesse o repositório histórico de nossas newsletters semanais. Curadoria técnica sobre economia, política e gênero.</p>
      </div>
    </header>

    <section class="archive-content container">
      <div class="vault-list">
        <div v-for="nl in siteContent.newsletters" :key="nl.id" class="vault-item" @click="openNewsletter(nl)">
          <div class="vault-date">
            <template v-if="nl.date">
              <span class="day">{{ nl.date.includes('-') ? nl.date.split('-')[2] : nl.date.split('/')[0] }}</span>
              <span class="month">{{ 
                new Date(nl.date.includes('-') ? nl.date : nl.date.split('/').reverse().join('-'))
                .toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase() 
              }}</span>
            </template>
          </div>
          <div class="vault-info">
            <h3 class="vault-title">{{ nl.title || nl.subject }}</h3>
            <p class="vault-summary" v-if="nl.summary">{{ nl.summary }}</p>
            <p class="vault-subject text-readable">{{ nl.subject }}</p>
          </div>
          <div class="vault-action">
            <button class="btn-read">Ler Edição <ArrowRight :size="16" /></button>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DE LEITURA IMERSIVA -->
    <transition name="modal-fade">
      <div v-if="selectedNl" class="vault-modal-overlay" @click.self="closeModal">
        <div class="vault-modal-card">
          <header class="modal-header">
            <span class="modal-date">{{ selectedNl.date }}</span>
            <button class="close-btn" @click="closeModal"><X :size="24" /></button>
          </header>
          <div class="modal-body">
            <h2 class="modal-title">{{ selectedNl.title || selectedNl.subject }}</h2>
            <p class="modal-summary-box" v-if="selectedNl.summary">{{ selectedNl.summary }}</p>
            <p class="modal-subject">{{ selectedNl.subject }}</p>
            <hr class="modal-divider" />
            <div class="modal-html-content rich-text-styled no-copy" @contextmenu.prevent @copy.prevent v-html="selectedNl.content"></div>
          </div>
          <footer class="modal-footer">
            <p>Narrativa Política • Inteligência e Estratégia</p>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteContent } from '../store/content'
import { X, ArrowRight } from 'lucide-vue-next'

const selectedNl = ref(null)

const openNewsletter = (nl) => {
  selectedNl.value = nl
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedNl.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.archive-view { background: #FFFFFF; min-height: 100vh; padding-top: 140px; }

/* HERO */
.archive-hero { background: #F9FAFB; padding: 100px 0; text-align: center; border-bottom: 1px solid #F1F5F9; }
.vault-kicker { font-size: 0.75rem; font-weight: 900; color: #8A2BE2; letter-spacing: 3px; display: block; margin-bottom: 16px; }
.archive-hero h1 { font-size: 4rem; font-weight: 900; color: #111827; letter-spacing: -2.5px; margin-bottom: 24px; }
.archive-hero h1 span { color: #FF2D55; }
.archive-hero p { font-size: 1.25rem; color: #374151; max-width: 650px; margin: 0 auto; line-height: 1.6; }

/* LIST */
.archive-content { padding: 80px 0; }
.vault-list { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

.vault-item {
  display: grid; grid-template-columns: 100px 1fr auto; gap: 40px; align-items: center;
  padding: 32px; background: #fff; border: 1px solid #F1F5F9; border-radius: 24px;
  cursor: pointer; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.vault-item:hover { transform: scale(1.02); border-color: #8A2BE2; box-shadow: 0 20px 40px rgba(0,0,0,0.04); }

.vault-date { text-align: center; display: flex; flex-direction: column; line-height: 1; }
.vault-date .day { font-size: 1.8rem; font-weight: 900; color: #111827; }
.vault-date .month { font-size: 0.75rem; font-weight: 800; color: #FF2D55; text-transform: uppercase; margin-top: 4px; }

.vault-title { font-size: 1.4rem; font-weight: 800; color: #111827; margin-bottom: 4px; }
.vault-summary { font-size: 0.9rem; color: #8A2BE2; font-weight: 700; margin-bottom: 8px; font-style: italic; }
.vault-subject { font-size: 1rem; color: #374151; }

.btn-read { background: none; border: none; display: flex; align-items: center; gap: 8px; color: #8A2BE2; font-weight: 800; font-size: 0.9rem; cursor: pointer; }

/* MODAL */
.vault-modal-overlay { position: fixed; inset: 0; background: rgba(17,24,39,0.9); backdrop-filter: blur(12px); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 40px; }
.vault-modal-card { background: #fff; width: 100%; max-width: 850px; max-height: 90vh; border-radius: 40px; position: relative; overflow-y: auto; display: flex; flex-direction: column; }

.modal-header { padding: 40px 60px 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: #fff; z-index: 10; }
.modal-date { font-size: 0.85rem; font-weight: 900; color: #FF2D55; text-transform: uppercase; letter-spacing: 1px; }
.close-btn { background: #F1F5F9; border: none; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; transition: all 0.2s; }
.close-btn:hover { background: #FF2D55; color: #fff; }

.modal-body { padding: 0 60px 60px; flex: 1; }
.modal-title { font-size: 3rem; font-weight: 900; color: #111827; letter-spacing: -2px; line-height: 1.1; margin-bottom: 16px; }
.modal-summary-box { font-size: 1.3rem; font-weight: 700; color: #FF2D55; margin-bottom: 16px; font-style: italic; line-height: 1.4; border-left: 4px solid #FF2D55; padding-left: 20px; }
.modal-subject { font-size: 1.2rem; color: #64748B; font-weight: 500; margin-bottom: 40px; }
.modal-divider { border: none; border-top: 1px solid #F1F5F9; margin-bottom: 40px; }

.modal-html-content :deep(p) { font-family: "Inter", sans-serif; font-size: 1.25rem; line-height: 1.8; color: #334155; margin-bottom: 2rem; }
.modal-html-content :deep(blockquote) { margin: 2rem 0; padding: 1.5rem 32px; border-left: 6px solid #FF2D55; background: #FDF2F5; font-size: 1.4rem; font-weight: 700; color: #111827; }

.modal-footer { padding: 40px 60px; background: #F9FAFB; text-align: center; border-top: 1px solid #F1F5F9; }
.modal-footer p { font-size: 0.85rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; }

.no-copy { user-select: none; -webkit-user-select: none; }

/* ANIMATIONS */
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.modal-fade-enter-from { opacity: 0; transform: scale(0.9) translateY(40px); }
.modal-fade-leave-to { opacity: 0; transform: scale(0.95); }

@media (max-width: 768px) {
  .vault-item { grid-template-columns: 1fr; text-align: center; gap: 20px; }
  .vault-date { align-items: center; }
  .vault-action { display: flex; justify-content: center; }
  .modal-title { font-size: 2.2rem; }
  .vault-modal-card { border-radius: 0; max-height: 100vh; }
  .vault-modal-overlay { padding: 0; }
}
</style>