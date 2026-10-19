import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

const ALLOWED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.css',
  '.md',
  '.mdx',
  '.svg',
  '.json',
  '.mjs',
]);

const IGNORED_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'scripts',
  'design-reference',
  '1-Student Directory',
]);

// Rule error patterns using unicode escapes where appropriate
const EM_DASH_REGEX = /\u2014/;
const ROUNDED_FULL_REGEX = /\brounded-full\b/;
const GRADIENT_REGEX = /gradient/i;
const TAILWIND_FORBIDDEN_COLORS_REGEX =
  /\b(?:bg|text|border|ring|divide|from|to|via|outline|fill|stroke|decoration|accent)-(?:purple|violet|fuchsia|pink)(?:-\d+)?\b/i;
const LOREM_IPSUM_REGEX = /lorem\s+ipsum/i;
const ANIMATE_UTILITY_REGEX = /\banimate-[a-zA-Z0-9_-]+\b/;
const KEYFRAMES_REGEX = /@keyframes\b/i;
const FRAMER_MOTION_REGEX = /framer-motion/;
const DANGEROUSLY_SET_INNER_HTML_REGEX = /dangerouslySetInnerHTML/;

// Emoji regex via Extended_Pictographic property
const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;
const ALLOWED_PICTOGRAPHS = new Set(['\u2318', '\u00A9']);

// Warning patterns
const WARNING_PATTERNS = [
  'seamless',
  'cutting-edge',
  'game-changer',
  'supercharge',
  'revolutionary',
  'next-generation',
  'effortless',
  'unlock the',
  'TODO',
  'FIXME',
];

const WARNING_REGEXES = WARNING_PATTERNS.map((word) => ({
  word,
  regex: new RegExp(
    word === 'TODO' || word === 'FIXME' ? `\\b${word}\\b` : `\\b${word}\\b`,
    'i'
  ),
}));

function collectFiles(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ALLOWED_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const filesToScan = [];

// Scan src/ and public/
filesToScan.push(...collectFiles(path.join(ROOT_DIR, 'src')));
filesToScan.push(...collectFiles(path.join(ROOT_DIR, 'public')));

// Specific root markdown files
for (const rootFile of ['README.md', 'AGENTS.md']) {
  const p = path.join(ROOT_DIR, rootFile);
  if (fs.existsSync(p)) {
    filesToScan.push(p);
  }
}

let errorCount = 0;
let warningCount = 0;

for (const filePath of filesToScan) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const location = `${relPath}:${lineNum}`;

    const isAgentRuleStatement =
      relPath === 'AGENTS.md' &&
      (line.startsWith('- Never use') ||
        line.startsWith('- Corners:') ||
        line.startsWith('- No lorem ipsum'));

    // 1. Em dash check (strictly forbidden everywhere)
    if (EM_DASH_REGEX.test(line)) {
      console.error(
        `[ERROR] ${location} - Forbidden em dash character detected (U+2014)`
      );
      errorCount++;
    }

    // 2. rounded-full check
    if (ROUNDED_FULL_REGEX.test(line) && !isAgentRuleStatement) {
      console.error(
        `[ERROR] ${location} - Forbidden rounded-full class detected`
      );
      errorCount++;
    }

    // 3. gradient check
    if (GRADIENT_REGEX.test(line) && !isAgentRuleStatement) {
      console.error(
        `[ERROR] ${location} - Forbidden gradient detected`
      );
      errorCount++;
    }

    // 4. Forbidden Tailwind colors
    if (TAILWIND_FORBIDDEN_COLORS_REGEX.test(line)) {
      console.error(
        `[ERROR] ${location} - Forbidden color class (purple, violet, fuchsia, pink) detected`
      );
      errorCount++;
    }

    // 5. Lorem ipsum check
    if (LOREM_IPSUM_REGEX.test(line) && !isAgentRuleStatement) {
      console.error(
        `[ERROR] ${location} - Forbidden placeholder text (lorem ipsum) detected`
      );
      errorCount++;
    }

    // 6. Emoji check
    const emojiMatches = line.match(EMOJI_REGEX);
    if (emojiMatches) {
      for (const match of emojiMatches) {
        if (!ALLOWED_PICTOGRAPHS.has(match)) {
          console.error(
            `[ERROR] ${location} - Forbidden emoji/pictograph '${match}' detected`
          );
          errorCount++;
        }
      }
    }

    // 7. Animate utility check
    if (ANIMATE_UTILITY_REGEX.test(line)) {
      console.error(
        `[ERROR] ${location} - Forbidden animate-* utility detected`
      );
      errorCount++;
    }

    // 8. @keyframes check
    if (KEYFRAMES_REGEX.test(line)) {
      console.error(
        `[ERROR] ${location} - Forbidden @keyframes rule detected`
      );
      errorCount++;
    }

    // 9. framer-motion check
    if (FRAMER_MOTION_REGEX.test(line)) {
      console.error(
        `[ERROR] ${location} - Forbidden framer-motion dependency or usage detected`
      );
      errorCount++;
    }

    // 10. dangerouslySetInnerHTML check (only allowed in src/components/docs/CodeBlock.tsx)
    if (DANGEROUSLY_SET_INNER_HTML_REGEX.test(line)) {
      if (relPath !== 'src/components/docs/CodeBlock.tsx') {
        console.error(
          `[ERROR] ${location} - dangerouslySetInnerHTML is only permitted in src/components/docs/CodeBlock.tsx`
        );
        errorCount++;
      }
    }

    // Warnings
    for (const { word, regex } of WARNING_REGEXES) {
      if (regex.test(line)) {
        console.warn(
          `[WARN] ${location} - Vague or discouraged phrase detected: "${word}"`
        );
        warningCount++;
      }
    }
  }
}

console.log(
  `Guardrail scan completed: ${filesToScan.length} files scanned, ${errorCount} errors, ${warningCount} warnings.`
);

if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
