export type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

export interface OutputPreviewData {
  data: unknown;
  id: string;
  logLevel: LogLevel;
}
