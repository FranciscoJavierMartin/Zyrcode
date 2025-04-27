import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { FormEditorSettings } from '@/modules/settings/interfaces/form';

export const useSettingsStore = defineStore('settings', () => {
  const editorSettings = reactive<FormEditorSettings>({
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
  });

  return {
    editorSettings,
  };
});
