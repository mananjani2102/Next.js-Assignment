import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Student } from "@/types";
import {
  getDepartmentBySlug,
  getStudentBySlug,
  getStudentParams,
} from "@/lib/directory";
import { routes } from "@/lib/routes";
import {
  academicStanding,
  classStanding,
  formatDate,
} from "@/lib/format";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card, Divider } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { MetaGrid } from "@/components/ui/MetaGrid";
import { StudentDetailRows } from "@/components/students/StudentDetailRows";
import { SubjectList } from "@/components/students/SubjectList";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ studentId: string }[]> {
  return getStudentParams();
}

interface PageProps {
  params: Promise<{ studentId: string }>;
}

function getFirstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text;
}

function getStatusBadge(status: Student["status"]): {
  label: string;
  variant: "success" | "outline";
} {
  switch (status) {
    case "active":
      return { label: "Active Student", variant: "success" };
    case "on-leave":
      return { label: "On Leave", variant: "outline" };
    case "alumni":
      return { label: "Alumni", variant: "outline" };
    default:
      return { label: "Active Student", variant: "success" };
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { studentId } = await params;
  const student = await getStudentBySlug(studentId);

  if (!student) {
    return {
      title: "Student not found",
    };
  }

  return {
    title: `${student.name} (${student.id})`,
    description: getFirstSentence(student.about),
    alternates: {
      canonical: routes.student(student.id),
    },
  };
}

export default async function StudentProfilePage({ params }: PageProps) {
  const { studentId } = await params;
  const student = await getStudentBySlug(studentId);

  if (!student) {
    notFound();
  }

  const department = await getDepartmentBySlug(student.departmentSlug);
  if (!department) {
    notFound();
  }

  const statusBadge = getStatusBadge(student.status);

  return (
    <div className="pt-6 pb-12">
      <PageContainer size="narrow">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Students", href: routes.students() },
            { label: student.name },
          ]}
        />

        {/* Back Link */}
        <div className="mt-3">
          <ArrowLink
            href={routes.students()}
            direction="back"
            tone="muted"
            size="md"
          >
            Back to students
          </ArrowLink>
        </div>

        {/* Main Profile Card */}
        <Card padding="xl" as="article" className="mt-5">
          {/* Card Header */}
          <div className="flex items-center gap-4">
            <Avatar name={student.name} size="lg" colors={student.avatar} />
            <div className="flex flex-col">
              <h1 className="text-h1 font-semibold text-ink tracking-tight">
                {student.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="id">{student.id}</Badge>
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Meta Information Grid */}
          <MetaGrid
            columns={2}
            labelStyle="caps"
            items={[
              {
                label: "Department",
                value: department.name,
              },
              {
                label: "Study Year",
                value: classStanding(student.year),
              },
              {
                label: "Email",
                value: (
                  <a
                    href={`mailto:${student.email}`}
                    className="text-primary hover:underline"
                  >
                    {student.email}
                  </a>
                ),
              },
              {
                label: "Enrolled",
                value: student.enrolledTerm,
              },
            ]}
          />

          <Divider className="my-6" />

          {/* About Section */}
          <div>
            <h2 className="text-card font-semibold text-ink">About</h2>
            <p className="text-body leading-relaxed text-body mt-2">
              {student.about}
            </p>
          </div>

          <Divider className="my-6" />

          {/* Academic Details Section */}
          <div>
            <h2 className="text-card font-semibold text-ink mb-4">
              Academic Details
            </h2>
            <StudentDetailRows
              items={[
                {
                  label: "Department",
                  value: department.name,
                },
                {
                  label: "Current Academic Standing",
                  value: academicStanding(student.year),
                },
              ]}
            />

            <div className="text-label font-semibold uppercase tracking-[0.06em] text-muted mt-4 mb-2">
              Enrolled Subjects
            </div>
            <SubjectList subjects={student.subjects} />
          </div>
        </Card>

        {/* System Metadata Row below Card */}
        <div className="mt-4 px-1 flex justify-between items-center text-badge font-semibold text-muted select-none">
          <span>System Record ID: {student.recordId}</span>
          <span>Last validated: {formatDate(student.lastValidated)}</span>
        </div>
      </PageContainer>
    </div>
  );
}
