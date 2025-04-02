<template>
  <div>
    <div class="editor" ref="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, onUnmounted } from 'vue';
import * as monaco from 'monaco-editor';
import type { MonacoCodeEditor } from '@/modules/code-editor/interfaces/code-editor';
import '@/modules/code-editor/utils/worker';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
let editor: MonacoCodeEditor | null = null;

const props = defineProps<{ language: string }>();

const code = defineModel({ required: true, type: String });

function handleCodeEditorMounted(editor: MonacoCodeEditor): void {
  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue();
  });
}

onMounted(() => {
  if (editorRef.value) {
    const model = monaco.editor.createModel(code.value, props.language);

    editor = monaco.editor.create(editorRef.value, {
      model,
      value: code.value,
      language: props.language,
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
