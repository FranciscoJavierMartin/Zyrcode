<template>
  <div class="h-full">
    <iframe
      title="code preview"
      ref="iframe-preview"
      :srcdoc="previewHTMLContainer"
      sandbox="allow-scripts"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import { previewHTMLContainer } from '@/modules/cells/helpers/preview-html-container';
const iframe = useTemplateRef<HTMLIFrameElement>('iframe-preview');
const props = defineProps<{ code: string }>();

watch(
  () => props.code,
  (newValue: string) => {
    iframe.value?.contentWindow?.postMessage(newValue, '*');
  },
  { immediate: true },
);
</script>
