// "use client": needs usePathname to display active route path
"use client";

import { usePathname } from "next/navigation";

export function FooterPath() {
  const pathname = usePathname();

  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span>
        Path:{" "}
        <span className="font-mono text-[12px] font-normal text-muted">
          {pathname}
        </span>
      </span>
      <span
        className="size-2 rounded-full bg-live shrink-0 inline-block"
        aria-hidden="true"
      />
    </span>
  );
}
