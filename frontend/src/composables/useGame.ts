import {useWebSocket} from "@vueuse/core";
import {ref, watch} from "vue";
import type {BaseMessage, GameStartedMessage, WaitingMessage} from "@/model/Messages";
import {MessageTypes} from "@/model/MessageTypes";
import {useRouter} from "vue-router";
import {ROUTES} from "@/router";
import type {Game} from "@/model/Game";
import {usePlayerData} from "@/composables/usePlayerData";

const {status, send, data} = useWebSocket('ws://localhost:3000')
const game = ref<Game>()

export const useGame = () => {
  const router = useRouter()
  // TODO: replace url
  const player = usePlayerData()

  watch(data, (messageString) => {
      const message = JSON.parse(messageString) as BaseMessage
      switch (message.type) {
        case MessageTypes.WAITING:
          game.value = {
            id: (message as WaitingMessage).body.sessionId
          }
          router.push({name: ROUTES.WAITING})
          break;
        case MessageTypes.GAME_STARTED:
          const body = (message as GameStartedMessage).body
          game.value = {
            id: body.sessionId,
            player: body.players.find(p => p.id === player.id.value),
            opponent: body.players.find(p => p.id !== player.id.value),
            state: Array(9).fill('0')
          }
          router.push({name: ROUTES.BOARD})
          break;
      }
    }
  );

  return {
    game,
    status,
    send,
    data
  }
}