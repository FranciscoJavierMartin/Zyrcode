<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="p"
    :name="toValue(name)"
    :class="cn('text-destructive-foreground text-sm', props.class)"
  />
</template>

<script lang="ts" setup>
import { cn } from '@/modules/common/helpers/utils';
import { ErrorMessage } from 'vee-validate';
import { type HTMLAttributes, toValue } from 'vue';
import { useFormField } from './useFormField';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { name, formMessageId } = useFormField();
</script>
