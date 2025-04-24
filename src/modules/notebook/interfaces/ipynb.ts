export interface NotebookIpynb {
  metadata: NotebookIpynbMetadata;
  nbformat: number;
  nbformat_minor: number;
  worksheets: Worksheet[];
}

export interface NotebookIpynbMetadata {
  kernelspec: Kernelspec;
  language_info: LanguageInfo;
  name: string;
}

export interface Kernelspec {
  display_name: string;
  language: string;
  name: string;
}

export interface LanguageInfo {
  file_extension: string;
  mimetype: string;
  name: string;
  version: string;
}

export interface Worksheet {
  cells: Cell[];
  metadata: CellMetadata;
}

export interface Cell {
  cell_type: string;
  collapsed: boolean;
  input: string[];
  language: string;
  metadata: CellMetadata;
  outputs: Output[];
  prompt_number: number;
}

export type CellMetadata = object;

export interface Output {
  html?: string[];
  metadata?: CellMetadata;
  output_type: string;
  prompt_number?: number;
  text?: string[];
  stream?: string;
  ename?: string;
  evalue?: string;
  traceback?: string[];
}
