<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="delegatedProps"
    :class="cn('text-lg font-semibold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>

<script setup lang="ts">
import { cn } from '@/modules/common/helpers/utils';
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  AlertDialogTitleProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
