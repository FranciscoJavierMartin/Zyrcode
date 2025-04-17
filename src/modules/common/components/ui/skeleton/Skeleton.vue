<template>
  <div
    data-slot="skeleton"
    :class="cn('bg-primary/10 animate-pulse rounded-md', props.class)"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/modules/common/helpers/utils';

interface SkeletonProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SkeletonProps>();
</script>
