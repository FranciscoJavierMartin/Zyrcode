<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="hover" class="h-8 cursor-pointer rounded shadow-sm">
        {{ language }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuRadioGroup v-model="language">
        <DropdownMenuRadioItem value="typescript">
          TypeScript
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="javascript">
          JavaScript
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
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
