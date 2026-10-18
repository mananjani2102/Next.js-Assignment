// Explicit dynamic segment (not a catch-all) because each level has distinct data, metadata, and layout.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import {
  getDepartmentBySlug,
  getSpecialization,
  getSpecializationParams,
  getStudentsBySpecialization,
} from "@/lib/directory";
import { routes } from "@/lib/routes";
import { pluralize } from "@/lib/format";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Divider } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DetailHeaderCard } from "@/components/ui/DetailHeaderCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudentCard } from "@/components/students/StudentCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  { departmentSlug: string; specializationSlug: string }[]
> {
  return getSpecializationParams();
}

interface PageProps {
  params: Promise<{
    departmentSlug: string;
    specializationSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { departmentSlug, specializationSlug } = await params;
  const department = await getDepartmentBySlug(departmentSlug);
  const specialization = await getSpecialization(
    departmentSlug,
    specializationSlug
  );

  if (!department || !specialization) {
    return {
      title: "Specialization not found",
    };
  }

  return {
    title: `${specialization.name} (${department.name})`,
    description: specialization.description,
    alternates: {
      canonical: routes.specialization(
        specialization.departmentSlug,
        specialization.slug
      ),
    },
  };
}

export default async function SpecializationDetailPage({ params }: PageProps) {
  const { departmentSlug, specializationSlug } = await params;
  const department = await getDepartmentBySlug(departmentSlug);
  if (!department) {
    notFound();
  }

  const specialization = await getSpecialization(
    departmentSlug,
    specializationSlug
  );
  if (!specialization) {
    notFound();
  }

  const students = await getStudentsBySpecialization(
    department.slug,
    specialization.slug
  );

  const enrolleesLabel = pluralize(
    students.length,
    "Active Enrollee",
    "Active Enrollees"
  );

  return (
    <div className="pt-6 pb-12">
      <PageContainer size="wide">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Departments", href: routes.departments() },
            { label: department.name, href: routes.department(department.slug) },
            { label: specialization.name },
          ]}
        />

        {/* Link row */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <ArrowLink
            href={routes.department(department.slug)}
            direction="back"
            tone="primary"
            size="md"
          >
            Return to {department.name} Department
          </ArrowLink>
          <ArrowLink
            href={routes.students()}
            direction="forward"
            tone="muted"
            size="md"
          >
            View all students
          </ArrowLink>
        </div>

        {/* 1px border-line rule */}
        <Divider className="mt-4" />

        {/* Detail Header Card */}
        <div className="mt-6">
          <DetailHeaderCard
            title={specialization.name}
            badgeLabel={`Specialization under ${department.name}`}
            description={specialization.description}
            codeLabel="Department Track"
            code={specialization.code}
            meta={[
              {
                label: "Academic Lead",
                value: specialization.academicLead,
              },
              {
                label: "Primary Core Lab",
                value: specialization.coreLab,
              },
              {
                label: "Total Enrollment",
                value: `${students.length} ${enrolleesLabel}`,
              },
              {
                label: "Curriculum Cycle",
                value: specialization.curriculumCycle,
              },
            ]}
          />
        </div>

        {/* Students in this Specialization Section */}
        <section className="mt-8">
          <SectionHeading
            title="Students in this Specialization"
            count={students.length}
            rightSlot={
              <div className="flex items-center gap-2 select-none">
                <span className="font-semibold text-muted">
                  Filtered by Track:
                </span>
                <Badge variant="filter">{specialization.name}</Badge>
              </div>
            }
          />

          {students.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={<Users className="size-5" aria-hidden="true" />}
                title="No students in this specialization yet"
                description={`No sample records are assigned to ${specialization.name} in this directory.`}
                action={
                  <ArrowLink
                    href={routes.department(department.slug)}
                    direction="forward"
                    tone="primary"
                    size="md"
                  >
                    Return to {department.name}
                  </ArrowLink>
                }
              />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  variant="specialization"
                  student={student}
                />
              ))}
            </div>
          )}
        </section>
      </PageContainer>
    </div>
  );
}
