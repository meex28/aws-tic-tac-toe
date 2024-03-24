<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  index: number;
  state: string;
  isWinning: boolean;
  isPlayerTurn: boolean;
}>()

const classes = computed<string>(() => {
  const fieldClasses = []
  if (props.index < 6) fieldClasses.push('border-bottom')
  if (props.index > 2) fieldClasses.push('border-top')
  if (props.index % 3 != 2) fieldClasses.push('border-right')
  if (props.index % 3 != 0) fieldClasses.push('border-left')

  return fieldClasses.reduce((acc, e) => `${acc} ${e}`) + ` field ${props.state == '0' && props.isPlayerTurn && 'active-field'}`
})

const image = computed<string>(() => {
  return props.state == '1' ? '/x-symbol.svg' : '/o-symbol.svg'
})
</script>

<template>
  <div :class="classes">
    <img v-if="state != '0'" :src="image" alt="player symbol" class="symbol"/>
  </div>
</template>

<style lang="scss" scoped>
$border-width: 7px;

.field {
  width: 250px;
  height: 250px;
  border-style: solid;
  border-color: #232121;
  border-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.active-field:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.border-top {
  border-top-width: $border-width;
}

.border-bottom {
  border-bottom-width: $border-width;
}

.border-right {
  border-right-width: $border-width;
}

.border-left {
  border-left-width: $border-width;
}

.symbol {
  width: 80%;
  height: 80%;
}
</style>