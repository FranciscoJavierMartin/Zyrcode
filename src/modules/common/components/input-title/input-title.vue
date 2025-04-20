<template>
  <div class="flex max-w-96 flex-col">
    <Input
      v-if="showInput"
      v-model="value"
      placeholder="Enter your title"
      class="h-9 w-full"
      @blur="showInput = false"
    />
    <h1 v-else class="h-9 w-full" @dblclick="showInput = true">{{ value }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Input } from '@/modules/common/components/ui/input';
const value = ref<string>('');
const showInput = ref<boolean>(false);

onMounted(() => {
  showInput.value = true;
});
</script>

<style></style>
