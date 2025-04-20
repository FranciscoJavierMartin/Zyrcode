<template>
  <component
    :is="heading"
    :id
    :class="
      cn('bg-background sticky top-13 -ml-8 w-full py-1 pl-8', props.class)
    "
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/modules/common/helpers/utils';

const props = withDefaults(
  defineProps<{
    id?: string;
    heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: HTMLAttributes['class'];
  }>(),
  {
    heading: 'h4',
    class: '',
  },
);
</script>
