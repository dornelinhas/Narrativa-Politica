<script setup>
const editions = [
  { num: '#45', title: 'Edição #45: A Geopolítica do Gênero', date: '24 de Outubro, 2024', desc: 'Empowering female voices in politics and business to create equitable making spaces.', tag: 'Gender', tagCls: 'tag-pink', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&auto=format' },
  { num: '#46', title: 'Edição #46: O Futuro Verde em Debate', date: '24 de Outubro, 2024', desc: 'Analyzing the shift towards models or circular models for long-term prosperity.', tag: 'Economy', tagCls: 'tag-green', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&auto=format' },
  { num: '#41', title: 'Edição #41: Nua International Relations', date: '24 de Outubro, 2024', desc: 'Examining evolving power dynamics and international cooperation strategies.', tag: 'Diplomacy', tagCls: 'tag-pink', img: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=300&fit=crop&auto=format' },
  { num: '#45b', title: 'Edição #45: Populismo e Democracia', date: '10 de Outubro, 2024', desc: 'Análise dos movimentos populistas e seus impactos nas democracias contemporâneas.', tag: 'Política', tagCls: 'tag-yellow', img: 'https://images.unsplash.com/photo-1591848478625-de43268e6fb8?w=400&h=300&fit=crop&auto=format' },
  { num: '#46b', title: 'Edição #46: Crise Climática e Política', date: '10 de Outubro, 2024', desc: 'Como as políticas ambientais estão moldando as agendas eleitorais ao redor do mundo.', tag: 'Ambiente', tagCls: 'tag-green', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&auto=format' },
  { num: '#43', title: 'Edição #43: Habitação e Desigualdade', date: '1 de Outubro, 2024', desc: 'O direito à moradia como pauta central de justiça social nas cidades brasileiras.', tag: 'Social', tagCls: 'tag-blue', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop&auto=format' }
]
</script>

<template>
  <div class="newsletter-page grid-bg-light">
    <div class="page-hero">
      <h1>Newsletter Archive</h1>
    </div>

    <!-- SUBSCRIBE WIDGET -->
    <div class="subscribe-wrapper">
      <div class="subscribe-card">
        <div>
          <div class="sub-label">Rede de Mobilização</div>
          <div class="sub-headline">Junte-se ao<br>Movimento.</div>
          <p class="sub-desc">Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.</p>
        </div>
        <div class="sub-form">
          <input type="email" class="sub-input" placeholder="Digite seu email...">
          <button class="sub-btn">Quero Fazer Parte →</button>
        </div>
        <div class="sub-deco-circle"></div>
        <div class="sub-deco-sq"></div>
      </div>
    </div>

    <!-- ARCHIVE GRID -->
    <div class="archive-section">
      <div class="archive-grid">
        <div v-for="(ed, i) in editions" :key="i" class="nl-card">
          <div class="nl-img">
            <img :src="ed.img" :alt="ed.title" loading="lazy" />
          </div>
          <div class="nl-body">
            <div class="nl-edition">{{ ed.title }}</div>
            <div class="nl-date">{{ ed.date }}</div>
            <p class="nl-desc">{{ ed.desc }}</p>
            <div class="nl-footer">
              <span class="tag" :class="ed.tagCls">{{ ed.tag }}</span>
              <a href="#" class="nl-arrow">→</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.newsletter-page{background:#f0ede8;color:#0A0A0A;min-height:100vh;padding-bottom:60px}
.grid-bg-light{background-image:linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:40px 40px}
.page-hero{text-align:center;padding:36px 32px 20px}
.page-hero h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(44px,8vw,110px);text-transform:uppercase;color:#0A0A0A;letter-spacing:-2px;line-height:0.9}
.subscribe-wrapper{display:flex;justify-content:center;padding:10px 24px 32px}
.subscribe-card{background:#F5E000;border-radius:8px;padding:28px 36px;max-width:600px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center;position:relative;overflow:visible}
.sub-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#0A0A0A;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.sub-label::before{content:'⚡'}
.sub-headline{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(22px,3vw,32px);text-transform:uppercase;color:#0A0A0A;line-height:1.05;margin-bottom:6px}
.sub-desc{font-size:11px;color:rgba(0,0,0,0.6);line-height:1.5}
.sub-form{display:flex;flex-direction:column;gap:10px}
.sub-input{font-family:'Barlow',sans-serif;font-size:13px;padding:11px 14px;border:2px solid rgba(0,0,0,0.2);border-radius:4px;background:#fff;color:#0A0A0A;outline:none}
.sub-input::placeholder{color:rgba(0,0,0,0.4)}
.sub-input:focus{border-color:#0A0A0A}
.sub-btn{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;padding:12px;background:#E5292A;color:#fff;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s}
.sub-btn:hover{background:#c0201f}
.sub-deco-circle{position:absolute;width:50px;height:50px;background:#E5292A;border-radius:50%;top:-14px;right:-14px}
.sub-deco-sq{position:absolute;width:28px;height:28px;background:#AAFF00;border-radius:3px;bottom:-12px;right:160px}
.archive-section{max-width:1140px;margin:0 auto;padding:0 24px 60px}
.archive-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:2px solid #ddd;border-radius:6px;overflow:hidden}
.nl-card{display:grid;grid-template-columns:160px 1fr;border-bottom:2px solid #ddd;background:#fff;transition:background 0.2s;cursor:pointer}
.nl-card:hover{background:#fafafa}
.nl-card:nth-child(3n+1),.nl-card:nth-child(3n+2){border-right:2px solid #ddd}
.nl-card:nth-last-child(-n+3){border-bottom:none}
.nl-img{width:160px;min-height:140px;overflow:hidden;flex-shrink:0;position:relative}
.nl-img img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(100%);transition:filter 0.3s}
.nl-card:hover .nl-img img{filter:grayscale(60%)}
.nl-body{padding:16px 18px}
.nl-edition{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:16px;text-transform:uppercase;color:#0A0A0A;line-height:1.1;margin-bottom:8px}
.nl-date{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#888;margin-bottom:8px}
.nl-desc{font-size:12px;color:#555;line-height:1.5;margin-bottom:12px}
.nl-footer{display:flex;align-items:center;justify-content:space-between}
.nl-arrow{display:inline-flex;align-items:center;gap:6px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#0A0A0A;text-decoration:none;transition:color 0.2s}
.nl-arrow:hover{color:#E5292A}
.tag{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:3px}
.tag-yellow{background:#F5E000;color:#0A0A0A}
.tag-pink{background:#FF2D78;color:#fff}
.tag-green{background:#AAFF00;color:#0A0A0A}
.tag-blue{background:#1B8FFF;color:#fff}
@media(max-width:1000px){.archive-grid{grid-template-columns:repeat(2,1fr)}.nl-card:nth-child(3n+1),.nl-card:nth-child(3n+2){border-right:none}.nl-card:nth-child(2n+1){border-right:2px solid #ddd}}
@media(max-width:700px){.archive-grid{grid-template-columns:1fr}.nl-card:nth-child(2n+1){border-right:none}.subscribe-card{grid-template-columns:1fr}}
</style>