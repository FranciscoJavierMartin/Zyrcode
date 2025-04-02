<template>
  <div>
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, ref, onUnmounted } from 'vue';
import * as monaco from 'monaco-editor';
import type { MonacoCodeEditor } from '@/modules/code-editor/interfaces/code-editor';
import '@/modules/code-editor/utils/worker';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
let editor: MonacoCodeEditor | null = null;
const code = ref<string>('');

function handleCodeEditorMounted(editor: MonacoCodeEditor): void {
  console.log('Code Editor mounted:', editor);
}

onMounted(() => {
  if (editorRef.value) {
    const model = monaco.editor.createModel(code.value, 'javascript');

    editor = monaco.editor.create(editorRef.value, {
      model,
      value: code.value,
      language: 'javascript',
      minimap: { enabled: false },
    });

    handleCodeEditorMounted(editor);
  }
});

onUnmounted(() => {
  if (editor) {
    editor.dispose();
  }
});
</script>

<style scoped>
.editor {
  width: 200px;
  height: 200px;
}
</style>
