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
          class="button-icon group"
          @click="toggleDirection"
        >
          <SplitIcon :is-horizontal="direction === 'horizontal'" />
        </Button>
        <Button variant="hover" class="button-icon" @click="format">
          <PencilRuler class="size-5" />
        </Button>
        <LanguageSelector v-model="language" />
      </div>
    </div>
    <ResizablePanelGroup
      :direction="panelSplitDirection"
      class="min-h-[500px] w-full lg:min-h-[300px]"
    >
      <ResizablePanel :default-size="50">
        <CodeEditor v-model="code" :language ref="editor" />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="50">
        <CodePreview :code="transpiledCode" :error />
      </ResizablePanel>
    </ResizablePanelGroup>
    <div class="flex w-full justify-center py-4">
      <Button>{{ $t('notebook.addCell') }}</Button>
    </div>
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
import { ArrowDown, ArrowUp, PencilRuler } from 'lucide-vue-next';
import { useMediaQuery, watchDebounced } from '@vueuse/core';
import LanguageSelector from '@/modules/cells/components/language-selector/language-selector.vue';
import type { Language } from '@/modules/cells/interfaces/code';
import SplitIcon from '@/modules/common/components/icons/split-icon.vue';

const code = ref<string>(`import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const a = 12356;
console.log(a);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>Hello world!</h1>
  </StrictMode>
);`);
const language = ref<Language>('typescript');
const transpiledCode = ref<string>('');
const error = ref<string>('');
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

watchDebounced(
  () => [code.value, language.value],
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

<style scoped>
@reference '@/assets/styles.css';

.button-icon {
  @apply grid size-8 cursor-pointer place-content-center rounded shadow-sm;
}
</style>
