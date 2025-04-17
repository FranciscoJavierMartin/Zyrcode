<template>
  <div class="flex flex-col">
    <CellToolbar
      :direction
      :id
      :is-large-screen
      :language
      :are-outputs-available="outputs.length > 0"
      :is-code-available="code.length > 0"
      v-model:is-console-open="isConsoleOpen"
      @format="format"
      @toggle-direction="toggleDirection"
      @clear-outputs="clearOutputs"
    />
    <ResizablePanelGroup
      :direction="panelSplitDirection"
      class="min-h-[500px] w-full lg:min-h-[300px]"
    >
      <ResizablePanel :default-size="50">
        <CodeEditor
          :id
          :code
          :language
          ref="editor"
          @update:code="updateCode"
        />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="50">
        <CodePreview :id :code="transpiledCode" :error @output="addOutputs" />
      </ResizablePanel>
    </ResizablePanelGroup>
    <Transition name="appear">
      <ConsolePreview v-if="isConsoleOpen" v-model="outputs" />
    </Transition>
    <!-- <div class="flex w-full justify-center py-4">
      <Button @click="addCellBelow">{{ $t('notebook.addCell') }}</Button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import { transpile } from '@/modules/cells/helpers/bundler';
import CodePreview from '@/modules/cells/components/code-preview/code-preview.vue';
import ResizableHandle from '@/modules/common/components/ui/resizable/ResizableHandle.vue';
import ResizablePanel from '@/modules/common/components/ui/resizable/ResizablePanel.vue';
import ResizablePanelGroup from '@/modules/common/components/ui/resizable/ResizablePanelGroup.vue';
import Button from '@/modules/common/components/ui/button/Button.vue';
import { useMediaQuery, watchDebounced } from '@vueuse/core';
import type { Language } from '@/modules/cells/interfaces/code';
import { useCellsStore } from '@/modules/cells/store/cells';
import ConsolePreview from '@/modules/cells/components/console-preview/console-preview.vue';
import type { OutputPreviewData } from '@/modules/cells/interfaces/preview';
import CellToolbar from '@/modules/cells/components/cell-toolbar/cell-toolbar.vue';

const props = defineProps<{ id: string; code: string; language: Language }>();
const transpiledCode = ref<string>('');
const error = ref<string>('');
const isConsoleOpen = ref<boolean>(false);
const outputs = ref<OutputPreviewData[]>([]);
const editor = useTemplateRef('editor');
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const direction = ref<'horizontal' | 'vertical'>('horizontal');
const panelSplitDirection = computed<'horizontal' | 'vertical'>(() =>
  isLargeScreen.value ? direction.value : 'vertical',
);

const store = useCellsStore();

async function format(): Promise<void> {
  await editor.value?.formatCode();
}

function toggleDirection(): void {
  direction.value =
    direction.value === 'horizontal' ? 'vertical' : 'horizontal';
}

function updateCode(content: string): void {
  store.updateContent({ id: props.id, content });
}

function addOutputs(data: OutputPreviewData[]): void {
  outputs.value.push(...data);
}

function clearOutputs(): void {
  outputs.value = [];
}

watchDebounced(
  () => [props.code, props.language],
  async ([newCode, newLanguage]) => {
    const result = await transpile(newCode, newLanguage as Language);
    transpiledCode.value = result.code;
    error.value = result.error;
  },
  {
    debounce: 500,
    immediate: true,
    rejectOnCancel: true,
  },
);
</script>
