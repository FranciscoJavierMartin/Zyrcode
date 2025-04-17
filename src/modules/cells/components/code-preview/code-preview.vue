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
import { getPreviewHTMLContainer } from '@/modules/cells/helpers/preview-html-container';
import type {
  LogLevel,
  OutputPreviewData,
} from '@/modules/cells/interfaces/preview';
import { generateRandomID } from '@/modules/common/helpers/random';

const iframe = useTemplateRef<HTMLIFrameElement>('iframe-preview');
const props = withDefaults(
  defineProps<{ id: string; code: string; error?: string }>(),
  {
    error: '',
  },
);
const emit = defineEmits<{
  (e: 'output', value: OutputPreviewData[]): void;
}>();
const previewHTMLContainer = getPreviewHTMLContainer(props.id);

function handleMessage(
  response: MessageEvent<{
    id: string;
    source: string;
    lineNumber: number;
    method: LogLevel;
    message: unknown[];
  }>,
) {
  if (
    response.data &&
    response.data.source === 'code-preview' &&
    response.data.id === props.id
  ) {
    emit(
      'output',
      response.data.message.map<OutputPreviewData>((message) => ({
        id: generateRandomID(),
        data: message,
        logLevel: response.data.method,
      })),
    );
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
