<template>
  <button>
    <Terminal class="icon" />
    <span> Hakuna Matata </span>
  </button>
</template>

<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';
</script>

<style scoped>
button {
  background-color: #099;
  color: white;
  height: 32px;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 12px 8px;
  max-width: 32px;
  overflow: hidden;
  transition: max-width 1s;

  &:hover {
    max-width: 300px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  span {
    white-space: nowrap;
  }
}
</style>
