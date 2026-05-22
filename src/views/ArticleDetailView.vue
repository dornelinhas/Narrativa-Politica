<template>
  <div v-if="post" class="article-page bg-creme">

    <!-- PROGRESS BAR -->
    <div class="art-progress"><div class="art-progress__fill" :style="{ width: scrollProgress + '%' }"></div></div>

    <div class="container-max card-editorial p-0 bg-white paper-shadow mt-16 mb-16 border-thick flex-col" style="overflow: hidden; max-width: 900px; margin-left: auto; margin-right: auto;">
      
      <!-- HERO IMAGE -->
      <div class="art-hero halftone border-b-thick">
        <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=1400&q=80'" :alt="post.imageDescription || post.title" class="art-hero__img" />
        <div v-if="post.imageCaption" class="tag-solid bg-preto text-white border-thick" style="position: absolute; bottom: 16px; left: 16px; font-size: 10px;">
          {{ post.imageCaption }}
        </div>
      </div>

      <div class="p-12">
        
        <!-- META BAR -->
        <div class="art-meta flex-between align-center mb-8 wrap gap-4 border-b-thick pb-6">
          <router-link to="/conteudo" class="label-bold uppercase text-preto hover-red flex align-center gap-2">
            <ArrowLeft :size="16" /> {{ siteContent.articlesConfig?.backButtonText || 'VOLTAR AO RADAR' }}
          </router-link>
          
          <div class="flex align-center gap-4">
            <button @click="handleLike" class="btn-brutal paper-shadow-sm border-thick py-1 px-3" :class="isLiked ? 'bg-rosa text-white' : 'bg-white text-preto'" title="Curtir">
              <Heart :size="16" :class="{ 'fill-current': isLiked }" />
              <span class="ml-1">{{ post.likes || 0 }}</span>
            </button>
            <div class="art-meta__tags hide-mobile flex gap-2">
              <span class="tag-solid bg-vermelho text-white">{{ post.category }}</span>
              <span class="tag-solid bg-creme text-preto">{{ post.type || 'ARTIGO' }}</span>
            </div>
          </div>
        </div>

        <!-- TITLE & EXCERPT -->
        <h1 class="display-lg text-preto mb-4">{{ post.title }}</h1>
        <p class="body-lg text-variant mb-16">{{ post.subtitle || post.excerpt }}</p>

        <!-- AUTHOR ROW -->
        <div class="flex-between align-center border-t-thick pt-6 mb-16 wrap gap-4">
          <div class="flex align-center gap-4">
            <div class="art-avatar border-thick">
              <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" class="w-full h-full object-cover" />
              <span v-else class="art-avatar__fallback">{{ authorProfile.name?.charAt(0) }}</span>
            </div>
            <div class="flex-col">
              <span class="label-bold text-preto">{{ authorProfile.name }}</span>
              <span class="caption text-muted">{{ formatDate(post.date) }} • {{ readingTime }} MIN DE LEITURA</span>
            </div>
          </div>
          
          <div class="flex align-center gap-2">
            <span class="label-bold mr-2 hide-mobile text-preto uppercase">COMPARTILHAR:</span>
            <a :href="shareLinks.linkedin" target="_blank" rel="noopener" class="btn-brutal paper-shadow-sm text-preto bg-white border-thick p-2 icon-btn"><Linkedin :size="18" /></a>
            <a :href="shareLinks.whatsapp" target="_blank" rel="noopener" class="btn-brutal paper-shadow-sm text-preto bg-white border-thick p-2 icon-btn"><MessageCircle :size="18" /></a>
            <button @click="copyLink" class="btn-brutal paper-shadow-sm text-preto bg-white border-thick p-2 icon-btn"><LinkIcon :size="18" /></button>
          </div>
        </div>

        <!-- ARTICLE BODY -->
        <article class="art-body body-md text-preto pb-16 border-b-thick" v-html="sanitizeHtml(post.content)"></article>

        <!-- INTERACT BOTTOM -->
        <div class="flex justify-center py-16 border-b-thick">
           <button @click="handleLike" class="btn-brutal paper-shadow-sm border-thick p-4 flex align-center justify-center gap-2" :class="isLiked ? 'bg-rosa text-white' : 'bg-amarelo text-preto'" style="font-size: 16px;">
              <Heart :size="24" :class="{ 'fill-current': isLiked }" />
              <span class="label-bold">{{ isLiked ? 'VOCÊ CURTIU' : 'CURTIR ARTIGO' }}</span>
              <span v-if="post.likes > 0" class="tag-solid bg-white text-preto border-thick ml-2">{{ post.likes }}</span>
           </button>
        </div>

        <div class="pt-4 flex justify-center mb-16">
           <button v-if="post.references" @click="toggleRefs" class="btn-brutal btn-outline paper-shadow-sm border-thick" :class="{ 'bg-preto text-white': showRefs }">
             <LinkIcon :size="14" class="mr-2"/> {{ showRefs ? 'OCULTAR FONTES' : 'VER FONTES' }}
           </button>
        </div>

        <!-- REFERENCES -->
        <transition name="slide-fade">
          <section v-if="post.references && showRefs" class="card-editorial bg-creme paper-shadow-sm p-8 mb-16">
            <div class="flex-between align-center mb-6 border-b-thick pb-2">
              <h3 class="label-bold uppercase text-preto">REFERÊNCIAS E FONTES</h3>
              <button @click="showRefs = false" class="text-preto hover-red" style="background:none;border:none;cursor:pointer;">
                <X :size="20" />
              </button>
            </div>
            <div class="body-sm text-variant" v-html="sanitizeHtml(formatReferences(post.references))"></div>
          </section>
        </transition>

        <!-- AUTHOR BIO -->
        <section class="flex gap-6 py-8 items-start">
          <div class="art-avatar border-thick art-avatar-lg">
            <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" class="w-full h-full object-cover" />
            <span v-else class="art-avatar__fallback">{{ authorProfile.name?.charAt(0) }}</span>
          </div>
          <div class="flex-col">
            <span class="caption text-vermelho mb-2 block uppercase">ESCRITO POR</span>
            <h4 class="headline-md mb-2 text-preto">{{ authorProfile.name }}</h4>
            <p class="body-md text-variant">{{ authorProfile.bio || 'Estrategista e ativista na Narrativa Política.' }}</p>
          </div>
        </section>

      </div>
    </div>

    <!-- CONTINUE READING EM GRID SEPARADO -->
    <div class="container-max section-padding">
      <section v-if="relatedPosts.length" class="art-related">
        <h3 class="headline-md border-b-thick inline-block pb-2 mb-16 uppercase text-preto">{{ siteContent.articlesConfig?.relatedTitle || 'CONTINUE EXPLORANDO' }}</h3>
        
        <div class="grid-3 gap-12">
          <router-link v-for="p in relatedPosts" :key="p.id" :to="`/conteudo/${p.id}`" class="card-editorial bg-white paper-shadow flex-col h-full card-link p-0 group">
            <div class="h-48 border-b-thick overflow-hidden halftone group-hover:filter-none">
              <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=400'" :alt="p.title" class="w-full h-full object-cover card-img" />
            </div>
            <div class="p-6 flex-col flex-grow">
              <span class="caption text-azul mb-2 block">{{ p.category }}</span>
              <h4 class="headline-sm mb-4 card-title text-preto">{{ p.title }}</h4>
              <p class="body-sm text-variant flex-grow line-clamp-2">{{ p.subtitle || p.excerpt }}</p>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <!-- TOAST -->
    <transition name="toast">
      <div v-if="showToast" class="art-toast tag-solid bg-preto text-white paper-shadow border-thick" style="border-color: var(--np-white);">LINK COPIADO!</div>
    </transition>
  </div>

  <!-- LOADING / NOT FOUND -->
  <div v-else class="min-h-screen bg-creme flex flex-col justify-center align-center">
    <h2 class="display-md mb-6 text-preto uppercase">ARTIGO NÃO ENCONTRADO</h2>
    <router-link to="/conteudo" class="btn-brutal btn-preto paper-shadow-sm px-6 py-3">VOLTAR AO RADAR</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent, toggleLikeArtigo, filterPublicPosts } from '../store/content'
import { sanitizeHtml } from '../utils/sanitizeHtml'
import { Linkedin, MessageCircle, Link as LinkIcon, ArrowLeft, Heart, X } from 'lucide-vue-next'

const route = useRoute()
const scrollProgress = ref(0)
const showToast = ref(false)
const showRefs = ref(false)
const isLiked = ref(false)

const post = computed(() => siteContent.posts?.find(p => String(p.id) === String(route.params.id)))

const checkIfLiked = () => {
  if (post.value) {
    isLiked.value = !!localStorage.getItem(`liked_${post.value.id}`)
  }
}

const handleLike = async () => {
  if (!post.value) return
  const success = await toggleLikeArtigo(post.value.id)
  if (success) {
    checkIfLiked()
  }
}

watch(post, () => checkIfLiked(), { immediate: true })
const authorProfile = computed(() => {
  const authorId = post.value?.authorId || 'anne'
  return siteContent.authors?.find(a => a.id === authorId) || siteContent.authors?.[0] || { name: 'Anne Dornelas' }
})
const relatedPosts = computed(() => filterPublicPosts(siteContent.posts || []).filter(p => String(p.id) !== String(post.value?.id)).slice(0, 3))
const readingTime = computed(() => {
  if (!post.value?.content) return 1
  return Math.ceil(post.value.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200)
})
const shareLinks = computed(() => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(post.value?.title || '')
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`
  }
})

const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000)
}
const formatReferences = (refs) => {
  if (!refs) return ''
  return refs.replace(/\n/g, '<br>')
}

const toggleRefs = () => {
  showRefs.value = !showRefs.value
}

const handleScroll = () => {
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}

onMounted(() => { 
  window.scrollTo(0, 0)
  window.addEventListener('scroll', handleScroll) 
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* UTILS */
.bg-preto { background: var(--np-black) !important; }
.text-preto { color: var(--np-black) !important; }
.text-white { color: var(--np-white) !important; }
.border-thick { border: var(--border-thick); }
.border-b-thick { border-bottom: var(--border-thick); }
.border-t-thick { border-top: var(--border-thick); }

.mt-4 { margin-top: 16px; }
.mt-16 { margin-top: 64px; }
.mb-2 { margin-bottom: 8px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-8 { margin-bottom: 32px; }
.mb-16 { margin-bottom: 64px; }

.pt-4 { padding-top: 16px; }
.pt-6 { padding-top: 24px; }
.pb-2 { padding-bottom: 8px; }
.pb-6 { padding-bottom: 24px; }
.pb-16 { padding-bottom: 64px; }
.py-1 { padding-top: 4px; padding-bottom: 4px; }
.py-3 { padding-top: 12px; padding-bottom: 12px; }
.py-8 { padding-top: 32px; padding-bottom: 32px; }
.py-16 { padding-top: 64px; padding-bottom: 64px; }
.px-3 { padding-left: 12px; padding-right: 12px; }
.px-6 { padding-left: 24px; padding-right: 24px; }

.p-0 { padding: 0 !important; }
.p-2 { padding: 8px; }
.p-4 { padding: 16px; }
.p-6 { padding: 24px; }
.p-8 { padding: 32px; }
.p-12 { padding: 48px; }

.ml-1 { margin-left: 4px; }
.ml-2 { margin-left: 8px; }
.mr-2 { margin-right: 8px; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
.gap-12 { gap: 48px; }

.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.align-center { align-items: center; }
.justify-center { justify-content: center; }
.items-start { align-items: flex-start; }
.wrap { flex-wrap: wrap; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.h-48 { height: 192px; }
.flex-grow { flex-grow: 1; }
.block { display: block; }
.inline-block { display: inline-block; }
.object-cover { object-fit: cover; }
.overflow-hidden { overflow: hidden; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.uppercase { text-transform: uppercase; }

.min-h-screen { min-height: 100vh; }

.hover-red { transition: color 0.2s; }
.hover-red:hover { color: var(--np-vermelho); }
.display-lg { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 4rem); line-height: 1; margin: 0; text-transform: uppercase; font-weight: 800; }
.headline-sm { font-family: var(--font-display); font-size: 24px; font-weight: 700; line-height: 1.1; text-transform: uppercase; margin: 0; }
.display-md { font-family: var(--font-display); font-size: 3rem; font-weight: 800; }

/* ── PROGRESS ───────────────────────────────── */
.art-progress { position: fixed; top: 0; left: 0; width: 100%; height: 6px; z-index: 10000; background: transparent; }
.art-progress__fill { height: 100%; background: var(--np-vermelho); transition: width .1s ease-out; }

/* ── HERO IMAGE ─────────────────────────────── */
.art-hero { position: relative; width: 100%; max-height: 480px; overflow: hidden; }
.art-hero__img { width: 100%; height: 480px; object-fit: cover; display: block; }

/* ── AVATARS ───────────────────────────────── */
.art-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; background: var(--np-black); flex-shrink: 0; }
.art-avatar-lg { width: 72px; height: 72px; }
.art-avatar__fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); color: #fff; font-size: 1.5rem; }

/* ── ICONS & BUTTONS ──────────────────────────── */
.icon-btn { display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.icon-btn:hover { background: var(--np-black); color: var(--np-white); }
.fill-current { fill: currentColor; }

/* ── ARTICLE BODY ───────────────────────────── */
.art-body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; }
.art-body :deep(p) { margin: 0 0 1.5rem; font-size: 1.15rem; }
.art-body :deep(h2) { font-family: var(--font-display); font-size: 2.4rem; margin: 3rem 0 1rem; line-height: 1.1; color: var(--np-black); text-transform: uppercase; font-weight: 800; }
.art-body :deep(h3) { font-family: var(--font-sans); font-size: 1.25rem; font-weight: 800; margin: 2rem 0 .8rem; color: var(--np-black); text-transform: uppercase; }
.art-body :deep(blockquote) { border-left: 8px solid var(--np-rosa); padding: 24px; margin: 2rem 0; background: var(--np-amarelo); font-style: italic; font-size: 1.25rem; color: var(--np-black); border-radius: 0; font-family: var(--font-sans); font-weight: 600; line-height: 1.6; }
.art-body :deep(ul), .art-body :deep(ol) { margin: 0 0 1.5rem; padding-left: 1.5rem; font-size: 1.15rem; }
.art-body :deep(li) { margin-bottom: .5rem; }
.art-body :deep(a) { color: var(--np-vermelho); text-decoration: underline; text-underline-offset: 3px; font-weight: 700; transition: 0.2s; }
.art-body :deep(a:hover) { background: var(--np-vermelho); color: var(--np-white); }
.art-body :deep(img) { width: 100%; margin: 2rem 0; border: var(--border-thick); filter: grayscale(100%) contrast(1.1); mix-blend-mode: multiply; }

/* ── RELATED CARDS ──────────────────────────── */
.card-link { text-decoration: none; color: inherit; transition: border-color 0.2s, transform 0.2s; }
.card-link:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-paper-lg); }
.card-img { transition: transform 0.4s; }
.group:hover .card-img { transform: scale(1.05); }
.card-title { transition: color 0.2s; }
.group:hover .card-title { color: var(--np-vermelho); }

/* ── ANIMATIONS & TOAST ───────────────────────── */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

.art-toast { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 10000; font-family: var(--font-display); letter-spacing: 1px; font-size: 1.2rem; }
.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }

@media (max-width: 768px) {
  .p-12 { padding: 24px; }
  .grid-3 { grid-template-columns: 1fr; }
  .art-hero__img { height: 320px; }
}
</style>
