<template>
  <ol
    class="bg-ring h-auto max-h-[300px] overflow-auto p-2 empty:p-0"
    style="interpolate-size: allow-keywords"
  >
    <li
      v-for="output of outputs"
      :key="output.id"
      class="border-muted-foreground my-2 border-b pb-1 pl-1 text-xs first-of-type:mt-0 last-of-type:mb-0 last-of-type:border-none last-of-type:pb-0"
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
.appear-enter-active,
.appear-leave-active {
  transition: height 0.5s;
}

.appear-enter-from,
.appear-leave-to {
  height: 0;
}
</style>
