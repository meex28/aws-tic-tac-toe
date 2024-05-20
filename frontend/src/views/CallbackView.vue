<script setup lang="ts">
import {onMounted} from "vue";
import {useCognitoAuth} from "@/composables/useCognitoAuth";
import Spinner from "@/components/core/Spinner.vue";
import CoreDialog from "@/components/core/CoreDialog.vue";

const {onCallback} = useCognitoAuth();

onMounted(() => {
  onCallback();
});
</script>

<template>
  <CoreDialog>
    <div class="container">
      <h1>Authorizing</h1>
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