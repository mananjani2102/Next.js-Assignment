// Explicit dynamic segment (not a catch-all) because each level has distinct data, metadata, and layout.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import {
  getDepartmentBySlug,
  getDepartmentParams,
  getSpecializationsByDepartment,
  getStudentsByDepartment,
  getStudentsBySpecialization,
} from "@/lib/directory";
import { routes } from "@/lib/routes";
import { pluralize } from "@/lib/format";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Divider, Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DetailHeaderCard } from "@/components/ui/DetailHeaderCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecializationCard } from "@/components/departments/SpecializationCard";
import { StudentCard } from "@/components/students/StudentCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ departmentSlug: string }[]> {
  return getDepartmentParams();
}

interface PageProps {
  params: Promise<{ departmentSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { departmentSlug } = await params;
  const department = await getDepartmentBySlug(departmentSlug);

  if (!department) {
    return {
      title: "Department not found",
    };
  }

  return {
    title: department.name,
    description: department.description,
    alternates: {
      canonical: routes.department(department.slug),
    },
  };
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { departmentSlug } = await params;
  const department = await getDepartmentBySlug(departmentSlug);

  if (!department) {
    notFound();
  }

  const [specializations, students] = await Promise.all([
    getSpecializationsByDepartment(department.slug),
    getStudentsByDepartment(department.slug),
  ]);

  // Compute student count per specialization
  const specializationsWithCounts = await Promise.all(
    specializations.map(async (spec) => {
      const specStudents = await getStudentsBySpecialization(
        department.slug,
        spec.slug
      );
      return {
        specialization: spec,
        studentCount: specStudents.length,
      };
    })
  );

  return (
    <div className="pt-6 pb-12">
      <PageContainer size="wide">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Departments", href: routes.departments() },
            { label: department.name },
          ]}
        />

        {/* Link row */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <ArrowLink
            href={routes.departments()}
            direction="back"
            tone="primary"
            size="md"
          >
            Back to departments
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
            title={department.name}
            badgeLabel="Department"
            description={department.description}
            codeLabel="Department Code"
            code={department.code}
            meta={[
              {
                label: "Department Head",
                value: department.head,
              },
              {
                label: "Primary Building",
                value: department.building,
              },
              {
                label: "Specializations",
                value: `${specializations.length} ${pluralize(specializations.length, "Specialization")}`,
              },
              {
                label: "Total Enrollment",
                value: `${department.totalEnrollment} ${pluralize(department.totalEnrollment, "Enrolled Student")}`,
              },
            ]}
          />
        </div>

        {/* Specializations Section */}
        <section className="mt-8">
          <SectionHeading
            title="Specializations"
            count={specializations.length}
          />
          <Card padding="none" className="overflow-hidden">
            <ul className="divide-y divide-line">
              {specializationsWithCounts.map(({ specialization, studentCount }) => (
                <SpecializationCard
                  key={specialization.slug}
                  as="li"
                  specialization={specialization}
                  studentCount={studentCount}
                  className="border-0 rounded-none"
                />
              ))}
            </ul>
          </Card>
        </section>

        {/* Students in this Department Section */}
        <section className="mt-8">
          <SectionHeading
            title="Students in this Department"
            count={students.length}
            rightSlot={
              <div className="flex items-center gap-2 select-none">
                <span className="font-semibold text-muted">
                  Filtered by Department:
                </span>
                <Badge variant="filter">{department.name}</Badge>
              </div>
            }
          />

          {students.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={<Users className="size-5" aria-hidden="true" />}
                title="No students in this department yet"
                description={`No sample records are assigned to ${department.name} in this directory.`}
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
