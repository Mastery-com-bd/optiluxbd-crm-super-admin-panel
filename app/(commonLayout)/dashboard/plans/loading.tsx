import { Skeleton } from "@/components/ui/skeleton";
import PageHeaderSkeleton from "@/components/ui/skeleton/PageHeaderSkeleton";
import PlanCardSkeleton from "@/components/ui/skeleton/PlanCardSkeleton";

const loading = () => {
  return (
    <section className="space-y-4 p-4">
      <PageHeaderSkeleton>
        <Skeleton className="h-10 w-40" />
      </PageHeaderSkeleton>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PlanCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default loading;
