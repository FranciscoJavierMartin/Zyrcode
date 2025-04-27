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
        <MenubarItem @select="openInput">
          {{ $t('notebook.menu.import.json') }}
          <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
          <input
            ref="notebookJson"
            type="file"
            class="hidden"
            hidden
            accept=".json"
            @change="uploadNotebookJson"
          />
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
            {{ $t('settings') }}
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
import { computed, useTemplateRef } from 'vue';
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
import { jsonSchema } from '@/modules/notebook/helpers/validators/json';
import { errorToast, successToast } from '@/modules/common/helpers/toasts';
import { clearCache as clearCacheHelper } from '@/modules/common/helpers/package-cache';

const notebookJson = useTemplateRef('notebookJson');
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

function openInput(): void {
  notebookJson.value?.click();
}

function uploadNotebookJson(e: Event): void {
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      try {
        const notebookDataRaw = JSON.parse(reader.result.toString());
        const notebookData = jsonSchema.parse(notebookDataRaw);
        store.loadNotebook(notebookData);
      } catch (error) {
        console.log(error);
        errorToast(t('notebook.menu.import.error'));
      }
    }
  };
  reader.readAsText((e.target as HTMLInputElement).files?.[0] as Blob);
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
