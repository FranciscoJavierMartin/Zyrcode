import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormEditorSettings } from '@/modules/settings/interfaces/form';

export const initialState: FormEditorSettings = {
  fontSize: 14,
  language: 'javascript',
  ruler: 80,
  showLineNumbers: true,
};

export const useEditorSettingsStore = defineStore(
  'editor-settings',
  () => {
    const fontSize = ref<number>(initialState.fontSize);
    const language = ref<string>(initialState.language);
    const ruler = ref<number>(initialState.ruler);
    const showLineNumbers = ref<boolean>(initialState.showLineNumbers);

    return {
      fontSize,
      language,
      ruler,
      showLineNumbers,
    };
  },
  {
    persist: true,
  },
);
