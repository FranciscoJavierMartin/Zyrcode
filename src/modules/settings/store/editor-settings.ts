import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormEditorSettings } from '@/modules/settings/interfaces/form';

export const initialState: FormEditorSettings = {
  fontSize: 14,
  language: 'typescript',
  ruler: 80,
  showLineNumbers: true,
  fontLigatures: false,
};

export const useEditorSettingsStore = defineStore(
  'editor-settings',
  () => {
    const fontSize = ref<number>(initialState.fontSize);
    const language = ref<FormEditorSettings['language']>(initialState.language);
    const ruler = ref<number>(initialState.ruler);
    const showLineNumbers = ref<boolean>(initialState.showLineNumbers);
    const fontLigatures = ref<boolean>(initialState.fontLigatures);

    function $reset(): void {
      fontSize.value = initialState.fontSize;
      language.value = initialState.language;
      ruler.value = initialState.ruler;
      showLineNumbers.value = initialState.showLineNumbers;
    }

    return {
      fontLigatures,
      fontSize,
      language,
      ruler,
      showLineNumbers,
      $reset,
    };
  },
  {
    persist: true,
  },
);
