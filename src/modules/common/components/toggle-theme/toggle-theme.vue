<template>
  <Button variant="hover" @click="toggleTheme" class="size-9 cursor-pointer">
    <Moon
      class="absolute size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <Sun
      class="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">{{ $t('a11y.toggleTheme') }}</span>
  </Button>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Sun, Moon } from 'lucide-vue-next';
import { Button } from '@/modules/common/components/ui/button';

const theme = useColorMode({ disableTransition: false });

function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
