<template>
  <nav class="fixed flex w-full p-2">
    <router-link :to="{ name: ROUTES.HOME.name }" class="ml-4 flex-1 text-xl">
      {{ $t('appName') }}
    </router-link>
    <div class="flex flex-none items-center gap-3">
      <Button variant="hover" as-child class="bg-background cursor-pointer">
        <router-link :to="{ name: ROUTES.SETTINGS.name }">
          <Icon
            icon="radix-icons:pencil-2"
            class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
        </router-link>
      </Button>
      <Button variant="hover" as-child class="bg-background cursor-pointer">
        <router-link :to="{ name: ROUTES.SETTINGS.name }">
          <Icon
            icon="radix-icons:gear"
            class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
        </router-link>
      </Button>
      <ToggleTheme />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ROUTES } from '@/router/routes';
import ToggleTheme from '@/modules/common/components/toggle-theme/toggle-theme.vue';
import { Button } from '@/components/ui/button';
</script>
