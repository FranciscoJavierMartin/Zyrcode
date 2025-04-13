<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="
      cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', props.class)
    "
  >
    <slot />
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { cn } from '@/modules/common/helpers/utils';
import { buttonVariants } from '@/modules/common/components/ui/button';
import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  AlertDialogCancelProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
