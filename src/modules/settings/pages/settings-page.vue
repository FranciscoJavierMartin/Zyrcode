<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="username"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              This is your public display name,
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Submit </Button>
      </form>
      <!-- <form>
        <h4>Editor</h4>
        <div>
          <label for="fontSize" class="flex gap-1"> Editor </label>
          <input id="fontSize" name="fontSize" placeholder="Font Size" />
          <p>Controls the font size in pixels.</p>
        </div>
      </form> -->
    </main>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { type GenericObject, useForm } from 'vee-validate';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/modules/common/components/ui/form';
import { Input } from '@/modules/common/components/ui/input';
import { Button } from '@/modules/common/components/ui/button';

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});
</script>
