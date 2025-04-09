import { generateText } from 'ai';
import { ollama } from 'ollama-ai-provider';
import { generateInstructions } from './prompts';

export async function getSuggestion(
  textBeforeCursor: string,
  textBeforeCursorOnCurrentLine: string,
  language: string,
): Promise<string> {
  const { text } = await generateText({
    model: ollama('qwen2.5-coder:0.5b'),
    maxTokens: 150,
    temperature: 0.1,
    messages: [
      generateInstructions(language),
      {
        content: textBeforeCursor,
        role: 'system',
      },
      {
        content: textBeforeCursorOnCurrentLine,
        role: 'user',
      },
    ],
  });

  return text;
}
