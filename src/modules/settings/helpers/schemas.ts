import * as v from 'valibot';

export const commonSchema = v.object({
  appLanguage: v.pipe(v.string(), v.minLength(2), v.maxLength(50)),
});

export const editorSchema = v.object({
  fontSize: v.pipe(v.number(), v.integer(), v.minValue(6), v.maxValue(30)),
  showLineNumbers: v.boolean(),
  language: v.pipe(v.string(), v.minLength(1)),
  ruler: v.pipe(v.number(), v.integer(), v.minValue(70), v.maxValue(256)),
});

export const formatterSchema = v.object({
  semi: v.boolean(),
  tabSize: v.pipe(v.number(), v.integer(), v.minValue(2), v.maxValue(30)),
  singleQuote: v.boolean(),
  jsxSingleQuote: v.boolean(),
  useTabs: v.boolean(),
  printWidth: v.pipe(v.number(), v.integer(), v.minValue(70)),
  trailingComma: v.union([
    v.literal('none'),
    v.literal('es5'),
    v.literal('all'),
  ]),
});

export const aiSchema = v.object({
  // TODO: Adjust value later
  isAIEnabled: v.boolean(),
  autoCompleteModel: v.pipe(v.string(), v.minLength(1)),
  aiProvider: v.union([v.literal('ollama')]),
});
