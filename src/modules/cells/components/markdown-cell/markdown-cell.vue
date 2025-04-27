<template>
  <div class="min-h-[500px] w-full lg:min-h-[300px]">
    <CodeEditor
      :id
      v-model:code="code"
      language="markdown"
      class="min-h-[500px] w-full lg:min-h-[300px]"
    />
  </div>
</template>

<script setup lang="ts">
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';

defineProps<{ id: string }>();
const code = defineModel<string>('code', { required: true });
</script>
