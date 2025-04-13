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
        <LanguageSelector :language @update:language="updateLanguage" />
      </div>
    </div>
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
        <CodePreview :code="transpiledCode" :error />
      </ResizablePanel>
    </ResizablePanelGroup>
    <div class="flex w-full justify-center py-4">
      <Button @click="addCellBelow">{{ $t('notebook.addCell') }}</Button>
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
import { useCellsStore } from '@/modules/cells/store/cells';

const props = defineProps<{ id: string; code: string; language: Language }>();
const transpiledCode = ref<string>('');
const error = ref<string>('');
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

function updateLanguage(language: Language): void {
  store.updateCell({ id: props.id, content: props.code, language });
}

function updateCode(content: string): void {
  store.updateCell({ id: props.id, content, language: props.language });
}

function addCellBelow(): void {
  store.addCellBelow(props.id);
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

<style scoped>
@reference '@/assets/styles.css';

.button-icon {
  @apply grid size-8 cursor-pointer place-content-center rounded shadow-sm;
}
</style>
