<template>
  <div class="flex flex-col">
    <div class="mb-2 flex px-3">
      <div class="flex flex-1 gap-2">
        <Button variant="hover" class="button-icon">
          <ArrowUp class="size-5" />
        </Button>
        <Button variant="hover" class="button-icon">
          <ArrowDown class="size-5" />
        </Button>
      </div>
      <div class="flex gap-2">
        <Button
          v-if="isLargeScreen"
          variant="hover"
          class="button-icon"
          @click="toggleDirection"
        >
          <Rows2 v-if="direction === 'horizontal'" />
          <Columns2 v-else />
        </Button>
        <Button variant="hover" class="button-icon" @click="format">
          <PencilRuler class="size-5" />
        </Button>
      </div>
    </div>
    <ResizablePanelGroup
      :direction="panelSplitDirection"
      class="min-h-[500px] w-full lg:min-h-[300px]"
    >
      <ResizablePanel :default-size="50">
        <CodeEditor v-model="code" language="typescript" ref="editor" />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="50">
        <CodePreview :code="transpiledCode" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
  <div class="flex w-full justify-center py-4">
    <Button>{{ $t('notebook.addCell') }}</Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import { debounce } from '@/modules/common/helpers/debounce';
import { transpile } from '@/modules/cells/helpers/bundler';
import CodePreview from '@/modules/cells/components/code-preview/code-preview.vue';
import ResizableHandle from '@/modules/common/components/ui/resizable/ResizableHandle.vue';
import ResizablePanel from '@/modules/common/components/ui/resizable/ResizablePanel.vue';
import ResizablePanelGroup from '@/modules/common/components/ui/resizable/ResizablePanelGroup.vue';
import Button from '@/modules/common/components/ui/button/Button.vue';
import {
  ArrowDown,
  ArrowUp,
  PencilRuler,
  Columns2,
  Rows2,
} from 'lucide-vue-next';
import { useMediaQuery } from '@vueuse/core';

const code = ref<string>(`const a = 12356;\nconsole.log(a);`);
const transpiledCode = ref<string>('');
const editor = useTemplateRef('editor');
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const direction = ref<'horizontal' | 'vertical'>('horizontal');
const panelSplitDirection = computed<'horizontal' | 'vertical'>(() =>
  isLargeScreen.value ? direction.value : 'vertical',
);

function format(): void {
  editor.value?.formatCode();
}

function toggleDirection(): void {
  direction.value =
    direction.value === 'horizontal' ? 'vertical' : 'horizontal';
}

watch(
  () => code.value,
  debounce(async (newValue: string) => {
    transpiledCode.value = await transpile(newValue);
  }, 500),
  { immediate: true },
);
</script>

<style scoped>
@reference '@/assets/styles.css';

.button-icon {
  @apply grid size-8 cursor-pointer place-content-center rounded shadow-sm;
}
</style>
