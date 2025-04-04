<template>
  <div>
    <CodeCell />
  </div>
</template>

<script setup lang="ts">
import CodeCell from '@/modules/cells/components/code-cell/code-cell.vue';
import useBundler from '@/modules/notebook/composables/use-bundler';
useBundler();
</script>
