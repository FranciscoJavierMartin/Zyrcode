import { streamText } from 'ai';
import { ollama } from 'ollama-ai-provider';

export async function callOllamaAPI() {
  const stream = streamText({
    model: ollama('qwen2.5-coder:0.5b'),
    maxTokens: 150,
    temperature: 0.1,
    messages: [
      {
        content: 'Tell me a joke',
        role: 'user',
      },
    ],
  });

  return stream.toDataStreamResponse();
}

export async function getOllamaModels(): Promise<string[]> {
  const models = await fetch('http://localhost:11434/api/tags')
    .then((res) => res.json())
    .then((res) => res.models);

  return models.map((model: { model: string }) => model.model);
}

export async function completeWithOllama(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const {
    messages,
    model: modelName,
    maxTokens = 150,
    temperature = 0.1,
  } = JSON.parse(init?.body as string);

  const stream = streamText({
    model: ollama(modelName),
    maxTokens,
    temperature,
    messages,
  });

  return stream.toDataStreamResponse();
}
