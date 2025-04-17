import type { TranspiledCode } from '@/modules/cells/interfaces/code';
import { marked } from 'marked';

export async function parseMarkdown(text: string): Promise<TranspiledCode> {
  let result: TranspiledCode;

  try {
    const parsedText = await marked.parse(text, { gfm: true, breaks: true });

    result = {
      code: parsedText,
      error: '',
    };
  } catch (error) {
    console.log(error);
    result = {
      code: '',
      error: (error as Error).message,
    };
  }

  return result;
}
