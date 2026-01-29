import FeatureDetails from "@/components/dashboard/feature/featureDetails/FeatureDetails";
import { getFeatureById } from "@/service/feature";

const FeatureDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getFeatureById(id);
  const feature = result?.data;

  return (
    <section>
      <FeatureDetails feature={feature} />
    </section>
  );
};

export default FeatureDetailsPage;
