<template>
  <section id="reset-settings" class="pt-5">
    <Button
      class="settings-form-item-wrapper ml-1 cursor-pointer"
      @click="resetSettings"
    >
      {{ $t('settings.reset') }}
    </Button>
  </section>
</template>

<script setup lang="ts">
import Button from '@/modules/common/components/ui/button/Button.vue';
import { useAISettingsStore } from '@/modules/settings/store/ai-settings';
import { useCommonSettingsStore } from '@/modules/settings/store/common-settings';
import { useEditorSettingsStore } from '@/modules/settings/store/editor-settings';
import { useFormatterSettingsStore } from '@/modules/settings/store/formatter-settings';

const aiSettingsStore = useAISettingsStore();
const commonSettingsStore = useCommonSettingsStore();
const editorSettingsStore = useEditorSettingsStore();
const formatterSettingsStore = useFormatterSettingsStore();

function resetSettings(): void {
  aiSettingsStore.$reset();
  commonSettingsStore.$reset();
  editorSettingsStore.$reset();
  formatterSettingsStore.$reset();
  // FIXME: Avoid reload when reset form.
  location.reload();
}
</script>
