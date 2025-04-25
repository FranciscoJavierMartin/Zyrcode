export interface NotebookIpynb {
  metadata: NotebookIpynbMetadata;
  nbformat: number;
  nbformat_minor: number;
  cells: Cell[];
}

interface KernelSpec {
  name: string;
  display_name: string;
}

interface LanguageInfo {
  name: string;
  codemirror_mode?: string | object;
  file_extension?: string;
  mimetype?: string;
  pygments_lexer?: string;
}

interface NotebookIpynbMetadata {
  kernelspec?: KernelSpec;
  lenguage_info?: LanguageInfo;
  orig_nbformat: number;
  title?: string;
  authors?: { name: string }[];
}

export interface MarkdownCell {
  id: string;
  cell_type: 'markdown';
  metadata: {
    name: string;
    tags: string[];
    jupyter: {
      source_hidden: boolean;
    };
  };
  source: Source;
}

export interface CodeCell {
  id: string;
  cell_type: 'code';
  metadata: {
    name: string;
    tags: string[];
    jupyter: {
      source_hidden: boolean;
      outputs_hidden: boolean;
    };
    execution: {
      'iopub.execute_input': string;
      'iopub.status.busy': string;
      'iopub.status.idle': string;
      'shell.execute_reply': string;
    };
    collapsed: boolean;
    scrolled: boolean | 'auto';
  };
  source: Source;
  outputs: Output[];
  execution_count: number | null;
}

interface RawCell {
  id: string;
  cell_type: 'raw';
  metadata: {
    format: string;
    jupyter: {
      source_hidden: boolean;
    };
    name: string;
    tags: string[];
  };
  source: Source;
}

export type Cell = MarkdownCell | CodeCell | RawCell;

type Source = MultilineString;

type Output = ExecutedResult | DisplayData | Stream | Error;

interface ExecutedResult {
  output_type: 'execute_result';
  execution_count: number | null;
  data: MimeBundle;
  metatadata: OutputMetadata;
}

interface DisplayData {
  output_type: 'display_data';
  data: MimeBundle;
  metadata: OutputMetadata;
}

interface Stream {
  output_type: 'stream';
  name: string; // stdout, stderr
  text: string;
}

interface Error {
  output_type: 'error';
  ename: string;
  evalue: string;
  traceback: string[];
}

type MimeBundle = 'application/json';

type MultilineString = string | string[];

type OutputMetadata = object;
