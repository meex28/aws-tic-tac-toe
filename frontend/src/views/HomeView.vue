<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import {usePlayer} from "@/composables/usePlayer";
import type {StartRequestMessage} from "@/model/message";
import CoreDialog from "@/components/core/CoreDialog.vue";
import CoreButton from "@/components/core/CoreButton.vue";
import CoreInput from "@/components/core/CoreInput.vue";

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
  <CoreDialog>
    <h1>Type your nickname</h1>
    <CoreInput v-model="nickname"/>
    <CoreButton @click="sendStartRequest">Play!</CoreButton>
  </CoreDialog>
</template>

<style lang="scss" scoped>
.container {
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
  }

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
  }
}
</style>
