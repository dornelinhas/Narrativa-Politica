<template>
  <div v-if="post" class="article-detail-premium selection-custom">
    <!-- PROGRESS BAR -->
    <div class="reading-progress-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- HEADER AREA (CLEAN & BLACK TEXT) -->
    <header class="article-header-premium bg-light border-b-dark">
      <div class="container-narrow pt-56 pb-24">
        <router-link to="/conteudo" class="back-link-brutalist mb-16 inline-flex items-center gap-3">
          <ArrowLeft :size="18" /> VOLTAR AO RADAR EDITORIAL
        </router-link>
        
        <div class="header-meta mb-10">
          <span class="cat-tag-brutalist">{{ post.category }}</span>
          <span class="reading-time-brutalist font-sans font-black opacity-40">{{ readingTime }} MIN DE LEITURA</span>
        </div>

        <h1 class="font-display text-5xl md-text-7xl leading-none tracking-tighter text-dark mb-12" style="color: #1C1C1C !important;">
          {{ post.title }}
        </h1>
        
        <p class="font-sans text-xl md-text-2xl font-semibold text-dark opacity-60 leading-tight mb-16 max-w-4xl">
          {{ post.excerpt }}
        </p>
        
        <div class="author-top-row border-t-dark pt-12">
          <div class="author-avatar-brutalist">
            <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" />
            <div v-else class="avatar-fallback-brutalist">{{ authorProfile.name?.charAt(0) }}</div>
          </div>
          <div class="author-meta-brutalist">
            <span class="author-name-thick text-dark">{{ authorProfile.name }}</span>
            <span class="publish-date-brutalist font-sans">{{ formatDate(post.date) }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTENT AREA -->
    <div class="article-main-wrapper bg-white">
      <div class="container-narrow py-32">
        
        <!-- MAIN IMAGE -->
        <figure class="featured-image-brutalist mb-24 shadow-solid">
          <img :src="post.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=1200'" :alt="post.title" />
        </figure>

        <!-- SHARING BAR -->
        <div class="sharing-horizontal mb-20 border-y-dark py-8 flex-center-left gap-10">
          <span class="font-sans font-black text-xs uppercase tracking-widest text-dark opacity-30">Compartilhar:</span>
          <div class="flex gap-6">
             <a :href="shareLinks.linkedin" target="_blank" class="share-icon-btn"><Linkedin :size="20" /></a>
             <a :href="shareLinks.whatsapp" target="_blank" class="share-icon-btn"><MessageCircle :size="20" /></a>
             <button @click="copyLink" class="share-icon-btn"><LinkIcon :size="20" /></button>
          </div>
        </div>

        <article class="article-rich-text font-sans text-dark" v-html="post.content"></article>

        <!-- AUTHOR BIO BOX -->
        <section class="author-bio-footer mt-48 mb-32">
          <div class="bio-card-brutalist">
            <div class="bio-avatar-large">
              <img v-if="authorProfile.image" :src="authorProfile.image" :alt="authorProfile.name" />
              <div v-else class="avatar-fallback-xl">{{ authorProfile.name?.charAt(0) }}</div>
            </div>
            <div class="bio-info-box">
              <h4 class="font-display text-4xl uppercase tracking-tighter text-dark mb-6">{{ authorProfile.name }}</h4>
              <p class="font-sans text-xl font-medium text-dark opacity-70 leading-relaxed">
                {{ authorProfile.bio || authorProfile.bioAuthor || 'Escritora, estrategista e ativista na Narrativa Política, transformando teoria econômica em impacto real nos territórios.' }}
              </p>
            </div>
          </div>
        </section>

        <!-- RADAR EDITORIAL SECTION (MINIMALIST) -->
        <section class="radar-footer-section pt-32 border-t-dark">
          <h3 class="font-display text-5xl uppercase tracking-tighter text-dark mb-16">
            Radar <span class="text-red">Editorial</span>
          </h3>
          <div class="radar-mini-grid">
             <router-link v-for="p in relatedPosts" :key="p.id" :to="`/conteudo/${p.id}`" class="radar-mini-card group">
                <div class="mini-thumb-box mb-8 border-dark">
                   <img :src="p.image || 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=400'" />
                </div>
                <h5 class="font-display text-2xl uppercase tracking-tighter leading-tight text-dark group-hover:text-red transition-colors">
                  {{ p.title }}
                </h5>
             </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { siteContent } from '../store/content'
import { 
  Linkedin, MessageCircle, Link as LinkIcon, ArrowLeft, ArrowRight
} from 'lucide-vue-next'

const route = useRoute()
const scrollProgress = ref(0)

const post = computed(() => siteContent.posts?.find(p => p.id === parseInt(route.params.id)))

const authorProfile = computed(() => {
  const authorId = post.value?.authorId || 'anne'
  return siteContent.authors?.find(a => a.id === authorId) || siteContent.authors?.[0] || { name: 'Anne Dornelas' }
})

const relatedPosts = computed(() => {
  return siteContent.posts?.filter(p => p.id !== post.value?.id).slice(0, 3) || []
})

const readingTime = computed(() => {
  if (!post.value?.content) return 1
  const words = post.value.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length
  return Math.ceil(words / 200)
})

const shareLinks = computed(() => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(post.value?.title || 'Narrativa Política')
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`
  }
})

const handleScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('Link copiado!')
}

onMounted(() => {
  window.scrollTo(0, 0)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.article-detail-premium { background: #F7F7F5; }
.container-narrow { max-width: 900px; margin: 0 auto; padding: 0 2.5rem; }
.bg-light { background-color: #F7F7F5; }
.text-dark { color: #1C1C1C !important; }
.text-red { color: #DF2028; }
.border-b-dark { border-bottom: 6px solid #1C1C1C; }
.border-t-dark { border-top: 6px solid #1C1C1C; }
.border-y-dark { border-top: 3px solid #1C1C1C; border-bottom: 3px solid #1C1C1C; }
.shadow-solid { box-shadow: 15px 15px 0px #1C1C1C; }

/* PROGRESS BAR */
.reading-progress-container { position: fixed; top: 0; left: 0; width: 100%; height: 8px; z-index: 4000; background: rgba(0,0,0,0.05); }
.progress-bar { height: 100%; background: #DF2028; transition: width 0.1s; }

.back-link-brutalist { 
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.8rem; 
  letter-spacing: 0.15em; text-decoration: none; color: #1C1C1C; opacity: 0.4;
  transition: all 0.2s;
}
.back-link-brutalist:hover { opacity: 1; color: #DF2028; transform: translateX(-5px); }

.cat-tag-brutalist {
  background: #FF6BCA; color: white; padding: 0.6rem 1.2rem; border: 3px solid #1C1C1C;
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 0.8rem; text-transform: uppercase;
  margin-right: 2rem;
}

.author-top-row { display: flex; align-items: center; gap: 2rem; }
.author-avatar-brutalist { width: 70px; height: 70px; border-radius: 50%; overflow: hidden; border: 3px solid #1C1C1C; }
.author-avatar-brutalist img { width: 100%; height: 100%; object-fit: cover; }
.author-meta-brutalist { display: flex; flex-direction: column; }
.author-name-thick { font-family: "Inter", sans-serif; font-weight: 900; font-size: 1.25rem; }
.publish-date-brutalist { font-size: 0.85rem; font-weight: 800; opacity: 0.4; text-transform: uppercase; margin-top: 4px; }

.article-rich-text { font-size: 1.45rem; line-height: 1.8; color: #1C1C1C; font-weight: 500; }
.article-rich-text :deep(p) { margin-bottom: 3rem; }
.article-rich-text :deep(h2) { font-family: "Archivo Black", sans-serif; font-size: 3rem; margin: 5rem 0 2rem; line-height: 1; letter-spacing: -0.05em; }

.share-icon-btn {
  width: 50px; height: 50px; border: 3px solid #1C1C1C; display: flex; align-items: center; justify-content: center;
  background: white; color: #1C1C1C; transition: all 0.2s;
}
.share-icon-btn:hover { transform: translate(-5px, -5px); box-shadow: 5px 5px 0 #1C1C1C; background: #FFE65A; }

.bio-card-brutalist { display: flex; gap: 4rem; background: #F7F7F5; border: 6px solid #1C1C1C; padding: 4rem; align-items: center; }
.bio-avatar-large { width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 4px solid #1C1C1C; flex-shrink: 0; box-shadow: 10px 10px 0 rgba(0,0,0,0.05); }
.bio-avatar-large img { width: 100%; height: 100%; object-fit: cover; }

.radar-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5rem; margin-bottom: 15rem; }
.mini-thumb-box { aspect-ratio: 16/9; overflow: hidden; border: 4px solid #1C1C1C; transition: all 0.4s; }
.mini-thumb-box img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: all 0.4s; }
.radar-mini-card:hover .mini-thumb-box { transform: translate(-8px, -8px); box-shadow: 8px 8px 0 #1C1C1C; }
.radar-mini-card:hover img { filter: grayscale(0%); }

@media (max-width: 900px) {
  .radar-mini-grid { grid-template-columns: 1fr; }
  .bio-card-brutalist { flex-direction: column; text-align: center; padding: 3rem; }
  .article-rich-text { font-size: 1.25rem; }
  .pt-56 { padding-top: 10rem; }
}
</style>