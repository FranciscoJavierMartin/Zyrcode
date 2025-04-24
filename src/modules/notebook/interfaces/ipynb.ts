export interface NotebookIpynb {
  cells: Cell[];
  metadata: NotebookIpynbMetadata;
  nbformat: number;
  nbformat_minor: number;
}

export interface Cell {
  cell_type: 'code' | 'markdown';
  // metadata: CellMetadata;
  metadata: object;
  source: string[];
  execution_count?: number;
  outputs?: Output[];
}

// export interface CellMetadata {}

export interface Output {
  data?: Data;
  execution_count?: number;
  // metadata?: CellMetadata;
  metadata?: object;
  output_type: string;
  name?: string;
  text?: string[];
}

export interface Data {
  'text/plain': string[];
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
