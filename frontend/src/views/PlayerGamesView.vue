<script setup lang="ts">
import {useFetchPlayerGamesResults} from "@/composables/api/useGameResultsApi";
import {computed} from "vue";
import CoreButton from "@/components/core/CoreButton.vue";
import {ROUTES} from "@/router";
import {useRouter} from "vue-router";

const {data: playerGames} = useFetchPlayerGamesResults();
const router = useRouter();

const gamesCount = computed(() => playerGames.value?.length);
const gamesBalance = computed(() => ({
  wins: playerGames.value?.filter(gr => gr.result == "WIN").length,
  draws: playerGames.value?.filter(gr => gr.result == "DRAW").length,
  loose: playerGames.value?.filter(gr => gr.result == "LOOSE").length
}))

const onReturnClick = () => {
  console.log("e")
  router.push({name: ROUTES.HOME});
}
</script>

<template>
  <div class="container">
    <CoreButton @click="onReturnClick()" class="return-button">Return</CoreButton>
    <div>
      <h1>Your balance</h1>
      <h3>Total: {{ gamesCount }}</h3>
      <h3>Win: {{ gamesBalance.wins }}</h3>
      <h3>Draw: {{ gamesBalance.draws }}</h3>
      <h3>Loose: {{ gamesBalance.loose }}</h3>
    </div>
    <div>
      <h1>Your games</h1>
      <div v-for="game in playerGames" :key="game.id" v-if="playerGames?.length">
        <h3>{{ game.hostNickname }} vs {{ game.guestNickname }} ({{ game.result }})</h3>
      </div>
      <h3 v-else>You haven't played any games yet :(</h3>
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

.return-button {
  margin-right: auto;
  margin-left: 20px;
}
</style>