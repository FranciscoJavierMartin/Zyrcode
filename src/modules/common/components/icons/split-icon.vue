<template>
  <div
    :class="[
      'border-foreground group-hover:border-background size-5 rounded-[4px] border-2',
      props.class,
    ]"
  >
    <div
      :class="[
        'ruler -mt-[3px] -ml-0.5 h-px w-5 translate-y-2.5',
        {
          'scale-0': isHorizontal,
        },
      ]"
    />
    <div
      :class="[
        'ruler -mt-px -ml-[3px] h-5 w-px translate-x-2.5',
        {
          'scale-0': !isHorizontal,
        },
      ]"
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
@reference '@/assets/styles.css';

.ruler {
  @apply border-foreground group-hover:border-background border transition-transform duration-[5s];
}
</style>
