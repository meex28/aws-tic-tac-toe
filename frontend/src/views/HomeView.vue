<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import {usePlayer} from "@/composables/usePlayer";
import type {StartRequestMessage} from "@/model/message";
import CoreDialog from "@/components/core/CoreDialog.vue";
import CoreButton from "@/components/core/CoreButton.vue";
import {useCognitoAuth} from "@/composables/useCognitoAuth";
import {computed} from "vue";
import {ROUTES} from "@/router";
import {useRouter} from "vue-router";

const {signIn, signOut} = useCognitoAuth()
const {nickname, id, isAuthorized} = usePlayer()
const {sendGameMessage} = useGame()
const router = useRouter();

const sendStartRequest = () => sendGameMessage({
  type: "START_REQUEST",
  body: {
    nickname: nickname.value,
    playerId: id.value
  }
} as StartRequestMessage)

const navigateToGamesResults = () => router.push(ROUTES.PLAYER_GAMES)

const title = computed(() => isAuthorized.value
    ? `Hi ${nickname.value}!`
    : "Sign in to play a game"
)
</script>

<template>
  <CoreDialog class="container">
    <h1>{{ title }}</h1>
    <template v-if="isAuthorized">
      <CoreButton @click="sendStartRequest">Play!</CoreButton>
      <CoreButton @click="navigateToGamesResults">Previous games</CoreButton>
      <CoreButton @click="signOut">Sign out</CoreButton>
    </template>
    <template v-else>
      <CoreButton @click="signIn">Sign in</CoreButton>
    </template>
  </CoreDialog>
</template>

<style lang="scss" scoped>
.container {
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
  }

  input {
    padding: 0 10px;
    font-size: 16px;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
  }

  button:last-child {
    margin-top: 10px;
  }
}
</style>
