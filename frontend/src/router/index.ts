import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WaitingView from "@/views/WaitingView.vue";
import BoardView from "@/views/BoardView.vue";

export enum ROUTES {
  HOME = 'home',
  WAITING = 'waiting',
  BOARD = 'board'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      component: HomeView
    },
    {
      path: `/${ROUTES.WAITING}`,
      name: ROUTES.WAITING,
      component: WaitingView
    },
    {
      path: `/${ROUTES.BOARD}`,
      name: ROUTES.BOARD,
      component: BoardView
    }
  ]
})

export default router
