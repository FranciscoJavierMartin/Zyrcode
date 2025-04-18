<template>
  <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
    <section>
      <h4>IA Provider</h4>
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
    </section>
  </form>
</template>

<script setup lang="ts">
import { aiSchema } from '@/modules/settings/helpers/schemas';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, type GenericObject } from 'vee-validate';
import { watch } from 'vue';
import FormSelect from '@/modules/settings/components/form-select/form-select.vue';

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
