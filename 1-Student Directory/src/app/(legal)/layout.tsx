import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

export default function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="pt-8 pb-12">
      <PageContainer size="narrow">{children}</PageContainer>
    </div>
  );
}
