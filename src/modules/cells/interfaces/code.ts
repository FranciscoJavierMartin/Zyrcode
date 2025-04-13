export type Language = 'javascript' | 'typescript' | 'markdown';

export interface TranspiledCode {
  code: string;
  error: string;
}
