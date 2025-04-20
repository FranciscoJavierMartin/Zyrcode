<template>
  <Menubar class="bg-background fixed top-13 z-10 border-none shadow-none">
    <MenubarMenu>
      <MenubarTrigger>Notebook</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Rename</MenubarItem>
        <MenubarItem>Reload <MenubarShortcut></MenubarShortcut> </MenubarItem>
        <MenubarItem>Clear all</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Import</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Import from JSON</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Export</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Export as HTML</MenubarItem>
        <MenubarItem disabled>Export as PDF</MenubarItem>
        <MenubarItem disabled>Export as JSON</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>AI options</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <a href="/Zyrcode/settings/#ai-settings" class="w-full"> Settings </a>
        </MenubarItem>
        <MenubarItem>
          <a href="https://ollama.com/" class="flex w-full justify-between">
            Ollama <ExternalLink />
          </a>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>

<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/modules/common/components/ui/menubar';
</script>
