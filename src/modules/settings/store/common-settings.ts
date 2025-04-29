import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormCommonSettings } from '@/modules/settings/interfaces/form';

export const initialState: FormCommonSettings = {
  appLanguage: 'en',
};

export const useCommonSettingsStore = defineStore(
  'common-settings',
  () => {
    const appLanguage = ref<string>(initialState.appLanguage);

    return {
      appLanguage,
    };
  },
  {
    persist: true,
  },
);
