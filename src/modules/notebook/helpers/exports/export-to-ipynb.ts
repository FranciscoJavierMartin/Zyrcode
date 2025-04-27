import { parse } from 'valibot';
import type { Cell } from '@/modules/cells/interfaces/store';
import type {
  NotebookIpynb,
  Cell as NotebookCell,
  CodeCell,
  MarkdownCell,
  Output as ConsoleOutput,
  Stream as ConsoleOutputStream,
} from '@/modules/notebook/interfaces/ipynb';
import { ipynbSchema } from '@/modules/notebook/helpers/validators/ipynb';
import { errorToast } from '@/modules/common/helpers/toasts';
import downloadNotebook from '@/modules/notebook/helpers/exports/download-notebook';

function getCellOutputs(id: string): ConsoleOutput[] {
  const outputs: ConsoleOutput[] = [];

  document.querySelectorAll(`#${id} .log-item`).forEach((logItem) => {
    const logLevel = logItem.classList
      .toString()
      .replace('log-item', '')
      .replace(' ', '');

    switch (logLevel) {
      case 'info':
      case 'debug':
      case 'log':
      case 'warn':
        outputs.push({
          output_type: 'stream',
          name: 'stdout',
          text: logItem.textContent ?? '',
        } as ConsoleOutputStream);
        break;
      case 'error':
        outputs.push({
          output_type: 'stream',
          name: 'stderr',
          text: logItem.textContent ?? '',
        } as ConsoleOutputStream);
        break;
    }
  });

  return outputs;
}

function getCell(cell: Cell, index: number): NotebookCell {
  let notebookCell: NotebookCell;

  if (cell.language === 'markdown') {
    notebookCell = {
      cell_type: 'markdown',
      id: cell.id,
      source: cell.content,
      metadata: {
        jupyter: {
          source_hidden: true,
        },
        name: cell.id,
        tags: [],
      },
    } as MarkdownCell;
  } else {
    const date = new Date().toISOString();

    notebookCell = {
      cell_type: 'code',
      id: cell.id,
      execution_count: index + 1,
      metadata: {
        collapsed: false,
        scrolled: false,
        execution: {
          'iopub.execute_input': date,
          'iopub.status.busy': date,
          'iopub.status.idle': date,
          'shell.execute_reply': date,
        },
        jupyter: {
          outputs_hidden: false,
          source_hidden: false,
        },
        name: cell.id,
        tags: [],
      },
      source: cell.content,
      outputs: getCellOutputs(cell.id),
    } as CodeCell;
  }

  return notebookCell;
}

export default function exportToIpynb(
  title: string,
  cells: Cell[],
  errorMessage: string,
): void {
  const notebook: NotebookIpynb = {
    nbformat: 4,
    nbformat_minor: 5,
    metadata: {
      title,
      orig_nbformat: 4,
      kernelspec: {
        display_name: 'Javascript',
        name: 'javascript',
      },
      lenguage_info: {
        name: 'javascript',
        file_extension: 'js',
        mimetype: 'application/javascript',
      },
    },
    cells: cells.map(getCell),
  };

  try {
    parse(ipynbSchema, notebook);
    downloadNotebook(title, notebook, 'ipynb');
  } catch {
    errorToast(errorMessage);
  }
}
