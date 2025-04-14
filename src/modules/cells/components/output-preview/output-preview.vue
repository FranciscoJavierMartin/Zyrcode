<template>
  <Transition name="appear">
    <div class="output-preview">
      <ul>
        <li v-for="output of outputs" :key="output.id">
          {{ output.data }}
        </li>
      </ul>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { OutputPreviewData } from '@/modules/cells/interfaces/preview';

const outputs = defineModel<OutputPreviewData[]>();
</script>

<style scoped>
.output-preview {
  overflow-y: scroll;
  max-height: 300px;
  interpolate-size: allow-keywords;
  height: auto;
}

.appear-enter-active,
.appear-leave-active {
  transition: height 5.5s;
}

.appear-enter-from,
.appear-leave-to {
  height: 0;
}
</style>
