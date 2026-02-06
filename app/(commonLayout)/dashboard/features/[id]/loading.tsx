import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedetailsLoading = () => {
  return (
    <div className="space-y-4">
      {/* Back button */}
      <div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>

      {/* Card */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-xl">
        {/* Header */}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            {/* Feature name */}
            <Skeleton className="h-6 w-40" />

            {/* Status badge */}
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardHeader>

        <Separator className="bg-white/10" />

        {/* Content */}
        <CardContent className="space-y-4 pt-4">
          {/* Slug */}
          <div className="flex items-start gap-3">
            {/* Icon */}
            <Skeleton className="h-5 w-5 rounded-full mt-1" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            {/* Icon */}
            <Skeleton className="h-5 w-5 rounded-full mt-1" />

            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Created At */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full mt-1" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Updated At */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full mt-1" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedetailsLoading;
