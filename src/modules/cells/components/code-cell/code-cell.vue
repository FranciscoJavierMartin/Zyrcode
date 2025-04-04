<template>
  <div>
    <CodeEditor v-model="code" language="typescript" />
    <p>{{ transpiledCode }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CodeEditor from '@/modules/code-editor/components/code-editor/code-editor.vue';
import { debounce } from '@/modules/common/helpers/debounce';
import { transpile } from '@/modules/cells/helpers/bundler';

const code = ref<string>(`const a = 12356;\nconsole.log(a);`);
const transpiledCode = ref<string>('');

watch(
  () => code.value,
  debounce(async (newValue: string) => {
    transpiledCode.value = await transpile(newValue);
  }, 500),
);
</script>
