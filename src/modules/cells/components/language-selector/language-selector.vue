<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-chil class="w-32">
      <Button
        variant="outline"
        class="bg-background h-8 cursor-pointer rounded capitalize shadow-xs"
      >
        <TypescriptIcon v-if="language === 'typescript'" />
        <JavascriptIcon v-if="language === 'javascript'" />
        {{ language }}
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
import JavascriptIcon from '@/modules/common/components/icons/javascript-icon.vue';
import TypescriptIcon from '@/modules/common/components/icons/typescript-icon.vue';
import { Button } from '@/modules/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/modules/common/components/ui/dropdown-menu';
import type { Language } from '@/modules/cells/interfaces/languages';
import MarkdownIcon from '@/modules/common/components/icons/markdown-icon.vue';

const language = defineModel<Language>({
  required: true,
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
