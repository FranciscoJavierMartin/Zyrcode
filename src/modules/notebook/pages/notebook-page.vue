<template>
  <div class="mt-13">
    <template v-if="!isServiceLoading">
      <!-- <CodeCell
        v-for="cell of cells"
        :key="cell.id"
        :id="cell.id"
        :code="cell.content"
        :language="cell.language"
      /> -->
      <h1>Notebook page</h1>
    </template>
    <template v-else>
      <div class="mx-auto flex max-w-6xl flex-col gap-10">
        <div v-for="i of [1, 2, 3]" :key="i">
          <div class="mio grid gap-5">
            <Skeleton class="h-[40px] rounded-xl" />
            <Skeleton class="h-[300px] rounded-xl" />
            <Skeleton class="h-[300px] rounded-xl" />
            <Skeleton class="h-[40px] rounded-xl" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CodeCell from '@/modules/cells/components/code-cell/code-cell.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import useBundler from '@/modules/notebook/composables/use-bundler';
import { storeToRefs } from 'pinia';
import Skeleton from '@/modules/common/components/ui/skeleton/Skeleton.vue';

const { isServiceLoading } = useBundler();
const { cells } = storeToRefs(useCellsStore());
</script>

<style>
.mio {
  display: grid;
  gap: 10px;
  grid-template-rows: 40px 300px 40px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'toolbar toolbar' 'code preview' 'console console';

  > div:nth-child(1) {
    grid-area: toolbar;
  }

  > div:nth-child(2) {
    grid-area: code;
  }

  > div:nth-child(3) {
    grid-area: preview;
  }

  > div:nth-child(4) {
    grid-area: console;
  }
}
</style>
