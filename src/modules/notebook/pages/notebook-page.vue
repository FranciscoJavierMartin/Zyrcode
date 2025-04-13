<template>
  <div class="mt-13">
    <CodeCell v-for="cell of cells" :key="cell.id" />
  </div>
</template>

<script setup lang="ts">
import CodeCell from '@/modules/cells/components/code-cell/code-cell.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import useBundler from '@/modules/notebook/composables/use-bundler';
import { storeToRefs } from 'pinia';
useBundler();
const { cells } = storeToRefs(useCellsStore());
</script>
