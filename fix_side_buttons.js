const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// I'm replacing the 'Copiar legenda' and 'Gerar com IA' buttons to be styled similarly to standard buttons.
content = content.replace(/<button class="btn-copy-sm mt-3" @click="copyCaption">COPIAR LEGENDA<\/button>/g, '<button class="btn-copy-sm mt-3" @click="copyCaption" style="background: #202020; color: white; border: 2px solid #000; padding: 8px 16px; font-weight: bold; border-radius: 4px; text-transform: uppercase;">COPIAR LEGENDA</button>');

// Fix AI button
content = content.replace(/<button @click\.prevent="gerarResumoIA" class="btn-tool-sm bg-yellow border-dark" :disabled="isGeneratingSummary">\s*<Zap :size="12" \/> \{\{ isGeneratingSummary \? 'GERANDO\.\.\.' : 'GERAR COM IA' \}\}\s*<\/button>/g, '<button @click.prevent="gerarResumoIA" class="btn-tool-sm border-dark" style="background: #FFE65A; color: black; border: 2px solid #000; padding: 6px 12px; font-weight: bold;" :disabled="isGeneratingSummary">\n  <Zap :size="12" /> {{ isGeneratingSummary ? \'GERANDO...\' : \'GERAR COM IA\' }}\n</button>');

// Save draft button issue, it's white on white. It's 'SALVAR COMO RASCUNHO' in various sections.
// Let's replace 'background: #FFF;' with 'background: #EFEFEF; color: #000;' on btn-save-brutal
content = content.replace(/class="btn-save-brutal flex-1" style="background: #FFF;"/g, 'class="btn-save-brutal flex-1" style="background: #EFEFEF; color: #000;"');

fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Fixed side buttons');
