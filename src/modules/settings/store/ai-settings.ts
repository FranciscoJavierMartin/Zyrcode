import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormAISettings } from '@/modules/settings/interfaces/form';

export const initialState: FormAISettings = {
  aiProvider: 'ollama',
  autoCompleteModel: '',
  isAIEnabled: true,
};

export const useAISettingsStore = defineStore(
  'ai-settings',
  () => {
    const aiProvider = ref<FormAISettings['aiProvider']>(
      initialState.aiProvider,
    );
    const autoCompleteModel = ref<string>(initialState.autoCompleteModel);
    const isAIEnabled = ref<boolean>(initialState.isAIEnabled);

    return {
      aiProvider,
      autoCompleteModel,
      isAIEnabled,
    };
  },
  {
    persist: true,
  },
);
