<template>
  <FormField v-slot="{ componentField }" :name>
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
    description: string;
    sectionName: string;
    placeholder: string;
    options: { value: string; label: string }[];
    isFieldDirty: T;
    isDefault?: boolean;
  }>(),
  { isDefault: true },
);
</script>
