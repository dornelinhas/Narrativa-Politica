const fs = require('fs');
let vue_content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');
const old_script = fs.readFileSync('backup_antigo/old_script.js', 'utf8');

const new_logic = `
const isLoadingData = ref(false);
const hasLoadError = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);
const updateIsMobile = () => { isMobile.value = window.innerWidth < 768 };
onMounted(() => { updateIsMobile(); window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

const settingsData = ref(siteContent.settings || {});
`;

// Combine scripts
const oldScriptUpdated = old_script.replace("import { ref, onMounted, computed } from 'vue'", "import { ref, onMounted, onUnmounted, computed, watch } from 'vue'");
const merged_script = '<script setup>\n' + oldScriptUpdated + new_logic + '\n</script>';

// Replace script tag
vue_content = vue_content.replace(/<script setup>[\s\S]*?<\/script>/, merged_script);

// Inject Editorial fields
vue_content = vue_content.replace(
    '<div class="input-v2 mt-8"><label>Subtítulo / Linha fina</label><textarea v-model="novoArtigo.subtitle" rows="2"></textarea></div>',
    `<div class="input-v2 mt-8">
         <label class="flex justify-between items-center mb-0">
            <span>Resumo Estratégico (Aparece nos Cards)</span>
            <button @click.prevent="gerarResumoIA" class="text-[#FF3C82] underline font-bold" :disabled="isGeneratingSummary">
                {{ isGeneratingSummary ? 'GERANDO...' : ' GERAR COM IA' }}
            </button>
         </label>
         <textarea v-model="novoArtigo.subtitle" rows="3"></textarea>
         <p class="text-xs opacity-50 mt-2">Sugestão de legenda para LinkedIn/Instagram:</p>
         <textarea v-model="novoArtigo.highlightQuote" rows="2" class="mt-2 opacity-70" placeholder="Sua legenda gerada aparecerá aqui..."></textarea>
       </div>`
);

vue_content = vue_content.replace(
    '</BrutalEditor>',
    `</BrutalEditor>
              <div class="input-v2 mt-8"><label>Referências e Links de Apoio</label><textarea v-model="novoArtigo.references" rows="3" placeholder="Liste as fontes, referências bibliográficas ou links úteis..."></textarea></div>`
);

// Inject Vagas / Oportunidades fields
vue_content = vue_content.replace(
    '<div class="input-v2"><label>Link Direto</label><input v-model="novaVaga.link" type="url" /></div>',
    `<div class="input-v2"><label>Link Direto / Fonte original</label><input v-model="novaVaga.link" type="url" /></div>
               <div class="input-v2"><label>Modelo</label>
                  <select v-model="novaVaga.type">
                     <option value="Remoto">Remoto</option>
                     <option value="Presencial">Presencial</option>
                     <option value="Híbrido">Híbrido</option>
                  </select>
               </div>
               <div class="flex items-center gap-4 mt-8 bg-preto p-4 rounded-xl">
                  <button @click.prevent="importarOportunidadeURL" class="btn-tool-sm bg-[#A4CD39] text-black w-full" :disabled="isImportingOpportunity">
                     {{ isImportingOpportunity ? 'Puxando dados...' : 'IMPORTAR LINK COM IA' }}
                  </button>
               </div>`
);

fs.writeFileSync('src/views/AdminDashboardView.vue', vue_content, 'utf8');
