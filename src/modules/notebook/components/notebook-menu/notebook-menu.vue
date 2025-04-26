<template>
  <Menubar
    class="bg-background fixed top-13 z-10 w-full border-none shadow-none"
  >
    <MenubarMenu>
      <MenubarTrigger>Notebook</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled>Rename</MenubarItem>
        <MenubarItem @click="reloadPage">
          Reload
          <MenubarShortcut>
            {{ isMacOS ? 'Cmd + R' : 'Ctrl + R' }}
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem :disabled="store.isEmpty" @click="store.clearAll()">
          Clear all
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Import</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled>Import from JSON</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Export</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled @click="exportAsHTML">
          Export as HTML
        </MenubarItem>
        <MenubarItem disabled>Export as PDF</MenubarItem>
        <MenubarItem disabled>Export as JSON</MenubarItem>
        <MenubarItem :disabled="store.isEmpty" @click="exportAsIpynb">
          Export as ipynb
        </MenubarItem>
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
import { computed } from 'vue';
import { ExternalLink } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/modules/common/components/ui/menubar';
import isMacOSInfo from '@/modules/common/helpers/is-mac-os';
import { useCellsStore } from '@/modules/cells/store/cells';
import exportToIpynb from '@/modules/notebook/helpers/exports/export-to-ipynb';

const store = useCellsStore();
const isMacOS = computed<boolean>(() => isMacOSInfo());
const { t } = useI18n();

function reloadPage(): void {
  location.reload();
}

function exportAsHTML(): void {
  // exportToHtml({ title: store.notebookTitle, cells: store.cells });
}

function exportAsIpynb(): void {
  exportToIpynb(store.notebookTitle, store.cells, t('notebook.export.error'));
}
</script>
