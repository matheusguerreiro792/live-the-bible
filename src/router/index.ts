import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/devocionais',
      name: 'devocionais',
      component: () => import('../views/DevotionalsView.vue'),
    },
    {
      path: '/estudos',
      name: 'estudos',
      component: () => import('../views/StudiesView.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    console.log('Rota protegida, redirecionando para login.')
    next('/login')
  } else if (!requiresAuth && currentUser && to.path === '/login') {
    console.log('Usuário já logado, redirecionando para admin.')
    next('/admin')
  } else {
    next()
  }
})

export default router
