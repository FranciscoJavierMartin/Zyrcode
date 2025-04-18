import * as z from 'zod';

export const editorSchema = z.object({
  fontSize: z.number().min(6).max(30),
  tabSize: z.number().min(2).max(30),
  showLineNumbers: z.boolean(),
  language: z.string().min(1),
  // Change app language (human)
  // Set default language (code)
  // semi: true,
  // singleQuote: true,
  // trailingComma: 'all',
  // printWidth: 80,
  // ruler
});

export const aiSchema = z.object({
  // TODO: Adjust value later
  autoCompleteModel: z.string().min(1),
  aiProvider: z.string().min(1),
});
