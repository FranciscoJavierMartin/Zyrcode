import { parseMarkdown } from '@/modules/cells/helpers/markdown';
import type { Cell } from '@/modules/cells/interfaces/store';

function getStyles(): string {
  return `
.container {
  max-width: 1024px;
  margin-inline: auto;
  font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  .title {
    text-align: center;
  }

  .cell-container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .cell {
      display: grid;
      height: auto;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 300px auto;

      .iframe-container {
        position: relative;
        height: 100%;

        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        #error {
          position: absolute;
          top: 10px;
          left: 10px;
          color: red;
          z-index: 10;
        }
      }

      .console-output {
        grid-column: span 2 / span 2;
        margin-top: 8px;

        ol {
          list-style: none;
          interpolate-size: allow-keywords;
          padding-inline-start: 0px;

          .log-item {
            border-bottom: 1px solid #90a1b9;
            padding: 6px 0px 6px 8px;
            font-size: 12px;

            &:first-of-type {
              padding-top: 8px;
            }

            &:last-of-type {
              border: none;
              padding-bottom: 8px;
            }

            &.info,
            .debug,
            .log {
              background-color: oklch(1 0 0);
            }

            &.error {
              background-color: oklch(0.577 0.245 27.325) 50%;
            }

            &.warn {
              background-color: oklch(0.554 0.135 66.442) 50%;
              color: oklch(1 0 0);
            }
          }
        }
      }
    }

    .markdown-body {
      height: 100%;
      padding: 4px 8px;
    }
  }
}
  `;
}

function getIframe(): string {
  return `
  <div class="iframe-container">
    <div id="error"></div>
  </div>
  `;
}

function getConsoleOutput(output: string, logLevel: string): string {
  return `<li class="log-item ${logLevel}">${output}</li>`;
}

function getConsoleOutputs(): string {
  return `
    <div class="console-output">
      <ol>
      </ol>
    </div>
  `;
}

function getCodeCell(content: string): string {
  return `
    <div class="cell">
      <textarea value="${content}"></textarea>
      ${getIframe()}
      ${getConsoleOutputs()}
    </div>
  `;
}

async function getMarkdownCell(content: string): Promise<string> {
  const { code, error } = await parseMarkdown(content);
  return !error
    ? `
    <div class="markdown-body">
      ${code}
    </div>
  `
    : '';
}

async function getCells(cells: Cell[]): Promise<string> {
  const promisedCells = await Promise.allSettled(
    cells.map((cell) =>
      cell.language !== 'markdown'
        ? getCodeCell(cell.content)
        : getMarkdownCell(cell.content),
    ),
  ).then((res) =>
    res.map((result) => (result.status === 'fulfilled' ? result.value : '')),
  );

  return promisedCells.join('');
}

function getNotebookTitle(title?: string): string {
  return title ? `<h1 class="title">${title}</h1>` : '';
}

async function getNoteboolHTML({
  title,
  cells,
}: {
  title?: string;
  cells: Cell[];
}): Promise<string> {
  return `
    <div class="container">
      ${getNotebookTitle(title)}
      <div class="cell-container">
        ${await getCells(cells)}
      </div>
    </div>
  `;
}

export default async function exportToHtml({
  title,
  cells,
}: {
  title?: string;
  cells: Cell[];
}): Promise<void> {
  const htmlContent = await getNoteboolHTML({ title, cells });
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = title || 'notebook.html';
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
