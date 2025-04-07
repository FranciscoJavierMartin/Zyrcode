import * as monaco from 'monaco-editor';

const OPENING_BRACKETS = ['(', '[', '{'];
const CLOSING_BRACKETS = [')', ']', '}'];
const QUOTES = ['"', "'", '`'];
export const ALL_BRACKETS = [...OPENING_BRACKETS, ...CLOSING_BRACKETS] as const;
export type Bracket = (typeof ALL_BRACKETS)[number];

export class CompletionFormatter {
  private completion: string;
  private characterBeforeCursor: string;
  private characterAfterCursor: string;
  private normalizedCompletion: string;
  private originalCompletion: string;
  private textAfterCursor: string;
  private lineText: string;
  private lineCount: number;

  constructor(
    private editor: monaco.editor.ITextModel,
    private cursorPosition: monaco.Position,
  ) {
    this.completion = '';
    this.normalizedCompletion = '';
    this.originalCompletion = '';

    const lineEndPosition: monaco.Position = editor
      .getFullModelRange()
      .getEndPosition();
    const textAfterRange: monaco.Range = new monaco.Range(
      this.cursorPosition.lineNumber,
      this.cursorPosition.column,
      lineEndPosition.lineNumber,
      lineEndPosition.column,
    );
    this.lineText = this.editor.getLineContent(this.cursorPosition.lineNumber);
    this.textAfterCursor = this.editor.getValueInRange(textAfterRange);
    this.characterBeforeCursor =
      this.lineText[this.cursorPosition.column - 2] ?? '';
    this.characterAfterCursor = this.lineText[this.cursorPosition.column] ?? '';
    this.lineCount = this.editor.getLineCount();
  }

  public format(
    insertText: string,
    range: monaco.IRange,
  ): monaco.languages.InlineCompletion {
    this.completion = '';
    this.normalizedCompletion = this.normalize(insertText);
    this.originalCompletion = insertText;

    return this.matchCompletionBrackets()
      .ignoreBlankLines()
      .removeDuplicateStartOfSuggestions()
      .removeUnnecessaryMiddleQuote()
      .preventDuplicateLines()
      .removeInvalidLineBreaks()
      .trimStart()
      .stripMarkdownAndSuggestionText()
      .ignoreContextCompletionAtStartOrEnd()
      .formatCompletion(range);
  }

  private normalize(text: string): string {
    return text.trim();
  }

  private matchCompletionBrackets(): CompletionFormatter {
    let accumulatedCompletion: string = '';
    const openBrackets: Bracket[] = [];

    for (const character of this.originalCompletion) {
      if (OPENING_BRACKETS.includes(character)) {
        openBrackets.push(character);
      }

      if (CLOSING_BRACKETS.includes(character)) {
        if (
          openBrackets.length &&
          this.isMatchingPair(openBrackets[openBrackets.length - 1], character)
        ) {
          openBrackets.pop();
        } else {
          break;
        }
      }

      accumulatedCompletion += character;
    }

    this.completion =
      accumulatedCompletion.trimEnd() || this.originalCompletion.trimEnd();

    return this;
  }

  private isMatchingPair(open?: Bracket, close?: string): boolean {
    return (
      (open === '(' && close === ')') ||
      (open === '[' && close === ']') ||
      (open === '{' && close === '}')
    );
  }

  private ignoreBlankLines(): CompletionFormatter {
    if (
      this.completion.trimStart() === '' &&
      this.originalCompletion !== '\n'
    ) {
      this.completion = this.completion.trim();
    }

    return this;
  }

  private removeDuplicateStartOfSuggestions(): CompletionFormatter {
    const before = this.editor
      .getValueInRange(
        new monaco.Range(
          1,
          1,
          this.cursorPosition.lineNumber,
          this.cursorPosition.column,
        ),
      )
      .trim();
    const completion = this.normalize(this.completion);
    const maxLength = Math.min(completion.length, before.length);
    let overlapLength: number = 0;

    for (let length = 1; length <= maxLength; length++) {
      const endOfBefore = before.substring(before.length - length);
      const startOfCompletion = completion.substring(0, length);

      if (endOfBefore === startOfCompletion) {
        overlapLength = length;
      }
    }

    if (overlapLength) {
      this.completion = this.completion.substring(overlapLength);
    }

    return this;
  }

  private removeUnnecessaryMiddleQuote(): CompletionFormatter {
    const startsWithQuotes = QUOTES.includes(this.completion[0] ?? '');
    const endsWithQuotes = QUOTES.includes(
      this.completion[this.completion.length - 1] ?? '',
    );

    if (startsWithQuotes && endsWithQuotes) {
      this.completion = this.completion.substring(1);
    }

    if (endsWithQuotes && this.isCursorAtMiddleOfWord()) {
      this.completion = this.completion.slice(0, -1);
    }

    return this;
  }

  private isCursorAtMiddleOfWord(): boolean {
    return (
      !!this.characterBeforeCursor &&
      /\w/.test(this.characterBeforeCursor) &&
      /\w/.test(this.characterAfterCursor)
    );
  }

  private preventDuplicateLines(): CompletionFormatter {
    let nextLineIndex: number = this.cursorPosition.lineNumber + 1;

    while (
      nextLineIndex < this.cursorPosition.lineNumber + 3 &&
      nextLineIndex < this.lineCount
    ) {
      const line = this.editor.getLineContent(nextLineIndex);

      if (this.normalize(line) === this.normalize(this.originalCompletion)) {
        this.completion = '';
        return this;
      }

      nextLineIndex++;
    }

    return this;
  }

  private removeInvalidLineBreaks(): CompletionFormatter {
    if (this.completion.endsWith('\n')) {
      this.completion = this.completion.trimEnd();
    }

    return this;
  }

  private trimStart(): CompletionFormatter {
    const firstNonSpaceIndex = this.completion.search(/\S/);

    if (firstNonSpaceIndex > this.cursorPosition.column - 1) {
      this.completion = this.completion.substring(firstNonSpaceIndex);
    }

    return this;
  }

  private stripMarkdownAndSuggestionText(): CompletionFormatter {
    // Remove the backticks and the language name from a code block
    this.completion = this.completion
      .replace(/```.*\n/g, '')
      .replace(/```/g, '')
      .replace(/`/g, '')
      // Remove variations of "# Suggestion:" and "# Suggestions:" if they exist
      .replace(/# ?Suggestions?: ?/g, '');

    return this;
  }

  private ignoreContextCompletionAtStartOrEnd(): CompletionFormatter {
    const isNoTextBeforeOrAfter = this.getNoTextBeforeOrAfter();
    const contextMatch = this.normalizedCompletion.match(
      /\/\*\s*Language:\s*(.*)\s*\*\//,
    );
    const extensionContext = this.normalizedCompletion.match(
      /\/\*\s*File extension:\s*(.*)\s*\*\//,
    );
    const commentMatch = this.normalizedCompletion.match(/\/\*\s*\*\//);

    if (
      isNoTextBeforeOrAfter &&
      (contextMatch || extensionContext || commentMatch)
    ) {
      this.completion = '';
    }

    return this;
  }

  private getNoTextBeforeOrAfter(): boolean {
    const textAfter = this.textAfterCursor;
    const textBeforeRange = new monaco.Range(
      0,
      0,
      this.cursorPosition.lineNumber,
      this.cursorPosition.column,
    );

    const textBefore = this.editor.getValueInRange(textBeforeRange);

    return !textAfter || !textBefore;
  }

  private formatCompletion(
    range: monaco.IRange,
  ): monaco.languages.InlineCompletion {
    const newLineCount = this.newLineCount();
    const getLastLineLength = this.getLastLineColumnCount();

    return {
      insertText: this.completion,
      range: {
        startLineNumber: this.cursorPosition.lineNumber,
        startColumn: this.cursorPosition.column,
        endLineNumber: this.cursorPosition.lineNumber + newLineCount.length,
        endColumn:
          this.cursorPosition.lineNumber === range.startLineNumber &&
          newLineCount.length === 0
            ? this.cursorPosition.column + getLastLineLength
            : getLastLineLength,
      },
    };
  }

  private newLineCount(): RegExpMatchArray | [] {
    return this.completion.match(/\n/g) || [];
  }

  private getLastLineColumnCount(): number {
    const lines = this.completion.split('\n');
    return lines[lines.length - 1].length;
  }
}
