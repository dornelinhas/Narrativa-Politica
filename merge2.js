const fs = require('fs');
let vue_content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// Inject Importação Turbo
const turboHtml = `
         <!-- IMPORTAÇÃO TURBO -->
         <div class="panel-v2 bg-[#F1F3F5] p-12 mt-12 mb-12 border-thick rounded-3xl shadow-production relative">
            <h2 class="text-2xl font-black mb-2 uppercase">IMPORTAÇÃO TURBO (COLE O TEXTO DO SITE)</h2>
            <p class="text-sm opacity-60 font-bold mb-6">A Inteligência Artificial vai processar o texto colado e extrair VÁRIAS oportunidades de uma só vez, criando os cards prontos para revisão.</p>
            <textarea v-model="bulkImportText" rows="6" class="w-full p-4 border-thick rounded-xl mb-4" placeholder="Cole aqui o conteúdo de um edital, um post do LinkedIn, ou uma lista de vagas..."></textarea>
            <button @click.prevent="processBulkImport" class="primary-cta-btn bg-[#FF3C82] text-white" :disabled="isImportingBulk">
               <span v-if="!isImportingBulk">✨ PROCESSAR TEXTO COM IA</span>
               <span v-else>⏳ PROCESSANDO... ISSO PODE LEVAR ALGUNS MINUTOS...</span>
            </button>
            <p v-if="isImportingBulk" class="text-xs font-bold text-[#FF3C82] mt-2 animate-pulse">Não feche a página, o Gemini está lendo e estruturando as vagas...</p>
         </div>
         
         `;

vue_content = vue_content.replace(
    '<h4 class="text-xl font-black mb-8">LISTA DE OPORTUNIDADES</h4>',
    turboHtml + '<h4 class="text-xl font-black mb-8">LISTA DE OPORTUNIDADES</h4>'
);

// Add missing Newsletter/Substack fields
const substackHtml = `
         <!-- HISTÓRICO NEWSLETTER -->
         <div class="panel-v2 bg-white mt-12 p-12 overflow-hidden relative">
            <h3 class="text-2xl font-black mb-6 uppercase">CADASTRAR EDIÇÃO ANTERIOR</h3>
            <div class="grid md:grid-cols-2 gap-8">
               <div class="input-v2"><label>Título da Edição</label><input v-model="novaNewsletter.titulo" type="text" /></div>
               <div class="input-v2"><label>Link do Substack</label><input v-model="novaNewsletter.conteudo" type="url" placeholder="https://..." /></div>
            </div>
            <div class="input-v2 mt-8"><label>Resumo Curto</label><textarea v-model="novaNewsletter.descricao" rows="2"></textarea></div>
            <div class="input-v2 mt-8"><label>URL da Imagem de Capa</label><input v-model="novaNewsletter.capa_url" type="url" /></div>
            <button @click.prevent="saveNewsletter" class="primary-cta-btn bg-[#A4CD39] text-black mt-8">
               <Save size="20" /> SALVAR EDIÇÃO DA NEWSLETTER
            </button>
         </div>
         `;

vue_content = vue_content.replace(
    '<!-- 5. OPORTUNIDADES -->',
    substackHtml + '\n         <!-- 5. OPORTUNIDADES -->'
);

// Inject Regras de Curadoria
const curadoriaHtml = `
         <!-- CURADORIA E FONTES -->
         <div class="panel-v2 bg-white p-12 mt-12 mb-12 border-thick rounded-3xl shadow-production relative">
            <h2 class="text-2xl font-black mb-2 uppercase">SITES MONITORADOS E REGRAS DE CURADORIA</h2>
            <div class="grid md:grid-cols-2 gap-8 mt-6">
                <div class="input-v2"><label>Palavras-Chave Aceitas</label><textarea v-model="curationConfigData.includeKeywords" rows="2"></textarea></div>
                <div class="input-v2"><label>Palavras-Chave Rejeitadas</label><textarea v-model="curationConfigData.excludeKeywords" rows="2"></textarea></div>
                <div class="input-v2"><label>Idade Máxima do Post (Dias)</label><input v-model="curationConfigData.maxAgeDays" type="number" /></div>
                <div class="input-v2"><label>Nota Mínima de Relevância (IA)</label><input v-model="curationConfigData.minScore" type="number" /></div>
            </div>
            <button @click.prevent="saveCurationRules" class="primary-cta-btn bg-[#FFDC00] text-black mt-8" :disabled="isSaving">
               SALVAR REGRAS DE CURADORIA
            </button>
         </div>
         `;

vue_content = vue_content.replace(
    '<!-- TABELA DE VAGAS -->',
    curadoriaHtml + '\n            <!-- TABELA DE VAGAS -->'
);

fs.writeFileSync('src/views/AdminDashboardView.vue', vue_content, 'utf8');
