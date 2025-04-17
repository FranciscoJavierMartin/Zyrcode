<template>
  <div
    v-html="sanitizedText"
    class="markdown-body h-full overflow-auto px-2 py-1"
    :class="theme"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import DOMPurify from 'dompurify';
import { useColorMode } from '@vueuse/core';

const props = defineProps<{ text: string }>();

const sanitizedText = computed<string>(() => DOMPurify.sanitize(props.text));
const theme = useColorMode();
</script>

<style src="@/assets/github-markdown.css" />
