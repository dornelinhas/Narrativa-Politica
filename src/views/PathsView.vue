<script setup>
import { computed } from 'vue'
import { siteContent } from '../store/content'
const paths = computed(() => siteContent.paths || [])
const cardClasses = ['card-1','card-2','card-3','card-4']
const fillClasses = ['fill-green','fill-pink','fill-blue','fill-green']
const btnClasses = ['trilha-btn green','trilha-btn pink','trilha-btn blue','trilha-btn outline']
</script>

<template>
  <div class="trilhas-page grid-pattern">
    <div class="page-hero">
      <h1><span class="white">Trilhas de </span><span class="green">Aprendizado</span></h1>
    </div>

    <div class="trilhas-canvas">
      <!-- Decorative dots -->
      <div class="deco-dot" style="width:18px;height:18px;background:#AAFF00;top:100px;left:15%"></div>
      <div class="deco-dot" style="width:24px;height:24px;background:#FF2D78;top:280px;left:32%"></div>
      <div class="deco-dot" style="width:16px;height:16px;background:#1B8FFF;top:60px;right:35%"></div>
      <div class="deco-dot" style="width:22px;height:22px;background:#F5E000;top:200px;right:28%"></div>
      <div class="deco-dot" style="width:80px;height:80px;background:#AAFF00;top:30px;right:5%;border-radius:50%"></div>
      <div class="deco-dot" style="width:20px;height:20px;background:#FF2D78;bottom:60px;left:5%"></div>
      <div class="deco-sq" style="width:14px;height:14px;background:#1B8FFF;top:160px;left:5%;border-radius:2px"></div>
      <div class="deco-sq" style="width:18px;height:18px;background:#F5E000;bottom:80px;right:30%;border-radius:2px;transform:rotate(10deg)"></div>
      <div class="deco-sq" style="width:12px;height:12px;background:#FF2D78;top:350px;right:15%;border-radius:2px"></div>
      <!-- Arrow shape -->
      <div style="position:absolute;top:38px;right:calc(5% + 80px);z-index:0">
        <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="0,20 20,0 40,20 30,20 30,40 10,40 10,20" fill="#FF2D78"/></svg>
      </div>
      <!-- Connector lines -->
      <svg class="connector-svg" viewBox="0 0 1060 420" preserveAspectRatio="none" style="position:absolute;inset:0;z-index:0;opacity:0.9">
        <path d="M 215 190 Q 290 160 340 220" stroke="#FF2D78" stroke-width="3" fill="none"/>
        <path d="M 530 160 Q 630 100 680 160" stroke="#AAFF00" stroke-width="3" fill="none"/>
        <path d="M 790 190 Q 870 140 930 220" stroke="#1B8FFF" stroke-width="3" fill="none"/>
        <rect x="270" y="143" width="16" height="16" rx="2" fill="#AAFF00" transform="rotate(15 270 143)"/>
        <rect x="650" y="88" width="14" height="14" rx="2" fill="#FF2D78" transform="rotate(-10 650 88)"/>
      </svg>

      <!-- Dynamic cards from store -->
      <div class="trilhas-grid" v-if="paths.length">
        <div v-for="(path, i) in paths.slice(0,4)" :key="path.id" class="trilha-card" :class="cardClasses[i % 4]">
          <div class="trilha-title">{{ path.title }}</div>
          <div class="trilha-modulos">{{ path.modules_count || path.modulesCount || 8 }} Módulos</div>
          <div class="progress-bar"><div class="progress-fill" :class="fillClasses[i % 4]" :style="{ width: (path.progress || 0) + '%' }"></div></div>
          <span class="progress-pct">{{ path.progress || 0 }}%</span>
          <router-link :to="`/trilhas/${path.id}`" :class="btnClasses[i % 4]">{{ path.progress > 0 ? 'Continuar' : 'Começar' }}</router-link>
        </div>
      </div>

      <!-- Static fallback -->
      <div class="trilhas-grid" v-else>
        <div class="trilha-card card-1">
          <div class="trilha-title">Introdução à Política: Fundamentos e Estruturas</div>
          <div class="trilha-modulos">8 Módulos</div>
          <div class="progress-bar"><div class="progress-fill fill-green" style="width:0%"></div></div>
          <span class="progress-pct">0%</span>
          <a href="#" class="trilha-btn green">Começar</a>
        </div>
        <div class="trilha-card card-2">
          <div class="trilha-title">Ativismo e Organização Comunitária</div>
          <div class="trilha-modulos">12 Módulos</div>
          <div class="progress-bar"><div class="progress-fill fill-pink" style="width:25%"></div></div>
          <span class="progress-pct">25%</span>
          <a href="#" class="trilha-btn pink">Continuar</a>
        </div>
        <div class="trilha-card card-3">
          <div class="trilha-title">Incidência Legislativa e Campanhas</div>
          <div class="trilha-modulos">10 Módulos</div>
          <div class="progress-bar"><div class="progress-fill fill-blue" style="width:50%"></div></div>
          <span class="progress-pct">50%</span>
          <a href="#" class="trilha-btn blue">Continuar</a>
        </div>
        <div class="trilha-card card-4">
          <div class="trilha-title">Comunicação Estratégica e Narrativa</div>
          <div class="trilha-modulos">9 Módulos</div>
          <div class="progress-bar"><div class="progress-fill fill-green" style="width:0%"></div></div>
          <span class="progress-pct">0%</span>
          <a href="#" class="trilha-btn outline">Começar</a>
        </div>
      </div>
    </div>

    <!-- JOIN SECTION -->
    <div class="join-section">
      <div class="join-card">
        <div>
          <div class="join-label">Rede de Mobilização</div>
          <div class="join-headline">Junte-se ao<br>Movimento</div>
          <p class="join-sub">Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.</p>
        </div>
        <div class="join-form">
          <input type="email" class="join-input" placeholder="Digite seu email...">
          <button class="join-submit">Quero Fazer Parte →</button>
        </div>
        <div class="join-deco-circle"></div>
        <div class="join-deco-sq"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.trilhas-page{background:#1a1a1a;color:#fff;min-height:100vh}
.grid-pattern{background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px}
.page-hero{text-align:center;padding:50px 32px 20px}
.page-hero h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(48px,8vw,96px);text-transform:uppercase;letter-spacing:-1px;line-height:0.95}
.page-hero h1 .white{color:#fff}
.page-hero h1 .green{color:#AAFF00}
.trilhas-canvas{position:relative;max-width:1100px;margin:20px auto 0;padding:0 20px 40px;min-height:480px}
.connector-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.deco-dot{position:absolute;border-radius:50%;z-index:0}
.deco-sq{position:absolute;z-index:0}
.trilhas-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative;z-index:1;padding:60px 0 20px}
.trilha-card{background:#242424;border-radius:6px;padding:22px 20px;border:2px solid transparent;position:relative}
.trilha-card.card-1{border-color:#555;margin-top:40px}
.trilha-card.card-2{border-color:#FF2D78;margin-top:80px}
.trilha-card.card-3{border-color:#1B8FFF;margin-top:20px}
.trilha-card.card-4{border-color:#555;margin-top:100px}
.trilha-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:20px;text-transform:uppercase;line-height:1.1;color:#fff;margin-bottom:10px}
.trilha-modulos{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:13px;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
.progress-bar{height:6px;background:rgba(255,255,255,0.12);border-radius:3px;margin:8px 0 4px}
.progress-fill{height:100%;border-radius:3px}
.fill-green{background:#AAFF00}
.fill-pink{background:#FF2D78}
.fill-blue{background:#1B8FFF}
.fill-yellow{background:#F5E000}
.progress-pct{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:16px;display:block;text-align:right}
.trilha-btn{display:block;width:100%;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:14px;letter-spacing:2px;text-transform:uppercase;padding:12px;border:none;border-radius:4px;cursor:pointer;text-decoration:none;transition:filter 0.2s}
.trilha-btn.green{background:#AAFF00;color:#0A0A0A}
.trilha-btn.pink{background:#FF2D78;color:#fff}
.trilha-btn.blue{background:#1B8FFF;color:#fff}
.trilha-btn.outline{background:transparent;border:2px solid rgba(255,255,255,0.3);color:#fff}
.trilha-btn:hover{filter:brightness(1.1)}
/* JOIN SECTION */
.join-section{max-width:1100px;margin:20px auto 40px;padding:0 20px}
.join-card{background:#F5E000;border-radius:8px;padding:32px 40px;display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;position:relative;overflow:visible}
.join-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#0A0A0A;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.join-label::before{content:'⚡';font-size:14px}
.join-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(28px,4vw,44px);text-transform:uppercase;color:#0A0A0A;line-height:1;margin-bottom:8px}
.join-sub{font-size:12px;color:rgba(0,0,0,0.65);max-width:360px;line-height:1.5}
.join-form{display:flex;flex-direction:column;gap:10px;min-width:300px}
.join-input{font-family:'Barlow',sans-serif;font-size:14px;padding:12px 16px;border:2px solid rgba(0,0,0,0.2);border-radius:4px;background:#fff;color:#0A0A0A;outline:none}
.join-input:focus{border-color:#0A0A0A}
.join-input::placeholder{color:rgba(0,0,0,0.4)}
.join-submit{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:14px;letter-spacing:2px;text-transform:uppercase;padding:13px;background:#E5292A;color:#fff;border:none;border-radius:4px;cursor:pointer;transition:background 0.2s}
.join-submit:hover{background:#c0201f}
.join-deco-circle{position:absolute;width:80px;height:80px;background:#E5292A;border-radius:50%;top:-20px;right:-20px}
.join-deco-sq{position:absolute;width:40px;height:40px;background:#AAFF00;border-radius:4px;bottom:-15px;right:240px}
@media(max-width:900px){.trilhas-grid{grid-template-columns:repeat(2,1fr)}.join-card{grid-template-columns:1fr}}
@media(max-width:600px){.trilhas-grid{grid-template-columns:1fr}.trilha-card{margin-top:0 !important}}
</style>