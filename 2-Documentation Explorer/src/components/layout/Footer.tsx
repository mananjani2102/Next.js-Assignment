import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-line mt-16 pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-muted">
      <div className="flex items-center gap-2.5">
        <span
          className="w-2 h-2 bg-primary inline-block rounded-xs"
          aria-hidden="true"
        />
        <span>Orbit Docs {siteConfig.version}</span>
      </div>
      <nav aria-label="Footer links" className="flex items-center gap-6">
        <Link
          href="/privacy-policy"
          className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-and-conditions"
          className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
        >
          Terms and Conditions
        </Link>
        <Link
          href="/about"
          className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
        >
          About
        </Link>
      </nav>
    </footer>
  );
}
