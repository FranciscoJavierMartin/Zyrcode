import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormFormatterSettings } from '@/modules/settings/interfaces/form';

export const initialState: FormFormatterSettings = {
  jsxSingleQuote: true,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  useTabs: true,
  trailingComma: 'all',
};

export const useFormatterSettingsStore = defineStore(
  'formatter-settings',
  () => {
    const jsxSingleQuote = ref<boolean>(initialState.jsxSingleQuote);
    const printWidth = ref<number>(initialState.printWidth);
    const semi = ref<boolean>(initialState.semi);
    const singleQuote = ref<boolean>(initialState.singleQuote);
    const useTabs = ref<boolean>(initialState.useTabs);
    const trailingComma = ref<FormFormatterSettings['trailingComma']>(
      initialState.trailingComma,
    );

    return {
      jsxSingleQuote,
      printWidth,
      semi,
      singleQuote,
      useTabs,
      trailingComma,
    };
  },
  {
    persist: true,
  },
);
