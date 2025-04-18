<template>
  <FormField v-slot="{ value, handleChange }" type="checkbox" :name>
    <FormItem
      class="flex items-start space-y-0 gap-x-3 rounded-md border p-4 shadow"
    >
      <FormControl>
        <Checkbox :model-value="value" @update:model-value="handleChange" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>{{ label }}</FormLabel>
        <FormDescription>
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
