<template>
  <nav class="fixed flex w-full justify-end p-2">
    <ToggleTheme />
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import ToggleTheme from '@/modules/common/components/toggle-theme/toggle-theme.vue';
</script>
