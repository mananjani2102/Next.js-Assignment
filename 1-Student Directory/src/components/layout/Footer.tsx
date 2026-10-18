import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FooterPath } from "@/components/layout/FooterPath";
import { routes } from "@/lib/routes";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-[1100px] mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-small font-semibold text-muted">
        <div>
          Campus Directory © {siteConfig.organization}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href={routes.privacy()}
            className="text-muted hover:text-ink hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href={routes.terms()}
            className="text-muted hover:text-ink hover:underline transition-colors"
          >
            Terms and Conditions
          </Link>
          <FooterPath />
        </div>
      </div>
    </footer>
  );
}
