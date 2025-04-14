<template>
  <div>
    <ul>
      <!-- <li v-for="output of outputs" :key=""></li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { OutputPreviewData } from '@/modules/cells/interfaces/preview';

const props = defineProps<{ outputs: OutputPreviewData[] }>();
</script>
