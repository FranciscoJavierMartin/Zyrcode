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
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  width: auto;
  max-width: 32px;
  transition: max-width 1s;

  &:hover {
    max-width: 300px;
  }

  .icon {
    margin-right: 15px;
    /* padding: 0px 8px; */
    display: flex;
    align-items: center;
    width: 16px;
    height: 16px;
  }

  span {
    white-space: nowrap;
    padding-right: 15px;
  }
}
</style>
