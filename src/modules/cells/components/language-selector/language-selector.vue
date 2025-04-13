<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-chil>
      <Button
        variant="outline"
        class="bg-background size-8 cursor-pointer rounded capitalize shadow-xs lg:w-32"
      >
        <Component :is="languageIcon" v-memo="[language]" />
        <span class="hidden lg:block">{{ language }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuRadioGroup v-model="language">
        <DropdownMenuRadioItem value="typescript" class="language-option">
          <TypescriptIcon />
          TypeScript
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="javascript" class="language-option">
          <JavascriptIcon />
          JavaScript
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="markdown" class="language-option">
          <MarkdownIcon />
          Markdown
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import JavascriptIcon from '@/modules/common/components/icons/javascript-icon.vue';
import TypescriptIcon from '@/modules/common/components/icons/typescript-icon.vue';
import MarkdownIcon from '@/modules/common/components/icons/markdown-icon.vue';
import { Button } from '@/modules/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/modules/common/components/ui/dropdown-menu';
import type { Language } from '@/modules/cells/interfaces/code';

const language = defineModel<Language>({
  required: true,
});

const languageIcon = computed(() => {
  let icon;

  switch (language.value) {
    case 'javascript':
      icon = JavascriptIcon;
      break;
    case 'typescript':
      icon = TypescriptIcon;
      break;
    case 'markdown':
      icon = MarkdownIcon;
      break;
  }

  return icon;
});
</script>

<style>
.language-option {
  padding-left: 8px;

  > span {
    display: none;
  }
}
</style>
