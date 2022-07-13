import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      beforeEnter: (to, from) => {
        const authStore = useAuthStore()
        var token = authStore.token
        console.log(token == null )
        if (token != '') {
          return true
        } else {
          return '/login';
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from) => {

        const authStore = useAuthStore()
        // authStore.$reset()
        var token = authStore.token
        if (token != '') {
          return '/dashboard'
        } else {
          return true;
        }
      },
    }
  ]
})

export default router
