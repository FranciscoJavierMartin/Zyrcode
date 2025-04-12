<template>
  <nav class="fixed top-0 flex w-full p-2">
    <router-link :to="{ name: ROUTES.HOME.name }" class="ml-4 flex-1 text-xl">
      {{ $t('appName') }}
    </router-link>
    <div class="flex flex-none items-center gap-3">
      <Button
        v-for="button of buttons"
        :key="button.route"
        variant="hover"
        as-child
        class="bg-background cursor-pointer"
      >
        <router-link
          :to="{ name: button.route }"
          active-class="bg-foreground !text-background"
        >
          <span class="hidden md:block">{{ $t(button.label) }}</span>
          <Component :is="button.icon" class="block size-5 md:hidden" />
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

const buttons = [
  {
    route: ROUTES.NOTEBOOK.name,
    icon: NotebookPen,
    label: 'notebooks',
  },
  {
    route: ROUTES.SETTINGS.name,
    icon: Settings,
    label: 'settings',
  },
];
</script>
