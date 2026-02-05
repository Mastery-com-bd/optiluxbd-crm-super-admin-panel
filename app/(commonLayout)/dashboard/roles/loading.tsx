import { Skeleton } from "@/components/ui/skeleton";
import PageHeaderSkeleton from "@/components/ui/skeleton/PageHeaderSkeleton";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";

const loading = () => {
  return (
    <section className="space-y-4 p-4">
      <PageHeaderSkeleton>
        <div className="flex  items-center gap-2">
          <Skeleton className="h-10 w-40" />
        </div>
      </PageHeaderSkeleton>

      <TableSkeleton columns={10} rows={10} />
    </section>
  );
};

export default loading;
