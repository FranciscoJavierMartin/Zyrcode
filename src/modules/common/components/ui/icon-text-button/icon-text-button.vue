<template>
  <button class="icon-text-button">
    <Terminal class="absolute top-1.5 left-1.5 size-5" />
    <span class="ml-6 whitespace-nowrap"> {{ text }} </span>
  </button>
</template>

<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';

defineProps<{ text: string }>();
</script>

<style>
@reference '@/assets/styles.css';

.icon-text-button {
  @apply bg-background text-foreground hover:bg-foreground hover:text-background relative flex h-8 max-w-8 items-center overflow-x-hidden rounded-md px-2 py-3 text-sm font-medium shadow-xs transition-[max-width] duration-500 hover:max-w-80 disabled:pointer-events-none disabled:opacity-50;
}
</style>
