<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <form class="w-2/3 space-y-6" @submit="onSubmit">
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
        </section>
        <Button type="submit"> Submit </Button>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { type GenericObject, useForm } from 'vee-validate';
import { Button } from '@/modules/common/components/ui/button';
import FormInput from '@/modules/settings/components/form-input/form-input.vue';

const formSchema = toTypedSchema(
  z.object({
    fontSize: z.number().min(6).max(30),
    tabSize: z.number().min(2).max(30),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});
</script>
