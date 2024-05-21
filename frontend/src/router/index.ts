import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WaitingView from "@/views/WaitingView.vue";
import BoardView from "@/views/BoardView.vue";
import CallbackView from "@/views/CallbackView.vue";
import PlayerGamesView from "@/views/PlayerGamesView.vue";

export enum ROUTES {
  HOME = 'home',
  WAITING = 'waiting',
  BOARD = 'board',
  CALLBACK = 'callback',
  PLAYER_GAMES = 'games'
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
    },
    {
      path: `/${ROUTES.CALLBACK}`,
      name: ROUTES.CALLBACK,
      component: CallbackView
    },
    {
      path: `/${ROUTES.PLAYER_GAMES}`,
      name: ROUTES.PLAYER_GAMES,
      component: PlayerGamesView
    },
  ]
})

export default router
