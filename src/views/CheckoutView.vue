<template>
  <div v-if="processState === 'loading'" class="checkout-page loading-state">
    <div class="loader"></div>
    <h2>Processando pagamento...</h2>
  </div>
  
  <div v-else-if="processState === 'success'" class="checkout-page success-state">
    <div class="success-icon">✓</div>
    <h2>Pagamento Confirmado!</h2>
    <p>Sua Trilha "{{ path?.title }}" foi desbloqueada. Você será redirecionado para a sala de aula.</p>
  </div>
  
  <div v-else-if="path" class="checkout-page container section-padding">
    <div class="checkout-header">
      <router-link to="/trilhas" class="back-link">← Voltar para Trilhas</router-link>
      <h1>Concluir Inscrição</h1>
      <p>Você está adquirindo acesso à trilha premium de alto impacto.</p>
    </div>

    <div class="checkout-grid">
      <!-- MOCK PAYMENT FORM -->
      <div class="payment-section glass-card">
        <h3>Dados de Pagamento</h3>
        
        <div class="payment-tabs">
          <button @click="payMethod = 'card'" :class="{ active: payMethod === 'card' }">Cartão de Crédito</button>
          <button @click="payMethod = 'pix'" :class="{ active: payMethod === 'pix' }">PIX</button>
        </div>

        <form v-if="payMethod === 'card'" @submit.prevent="handlePayment" class="card-form">
          <div class="field full-width">
            <label>Número do Cartão</label>
            <input type="text" placeholder="0000 0000 0000 0000" />
          </div>
          <div class="field full-width">
            <label>Nome no Cartão</label>
            <input type="text" placeholder="JOAO M SILVA" />
          </div>
          <div class="field">
            <label>Validade</label>
            <input type="text" placeholder="MM/AA" />
          </div>
          <div class="field">
            <label>CVV</label>
            <input type="text" placeholder="123" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Pagar {{ path.price || 'R$ 197,00' }}</button>
        </form>

        <div v-else class="pix-form">
          <div class="qr-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <p>Escaneie o QR Code no seu app de banco</p>
          </div>
          <button type="button" @click="handlePayment" class="btn btn-primary btn-block">Simular Pagamento Fake</button>
        </div>
      </div>

      <!-- ORDER SUMMARY -->
      <aside class="summary-section">
        <div class="glass-card summary-box">
          <h3>Resumo do Pedido</h3>
          
          <div class="order-item">
            <div class="item-desc">
              <strong>Trilha Estratégica</strong>
              <span>{{ path.title }}</span>
            </div>
            <div class="item-price">{{ path.price || 'R$ 197,00' }}</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="order-total">
            <span>Total</span>
            <strong>{{ path.price || 'R$ 197,00' }}</strong>
          </div>
          
          <div class="security-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Ambiente Mock Simulado
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '../store/content'
import { useAuth } from '../store/auth'

const route = useRoute()
const router = useRouter()
const { mockSwitchRole } = useAuth()

const path = computed(() => siteContent.paths.find(p => p.id === parseInt(route.params.id)))
const payMethod = ref('card')
const processState = ref('idle')

const handlePayment = () => {
  processState.value = 'loading'
  
  // Simular conexão de gateway
  setTimeout(() => {
    processState.value = 'success'
    // O usuário pagou! Então vamos mudar secretamente a role dele pra Premium pra ele passar no Paywall
    mockSwitchRole('premium')
    
    // Redireciona pra sala de aula em 2 segundos
    setTimeout(() => {
      router.push(`/aula/${path.value.id}`)
    }, 2000)
  }, 1500)
}
</script>

<style scoped>
.checkout-page {
  padding-top: 140px;
  min-height: 80vh;
  background: #F8FAFC;
}

.checkout-header { text-align: center; margin-bottom: 50px; }
.checkout-header h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 10px; }
.back-link { font-weight: 800; color: var(--color-purple); text-decoration: none; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 20px; display: inline-block;}

.checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; max-width: 1000px; margin: 0 auto; }

.glass-card { background: white; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 40px rgba(0,0,0,0.03); }

.payment-section h3, .summary-section h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 24px; color: #1E293B; }

.payment-tabs { display: flex; gap: 10px; margin-bottom: 24px; }
.payment-tabs button { flex: 1; padding: 12px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px; font-weight: 700; cursor: pointer; color: #64748B; transition: all 0.2s; }
.payment-tabs button.active { background: var(--color-lime); color: var(--color-graphite); border-color: var(--color-lime); }

.card-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; }
.field.full-width { grid-column: 1 / -1; }
.field label { font-size: 0.8rem; font-weight: 700; margin-bottom: 6px; color: #475569; }
.field input { padding: 14px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 1rem; }

.btn-block { grid-column: 1 / -1; margin-top: 10px; padding: 18px; font-size: 1.1rem; }

.pix-form { text-align: center; }
.qr-placeholder { background: #F8FAFC; border: 2px dashed #CBD5E1; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; border-radius: 12px; color: #94A3B8;}

.order-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.item-desc strong { display: block; font-size: 1.1rem; color: #1E293B; }
.item-desc span { font-size: 0.9rem; color: #64748B; }
.item-price { font-weight: 800; font-size: 1.1rem; }

.divider { height: 1px; background: #E2E8F0; margin: 20px 0; }
.order-total { display: flex; justify-content: space-between; align-items: center; font-size: 1.2rem; }
.order-total strong { font-weight: 900; font-size: 1.5rem; color: #00CED1; }

.security-badge { margin-top: 30px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #10B981; font-weight: 700; font-size: 0.85rem; background: #D1FAE5; padding: 10px; border-radius: 6px; }

/* STATES */
.loading-state, .success-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh; text-align: center; }
.loader { border: 4px solid #F3F3F3; border-top: 4px solid var(--color-purple); border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin-bottom: 20px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.success-icon { background: #10B981; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin-bottom: 20px; }

@media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } }
</style>
