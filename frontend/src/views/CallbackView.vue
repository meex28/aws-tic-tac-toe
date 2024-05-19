<script setup lang="ts">
import {onMounted} from "vue";
import {useCognitoAuth} from "@/composables/useCognitoAuth";

const {onCallback} = useCognitoAuth();

onMounted(() => {
  onCallback();
});
</script>

<template>
  <div>
    <h1>Callback</h1>
  </div>
</template>

<style scoped>

</style>