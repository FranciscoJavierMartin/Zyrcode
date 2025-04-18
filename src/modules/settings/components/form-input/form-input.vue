<template>
  <FormField
    v-slot="{ componentField }"
    :name
    :validate-on-blur="!isFieldDirty"
  >
    <FormItem
      class="focus-within:border-muted-foreground border-l-2 py-0.5 pl-1 text-sm"
    >
      <div class="flex gap-1">
        <span class="font-semibold">{{ sectionName }}:</span>
        <FormLabel class="font-bold">{{ label }}</FormLabel>
      </div>
      <FormDescription class="text-xs">
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
  </FormField>
</template>

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
import type { FormFields } from '@/modules/settings/interfaces/form';

defineProps<{
  name: string;
  label: string;
  type: string;
  description: string;
  sectionName: string;
  placeholder: string;
  isFieldDirty: <TPath extends FormFields>(path: TPath) => boolean;
}>();
</script>
