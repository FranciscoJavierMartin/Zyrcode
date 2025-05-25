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
  tabSize: 2,
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
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
    const tabSize = ref<number>(initialState.tabSize);
    const arrowParens = ref<FormFormatterSettings['arrowParens']>(
      initialState.arrowParens,
    );
    const bracketSpacing = ref<boolean>(initialState.bracketSpacing);
    const bracketSameLine = ref<boolean>(initialState.bracketSameLine);
    const endOfLine = ref<FormFormatterSettings['endOfLine']>(
      initialState.endOfLine,
    );
    const quoteProps = ref<FormFormatterSettings['quoteProps']>(
      initialState.quoteProps,
    );

    function $reset(): void {
      jsxSingleQuote.value = initialState.jsxSingleQuote;
      printWidth.value = initialState.printWidth;
      semi.value = initialState.semi;
      singleQuote.value = initialState.singleQuote;
      useTabs.value = initialState.useTabs;
      trailingComma.value = initialState.trailingComma;
      tabSize.value = initialState.tabSize;
      arrowParens.value = initialState.arrowParens;
      bracketSpacing.value = initialState.bracketSpacing;
      bracketSameLine.value = initialState.bracketSameLine;
      endOfLine.value = initialState.endOfLine;
      quoteProps.value = initialState.quoteProps;
    }

    return {
      arrowParens,
      bracketSpacing,
      bracketSameLine,
      endOfLine,
      quoteProps,
      jsxSingleQuote,
      printWidth,
      semi,
      singleQuote,
      useTabs,
      trailingComma,
      tabSize,
      $reset,
    };
  },
  {
    persist: true,
  },
);
