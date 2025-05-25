<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" :name>
    <div class="settings-form-item-wrapper">
      <FormItem
        class="settings-form-item"
        :class="{ 'border-l-muted-foreground': !isDefault }"
      >
        <div class="flex gap-x-1">
          <span class="font-semibold">{{ sectionName }}:</span>
          <span class="font-bold">{{ label }}</span>
        </div>
        <div class="flex items-center">
          <FormControl>
            <Checkbox :model-value="value" @update:model-value="handleChange" />
            <FormLabel class="text-muted-foreground pl-2 text-xs font-normal">
              {{ description }}
            </FormLabel>
          </FormControl>
          <FormMessage />
        </div>
      </FormItem>
    </div>
  </FormField>
</template>

<!-- TODO: Add better generic types for the form fields  -->
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
import Checkbox from '@/modules/common/components/ui/checkbox/Checkbox.vue';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/modules/common/components/ui/form';
import type {
  FormEditorFields,
  FormAIFields,
  FormCommonFields,
  FormFormatterFields,
} from '@/modules/settings/interfaces/form';

withDefaults(
  defineProps<{
    name: string;
    label: string;
    description: string;
    sectionName: string;
    isFieldDirty: T;
    isDefault?: boolean;
  }>(),
  { isDefault: true },
);
</script>
