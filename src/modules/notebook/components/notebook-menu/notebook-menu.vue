<template>
  <Menubar
    class="bg-background fixed top-13 z-10 w-full border-none shadow-none"
  >
    <MenubarMenu>
      <MenubarTrigger>Notebook</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled>
          {{ $t('notebook.menu.notebook.rename') }}
        </MenubarItem>
        <MenubarItem @click="reloadPage">
          {{ $t('notebook.menu.notebook.reload') }}
          <MenubarShortcut>
            {{ isMacOS ? 'Cmd + R' : 'Ctrl + R' }}
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem :disabled="store.isEmpty" @click="store.clearAll()">
          {{ $t('notebook.menu.notebook.clearAll') }}
        </MenubarItem>
        <MenubarItem @click="clearCache">
          {{ $t('notebook.menu.notebook.clearCache') }}
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>
        {{ $t('notebook.menu.import.title') }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem @select="loadNotebookFromJson">
          {{ $t('notebook.menu.import.json') }}
        </MenubarItem>
        <MenubarItem @select="loadNotebookFromIpynb">
          {{ $t('notebook.menu.import.ipynb') }}
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>
        {{ $t('notebook.menu.export.title') }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled @click="exportAsHTML">
          {{ $t('notebook.menu.export.html') }}
        </MenubarItem>
        <MenubarItem disabled>
          {{ $t('notebook.menu.export.pdf') }}
        </MenubarItem>
        <MenubarItem :disabled="store.isEmpty" @click="exportAsJson">
          {{ $t('notebook.menu.export.json') }}
        </MenubarItem>
        <MenubarItem :disabled="store.isEmpty" @click="exportAsIpynb">
          {{ $t('notebook.menu.export.ipynb') }}
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>
        {{ $t('notebook.menu.ai.title') }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <a href="/Zyrcode/settings/#ai-settings" class="w-full">
            {{ $t('settings.name') }}
          </a>
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
import exportToJson from '@/modules/notebook/helpers/exports/export-to-json';
import { errorToast, successToast } from '@/modules/common/helpers/toasts';
import { clearCache as clearCacheHelper } from '@/modules/common/helpers/package-cache';
import useLoadNotebook from '@/modules/notebook/composables/use-load-notebook';

const store = useCellsStore();
const isMacOS = computed<boolean>(() => isMacOSInfo());
const { t } = useI18n();
const { loadNotebookFromJson, loadNotebookFromIpynb } = useLoadNotebook();

function reloadPage(): void {
  location.reload();
}

function exportAsHTML(): void {
  // exportToHtml({ title: store.notebookTitle, cells: store.cells });
}

function exportAsIpynb(): void {
  exportToIpynb(
    store.notebookTitle,
    store.cells,
    t('notebook.menu.export.error'),
  );
}

function exportAsJson(): void {
  exportToJson(
    store.notebookTitle,
    store.cells,
    t('notebook.menu.export.error'),
  );
}

async function clearCache(): Promise<void> {
  try {
    await clearCacheHelper();
    successToast('Cache cleared successfully');
  } catch {
    errorToast('Error clearing cache');
  }
}
</script>
