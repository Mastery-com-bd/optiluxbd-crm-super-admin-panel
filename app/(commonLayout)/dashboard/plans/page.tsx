import AllPlans from "@/components/dashboard/plans/allPlans/AllPlans";
import { getALlFeatures } from "@/service/feature";
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

  const [plansRes, featuresRes] = await Promise.all([
    getAllPlans(query),
    getALlFeatures(),
  ]);

  const plans = plansRes?.data || [];
  const features = featuresRes?.data || [];

  return (
    <section>
      <AllPlans plans={plans} features={features} />
    </section>
  );
};

export default AllPlansPage;
