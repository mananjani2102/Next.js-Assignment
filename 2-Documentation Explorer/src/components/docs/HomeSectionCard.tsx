import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { iconMap } from '@/components/ui/icons';
import type { IconName } from '@/types';

interface HomeSectionCardProps {
  icon: IconName;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export function HomeSectionCard({
  icon,
  title,
  description,
  cta,
  href,
}: HomeSectionCardProps) {
  const Icon = iconMap[icon];

  return (
    <section className="bg-surface border border-line-strong rounded-xs p-6 flex flex-col">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
        )}
        <h2 className="text-[22px] font-semibold text-ink tracking-tight">
          {title}
        </h2>
      </div>

      <p className="text-[15px] text-muted mt-2 mb-6 leading-relaxed">
        {description}
      </p>

      <hr className="border-line mb-4 mt-auto" />

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs w-fit"
      >
        <span>{cta}</span>
        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
      </Link>
    </section>
  );
}
