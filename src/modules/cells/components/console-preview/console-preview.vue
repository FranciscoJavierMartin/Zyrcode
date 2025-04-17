<template>
  <ol
    class="h-auto max-h-[300px] space-y-2 overflow-auto border border-red-500"
    style="interpolate-size: allow-keywords"
  >
    <li
      v-for="output of outputs"
      :key="output.id"
      class="log-item"
      :class="{
        log: output.logLevel === 'log',
        error: output.logLevel === 'error',
        warn: output.logLevel === 'warn',
        info: output.logLevel === 'info',
        debug: output.logLevel === 'debug',
      }"
    >
      {{ output.data }}
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { OutputPreviewData } from '@/modules/cells/interfaces/preview';

const outputs = defineModel<OutputPreviewData[]>();
</script>

<style scoped>
@reference '@/assets/styles.css';

.appear-enter-active,
.appear-leave-active {
  transition: height 0.5s;
}

.appear-enter-from,
.appear-leave-to {
  height: 0;
}

.log-item {
  @apply border-b pb-1 pl-2 text-xs first-of-type:pt-2 last-of-type:border-none last-of-type:pb-2;
}

.log {
  @apply bg-background;
}
</style>
