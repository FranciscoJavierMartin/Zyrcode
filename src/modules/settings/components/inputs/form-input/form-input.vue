<template>
  <FormField
    v-slot="{ componentField }"
    :name
    :validate-on-blur="!isFieldDirty"
  >
    <div class="settings-form-item-wrapper">
      <FormItem class="settings-form-item">
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

<!-- Add generic type -->
<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/modules/common/components/ui/form';
import { Input } from '@/modules/common/components/ui/input';
import type { FormEditorFields } from '@/modules/settings/interfaces/form';

defineProps<{
  name: string;
  label: string;
  type: string;
  description: string;
  sectionName: string;
  placeholder: string;
  isFieldDirty: <TPath extends FormEditorFields>(path: TPath) => boolean;
}>();
</script>
