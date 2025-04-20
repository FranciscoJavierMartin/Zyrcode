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
      <TooltipButton
        :text="
          isConsoleOpen
            ? $t('notebook.toolbar.hideConsole')
            : $t('notebook.toolbar.showConsole')
        "
      >
        <Button
          :disabled="!areOutputsAvailable"
          variant="hover"
          class="button-icon"
          @click="isConsoleOpen = !isConsoleOpen"
        >
          <Terminal class="size-5" />
        </Button>
      </TooltipButton>
      <TooltipButton :text="$t('notebook.toolbar.clearConsole')">
        <Button
          :disabled="!areOutputsAvailable"
          variant="hover"
          class="button-icon"
          @click="$emit('clear-outputs')"
        >
          <MessageCircleOff class="size-5" />
        </Button>
      </TooltipButton>
      <TooltipButton
        :text="$t('notebook.toolbar.splitHorizontal')"
        v-if="isLargeScreen"
      >
        <Button
          variant="hover"
          class="button-icon group"
          @click="$emit('toggle-direction')"
        >
          <SplitIcon :is-horizontal="direction === 'horizontal'" />
        </Button>
      </TooltipButton>
      <TooltipButton :text="$t('notebook.toolbar.formatCode')">
        <Button
          :disabled="!isCodeAvailable"
          variant="hover"
          class="button-icon"
          @click="$emit('format')"
        >
          <PencilRuler class="size-5" />
        </Button>
      </TooltipButton>
      <RemoveCellDialog :id />
      <TooltipButton :text="$t('notebook.toolbar.addCellBelow')">
        <Button variant="hover" class="button-icon" @click="addCellBelow">
          <Plus class="size-5" />
        </Button>
      </TooltipButton>
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
  Plus,
  Terminal,
} from 'lucide-vue-next';
import LanguageSelector from '@/modules/cells/components/language-selector/language-selector.vue';
import SplitIcon from '@/modules/common/components/icons/split-icon.vue';
import RemoveCellDialog from '@/modules/cells/components/remove-cell-dialog/remove-cell-dialog.vue';
import { useCellsStore } from '@/modules/cells/store/cells';
import type { Language } from '@/modules/cells/interfaces/code';
import Button from '@/modules/common/components/ui/button/Button.vue';
import TooltipButton from '@/modules/common/components/ui/tooltip-button/tooltip-button.vue';

const props = defineProps<{
  id: string;
  direction: 'horizontal' | 'vertical';
  isLargeScreen: boolean;
  language: Language;
  areOutputsAvailable: boolean;
  isCodeAvailable: boolean;
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

function addCellBelow(): void {
  store.addCellBelow(props.id, props.language);
}
</script>
