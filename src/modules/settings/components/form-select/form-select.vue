<template>
  <FormField v-slot="{ componentField }" name="model">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
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
              {{ option.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription> {{ description }} </FormDescription>
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
