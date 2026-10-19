export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'link'; label: string; href: string };

/**
 * Parses inline markdown-like text strictly:
 * 1. Backtick code spans (`code`)
 * 2. **bold** spans
 * 3. [label](href) links
 */
export function parseInlineText(input: string): InlineToken[] {
  if (!input) {
    return [];
  }

  // Step 1: Split out backtick code spans
  // Regex matches `...` where content does not include backticks
  const codeRegex = /`([^`]+)`/g;
  const tokens: InlineToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeRegex.exec(input)) !== null) {
    const textBefore = input.slice(lastIndex, match.index);
    if (textBefore) {
      tokens.push(...parseBoldAndLinks(textBefore));
    }
    tokens.push({ type: 'code', value: match[1] });
    lastIndex = match.index + match[0].length;
  }

  const remaining = input.slice(lastIndex);
  if (remaining) {
    tokens.push(...parseBoldAndLinks(remaining));
  }

  return tokens;
}

function parseBoldAndLinks(text: string): InlineToken[] {
  const result: InlineToken[] = [];
  // Regex matches **bold** or [label](href)
  const pattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(text)) !== null) {
    const before = text.slice(lastIdx, m.index);
    if (before) {
      result.push({ type: 'text', value: before });
    }

    if (m[1]) {
      // Bold match: m[2] has the bold text
      result.push({ type: 'bold', value: m[2] });
    } else if (m[3]) {
      // Link match: m[4] has label, m[5] has href
      const label = m[4];
      const href = m[5];

      // Validation rule:
      // Internal hrefs start with "/"
      // https hrefs start with "https://"
      // Any other href throws in development
      if (!href.startsWith('/') && !href.startsWith('https://')) {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error(
            `Invalid link href "${href}" in inline text. Hrefs must start with "/" or "https://"`
          );
        }
      }

      result.push({ type: 'link', label, href });
    }

    lastIdx = m.index + m[0].length;
  }

  const rest = text.slice(lastIdx);
  if (rest) {
    result.push({ type: 'text', value: rest });
  }

  return result;
}
