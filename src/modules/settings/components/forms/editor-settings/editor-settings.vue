<template>
  <section id="editor-settings">
    <SectionTitle>Editor settings</SectionTitle>
    <form @submit.prevent="onSubmit">
      <FormSelect
        :is-field-dirty="isFieldDirty"
        name="language"
        label="Change editor language"
        section-name="Editor"
        placeholder="Set default language"
        description="Select default language."
        :options="[
          { value: 'javascript', label: 'JavaScript' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'markdown', label: 'Markdown' },
        ]"
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        name="ruler"
        type="number"
        label="Ruler"
        placeholder="Ruler"
        section-name="Editor"
        description="Render vertical ruler after a certain number of monospace characters."
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="showLineNumbers"
        label="Show line numbers"
        section-name="Editor"
        description="The number of spaces a tab is equal to."
      />
      <SectionTitle id="formatter-settings" heading="h5" class="top-20">
        Formatter
      </SectionTitle>
      <FormInput
        :is-field-dirty="isFieldDirty"
        name="tabSize"
        type="number"
        label="Tab Size"
        placeholder="Tab size"
        section-name="Formatter"
        description="The number of spaces a tab is equal to."
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        name="printWidth"
        type="number"
        label="Print width"
        placeholder="Print width"
        section-name="Formatter"
        description="Fit code within this line limit."
      />
      <FormInput
        :is-field-dirty="isFieldDirty"
        name="fontSize"
        type="number"
        label="Font Size"
        placeholder="Font size"
        section-name="Formatter"
        description="Controls the font size in pixels."
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="semi"
        label="Semi"
        section-name="Formatter"
        description="Whether to use semicolons at the end of every line."
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="singleQuote"
        label="Single quote"
        section-name="Formatter"
        description="Use single instead of double quotes."
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="jsxSingleQuote"
        label="Jsx single quote"
        section-name="Formatter"
        description="Use single instead of double quotes in JSX."
      />
      <FormToggle
        :is-field-dirty="isFieldDirty"
        name="useTabs"
        label="Use tabs"
        section-name="Formatter"
        description="Indent lines with tabs"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { editorSchema } from '@/modules/settings/helpers/schemas';
import { toTypedSchema } from '@vee-validate/valibot';
import { useForm, type GenericObject } from 'vee-validate';
import { watch } from 'vue';
import FormInput from '@/modules/settings/components/inputs/form-input/form-input.vue';
import FormToggle from '@/modules/settings/components/inputs/form-toggle/form-toggle.vue';
import FormSelect from '@/modules/settings/components/inputs/form-select/form-select.vue';
import SectionTitle from '@/modules/settings/components/section-title/section-title.vue';

const formEditorSchema = toTypedSchema(editorSchema);

const { isFieldDirty, handleSubmit, values } = useForm({
  name: 'editorForm',
  validationSchema: formEditorSchema,
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
