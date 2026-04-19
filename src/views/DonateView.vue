<script setup>
import { ref } from 'vue'
const isMonthly = ref(true)
const selectedAmount = ref(100)
</script>

<template>
  <div class="apoie-page">
    <div class="page-content">
      <div class="donation-card">
        <div class="donation-headline">Apoie a Mudança Agora.<br>Seu Impacto é Nossa Força.</div>
        <div class="donation-toggle-row">
          <span class="toggle-label">Única</span>
          <div class="toggle" :class="{ active: isMonthly }" @click="isMonthly = !isMonthly">
            <div class="toggle-knob"></div>
          </div>
          <span class="toggle-label">Mensal</span>
        </div>
        <div class="amount-grid">
          <button class="amount-btn amt-yellow" @click="selectedAmount = 50">R$50</button>
          <button class="amount-btn amt-red" @click="selectedAmount = 100">R$100</button>
          <button class="amount-btn amt-blue" @click="selectedAmount = 200">R$200</button>
          <button class="amount-btn amt-outline" @click="selectedAmount = 0">Outro Valor</button>
        </div>
        <a href="#" class="doar-btn">Doar Agora →</a>
        <p class="donation-description">Sua contribuição financia materiais educativos e campanhas de<br>pressão pública para um futuro mais justo.</p>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon si-purple">👥</div>
          <div class="stat-text"><strong>IMPACTO: 2.500+</strong><br>Líderes Formados em Programas de Incidência Política.</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon si-blue">❝</div>
          <div class="stat-text">"A NP me deu as ferramentas para atuar na minha comunidade."<br><strong>- Maria, Ativista.</strong></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon si-green">📢</div>
          <div class="stat-text"><strong>RESULTADO: 10+</strong><br>Campanhas Legislativas Apoiadas e Fortalecidas.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.apoie-page{background:linear-gradient(135deg,#CC0000 0%,#DD2200 20%,#CC3300 35%,#DDAA00 55%,#88CC00 75%,#33CC22 100%);min-height:100vh;display:flex;flex-direction:column}
.page-content{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:28px}
.donation-card{background:rgba(25,25,25,0.95);border:3px solid #F5E000;border-radius:8px;padding:40px 48px;max-width:740px;width:100%;text-align:center}
.donation-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(36px,6vw,72px);text-transform:uppercase;line-height:0.95;color:#fff;margin-bottom:28px}
.donation-toggle-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:28px}
.toggle-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#fff}
.toggle{width:56px;height:30px;background:rgba(255,255,255,0.2);border-radius:15px;position:relative;cursor:pointer;transition:background 0.3s}
.toggle.active{background:#F5E000}
.toggle-knob{position:absolute;width:24px;height:24px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left 0.3s}
.toggle.active .toggle-knob{left:29px}
.amount-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.amount-btn{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:22px;letter-spacing:1px;padding:16px 8px;border:none;border-radius:4px;cursor:pointer;transition:all 0.2s}
.amt-yellow{background:#F5E000;color:#0A0A0A}
.amt-red{background:#E5292A;color:#fff}
.amt-blue{background:#1B8FFF;color:#fff}
.amt-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.5);font-size:16px}
.amount-btn:hover{filter:brightness(1.1)}
.doar-btn{display:flex;align-items:center;justify-content:center;width:100%;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:20px;letter-spacing:2px;text-transform:uppercase;padding:18px;background:#E5292A;color:#fff;border:none;border-radius:3px;cursor:pointer;text-decoration:none;transition:all 0.2s}
.doar-btn:hover{background:#c0201f}
.donation-description{font-size:15px;color:rgba(255,255,255,0.75);line-height:1.5;margin-top:16px}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:740px;width:100%}
.stat-card{background:rgba(25,25,25,0.88);border-radius:8px;padding:20px 18px;display:flex;align-items:flex-start;gap:14px}
.stat-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.si-purple{background:#6C3BFF}
.si-blue{background:#1B8FFF}
.si-green{background:#00CC77}
.stat-text{font-size:13px;color:rgba(255,255,255,0.82);line-height:1.4}
.stat-text strong{color:#fff;font-weight:700}
@media(max-width:700px){.amount-grid{grid-template-columns:repeat(2,1fr)}.stats-row{grid-template-columns:1fr}.donation-card{padding:28px 20px}}
</style>