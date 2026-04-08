<template>
  <div v-if="article" class="article-detail container section-padding">
    <router-link to="/artigos" class="back-link">&larr; Voltar para artigos</router-link>
    
    <header class="article-header">
      <span class="category">{{ article.category }}</span>
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-meta">Publicado em {{ formatDate(article.date) }}</p>
    </header>

    <div class="featured-image" :style="{ backgroundImage: `url(${article.image})` }"></div>

    <div class="article-content" v-html="formattedContent"></div>
    
    <div class="article-footer">
      <h3>Gostou desta análise?</h3>
      <p>Compartilhe seu ponto de vista ou entre em contato para uma mentoria estratégica.</p>
      <router-link to="/mentoria" class="btn btn-primary">Falar sobre Mentoria</router-link>
    </div>
  </div>
  <div v-else class="container section-padding">
    <p>Artigo não encontrado.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import mockData from '../data/mockData.json'

const route = useRoute()
const article = computed(() => mockData.articles.find(a => a.id === parseInt(route.params.id)))

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formattedContent = computed(() => {
  if (!article.value) return ''
  // Basic conversion of newlines to paragraphs for mock data
  return article.value.content.split('\n\n').map(p => `<p>${p}</p>`).join('')
})
</script>

<style scoped>
.section-padding {
  padding: 60px 0 100px;
}

.back-link {
  display: inline-block;
  margin-bottom: 40px;
  font-weight: 600;
  color: var(--accent-gold);
}

.article-header {
  max-width: 800px;
  margin-bottom: 50px;
}

.category {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--accent-coral);
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.article-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 20px;
}

.article-meta {
  color: #888;
  font-size: 0.9rem;
}

.featured-image {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  margin-bottom: 60px;
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #333;
}

.article-content :deep(p) {
  margin-bottom: 25px;
}

.article-footer {
  max-width: 800px;
  margin: 80px auto 0;
  padding: 50px;
  background: var(--gray-light);
  border-radius: var(--border-radius);
  text-align: center;
}

.article-footer h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.article-footer p {
  margin-bottom: 30px;
  color: #666;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2.5rem;
  }
  .featured-image {
    height: 300px;
  }
}
</style>
