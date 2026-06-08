const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const btnPreviewOld = /<button class="btn-preview-solid" @click="exportReport" style="background:white; color:black;">\s*<Download :size="18" \/> <span class="hidden lg:inline">RELATÓRIO CSV<\/span>\s*<\/button>/g;

const btnPreviewNew = `<button class="btn-preview-solid" @click="exportReport" style="background: #202020; color: white;">
  <Download :size="18" /> <span class="hidden lg:inline">RELATÓRIO CSV</span>
</button>`;

content = content.replace(btnPreviewOld, btnPreviewNew);

const btnVoltarOld = /<button class="btn-preview-solid" @click="router\.push\('\/'\)">\s*<ExternalLink :size="18" \/> VOLTAR PARA O SITE\s*<\/button>/g;

const btnVoltarNew = `<button class="btn-preview-solid" @click="router.push('/')" style="background: #202020; color: white;">
  <ExternalLink :size="18" /> VOLTAR PARA O SITE
</button>`;

content = content.replace(btnVoltarOld, btnVoltarNew);

// Fix user pill
content = content.replace(/<div class="avatar-sm">A<\/div>/g, '<div class="avatar-sm" style="background-color: #000; color: #FFF;">A</div>');

// Rascunho buttons
content = content.replace(/style="background: #FFF;"/g, 'style="background: #EFEFEF; color: #000;"');

fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Fixed buttons');
