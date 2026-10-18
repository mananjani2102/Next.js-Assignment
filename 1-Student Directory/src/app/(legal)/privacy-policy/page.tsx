import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Campus Directory.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={siteConfig.legalLastUpdated}
      intro={
        <p>
          This Privacy Policy explains how Campus Directory handles visitor data.
          Our fundamental approach is simple: we respect your privacy, do not collect
          personal details, and run this website strictly as a static frontend demonstration.
        </p>
      }
      sections={[
        {
          title: "Overview",
          content: (
            <p>
              Campus Directory is a demonstration project created for frontend practice.
              The application presents an academic directory containing fictitious students,
              departments, and specializations. All profile records, IDs, and email addresses
              are generated sample data stored directly in the project repository.
            </p>
          ),
        },
        {
          title: "Information we collect",
          content: (
            <>
              <p>
                We do not ask visitors for personal information, names, email addresses, or
                account credentials. There are no login forms, registration screens, or user
                databases connected to this site.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[14px] leading-[24px] text-body my-3">
                <li>
                  <strong className="text-ink">Client-side search:</strong> The student search box
                  and department filters operate entirely within your browser memory. Your search terms
                  are never transmitted to a server or stored in an external log.
                </li>
                <li>
                  <strong className="text-ink">Server logs:</strong> As with standard web hosting, the
                  underlying server infrastructure may record basic technical request data, including your
                  IP address, HTTP request path, user-agent string, and timestamp.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Cookies and local storage",
          content: (
            <p>
              This website does not set HTTP cookies, tracking pixels, or persistent browser storage
              tokens. No analytics suites (such as Google Analytics) are loaded. If cookies or storage
              mechanisms are introduced in future versions, this document will be updated first to outline
              their exact scope and purpose.
            </p>
          ),
        },
        {
          title: "Third-party services",
          content: (
            <p>
              Campus Directory relies on a static web hosting platform to deliver HTML, CSS, and
              JavaScript assets. All fonts (Inter and JetBrains Mono) are self-hosted and bundled at build
              time, ensuring no outbound requests are made to external font delivery networks. No advertising
              networks or external trackers are embedded in the application.
            </p>
          ),
        },
        {
          title: "Sample data",
          content: (
            <p>
              All student names, identification numbers, email addresses, academic histories, and faculty
              members shown in this application are fictitious. Any resemblance to real persons, living or
              deceased, or authentic institutional records is entirely coincidental.
            </p>
          ),
        },
        {
          title: "Children",
          content: (
            <p>
              This website is an educational demonstration and is not targeted at children under the age of 13.
              We do not knowingly collect, request, or maintain personal information from children.
            </p>
          ),
        },
        {
          title: "Your requests",
          content: (
            <p>
              Because Campus Directory does not collect or store visitor personal information, there are no
              visitor records or profiles to inspect, amend, or delete. If you have questions or inquiries
              regarding this policy, please reach out to{" "}
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
        {
          title: "Changes to this policy",
          content: (
            <p>
              We may revise this Privacy Policy as the codebase develops or as hosting requirements change.
              Any modifications will be published directly on this page with an updated timestamp.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              If you have any questions or feedback regarding our privacy practices, you can contact the
              maintainer by email at{" "}
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
