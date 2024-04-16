`
<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import BoardField from "@/components/BoardField.vue";
import {computed} from "vue";
import type {MoveMessage} from "@/model/message";

const {gameSession, sendGameMessage} = useGame()

const makeMove = (index: number) => {
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
  if (gameSession.value?.winner == '0') return "It's a draw! Refresh site to play again!"
  if (gameSession.value?.winner == gameSession.value?.player?.symbol) return "You've won! Refresh site to play again!"
  if (gameSession.value?.winner == gameSession.value?.opponent?.symbol) return "You've lost! Refresh site to play again!"

  if (gameSession.value?.isPlayerOnMove) return "Your turn"
  return "Opponent turn"
})
</script>

<template>
  <h1>{{ gameSession!!.player!!.nickname }} vs {{ gameSession!!.opponent!!.nickname }}</h1>
  <h3>{{ message }}</h3>
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
</template>

<style scoped>
.board {
  width: fit-content;
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(3, 0.33fr);
  grid-template-rows: repeat(3, 0.33fr);
  margin: auto;
}
</style>`