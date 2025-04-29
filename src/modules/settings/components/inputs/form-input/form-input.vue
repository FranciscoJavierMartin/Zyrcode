<template>
  <FormField
    v-slot="{ componentField }"
    :name
    :validate-on-blur="!isFieldDirty"
  >
    <div class="settings-form-item-wrapper">
      <FormItem
        class="settings-form-item"
        :class="{ 'border-l-muted-foreground': !isDefault }"
      >
        <div class="flex gap-1">
          <span class="font-semibold">{{ sectionName }}:</span>
          <FormLabel class="font-bold">{{ label }}</FormLabel>
        </div>
        <FormDescription class="text-xs font-normal">
          {{ description }}
        </FormDescription>
        <FormControl>
          <Input
            :id="name"
            :type
            :placeholder
            class="h-7 w-max text-xs"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  </FormField>
</template>

<!-- TODO: Add generic type -->
<script
  setup
  lang="ts"
  generic="
    T extends
      | (<TPath extends FormEditorFields>(path: TPath) => boolean)
      | (<TPath extends FormFormatterFields>(path: TPath) => boolean)
      | (<TPath extends FormAIFields>(path: TPath) => boolean)
      | (<TPath extends FormCommonFields>(path: TPath) => boolean)
  "
>
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/modules/common/components/ui/form';
import { Input } from '@/modules/common/components/ui/input';
import type {
  FormAIFields,
  FormCommonFields,
  FormEditorFields,
  FormFormatterFields,
} from '@/modules/settings/interfaces/form';

withDefaults(
  defineProps<{
    name: string;
    label: string;
    type: string;
    description: string;
    sectionName: string;
    placeholder: string;
    isFieldDirty: T;
    isDefault?: boolean;
  }>(),
  { isDefault: true },
);
</script>
