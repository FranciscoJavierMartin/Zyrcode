<template>
  <form class="w-2/3 space-y-6" @submit.prevent="onSubmitCommon">
    <section>
      <h4>Common settings</h4>
      <FormSelect
        :is-field-dirty="isFieldDirtyCommon"
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
      <button type="submit">Submit</button>
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

const {
  isFieldDirty: isFieldDirtyCommon,
  handleSubmit: handleSubmitCommon,
  values: commonValues,
} = useForm({
  name: 'commonForm',
  validationSchema: formCommonSchema,
});

const onSubmitCommon = handleSubmitCommon((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  () => commonValues,
  (newValue) => {
    console.log(newValue);
  },
  { deep: true },
);
</script>
