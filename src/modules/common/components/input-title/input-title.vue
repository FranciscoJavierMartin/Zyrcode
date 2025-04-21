<template>
  <div :class="cn('flex flex-col justify-center', props.class)">
    <Input
      v-if="showInput"
      v-model="value"
      :placeholder
      class="h-9 w-full"
      @blur="toggleShowInput"
      @vue:mounted="focusOnMount"
    />
    <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
    <h1
      v-else
      role="button"
      class="h-9 w-full px-3 py-1 text-center text-ellipsis"
      @dblclick="toggleShowInput"
    >
      {{ value }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, type HTMLAttributes, type VNode } from 'vue';
import { Input } from '@/modules/common/components/ui/input';
import { cn } from '@/modules/common/helpers/utils';

const props = defineProps<{
  placeholder?: string;
  autoFocus?: boolean;
  class?: HTMLAttributes['class'];
}>();
const showInput = ref<boolean>(props.autoFocus);
const value = defineModel<string>({ required: true });

function toggleShowInput(): void {
  showInput.value = !showInput.value;
}

function focusOnMount(element: VNode): void {
  element.el?.focus();
}
</script>
