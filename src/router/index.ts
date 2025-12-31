import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/devocionais',
      name: 'devocionais',
      component: () => import('../views/DevocionaisView.vue'),
    },
    {
      path: '/estudos',
      name: 'estudos',
      component: () => import('../views/EstudosView.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
