<template>
  <div ref="editor" class="size-full" />
</template>

<script setup lang="ts">
import {
  onMounted,
  useTemplateRef,
  watch,
  onWatcherCleanup,
  onBeforeUnmount,
  ref,
  computed,
} from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import parserTypeScript from 'prettier/plugins/typescript';
import { useColorMode } from '@vueuse/core';
import { getSuggestion } from '@/modules/code-editor/helpers/get-suggestion';
import { CompletionFormatter } from '@/modules/code-editor/helpers/completion-formatter';
import '@/modules/code-editor/utils/worker';
import type { Language } from '@/modules/cells/interfaces/code';
import { useEditorSettingsStore } from '@/modules/settings/store/editor-settings';
import { useFormatterSettingsStore } from '@/modules/settings/store/formatter-settings';

const editorRef = useTemplateRef<HTMLDivElement>('editor');
const editorId = ref('');
const props = defineProps<{ id: string; language: Language }>();
const code = defineModel<string>('code', {
  required: true,
});
const inlineCompletionsProvider = ref<monaco.IDisposable | undefined>();
const theme = useColorMode({ disableTransition: false });
const editor = computed<monaco.editor.ICodeEditor | undefined>(() =>
  monaco.editor.getEditors().find((e) => e.getId() === editorId.value),
);
const editorSettingsStore = useEditorSettingsStore();
const formatterSettingsStore = useFormatterSettingsStore();

async function formatCode(): Promise<void> {
  const formattedCode = await prettier
    .format(code.value, {
      parser: 'babel-ts',
      plugins: [parserBabel, parserTypeScript, parserEstree],
      tabWidth: formatterSettingsStore.$state.tabSize,
      useTabs: formatterSettingsStore.$state.useTabs,
      semi: formatterSettingsStore.$state.semi,
      singleQuote: formatterSettingsStore.$state.singleQuote,
      trailingComma: formatterSettingsStore.$state.trailingComma,
      printWidth: formatterSettingsStore.$state.printWidth,
      jsxSingleQuote: formatterSettingsStore.$state.jsxSingleQuote,
    })
    .then((res) => res.replace(/\n$/, ''));

  editor.value?.setValue(formattedCode);
}

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
    inlineCompletionsProvider.value =
      registerInlineCompletionsProvider(newLanguage);
    editor.value?.setModel(monaco.editor.createModel(code.value, newLanguage));

    onWatcherCleanup(() => {
      inlineCompletionsProvider.value?.dispose();
    });
  },
  { immediate: true },
);

watch(
  theme,
  (newTheme) => {
    monaco.editor.setTheme(newTheme === 'light' ? 'vs' : 'vs-dark');
  },
  { immediate: true },
);

onMounted(() => {
  if (editorRef.value) {
    const model = monaco.editor.createModel(code.value, props.language);

    editorId.value = monaco.editor
      .create(editorRef.value, {
        value: code.value,
        model,
        language: props.language,
        minimap: { enabled: false },
        automaticLayout: true,
        lineNumbers: editorSettingsStore.$state.showLineNumbers ? 'on' : 'off',
        fontSize: editorSettingsStore.$state.fontSize,
        rulers: [editorSettingsStore.$state.ruler],
        tabSize: formatterSettingsStore.$state.tabSize,
      })
      .getId();

    editor.value?.onDidChangeModelContent(() => {
      code.value = editor.value?.getValue() ?? '';
    });
  }
});

onBeforeUnmount(() => {
  inlineCompletionsProvider.value?.dispose();
  editor.value?.dispose();
});

defineExpose({ formatCode });
</script>
