<script setup>
import { ref } from 'vue'
import { Handshake, Megaphone, MessageSquare } from 'lucide-vue-next'
const activeType = ref('parcerias')
const types = [
  { key: 'parcerias', icon: Handshake, label: 'Parcerias' },
  { key: 'imprensa', icon: Megaphone, label: 'Imprensa' },
  { key: 'geral', icon: MessageSquare, label: 'Geral' }
]
</script>

<template>
  <div class="contato-page grid-dark">
    <div class="page-content">
      <div class="contact-wrapper">
        <div class="contact-left">
          <h1>Contato</h1>
          <div class="contact-types">
            <div v-for="t in types" :key="t.key" class="contact-type-btn" :class="{ active: activeType === t.key }" @click="activeType = t.key">
              <span class="icon"><component :is="t.icon" :size="24" :stroke-width="2.5" /></span>
              <div class="contact-type-label">{{ t.label }}</div>
            </div>
          </div>
          <div class="contact-form">
            <div class="form-row">
              <input type="text" class="contact-input" placeholder="Nome">
              <input type="email" class="contact-input" placeholder="Email">
            </div>
            <input type="text" class="contact-input" placeholder="Assunto">
            <textarea class="contact-textarea" placeholder="Mensagem"></textarea>
            <button class="contact-submit">Enviar Mensagem</button>
          </div>
        </div>
        <div class="geo-art">
          <!-- Bold Pop-Art Mondrian composition with thick black strokes -->
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <!-- Base grid -->
            <rect width="420" height="420" fill="#f0f0f0"/>

            <!-- Top row blocks -->
            <rect x="0" y="0" width="140" height="140" fill="#FF2D78" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="140" y="0" width="140" height="140" fill="#F5E000" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="280" y="0" width="140" height="140" fill="#1B8FFF" stroke="#0A0A0A" stroke-width="4"/>

            <!-- Mid row blocks -->
            <rect x="0" y="140" width="140" height="140" fill="#AAFF00" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="140" y="140" width="140" height="140" fill="#FF2D78" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="280" y="140" width="140" height="140" fill="#F5E000" stroke="#0A0A0A" stroke-width="4"/>

            <!-- Bottom row blocks -->
            <rect x="0" y="280" width="140" height="140" fill="#1B8FFF" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="140" y="280" width="140" height="140" fill="#AAFF00" stroke="#0A0A0A" stroke-width="4"/>
            <rect x="280" y="280" width="140" height="140" fill="#FF2D78" stroke="#0A0A0A" stroke-width="4"/>

            <!-- Top left: circle + triangle -->
            <circle cx="70" cy="60" r="50" fill="#FF7A00" stroke="#0A0A0A" stroke-width="3"/>
            <polygon points="0,140 70,20 140,140" fill="#0A0A0A" opacity="0.4"/>
            <rect x="10" y="90" width="50" height="50" fill="#0A0A0A" opacity="0.3" stroke="#0A0A0A" stroke-width="2"/>

            <!-- Top center: rectangle + triangle -->
            <rect x="150" y="10" width="80" height="80" rx="4" fill="#0A0A0A" opacity="0.3" stroke="#0A0A0A" stroke-width="3"/>
            <polygon points="160,130 240,50 240,130" fill="#FF2D78" stroke="#0A0A0A" stroke-width="3"/>
            <rect x="155" y="55" width="30" height="30" fill="#AAFF00" stroke="#0A0A0A" stroke-width="2"/>
            <!-- Stripes -->
            <line x1="200" y1="0" x2="200" y2="140" stroke="#0A0A0A" stroke-width="6" opacity="0.2"/>
            <line x1="215" y1="0" x2="215" y2="140" stroke="#0A0A0A" stroke-width="3" opacity="0.15"/>

            <!-- Top right: circle + dot -->
            <circle cx="350" cy="70" r="55" fill="#AAFF00" stroke="#0A0A0A" stroke-width="3"/>
            <rect x="290" y="0" width="50" height="50" fill="#0A0A0A" opacity="0.25" stroke="#0A0A0A" stroke-width="2"/>
            <circle cx="390" cy="12" r="25" fill="#E5292A" stroke="#0A0A0A" stroke-width="3"/>

            <!-- Mid left: triangle -->
            <polygon points="0,140 140,200 0,280" fill="#1B8FFF" stroke="#0A0A0A" stroke-width="3" opacity="0.8"/>
            <rect x="20" y="160" width="60" height="60" fill="#0A0A0A" opacity="0.3" stroke="#0A0A0A" stroke-width="2"/>
            <circle cx="110" cy="210" r="25" fill="#F5E000" stroke="#0A0A0A" stroke-width="3"/>

            <!-- Mid center: concentric shapes -->
            <circle cx="210" cy="210" r="50" fill="#F5E000" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="210" cy="210" r="30" fill="#FF2D78" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="210" cy="210" r="12" fill="#0A0A0A"/>
            <rect x="170" y="170" width="80" height="80" rx="40" fill="none" stroke="#0A0A0A" stroke-width="5"/>

            <!-- Mid right: arrow + shapes -->
            <polygon points="280,280 420,210 420,280" fill="#1B8FFF" stroke="#0A0A0A" stroke-width="3" opacity="0.7"/>
            <rect x="300" y="150" width="80" height="80" rx="40" fill="#0A0A0A" opacity="0.3" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="380" cy="240" r="30" fill="#FF2D78" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="380" cy="240" r="18" stroke="#AAFF00" stroke-width="4" fill="none"/>
            <text x="310" y="280" font-size="36" fill="#AAFF00" font-weight="900">↗</text>

            <!-- Bottom left: circles -->
            <polygon points="0,280 140,280 0,420" fill="#F5E000" stroke="#0A0A0A" stroke-width="3" opacity="0.7"/>
            <circle cx="60" cy="370" r="40" fill="#FF2D78" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="60" cy="370" r="20" fill="#0A0A0A"/>

            <!-- Bottom center: bullseye -->
            <rect x="155" y="295" width="110" height="110" fill="#0A0A0A" opacity="0.2" stroke="#0A0A0A" stroke-width="2"/>
            <circle cx="210" cy="350" r="40" fill="#1B8FFF" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="210" cy="350" r="20" fill="#0A0A0A"/>
            <polygon points="150,420 270,300 270,420" fill="#FF2D78" stroke="#0A0A0A" stroke-width="3" opacity="0.5"/>

            <!-- Bottom right: dots -->
            <circle cx="320" cy="310" r="25" fill="#0A0A0A" opacity="0.5"/>
            <circle cx="390" cy="310" r="18" fill="#F5E000" stroke="#0A0A0A" stroke-width="3"/>
            <circle cx="355" cy="375" r="30" fill="#AAFF00" stroke="#0A0A0A" stroke-width="3"/>
            <text x="365" y="400" font-size="32" fill="#0A0A0A" font-weight="900">→</text>

            <!-- Heavy grid lines -->
            <line x1="140" y1="0" x2="140" y2="420" stroke="#0A0A0A" stroke-width="4"/>
            <line x1="280" y1="0" x2="280" y2="420" stroke="#0A0A0A" stroke-width="4"/>
            <line x1="0" y1="140" x2="420" y2="140" stroke="#0A0A0A" stroke-width="4"/>
            <line x1="0" y1="280" x2="420" y2="280" stroke="#0A0A0A" stroke-width="4"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.contato-page{background:#1f1f2e;color:#fff;min-height:100vh}
.grid-dark{background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px}
.page-content{display:flex;align-items:center;justify-content:center;padding:120px 32px 40px;min-height:calc(100vh - 56px)}
.contact-wrapper{background:#F5E000;border-radius:8px;padding:36px 40px;max-width:832px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.contact-left h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(52px,7vw,88px);text-transform:uppercase;color:#0A0A0A;line-height:0.9;margin-bottom:24px}
.contact-types{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.contact-type-btn{background:#fff;border:2px solid #0A0A0A;border-radius:6px;padding:14px 8px;text-align:center;cursor:pointer;transition:all 0.2s}
.contact-type-btn:hover,.contact-type-btn.active{background:#0A0A0A;color:#fff}
.contact-type-btn .icon{font-size:24px;margin-bottom:6px;display:block}
.contact-type-label{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#0A0A0A}
.contact-type-btn:hover .contact-type-label,.contact-type-btn.active .contact-type-label{color:#fff}
.contact-form{background:#fff;border:2px solid #0A0A0A;border-radius:6px;padding:20px;display:flex;flex-direction:column;gap:12px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.contact-input{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;padding:12px 14px;border:2px solid #ccc;border-radius:4px;background:#fff;color:#0A0A0A;width:100%;outline:none}
.contact-input:focus{border-color:#0A0A0A}
.contact-input::placeholder{color:#999}
.contact-textarea{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;padding:12px 14px;border:2px solid #ccc;border-radius:4px;background:#fff;color:#0A0A0A;width:100%;min-height:130px;resize:vertical;outline:none}
.contact-textarea:focus{border-color:#0A0A0A}
.contact-textarea::placeholder{color:#999}
.contact-submit{background:#E5292A;color:#fff;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:17px;letter-spacing:2px;text-transform:uppercase;padding:16px;border:none;border-radius:4px;cursor:pointer;transition:background 0.2s}
.contact-submit:hover{background:#c0201f}
.geo-art{border-radius:6px;overflow:hidden;background:#fff;height:100%;min-height:400px;border:3px solid #0A0A0A}
.geo-art svg{width:100%;height:100%;display:block}
@media(max-width:900px){.contact-wrapper{grid-template-columns:1fr}.geo-art{display:none}}
@media(max-width:600px){.form-row{grid-template-columns:1fr}.contact-wrapper{padding:24px 20px}}
</style>