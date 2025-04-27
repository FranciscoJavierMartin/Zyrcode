import type { Cell } from '@/modules/cells/interfaces/store';
import { errorToast } from '@/modules/common/helpers/toasts';
import { jsonSchema } from '@/modules/notebook/helpers/validators/json';
import downloadNotebook from '@/modules/notebook/helpers/exports/download-notebook';

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
    downloadNotebook(title, notebook, 'json');
  } catch (error) {
    console.log(error);
    errorToast(errorMessage);
  }
}
