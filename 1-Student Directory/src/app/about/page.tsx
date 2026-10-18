import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Divider } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "What Campus Directory is and how it is built.",
};

export default function AboutPage() {
  return (
    <div className="pt-8 pb-12">
      <PageContainer size="narrow">
        <PageHeader
          title="About"
          description="What this project is and how it is built."
        />

        <Card padding="xl" className="mt-6">
          <section>
            <h2 className="text-[16px] font-semibold text-ink">What this is</h2>
            <p className="text-[14px] leading-relaxed text-body mt-2">
              Campus Directory is a student directory built as a frontend practice
              project. It lists students, departments and specializations, and
              shows a profile for each student.
            </p>
          </section>

          <Divider className="my-6" />

          <section>
            <h2 className="text-[16px] font-semibold text-ink">About the data</h2>
            <p className="text-[14px] leading-relaxed text-body mt-2">
              Every person, email address and record in the directory is
              fictional sample data stored in the repository. No real student
              information is used.
            </p>
          </section>

          <Divider className="my-6" />

          <section>
            <h2 className="text-[16px] font-semibold text-ink">
              How it is built
            </h2>
            <p className="text-[14px] leading-relaxed text-body mt-2">
              Next.js App Router, TypeScript and Tailwind CSS. Pages are
              generated statically from local data, and search and filtering run
              in the browser.
            </p>
          </section>
        </Card>
      </PageContainer>
    </div>
  );
}
