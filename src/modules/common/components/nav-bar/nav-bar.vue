<template>
  <nav class="bg-background fixed top-0 z-50 flex w-full justify-between p-2">
    <router-link :to="{ name: ROUTES.HOME.name }" class="ml-4 text-xl">
      {{ $t('appName') }}
    </router-link>
    <InputTitle
      v-if="isNotebookRoute"
      v-model="store.notebookTitle"
      :placeholder="$t('notebook.addTitlePlaceholder')"
      class="hidden w-full max-w-96 sm:flex lg:absolute lg:left-[calc(50%_-_192px)]"
      auto-focus
    />
    <div class="flex flex-none items-center gap-3">
      <Button
        v-for="button of buttons"
        :key="button.route"
        variant="hover"
        as-child
        class="cursor-pointer"
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NotebookPen, Settings } from 'lucide-vue-next';
import { ROUTES } from '@/router/routes';
import ToggleTheme from '@/modules/common/components/toggle-theme/toggle-theme.vue';
import { Button } from '@/modules/common/components/ui/button';
import InputTitle from '@/modules/common/components/input-title/input-title.vue';
import { useCellsStore } from '@/modules/cells/store/cells';

const route = useRoute();
const isNotebookRoute = computed<boolean>(
  () => route.name === ROUTES.NOTEBOOK.name,
);
const store = useCellsStore();

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
