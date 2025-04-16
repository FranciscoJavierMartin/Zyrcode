<template>
  <button
    class="relative flex h-8 max-w-8 items-center overflow-x-hidden px-2 py-3 transition-[max-width] duration-1500 hover:max-w-80"
  >
    <slot />
    <span class="ml-6 whitespace-nowrap">{{ text }}</span>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<style scoped>
@reference '@/assets/styles.css';

button {
  @apply bg-background text-foreground hover:bg-foreground hover:text-background;

  & > svg {
    @apply absolute top-1.5 left-1.5 size-5;
  }
}
</style>
