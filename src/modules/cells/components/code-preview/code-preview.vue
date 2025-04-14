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
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
import { previewHTMLContainer } from '@/modules/cells/helpers/preview-html-container';

const iframe = useTemplateRef<HTMLIFrameElement>('iframe-preview');
const props = withDefaults(
  defineProps<{ id: string; code: string; error?: string }>(),
  {
    error: '',
  },
);

function handleMessage(
  response: MessageEvent<{ source: string; message: string[] }>,
) {
  if (response.data && response.data.source === 'iframe') {
    console.log('Received message from iframe:', response.data.message);
  }
}

watch(
  () => props.code,
  (newValue: string) => {
    iframe.value?.contentWindow?.postMessage(newValue, '*');
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});
</script>
