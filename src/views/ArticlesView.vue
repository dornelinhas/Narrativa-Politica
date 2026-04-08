<template>
  <div class="articles container section-padding">
    <h1 class="page-title">Artigos & Análises</h1>
    
    <div class="filters">
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="activeCategory = cat"
        :class="['filter-btn', { active: activeCategory === cat }]"
      >
        {{ cat }}
      </button>
    </div>

    <div class="article-grid">
      <div v-for="article in filteredArticles" :key="article.id" class="article-card">
        <div class="card-img" :style="{ backgroundImage: `url(${article.image})` }"></div>
        <div class="card-body">
          <span class="category">{{ article.category }}</span>
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <router-link :to="`/artigo/${article.id}`" class="read-more">Leia mais &rarr;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import mockData from '../data/mockData.json'

const activeCategory = ref('Todos')
const categories = ['Todos', ...new Set(mockData.articles.map(a => a.category))]

const filteredArticles = computed(() => {
  if (activeCategory.value === 'Todos') return mockData.articles
  return mockData.articles.filter(a => a.category === activeCategory.value)
})
</script>

<style scoped>
.section-padding {
  padding: 80px 0;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 40px;
  text-align: center;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.filter-btn {
  background: white;
  border: 1px solid var(--gray-light);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn.active {
  background: var(--accent-gold);
  color: white;
  border-color: var(--accent-gold);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
}

.article-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.03);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.08);
}

.card-img {
  height: 250px;
  background-size: cover;
  background-position: center;
}

.card-body {
  padding: 30px;
}

.category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--accent-coral);
  font-weight: 700;
  letter-spacing: 1px;
}

.card-body h3 {
  margin: 15px 0;
  font-size: 1.4rem;
  line-height: 1.3;
}

.card-body p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.read-more {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
