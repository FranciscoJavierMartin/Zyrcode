<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(buttonVariants(), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>

<script setup lang="ts">
import { cn } from '@/modules/common/helpers/utils';
import { buttonVariants } from '@/modules/common/components/ui/button';
import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  AlertDialogActionProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
