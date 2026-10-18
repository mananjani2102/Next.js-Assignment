"use client";

import { useEffect } from "react";
import { StatusPanel } from "@/components/ui/StatusPanel";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPanel
      breadcrumbLabel="Error"
      statusLabel="ERROR · UNEXPECTED PROBLEM"
      title="Something went wrong"
      description="An unexpected error interrupted this page. You can try again, or return to the directory."
      actions={
        <>
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="secondary" size="md" href={routes.students()}>
            Return to Students Directory
          </Button>
        </>
      }
    >
      {error.digest && (
        <p className="font-mono text-[12px] text-subtle -mt-4">
          Reference: {error.digest}
        </p>
      )}
    </StatusPanel>
  );
}
