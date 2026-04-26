<template>
  <div v-if="post" class="article-page">

    <!-- PROGRESS BAR -->
    <div class="art-progress"><div class="art-progress__fill" :style="{ width: scrollProgress + '%' }"></div></div>

    <!-- HERO IMAGE (Full Width) -->
    <div class="art-hero">
      <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=1400&q=80'" :alt="post.title" class="art-hero__img" />
      <div class="art-hero__overlay"></div>
    </div>

    <!-- ARTICLE CONTAINER -->
    <div class="art-container">

      <!-- META BAR -->
      <div class="art-meta">
        <router-link to="/conteudo" class="art-meta__back">
          <ArrowLeft :size="16" /> {{ siteContent.articlesConfig?.backButtonText || 'Voltar ao Radar' }}
        </router-link>
        <div class="art-meta__tags">
          <span class="art-tag">{{ post.category }}</span>
          <span class="art-tag art-tag--muted">{{ post.type || 'Artigo' }}</span>
        </div>
      </div>

      <!-- HEADLINE -->
      <h1 class="art-title">{{ post.title }}</h1>
      <p v-if="post.excerpt" class="art-excerpt">{{ post.excerpt }}</p>

      <!-- AUTHOR ROW -->
      <div class="art-author-row">
        <div class="art-author-row__left">
          <div class="art-avatar">
            <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" />
            <span v-else class="art-avatar__fallback">{{ authorProfile.name?.charAt(0) }}</span>
          </div>
          <div class="art-author-info">
            <span class="art-author-info__name">{{ authorProfile.name }}</span>
            <span class="art-author-info__date">{{ formatDate(post.date) }} · {{ readingTime }} min de leitura</span>
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

      <!-- REFERENCES -->
      <section v-if="post.refs || post.references" class="art-references">
        <h3 class="art-references__title">Referências</h3>
        <div class="art-references__content" v-html="post.refs || post.references"></div>
      </section>

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
              <p class="art-card__excerpt">{{ p.excerpt }}</p>
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
const isZenMode = ref(false)
const showToast = ref(false)

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
const handleScroll = () => {
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = h > 0 ? (window.scrollY / h) * 100 : 0
}
onMounted(() => { window.scrollTo(0, 0); window.addEventListener('scroll', handleScroll) })
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ── PAGE ───────────────────────────────────── */
.article-page { min-height: 100vh; padding-bottom: 80px; }

/* ── PROGRESS ───────────────────────────────── */
.art-progress { position: fixed; top: 0; left: 0; width: 100%; height: 4px; z-index: 9999; background: rgba(0,0,0,.06); }
.art-progress__fill { height: 100%; background: var(--color-red, #DF2028); transition: width .12s ease-out; }

/* ── HERO IMAGE ─────────────────────────────── */
.art-hero { position: relative; width: 100%; max-height: 520px; overflow: hidden; }
.art-hero__img { width: 100%; height: 520px; object-fit: cover; display: block; }
.art-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.25) 0%, transparent 50%); }

/* ── CONTAINER ──────────────────────────────── */
.art-container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

/* ── META BAR ───────────────────────────────── */
.art-meta { display: flex; justify-content: space-between; align-items: center; padding: 28px 0 20px; flex-wrap: wrap; gap: 12px; }
.art-meta__back { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans, 'Inter', sans-serif); font-weight: 700; font-size: .8rem; color: var(--color-dark, #1C1C1C); text-transform: uppercase; letter-spacing: .06em; opacity: .55; transition: opacity .2s; text-decoration: none; }
.art-meta__back:hover { opacity: 1; }
.art-meta__tags { display: flex; gap: 8px; }
.art-tag { display: inline-block; padding: 5px 14px; font-family: var(--font-sans); font-weight: 800; font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; background: var(--color-red, #DF2028); color: #fff; border-radius: 3px; }
.art-tag--muted { background: var(--color-bg, #F7F7F5); color: var(--color-dark, #1C1C1C); }

/* ── TITLE ──────────────────────────────────── */
.art-title { font-family: var(--font-display, 'Archivo Black', sans-serif); font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.08; letter-spacing: -1.5px; color: var(--color-dark); margin: 8px 0 20px; text-transform: none; }
.art-excerpt { font-family: var(--font-sans); font-size: 1.25rem; line-height: 1.55; color: #555; margin: 0 0 28px; font-weight: 400; }

/* ── AUTHOR ROW ─────────────────────────────── */
.art-author-row { display: flex; justify-content: space-between; align-items: center; padding: 0 0 24px; flex-wrap: wrap; gap: 16px; }
.art-author-row__left { display: flex; align-items: center; gap: 14px; }
.art-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; background: var(--color-dark); flex-shrink: 0; }
.art-avatar img { width: 100%; height: 100%; object-fit: cover; }
.art-avatar__fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); color: #fff; font-size: 1.2rem; background: var(--color-dark); }
.art-avatar__fallback--lg { font-size: 2rem; }
.art-author-info { display: flex; flex-direction: column; }
.art-author-info__name { font-family: var(--font-sans); font-weight: 700; font-size: .95rem; color: var(--color-dark); }
.art-author-info__date { font-family: var(--font-sans); font-size: .82rem; color: #888; margin-top: 2px; }

/* ── SHARE BUTTONS ──────────────────────────── */
.art-share-row { display: flex; gap: 8px; }
.art-share-btn { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #ddd; background: #fff; display: flex; align-items: center; justify-content: center; color: #555; cursor: pointer; transition: all .2s; }
.art-share-btn:hover { border-color: var(--color-dark); color: var(--color-dark); background: var(--color-bg, #F7F7F5); }

/* ── DIVIDER ────────────────────────────────── */
.art-divider { border: none; border-top: 1px solid #e6e6e6; margin: 0; }

/* ── ARTICLE BODY ───────────────────────────── */
.art-body { font-family: 'Georgia', 'Times New Roman', serif; font-size: 1.22rem; line-height: 1.85; color: #222; padding: 36px 0; }
.art-body :deep(p) { margin: 0 0 1.75rem; }
.art-body :deep(h2) { font-family: var(--font-display); font-size: 1.8rem; margin: 3rem 0 1rem; line-height: 1.15; color: var(--color-dark); text-transform: none; letter-spacing: -.5px; }
.art-body :deep(h3) { font-family: var(--font-sans); font-size: 1.35rem; font-weight: 800; margin: 2.5rem 0 .8rem; color: var(--color-dark); text-transform: none; line-height: 1.3; }
.art-body :deep(blockquote) { margin: 2rem 0; padding: 1.5rem 0 1.5rem 1.8rem; border-left: 3px solid var(--color-dark); font-style: italic; font-size: 1.3rem; color: #333; line-height: 1.6; background: none; }
.art-body :deep(ul), .art-body :deep(ol) { margin: 0 0 1.75rem; padding-left: 1.5rem; }
.art-body :deep(li) { margin-bottom: .6rem; }
.art-body :deep(a) { color: var(--color-red, #DF2028); text-decoration: underline; text-underline-offset: 3px; }
.art-body :deep(img) { width: 100%; border-radius: 4px; margin: 2rem 0; }
.art-body :deep(figcaption) { font-family: var(--font-sans); font-size: .85rem; color: #888; text-align: center; margin-top: -1rem; margin-bottom: 2rem; }

/* ── REFERENCES ─────────────────────────────── */
.art-references { background: var(--color-bg, #F7F7F5); border-radius: 8px; padding: 28px 32px; margin: 8px 0 32px; }
.art-references__title { font-family: var(--font-sans); font-weight: 800; font-size: .9rem; text-transform: uppercase; letter-spacing: .1em; color: var(--color-dark); margin: 0 0 14px; }
.art-references__content { font-family: var(--font-sans); font-size: .9rem; line-height: 1.7; color: #555; }
.art-references__content :deep(a) { color: var(--color-red); text-decoration: underline; }
.art-references__content :deep(p) { margin: 0 0 .6rem; }

/* ── AUTHOR BIO ─────────────────────────────── */
.art-bio { display: flex; gap: 24px; align-items: flex-start; padding: 40px 0; }
.art-bio__avatar { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; flex-shrink: 0; background: var(--color-dark); }
.art-bio__avatar img { width: 100%; height: 100%; object-fit: cover; }
.art-bio__label { font-family: var(--font-sans); font-size: .75rem; text-transform: uppercase; letter-spacing: .12em; color: #999; font-weight: 700; }
.art-bio__name { font-family: var(--font-display); font-size: 1.3rem; color: var(--color-dark); margin: 4px 0 8px; text-transform: none; line-height: 1.2; }
.art-bio__text { font-family: var(--font-sans); font-size: .95rem; line-height: 1.6; color: #555; margin: 0; }

/* ── SHARE BOTTOM ───────────────────────────── */
.art-share-bottom { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; flex-wrap: wrap; gap: 12px; }
.art-share-bottom__label { font-family: var(--font-sans); font-weight: 700; font-size: .85rem; color: var(--color-dark); }

/* ── RELATED / CONTINUE READING ─────────────── */
.art-related { padding: 48px 0 0; }
.art-related__title { font-family: var(--font-display); font-size: 1.6rem; color: var(--color-dark); margin: 0 0 28px; text-transform: none; line-height: 1; }
.art-related__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.art-card { text-decoration: none; color: inherit; border-radius: 8px; overflow: hidden; transition: transform .25s ease, box-shadow .25s ease; border: 2px solid #e6e6e6; }
.art-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.1); }
.art-card__img-wrap { aspect-ratio: 16/10; overflow: hidden; }
.art-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.art-card:hover .art-card__img-wrap img { transform: scale(1.05); }
.art-card__body { padding: 16px 18px 20px; }
.art-card__cat { font-family: var(--font-sans); font-size: .68rem; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--color-red); }
.art-card__title { font-family: var(--font-display); font-size: 1rem; line-height: 1.2; margin: 6px 0 8px; color: var(--color-dark); text-transform: none; }
.art-card__excerpt { font-family: var(--font-sans); font-size: .82rem; line-height: 1.5; color: #777; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* ── ZEN MODE ────────────────────────────────── */
.art-zen { position: fixed; bottom: 32px; right: 32px; z-index: 5000; width: 52px; height: 52px; border-radius: 50%; border: none; background: var(--color-dark, #1C1C1C); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,.2); transition: all .2s; }
.art-zen:hover { transform: scale(1.1); background: var(--color-red); }

/* ── TOAST ───────────────────────────────────── */
.art-toast { position: fixed; bottom: 100px; right: 32px; z-index: 6000; background: var(--color-dark); color: #fff; padding: 12px 24px; border-radius: 8px; font-family: var(--font-sans); font-size: .85rem; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,.2); }
.toast-enter-active { animation: toastIn .3s ease; }
.toast-leave-active { animation: toastOut .3s ease forwards; }
@keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateY(-10px); } }

/* ── EMPTY STATE ────────────────────────────── */
.art-empty { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 120px 24px; text-align: center; }
.art-empty h2 { font-family: var(--font-display); font-size: 2rem; color: var(--color-dark); }

/* ── RESPONSIVE ─────────────────────────────── */
@media (max-width: 900px) {
  .art-related__grid { grid-template-columns: 1fr; }
  .art-hero__img { height: 320px; }
}
@media (max-width: 600px) {
  .art-container { padding: 0 18px; }
  .art-title { font-size: 1.7rem; letter-spacing: -.5px; }
  .art-excerpt { font-size: 1.05rem; }
  .art-body { font-size: 1.08rem; }
  .art-bio { flex-direction: column; align-items: center; text-align: center; }
  .art-hero__img { height: 240px; }
  .art-references { padding: 20px; }
}
</style>
