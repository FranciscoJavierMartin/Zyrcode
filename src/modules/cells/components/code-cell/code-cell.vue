<template>
  <div :id class="flex flex-col">
    <CellToolbar
      :direction
      :id
      :is-large-screen
      :language
      :are-outputs-available="outputs.length > 0"
      :is-code-available="code.length > 0"
      v-model:is-console-open="isConsoleOpen"
      v-model:is-text-shown="isTextShown"
      @format="format"
      @toggle-direction="toggleDirection"
      @clear-outputs="clearOutputs"
      @run="runMarkdown"
    />
    <ResizablePanelGroup
      :direction="panelSplitDirection"
      class="editor-and-preview-zone"
      v-if="language !== 'markdown'"
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
    <MarkdownCell
      v-else
      :id
      :code
      :text="transpiledCode"
      v-model:is-text-shown="isTextShown"
      @update:code="updateCode"
    />
    <Transition name="appear">
      <ConsolePreview v-show="isConsoleOpen" v-model="outputs" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import { transpile } from '@/modules/cells/helpers/bundler';
import CodePreview from '@/modules/previews/components/code-preview/code-preview.vue';
import ResizableHandle from '@/modules/common/components/ui/resizable/ResizableHandle.vue';
import ResizablePanel from '@/modules/common/components/ui/resizable/ResizablePanel.vue';
import ResizablePanelGroup from '@/modules/common/components/ui/resizable/ResizablePanelGroup.vue';
import { useMediaQuery, watchDebounced } from '@vueuse/core';
import type { Language } from '@/modules/cells/interfaces/code';
import { useCellsStore } from '@/modules/cells/store/cells';
import ConsolePreview from '@/modules/previews/components/console-preview/console-preview.vue';
import type { OutputPreviewData } from '@/modules/previews/interfaces/preview';
import CellToolbar from '@/modules/cells/components/cell-toolbar/cell-toolbar.vue';
import { parseMarkdown } from '@/modules/cells/helpers/markdown';
import MarkdownCell from '@/modules/cells/components/markdown-cell/markdown-cell.vue';

const props = defineProps<{ id: string; code: string; language: Language }>();
const transpiledCode = ref<string>('');
const error = ref<string>('');
const isConsoleOpen = ref<boolean>(false);
const isTextShown = ref<boolean>(false);
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

async function runMarkdown(): Promise<void> {
  const result = await parseMarkdown(props.code);
  transpiledCode.value = result.code;
  error.value = result.error;
  isTextShown.value = true;
}

watchDebounced(
  () => [props.code, props.language],
  async ([newCode, newLanguage], oldValue) => {
    // Reset outputs when language changes
    if (newLanguage !== oldValue?.[1]) {
      outputs.value = [];
      isTextShown.value = false;
      isConsoleOpen.value = false;
    }

    // Transpile/parse code
    if (newLanguage === 'javascript' || newLanguage === 'typescript') {
      const result = await transpile(newCode, newLanguage as Language);
      outputs.value = [];
      transpiledCode.value = result.code;
      error.value = result.error;
    } else if (newLanguage === 'markdown') {
      const result = await parseMarkdown(newCode);
      transpiledCode.value = result.code;
      error.value = result.error;
    }
  },
  {
    debounce: 500,
    immediate: true,
    rejectOnCancel: true,
  },
);
</script>
