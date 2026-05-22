<script setup>
import { ref, computed } from 'vue'
import { Search, Megaphone, Mail } from 'lucide-vue-next'
import { siteContent } from '../store/content'

const searchQuery = ref('')
const selectedCategory = ref('Todos')

const categories = ['Todos', 'Vagas', 'Editais', 'Voluntariado']

const allOps = computed(() => {
  const source = siteContent.opportunities?.length ? siteContent.opportunities : [
    { id: 1, title: 'FUNDO DE APOIO A LIDERANÇAS NEGRAS', type: 'Edital', scope: 'Nacional', deadline: 'Encerra em 2 dias', org: 'Instituto Marielle Franco', urgent: true, isEdital: true, description: 'Financiamento de até R$ 50.000 para projetos de base comunitária com foco em letramento político.' },
    { id: 2, title: 'COORDENADOR(A) DE MOBILIZAÇÃO DIGITAL', type: 'Vaga', description: 'Regime CLT - Trabalho Remoto', tags: ['INSCRIÇÕES ABERTAS'], isYellow: true },
    { id: 3, title: 'PESQUISADOR(A) DE DADOS ABERTOS', type: 'Voluntariado', description: 'Auxílio na raspagem de dados sobre emendas parlamentares.', isSmall: true },
    { id: 4, isImageCard: true, imageText: 'REDE DE CONTATOS' },
    { id: 5, title: 'ANALISTA DE POLÍTICAS PÚBLICAS JR.', type: 'Vaga', description: 'São Paulo, SP (Híbrido)', deadline: 'Até 15/11', isBlue: true }
  ]
  return source
})

const filteredOps = computed(() => {
  let ops = allOps.value
  if (selectedCategory.value !== 'Todos') {
    ops = ops.filter(op => op.type === selectedCategory.value || op.isImageCard)
  }
  return ops
})

const editalCard = computed(() => filteredOps.value.find(o => o.isEdital) || filteredOps.value[0])
const yellowCard = computed(() => filteredOps.value.find(o => o.isYellow) || filteredOps.value[1])
const smallCard1 = computed(() => filteredOps.value.find(o => o.isSmall) || filteredOps.value[2])
const imageCard = computed(() => filteredOps.value.find(o => o.isImageCard) || filteredOps.value[3])
const blueCard = computed(() => filteredOps.value.find(o => o.isBlue) || filteredOps.value[4])
</script>

<template>
  <div class="ops-view">
    
    <!-- Hero / Title -->
    <header class="ops-hero container-max pb-32">
      <div class="decor-hero-amarelo"></div>
      <div class="decor-hero-azul"></div>
      
      <div class="ops-hero-content">
        <h1 class="ops-title">
          <span class="text-primary block">RADAR</span>
          <span class="text-vermelho block">ATIVISTA</span>
        </h1>
        <div class="ops-hero-desc-box">
          <p class="ops-hero-desc">
            Mapeamos as principais vagas, editais e oportunidades de voluntariado no ecossistema de impacto social e político. Candidate-se e faça parte da mudança.
          </p>
        </div>
      </div>
    </header>

    <!-- Filter Bar -->
    <div class="container-max ops-filter-wrapper pb-32">
      <div class="ops-filter-bar paper-shadow-sm">
        <div class="filter-left">
          <span class="filter-label">FILTRAR POR:</span>
          <div class="filter-pills">
            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" 
              class="filter-pill"
              :class="selectedCategory === cat ? 'active' : ''">
              {{ cat }}
            </button>
          </div>
        </div>
        <div class="filter-right">
          <input type="text" placeholder="Buscar oportunidades..." class="filter-search-input" />
          <Search :size="16" class="text-primary" />
        </div>
      </div>
    </div>

    <!-- Grid -->
    <main class="container-max ops-main-grid pb-64">
      
      <!-- Row 1 -->
      <div class="ops-row-1">
        <!-- Edital Aberto -->
        <router-link v-if="editalCard" :to="'/oportunidades/' + editalCard.id" class="card-edital paper-shadow clickable-card">
          <div class="card-side-bar"></div>
          <div class="card-edital-body">
            <div v-if="editalCard.urgent" class="badge-urgente paper-shadow-sm">URGENTE</div>
            
            <div class="card-tags-row block-margin-b">
              <span class="tag-primary">{{ editalCard.type }}</span>
              <span class="tag-secondary">{{ editalCard.scope }}</span>
            </div>
            
            <h2 class="card-edital-title block-margin-b">
              {{ editalCard.title }}
            </h2>
            <p class="card-desc block-margin-large">
              {{ editalCard.description }}
            </p>
            
            <div class="card-edital-footer">
              <div class="footer-meta">
                <span class="meta-deadline"><span class="material-symbols-outlined icon-small">timer</span> {{ editalCard.deadline }}</span>
                <span class="meta-org">Org: {{ editalCard.org }}</span>
              </div>
              <div class="btn-primary">
                ACESSAR EDITAL <span class="material-symbols-outlined icon-small">arrow_forward</span>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Vaga Mobilização -->
        <router-link v-if="yellowCard" :to="'/oportunidades/' + yellowCard.id" class="card-yellow paper-shadow clickable-card">
          <div class="card-icon-box">
             <Megaphone :size="16" class="text-primary" />
          </div>
          
          <span class="tag-primary tag-align-left">{{ yellowCard.type }}</span>
          
          <h2 class="card-yellow-title">
            {{ yellowCard.title }}
          </h2>
          <p class="card-yellow-desc block-margin-large">
            {{ yellowCard.description }}
          </p>
          
          <div class="card-yellow-footer">
             <div class="tag-outline">{{ yellowCard.tags?.[0] || 'INSCRIÇÕES ABERTAS' }}</div>
             <div class="btn-primary btn-full bg-primary-btn">
               VER DETALHES
             </div>
          </div>
        </router-link>
      </div>

      <!-- Row 2 -->
      <div class="ops-row-2">
        
        <!-- Pesquisador -->
        <router-link v-if="smallCard1" :to="'/oportunidades/' + smallCard1.id" class="card-small paper-shadow clickable-card">
          <div class="card-small-body">
            <span class="tag-verde">{{ smallCard1.type }}</span>
            <h3 class="card-small-title">{{ smallCard1.title }}</h3>
            <p class="card-small-desc line-clamp-3">
              {{ smallCard1.description }}
            </p>
          </div>
          <div class="card-small-footer">
            <div class="link-candidatar">
              Candidatar-se <span class="material-symbols-outlined icon-smaller">open_in_new</span>
            </div>
          </div>
        </router-link>

        <!-- Imagem Contatos -->
        <div v-if="imageCard" class="card-image bg-surface-dim paper-shadow">
          <img src="https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=600&q=80" class="card-img-element" alt="Rede" />
          <div class="card-image-text">
            <span class="text-amarelo block">REDE DE</span> CONTATOS
          </div>
        </div>

        <!-- Analista Azul -->
        <router-link v-if="blueCard" :to="'/oportunidades/' + blueCard.id" class="card-blue paper-shadow clickable-card">
          <div class="card-small-body">
            <span class="tag-white">{{ blueCard.type }}</span>
            <h3 class="card-blue-title">{{ blueCard.title }}</h3>
            <p class="card-blue-desc line-clamp-2">
              {{ blueCard.description }}
            </p>
          </div>
          <div class="card-blue-footer">
            <span class="deadline-pill">{{ blueCard.deadline }}</span>
            <div class="btn-apply text-preto">
              APLICAR
            </div>
          </div>
        </router-link>

      </div>

      <!-- Newsletter Wrapper -->
      <div class="card-nl border-thick bg-preto text-white paper-shadow-lg relative overflow-hidden mt-16">
        <div class="nl-decor-icon absolute bottom-0 right-0 opacity-10">
          <Mail :size="240" class="text-amarelo stroke-1" />
        </div>
        
        <div class="nl-content-left relative z-10">
          <h2 class="nl-title text-amarelo leading-none">
            NÃO PERCA NENHUMA<br/>OPORTUNIDADE
          </h2>
          <p class="nl-desc text-white opacity-90 font-bold mt-4">
            Assine nossa newsletter semanal e receba vagas, editais e convocações diretamente no seu e-mail. Zero spam, apenas impacto transformador.
          </p>
        </div>
        
        <div class="nl-content-right relative z-10 w-full md:w-auto">
          <div class="substack-integration-mini flex flex-col gap-4">
             <a href="https://substack.com/@narrativapolitica" target="_blank" class="btn-brutal bg-amarelo text-preto w-full py-5 px-10 text-lg font-black uppercase flex items-center justify-center gap-4 hover-white-shadow shadow-brutal">
                ASSINAR NO SUBSTACK <Mail :size="24" />
             </a>
             <p class="text-[10px] font-black uppercase text-white opacity-30 text-center tracking-widest">Conexão direta via Substack</p>
          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<style scoped>
/* VARIABLES CORE */
:root {
  --surface-bg: #fdf8f8;
  --surface-container: #f1edec;
  --surface-dim: #ddd9d8;
}

.bg-surface-dim { background-color: #ddd9d8; }
.text-preto { color: var(--np-black); }
.text-primary { color: #000; }
.text-white { color: #fff; }
.text-vermelho { color: var(--np-vermelho); }
.text-amarelo { color: var(--np-amarelo); }
.text-lilas { color: var(--np-lilas); }
.border-thick { border: var(--border-thick); }
.block { display: block; }
.pb-0 { padding-bottom: 0px; }
.pb-32 { padding-bottom: 32px; }
.pb-64 { padding-bottom: 64px; }
.block-margin-b { margin-bottom: 16px; }
.block-margin-large { margin-bottom: 48px; }
.icon-small { font-size: 14px; }
.icon-smaller { font-size: 12px; }

/* UTILS */
/* line-clamp handled globally */

/* LAYOUT */
.ops-view {
  background-color: #fdf8f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HERO */
.ops-hero {
  padding-top: 64px;
  position: relative;
  width: 100%;
}
.decor-hero-amarelo {
  position: absolute; top: 48px; left: 0; width: 96px; height: 96px;
  background-color: var(--np-amarelo); z-index: 0;
}
.decor-hero-azul {
  position: absolute; top: 64px; right: 128px; width: 64px; height: 64px;
  background-color: var(--np-azul); transform: rotate(12deg); z-index: 0;
}
.ops-hero-content {
  position: relative; z-index: 10; max-width: 670px; padding-left: 24px;
}
.ops-title {
  font-family: var(--font-display); font-size: clamp(60px, 8vw, 100px);
  line-height: 0.85; font-weight: 800; margin: 0; letter-spacing: -2px;
  text-transform: uppercase;
}
.ops-hero-desc-box {
  border-left: 4px solid var(--np-black); padding-left: 16px; margin-top: 24px;
}
.ops-hero-desc {
  font-family: var(--font-sans); font-size: 16px; color: #444748;
  max-width: 440px; line-height: 1.5;
}

/* FILTER BAR */
.ops-filter-wrapper { margin-bottom: 32px; }
.ops-filter-bar {
  display: flex; flex-direction: column; gap: 16px;
  border: var(--border-thick); background-color: #f1edec;
  padding: 12px; justify-content: space-between; align-items: center;
}
@media (min-width: 768px) {
  .ops-filter-bar { flex-direction: row; }
}
.filter-left { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.filter-label {
  font-family: var(--font-sans); font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px; color: var(--np-black);
}
.filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-pill {
  border: 1px solid var(--np-black); font-family: var(--font-sans);
  font-size: 10px; font-weight: 700; padding: 6px 16px;
  text-transform: uppercase; border-radius: 99px;
  background-color: #fff; color: var(--np-black); cursor: pointer;
  transition: background-color 0.2s;
}
.filter-pill:hover { background-color: #ddd9d8; }
.filter-pill.active { background-color: var(--np-black); color: #fff; }
.filter-right {
  display: flex; background: #fff; border: 1px solid var(--np-black);
  padding: 8px; width: 100%; max-width: 256px;
}
.filter-search-input {
  border: none; outline: none; font-family: var(--font-sans); font-size: 14px; flex: 1;
}

.clickable-card {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.clickable-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: var(--shadow-paper-lg) !important;
}

.clickable-card:active {
  transform: translateY(-2px);
}

/* GRID */
.ops-main-grid { display: flex; flex-direction: column; gap: 24px; margin-bottom: 48px; }

/* ROW 1 */
.ops-row-1 { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) {
  .ops-row-1 { grid-template-columns: 7fr 5fr; }
}

.card-edital { display: flex; background: #fff; border: var(--border-thick); position: relative; overflow: hidden; }
.card-side-bar { width: 8px; background-color: var(--np-rosa); flex-shrink: 0; }
.card-edital-body { padding: 32px; width: 100%; display: flex; flex-direction: column; overflow: hidden; }
.badge-urgente {
  position: absolute; top: -8px; right: -8px; background-color: var(--np-vermelho); color: #fff;
  font-family: var(--font-display); font-size: 20px; font-weight: 800; padding: 4px 16px;
  border: var(--border-thick); transform: rotate(3deg); z-index: 10;
}
.card-tags-row { display: flex; gap: 8px; flex-wrap: wrap; }
.tag-primary {
  background-color: var(--np-black); color: #fff; font-family: var(--font-sans);
  font-size: 9px; font-weight: 700; padding: 4px 12px; text-transform: uppercase; border-radius: 99px;
}
.tag-secondary {
  background-color: #ddd9d8; color: var(--np-black); font-family: var(--font-sans);
  font-size: 9px; font-weight: 700; padding: 4px 12px; text-transform: uppercase; border-radius: 99px;
}
.card-edital-title {
  font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; line-height: 1;
  color: var(--np-black); text-transform: uppercase; width: 100%; margin: 0 0 16px 0;
  word-break: break-word; overflow-wrap: break-word;
}
.card-desc { font-family: var(--font-sans); font-size: 14px; color: #1C1C1C; max-width: 100%; margin: 0 0 32px 0; line-height: 1.6; font-weight: 500; }
.card-edital-footer {
  margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;
  border-top: 1px solid #ddd9d8; padding-top: 16px; flex-wrap: wrap; gap: 16px;
}
.footer-meta { display: flex; flex-direction: column; color: var(--np-vermelho); }
.meta-deadline { font-family: var(--font-sans); font-size: 10px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
.meta-org { font-family: var(--font-sans); font-size: 9px; font-weight: 700; color: #444748; margin-top: 4px; }
.btn-primary {
  background: var(--np-black); color: #fff; font-family: var(--font-sans); font-size: 10px; font-weight: 700;
  padding: 12px 24px; text-transform: uppercase; display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--np-black); cursor: pointer; transition: background 0.2s;
}
.btn-primary:hover { background: var(--np-vermelho); }

.card-yellow {
  background: var(--np-amarelo); border: var(--border-thick); padding: 32px;
  display: flex; flex-direction: column; position: relative; overflow: hidden;
}
.card-icon-box {
  position: absolute; top: 16px; right: 16px; background: #fff; border: 1px solid var(--np-black);
  border-radius: 50%; padding: 8px; z-index: 5;
}
.tag-align-left { align-self: flex-start; margin-bottom: 16px; }
.card-yellow-title {
  font-family: var(--font-display); font-size: 30px; font-weight: 800; line-height: 1;
  color: var(--np-black); text-transform: uppercase; width: 100%; margin: 0 0 16px 0;
  word-break: break-word; overflow-wrap: break-word; padding-right: 48px;
}
.card-yellow-desc { font-family: var(--font-sans); font-size: 14px; color: var(--np-black); opacity: 0.9; margin: 0 0 48px 0; line-height: 1.6; }
.card-yellow-footer { margin-top: auto; }
.tag-outline {
  background: #fff; border: 1px solid var(--np-black); font-family: var(--font-sans);
  font-size: 9px; font-weight: 700; color: var(--np-black); padding: 4px 12px;
  display: inline-block; margin-bottom: 8px; text-transform: uppercase;
}
.bg-primary-btn { width: 100%; justify-content: center; font-size: 11px; padding: 12px; }
.bg-primary-btn:hover { background: #444748; color: #fff; }

/* ROW 2 */
.ops-row-2 { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) {
  .ops-row-2 { grid-template-columns: 1fr 1fr 1fr; }
}

.card-small { background: #fff; border: var(--border-thick); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
.tag-verde {
  background: var(--np-verde); color: var(--np-black); border: 1px solid var(--np-black);
  font-family: var(--font-sans); font-size: 9px; font-weight: 700; padding: 4px 12px;
  text-transform: uppercase; border-radius: 99px; display: inline-block; margin-bottom: 16px;
}
.card-small-title {
  font-family: var(--font-display); font-size: 20px; font-weight: 800; line-height: 1.1;
  color: var(--np-black); text-transform: uppercase; margin: 0 0 8px 0;
  word-break: break-word; overflow-wrap: break-word;
}
.card-small-desc { font-family: var(--font-sans); font-size: 13px; color: #444748; margin: 0; line-height: 1.5; }
.card-small-footer { margin-top: 32px; border-top: 1px solid #ddd9d8; padding-top: 12px; }
.link-candidatar {
  font-family: var(--font-sans); font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--np-black); border-bottom: 1px solid var(--np-black); padding-bottom: 2px;
  display: inline-flex; align-items: center; gap: 4px; text-decoration: none;
}
.link-candidatar:hover { color: var(--np-vermelho); }

.card-image { border: var(--border-thick); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 240px; }
.card-img-element { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.25) brightness(0.6); mix-blend-mode: multiply; }
.card-image-text {
  background: var(--np-black); color: #fff; font-family: var(--font-display); font-size: 30px;
  font-weight: 800; text-transform: uppercase; text-align: center; line-height: 1; padding: 16px 24px; z-index: 10;
  box-shadow: 6px 6px 0 var(--np-amarelo); border: var(--border-thick); transform: rotate(-2deg);
}

.card-blue { background: var(--np-azul); border: var(--border-thick); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
.tag-white {
  background: #fff; color: var(--np-black); border: 1px solid var(--np-black);
  font-family: var(--font-sans); font-size: 9px; font-weight: 700; padding: 4px 12px;
  text-transform: uppercase; border-radius: 99px; display: inline-block; margin-bottom: 16px;
}
.card-blue-title {
  font-family: var(--font-display); font-size: 20px; font-weight: 800; line-height: 1.1;
  color: #fff; text-transform: uppercase; margin: 0 0 8px 0; padding-right: 24px;
  word-break: break-word; overflow-wrap: break-word;
}
.card-blue-desc { font-family: var(--font-sans); font-size: 13px; color: #fff; opacity: 0.9; margin: 0; line-height: 1.5; }
.card-blue-footer { margin-top: 32px; display: flex; justify-content: space-between; align-items: flex-end; }
.deadline-pill { background: var(--np-black); color: #fff; font-family: var(--font-sans); font-size: 9px; font-weight: 700; padding: 4px 8px; text-transform: uppercase; }
.btn-apply {
  background: #fff; color: var(--np-black); border: 1px solid var(--np-black);
  font-family: var(--font-sans); font-size: 10px; font-weight: 700; padding: 8px 16px; text-transform: uppercase; cursor: pointer; transition: background 0.2s;
}
.btn-apply:hover { background: var(--np-amarelo); }

/* NEWSLETTER OVERHAUL */
.card-nl {
  background: var(--np-black); color: white; border: var(--border-thick);
  display: flex; flex-direction: column; align-items: center; justify-content: space-between;
  padding: 64px; gap: 48px;
}
@media (min-width: 1024px) { .card-nl { flex-direction: row; } }

.nl-title {
  font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 800; line-height: 0.9;
  text-transform: uppercase; color: var(--np-amarelo); margin: 0;
  letter-spacing: -1px;
}
.nl-desc { font-family: var(--font-sans); font-size: 1.1rem; color: white; max-width: 500px; margin: 0; line-height: 1.5; }
.nl-content-right { z-index: 10; width: 100%; max-width: 400px; }

.hover-white-shadow:hover { box-shadow: 8px 8px 0 white; transform: translate(-4px, -4px); }
.nl-input {
  flex: 1; background: #fff; padding: 16px; font-family: var(--font-sans); font-size: 14px;
  outline: none;
}
@media (min-width: 768px) { .nl-input { border-right: none !important; } }
.nl-btn {
  background: var(--np-black); color: #fff; font-family: var(--font-sans); font-size: 12px; font-weight: 700; text-transform: uppercase;
  padding: 16px 32px; cursor: pointer; transition: background 0.2s;
}
.nl-btn:hover { background: var(--np-vermelho); }
</style>
