import {ref, watchEffect} from "vue";
import type {GameOverMessage, GameStartedMessage, MoveMessage, WaitingMessage} from "@/model/message";
import {useRouter} from "vue-router";
import {ROUTES} from "@/router";
import type {GameSession} from "@/model/game";
import {usePlayer} from "@/composables/usePlayer";
import {useGameWebSocket} from "@/composables/useGameWebSocket";
import {mapGameOver, mapGameStarted, mapMove, mapWaiting} from "@/utils/messageMapping";

const gameSession = ref<GameSession>()

export const useGame = () => {
  const router = useRouter()
  const player = usePlayer()
  const {sendGameMessage, receivedMessage} = useGameWebSocket()

  watchEffect(() => {
    switch (receivedMessage.value?.type) {
      case "WAITING":
        gameSession.value = mapWaiting(receivedMessage.value as WaitingMessage);
        router.push({name: ROUTES.WAITING})
        break;
      case "GAME_STARTED":
        gameSession.value = mapGameStarted(receivedMessage.value as GameStartedMessage, player.id.value);
        router.push({name: ROUTES.BOARD});
        break;
      case "MOVE":
        gameSession.value = mapMove(receivedMessage.value as MoveMessage, gameSession.value!!);
        break;
      case "GAME_OVER":
        gameSession.value = mapGameOver(receivedMessage.value as GameOverMessage, gameSession.value!!);
        break;
    }
  })

  return {
    gameSession,
    sendGameMessage
  }
}