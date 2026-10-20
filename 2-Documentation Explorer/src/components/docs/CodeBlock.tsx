import { codeToHtml } from 'shiki';
import { Folder, CodeXml } from 'lucide-react';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  variant: 'file' | 'terminal';
  title: string;
  language: 'tsx' | 'ts' | 'js' | 'bash' | 'json' | 'text';
  code: string;
  icon?: 'marker' | 'folder' | 'code';
}

export async function CodeBlock({
  variant,
  title,
  language,
  code,
  icon = 'marker',
}: CodeBlockProps) {
  if (variant === 'terminal') {
    const lines = code.split('\n');

    return (
      <div className="rounded-xs border border-line-strong overflow-hidden my-6 bg-white">
        <div className="bg-surface h-10 border-b border-line-strong px-4 flex items-center justify-between">
          <span className="font-mono text-[12px] text-muted font-medium">
            {title}
          </span>
          <CopyButton code={code} variant="light" />
        </div>

        <div className="bg-white p-5 overflow-x-auto font-mono text-[14px] leading-[1.7] text-ink">
          <pre className="font-mono text-[14px] leading-[1.7] m-0 p-0">
            <code>
              {lines.map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="text-muted select-none mr-2.5">$</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  // File variant
  let highlightedHtml: string | null = null;
  if (language !== 'text') {
    try {
      highlightedHtml = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      });
    } catch {
      highlightedHtml = null;
    }
  }

  return (
    <div className="rounded-md border border-line-strong overflow-hidden my-6">
      <div className="bg-code-head h-10 border-b border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          {icon === 'folder' ? (
            <Folder className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
          ) : icon === 'code' ? (
            <CodeXml className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
          ) : (
            <span
              className="w-2 h-2 bg-slate-400 rounded-xs shrink-0"
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-[12px] text-slate-300 truncate">
            {title}
          </span>
        </div>

        <CopyButton code={code} variant="dark" />
      </div>

      <div className="bg-code-body p-5 overflow-x-auto font-mono text-[14px] leading-[1.7] text-slate-100">
        {highlightedHtml ? (
          // This is the only allowed dangerouslySetInnerHTML, and it is safe because the input is static project data.
          <div
            className="shiki-wrapper font-mono text-[14px] leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="font-mono text-[14px] leading-[1.7] m-0 p-0">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
