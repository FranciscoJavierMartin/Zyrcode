<template>
  <section id="formatter-settings">
    <SectionTitle id="formatter-settings" heading="h5" class="top-20">
      {{ $t('settings.formatter.title') }}
    </SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormInput
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.tabSize === initialState.tabSize
        "
        name="tabSize"
        type="number"
        :label="$t('settings.formatter.tabSize.label')"
        :placeholder="$t('settings.formatter.tabSize.placeholder')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.tabSize.description')"
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.printWidth === initialState.printWidth
        "
        name="printWidth"
        type="number"
        :label="$t('settings.formatter.printWidth.label')"
        :placeholder="$t('settings.formatter.printWidth.placeholder')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.printWidth.description')"
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        :is-default="formatterSettingsStore.$state.semi === initialState.semi"
        name="semi"
        :label="$t('settings.formatter.semi.label')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.semi.description')"
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.singleQuote === initialState.singleQuote
        "
        name="singleQuote"
        :label="$t('settings.formatter.singleQuote.label')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.singleQuote.description')"
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.jsxSingleQuote ===
          initialState.jsxSingleQuote
        "
        name="jsxSingleQuote"
        :label="$t('settings.formatter.jsxSingleQuote.label')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.jsxSingleQuote.description')"
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.useTabs === initialState.useTabs
        "
        name="useTabs"
        :label="$t('settings.formatter.useTabs.label')"
        :section-name="$t('settings.formatter.section')"
        :description="$t('settings.formatter.useTabs.description')"
      />
      <FormSelect
        :is-field-dirty="isFieldDirty"
        :is-default="
          formatterSettingsStore.$state.trailingComma ===
          initialState.trailingComma
        "
        name="trailingComma"
        :label="$t('settings.formatter.trailingComma.label')"
        :section-name="$t('settings.formatter.section')"
        :placeholder="$t('settings.formatter.trailingComma.placeholder')"
        :description="$t('settings.formatter.trailingComma.description')"
        :options="[
          {
            label: 'none',
            value: 'none',
          },
          {
            label: 'es5',
            value: 'es5',
          },
          {
            label: 'all',
            value: 'all',
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
import { formatterSchema } from '@/modules/settings/helpers/schemas';
import FormInput from '@/modules/settings/components/inputs/form-input/form-input.vue';
import FormToggle from '@/modules/settings/components/inputs/form-toggle/form-toggle.vue';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';
import {
  useFormatterSettingsStore,
  initialState,
} from '@/modules/settings/store/formatter-settings';

const formatterSettingsStore = useFormatterSettingsStore();

const formFormatterSchema = toTypedSchema(formatterSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'formatterForm',
  validationSchema: formFormatterSchema,
  initialValues: { ...formatterSettingsStore.$state },
});

// TODO: Check if can be removed
const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValues) => {
    formatterSettingsStore.$patch(newValues);
  },
  { deep: true },
);
</script>
