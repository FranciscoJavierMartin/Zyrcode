<template>
  <div>
    <CodeEditor v-model="input" language="typescript" />
    <p>{{ input }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';

const input = ref('const a = 12356;');
</script>
