<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    v-bind="forwarded"
    :class="
      cn('flex h-full w-full data-[orientation=vertical]:flex-col', props.class)
    "
  >
    <slot />
  </SplitterGroup>
</template>

<script setup lang="ts">
import { cn } from '@/modules/common/helpers/utils';
import {
  SplitterGroup,
  type SplitterGroupEmits,
  type SplitterGroupProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  SplitterGroupProps & { class?: HTMLAttributes['class'] }
>();
const emits = defineEmits<SplitterGroupEmits>();

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
