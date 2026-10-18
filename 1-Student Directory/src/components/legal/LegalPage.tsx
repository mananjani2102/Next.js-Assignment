import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { LegalSection } from "@/components/legal/LegalSection";

export interface LegalSectionItem {
  title: string;
  content: ReactNode;
}

export interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSectionItem[];
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <article>
      <header className="border-b border-line pb-6">
        <h1 className="text-h1 font-semibold tracking-tight text-ink">
          {title}
        </h1>
        <p className="text-small font-medium text-muted mt-2">
          Last updated: {lastUpdated}
        </p>
        <div className="text-[14px] leading-[24px] text-body mt-4">
          {intro}
        </div>
      </header>

      <Card padding="xl" className="mt-8">
        {sections.map((section, index) => (
          <LegalSection
            key={section.title}
            title={section.title}
            className={index === 0 ? "mt-0" : "mt-8"}
          >
            {section.content}
          </LegalSection>
        ))}
      </Card>
    </article>
  );
}
