`
<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import BoardField from "@/components/BoardField.vue";
import {computed} from "vue";
import type {MoveMessage} from "@/model/message";
import CoreButton from "@/components/core/CoreButton.vue";
import {useRouter} from "vue-router";
import {ROUTES} from "@/router";

const {gameSession, sendGameMessage} = useGame()
const router = useRouter()

const makeMove = (index: number) => {
  if (gameSession.value!!.board!![index] != '0') return;

  const newState = gameSession.value!!.board!!
  newState[index] = gameSession.value?.player?.symbol!!
  sendGameMessage({
    type: "MOVE",
    body: {
      sessionId: gameSession.value!!.id,
      board: gameSession.value!!.board!!.map(e => e as string).reduce((acc, e) => `${acc}${e}`), // TODO: to utils
      onMove: gameSession.value!!.player!!.symbol
    }
  } as MoveMessage)
}

const message = computed<string>(() => {
  if (gameSession.value?.winner == '0') return "It's a draw!"
  if (gameSession.value?.winner == gameSession.value?.player?.symbol) return "Congrats! You've won!"
  if (gameSession.value?.winner == gameSession.value?.opponent?.symbol) return "Unfortunately, you've lost!"

  if (gameSession.value?.isPlayerOnMove) return "Your turn"
  return "Opponent turn"
})

const redirectToHome = () => {
  router.push({name: ROUTES.HOME});
}
</script>

<template>
  <div class="container">
    <div class="info">
      <h1>{{ gameSession!!.player!!.nickname }} vs {{ gameSession!!.opponent!!.nickname }}</h1>
      <div class="message">
        <h3>{{ message }}</h3>
        <CoreButton v-if="gameSession?.winner" @click="redirectToHome">Play again</CoreButton>
      </div>
    </div>
    <div class="board">
      <BoardField
          v-for="(state, index) in gameSession?.board"
          :key="index"
          :is-winning="false"
          :index="index"
          :state="state"
          :is-player-turn="gameSession?.isPlayerOnMove ?? false"
          @click="gameSession?.isPlayerOnMove && makeMove(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}

.info {
  font-size: 24px;

  & > h1 {
    margin-bottom: 0;
  }
}

.message {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.board {
  width: fit-content;
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(3, 0.33fr);
  grid-template-rows: repeat(3, 0.33fr);
}
</style>`