import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import OpportunitiesView from '../views/OpportunitiesView.vue'
import OpportunityDetailView from '../views/OpportunityDetailView.vue'
import PathsView from '../views/PathsView.vue'
import PathDetailView from '../views/PathDetailView.vue'
import { useAuth } from '../store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAdmin: true, hideHeader: true } 
    },
    { path: '/conteudo', name: 'content-list', component: ArticlesView },
    { path: '/conteudo/:id', name: 'content-detail', component: ArticleDetailView },
    { path: '/servicos', name: 'services-list', component: () => import('../views/ServicesView.vue') },
    { path: '/servicos/:id', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue') },
    { path: '/projetos', name: 'projects-list', component: () => import('../views/ProjectsView.vue') },
    { path: '/projetos/:id', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
    { path: '/doacao', name: 'donate', component: () => import('../views/DonateView.vue') },
    { path: '/biblioteca', name: 'library', component: () => import('../views/LibraryView.vue') },
    { path: '/trilhas', name: 'paths-list', component: PathsView },
    { path: '/trilhas/:id', name: 'track-detail', component: () => import('../views/TrackDetailView.vue') },
    { path: '/aula/:id', name: 'lesson', component: () => import('../views/LessonView.vue'), meta: { requiresAuth: true } },
    { path: '/area-do-aluno', name: 'user-dashboard', component: () => import('../views/UserDashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/arquivo-newsletter', name: 'newsletter-archive', component: () => import('../views/NewsletterArchiveView.vue') },
    { path: '/arquivo-newsletter/:id', name: 'newsletter-detail', component: () => import('../views/NewsletterDetailView.vue') },
    { path: '/checkout/:id', name: 'checkout', component: () => import('../views/CheckoutView.vue') },
    { path: '/contatos', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/sobre', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/privacidade', name: 'privacy', component: () => import('../views/PrivacyView.vue') },
    { path: '/oportunidades', name: 'opportunities', component: OpportunitiesView },
    { path: '/oportunidades/:id', name: 'opportunity-detail', component: OpportunityDetailView }
  ],
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  const { user, isAuthenticated } = useAuth()
  if (to.meta.requiresAdmin && (!isAuthenticated.value || user.value?.role !== 'admin')) next('/login')
  else if (to.meta.requiresAuth && !isAuthenticated.value) next('/login')
  else next()
})

export default router
