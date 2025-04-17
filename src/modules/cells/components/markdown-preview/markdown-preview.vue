<template>
  <div v-html="sanitizedText" class="h-full" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import DOMPurify from 'dompurify';

const props = defineProps<{ text: string }>();

const sanitizedText = computed<string>(() => DOMPurify.sanitize(props.text));
</script>
