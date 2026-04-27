<template>
  <div v-if="post" class="article-page" :class="{ 'zen-mode': isZenMode }">

    <!-- PROGRESS BAR -->
    <div class="art-progress"><div class="art-progress__fill" :style="{ width: scrollProgress + '%' }"></div></div>

    <!-- META BAR (FIXED) -->
    <div class="art-meta-fixed shadow-solid" :class="{ 'scrolled': scrollY > 50 }">
      <div class="art-container art-meta-inner">
        <router-link to="/conteudo" class="art-meta__back">
          <ArrowLeft :size="16" /> <span class="hide-mobile">{{ siteContent.articlesConfig?.backButtonText || 'Voltar ao Radar' }}</span>
        </router-link>
        <div class="art-meta-actions">
          <button v-if="post.references" @click="toggleRefs" class="art-btn-ref" :class="{ active: showRefs }" title="Ver referências">
            <LinkIcon :size="14" /> {{ showRefs ? 'FECHAR FONTES' : 'VER FONTES' }}
          </button>
          <div class="art-meta__tags hide-mobile">
            <span class="art-tag">{{ post.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- HERO IMAGE (Full Width) -->
    <div class="art-hero">
      <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=1400&q=80'" :alt="post.imageDescription || post.title" class="art-hero__img" />
      <div v-if="post.imageCaption" class="art-image-caption">
        {{ post.imageCaption }}
      </div>
      <div class="art-hero__overlay"></div>
    </div>

    <div class="art-container art-content-wrap">
      
      <!-- TITLE & EXCERPT -->
      <h1 class="art-title">{{ post.title }}</h1>
      <p class="art-excerpt">{{ post.subtitle || post.excerpt }}</p>

      <!-- AUTHOR ROW -->
      <div class="art-author-row">
        <div class="art-author-row__left">
          <div class="art-avatar">
            <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" />
            <span v-else class="art-avatar__fallback">{{ authorProfile.name?.charAt(0) }}</span>
          </div>
          <div class="art-author-info">
            <span class="art-author-info__name">{{ authorProfile.name }}</span>
            <span class="art-author-info__date">{{ formatDate(post.date) }} · {{ post.reading_time || readingTime }} min de leitura</span>
          </div>
        </div>
        <div class="art-share-row">
          <a :href="shareLinks.linkedin" target="_blank" rel="noopener" class="art-share-btn" title="LinkedIn"><Linkedin :size="18" /></a>
          <a :href="shareLinks.whatsapp" target="_blank" rel="noopener" class="art-share-btn" title="WhatsApp"><MessageCircle :size="18" /></a>
          <button @click="copyLink" class="art-share-btn" title="Copiar link"><LinkIcon :size="18" /></button>
        </div>
      </div>

      <hr class="art-divider" />

      <!-- ARTICLE BODY -->
      <article class="art-body" v-html="post.content"></article>

      <!-- REFERENCES (COLLAPSIBLE) -->
      <transition name="slide-fade">
        <section v-if="post.references && showRefs" class="art-references">
          <div class="flex justify-between items-center mb-6">
            <h3 class="art-references__title">REFERÊNCIAS E FONTES</h3>
            <button @click="showRefs = false" class="text-xs font-bold opacity-50">FECHAR [X]</button>
          </div>
          <div class="art-references__content" v-html="post.references"></div>
        </section>
      </transition>

      <hr class="art-divider" />

      <!-- AUTHOR BIO -->
      <section class="art-bio">
        <div class="art-bio__avatar">
          <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" />
          <span v-else class="art-avatar__fallback art-avatar__fallback--lg">{{ authorProfile.name?.charAt(0) }}</span>
        </div>
        <div class="art-bio__info">
          <span class="art-bio__label">Escrito por</span>
          <h4 class="art-bio__name">{{ authorProfile.name }}</h4>
          <p class="art-bio__text">{{ authorProfile.bio || 'Estrategista e ativista na Narrativa Política.' }}</p>
        </div>
      </section>

      <!-- SHARE BOTTOM -->
      <div class="art-share-bottom">
        <span class="art-share-bottom__label">Compartilhar este artigo</span>
        <div class="art-share-row">
          <a :href="shareLinks.linkedin" target="_blank" rel="noopener" class="art-share-btn"><Linkedin :size="18" /></a>
          <a :href="shareLinks.whatsapp" target="_blank" rel="noopener" class="art-share-btn"><MessageCircle :size="18" /></a>
          <button @click="copyLink" class="art-share-btn"><LinkIcon :size="18" /></button>
        </div>
      </div>

      <hr class="art-divider" />

      <!-- CONTINUE READING -->
      <section v-if="relatedPosts.length" class="art-related">
        <h3 class="art-related__title">{{ siteContent.articlesConfig?.relatedTitle || 'Continue Explorando' }}</h3>
        <div class="art-related__grid">
          <router-link v-for="p in relatedPosts" :key="p.id" :to="`/conteudo/${p.id}`" class="art-card">
            <div class="art-card__img-wrap">
              <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=400'" :alt="p.title" />
            </div>
            <div class="art-card__body">
              <span class="art-card__cat">{{ p.category }}</span>
              <h4 class="art-card__title">{{ p.title }}</h4>
              <p class="art-card__excerpt">{{ p.subtitle || p.excerpt }}</p>
            </div>
          </router-link>
        </div>
      </section>

    </div>

    <!-- ZEN MODE -->
    <button @click="isZenMode = !isZenMode" class="art-zen" :title="isZenMode ? 'Sair do Modo Foco' : 'Modo Foco'">
      <Maximize v-if="!isZenMode" :size="20" /><Minimize v-else :size="20" />
    </button>

    <!-- TOAST -->
    <transition name="toast">
      <div v-if="showToast" class="art-toast">Link copiado!</div>
    </transition>
  </div>

  <!-- LOADING / NOT FOUND -->
  <div v-else class="art-empty">
    <h2>Artigo não encontrado</h2>
    <router-link to="/conteudo" class="brutalist-button dark">Voltar ao Radar</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { Linkedin, MessageCircle, Link as LinkIcon, ArrowLeft, Maximize, Minimize } from 'lucide-vue-next'

const route = useRoute()
const scrollProgress = ref(0)
const scrollY = ref(0)
const isZenMode = ref(false)
const showToast = ref(false)
const showRefs = ref(false)

const post = computed(() => siteContent.posts?.find(p => String(p.id) === String(route.params.id)))
const authorProfile = computed(() => {
  const authorId = post.value?.authorId || 'anne'
  return siteContent.authors?.find(a => a.id === authorId) || siteContent.authors?.[0] || { name: 'Anne Dornelas' }
})
const relatedPosts = computed(() => siteContent.posts?.filter(p => p.id !== post.value?.id).slice(0, 3) || [])
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

const toggleRefs = () => {
  showRefs.value = !showRefs.value
  if (showRefs.value) {
    setTimeout(() => {
      document.querySelector('.art-references')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}

const handleScroll = () => {
  scrollY.value = window.scrollY
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}

onMounted(() => { 
  window.scrollTo(0, 0)
  window.addEventListener('scroll', handleScroll) 
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Resetar estado ao trocar de artigo
watch(() => route.params.id, () => {
  window.scrollTo(0, 0)
  showRefs.value = false
})
</script>

<style scoped>
/* ── PAGE ───────────────────────────────────── */
.article-page { min-height: 100vh; padding-bottom: 80px; background: #FFF; }

/* ── PROGRESS ───────────────────────────────── */
.art-progress { position: fixed; top: 0; left: 0; width: 100%; height: 4px; z-index: 9999; background: rgba(0,0,0,.06); }
.art-progress__fill { height: 100%; background: var(--color-red, #DF2028); transition: width .12s ease-out; }

/* ── META BAR FIXED ──────────────────────────── */
.art-meta-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #FFF;
  z-index: 1000;
  border-bottom: 3px solid #1C1C1C;
  padding: 12px 0;
  transition: transform 0.3s, background 0.3s;
}
.art-meta-fixed.scrolled { background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); }
.art-meta-inner { display: flex; justify-content: space-between; align-items: center; }

/* ── HERO IMAGE ─────────────────────────────── */
.art-hero { position: relative; width: 100%; height: 75vh; min-height: 400px; max-height: 700px; overflow: hidden; background: #000; margin-top: 60px; }
.art-hero__img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
.art-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.3) 0%, transparent 60%); pointer-events: none; }
.art-image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: #1C1C1C;
  color: #FFF;
  padding: 8px 20px;
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ── CONTAINER ──────────────────────────────── */
.art-container { max-width: 760px; margin: 0 auto; padding: 0 24px; }

/* ── META ELEMENTS ───────────────────────────── */
.art-meta__back { display: inline-flex; align-items: center; gap: 8px; font-family: "Inter", sans-serif; font-weight: 800; font-size: .75rem; color: #1C1C1C; text-transform: uppercase; letter-spacing: .06em; text-decoration: none; transition: 0.2s; }
.art-meta__back:hover { color: #DF2028; transform: translateX(-4px); }
.art-meta-actions { display: flex; align-items: center; gap: 12px; }
.art-btn-ref {
  background: transparent;
  border: 2px solid #1C1C1C;
  padding: 6px 14px;
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
  border-radius: 6px;
  text-transform: uppercase;
}
.art-btn-ref:hover, .art-btn-ref.active { background: #1C1C1C; color: #FFF; }
.art-btn-ref.active { background: #FFE65A; color: #1C1C1C; border-color: #1C1C1C; }

.art-meta__tags { display: flex; gap: 8px; }
.art-tag { display: inline-block; padding: 5px 14px; font-family: "Inter", sans-serif; font-weight: 800; font-size: .65rem; text-transform: uppercase; letter-spacing: .08em; background: #DF2028; color: #fff; border-radius: 4px; }

/* ── CONTENT WRAP ────────────────────────────── */
.art-content-wrap { padding-top: 60px; }

/* ── TITLE ──────────────────────────────────── */
.art-title { font-family: "Archivo Black", sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.05; letter-spacing: -2px; color: #1C1C1C; margin: 0 0 25px; }
.art-excerpt { font-family: "Inter", sans-serif; font-size: 1.3rem; line-height: 1.55; color: #444; margin: 0 0 35px; font-weight: 500; border-left: 6px solid #FFE65A; padding-left: 25px; }

/* ── AUTHOR ROW ─────────────────────────────── */
.art-author-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: 30px; border-bottom: 2px solid #F1F5F9; margin-bottom: 40px; }
.art-author-row__left { display: flex; align-items: center; gap: 14px; }
.art-avatar { width: 52px; height: 52px; border-radius: 50%; overflow: hidden; background: #1C1C1C; border: 2px solid #1C1C1C; }
.art-avatar img { width: 100%; height: 100%; object-fit: cover; }
.art-avatar__fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: "Archivo Black"; color: #fff; font-size: 1.2rem; }
.art-author-info { display: flex; flex-direction: column; }
.art-author-info__name { font-weight: 800; font-size: 1rem; color: #1C1C1C; }
.art-author-info__date { font-size: .85rem; color: #888; margin-top: 2px; }

/* ── SHARE BUTTONS ──────────────────────────── */
.art-share-row { display: flex; gap: 10px; }
.art-share-btn { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #E2E8F0; background: #fff; display: flex; align-items: center; justify-content: center; color: #1C1C1C; cursor: pointer; transition: 0.2s; }
.art-share-btn:hover { background: #1C1C1C; color: #FFF; border-color: #1C1C1C; transform: translateY(-3px); }

/* ── ARTICLE BODY ───────────────────────────── */
.art-body { font-family: "Inter", sans-serif; font-size: 1.15rem; line-height: 1.8; color: #1A1A1A; padding-bottom: 60px; }
.art-body :deep(p) { margin: 0 0 1.8rem; }
.art-body :deep(h2) { font-family: "Archivo Black"; font-size: 1.8rem; margin: 3.5rem 0 1.2rem; color: #1C1C1C; letter-spacing: -1px; }
.art-body :deep(h3) { font-family: "Archivo Black"; font-size: 1.4rem; margin: 2.5rem 0 1rem; color: #1C1C1C; }
.art-body :deep(blockquote) { border-left: 6px solid #FF6BCA; padding: 20px 30px; margin: 2.5rem 0; background: #F8FAFC; font-style: italic; font-size: 1.2rem; color: #1C1C1C; border-radius: 0 12px 12px 0; }
.art-body :deep(img) { width: 100%; border-radius: 12px; margin: 2.5rem 0; border: 2px solid #1C1C1C; }
.art-body :deep(a) { color: #DF2028; text-decoration: underline; font-weight: 700; }

/* ── REFERENCES (COLLAPSIBLE) ────────────────── */
.art-references { background: #F8FAFC; border: 3px solid #1C1C1C; border-radius: 16px; padding: 35px; margin-bottom: 60px; box-shadow: 8px 8px 0px #1C1C1C; }
.art-references__title { font-family: "Archivo Black"; font-size: 1rem; color: #1C1C1C; margin: 0; }
.art-references__content { font-size: .95rem; line-height: 1.7; color: #444; }
.art-references__content :deep(p) { margin-bottom: 10px; }

/* ── AUTHOR BIO ─────────────────────────────── */
.art-bio { display: flex; gap: 30px; align-items: flex-start; padding: 60px 0; border-top: 2px solid #F1F5F9; }
.art-bio__avatar { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 3px solid #1C1C1C; }
.art-bio__avatar img { width: 100%; height: 100%; object-fit: cover; }
.art-bio__label { font-size: .75rem; text-transform: uppercase; letter-spacing: 2px; color: #999; font-weight: 800; }
.art-bio__name { font-family: "Archivo Black"; font-size: 1.5rem; color: #1C1C1C; margin: 5px 0 10px; }
.art-bio__text { line-height: 1.6; color: #555; }

/* ── ANIMATIONS ──────────────────────────────── */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.4s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-20px); }

.hide-mobile { display: block; }
@media (max-width: 768px) {
  .hide-mobile { display: none; }
  .art-hero { height: 50vh; margin-top: 55px; }
  .art-title { font-size: 2.2rem; }
  .art-meta-fixed { padding: 10px 0; }
  .art-bio { flex-direction: column; text-align: center; }
  .art-bio__avatar { margin: 0 auto; }
}
</style>
