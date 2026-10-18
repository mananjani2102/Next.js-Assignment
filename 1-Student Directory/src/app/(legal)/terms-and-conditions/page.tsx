import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Campus Directory.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      lastUpdated={siteConfig.legalLastUpdated}
      intro={
        <p>
          These Terms and Conditions govern your access to and use of Campus Directory.
          By browsing or interacting with this site, you acknowledge and agree to the terms
          set out below.
        </p>
      }
      sections={[
        {
          title: "Acceptance of these terms",
          content: (
            <p>
              By accessing this website, you confirm that you have read, understood, and agreed
              to be bound by these Terms and Conditions. If you do not agree with any part of
              these terms, you should discontinue use of the site.
            </p>
          ),
        },
        {
          title: "What the site is",
          content: (
            <p>
              Campus Directory is a frontend practice and demonstration project designed to showcase
              modern web development techniques with the Next.js App Router, TypeScript, and
              Tailwind CSS. It is not an official university student information system, registrar portal,
              or accredited academic directory.
            </p>
          ),
        },
        {
          title: "Sample data",
          content: (
            <p>
              All student profiles, department summaries, specialization descriptions, course lists,
              and email addresses displayed on this website are fictional sample data. You must not
              rely on this information for academic verification, administrative actions, or real-world
              decision-making.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          content: (
            <>
              <p>When using this site, you agree to follow standard acceptable use guidelines:</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px] leading-[24px] text-body my-3">
                <li>Do not attempt to disrupt, impair, or overload the application or its hosting infrastructure.</li>
                <li>Do not scrape, crawl, or harvest pages at an abusive or harmful rate that degrades performance for others.</li>
                <li>Do not misrepresent or republish the fictional sample data as authentic institutional records.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Intellectual property",
          content: (
            <p>
              Original application source code and custom visual layouts are the property of the project
              author. Icons are provided by Lucide under the ISC License. The Inter and JetBrains Mono
              typefaces are distributed under the SIL Open Font License (OFL).
            </p>
          ),
        },
        {
          title: "Disclaimer of warranties",
          content: (
            <p>
              This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
              warranties of any kind, whether express, statutory, or implied. We do not warrant that the site
              will be uninterrupted, secure, or entirely error-free.
            </p>
          ),
        },
        {
          title: "Limitation of liability",
          content: (
            <p>
              To the fullest extent permitted by applicable law, the author and contributors of Campus
              Directory shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of or inability to use this demonstration project.
            </p>
          ),
        },
        {
          title: "Links to other sites",
          content: (
            <p>
              This website may occasionally contain links to external third-party resources or open-source
              repositories. We have no control over the content, policies, or practices of external services
              and assume no responsibility for them.
            </p>
          ),
        },
        {
          title: "Changes to these terms",
          content: (
            <p>
              We reserve the right to revise or update these Terms and Conditions at any time. Any changes
              will be posted directly on this page alongside the date of the latest modification.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              If you have inquiries or questions regarding these Terms and Conditions, please email{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-primary hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
