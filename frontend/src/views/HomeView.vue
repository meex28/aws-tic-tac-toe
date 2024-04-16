<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import {usePlayer} from "@/composables/usePlayer";
import type {StartRequestMessage} from "@/model/message";
import CoreDialog from "@/components/core/CoreDialog.vue";
import CoreButton from "@/components/core/CoreButton.vue";

const {nickname, id} = usePlayer()
const {sendGameMessage} = useGame()

const sendStartRequest = () => sendGameMessage({
  type: "START_REQUEST",
  body: {
    nickname: nickname.value,
    playerId: id.value
  }
} as StartRequestMessage)
</script>

<template>
  <CoreDialog class="container">
    <h1>Type your nickname</h1>
    <input v-model="nickname"/>
    <CoreButton @click="sendStartRequest">Play!</CoreButton>
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
}
</style>
