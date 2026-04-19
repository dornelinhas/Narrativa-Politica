<script setup>
import { computed } from 'vue'
import { siteContent } from '../store/content'
const projects = computed(() => siteContent.projects || [])

const staticProjects = [
  { id: 1, title: 'Women in Leadership: Bridging the Gender Gap', desc: 'Empowering female voices in politics and business to create equitable decision-making spaces.', impact: '+500 Lideranças Formadas', tags: [{ label: 'Gender', cls: 'pt-pink' }, { label: 'Leadership', cls: 'pt-blue' }], image: '/images/projects/women-leadership.png' },
  { id: 2, title: 'The Future of Green Economics', desc: 'Analyzing the shift towards sustainable and circular models for long-term prosperity.', impact: '3 Leis Aprovadas', tags: [{ label: 'Economy', cls: 'pt-yellow' }, { label: 'Sustainability', cls: 'pt-green' }], image: '/images/projects/green-economics.png' },
  { id: 3, title: 'Global Diplomacy in a Multipolar World', desc: 'Examining evolving power dynamics and international cooperation strategies.', impact: '12 Acordos Internacionais', tags: [{ label: 'International Relations', cls: 'pt-blue' }, { label: 'Diplomacy', cls: 'pt-orange' }], image: '/images/projects/diplomacy.png' },
  { id: 4, title: 'Grassroots Movements & Policy Change', desc: 'Case studies of local initiatives influencing legislative reforms.', impact: '50+ Comunidades Apoiadas', tags: [{ label: 'Social Impact', cls: 'pt-orange' }, { label: 'Policy', cls: 'pt-red' }], image: '/images/projects/grassroots.png' },
  { id: 5, title: 'Closing the Economic Empowerment Gap', desc: 'Investigating financial inclusion and entrepreneurship programs for women.', impact: 'R$ 2M Mobilizados', tags: [{ label: 'Gender', cls: 'pt-pink' }, { label: 'Economy', cls: 'pt-yellow' }], image: '/images/projects/economic-empowerment.png' },
  { id: 6, title: 'Trade Policies for a Connected World', desc: 'Assessing the impact of international trade agreements on developing nations.', impact: 'Publicação de 5 Manuais', tags: [{ label: 'International Relations', cls: 'pt-blue' }, { label: 'Economy', cls: 'pt-yellow' }], image: '/images/projects/trade-policies.png' }
]

const displayProjects = computed(() => {
  if (projects.value.length > 0) return projects.value
  return staticProjects
})
</script>

<template>
  <div class="projetos-page grid-bg-light">
    <div class="page-hero">
      <h1>Projects Portfolio</h1>
    </div>
    <div class="projects-grid">
      <div v-for="p in displayProjects" :key="p.id" class="project-card">
        <div class="project-img">
          <img :src="p.image" :alt="p.title" />
          <div class="project-overlay">
            <div class="overlay-arrow">→</div>
            <div>View Case Study</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">{{ p.title }}</div>
          <p class="project-desc">{{ p.desc || p.description || p.excerpt }}</p>
          <div class="project-impact" v-if="p.impact">
            <strong>Impacto:</strong> {{ p.impact }}
          </div>
          <div class="project-tags" v-if="p.tags">
            <span v-for="(tag, ti) in p.tags" :key="ti" class="project-tag" :class="tag.cls">{{ tag.label }}</span>
          </div>
          <div class="project-footer">
            <router-link v-if="p.id" :to="`/projetos/${p.id}`" class="learn-more">Learn More →</router-link>
            <span v-if="p.id" class="edit-hint">✎ Editável no Admin</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap');
.projetos-page{background:#f0ede8;color:#0A0A0A;min-height:100vh;padding-bottom:60px}
.grid-bg-light{background-image:linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:40px 40px}
.page-hero{text-align:center;padding:140px 32px 40px}
.page-hero h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(48px,8vw,96px);text-transform:uppercase;color:#0A0A0A;letter-spacing:-2px;line-height:0.95}
.projects-grid{max-width:1140px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.project-card{background:#fff;border:2px solid #ddd;border-radius:6px;overflow:hidden;display:grid;grid-template-columns:200px 1fr;transition:border-color 0.2s,transform 0.2s;cursor:pointer;position:relative}
.project-card:hover{border-color:#0A0A0A;transform:translateY(-2px)}
.project-img{width:200px;min-height:160px;position:relative;overflow:hidden;flex-shrink:0}
.project-img img{width:100%;height:100%;object-fit:cover;display:block}
.project-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;color:white;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;gap:8px}
.project-card:hover .project-overlay{opacity:1}
.overlay-arrow{width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:#0A0A0A;font-size:20px}
.project-body{padding:18px 18px 20px}
.project-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:18px;text-transform:capitalize;color:#0A0A0A;line-height:1.15;margin-bottom:8px}
.project-desc{font-size:12px;color:#555;line-height:1.5;margin-bottom:10px}
.project-impact{font-size:11px;color:#0A0A0A;background:#f0ede8;padding:6px 10px;border-radius:4px;margin-bottom:12px;font-family:'Barlow',sans-serif;border-left:3px solid #E5292A;}
.project-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.project-tag{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border-radius:2px}
.pt-pink{background:#FF2D78;color:#fff}
.pt-green{background:#AAFF00;color:#0A0A0A}
.pt-yellow{background:#F5E000;color:#0A0A0A}
.pt-blue{background:#1B8FFF;color:#fff}
.pt-red{background:#E5292A;color:#fff}
.pt-orange{background:#FF7A00;color:#fff}
.project-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;}
.edit-hint{font-size:9px;text-transform:uppercase;color:#888;letter-spacing:1px;font-weight:700;}
.learn-more{display:inline-flex;align-items:center;gap:6px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#0A0A0A;text-decoration:none;border-bottom:2px solid #0A0A0A;padding-bottom:1px}
.learn-more:hover{color:#E5292A;border-color:#E5292A}
@media(max-width:1100px){.projects-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:700px){.projects-grid{grid-template-columns:1fr}.project-card{grid-template-columns:1fr}.project-img{width:100%;min-height:200px}}
</style>