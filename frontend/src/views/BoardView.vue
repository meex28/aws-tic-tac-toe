<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import BoardField from "@/components/BoardField.vue";

const {game} = useGame()

const testState: string[] = ['0', '1', '2', '1', '2', '0', '0', '0', '0']
</script>

<template>
  <div class="board">
    <BoardField
        v-for="(state, index) in testState"
        :key="index"
        :is-winning="false"
        :index="index"
        :state="state"
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