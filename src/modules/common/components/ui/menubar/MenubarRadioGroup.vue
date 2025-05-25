<template>
  <MenubarRadioGroup data-slot="menubar-radio-group" v-bind="forwarded">
    <slot />
  </MenubarRadioGroup>
</template>

<script setup lang="ts">
import {
  MenubarRadioGroup,
  type MenubarRadioGroupEmits,
  type MenubarRadioGroupProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<MenubarRadioGroupProps>();
const emits = defineEmits<MenubarRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
