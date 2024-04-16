<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import {usePlayer} from "@/composables/usePlayer";
import type {StartRequestMessage} from "@/model/message";

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
  <div class="container">
    <h1>Type your nickname</h1>
    <input v-model="nickname">
    <button @click="sendStartRequest">Play!</button>
  </div>
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
  }

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    font-size: 16px;
  }

  button {
    width: 30%;
    height: 40px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
}
</style>
