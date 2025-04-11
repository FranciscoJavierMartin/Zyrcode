<template>
  <Button
    variant="hover"
    @click="toggleTheme"
    class="bg-background size-9 cursor-pointer"
  >
    <Moon
      class="absolute size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <Sun
      class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">{{ $t('a11y.toggleTheme') }}</span>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/modules/common/components/ui/button';
import { useColorMode } from '@vueuse/core';
import { Sun, Moon } from 'lucide-vue-next';

const mode = useColorMode({ disableTransition: false });

function toggleTheme(): void {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
}
</script>
