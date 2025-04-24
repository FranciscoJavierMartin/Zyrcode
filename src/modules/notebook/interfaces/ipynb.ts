export interface NotebookIpynb {
  cells: Cell[];
  metadata: NotebookIpynbMetadata;
  nbformat: number;
  nbformat_minor: number;
}

export interface Cell {
  cell_type: 'code' | 'markdown';
  metadata: CellMetadata;
  source: string[];
  execution_count?: number;
  outputs?: Output[];
}

export interface CellMetadata {
  collapsed?: boolean;
  jupyter?: Jupyter;
}

export interface Jupyter {
  outputs_hidden: boolean;
}

export interface Output {
  name: string;
  output_type: string;
  text: string[];
}

export interface NotebookIpynbMetadata {
  kernelspec: Kernelspec;
  language_info: LanguageInfo;
}

export interface Kernelspec {
  display_name: string;
  language: string;
  name: string;
}

export interface LanguageInfo {
  codemirror_mode: CodemirrorMode;
  file_extension: string;
  mimetype: string;
  name: string;
  nbconvert_exporter: string;
  pygments_lexer: string;
  version: string;
}

export interface CodemirrorMode {
  name: string;
  version: number;
}
