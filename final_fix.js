const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// 1. Fix the wrapper overflow
content = content.replace(
  '<div class="admin-dashboard-premium">',
  '<div class="admin-dashboard-premium overflow-x-hidden">'
);

// 2. Fix the Sidebar Logo (NP -> NARRATIVA POLÍTICA)
content = content.replace(
  /<div class="sidebar-header">[\s\S]*?<span class="badge-admin">SISTEMA ADMIN<\/span>[\s\S]*?<\/div>/,
  `<div class="sidebar-header" style="padding-bottom: 24px;">
        <div class="font-black tracking-tighter leading-none" style="font-family: 'Archivo Black', sans-serif;">
          <div class="text-xl text-white">NARRATIVA</div>
          <div class="text-xl text-[#FF3C82]">POLÍTICA</div>
        </div>
        <span class="badge-admin" style="margin-top:12px;">SISTEMA ADMIN</span>
      </div>`
);

// 3. Fix the Mobile Logo
content = content.replace(
  /<header class="mobile-top-bar">[\s\S]*?<span class="logo-txt-mobile">NP<\/span>[\s\S]*?<\/div>/,
  `<header class="mobile-top-bar">
      <div class="font-black tracking-tighter leading-none" style="font-family: 'Archivo Black', sans-serif;">
        <div class="text-lg text-white">NARRATIVA</div>
        <div class="text-lg text-[#FF3C82]">POLÍTICA</div>
      </div>`
);

// 4. Fix Trilhas Navigation Bug (OPORTUNIDADES shouldn't set trilhas, GESTÃO LMS should)
// The original:
// <button class="nav-btn" :class="{ active: activeTab === 'trilhas' }" @click="activeTab = 'trilhas'">
//   <Briefcase :size="18" /> OPORTUNIDADES
// </button>
// <button class="nav-btn" :class="{ active: activeTab === 'trilhas' }" @click="activeTab = 'trilhas'">
//   <BookOpen :size="18" /> GESTÃO LMS
// </button>

content = content.replace(
  /<button class="nav-btn" :class="\{ active: activeTab === 'trilhas' \}" @click="activeTab = 'trilhas'">\s*<Briefcase :size="18" \/> OPORTUNIDADES\s*<\/button>/,
  `<button class="nav-btn" :class="{ active: activeTab === 'vagas' }" @click="activeTab = 'vagas'">
          <Briefcase :size="18" /> OPORTUNIDADES
        </button>`
);

// 5. Enhance Global Header Actions (Add text to buttons)
// original has "VOLTAR PARA O SITE", but I'll make sure it looks like what the AI wanted.
// Wait, the AI had <button @click="exportReport" ... RELATÓRIO CSV
content = content.replace(
  /<div class="header-actions-row">[\s\S]*?<\/div>/,
  `<div class="header-actions-row">
           <div class="user-pill-brutal">
              <span>{{ user?.nome_completo || 'Administradora' }}</span>
              <div class="avatar-sm">A</div>
           </div>
           <button class="btn-preview-solid" @click="router.push('/')">
              <ExternalLink :size="18" /> <span class="hidden md:inline">VOLTAR PARA O SITE</span>
           </button>
           <button class="btn-preview-solid" @click="exportReport" style="background:white; color:black;">
              <Download :size="18" /> <span class="hidden lg:inline">RELATÓRIO CSV</span>
           </button>
        </div>`
);

// 6. Fix the Empty State for Trilhas table
// Find `<div class="table-container">` inside the trilhas section... 
// Actually, it's safer to just let it be, but I can inject empty state.
// Let's replace the `<tbody>` inside `activeTab === 'trilhas'`
const trilhaTbody = `<tbody>
                    <tr v-if="!(siteContent.tracks && siteContent.tracks.length)">
                      <td colspan="5" class="text-center py-20">
                        <p class="font-black opacity-40 uppercase tracking-widest text-sm mb-6">Nenhuma trilha cadastrada ainda.</p>
                      </td>
                    </tr>
                    <tr v-for="t in siteContent.tracks" :key="t.id">
                       <td class="w-32"><div class="h-16 w-24 bg-creme border rounded-lg overflow-hidden"><img :src="t.image" class="w-full h-full object-cover" /></div></td>
                       <td><div class="font-black text-sm uppercase">{{ t.title || t.name }}</div></td>
                       <td class="font-bold">{{ t.duration || '--' }}</td>
                       <td><span class="status-badge" :class="t.status">{{ t.status?.toUpperCase() || 'PUBLICADO' }}</span></td>
                       <td class="text-right">
                         <div class="flex justify-end gap-2">
                           <button @click="editTrilha(t)" class="action-btn edit-btn"><Edit :size="16"/></button>
                           <button @click="deleteTrilha(t)" class="action-btn del-btn"><Trash :size="16"/></button>
                         </div>
                       </td>
                    </tr>
                 </tbody>`;

content = content.replace(
  /<section v-if="activeTab === 'trilhas'"[\s\S]*?<tbody>[\s\S]*?<\/tbody>/,
  match => {
    return match.replace(/<tbody>[\s\S]*?<\/tbody>/, trilhaTbody);
  }
);


fs.writeFileSync('src/views/AdminDashboardView.vue', content, 'utf8');
