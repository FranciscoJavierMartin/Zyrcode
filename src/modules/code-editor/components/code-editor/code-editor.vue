<template>
  <div ref="editor" class="code-editor" />
</template>

<script setup lang="ts">
import {
  onMounted,
  useTemplateRef,
  ref,
  onUnmounted,
  watch,
  onWatcherCleanup,
} from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import '@/modules/code-editor/utils/worker';
import { getSuggestion } from '@/modules/code-editor/helpers/get-suggestion';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
let editor: monaco.editor.IStandaloneCodeEditor;
const props = defineProps<{ language: string }>();
const code = defineModel({ required: true, type: String });
let inlineCompletionsProvider: monaco.IDisposable;

function registerInlineCompletionsProvider(
  language: string,
): monaco.IDisposable {
  return monaco.languages.registerInlineCompletionsProvider(language, {
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
}

watch(
  () => props.language,
  (newLanguage: string) => {
    inlineCompletionsProvider = registerInlineCompletionsProvider(newLanguage);
    onWatcherCleanup(() => {
      inlineCompletionsProvider.dispose();
    });
  },
  { immediate: true },
);

onMounted(() => {
  if (editorRef.value) {
    editor = monaco.editor.create(editorRef.value, {
      value: code.value,
      language: props.language,
      minimap: { enabled: false },
    });

    editor.onDidChangeModelContent(() => {
      code.value = editor.getValue();
    });
  }
});

onUnmounted(() => {
  if (editor) {
    editor.dispose();
  }
});
</script>

<style scoped>
.code-editor {
  height: 300px;
  width: 100%;
}
</style>
