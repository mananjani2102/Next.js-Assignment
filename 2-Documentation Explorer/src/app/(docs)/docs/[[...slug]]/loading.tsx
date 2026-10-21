export default function DocsLoading() {
  return (
    <div className="w-full" aria-busy="true">
      <span className="sr-only">Loading documentation...</span>

      {/* Breadcrumb skeleton */}
      <div className="h-4 w-52 bg-surface border border-line rounded-xs mb-8" />

      {/* Title skeleton */}
      <div className="h-10 w-72 max-w-full bg-surface border border-line rounded-xs mb-4" />

      {/* Two lead lines */}
      <div className="h-5 w-full max-w-2xl bg-surface border border-line rounded-xs mb-2.5" />
      <div className="h-5 w-4/5 max-w-xl bg-surface border border-line rounded-xs mb-8" />

      {/* Rule */}
      <hr className="border-line my-8" />

      {/* 4 paragraph blocks */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-full bg-surface border border-line rounded-xs" />
          <div className="h-4 w-11/12 bg-surface border border-line rounded-xs" />
          <div className="h-4 w-4/5 bg-surface border border-line rounded-xs" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-surface border border-line rounded-xs" />
          <div className="h-4 w-5/6 bg-surface border border-line rounded-xs" />
          <div className="h-4 w-3/4 bg-surface border border-line rounded-xs" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-surface border border-line rounded-xs" />
          <div className="h-4 w-11/12 bg-surface border border-line rounded-xs" />
          <div className="h-4 w-2/3 bg-surface border border-line rounded-xs" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-surface border border-line rounded-xs" />
          <div className="h-4 w-4/5 bg-surface border border-line rounded-xs" />
          <div className="h-4 w-3/5 bg-surface border border-line rounded-xs" />
        </div>
      </div>
    </div>
  );
}
