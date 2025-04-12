<template>
  <div class="flex flex-col">
    <div class="mb-2 flex px-2">
      <div class="flex flex-1 gap-2">
        <Button class="cursor-pointer rounded p-1 shadow-sm">
          <ArrowUp class="size-[1.2rem]" />
        </Button>
        <Button class="cursor-pointer rounded p-1 shadow-sm">
          <ArrowDown class="size-[1.2rem]" />
        </Button>
      </div>
      <div class="flex">
        <Button @click="format" class="cursor-pointer rounded p-1 shadow-sm">
          <PencilRuler class="size-[1.2rem]" />
        </Button>
      </div>
    </div>
    <ResizablePanelGroup direction="horizontal" class="min-h-[300px] w-full">
      <ResizablePanel :default-size="50">
        <CodeEditor v-model="code" language="typescript" ref="editor" />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="50">
        <CodePreview :code="transpiledCode" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import { debounce } from '@/modules/common/helpers/debounce';
import { transpile } from '@/modules/cells/helpers/bundler';
import CodePreview from '@/modules/cells/components/code-preview/code-preview.vue';
import ResizableHandle from '@/modules/common/components/ui/resizable/ResizableHandle.vue';
import ResizablePanel from '@/modules/common/components/ui/resizable/ResizablePanel.vue';
import ResizablePanelGroup from '@/modules/common/components/ui/resizable/ResizablePanelGroup.vue';
import { ArrowDown, ArrowUp, PencilRuler } from 'lucide-vue-next';
import { useMediaQuery } from '@vueuse/core';

const code = ref<string>(`const a = 12356;\nconsole.log(a);`);
const transpiledCode = ref<string>('');
const editor = useTemplateRef('editor');
const isLargeScreen = useMediaQuery('(min-width: 1024px)');

function format(): void {
  editor.value?.formatCode();
}

watch(
  () => code.value,
  debounce(async (newValue: string) => {
    transpiledCode.value = await transpile(newValue);
  }, 500),
  { immediate: true },
);
</script>
