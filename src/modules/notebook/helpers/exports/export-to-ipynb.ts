import type { Cell } from '@/modules/cells/interfaces/store';
import type { NotebookIpynb } from '@/modules/notebook/interfaces/ipynb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function exportToIpynb(title: string, cells: Cell[]): void {
  const notebook: NotebookIpynb = {
    worksheets: [
      {
        cells: [
          {
            cell_type: 'markdown',
            metadata: {},
            language: 'python',
            input: ['# Multi-line statements and strings'],
            outputs: [
              {
                output_type: 'stream',
                stream: 'stdout',
                text: ['Multi-line statements and strings'],
              },
            ],
            collapsed: false,
            prompt_number: 0,
          },
          {
            cell_type: 'code',
            metadata: {},
            input: ["console.log('a')"],
            language: 'python',
            collapsed: false,
            prompt_number: 1,
            outputs: [
              {
                output_type: 'stream',
                stream: 'stdout',
                text: ['a'],
              },
            ],
          },
        ],
        metadata: {},
      },
    ],
    metadata: {
      name: '',
      kernelspec: {
        display_name: 'Javascript (Node.js)',
        language: 'javascript',
        name: 'javascript',
      },
      language_info: {
        name: 'typescript',
        mimetype: 'application/javascript',
        file_extension: 'ts',
        version: '22.14.0',

        // codemirror_mode: {
        //   name: '',
        //   version: 22,
        // },
        // nbconvert_exporter: 'javascript',
        // pygments_lexer: 'javascript',
      },
    },
    nbformat: 3,
    nbformat_minor: 0,
  };

  const blob = new Blob([JSON.stringify(notebook)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = title || 'notebook.ipynb';
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
