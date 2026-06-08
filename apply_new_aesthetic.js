const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// 1. Fix the wrapper overflow
content = content.replace(
  '<div class="production-admin-wrapper flex min-h-screen bg-[#F1F3F5] text-[#1A1A1A] font-sans">',
  '<div class="production-admin-wrapper flex min-h-screen bg-[#F1F3F5] text-[#1A1A1A] font-sans overflow-x-hidden">'
);

// 2. Fix the Sidebar Logo (NPADMIN -> NARRATIVA POLÍTICA)
const newLogoSidebar = `
      <!-- LOGO AREA -->
      <div class="h-[100px] flex items-center px-10 border-b border-white/5">
        <div class="font-black tracking-tighter leading-none" style="font-family: 'Archivo Black', sans-serif;">
          <div class="text-xl">NARRATIVA</div>
          <div class="text-xl text-[#FF3C82]">POLÍTICA</div>
        </div>
      </div>
`;
content = content.replace(
  /<!-- LOGO AREA -->[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  newLogoSidebar.trim()
);

// 3. Fix the Mobile Logo
const newLogoMobile = `
          <!-- MOBILE LOGO -->
          <div class="md:hidden font-black tracking-tighter leading-none uppercase text-black" style="font-family: 'Archivo Black', sans-serif;">
            <div class="text-lg">NARRATIVA</div>
            <div class="text-lg text-[#FF3C82]">POLÍTICA</div>
          </div>
`;
content = content.replace(
  /<!-- MOBILE LOGO -->[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  newLogoMobile.trim()
);

// 4. Add "Voltar ao site" button to Header Global Actions
const newHeaderActions = `
        <!-- Right: Global Actions -->
        <div class="flex items-center gap-4">
           <router-link to="/" class="header-action-btn hidden md:flex font-black">
             <ExternalLink :size="18" /> VOLTAR PARA O SITE
           </router-link>
           <button @click="exportReport" class="header-action-btn hidden sm:flex font-black">
             <Download :size="18" /> <span class="hidden lg:inline">RELATÓRIO CSV</span>
           </button>
           <button @click="selectTab('editorial'); resetArtigoForm()" class="primary-cta-btn">
             <Plus :size="20" /> <span class="hidden sm:inline">NOVO ARTIGO</span>
           </button>
        </div>
`;
content = content.replace(
  /<!-- Right: Global Actions -->[\s\S]*?<\/div>\s*<\/header>/,
  newHeaderActions.trim() + '\n      </header>'
);

// 5. Enhance the Dashboard (Visão Geral) cards
const newDashboardCards = `
           <!-- METRICS GRID -->
           <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#FFDC00]"></div>
                   <div class="flex justify-between items-start mb-6">
                     <span class="card-label">Alcance Total</span>
                     <div class="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40"><Globe :size="24" /></div>
                   </div>
                   <div class="card-value">124<span class="text-[#FFDC00]">K</span></div>
                   <div class="card-trend text-[#A0D246] font-bold">+14.2% esta semana</div>
                 </div>
              </div>

              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#FF3C82]"></div>
                   <div class="flex justify-between items-start mb-6">
                     <span class="card-label">Assinantes Ativos</span>
                     <div class="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40"><UserPlus :size="24" /></div>
                   </div>
                   <div class="card-value">{{ subscribersCount }}</div>
                   <div class="card-trend text-[#FF3C82] font-bold">Base em expansão</div>
                 </div>
              </div>

              <div class="metric-card-v2 bg-white">
                 <div class="card-inner">
                   <div class="card-accent bg-[#3C64E6]"></div>
                   <div class="flex justify-between items-start mb-6">
                     <span class="card-label">Artigos Ativos</span>
                     <div class="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40"><FileText :size="24" /></div>
                   </div>
                   <div class="card-value">{{ siteContent.posts?.length || 0 }}</div>
                   <div class="card-trend text-[#3C64E6] font-bold">{{ filterPublicPosts(siteContent.posts).length }} Publicados</div>
                 </div>
              </div>
           </section>
`;
content = content.replace(
  /<!-- METRICS GRID -->[\s\S]*?<\/section>/,
  newDashboardCards.trim()
);

// 6. Replace LMS tab with functional Trilhas CRUD
const newLMSHtml = `
        <!-- 7. GESTÃO LMS (TRILHAS) -->
        <div v-else-if="activeTab === 'lms'" class="space-y-12">
           <div id="form-anchor" class="panel-v2 bg-white p-12 overflow-hidden">
              <div class="card-accent bg-[#A0D246]"></div>
              <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">{{ isEditingTrilha ? 'Editando Trilha' : 'Criar Nova Trilha' }}</h3>
              <div class="grid lg:grid-cols-12 gap-16">
                 <div class="lg:col-span-8 space-y-10">
                    <div class="input-v2"><label>Nome da Trilha</label><input v-model="novaTrilha.title" type="text" /></div>
                    <div class="input-v2"><label>Descrição Curta</label><textarea v-model="novaTrilha.description" rows="3"></textarea></div>
                    <div class="input-v2"><label>Duração (Ex: 10 horas)</label><input v-model="novaTrilha.duration" type="text" /></div>
                 </div>
                 <div class="lg:col-span-4 space-y-10">
                    <div class="input-v2"><label>Imagem de Capa</label><ImageUploader v-model="novaTrilha.image" /></div>
                    <div class="input-v2"><label>Status</label><select v-model="novaTrilha.status"><option value="publicado">Publicada</option><option value="rascunho">Rascunho</option></select></div>
                    <button @click="saveTrilha" class="primary-cta-btn bg-[#A0D246] text-black w-full py-5"><Save :size="20"/> SALVAR TRILHA</button>
                    <button v-if="isEditingTrilha" @click="resetTrilhaForm" class="header-action-btn w-full">CANCELAR EDIÇÃO</button>
                 </div>
              </div>
           </div>
           
           <div class="panel-v2 bg-white overflow-hidden">
              <table class="production-table">
                 <thead><tr><th>Capa</th><th>Trilha</th><th>Duração</th><th>Status</th><th class="text-right">Ações</th></tr></thead>
                 <tbody>
                    <tr v-if="!(siteContent.tracks && siteContent.tracks.length)">
                      <td colspan="5" class="text-center py-20">
                        <Layers :size="48" class="mx-auto mb-4 opacity-20" />
                        <p class="font-black opacity-40 uppercase tracking-widest text-sm mb-6">Nenhuma trilha cadastrada ainda.</p>
                      </td>
                    </tr>
                    <tr v-for="t in siteContent.tracks" :key="t.id">
                       <td class="w-32"><div class="h-16 w-24 bg-creme border rounded-lg overflow-hidden"><img :src="t.image" class="w-full h-full object-cover" /></div></td>
                       <td><div class="font-black text-sm uppercase">{{ t.title }}</div></td>
                       <td class="font-bold">{{ t.duration || '--' }}</td>
                       <td><span class="prod-status-badge" :class="t.status">{{ t.status?.toUpperCase() || 'PUBLICADO' }}</span></td>
                       <td class="text-right"><div class="flex justify-end gap-2"><button @click="editTrilha(t)" class="prod-icon-btn"><Edit :size="16"/></button><button @click="deleteTrilha(t)" class="prod-icon-btn hover:!bg-vermelho hover:!text-white"><Trash :size="16"/></button></div></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
`;
content = content.replace(
  /<!-- 7\. GESTÃO LMS -->[\s\S]*?<\/div>/,
  newLMSHtml.trim()
);

// 7. Improve Projects Empty State and buttons
const newProjectsHtml = `
        <!-- 8. PROJETOS -->
        <div v-else-if="activeTab === 'projetos'" class="space-y-12">
           <div id="form-anchor" class="panel-v2 bg-white p-12">
              <div class="card-accent bg-[#3C64E6]"></div>
              <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">{{ isEditingProject ? 'Editando Case' : 'Novo Case de Impacto' }}</h3>
              <div class="grid lg:grid-cols-12 gap-16">
                 <div class="lg:col-span-8 space-y-10">
                    <div class="input-v2"><label>Título do Projeto</label><input v-model="novoProjeto.title" type="text" /></div>
                    <div class="grid md:grid-cols-2 gap-10">
                      <div class="input-v2"><label>Cliente / Organização</label><input v-model="novoProjeto.organization" type="text" /></div>
                      <div class="input-v2"><label>Métrica de Impacto (Ex: +500 LÍDERES)</label><input v-model="novoProjeto.impact" type="text" /></div>
                    </div>
                    <div class="input-v2"><label>Descrição Curta</label><textarea v-model="novoProjeto.description" rows="3"></textarea></div>
                    <div class="input-v2"><label>Tags (separadas por vírgula)</label><input v-model="novoProjeto.tags" type="text" /></div>
                 </div>
                 <div class="lg:col-span-4 space-y-10">
                    <div class="input-v2"><label>Imagem do Case</label><ImageUploader v-model="novoProjeto.image" /></div>
                    <div class="input-v2"><label>Status</label><select v-model="novoProjeto.status"><option value="publicado">Publicado</option><option value="rascunho">Rascunho</option></select></div>
                    <button @click="saveProjeto" class="primary-cta-btn bg-[#3C64E6] text-white w-full py-5"><Save :size="20"/> SALVAR PROJETO</button>
                    <button v-if="isEditingProject" @click="resetProjetoForm" class="header-action-btn w-full">CANCELAR EDIÇÃO</button>
                 </div>
              </div>
           </div>
           <div class="panel-v2 bg-white overflow-hidden">
              <table class="production-table">
                 <thead><tr><th>Projeto</th><th>Cliente</th><th>Impacto</th><th class="text-right">Ações</th></tr></thead>
                 <tbody>
                    <tr v-if="!(siteContent.projects && siteContent.projects.length)">
                      <td colspan="4" class="text-center py-20">
                        <Folder :size="48" class="mx-auto mb-4 opacity-20" />
                        <p class="font-black opacity-40 uppercase tracking-widest text-sm mb-6">Nenhum projeto cadastrado ainda.</p>
                      </td>
                    </tr>
                    <tr v-for="p in siteContent.projects" :key="p.id">
                       <td><div class="font-black text-sm uppercase">{{ p.title }}</div></td>
                       <td class="font-bold opacity-60">{{ p.organization || '--' }}</td>
                       <td><div class="tag-solid bg-vermelho text-white">{{ p.impact }}</div></td>
                       <td class="text-right"><div class="flex justify-end gap-2"><button @click="editProjeto(p)" class="prod-icon-btn"><Edit :size="16"/></button><button @click="deleteProjeto(p)" class="prod-icon-btn hover:!bg-vermelho hover:!text-white"><Trash :size="16"/></button></div></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
`;
content = content.replace(
  /<!-- 8\. PROJETOS -->[\s\S]*?<\/div>\s*<\/div>/,
  newProjectsHtml.trim() + '\n        </div>'
);

// 8. Add Trilhas (LMS) to Visibilidade Modules configuration
const newModulesVisibility = `
        <!-- 9. CONFIGURAÇÕES -->
        <div v-else-if="activeTab === 'configuracoes'" class="grid lg:grid-cols-2 gap-12">
           <div class="panel-v2 bg-white p-12 overflow-hidden shadow-production">
              <div class="card-accent bg-[#3C64E6]"></div>
              <h3 class="text-2xl font-black mb-12 uppercase tracking-tighter">AJUSTES DO SISTEMA</h3>
              <div class="space-y-8">
                 <div class="input-v2"><label>Nome da Plataforma</label><input v-model="settingsData.siteName" type="text" /></div>
                 <div class="input-v2"><label>Slogan de Impacto</label><input v-model="settingsData.siteTagline" type="text" /></div>
                 <div class="input-v2"><label>E-mail de Resposta</label><input v-model="settingsData.contactEmail" type="email" /></div>
                 <button @click="saveSettings" class="primary-cta-btn bg-[#3C64E6] text-white w-full py-5"><Save :size="20"/> ATUALIZAR PLATAFORMA</button>
              </div>
           </div>
           <div class="panel-v2 bg-white p-12 overflow-hidden shadow-production">
              <div class="card-accent bg-[#FFDC00]"></div>
              <h3 class="text-2xl font-black mb-12 uppercase tracking-tighter">MÓDULOS DE NAVEGAÇÃO</h3>
              <div class="grid sm:grid-cols-2 gap-6">
                 <div v-for="(val, key) in {
                   'menuArticles': 'Artigos',
                   'menuOpportunities': 'Vagas',
                   'menuPaths': 'Trilhas (LMS)',
                   'menuServices': 'Serviços',
                   'menuProjects': 'Projetos',
                   'menuLibrary': 'Biblioteca',
                   'showLogin': 'Área Aluno'
                 }" :key="key" class="p-6 rounded-3xl bg-[#F1F3F5] border border-black/5 flex items-center gap-4">
                    <input type="checkbox" v-model="settingsData[key]" class="w-6 h-6 accent-black" />
                    <span class="font-black text-[11px] uppercase tracking-tight">{{ val }}</span>
                 </div>
              </div>
              <button @click="saveSettings" class="header-action-btn w-full mt-12 py-5 uppercase font-black"><Save :size="18"/> Sincronizar Menu</button>
           </div>
        </div>
`;
content = content.replace(
  /<!-- 9\. CONFIGURAÇÕES -->[\s\S]*?<\/div>\s*<\/div>/,
  newModulesVisibility.trim() + '\n        </div>'
);

fs.writeFileSync('src/views/AdminDashboardView.vue', content, 'utf8');
