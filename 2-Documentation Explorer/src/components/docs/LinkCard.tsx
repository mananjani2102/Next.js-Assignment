import type { FC } from 'react';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import { ArrowRight, FileText } from 'lucide-react';
import { iconMap } from '@/components/ui/icons';
import { InlineText } from './InlineText';
import type { IconName } from '@/types';

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon?: IconName | FC<LucideProps>;
}

export function LinkCard({ title, description, href, icon }: LinkCardProps) {
  let IconComponent: FC<LucideProps> = FileText;

  if (typeof icon === 'function') {
    IconComponent = icon;
  } else if (typeof icon === 'string' && icon in iconMap) {
    IconComponent = iconMap[icon as IconName];
  }

  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 p-5 bg-white border border-line-strong rounded-xs hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <div className="w-9 h-9 bg-surface border border-line-strong rounded-xs flex items-center justify-center text-primary shrink-0">
          <IconComponent className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold text-ink group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-[14px] text-muted mt-0.5 leading-normal">
            <InlineText text={description} />
          </p>
        </div>
      </div>

      <ArrowRight
        className="w-5 h-5 text-muted group-hover:text-primary transition-colors shrink-0"
        aria-hidden="true"
      />
    </Link>
  );
}
