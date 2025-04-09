<template>
  <div ref="editor" class="code-editor" />
</template>

<script setup lang="ts">
import {
  onMounted,
  useTemplateRef,
  watch,
  onWatcherCleanup,
  onBeforeUnmount,
  ref,
} from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { getSuggestion } from '@/modules/code-editor/helpers/get-suggestion';
import { CompletionFormatter } from '@/modules/code-editor/helpers/completion-formatter';
import '@/modules/code-editor/utils/worker';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
const props = defineProps<{ language: string }>();
const code = defineModel({ required: true, type: String });
let editor: monaco.editor.IStandaloneCodeEditor | undefined;
let inlineCompletionsProvider: monaco.IDisposable | undefined;

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
        language,
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
        ].map((suggestion) =>
          new CompletionFormatter(model, position).format(
            suggestion.insertText,
            suggestion.range,
          ),
        ),
      };
    },
  });
}

watch(
  () => props.language,
  (newLanguage: string) => {
    inlineCompletionsProvider = registerInlineCompletionsProvider(newLanguage);
    onWatcherCleanup(() => {
      inlineCompletionsProvider?.dispose();
    });
  },
  { immediate: true },
);

onMounted(() => {
  if (editorRef.value) {
    const model = monaco.editor.createModel(code.value, props.language);

    editor = monaco.editor.create(editorRef.value, {
      value: code.value,
      model,

      language: props.language,
      minimap: { enabled: false },
    });

    editor.onDidChangeModelContent(() => {
      code.value = editor?.getModel()?.getValue() ?? '';
    });
  }
});

onBeforeUnmount(() => {
  inlineCompletionsProvider?.dispose();
  editor?.dispose();
});
</script>

<style scoped>
.code-editor {
  height: 300px;
  width: 100%;
}
</style>
