<script setup lang="ts">
import {useGame} from "@/composables/useGame";
import CoreDialog from "@/components/core/CoreDialog.vue";
import Spinner from "@/components/core/Spinner.vue";

useGame()
</script>

<template>
  <CoreDialog>
    <div class="container">
      <h1>Waiting for opponent</h1>
      <Spinner/>
    </div>
  </CoreDialog>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  h1 {
    color: white;
  }
}
</style>