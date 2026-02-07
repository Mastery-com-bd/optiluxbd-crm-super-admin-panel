import { Skeleton } from "@/components/ui/skeleton";

const LoadingDetailsLoading = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Skeleton className="h-10 w-24 rounded-lg" />

      {/* Role Info Card */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <Skeleton className="h-6 w-1/3 rounded-md" /> {/* Title */}
        <Skeleton className="h-4 w-2/3 rounded-md" /> {/* Description */}
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </div>

      {/* Permissions Section */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <Skeleton className="h-5 w-1/4 rounded-md" /> {/* CardTitle */}
        <Skeleton className="h-4 w-1/2 rounded-md" /> {/* CardDescription */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-32 w-full rounded-md" /> {/* Content */}
      </div>
    </div>
  );
};

export default LoadingDetailsLoading;
