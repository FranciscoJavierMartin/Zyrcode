<template>
  <div ref="editor" class="code-editor" />
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, ref, onUnmounted } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import '@/modules/code-editor/utils/worker';
import { getSuggestion } from '@/modules/code-editor/helpers/get-suggestion';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
const editor = ref<monaco.editor.IStandaloneCodeEditor>();
const props = defineProps<{ language: string }>();
const code = defineModel({ required: true, type: String });
const inlineCompletionProvider = ref<monaco.IDisposable>();

inlineCompletionProvider.value =
  monaco.languages.registerInlineCompletionsProvider(props.language, {
    freeInlineCompletions: () => {},
    provideInlineCompletions: async (
      model: monaco.editor.ITextModel,
      position: monaco.Position,
    ) => {
      const currentLine = model.getLineContent(position.lineNumber);
      const offset = model.getOffsetAt(position);
      const textBeforeCursor = model
        .getValue()
        .substring(0, offset - currentLine.length);
      const textBeforeCursorOnCurrentLine = currentLine.substring(
        0,
        position.column - 1,
      );

      const suggestion = await getSuggestion(
        textBeforeCursor,
        textBeforeCursorOnCurrentLine,
        props.language,
      );

      const startLineNumber = position.lineNumber;
      const startColumn = position.column;
      const endLineNumber = position.lineNumber;
      const endColumn = position.column + suggestion.length;

      return {
        items: [
          {
            insertText: suggestion,
            range: new monaco.Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn,
            ),
          },
        ],
      };
    },
  });

onMounted(() => {
  if (editorRef.value) {
    editor.value = monaco.editor.create(editorRef.value, {
      value: code.value,
      language: props.language,
      minimap: { enabled: false },
    });
  }
});

onUnmounted(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
</script>

<style scoped>
.code-editor {
  height: 300px;
  width: 100%;
}
</style>
