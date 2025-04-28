<template>
  <section id="common-settings">
    <SectionTitle>{{ $t('settings.common.title') }}</SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="appLanguage"
        :label="$t('settings.common.appLanguage.label')"
        :section-name="$t('settings.common.sectionLanguage')"
        :placeholder="$t('settings.common.appLanguage.placeholder')"
        :description="$t('settings.common.appLanguage.description')"
        :options="[
          {
            value: 'english',
            label: $t('settings.common.appLanguage.english'),
          },
          {
            value: 'spanish',
            label: $t('settings.common.appLanguage.spanish'),
          },
        ]"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useForm, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/valibot';
import { commonSchema } from '@/modules/settings/helpers/schemas';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';
import { useCommonSettingsStore } from '@/modules/settings/store/common-settings';

const commonSettingsStore = useCommonSettingsStore();

const formCommonSchema = toTypedSchema(commonSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'commonForm',
  validationSchema: formCommonSchema,
  initialValues: { ...commonSettingsStore.$state },
});

// TODO: Check if can be removed
const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValue) => {
    commonSettingsStore.$patch(newValue);
  },
  { deep: true },
);
</script>
