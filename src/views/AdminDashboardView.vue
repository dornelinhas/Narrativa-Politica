<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { siteContent, saveContent, logActivity, saveItemToSupabase, deleteItemFromSupabase } from '../store/content'
import { 
  FileText, Briefcase, Rocket, BookOpen, User, LogOut, 
  LayoutDashboard, Plus, Trash2, Edit3, ExternalLink, Mail, 
  CheckCircle, X, TrendingUp, Users, Download, Zap, ChevronRight,
  Search, AlertCircle, Cog, File, Database, Paperclip, Home as HomeIcon
} from 'lucide-vue-next'
import Base64ImageUploader from '../components/admin/Base64ImageUploader.vue'
import FileUploader from '../components/admin/FileUploader.vue'
import RichTextEditor from '../components/admin/RichTextEditor.vue'
import ImpactChart from '../components/ImpactChart.vue'

const router = useRouter()
const { logout, user } = useAuth()

const activeTab = ref('dashboard')
const editingItem = ref(null)

const stats = [
  { label: 'USUÁRIOS TOTAIS', value: '2,450', color: 'yellow', icon: User },
  { label: 'TAXA DE CONCLUSÃO', value: '68%', color: 'pink', icon: CheckCircle },
  { label: 'ENGAJAMENTO', value: '92%', color: 'blue', icon: TrendingUp }
]

const recentActivity = [
  { text: 'Novo usuário registrado: Maria S.' },
  { text: 'Novo usuário registrado: Maria S.' },
  { text: 'Artigo publicado: Economia Verde' },
  { text: 'Artigo publicado: Economia Verde' },
  { text: 'Artigo publicado: Economia Verde' },
  { text: 'Artigo publicado: Josela H.' }
]

const handleLogout = () => { logout(); router.push('/') }

const saveMenu = async () => {
  const res = await saveItemToSupabase('settings', { menu: siteContent.settings.menu })
  if (res.success) {
    logActivity('Menu atualizado')
    alert('Menu salvo com sucesso!')
  } else {
    alert('Erro ao salvar menu: ' + res.error)
  }
}

const addOpp = () => {
  siteContent.opportunities.push({
    id: Date.now(),
    category: 'NOVA CATEGORIA',
    title: 'NOVA OPORTUNIDADE',
    description: 'Descrição aqui...',
    deadline: 'ABERTO',
    link: '#'
  })
}

const deleteOpp = async (id) => {
  if (confirm('Tem certeza?')) {
    const idx = siteContent.opportunities.findIndex(o => o.id === id)
    if (idx > -1) {
      siteContent.opportunities.splice(idx, 1)
      await deleteItemFromSupabase('opportunities', id)
      logActivity('Oportunidade removida')
    }
  }
}

const saveOpps = async () => {
  for (const opp of siteContent.opportunities) {
    await saveItemToSupabase('opportunities', opp, typeof opp.id === 'number' && opp.id > 1700000000000)
  }
  logActivity('Oportunidades atualizadas')
  alert('Oportunidades salvas!')
}

const saveRadarSettings = async () => {
  const res = await saveItemToSupabase('home', siteContent.home)
  if (res.success) {
    logActivity('Configurações do Radar atualizadas')
    alert('Configurações salvas!')
  }
}

const addAuthor = () => {
  siteContent.authors.push({
    id: 'id-' + Date.now(),
    name: 'Novo Autor',
    role: 'Autor',
    bio: '',
    image: ''
  })
}

const deleteAuthor = (id) => {
  if (confirm('Remover este autor?')) {
    const idx = siteContent.authors.findIndex(a => a.id === id)
    if (idx > -1) siteContent.authors.splice(idx, 1)
  }
}

const saveAuthors = async () => {
  const res = await saveItemToSupabase('settings', { authors: siteContent.authors, categories: siteContent.categories })
  if (res.success) {
    logActivity('Autores e Categorias atualizados')
    alert('Dados salvos!')
  }
}

const addProject = () => {
  siteContent.projects.push({ id: Date.now(), title: 'Novo Projeto', desc: '', impact: '', tags: [], image: '' })
}
const deleteProject = async (id) => {
  if (confirm('Remover projeto?')) {
    const idx = siteContent.projects.findIndex(p => p.id === id)
    if (idx > -1) { siteContent.projects.splice(idx, 1); await deleteItemFromSupabase('projects', id); }
  }
}
const saveProjects = async () => {
  for (const p of siteContent.projects) await saveItemToSupabase('projects', p, typeof p.id === 'number' && p.id > 1700000000000)
  logActivity('Projetos salvos')
  alert('Projetos salvos!')
}

const addLibraryItem = () => {
  siteContent.library.push({ id: Date.now(), title: 'Novo Documento', description: '', category: 'Relatório', fileUrl: '', externalLink: '' })
}
const deleteLibraryItem = async (id) => {
  if (confirm('Remover documento?')) {
    const idx = siteContent.library.findIndex(l => l.id === id)
    if (idx > -1) { siteContent.library.splice(idx, 1); await deleteItemFromSupabase('library', id); }
  }
}
const saveLibrary = async () => {
  for (const l of siteContent.library) await saveItemToSupabase('library', l, typeof l.id === 'number' && l.id > 1700000000000)
  logActivity('Biblioteca atualizada')
  alert('Biblioteca salva!')
}

const saveAbout = async () => {
  const res = await saveItemToSupabase('about', siteContent.about)
  if (res.success) { logActivity('Perfil atualizado'); alert('Perfil salvo!'); }
}
</script>

<template>
  <div class="admin-console-layout">
    <div class="admin-grid-overlay"></div>

    <!-- SIDEBAR -->
    <aside class="admin-console-sidebar">
      <div class="sidebar-top">
        <div class="np-logo-admin">
          <div class="logo-shapes">
             <div class="s s1"></div><div class="s s2"></div>
             <div class="s s3"></div><div class="s s4"></div>
          </div>
          <div class="logo-text">
            <strong>NP</strong> <span>A BANCADA DE IMPACTO</span>
          </div>
        </div>
        <h2 class="console-title">ADMIN <br />CONSOLE</h2>
      </div>

      <nav class="console-nav">
        <button class="nav-item" :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'"><LayoutDashboard :size="20" /> Visão Geral</button>
        <button class="nav-item" :class="{ active: activeTab === 'menu' }" @click="activeTab = 'menu'"><Search :size="20" /> Menu</button>
        <button class="nav-item" :class="{ active: activeTab === 'opps' }" @click="activeTab = 'opps'"><Briefcase :size="20" /> Oportunidades</button>
        <button class="nav-item" :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'"><Zap :size="20" /> Projetos</button>
        <button class="nav-item" :class="{ active: activeTab === 'library' }" @click="activeTab = 'library'"><BookOpen :size="20" /> Biblioteca</button>
        <button class="nav-item" :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'"><User :size="20" /> Sobre Mim</button>
        <button class="nav-item" :class="{ active: activeTab === 'radar' }" @click="activeTab = 'radar'"><Rocket :size="20" /> Radar Editorial</button>
        <button class="nav-item" :class="{ active: activeTab === 'authors' }" @click="activeTab = 'authors'"><Users :size="20" /> Autores e Tags</button>
        <button class="nav-item" :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'"><Cog :size="20" /> Configurações</button>
      </nav>

      <div class="sidebar-bottom">
        <button @click="handleLogout" class="btn-sair-console">SAIR</button>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="console-main-content">
      <div v-if="activeTab === 'dashboard'">
        <h1 class="console-main-title">VISÃO GERAL</h1>
        <!-- KPI ROW -->
        <div class="console-kpi-row">
          <div v-for="s in stats" :key="s.label" class="console-kpi-card" :class="s.color">
            <div class="kpi-info">
              <span class="kpi-label">{{ s.label }}</span>
              <span class="kpi-value">{{ s.value }}</span>
            </div>
            <div class="kpi-icon-wrap">
              <component :is="s.icon" :size="48" />
            </div>
          </div>
        </div>

        <!-- BOTTOM GRID -->
        <div class="console-bottom-grid">
          <div class="console-activity-card">
            <h3 class="card-title-thick">ATIVIDADE RECENTE</h3>
            <div class="activity-list-thick">
              <div v-for="(act, i) in recentActivity" :key="i" class="activity-item-thick">
                {{ act.text }}
              </div>
            </div>
          </div>
          <div class="console-management-card">
             <h3 class="card-title-thick">ESTATÍSTICAS</h3>
             <ImpactChart />
          </div>
        </div>
      </div>

      <!-- MENU MANAGEMENT -->
      <div v-else-if="activeTab === 'menu'">
        <h1 class="console-main-title">MENU PRINCIPAL</h1>
        <div class="admin-card-brutalist">
          <div v-for="(item, idx) in siteContent.settings.menu" :key="idx" class="menu-edit-item">
            <div class="flex-between mb-4">
              <div class="flex-center-left gap-4">
                <input v-model="item.name" class="input-thick" placeholder="Nome" />
                <input v-model="item.link" class="input-thick" placeholder="Link" />
              </div>
              <button @click="siteContent.settings.menu.splice(idx, 1)" class="btn-icon-red"><Trash2 :size="18" /></button>
            </div>
            <!-- Submenu -->
            <div v-if="item.submenu" class="submenu-list pl-8 border-l-thick">
              <div v-for="(sub, sIdx) in item.submenu" :key="sIdx" class="flex-between mb-2">
                <div class="flex-center-left gap-2">
                  <input v-model="sub.name" class="input-thin" placeholder="Sub Nome" />
                  <input v-model="sub.link" class="input-thin" placeholder="Sub Link" />
                </div>
                <button @click="item.submenu.splice(sIdx, 1)" class="btn-icon-sm"><Trash2 :size="14" /></button>
              </div>
              <button @click="item.submenu.push({ name: 'Novo Sub', link: '/' })" class="btn-thin-plus">+ Adicionar Subitem</button>
            </div>
            <button v-else @click="item.submenu = [{ name: 'Novo Sub', link: '/' }]" class="btn-thin-plus">+ Transformar em Dropdown</button>
          </div>
          <button @click="siteContent.settings.menu.push({ name: 'Novo Item', link: '/' })" class="btn-add-item">ADICIONAR ITEM AO MENU</button>
          <button @click="saveMenu" class="btn-save-main mt-8">SALVAR MENU</button>
        </div>
      </div>

      <!-- OPPORTUNITIES MANAGEMENT -->
      <div v-else-if="activeTab === 'opps'">
        <h1 class="console-main-title">OPORTUNIDADES</h1>
        <div class="admin-card-brutalist">
          <div v-for="(opp, idx) in siteContent.opportunities" :key="opp.id" class="opp-edit-card mb-8">
            <div class="grid-2 gap-4">
              <div class="form-group">
                <label>CATEGORIA</label>
                <select v-model="opp.category" class="input-thick">
                  <option v-for="cat in siteContent.opportunityCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>TÍTULO</label>
                <input v-model="opp.title" class="input-thick" />
              </div>
            </div>
            <div class="form-group mt-4">
              <label>RESUMO (PARA O CARD)</label>
              <textarea v-model="opp.description" class="input-thick"></textarea>
            </div>
            <div class="form-group mt-4">
              <label>DESCRIÇÃO COMPLETA (DESENVOLVIMENTO)</label>
              <RichTextEditor v-model="opp.fullDescription" />
            </div>
            <div class="grid-2 gap-4 mt-4">
              <div class="form-group">
                <label>PRAZO</label>
                <input v-model="opp.deadline" class="input-thick" />
              </div>
              <div class="form-group">
                <label>LINK EXTERNO (BOTÃO)</label>
                <input v-model="opp.link" class="input-thick" />
              </div>
            </div>
            <button @click="deleteOpp(opp.id)" class="btn-red-thin mt-4">REMOVER OPORTUNIDADE</button>
          </div>
          <button @click="addOpp" class="btn-add-item">ADICIONAR NOVA OPORTUNIDADE</button>
          <button @click="saveOpps" class="btn-save-main mt-8">SALVAR OPORTUNIDADES</button>
        </div>
      </div>

      <!-- AUTHORS & TAGS MANAGEMENT -->
      <div v-else-if="activeTab === 'authors'">
        <h1 class="console-main-title">AUTORES E TAGS</h1>
        
        <div class="admin-card-brutalist mb-12">
          <h3 class="card-title-thick">GERENCIAR AUTORES</h3>
          <div v-for="author in siteContent.authors" :key="author.id" class="opp-edit-card mb-8">
            <div class="flex-col md-flex-row gap-8">
              <div class="author-img-edit">
                <label>FOTO DO AUTOR (CIRCULAR)</label>
                <Base64ImageUploader v-model="author.image" />
              </div>
              <div class="flex-1">
                <div class="grid-2 gap-4">
                  <div class="form-group">
                    <label>NOME COMPLETO</label>
                    <input v-model="author.name" class="input-thick" />
                  </div>
                  <div class="form-group">
                    <label>CARGO / ROLE</label>
                    <input v-model="author.role" class="input-thick" />
                  </div>
                </div>
                <div class="form-group mt-4">
                  <label>BIO CURTA (PARA O BOX DO ARTIGO)</label>
                  <textarea v-model="author.bio" class="input-thick" rows="3"></textarea>
                </div>
                <button @click="deleteAuthor(author.id)" class="btn-red-thin mt-4">REMOVER AUTOR</button>
              </div>
            </div>
          </div>
          <button @click="addAuthor" class="btn-add-item">ADICIONAR NOVO AUTOR</button>
        </div>

        <div class="admin-card-brutalist">
          <h3 class="card-title-thick">CATEGORIAS DO RADAR</h3>
          <div class="flex-wrap gap-4 mb-6">
            <div v-for="(cat, idx) in siteContent.categories" :key="idx" class="tag-edit-pill">
              <input v-model="siteContent.categories[idx]" class="input-thin" />
              <button @click="siteContent.categories.splice(idx, 1)" class="btn-icon-red-sm">✕</button>
            </div>
          </div>
          <button @click="siteContent.categories.push('Nova Categoria')" class="btn-thin-plus">ADICIONAR CATEGORIA</button>
        </div>

        <button @click="saveAuthors" class="btn-save-main mt-8">SALVAR TUDO (AUTORES E TAGS)</button>
      </div>

      <!-- PROJECTS MANAGEMENT -->
      <div v-else-if="activeTab === 'projects'">
        <h1 class="console-main-title">PROJETOS</h1>
        <div class="admin-card-brutalist">
          <div v-for="p in siteContent.projects" :key="p.id" class="opp-edit-card mb-8">
            <div class="form-group"><label>TÍTULO DO PROJETO</label><input v-model="p.title" class="input-thick" /></div>
            <div class="form-group mt-4"><label>DESCRIÇÃO RESUMIDA</label><textarea v-model="p.desc" class="input-thick"></textarea></div>
            <div class="grid-2 gap-4 mt-4">
              <div class="form-group"><label>MÉTRICA DE IMPACTO</label><input v-model="p.impact" placeholder="ex: 500+ Apoiados" class="input-thick" /></div>
              <div class="form-group"><label>IMAGEM (URL)</label><input v-model="p.image" class="input-thick" /></div>
            </div>
            <button @click="deleteProject(p.id)" class="btn-red-thin mt-4">REMOVER PROJETO</button>
          </div>
          <button @click="addProject" class="btn-add-item">ADICIONAR PROJETO</button>
          <button @click="saveProjects" class="btn-save-main mt-8">SALVAR PROJETOS</button>
        </div>
      </div>

      <!-- LIBRARY MANAGEMENT -->
      <div v-else-if="activeTab === 'library'">
        <h1 class="console-main-title">BIBLIOTECA</h1>
        <div class="admin-card-brutalist">
          <div v-for="l in siteContent.library" :key="l.id" class="opp-edit-card mb-8">
            <div class="grid-2 gap-4">
              <div class="form-group"><label>TÍTULO</label><input v-model="l.title" class="input-thick" /></div>
              <div class="form-group"><label>CATEGORIA</label><input v-model="l.category" class="input-thick" /></div>
            </div>
            <div class="form-group mt-4"><label>DESCRIÇÃO</label><textarea v-model="l.description" class="input-thick"></textarea></div>
            <div class="grid-2 gap-4 mt-4">
              <div class="form-group"><label>URL DO ARQUIVO (PDF)</label><input v-model="l.fileUrl" class="input-thick" /></div>
              <div class="form-group"><label>LINK EXTERNO (FONTE)</label><input v-model="l.externalLink" class="input-thick" /></div>
            </div>
            <button @click="deleteLibraryItem(l.id)" class="btn-red-thin mt-4">REMOVER DOCUMENTO</button>
          </div>
          <button @click="addLibraryItem" class="btn-add-item">ADICIONAR DOCUMENTO</button>
          <button @click="saveLibrary" class="btn-save-main mt-8">SALVAR BIBLIOTECA</button>
        </div>
      </div>

      <!-- ABOUT MANAGEMENT -->
      <div v-else-if="activeTab === 'about'">
        <h1 class="console-main-title">SOBRE MIM</h1>
        <div class="admin-card-brutalist">
          <div class="grid-2 gap-4">
            <div class="form-group"><label>NOME</label><input v-model="siteContent.about.name" class="input-thick" /></div>
            <div class="form-group"><label>CARGO / ROLE</label><input v-model="siteContent.about.role" class="input-thick" /></div>
          </div>
          <div class="form-group mt-4"><label>MISSÃO (HERO)</label><textarea v-model="siteContent.about.mission" class="input-thick"></textarea></div>
          <div class="form-group mt-4"><label>TRAJETÓRIA & VISÃO</label><textarea v-model="siteContent.about.bioInstitucional" class="input-thick" rows="6"></textarea></div>
          
          <h3 class="card-title-thick mt-8">MÉTRICAS DE IMPACTO</h3>
          <div class="grid-3 gap-4">
            <div class="form-group"><label>MÉTRICA 1 (VALOR)</label><input v-model="siteContent.about.metric1" class="input-thick" placeholder="+10" /></div>
            <div class="form-group"><label>MÉTRICA 2 (VALOR)</label><input v-model="siteContent.about.metric2" class="input-thick" placeholder="50+" /></div>
            <div class="form-group"><label>MÉTRICA 3 (VALOR)</label><input v-model="siteContent.about.metric3" class="input-thick" placeholder="R$ 5M" /></div>
          </div>

          <button @click="saveAbout" class="btn-save-main mt-8">SALVAR PERFIL</button>
        </div>
      </div>

      <!-- RADAR EDITORIAL MANAGEMENT -->
      <div v-else-if="activeTab === 'radar'">
        <h1 class="console-main-title">RADAR EDITORIAL</h1>
        <div class="admin-card-brutalist">
           <div class="form-group">
             <label>TÍTULO DA SEÇÃO</label>
             <input v-model="siteContent.home.radarEditorialTitle" class="input-thick" />
           </div>
           <div class="form-group mt-4">
             <label>SUBTÍTULO DA SEÇÃO</label>
             <input v-model="siteContent.home.radarEditorialSubtitle" class="input-thick" />
           </div>
           <p class="mt-8 opacity-60">Os artigos exibidos no Radar Editorial são os mais recentes publicados na aba "Artigos".</p>
           <button @click="saveRadarSettings" class="btn-save-main mt-8">SALVAR CONFIGURAÇÕES</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-console-layout {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  position: relative;
}

.admin-grid-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

/* SIDEBAR */
.admin-console-sidebar {
  width: 320px;
  background: #111;
  border-right: 2px solid #333;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.sidebar-top { padding: 40px; }
.np-logo-admin { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
.logo-shapes { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.s { width: 10px; height: 10px; }
.s1 { background: #FF3D00; } .s2 { background: #FFD600; }
.s3 { background: #4CAF50; } .s4 { background: #2196F3; }
.logo-text { font-family: var(--font-sans); font-size: 0.6rem; font-weight: 800; line-height: 1; }
.logo-text strong { font-size: 1rem; display: block; }

.console-title { font-family: var(--font-display); font-size: 2.5rem; line-height: 0.9; margin-top: 20px; }

.console-nav { flex: 1; padding: 20px 0; }
.nav-item {
  width: 100%; padding: 20px 40px; display: flex; align-items: center; gap: 15px;
  background: transparent; border: none; color: #999; font-family: var(--font-sans);
  font-weight: 700; font-size: 1rem; text-align: left; cursor: pointer; transition: all 0.2s;
}
.nav-item:hover { color: white; background: rgba(255,255,255,0.05); }
.nav-item.active { background: white; color: #000; }

.sidebar-bottom { padding: 40px; }
.btn-sair-console {
  width: 100%; padding: 15px; border: 2px solid white; background: transparent;
  color: white; font-family: var(--font-sans); font-weight: 900; cursor: pointer;
}
.btn-sair-console:hover { background: white; color: black; }

/* MAIN CONTENT */
.console-main-content {
  flex: 1; padding: 60px; position: relative; z-index: 10;
}

.console-main-title {
  font-family: var(--font-display);
  font-size: 4rem;
  margin-bottom: 60px;
}

.console-kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.console-kpi-card {
  background: #1a1a1a;
  border: 4px solid #333;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.console-kpi-card.yellow { border-color: #FFD600; }
.console-kpi-card.pink { border-color: #E91E63; }
.console-kpi-card.blue { border-color: #2196F3; }

.kpi-label { display: block; font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; color: #999; margin-bottom: 10px; }
.kpi-value { font-family: var(--font-display); font-size: 3rem; }
.kpi-icon-wrap { opacity: 0.3; }

.console-bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
}

.card-title-thick {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.console-activity-card, .console-management-card {
  background: #1a1a1a;
  border: 4px solid #FFD600;
  padding: 40px;
}

.console-management-card { border-color: #333; }

.activity-list-thick { display: flex; flex-direction: column; gap: 15px; }
.activity-item-thick {
  padding: 15px 0;
  border-bottom: 1px solid #333;
  font-family: var(--font-sans);
  font-weight: 600;
  color: #ccc;
}

.management-tabs { display: flex; border-bottom: 2px solid #333; margin-bottom: 30px; }
.m-tab {
  padding: 15px 25px; background: transparent; border: none; color: #666;
  font-family: var(--font-sans); font-weight: 900; font-size: 0.8rem; cursor: pointer;
}
.m-tab.active { color: white; border-bottom: 4px solid white; }

.thick-table { width: 100%; border-collapse: collapse; }
.thick-table td { padding: 20px 0; border-bottom: 1px solid #333; }
.skeleton-line { height: 12px; background: #333; width: 80%; border-radius: 6px; }
.action-btns { display: flex; gap: 15px; color: #666; }
.action-btns svg:hover { color: white; cursor: pointer; }

/* NEW ADMIN STYLES */
.admin-card-brutalist {
  background: #1a1a1a;
  border: 4px solid #333;
  padding: 40px;
}

.menu-edit-item, .opp-edit-card {
  border-bottom: 2px solid #333;
  padding-bottom: 30px;
  margin-bottom: 30px;
}

.input-thick {
  background: #000;
  border: 2px solid #444;
  color: white;
  padding: 12px 20px;
  font-family: var(--font-sans);
  font-weight: 700;
  width: 100%;
}
.input-thick:focus { border-color: #FFD600; outline: none; }

.input-thin {
  background: #000;
  border: 1px solid #333;
  color: white;
  padding: 8px 12px;
  font-size: 0.8rem;
}

.btn-icon-red { background: #300; border: none; color: #f00; cursor: pointer; padding: 10px; }
.btn-icon-red:hover { background: #f00; color: white; }

.btn-thin-plus {
  background: transparent; border: 1px dashed #666; color: #666;
  padding: 8px 16px; font-size: 0.75rem; cursor: pointer; margin-top: 10px;
}
.btn-thin-plus:hover { color: white; border-color: white; }

.btn-add-item {
  width: 100%; padding: 20px; background: transparent; border: 3px dashed #333;
  color: #666; font-family: var(--font-sans); font-weight: 900; cursor: pointer;
}
.btn-add-item:hover { border-color: #FFD600; color: #FFD600; }

.btn-save-main {
  width: 100%; padding: 25px; background: #FFD600; color: black;
  border: none; font-family: var(--font-sans); font-weight: 900; font-size: 1.2rem; cursor: pointer;
}
.btn-save-main:hover { background: white; transform: translate(-4px, -4px); box-shadow: 6px 6px 0 black; }

.border-l-thick { border-left: 4px solid #333; }
.form-group label { display: block; font-family: var(--font-sans); font-weight: 900; font-size: 0.7rem; color: #666; margin-bottom: 8px; }

.btn-red-thin {
  background: transparent; border: 1px solid #f00; color: #f00; padding: 8px 16px; font-size: 0.75rem; cursor: pointer;
}
.btn-red-thin:hover { background: #f00; color: white; }

/* AUTHORS & TAGS STYLES */
.author-img-edit {
  width: 150px;
  text-align: center;
}
.author-img-edit :deep(.uploader-box) {
  border-radius: 50%;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.tag-edit-pill {
  display: inline-flex;
  align-items: center;
  background: #222;
  border: 1px solid #444;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
}
.tag-edit-pill .input-thin {
  border: none;
  background: transparent;
  padding: 8px 15px;
  width: 120px;
}
.btn-icon-red-sm {
  background: #400;
  color: #f55;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
}
.btn-icon-red-sm:hover { background: #f00; color: #fff; }

@media (max-width: 1200px) {
  .console-kpi-row { grid-template-columns: 1fr; }
  .console-bottom-grid { grid-template-columns: 1fr; }
}
</style>