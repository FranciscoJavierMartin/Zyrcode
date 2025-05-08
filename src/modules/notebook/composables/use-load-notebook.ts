import { useCellsStore } from '@/modules/cells/store/cells';
import { errorToast } from '@/modules/common/helpers/toasts';
import { parse, type BaseIssue, type BaseSchema } from 'valibot';
import { useI18n } from 'vue-i18n';
import { jsonSchema } from '@/modules/notebook/helpers/validators/json';
import { ipynbSchema } from '@/modules/notebook/helpers/validators/ipynb';

export default function useLoadNotebook() {
  const store = useCellsStore();
  const { t } = useI18n();

  function loadNotebook({
    accept,
    schema,
    setInStore,
  }: {
    accept: string;
    schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>;
    setInStore: (data: unknown) => void;
  }): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.className = 'hidden';
    input.hidden = true;
    input.accept = accept;

    input.onchange = (event: Event) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          try {
            const notebookDataRaw = JSON.parse(reader.result.toString());
            const notebookData = parse(schema, notebookDataRaw);
            setInStore(notebookData);
          } catch (error) {
            console.log(error);
            errorToast(t('notebook.menu.import.error'));
          }
        }
      };
      reader.readAsText((event.target as HTMLInputElement).files?.[0] as Blob);
    };

    input.click();
  }

  function loadNotebookFromJson() {
    loadNotebook({
      accept: '.json',
      schema: jsonSchema,
      setInStore: store.loadNotebook as (data: unknown) => void,
    });
  }

  function loadNotebookFromIpynb() {
    loadNotebook({
      accept: '.ipynb',
      schema: ipynbSchema,
      setInStore: store.loadNotebookFromIpynb as (data: unknown) => void,
    });
  }

  return {
    loadNotebookFromJson,
    loadNotebookFromIpynb,
  };
}
