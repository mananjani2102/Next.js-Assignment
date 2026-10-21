import type { LegalDocument } from '@/data/legal';
import { InlineText } from '@/components/docs/InlineText';

interface LegalPageProps {
  document: LegalDocument;
}

export function LegalPage({ document }: LegalPageProps) {
  return (
    <article className="w-full">
      <header className="mb-8">
        <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-2">
          {document.title}
        </h1>

        <div className="font-mono text-[13px] text-muted">
          Last updated: {document.displayDate}
        </div>

        <p className="text-[18px] text-muted max-w-2xl leading-relaxed mt-4">
          {document.description}
        </p>

        <hr className="border-line my-8" />
      </header>

      <div className="space-y-10">
        {document.sections.map((section) => (
          <section key={section.id}>
            <h2
              id={section.id}
              className="text-[24px] font-semibold text-ink tracking-tight mb-3"
            >
              {section.heading}
            </h2>

            <div className="space-y-4">
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[17px] leading-[1.7] text-body"
                >
                  <InlineText text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
