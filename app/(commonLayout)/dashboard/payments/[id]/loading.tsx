import { Skeleton } from "@/components/ui/skeleton";

const PaymentDetailsLoading = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Back button */}
        <Skeleton className="h-10 w-10 rounded-md" />

        {/* Title */}
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-36" />
      </div>

      {/* PDF iframe */}
      <Skeleton className="w-full h-[80vh] rounded-md border" />
    </div>
  );
};

export default PaymentDetailsLoading;
