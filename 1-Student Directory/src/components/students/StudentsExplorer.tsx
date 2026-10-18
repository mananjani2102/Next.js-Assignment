// "use client": live search, department filter and pagination state
"use client";

import { useId, useMemo, useState } from "react";
import { ChevronDown, Search, SearchX } from "lucide-react";
import type { Department, Student } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StudentCard } from "@/components/students/StudentCard";
import { normalizeSearch } from "@/lib/format";

const PAGE_SIZE = 9;

export interface StudentsExplorerProps {
  students: Student[];
  departments: Department[];
}

export function StudentsExplorer({
  students,
  departments,
}: StudentsExplorerProps) {
  const searchInputId = useId();
  const departmentSelectId = useId();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Pre-build department lookup map
  const departmentMap = useMemo(() => {
    return new Map(departments.map((dept) => [dept.slug, dept]));
  }, [departments]);

  // Combined search and department filter
  const filteredStudents = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    return students.filter((student) => {
      // Department filter
      if (selectedDept !== "all" && student.departmentSlug !== selectedDept) {
        return false;
      }

      // Search query filter (matches name, id, email)
      if (normalizedQuery) {
        const matchName = normalizeSearch(student.name).includes(normalizedQuery);
        const matchId = normalizeSearch(student.id).includes(normalizedQuery);
        const matchEmail = normalizeSearch(student.email).includes(normalizedQuery);

        if (!matchName && !matchId && !matchEmail) {
          return false;
        }
      }

      return true;
    });
  }, [students, searchQuery, selectedDept]);

  // Reset page to 1 whenever filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDept("all");
    setCurrentPage(1);
  };

  // Pagination calculation
  const total = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const shown = paginatedStudents.length;

  return (
    <div>
      {/* Accessible live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {total} students found
      </div>

      {/* Toolbar */}
      <Card
        padding="none"
        className="mt-6 p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 min-h-[58px]"
      >
        {/* Left: Search input */}
        <div className="relative w-full sm:max-w-[448px]">
          <label htmlFor={searchInputId} className="sr-only">
            Search students
          </label>
          <Search
            className="size-4 text-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            autoComplete="off"
            placeholder="Search students"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-[34px] w-full text-body border border-line rounded-card pl-9 pr-3 bg-surface text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          />
        </div>

        {/* Right: Department selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label
            htmlFor={departmentSelectId}
            className="text-small text-muted whitespace-nowrap select-none"
          >
            Department:
          </label>
          <div className="relative">
            <select
              id={departmentSelectId}
              aria-label="Department"
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="h-[34px] w-40 text-body border border-line rounded-card appearance-none pl-3 pr-8 bg-surface text-ink cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <option value="all">All departments</option>
              {departments.map((dept) => (
                <option key={dept.slug} value={dept.slug}>
                  {dept.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="size-4 text-subtle absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </Card>

      {/* Grid or Empty State */}
      {total === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<SearchX className="size-5" aria-hidden="true" />}
            title="No students match your search"
            description="Try a different name or ID, or choose another department."
            action={
              <Button variant="secondary" onClick={handleClearFilters}>
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedStudents.map((student) => {
              const department = departmentMap.get(student.departmentSlug);
              if (!department) return null;

              return (
                <StudentCard
                  key={student.id}
                  variant="directory"
                  student={student}
                  department={department}
                />
              );
            })}
          </div>

          {/* Footer row */}
          <div className="mt-8 border-t border-line pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-body text-muted select-none">
              Showing <span className="font-semibold text-ink">{shown}</span> of{" "}
              <span className="font-semibold text-ink">{total}</span> students
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                aria-label="Next page"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
