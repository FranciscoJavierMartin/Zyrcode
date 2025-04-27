<template>
  <div class="min-h-[500px] w-full lg:min-h-[300px]">
    <CodeEditor
      v-if="!isTextShown"
      :id
      v-model:code="code"
      language="markdown"
      class="min-h-[500px] w-full lg:min-h-[300px]"
    />
    <MarkdownPreview v-else :text @dblclick="toggleEdit" />
  </div>
</template>

<script setup lang="ts">
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import MarkdownPreview from '@/modules/previews/components/markdown-preview/markdown-preview.vue';

defineProps<{ id: string; text: string }>();
const code = defineModel<string>('code', { required: true });
const isTextShown = defineModel<boolean>('isTextShown', { required: true });

function toggleEdit() {
  isTextShown.value = false;
}
</script>
