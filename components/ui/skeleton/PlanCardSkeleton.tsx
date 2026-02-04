import { Skeleton } from "../skeleton";

const PlanCardSkeleton = () => {
  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white/5 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-32" /> {/* Plan name */}
        <Skeleton className="h-4 w-56" /> {/* Description */}
        <Skeleton className="h-7 w-28" /> {/* Price */}
        <Skeleton className="h-4 w-40" /> {/* Trial */}
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Limits */}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Features */}
      <div className="space-y-2 border-y py-3">
        <Skeleton className="h-4 w-20" /> {/* Features title */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-7 w-7 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PlanCardSkeleton;
