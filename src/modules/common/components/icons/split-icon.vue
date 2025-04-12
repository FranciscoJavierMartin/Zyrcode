<template>
  <div :class="['border-foreground size-5 rounded-sm border-2', props.class]">
    <div
      class="animate-horizontal border-foreground -mt-[3px] -ml-0.5 h-px w-5 translate-y-2.5 border"
    />
    <div
      class="animate-vertical border-foreground -mt-px -ml-[3px] h-5 w-px translate-x-2.5 border"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ isHorizontal: boolean; class?: string }>(),
  {
    class: '',
  },
);
</script>

<style scoped>
.animate-horizontal {
  /* animation: animate-ruler 2s alternate ease-in-out; */
  transition: scale 2s;
}

.animate-vertical {
  /* animation: animate-ruler 2s reverse ease-in-out; */
  /* scale: 0; */
}

@keyframes animate-ruler {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
