<template>
  <section id="ai-settings">
    <SectionTitle>{{ $t('settings.name') }}</SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="isAIEnabled"
        :label="$t('settings.ai.enable.label')"
        :section-name="$t('settings.ai.section')"
        :description="$t('settings.ai.enable.description')"
      />
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="aiProvider"
        :label="$t('settings.ai.provider.label')"
        :section-name="$t('settings.ai.section')"
        :placeholder="$t('settings.ai.provider.placeholder')"
        :description="$t('settings.ai.provider.description')"
        :options="aiProviderOptions"
        :value="values['aiProvider']"
      />
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="autoCompleteModel"
        :label="$t('settings.ai.model.label')"
        :section-name="$t('settings.ai.section')"
        :placeholder="$t('settings.ai.model.placeholder')"
        :description="$t('settings.ai.model.description')"
        :options="[
          { value: 'qwen2.5-coder:0.5b', label: 'qwen2.5-coder:0.5b' },
          { value: 'qwen2.5-coder:1.5b', label: 'qwen2.5-coder:1.5b' },
        ]"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { toTypedSchema } from '@vee-validate/valibot';
import { useForm, type GenericObject } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { aiSchema } from '@/modules/settings/helpers/schemas';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import FormToggle from '@/modules/settings/components/inputs/form-toggle/form-toggle.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';
import { useAISettingsStore } from '@/modules/settings/store/ai-settings';
import type { FormSelectOption } from '@/modules/settings/interfaces/form';
import ollamaIcon from '@/modules/common/components/icons/ai-providers/ollama.vue';

const { t } = useI18n();

const aiProviderOptions: FormSelectOption[] = [
  {
    value: 'ollama',
    label: 'Ollama',
    icon: ollamaIcon,
    alt: t('icons.ollamaIcon'),
  },
];
const aiSettingsStore = useAISettingsStore();

const formAISchema = toTypedSchema(aiSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'aiForm',
  validationSchema: formAISchema,
  initialValues: { ...aiSettingsStore.$state },
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValues) => {
    aiSettingsStore.$patch(newValues);
  },
  { deep: true },
);
</script>
