<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn('data-[error=true]:text-destructive-foreground', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>

<script lang="ts" setup>
import type { LabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/modules/common/helpers/utils';
import { Label } from '@/modules/common/components/ui/label';
import { useFormField } from './useFormField';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const { error, formItemId } = useFormField();
</script>
