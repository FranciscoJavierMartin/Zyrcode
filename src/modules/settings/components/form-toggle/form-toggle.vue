<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" :name>
    <FormItem
      class="focus-within:border-muted-foreground flex flex-col border-l-2 py-0.5 pl-1 text-sm"
    >
      <div class="flex gap-x-1">
        <span class="font-semibold">{{ sectionName }}:</span>
        <FormLabel class="font-bold">{{ label }}</FormLabel>
      </div>
      <div class="flex items-center gap-x-2">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <FormDescription class="text-xs">
          {{ description }}
        </FormDescription>
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import Checkbox from '@/modules/common/components/ui/checkbox/Checkbox.vue';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/modules/common/components/ui/form';
import { Input } from '@/modules/common/components/ui/input';
import { Label } from '@/modules/common/components/ui/label';
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
