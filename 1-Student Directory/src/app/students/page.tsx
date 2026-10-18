import type { Metadata } from "next";
import { getDepartments, getStudents } from "@/lib/directory";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentsExplorer } from "@/components/students/StudentsExplorer";

export const metadata: Metadata = {
  title: "Students",
  description: "Browse students and view their profiles.",
};

export default async function StudentsPage() {
  const [students, departments] = await Promise.all([
    getStudents(),
    getDepartments(),
  ]);

  return (
    <div className="pt-8 pb-12">
      <PageContainer size="wide">
        <PageHeader
          title="Students"
          description="Browse students and view their profiles."
        />
        <StudentsExplorer students={students} departments={departments} />
      </PageContainer>
    </div>
  );
}
