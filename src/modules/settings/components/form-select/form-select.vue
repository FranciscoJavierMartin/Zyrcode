<template>
  <FormField v-slot="{ componentField }" :name>
    <FormItem
      class="focus-within:border-muted-foreground border-l-2 py-0.5 pl-1 text-sm"
    >
      <div class="flex gap-1">
        <span class="font-semibold">{{ sectionName }}:</span>
        <FormLabel class="font-bold">{{ label }}</FormLabel>
      </div>
      <FormDescription class="text-xs"> {{ description }} </FormDescription>
      <Select v-bind="componentField" :id="name">
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="option of options"
              :key="option.value"
              :value="option.value"
            >
              <!-- TODO: Add icon -->
              {{ option.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/modules/common/components/ui/form';
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectItem,
} from '@/modules/common/components/ui/select';
import type { FormAIFields } from '@/modules/settings/interfaces/form';

defineProps<{
  name: string;
  label: string;
  description: string;
  sectionName: string;
  placeholder: string;
  options: { value: string; label: string }[];
  isFieldDirty: <TPath extends FormAIFields>(path: TPath) => boolean;
}>();
</script>
