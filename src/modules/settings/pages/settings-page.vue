<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmitEditor">
        <section>
          <h4>Editor</h4>
          <FormInput
            :is-field-dirty="isFieldDirty"
            name="fontSize"
            type="number"
            label="Font Size"
            placeholder="Font size"
            section-name="Editor"
            description="Controls the font size in pixels."
          />
          <FormInput
            :is-field-dirty="isFieldDirty"
            name="tabSize"
            type="number"
            label="Tab Size"
            placeholder="Tab size"
            section-name="Editor"
            description="The number of spaces a tab is equal to."
          />
          <FormToggle
            :is-field-dirty="isFieldDirty"
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
          <FormSelect />
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

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formEditorSchema,
});

const onSubmitEditor = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});

const onSubmitAI = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});
</script>
