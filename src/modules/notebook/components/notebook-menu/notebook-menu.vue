<template>
  <Menubar>
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
          <RouterLink
            :to="{ name: ROUTES.SETTINGS.name, hash: '#ai-settings' }"
          >
            Settings
          </RouterLink>
        </MenubarItem>
        <MenubarItem>
          <a href="#">Ollama</a>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>

<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/modules/common/components/ui/menubar';
import { ROUTES } from '@/router/routes';
</script>
