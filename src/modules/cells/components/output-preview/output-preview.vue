<template>
  <ul
    class="bg-ring h-auto max-h-[300px] overflow-auto p-2"
    style="interpolate-size: allow-keywords"
  >
    <li
      v-for="output of outputs"
      :key="output.id"
      class="border-muted-foreground my-2 border-b pb-1 text-xs"
    >
      {{ output.data }}
    </li>
  </ul>
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
