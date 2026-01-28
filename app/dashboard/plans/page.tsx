import AllPlans from "@/components/dashboard/plans/allPlans/AllPlans";
import { getAllPlans } from "@/service/plans";

export type TSearchParams = Promise<{
  [key: string]: string | string[] | number | undefined;
}>;

const AllPlansPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;

  const result = await getAllPlans(query);
  const plans = result?.data || [];

  return (
    <section>
      <AllPlans plans={plans} />
    </section>
  );
};

export default AllPlansPage;
