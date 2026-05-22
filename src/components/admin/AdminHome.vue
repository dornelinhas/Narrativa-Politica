<template>
  <div class="panel-v2 bg-white p-12 shadow-production overflow-hidden">
    <div class="card-accent bg-[#FFDC00]"></div>
    <h3 class="text-3xl font-black mb-12 uppercase tracking-tighter">CONFIGURAÇÃO DA PÁGINA INICIAL</h3>
    
    <div class="space-y-12">
        <!-- HERO SECTION -->
        <div class="p-10 bg-[#F1F3F5] rounded-3xl border border-black/5">
          <h4 class="text-xl font-black mb-8 flex items-center gap-3"><Layout :size="24" /> SEÇÃO HERO</h4>
          <div class="grid md:grid-cols-2 gap-8">
              <div class="input-v2"><label>Título (Parte 1)</label><input v-model="homeData.heroTitle" type="text" /></div>
              <div class="input-v2"><label>Título em Destaque (Parte 2)</label><input v-model="homeData.heroTitleAccent" type="text" /></div>
          </div>
          <div class="input-v2 mt-8"><label>Subtítulo / Manifesto</label><textarea v-model="homeData.heroDescription" rows="4"></textarea></div>
          <div class="grid md:grid-cols-2 gap-8 mt-8">
              <div class="input-v2"><label>Texto do Botão Hero</label><input v-model="homeData.heroButtonText" type="text" /></div>
              <div class="input-v2"><label>Tamanho da Fonte (Rem)</label><input v-model="homeData.heroFontSize" type="text" /></div>
          </div>
        </div>

        <!-- MARQUEE & RADAR -->
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="p-10 bg-white border-thick rounded-3xl">
              <h4 class="text-lg font-black mb-6 uppercase">Faixa Marquee</h4>
              <div class="input-v2"><label>Texto em Movimento</label><input v-model="homeData.marqueeText" type="text" /></div>
              <div class="input-v2 mt-6"><label>Espaçamento (Rem)</label><input v-model="homeData.marqueePadding" type="text" /></div>
          </div>
          <div class="p-10 bg-white border-thick rounded-3xl">
              <h4 class="text-lg font-black mb-6 uppercase">Radar Editorial</h4>
              <div class="input-v2"><label>Título do Bloco</label><input v-model="homeData.radarEditorialTitle" type="text" /></div>
              <div class="input-v2 mt-6"><label>Subtítulo</label><input v-model="homeData.radarEditorialSubtitle" type="text" /></div>
              <div class="input-v2 mt-6"><label>Descrição Curta</label><textarea v-model="homeData.radarEditorialDesc" rows="2"></textarea></div>
          </div>
        </div>

        <!-- OPORTUNIDADES NA HOME -->
        <div class="p-10 bg-[#A4CD39] text-[#1C1C1C] rounded-3xl border-thick shadow-production">
          <h4 class="text-xl font-black mb-8 uppercase">BLOCO DE OPORTUNIDADES</h4>
          <div class="grid md:grid-cols-2 gap-8">
              <div class="input-v2"><label>Título</label><input v-model="homeData.vagasTitle" type="text" /></div>
              <div class="input-v2"><label>Título Destacado</label><input v-model="homeData.vagasTitleAccent" type="text" /></div>
          </div>
          <div class="input-v2 mt-8"><label>Descrição</label><textarea v-model="homeData.vagasDescription" rows="3"></textarea></div>
          <div class="input-v2 mt-8"><label>Texto do Botão</label><input v-model="homeData.vagasButtonText" type="text" /></div>
        </div>

        <!-- NEWSLETTER CONFIG (PRODUCTION STYLE) -->
        <div class="p-10 bg-preto text-white rounded-3xl border-thick">
          <h4 class="text-xl font-black mb-8 text-[#FFDC00] uppercase">BLOCO DE CONVERSÃO (NEWSLETTER)</h4>
          <div class="grid md:grid-cols-2 gap-8">
              <div class="input-v2"><label class="!text-white/40">Chamada (Eyebrow)</label><input v-model="homeData.newsletterEyebrow" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
              <div class="input-v2"><label class="!text-white/40">Título Principal</label><input v-model="homeData.newsletterTitle" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
          </div>
          <div class="input-v2 mt-8"><label class="!text-white/40">Descrição de Apoio</label><textarea v-model="homeData.newsletterDescription" rows="3" class="!bg-white/5 !text-white !border-white/10"></textarea></div>
          <div class="grid md:grid-cols-2 gap-8 mt-8">
              <div class="input-v2"><label class="!text-white/40">Placeholder do E-mail</label><input v-model="homeData.newsletterPlaceholder" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
              <div class="input-v2"><label class="!text-white/40">Texto do Botão</label><input v-model="homeData.newsletterButton" type="text" class="!bg-white/5 !text-white !border-white/10" /></div>
          </div>
        </div>

        <button @click="saveHome" :disabled="isSaving" class="primary-cta-btn bg-[#FFDC00] text-black w-full py-6 text-xl justify-center shadow-production">
          <Save v-if="!isSaving" :size="24" />
          {{ isSaving ? 'SINCRONIZANDO...' : 'SALVAR TODAS AS MUDANÇAS DA HOME' }}
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Layout, Save } from 'lucide-vue-next'
import { siteContent, logActivity } from '../../store/content'
import { supabase } from '../../lib/supabase'

const isSaving = ref(false)

const homeData = ref({
  heroTitle: '',
  heroTitleAccent: '',
  heroDescription: '',
  heroButtonText: '',
  heroFontSize: '11vw',
  marqueeText: '',
  marqueePadding: '1.25rem',
  radarEditorialTitle: 'Movimento.',
  radarEditorialSubtitle: '',
  radarEditorialDesc: '',
  vagasTitle: 'Oportuni',
  vagasTitleAccent: 'dades',
  vagasDescription: '',
  vagasButtonText: 'VER TODAS AS VAGAS',
  newsletterEyebrow: 'Rede de Mobilização',
  newsletterTitle: 'Junte-se ao Movimento.',
  newsletterDescription: '',
  newsletterPlaceholder: 'Digite seu email...',
  newsletterButton: 'Quero Fazer Parte'
})

onMounted(() => {
  if (siteContent.home) {
    homeData.value = { ...homeData.value, ...siteContent.home }
  }
})

const persistSiteSetting = async (key, value) => {
  if (!supabase) return
  const { error } = await supabase.from('site_settings').upsert({ key, value })
  if (error) throw error
}

const recordActivity = async (title, type = 'Edição') => {
  logActivity(title, type)
  if (supabase) {
    await persistSiteSetting('lastActivity', siteContent.lastActivity)
  }
}

const saveHome = async () => {
  isSaving.value = true
  try {
    Object.assign(siteContent.home, homeData.value)
    await persistSiteSetting('home', homeData.value)
    await recordActivity('Página Inicial', 'Configuração Home')
    alert('Home salva com sucesso!')
  } catch(e) { 
    alert('Erro: ' + e.message) 
  } finally { 
    isSaving.value = false 
  }
}
</script>

<style scoped>
.border-thick { border: 2.5px solid #0F0F0F; }
.input-v2 label { display: block; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: rgba(0,0,0,0.4); margin-bottom: 12px; }
.input-v2 input, .input-v2 textarea {
  width: 100%; padding: 20px; border-radius: 18px; border: 2.5px solid #0F0F0F;
  background: white; font-weight: 700; font-size: 16px; outline: none; transition: all 0.2s;
}
.input-v2 input:focus, .input-v2 textarea:focus { 
  box-shadow: 8px 8px 0px #FF3C82; 
  transform: translate(-4px, -4px);
  background: #F8FAFC; 
}
.primary-cta-btn {
  background: #0F0F0F; color: white; border: 2.5px solid #0F0F0F;
  padding: 14px 28px; border-radius: 16px; font-weight: 900; text-transform: uppercase;
  font-size: 12px; letter-spacing: 1px; display: flex; align-items: center; gap: 10px;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1); transition: all 0.2s; cursor: pointer;
}
.primary-cta-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #0F0F0F; }
.primary-cta-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.shadow-production { box-shadow: 8px 8px 0px #0F0F0F; }
</style>
