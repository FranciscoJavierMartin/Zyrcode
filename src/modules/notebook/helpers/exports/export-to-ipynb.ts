import type { Cell } from '@/modules/cells/interfaces/store';
import type {
  NotebookIpynb,
  Cell as NotebookCell,
  CodeCell,
  MarkdownCell,
} from '@/modules/notebook/interfaces/ipynb';

function getCell(cell: Cell): NotebookCell {
  let notebookCell: NotebookCell;

  if (cell.language === 'markdown') {
    notebookCell = {
      cell_type: 'markdown',
      id: cell.id,
      source: cell.content,
    } as MarkdownCell;
  } else {
    notebookCell = {
      cell_type: 'code',
      id: cell.id,
      execution_count: null,
      source: cell.content,
      // outputs: []
    } as CodeCell;
  }

  return notebookCell;
}

export default function exportToIpynb(title: string, cells: Cell[]): void {
  // TODO: Validate via zod
  const notebook: NotebookIpynb = {
    nbformat: 4,
    nbformat_minor: 5,
    metadata: {
      title,
      orig_nbformat: 4,
      kernelspec: {
        display_name: 'Javascript (Node.js)',
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

  const blob = new Blob([JSON.stringify(notebook)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title || 'notebook'}.ipynb`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

/*const notebook: NotebookIpynb = {
  nbformat: 4,
  nbformat_minor: 5,
  metadata: {
    title,
    orig_nbformat: 4,
    kernelspec: {
      display_name: 'Javascript (Node.js)',
      name: 'javascript',
    },
    lenguage_info: {
      name: 'javascript',
      file_extension: 'js',
      mimetype: 'application/javascript',
    },
  },
  cells: [
    {
      cell_type: 'markdown',
      id: 'cell-0',
      metadata: {
        name: 'cell.0',
        tags: [],
        jupyter: {
          source_hidden: false,
        },
      },
      source: ['# Notebook Title'],
    },
    {
      cell_type: 'code',
      execution_count: null,
      id: 'cell-1',
      metadata: {
        collapsed: false,
        scrolled: 'auto',
        jupyter: {
          outputs_hidden: false,
          source_hidden: false,
        },
        tags: [],
        name: 'cell.1',
        execution: {
          'iopub.execute_input': '',
          'iopub.status.busy': '',
          'iopub.status.idle': '',
          'shell.execute_reply': '',
        },
      },
      source: "console.log('a')",
      outputs: [
        {
          output_type: 'stream',
          name: 'stdout',
          text: 'a',
        },
      ],
    },
  ],
};*/
