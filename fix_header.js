const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const oldHeader = /<div class="sidebar-header" style="padding-bottom: 24px;">\s*<div class="font-black tracking-tighter leading-none" style="font-family: 'Archivo Black', sans-serif;">\s*<div class="text-xl text-white">NARRATIVA<\/div>\s*<div class="text-xl text-\[#FF3C82\]">POLÍTICA<\/div>\s*<\/div>\s*<span class="badge-admin" style="margin-top:12px;">SISTEMA ADMIN<\/span>\s*<\/div>/;

const newHeader = `<div class="sidebar-header" style="padding-bottom: 24px; display: flex; flex-direction: column; align-items: center; text-align: center;">
  <div class="mb-4" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
     <svg viewBox="0 0 100 100" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="20" fill="#FFE65A" />
        <rect x="50" y="10" width="40" height="40" fill="#A4CD39" />
        <rect x="10" y="50" width="40" height="40" fill="#FF6BCA" />
        <circle cx="70" cy="70" r="20" fill="#3D78E0" />
     </svg>
  </div>
  <div class="font-black tracking-tighter leading-none" style="font-family: 'Archivo Black', sans-serif; text-align: center;">
    <div class="text-xl text-white">NARRATIVA</div>
    <div class="text-xl text-[#FF3C82]">POLÍTICA</div>
  </div>
  <span class="badge-admin" style="margin-top:12px;">SISTEMA ADMIN</span>
</div>`;

content = content.replace(oldHeader, newHeader);
fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Replaced sidebar header');
