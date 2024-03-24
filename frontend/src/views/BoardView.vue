`
<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import BoardField from "@/components/BoardField.vue";
import {computed} from "vue";

const {game, send} = useGame()

const makeMove = (index: number) => {
  const newState = game.value!!.state!!
  newState[index] = game.value?.player?.symbol!!
  send(JSON.stringify({
    type: "MOVE",
    body: {
      sessionId: game.value!!.id,
      state: game.value!!.state!!.reduce((acc, e) => `${acc}${e}`),
      onTurn: game.value?.player?.symbol
    }
  }))
}

const message = computed<string>(() => {
  if (game.value?.winner == '0') return "It's a draw! Refresh site to play again!"
  if (game.value?.winner == game.value?.player?.symbol) return "You've won! Refresh site to play again!"
  if (game.value?.winner == game.value?.opponent?.symbol) return "You've lost! Refresh site to play again!"

  if (game.value?.isPlayerTurn) return "Your turn"
  return "Opponent turn"
})
</script>

<template>
  <h1>{{ game!!.player!!.nickname }} vs {{ game!!.opponent!!.nickname }}</h1>
  <h3>{{ message }}</h3>
  <div class="board">
    <BoardField
        v-for="(state, index) in game?.state"
        :key="index"
        :is-winning="false"
        :index="index"
        :state="state"
        :is-player-turn="game?.isPlayerTurn"
        @click="game?.isPlayerTurn && makeMove(index)"
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