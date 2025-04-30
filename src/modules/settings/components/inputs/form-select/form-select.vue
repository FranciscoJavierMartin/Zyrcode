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
              <SelectValue :placeholder="placeholder">
                <!-- If there is no icon, then show the normal button -->
                <div
                  v-if="selectedOption?.icon"
                  class="flex items-center gap-2"
                >
                  <component
                    :is="selectedOption.icon"
                    class="size-4"
                    :alt="selectedOption.alt"
                  />
                  <span class="text-foreground text-sm">
                    {{ selectedOption?.label }}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="option of options"
                :key="option.value"
                :value="option.value"
              >
                <div class="flex items-center gap-2">
                  <component
                    v-if="option.icon"
                    :is="option.icon"
                    class="size-4"
                  />
                  <span class="text-foreground text-sm">
                    {{ option.label }}
                  </span>
                </div>
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
import { computed } from 'vue';
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
  FormSelectOption,
} from '@/modules/settings/interfaces/form';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    value?: string;
    description: string;
    sectionName: string;
    placeholder: string;
    options: FormSelectOption[];
    isFieldDirty: T;
    isDefault?: boolean;
  }>(),
  { isDefault: true },
);

const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.value),
);
</script>
