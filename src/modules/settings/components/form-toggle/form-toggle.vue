<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" :name>
    <FormItem
      class="focus-within:border-muted-foreground flex flex-col border-l-2 border-transparent py-0.5 pl-1 text-sm"
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
  </FormField>
</template>

<!-- Add generic type -->
<script setup lang="ts">
import Checkbox from '@/modules/common/components/ui/checkbox/Checkbox.vue';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/modules/common/components/ui/form';
import type { FormEditorFields } from '@/modules/settings/interfaces/form';

defineProps<{
  name: string;
  label: string;
  description: string;
  sectionName: string;
  isFieldDirty: <TPath extends FormEditorFields>(path: TPath) => boolean;
}>();
</script>
