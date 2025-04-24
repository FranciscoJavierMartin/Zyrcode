<template>
  <div class="mt-13">
    <NotebookMenu v-if="!isServiceLoading" />
    <div v-if="!isServiceLoading" class="pt-9">
      <CodeCell
        v-for="cell of store.cells"
        :key="cell.id"
        :id="cell.id"
        :code="cell.content"
        :language="cell.language"
      />
      <div class="mt-4 flex w-full justify-center py-4">
        <Button @click="addCellBelow">
          {{ $t('notebook.addCell') }}
        </Button>
      </div>
    </div>
    <NotebookSkeleton v-else />
  </div>
</template>

<script setup lang="ts">
import CodeCell from '@/modules/cells/components/code-cell/code-cell.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import useBundler from '@/modules/notebook/composables/use-bundler';
import NotebookSkeleton from '@/modules/notebook/components/notebook-skeleton/notebook-skeleton.vue';
import Button from '@/modules/common/components/ui/button/Button.vue';
import NotebookMenu from '@/modules/notebook/components/notebook-menu/notebook-menu.vue';

const { isServiceLoading } = useBundler();
const store = useCellsStore();

function addCellBelow(): void {
  store.addCellAtBottom();
}
</script>
