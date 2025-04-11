<template>
  <nav class="fixed flex w-full p-2">
    <router-link :to="{ name: ROUTES.HOME.name }" class="ml-4 flex-1 text-xl">
      {{ $t('appName') }}
    </router-link>
    <div class="flex flex-none items-center gap-3">
      <Button variant="hover" as-child class="bg-background cursor-pointer">
        <router-link
          :to="{ name: ROUTES.NOTEBOOK.name }"
          active-class="bg-foreground !text-background"
        >
          <span class="hidden md:block">{{ $t('notebooks') }}</span>
          <NotebookPen class="block size-[1.2rem] md:hidden" />
        </router-link>
      </Button>
      <Button variant="hover" as-child class="bg-background cursor-pointer">
        <router-link
          :to="{ name: ROUTES.SETTINGS.name }"
          active-class="bg-foreground !text-background"
        >
          <span class="hidden md:block">{{ $t('settings') }}</span>
          <Settings class="block size-[1.2rem] md:hidden" />
        </router-link>
      </Button>
      <ToggleTheme />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ROUTES } from '@/router/routes';
import ToggleTheme from '@/modules/common/components/toggle-theme/toggle-theme.vue';
import { Button } from '@/modules/common/components/ui/button';
import { NotebookPen, Settings } from 'lucide-vue-next';
</script>
