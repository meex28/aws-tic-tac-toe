import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

enum ROUTES {
  HOME = 'home',
  WAITING = 'waiting'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      component: HomeView
    },
    // {
    //   path: `/${ROUTES.WAITING}`,
    //   name: ROUTES.WAITING,
    //   component: WaitingView
    // }
  ]
})

export default router
