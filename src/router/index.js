import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../store/auth'
import { trackPageView } from '../store/content'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAdmin: true, hideHeader: true } 
    },
    { path: '/conteudo', name: 'content-list', component: () => import('../views/ArticlesView.vue') },
    { path: '/conteudo/:id', name: 'content-detail', component: () => import('../views/ArticleDetailView.vue') },
    { path: '/servicos', name: 'services-list', component: () => import('../views/ServicesView.vue') },
    { path: '/servicos/:id', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue') },
    { path: '/projetos', name: 'projects-list', component: () => import('../views/ProjectsView.vue') },
    { path: '/projetos/:id', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
    { path: '/doacao', name: 'donate', component: () => import('../views/DonateView.vue') },
    { path: '/biblioteca', name: 'library', component: () => import('../views/LibraryView.vue') },
    { path: '/trilhas', name: 'paths-list', component: () => import('../views/PathsView.vue') },
    { path: '/trilhas/:id', name: 'track-detail', component: () => import('../views/TrackDetailView.vue') },
    { path: '/aula/:id', name: 'lesson', component: () => import('../views/LessonView.vue'), meta: { requiresAuth: true } },
    { path: '/area-do-aluno', name: 'user-dashboard', component: () => import('../views/UserDashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/arquivo-newsletter', name: 'newsletter-archive', component: () => import('../views/NewsletterArchiveView.vue') },
    { path: '/arquivo-newsletter/:id', name: 'newsletter-detail', component: () => import('../views/NewsletterDetailView.vue') },
    { path: '/checkout/:id', name: 'checkout', component: () => import('../views/CheckoutView.vue') },
    { path: '/contatos', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/sobre', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/privacidade', name: 'privacy', component: () => import('../views/PrivacyView.vue') },
    { path: '/oportunidades', name: 'opportunities', component: () => import('../views/OpportunitiesView.vue') },
    { path: '/oportunidades/:id', name: 'opportunity-detail', component: () => import('../views/OpportunityDetailView.vue') },
    { path: '/agenda', name: 'agenda', component: () => import('../views/AgendaView.vue') }
  ],
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  const { user, isAuthenticated } = useAuth()
  if (to.meta.requiresAdmin && (!isAuthenticated.value || user.value?.role !== 'admin')) next('/login')
  else if (to.meta.requiresAuth && !isAuthenticated.value) next('/login')
  else next()
})

router.afterEach((to) => {
  if (!to.path.startsWith('/admin') && !to.path.startsWith('/login')) {
    trackPageView(to.path)
  }
})

export default router
