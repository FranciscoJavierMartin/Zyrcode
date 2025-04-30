<template>
  <section id="editor-settings">
    <SectionTitle>{{ $t('settings.editor.title') }}</SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormSelect
        :is-field-dirty="isFieldDirty"
        :is-default="
          editorSettingsStore.$state.language === initialState.language
        "
        name="language"
        :label="$t('settings.editor.language.label')"
        :section-name="$t('settings.editor.sectionMain')"
        :placeholder="$t('settings.editor.language.placeholder')"
        :description="$t('settings.editor.language.description')"
        :options="languageOptions"
        :value="values['language']"
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        :is-default="editorSettingsStore.$state.ruler === initialState.ruler"
        name="ruler"
        type="number"
        :label="$t('settings.editor.ruler.label')"
        :placeholder="$t('settings.editor.ruler.placeholder')"
        :section-name="$t('settings.editor.sectionMain')"
        :description="$t('settings.editor.ruler.description')"
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        :is-default="
          editorSettingsStore.$state.showLineNumbers ===
          initialState.showLineNumbers
        "
        name="showLineNumbers"
        :label="$t('settings.editor.showLineNumbers.label')"
        :section-name="$t('settings.editor.sectionMain')"
        :description="$t('settings.editor.showLineNumbers.description')"
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        :is-default="
          editorSettingsStore.$state.fontSize === initialState.fontSize
        "
        name="fontSize"
        type="number"
        :label="$t('settings.editor.fontSize.label')"
        :placeholder="$t('settings.editor.fontSize.placeholder')"
        :section-name="$t('settings.editor.sectionMain')"
        :description="$t('settings.editor.fontSize.description')"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/valibot';
import { editorSchema } from '@/modules/settings/helpers/schemas';
import FormInput from '@/modules/settings/components/inputs/form-input/form-input.vue';
import FormToggle from '@/modules/settings/components/inputs/form-toggle/form-toggle.vue';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';
import {
  useEditorSettingsStore,
  initialState,
} from '@/modules/settings/store/editor-settings';
import type { FormSelectOption } from '@/modules/settings/interfaces/form';
import JavascriptIcon from '@/modules/common/components/icons/languages/javascript-icon.vue';
import TypescriptIcon from '@/modules/common/components/icons/languages/typescript-icon.vue';
import MarkdownIcon from '@/modules/common/components/icons/languages/markdown-icon.vue';

const { t } = useI18n();

const languageOptions: FormSelectOption[] = [
  {
    value: 'javascript',
    label: 'JavaScript',
    icon: JavascriptIcon,
    alt: t('icons.javascriptIcon'),
  },
  {
    value: 'typescript',
    label: 'TypeScript',
    icon: TypescriptIcon,
    alt: t('icons.typescriptIcon'),
  },
  {
    value: 'markdown',
    label: 'Markdown',
    icon: MarkdownIcon,
    alt: t('icons.markdownIcon'),
  },
];

const editorSettingsStore = useEditorSettingsStore();

const formEditorSchema = toTypedSchema(editorSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'editorForm',
  validationSchema: formEditorSchema,
  initialValues: { ...editorSettingsStore.$state },
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

watch(
  values,
  (newValues) => {
    editorSettingsStore.$patch(newValues);
  },
  { deep: true },
);
</script>
