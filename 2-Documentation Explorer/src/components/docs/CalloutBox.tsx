import { Info, TriangleAlert } from 'lucide-react';
import { InlineText } from './InlineText';

interface CalloutBoxProps {
  variant: 'info' | 'warning';
  title: string;
  text: string;
}

export function CalloutBox({ variant, title, text }: CalloutBoxProps) {
  const isWarning = variant === 'warning';

  return (
    <aside
      role="note"
      className={`border-l-4 rounded-xs p-4 my-6 flex items-start gap-3.5 ${
        isWarning
          ? 'bg-warn-bg border-warn-line'
          : 'bg-callout-info border-primary'
      }`}
    >
      {isWarning ? (
        <TriangleAlert
          className="w-5 h-5 text-warn-ink shrink-0 mt-0.5"
          aria-hidden="true"
        />
      ) : (
        <Info
          className="w-5 h-5 text-primary shrink-0 mt-0.5"
          aria-hidden="true"
        />
      )}

      <div className="flex-1 min-w-0">
        <h4
          className={`font-semibold text-[15px] ${
            isWarning ? 'text-warn-ink' : 'text-primary'
          }`}
        >
          <InlineText text={title} />
        </h4>
        <div
          className={`text-[15px] mt-1 leading-relaxed ${
            isWarning ? 'text-warn-ink' : 'text-body'
          }`}
        >
          <InlineText text={text} />
        </div>
      </div>
    </aside>
  );
}
