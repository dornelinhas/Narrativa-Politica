const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const oldMetrics = /<div class="metrics-grid-premium mb-12">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newMetrics = `<div class="metrics-grid-premium mb-12" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
   <div class="metric-card-glass shadow-solid" style="padding: 1.5rem; background: #FFF; border: 2px solid #000; border-radius: 12px;">
      <div class="metric-label" style="font-size: 0.75rem; font-weight: 800; color: #666; margin-bottom: 0.5rem;">INSCRITOS TOTAIS</div>
      <div class="metric-value" style="font-size: 2.5rem; font-weight: 900; line-height: 1;">{{ siteContent.subscribers?.length || 0 }}</div>
      <div class="metric-trend text-green-500" style="font-size: 0.875rem; font-weight: 600; margin-top: 0.5rem;">+12% esta semana</div>
   </div>
   <div class="metric-card-glass shadow-solid" style="padding: 1.5rem; background: #FFF; border: 2px solid #000; border-radius: 12px;">
      <div class=\"metric-label\" style=\"font-size: 0.75rem; font-weight: 800; color: #666; margin-bottom: 0.5rem;\">TAXA DE ABERTURA</div>
      <div class=\"metric-value\" style=\"font-size: 2.5rem; font-weight: 900; line-height: 1;\">68.4%</div>
      <div class=\"metric-trend text-blue-500\" style=\"font-size: 0.875rem; font-weight: 600; margin-top: 0.5rem;\">Acima da média</div>
   </div>
   <div class=\"metric-card-glass shadow-solid\" style=\"padding: 1.5rem; background: #FFF; border: 2px solid #000; border-radius: 12px;\">
      <div class=\"metric-label\" style=\"font-size: 0.75rem; font-weight: 800; color: #666; margin-bottom: 0.5rem;\">EDIÇÕES ENVIADAS</div>
      <div class=\"metric-value\" style=\"font-size: 2.5rem; font-weight: 900; line-height: 1;\">{{ siteContent.newsletters?.length || 0 }}</div>
      <div class=\"metric-trend opacity-50\" style=\"font-size: 0.875rem; font-weight: 600; margin-top: 0.5rem;\">Histórico completo</div>
   </div>
</div>`;

content = content.replace(oldMetrics, newMetrics);

fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Replaced newsletter metrics');
