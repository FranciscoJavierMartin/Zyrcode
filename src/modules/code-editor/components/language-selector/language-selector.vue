<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline"> Open </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="lang">
        <DropdownMenuRadioItem value="top"> Top </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom"> Bottom </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right"> Right </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { Button } from '@/modules/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/modules/common/components/ui/dropdown-menu';

const lang = defineModel({
  type: String,
  required: true,
});
</script>
