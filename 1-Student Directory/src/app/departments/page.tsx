import type { Metadata } from "next";
import {
  getDepartments,
  getDirectoryMeta,
  getSpecializationsByDepartment,
} from "@/lib/directory";
import { pluralize } from "@/lib/format";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { DepartmentCard } from "@/components/departments/DepartmentCard";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore academic faculties, programs, and enrolled students.",
};

export default async function DepartmentsPage() {
  const [departments, meta] = await Promise.all([
    getDepartments(),
    getDirectoryMeta(),
  ]);

  // Load specialization counts for all departments
  const departmentsWithCounts = await Promise.all(
    departments.map(async (dept) => {
      const specs = await getSpecializationsByDepartment(dept.slug);
      return {
        department: dept,
        specializationCount: specs.length,
      };
    })
  );

  const facultyLabel = pluralize(
    departments.length,
    "Active Academic Faculty",
    "Active Academic Faculties"
  );

  return (
    <div className="pt-8 pb-12">
      <PageContainer size="medium">
        <PageHeader
          title="Departments"
          description="Explore academic faculties, programs, and enrolled students."
          divided
          aside={
            <div className="flex items-center gap-2 text-small text-muted select-none">
              <span
                className="size-2 rounded-full bg-primary shrink-0 inline-block"
                aria-hidden="true"
              />
              <span>
                {`${departments.length} ${facultyLabel}`}
              </span>
            </div>
          }
        />

        {/* Departments List */}
        <Card padding="none" className="mt-6 overflow-hidden">
          <ul className="divide-y divide-line">
            {departmentsWithCounts.map(({ department, specializationCount }) => (
              <DepartmentCard
                key={department.slug}
                as="li"
                department={department}
                specializationCount={specializationCount}
                className="border-0 rounded-none"
              />
            ))}
          </ul>
        </Card>

        {/* Footer text below card */}
        <div className="mt-3 px-1 flex flex-col sm:flex-row justify-between items-center gap-2 text-badge font-semibold select-none">
          <span className="text-muted">
            Curriculum Year {meta.curriculumYear}
          </span>
          <span className="text-subtle">
            Sample data for the Frontend Practice project
          </span>
        </div>
      </PageContainer>
    </div>
  );
}
