<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
  <main class="container">
    <RouterView/>
  </main>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #666468;
}
</style>
