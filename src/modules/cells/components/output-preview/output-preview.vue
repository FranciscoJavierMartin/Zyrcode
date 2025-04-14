<template>
  <div
    class="h-auto max-h-[300px] overflow-auto"
    style="interpolate-size: allow-keywords"
  >
    <ul>
      <li v-for="output of outputs" :key="output.id">
        {{ output.data }}
      </li>
    </ul>
  </div>
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
