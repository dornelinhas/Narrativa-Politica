<template>
  <div v-if="post" class="article-premium-view">
    <!-- BARRA DE PROGRESSO DE LEITURA -->
    <div class="reading-progress-container">
      <div class="reading-progress-bar" :style="{ width: readingProgress + '%' }"></div>
    </div>

    <!-- HEADER EDITORIAL -->
    <header class="editorial-header container-reading">
      <router-link to="/conteudo" class="back-link-minimal">← Voltar para Conteúdos</router-link>
      
      <h1 class="editorial-title">{{ post.title }}</h1>

      <div class="editorial-meta-clean">
        <span class="meta-item category-tag">{{ post.category }}</span>
        <span class="meta-item"><Calendar :size="14" /> {{ formatDate(post.date) }}</span>
        <span class="meta-item"><Clock :size="14" /> {{ readingTime }} min de leitura</span>
      </div>
    </header>

    <div class="article-main-layout container-reading">
      <!-- COMPARTILHAMENTO FLUTUANTE (DESKTOP) -->
      <aside class="share-sidebar-fixed">
        <div class="share-label">COMPARTILHE</div>
        <div class="share-buttons-stack">
          <a :href="shareLinks.linkedin" target="_blank" class="share-btn-circle ln" title="LinkedIn"><Linkedin :size="18" /></a>
          <a :href="shareLinks.whatsapp" target="_blank" class="share-btn-circle wa" title="WhatsApp"><MessageCircle :size="18" /></a>
          <a :href="shareLinks.twitter" target="_blank" class="share-btn-circle tw" title="X / Twitter"><Twitter :size="18" /></a>
          <button @click="copyLink" class="share-btn-circle cp" title="Copiar Link"><LinkIcon :size="18" /></button>
        </div>
      </aside>

      <div class="article-body-wrapper">
        <!-- IMAGEM DE CAPA -->
        <div class="editorial-hero">
          <img :src="post.image" :alt="post.title" class="hero-img-refined" />
        </div>

        <!-- CONTEÚDO DO ARTIGO -->
        <article class="editorial-content no-copy text-readable" @contextmenu.prevent @copy.prevent @cut.prevent>
          <p v-if="post.excerpt" class="editorial-lead">{{ post.excerpt }}</p>
          <div class="editorial-body-text rich-text-styled" v-html="post.content || 'Nenhum conteúdo cadastrado para este artigo.'"></div>
          
          <!-- REFERÊNCIAS -->
          <div v-if="post.references && post.references.length" class="editorial-references">
            <h3>Referências e Leituras</h3>
            <ul>
              <li v-for="(ref, idx) in post.references" :key="idx">
                <a :href="ref.url" target="_blank">{{ ref.title }}</a>
              </li>
            </ul>
          </div>
        </article>

        <!-- ASSINATURA DA AUTORA -->
        <section class="author-signature-minimal">
          <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" class="sig-avatar" />
          <div v-else class="sig-avatar-fallback">{{ authorProfile.name?.charAt(0) }}</div>
          <div class="sig-content">
            <p><strong>{{ authorProfile.name || 'Equipe Narrativa Política' }}</strong> • {{ authorProfile.bioAuthor || authorProfile.role || 'Especialista em impacto social.' }} <router-link to="/sobre">Saiba mais sobre meu trabalho.</router-link></p>
          </div>
        </section>

        <!-- CAPTURA DE LEADS (DEGRADÊ VIBRANTE) -->
        <section class="article-cta-gradient">
          <div class="cta-gradient-content">
            <h3 class="text-white">Receba nossa Newsletter</h3>
            <p class="text-white-op">Inscreva-se para receber análises exclusivas sobre economia, gênero, política e sustentabilidade.</p>
            <form @submit.prevent="subscribeLead" class="cta-glass-form">
              <input type="email" v-model="leadEmail" placeholder="Seu melhor e-mail" required />
              <button type="submit">Inscrever</button>
            </form>
            <router-link to="/arquivo-newsletter" class="vault-link">Explorar edições anteriores →</router-link>
          </div>
        </section>

        <!-- ARTIGOS RELACIONADOS -->
        <section class="related-articles-clean">
          <h3 class="related-heading">Leia também</h3>
          <div class="related-grid-clean">
            <router-link v-for="rel in relatedPosts" :key="rel.id" :to="`/conteudo/${rel.id}`" class="related-card-clean">
              <div class="rel-img-clean"><img :src="rel.image" /></div>
              <strong>{{ rel.title }}</strong>
            </router-link>
          </div>
        </section>
      </div>
    </div>

    <!-- TOAST PARA COPIA DE LINK -->
    <transition name="fade">
      <div v-if="copyToast" class="copy-toast">Link copiado para a área de transferência!</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent, saveContent } from '../store/content'
import { 
  Calendar, Clock, Linkedin, MessageCircle, Twitter, Link as LinkIcon 
} from 'lucide-vue-next'

const route = useRoute()
const post = computed(() => siteContent.posts?.find(p => p.id === parseInt(route.params.id)))
const authorProfile = computed(() => {
  const authorId = post.value?.authorId || 'anne'
  return siteContent.team?.find(m => m.id === authorId) || siteContent.team?.find(m => m.id === 'anne') || {}
})
const readingProgress = ref(0)
const leadEmail = ref('')
const copyToast = ref(false)

const readingTime = computed(() => {
  if (!post.value?.content) return 1
  const words = post.value.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length
  return Math.ceil(words / 200)
})

const shareLinks = computed(() => {
  const url = window.location.href
  const title = post.value?.title || 'Narrativa Política'
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  }
})

const relatedPosts = computed(() => {
  if (!siteContent.posts) return []
  return siteContent.posts.filter(p => p.id !== post.value?.id).slice(0, 3)
})

const updateProgress = () => {
  const scrolled = window.scrollY
  const height = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = (scrolled / height) * 100
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  copyToast.value = true
  setTimeout(() => copyToast.value = false, 3000)
}

const subscribeLead = () => {
  if (!siteContent.subscribers) siteContent.subscribers = []
  if (!siteContent.subscribers.find(s => s.email === leadEmail.value)) {
    siteContent.subscribers.push({ email: leadEmail.value, date: new Date().toLocaleDateString('pt-BR') })
    saveContent()
    alert('Obrigada por se inscrever!')
  }
  leadEmail.value = ''
}

onMounted(() => window.addEventListener('scroll', updateProgress))
onUnmounted(() => window.removeEventListener('scroll', updateProgress))

watchEffect(() => {
  if (post.value) document.title = `${post.value.title} | Narrativa Política`
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.article-premium-view { background: #FFFFFF; padding-top: 140px; padding-bottom: 100px; min-height: 100vh; position: relative; }

/* TEXT WHITE FOR GRADIENT */
.text-white { color: #FFFFFF !important; }
.text-white-op { color: rgba(255,255,255,0.9) !important; }

/* PROTEÇÃO DE CONTEÚDO */
.no-copy { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }

/* PROGRESS BAR */
.reading-progress-container { position: fixed; top: 72px; left: 0; width: 100%; height: 4px; background: #F1F5F9; z-index: 1000; }
.reading-progress-bar { height: 100%; background: linear-gradient(90deg, #FF2D55 0%, #8A2BE2 100%); transition: width 0.1s ease-out; }

.container-reading { max-width: 740px; margin: 0 auto; padding: 0 24px; }

/* HEADER */
.back-link-minimal { display: inline-block; color: #94A3B8; font-size: 0.85rem; font-weight: 700; text-decoration: none; margin-bottom: 32px; text-transform: uppercase; letter-spacing: 1px; }
.editorial-title { font-size: 3.5rem; line-height: 1.1; font-weight: 900; color: #111827; letter-spacing: -2.5px; margin-bottom: 24px; }

.editorial-meta-clean { display: flex; align-items: center; gap: 24px; margin-bottom: 60px; }
.meta-item { display: flex; align-items: center; gap: 8px; color: #64748B; font-size: 0.9rem; font-weight: 600; }
.category-tag { background: #FF2D55; color: #fff; padding: 4px 12px; border-radius: 6px; text-transform: uppercase; font-size: 0.75rem; font-weight: 900; letter-spacing: 1px; }

/* FLOATING SHARE */
.share-sidebar-fixed {
  position: absolute; left: -120px; top: 0; width: 60px;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.share-label { font-size: 0.65rem; font-weight: 900; color: #CBD5E1; transform: rotate(-90deg); margin-bottom: 20px; letter-spacing: 2px; }
.share-buttons-stack { display: flex; flex-direction: column; gap: 12px; }
.share-btn-circle {
  width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #64748B; background: #F8FAFC; border: 1.5px solid #F1F5F9; transition: all 0.3s;
}
.share-btn-circle:hover { transform: translateY(-3px); color: #fff; border-color: transparent; }
.share-btn-circle.ln:hover { background: #0077b5; }
.share-btn-circle.wa:hover { background: #25D366; }
.share-btn-circle.tw:hover { background: #000; }
.share-btn-circle.cp:hover { background: #FF2D55; }

/* CONTENT & RICH TEXT */
.editorial-hero { margin-bottom: 60px; }
.hero-img-refined { width: 100%; height: auto; border-radius: 12px; }
.editorial-lead { font-size: 1.5rem; line-height: 1.6; color: #475569; font-weight: 500; margin-bottom: 48px; border-left: 4px solid #F1F5F9; padding-left: 32px; }

.rich-text-styled :deep(p) { font-family: "Inter", sans-serif; font-size: 1.25rem; line-height: 1.8; color: #334155; margin-bottom: 2rem; }
.rich-text-styled :deep(blockquote) { 
  margin: 4rem 0; padding: 2rem 40px; 
  border-left: 8px solid #FF2D55; background: #FDF2F5;
  font-size: 1.8rem; font-weight: 800; color: #111827; letter-spacing: -1px; line-height: 1.3;
}
.rich-text-styled :deep(img) { width: 100%; height: auto; border-radius: 12px; margin-top: 2rem; }

/* AUTHOR SIGNATURE */
.author-signature-minimal {
  margin-top: 80px; padding-top: 32px; border-top: 1px solid #F1F5F9;
  display: flex; align-items: center; gap: 16px;
}
.sig-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.sig-content p { font-size: 0.95rem; color: #64748B; }
.sig-content strong { color: #111827; }
.sig-content a { color: #FF2D55; font-weight: 700; text-decoration: none; }

/* CTA GRADIENT */
.article-cta-gradient {
  margin: 60px 0; padding: 60px; border-radius: 28px;
  background: linear-gradient(135deg, #FF2D55 0%, #8A2BE2 50%, #00CED1 100%);
  color: #fff; text-align: center;
}
.cta-gradient-content h3 { font-size: 2.2rem; font-weight: 900; margin-bottom: 12px; letter-spacing: -1px; }
.cta-gradient-content p { font-size: 1.1rem; color: rgba(255,255,255,0.9); margin-bottom: 32px; }
.cta-glass-form { display: flex; gap: 12px; max-width: 500px; margin: 0 auto; }
.cta-glass-form input { flex: 1; padding: 16px 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: #fff; font-weight: 600; }
.cta-glass-form button { background: #fff; color: #111827; border: none; padding: 16px 32px; border-radius: 14px; font-weight: 900; cursor: pointer; transition: all 0.3s; }

.vault-link {
  display: inline-block; margin-top: 24px; color: rgba(255,255,255,0.8);
  font-size: 0.875rem; font-weight: 700; text-decoration: none; transition: color 0.3s;
}
.vault-link:hover { color: #fff; }

/* RELATED */
.related-articles-clean { margin-top: 80px; }
.related-heading { font-size: 1.3rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #111827; margin-bottom: 32px; }
.related-grid-clean { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.related-card-clean { text-decoration: none; display: flex; flex-direction: column; gap: 12px; }
.rel-img-clean { height: 160px; border-radius: 12px; overflow: hidden; background: #F1F5F9; }
.rel-img-clean img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.related-card-clean:hover .rel-img-clean img { transform: scale(1.05); }
.related-card-clean strong { font-size: 1.1rem; color: #111827; line-height: 1.3; font-weight: 800; }

@media (max-width: 1100px) {
  .share-sidebar-fixed { position: static; flex-direction: row; width: 100%; justify-content: center; margin-bottom: 40px; }
  .share-buttons-stack { flex-direction: row; }
  .share-label { transform: none; margin-bottom: 0; align-self: center; }
}

@media (max-width: 768px) {
  .editorial-title { font-size: 2.5rem; }
  .related-grid-clean { grid-template-columns: 1fr; }
}
</style>