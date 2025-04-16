<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn('icon-text-button', props.class)"
  >
    <div class="icon">
      <slot />
    </div>
    <span> {{ text }} </span>
  </Primitive>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@/modules/common/helpers/utils';

interface Props extends PrimitiveProps {
  text: string;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), { as: 'button' });
</script>

<style scoped>
@reference '@/assets/styles.css';

.icon-text-button {
  @apply bg-background text-foreground hover:bg-foreground hover:text-background relative flex h-9 w-8 max-w-8 cursor-pointer items-center overflow-x-hidden rounded-md px-2 py-3 text-sm font-medium shadow-xs transition-[max-width] duration-500 hover:max-w-80 disabled:pointer-events-none disabled:opacity-50 lg:w-auto;

  .icon {
    @apply absolute top-2 left-2 size-5;
  }

  > span {
    @apply ml-6 hidden whitespace-nowrap lg:block;
  }
}
</style>
