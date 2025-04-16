<template>
  <button
    class="bg-foreground text-background relative flex h-8 max-w-8 items-center overflow-x-hidden px-2 py-3 transition-[max-width] duration-500 hover:max-w-80 [&>:first-child]:text-red-500"
  >
    <Terminal class="absolute top-1.5 left-1.5 size-5" />
    <span class="ml-6 whitespace-nowrap"> Hakuna Matata </span>
  </button>
</template>

<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';
</script>
