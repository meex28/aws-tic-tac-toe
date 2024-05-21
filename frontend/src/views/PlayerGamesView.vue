<script setup lang="ts">
import {useFetchPlayerGamesResults} from "@/composables/api/useGameResultsApi";
import {computed} from "vue";

const {data: playerGames} = useFetchPlayerGamesResults();

const gamesCount = computed(() => playerGames.value?.length);
const gamesBalance = computed(() => ({
  wins: playerGames.value?.filter(gr => gr.result == "WIN").length,
  draws: playerGames.value?.filter(gr => gr.result == "DRAW").length,
  loose: playerGames.value?.filter(gr => gr.result == "LOOSE").length
}))
</script>

<template>
  <div class="container">
    <div>
      <h1>Your balance</h1>
      <p>Total: {{ gamesCount }}</p>
      <p>Win: {{ gamesBalance.wins }}</p>
      <p>Draw: {{ gamesBalance.draws }}</p>
      <p>Loose: {{ gamesBalance.loose }}</p>
    </div>
    <div>
      <h1>Your games</h1>
      <div v-for="game in playerGames" :key="game.id">
        <p>{{ game.hostNickname }} vs {{ game.guestNickname }}</p>
        <p>{{ game.result }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:first-child {
    margin-top: 20px;
  }

  & > div {
    background-color: #59585b;
    padding: 20px;
    border-radius: 20px;
    width: 500px;
    height: auto;
  }
}
</style>