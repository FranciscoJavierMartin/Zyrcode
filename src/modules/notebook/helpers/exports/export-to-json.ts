import type { Cell } from '@/modules/cells/interfaces/store';
import { errorToast } from '@/modules/common/composables/toasts';
import { jsonSchema } from '@/modules/notebook/helpers/validators/json';

export default function exportToJson(
  title: string,
  cells: Cell[],
  errorMessage: string,
): void {
  const notebook = {
    title,
    order: cells.map((cell) => cell.id),
    cells: cells.reduce((acc: Record<string, Cell>, current: Cell) => {
      acc[current.id] = current;
      return acc;
    }, {}),
  };

  try {
    jsonSchema.parse(notebook);

    const blob = new Blob([JSON.stringify(notebook)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'notebook'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  } catch (error) {
    console.log(error);
    errorToast(errorMessage);
  }
}
