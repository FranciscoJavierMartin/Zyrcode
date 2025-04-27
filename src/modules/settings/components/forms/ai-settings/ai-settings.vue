<template>
  <section id="ai-settings">
    <SectionTitle>AI settings</SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="isAIEnabled"
        label="Enable AI options"
        section-name="AI"
        description="Enable AI features"
      />
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="aiProvider"
        label="IA provider"
        section-name="AI"
        placeholder="Select AI provider"
        description="Select AI provider"
        :options="[{ value: 'ollama', label: 'Ollama' }]"
      />
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="autoCompleteModel"
        label="IA model for code completion"
        section-name="AI"
        placeholder="Select AI model"
        description="Select the model for code completion."
        :options="[
          { value: 'qwen2.5-coder:0.5b', label: 'qwen2.5-coder:0.5b' },
          { value: 'qwen2.5-coder:1.5b', label: 'qwen2.5-coder:1.5b' },
        ]"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { aiSchema } from '@/modules/settings/helpers/schemas';
import { toTypedSchema } from '@vee-validate/valibot';
import { useForm, type GenericObject } from 'vee-validate';
import { watch } from 'vue';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import FormToggle from '@/modules/settings/components/inputs/form-toggle/form-toggle.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';

const formAISchema = toTypedSchema(aiSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: formAISchema,
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValues) => {
    console.log(newValues);
  },
  { deep: true },
);
</script>
