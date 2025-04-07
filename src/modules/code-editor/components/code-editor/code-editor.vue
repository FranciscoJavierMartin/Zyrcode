<template>
  <div>
    <button @click="debouncedSuggestions">Call ollama</button>
    <div class="editor" ref="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, onUnmounted, ref, watch } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useCompletion } from '@ai-sdk/vue';
import type { MonacoCodeEditor } from '@/modules/code-editor/interfaces/code-editor';
import '@/modules/code-editor/utils/worker';
import { generateInstructions } from '@/modules/code-editor/helpers/prompts';
import { completeWithOllama } from '@/modules/home/pages/ai';
import { CompletionFormatter } from '@/modules/code-editor/helpers/completion-formatter';

let editor: MonacoCodeEditor | null = null;
const cacheSize = 10; // Adjust as needed
const refreshInterval = 500;
const fetchSuggestionsInterval = ref<NodeJS.Timeout | undefined>();
const timeout = ref<NodeJS.Timeout | undefined>();

const cachedSuggestions = ref<monaco.languages.InlineCompletion[]>([]);
const editorRef = useTemplateRef<HTMLDivElement>('editor');
const props = defineProps<{ language: string }>();
const code = defineModel({ required: true, type: String });
const { complete, completion } = useCompletion({
  fetch: completeWithOllama,
});

function handleCodeEditorMounted(editor: MonacoCodeEditor): void {
  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue();
  });
}

async function debouncedSuggestions(): Promise<void> {
  if (editor) {
    const model = editor?.getModel();

    if (model && model?.getValue()) {
      const position = editor.getPosition()!;
      const currentLine = model.getLineContent(position.lineNumber);
      const offset = model.getOffsetAt(position);
      const textBeforeCursor = model
        .getValue()
        .substring(0, offset - currentLine.length);
      const textBeforeCursorOnCurrentLine = currentLine.substring(
        0,
        position.column - 1,
      );

      console.log({
        position,
        currentLine,
        offset,
        textBeforeCursor,
        textBeforeCursorOnCurrentLine,
      });

      if (textBeforeCursor) {
        // TODO: Add better type
        const messages = [
          generateInstructions(props.language),
          {
            content: textBeforeCursor,
            role: 'user',
            name: 'TextBeforeCursor',
          },
          {
            content: textBeforeCursorOnCurrentLine,
            role: 'user',
            name: 'TextBeforeCursorOnCurrentLine',
          },
        ];

        try {
          console.log('before');
          const newCompletion = await complete('', {
            body: {
              model: 'qwen2.5-coder:0.5b',
              messages,
              maxTokens: 150,
              temperature: 0.1,
            },
          });

          console.log({ newCompletion });

          if (newCompletion) {
            const newSuggestion: monaco.languages.InlineCompletion = {
              insertText: newCompletion,
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column,
                endLineNumber:
                  position.lineNumber +
                  (newCompletion.match(/\n/g) || []).length,
                endColumn: position.column + newCompletion.length,
              },
            };
            cachedSuggestions.value = [
              ...cachedSuggestions.value,
              newSuggestion,
            ].slice(-cacheSize);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      cachedSuggestions.value = [];
    }
  }
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
  width: 500px;
  height: 300px;
}
</style>
