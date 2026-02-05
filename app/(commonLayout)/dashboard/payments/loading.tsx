import PageHeaderSkeleton from "@/components/ui/skeleton/PageHeaderSkeleton";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";

const PaymentListLoading = () => {
  return (
    <section className="space-y-4 p-4">
      <PageHeaderSkeleton></PageHeaderSkeleton>
      <TableSkeleton columns={10} rows={10} />
    </section>
  );
};

export default PaymentListLoading;
