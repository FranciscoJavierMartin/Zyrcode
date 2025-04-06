<template>
  <div>
    <button @click="debouncedSuggestions">Call ollama</button>
    <div class="editor" ref="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, onUnmounted, ref } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useCompletion } from '@ai-sdk/vue';
import type { MonacoCodeEditor } from '@/modules/code-editor/interfaces/code-editor';
import '@/modules/code-editor/utils/worker';
import { generateInstructions } from '@/modules/code-editor/helpers/prompts';
import type { CoreMessage, Message } from 'ai';
import ollama from 'ollama/browser';

let editor: MonacoCodeEditor | null = null;

const cachedSuggestions = ref<monaco.languages.InlineCompletion[]>([]);
const editorRef = useTemplateRef<HTMLDivElement>('editor');
const props = defineProps<{ language: string }>();
const code = defineModel({ required: true, type: String });
const { completion, complete } = useCompletion({
  api: 'http://localhost:11434/api/generate',
  body: { language: props.language },
});

function handleCodeEditorMounted(editor: MonacoCodeEditor): void {
  editor.onDidChangeModelContent(() => {
    code.value = editor.getValue();
  });
}

function debouncedSuggestions() {
  console.log('debouncedSuggestions');

  console.log('Before call');
  // ollama
  //   .chat({
  //     model: 'qwen2.5-coder:0.5b',
  //     messages: [
  //       {
  //         content: 'Tell me a joke',
  //         role: 'user',
  //       },
  //     ],
  //     options: {
  //       temperature: 0.1,
  //       num_predict: 150,
  //     },
  //   })
  //   .then((res) => {
  //     console.log('Then');
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log('Catch');
  //     console.log(err);
  //   });

  fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: 'qwen2.5-coder:0.5b',
      messages: [
        {
          content: 'Tell me a joke',
          role: 'user',
        },
      ],
      stream: false,
      options: {
        temperature: 0.1,
        num_predict: 150,
      },
    }),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch((err) => {
      console.log('Catch');
      console.log(err);
    });

  console.log('End call');

  if (editor) {
    const model = editor?.getModel();

    if (model && model?.getValue()) {
      const position = editor.getPosition();
      const currentLine = model.getLineContent(position?.lineNumber ?? 1);
      const offset = model.getOffsetAt(position!);
      const textBeforeCursor = model
        .getValue()
        .substring(0, offset - currentLine.length);
      const textBeforeCursorOnCurrentLine = currentLine.substring(
        0,
        (position?.column ?? 1) - 1,
      );

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

        // complete('', {
        //   body: { messages },
        // })
        //   .then((newCompletion) => {
        //     console.log(newCompletion);
        //   })
        //   .catch(console.log);
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
