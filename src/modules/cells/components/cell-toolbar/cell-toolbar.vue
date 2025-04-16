<template>
  <div class="mb-2 flex px-3">
    <div class="flex flex-1 gap-2">
      <Button
        :disabled="isFirstCell"
        variant="hover"
        class="button-icon"
        @click="moveUp"
      >
        <ArrowUp class="size-5" />
      </Button>
      <Button
        :disabled="isLastCell"
        variant="hover"
        class="button-icon"
        @click="moveDown"
      >
        <ArrowDown class="size-5" />
      </Button>
    </div>
    <div class="flex items-center gap-2">
      <IconTextButton
        :text="
          isConsoleOpen
            ? $t('notebook.toolbar.hideConsole')
            : $t('notebook.toolbar.showConsole')
        "
        @click="isConsoleOpen = !isConsoleOpen"
      >
        <Terminal class="size-5" />
      </IconTextButton>
      <IconTextButton
        :text="$t('notebook.toolbar.clearConsole')"
        @click="$emit('clear-outputs')"
      >
        <MessageCircleOff class="size-5" />
      </IconTextButton>
      <IconTextButton
        v-if="isLargeScreen"
        :text="$t('notebook.toolbar.splitHorizontal')"
        class="group"
        @click="$emit('toggle-direction')"
      >
        <SplitIcon :is-horizontal="direction === 'horizontal'" />
      </IconTextButton>
      <IconTextButton
        :text="$t('notebook.toolbar.formatCode')"
        @click="$emit('format')"
      >
        <PencilRuler class="size-5" />
      </IconTextButton>
      <RemoveCellDialog :id />
      <LanguageSelector :language @update:language="updateLanguage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ArrowDown,
  ArrowUp,
  MessageCircleOff,
  PencilRuler,
  Terminal,
} from 'lucide-vue-next';
import LanguageSelector from '@/modules/cells/components/language-selector/language-selector.vue';
import SplitIcon from '@/modules/common/components/icons/split-icon.vue';
import RemoveCellDialog from '@/modules/cells/components/remove-cell-dialog/remove-cell-dialog.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import type { Language } from '@/modules/cells/interfaces/code';
import Button from '@/modules/common/components/ui/button/Button.vue';
import IconTextButton from '@/modules/common/components/ui/icon-text-button/icon-text-button.vue';

const props = defineProps<{
  id: string;
  direction: 'horizontal' | 'vertical';
  isLargeScreen: boolean;
  language: Language;
}>();
defineEmits<{
  (e: 'format'): void;
  (e: 'toggle-direction'): void;
  (e: 'clear-outputs'): void;
}>();
const isConsoleOpen = defineModel<boolean>('is-console-open', {
  required: true,
});
const store = useCellsStore();
const isFirstCell = computed<boolean>(() => store.cells[0].id === props.id);
const isLastCell = computed<boolean>(
  () => store.cells[store.cells.length - 1].id === props.id,
);

function updateLanguage(language: Language): void {
  store.updateLanguage({ id: props.id, language });
}

function moveUp(): void {
  store.moveCell(props.id, 'up');
}

function moveDown(): void {
  store.moveCell(props.id, 'down');
}
</script>
