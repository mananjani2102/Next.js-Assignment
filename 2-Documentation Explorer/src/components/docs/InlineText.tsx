import Link from 'next/link';
import { parseInlineText } from '@/lib/inline';

interface InlineTextProps {
  text: string;
}

export function InlineText({ text }: InlineTextProps) {
  const tokens = parseInlineText(text);

  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'text':
            return <span key={index}>{token.value}</span>;

          case 'code':
            return (
              <code
                key={index}
                className="bg-inline-code border border-line rounded-xs font-mono text-[0.9em] px-1.5 py-0.5 text-ink select-text"
              >
                {token.value}
              </code>
            );

          case 'bold':
            return (
              <strong key={index} className="font-semibold text-ink">
                {token.value}
              </strong>
            );

          case 'link': {
            const isInternal = token.href.startsWith('/');
            if (isInternal) {
              return (
                <Link
                  key={index}
                  href={token.href}
                  className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  {token.label}
                </Link>
              );
            }

            return (
              <a
                key={index}
                href={token.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                {token.label}
              </a>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
