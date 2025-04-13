<template>
  <div class="relative h-full">
    <iframe
      title="code preview"
      ref="iframe-preview"
      :srcdoc="previewHTMLContainer"
      sandbox="allow-scripts"
      class="w-full"
    />
    <div v-if="error" class="absolute top-2.5 left-2.5 text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import { previewHTMLContainer } from '@/modules/cells/helpers/preview-html-container';
const iframe = useTemplateRef<HTMLIFrameElement>('iframe-preview');
const props = withDefaults(defineProps<{ code: string; error?: string }>(), {
  error: '',
});

watch(
  () => props.code,
  (newValue: string) => {
    iframe.value?.contentWindow?.postMessage(newValue, '*');
  },
  { immediate: true },
);
</script>
