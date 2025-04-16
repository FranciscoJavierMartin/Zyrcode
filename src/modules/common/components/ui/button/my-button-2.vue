<template>
  <button
    class="bg-foreground text-background relative flex h-8 items-center overflow-x-hidden"
  >
    <Terminal class="absolute top-1.5 left-1.5 size-5" />
    <span class="ml-6 whitespace-nowrap"> Hakuna Matata </span>
  </button>
</template>

<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';
</script>

<style scoped>
button {
  padding: 12px 8px;
  max-width: 32px;
  transition: max-width 1s;

  &:hover {
    max-width: 300px;
  }
}
</style>
