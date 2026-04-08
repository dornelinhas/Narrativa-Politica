import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artigos',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue')
    },
    {
      path: '/artigo/:id',
      name: 'article-detail',
      component: () => import('../views/ArticleDetailView.vue')
    },
    {
      path: '/oportunidades',
      name: 'opportunities',
      component: () => import('../views/OpportunitiesView.vue')
    },
    {
      path: '/trilhas',
      name: 'paths',
      component: () => import('../views/PathsView.vue')
    },
    {
      path: '/projetos',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/mentoria',
      name: 'mentoring',
      component: () => import('../views/MentoringView.vue')
    },
    {
      path: '/sobre',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
