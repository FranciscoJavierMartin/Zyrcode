import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormEditorSettings } from '@/modules/settings/interfaces/form';

export const initialState: FormEditorSettings = {
  fontSize: 14,
  jsxSingleQuote: true,
  language: 'javascript',
  printWidth: 80,
  ruler: 80,
  semi: true,
  showLineNumbers: true,
  singleQuote: true,
  tabSize: 2,
  useTabs: true,
  trailingComma: 'all',
};

export const useEditorSettingsStore = defineStore(
  'editor-settings',
  () => {
    const fontSize = ref<number>(initialState.fontSize);
    const jsxSingleQuote = ref<boolean>(initialState.jsxSingleQuote);
    const language = ref<string>(initialState.language);
    const printWidth = ref<number>(initialState.printWidth);
    const ruler = ref<number>(initialState.ruler);
    const semi = ref<boolean>(initialState.semi);
    const showLineNumbers = ref<boolean>(initialState.showLineNumbers);
    const singleQuote = ref<boolean>(initialState.singleQuote);
    const tabSize = ref<number>(initialState.tabSize);
    const useTabs = ref<boolean>(initialState.useTabs);
    const trailingComma = ref<FormEditorSettings['trailingComma']>(
      initialState.trailingComma,
    );

    return {
      fontSize,
      jsxSingleQuote,
      language,
      printWidth,
      ruler,
      semi,
      showLineNumbers,
      singleQuote,
      tabSize,
      useTabs,
      trailingComma,
    };
  },
  {
    persist: true,
  },
);
