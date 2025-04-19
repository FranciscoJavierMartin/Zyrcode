<template>
  <form @submit.prevent="onSubmit">
    <section id="common-settings">
      <h4>Common settings</h4>
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="appLanguage"
        label="Change app language"
        section-name="Langugage"
        placeholder="Set app language"
        description="Select app language."
        :options="[
          { value: 'english', label: 'English' },
          { value: 'spanish', label: 'Spanish' },
        ]"
      />
    </section>
  </form>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useForm, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { commonSchema } from '@/modules/settings/helpers/schemas';
import FormSelect from '@/modules/settings/components/form-select/form-select.vue';

const formCommonSchema = toTypedSchema(commonSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'commonForm',
  validationSchema: formCommonSchema,
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValue) => {
    console.log(newValue);
  },
  { deep: true },
);
</script>
