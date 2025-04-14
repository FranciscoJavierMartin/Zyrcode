<template>
  <div>
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
