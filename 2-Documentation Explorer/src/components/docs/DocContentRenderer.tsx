import type { ContentBlock } from '@/types';
import { InlineText } from './InlineText';
import { CalloutBox } from './CalloutBox';
import { CodeBlock } from './CodeBlock';
import { DocTable } from './DocTable';

interface DocContentRendererProps {
  blocks: ContentBlock[];
}

export function DocContentRenderer({ blocks }: DocContentRendererProps) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={`p-${index}`}
                className="text-[17px] leading-[1.7] text-body mb-5"
              >
                <InlineText text={block.text} />
              </p>
            );

          case 'heading': {
            if (block.level === 2) {
              return (
                <h2
                  key={`h2-${block.id}-${index}`}
                  id={block.id}
                  className="text-[28px] font-semibold text-ink tracking-tight mt-14 mb-4 scroll-mt-24 flex items-center gap-3"
                >
                  {block.step !== undefined && (
                    <span
                      className="w-6 h-6 bg-primary text-white font-mono text-[12px] font-semibold rounded-xs inline-flex items-center justify-center shrink-0 select-none"
                      aria-hidden="true"
                    >
                      {block.step}
                    </span>
                  )}
                  <span>{block.text}</span>
                </h2>
              );
            }

            return (
              <h3
                key={`h3-${block.id}-${index}`}
                id={block.id}
                className="text-[20px] font-semibold text-ink tracking-tight mt-8 mb-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            );
          }

          case 'callout':
            return (
              <CalloutBox
                key={`callout-${index}`}
                variant={block.variant}
                title={block.title}
                text={block.text}
              />
            );

          case 'code':
            return (
              <CodeBlock
                key={`code-${index}`}
                variant={block.variant}
                title={block.title}
                language={block.language}
                code={block.code}
                icon={block.icon}
              />
            );

          case 'table':
            return (
              <DocTable
                key={`table-${index}`}
                headers={block.headers}
                columnStyles={block.columnStyles}
                rows={block.rows}
              />
            );

          case 'list': {
            if (block.ordered) {
              return (
                <ol
                  key={`ol-${index}`}
                  className="my-5 pl-6 space-y-2 list-decimal text-[16px] text-body leading-relaxed"
                >
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <InlineText text={item} />
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <ul
                key={`ul-${index}`}
                className="my-5 pl-6 space-y-2 list-disc text-[16px] text-body leading-relaxed"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );
          }

          default: {
            const _exhaustiveCheck: never = block;
            return _exhaustiveCheck;
          }
        }
      })}
    </div>
  );
}
