<script setup lang="ts">

</script>

<template>
  <button class="button">
    <slot/>
  </button>
</template>

<style scoped>
.button {
  width: auto;
  height: 40px;
  padding: 0 40px;
  background-color: #7f07d0;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #7404be;
}
</style>