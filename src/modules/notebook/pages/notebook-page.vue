<template>
  <div class="mt-13">
    <template v-if="!isServiceLoading">
      <CodeCell
        v-for="cell of cells"
        :key="cell.id"
        :id="cell.id"
        :code="cell.content"
        :language="cell.language"
      />
    </template>
    <NotebookSkeleton v-else />
  </div>
</template>

<script setup lang="ts">
import CodeCell from '@/modules/cells/components/code-cell/code-cell.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import useBundler from '@/modules/notebook/composables/use-bundler';
import { storeToRefs } from 'pinia';
import NotebookSkeleton from '@/modules/notebook/components/notebook-skeleton/notebook-skeleton.vue';

const { isServiceLoading } = useBundler();
const { cells } = storeToRefs(useCellsStore());
</script>
