<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmitEditor">
        <section>
          <h4>Editor</h4>
          <FormInput
            :is-field-dirty="isFieldDirtyEditor"
            name="fontSize"
            type="number"
            label="Font Size"
            placeholder="Font size"
            section-name="Editor"
            description="Controls the font size in pixels."
          />
          <FormInput
            :is-field-dirty="isFieldDirtyEditor"
            name="tabSize"
            type="number"
            label="Tab Size"
            placeholder="Tab size"
            section-name="Editor"
            description="The number of spaces a tab is equal to."
          />
          <FormToggle
            :is-field-dirty="isFieldDirtyEditor"
            name="showLineNumbers"
            label="Show line numbers"
            section-name="Editor"
            description="The number of spaces a tab is equal to."
          />
        </section>
        <section>
          <h4>Packages Cache</h4>
          <Button>Clear package cache</Button>
        </section>
        <Button type="submit"> Submit </Button>
      </form>
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmitAI">
        <section>
          <h4>IA Provider</h4>
          <FormSelect
            :is-field-dirty="isFieldDirtyAI"
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
    </main>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { type GenericObject, useForm } from 'vee-validate';
import { Button } from '@/modules/common/components/ui/button';
import FormInput from '@/modules/settings/components/form-input/form-input.vue';
import FormToggle from '@/modules/settings/components/form-toggle/form-toggle.vue';
import FormSelect from '@/modules/settings/components/form-select/form-select.vue';
import { aiSchema, editorSchema } from '@/modules/settings/helpers/schemas';

const formEditorSchema = toTypedSchema(editorSchema);
const formAISchema = toTypedSchema(aiSchema);

const { isFieldDirty: isFieldDirtyEditor, handleSubmit: handleSubmitEditor } =
  useForm({
    validationSchema: formEditorSchema,
  });

const { isFieldDirty: isFieldDirtyAI, handleSubmit: handleSubmitAI } = useForm({
  validationSchema: formAISchema,
});

const onSubmitEditor = handleSubmitEditor((values: GenericObject) => {
  console.log('Form submitted:', values);
});

const onSubmitAI = handleSubmitAI((values: GenericObject) => {
  console.log('Form submitted:', values);
});
</script>
