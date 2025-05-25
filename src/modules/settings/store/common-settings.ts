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

    function $reset(): void {
      appLanguage.value = initialState.appLanguage;
    }

    return {
      appLanguage,
      $reset,
    };
  },
  {
    persist: true,
  },
);
