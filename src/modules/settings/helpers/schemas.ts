import * as z from 'zod';

export const editorSchema = z.object({
  fontSize: z.number().min(6).max(30),
  tabSize: z.number().min(2).max(30),
  showLineNumbers: z.boolean(),
  // Remove packages cache
  // Select IA model for code generation
  // Select IA provider
  // Change app language (human)
  // Set default language (code)
  // semi: true,
  // singleQuote: true,
  // trailingComma: 'all',
  // printWidth: 80,
  // ruler
});
