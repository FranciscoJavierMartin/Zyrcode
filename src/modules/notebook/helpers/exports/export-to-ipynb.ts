import type { Cell } from '@/modules/cells/interfaces/store';
import type { NotebookIpynb } from '@/modules/notebook/interfaces/ipynb';

export default function exportToIpynb(title: string, cells: Cell[]): void {
  const notebook: NotebookIpynb = {
    cells: [
      {
        cell_type: 'markdown',
        metadata: {},
        source: ['# Multi-line statements and strings'],
      },
      {
        cell_type: 'code',
        execution_count: 1,
        metadata: {},
        outputs: [
          {
            data: {
              'text/plain': ['a'],
            },
            output_type: 'execute_result',
            execution_count: 1,
            metadata: {},
          },
        ],
        source: ["console.log('a')"],
      },
    ],
    metadata: {
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
        codemirror_mode: {
          name: '',
          version: 22,
        },
        nbconvert_exporter: 'javascript',
        pygments_lexer: 'javascript',
      },
    },
    nbformat: 3,
    nbformat_minor: 0,
  };
}
