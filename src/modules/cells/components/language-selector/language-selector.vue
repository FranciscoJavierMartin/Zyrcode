<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="hover" class="h-8 cursor-pointer rounded shadow-sm">
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

const language = defineModel({
  type: String,
  required: true,
});
</script>

<style>
.language-option {
  padding-left: 8px;
  color: red;

  > span {
    display: none;
  }
}
</style>
