<template>
  <div class="mt-13">
    <nav></nav>
    <main>
      <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="fontSize"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem
            class="focus-within:border-muted-foreground border-l-2 py-0.5 pl-1 text-sm"
          >
            <div class="flex gap-1">
              <span class="font-semibold">Editor:</span>
              <FormLabel class="font-bold">Font Size</FormLabel>
            </div>
            <FormDescription class="text-xs">
              Controls the font size in pixels.
            </FormDescription>
            <FormControl>
              <Input
                id="fontSize"
                type="number"
                placeholder="Font size"
                class="h-7 w-max text-xs"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Submit </Button>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { type GenericObject, useForm } from 'vee-validate';
import {
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
    fontSize: z.number().min(6).max(30),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: GenericObject) => {
  console.log('Form submitted:', values);
});
</script>
