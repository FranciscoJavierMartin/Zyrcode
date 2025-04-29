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
        :options="localeOptions"
        :value="values['appLanguage']"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/valibot';
import { commonSchema } from '@/modules/settings/helpers/schemas';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';
import { useCommonSettingsStore } from '@/modules/settings/store/common-settings';
import esFlag from '@/assets/flags/spain.svg';
import enFlag from '@/assets/flags/united-kingdom.svg';

const { locale, availableLocales, fallbackLocale, t } = useI18n();

const options: Record<string, { value: string; label: string; icon?: string }> =
  {
    en: {
      value: 'en',
      label: t('settings.common.appLanguage.english'),
      icon: enFlag,
    },
    es: {
      value: 'es',
      label: t('settings.common.appLanguage.spanish'),
      icon: esFlag,
    },
  };

const localeOptions = computed(() => availableLocales.map((l) => options[l]));

const commonSettingsStore = useCommonSettingsStore();

const formCommonSchema = toTypedSchema(commonSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'commonForm',
  validationSchema: formCommonSchema,
  initialValues: {
    ...commonSettingsStore.$state,
    appLanguage: fallbackLocale.value.toString(),
  },
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValue) => {
    commonSettingsStore.$patch(newValue);
    locale.value = newValue.appLanguage ?? fallbackLocale.value.toString();
  },
  { deep: true },
);
</script>
