<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import BoardField from "@/components/BoardField.vue";

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
</script>

<template>
  <h1>{{ game!!.player!!.nickname }} vs {{ game!!.opponent!!.nickname }}</h1>
  <h3>{{ game!!.isPlayerTurn ? 'Your turn' : 'Opponent turn' }}</h3>
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
</style>