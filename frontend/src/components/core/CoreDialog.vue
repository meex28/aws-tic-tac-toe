<script setup lang="ts">

</script>

<template>
  <div class="dialog">
    <slot/>
  </div>
</template>

<style scoped>
.dialog {
  padding: 30px;
  width: 500px;
  height: auto;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: auto auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  background-color: #59585b;
}
</style>