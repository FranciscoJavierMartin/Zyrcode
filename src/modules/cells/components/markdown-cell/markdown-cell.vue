<template>
  <div class="editor-and-preview-zone">
    <CodeEditor
      v-if="!isTextShown"
      :id
      v-model:code="code"
      language="markdown"
      class="editor-and-preview-zone"
    />
    <MarkdownPreview
      v-else
      :text
      @dblclick="toggleEdit"
      class="editor-and-preview-zone"
    />
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
