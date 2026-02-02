import AllFeature from "@/components/dashboard/feature/allfeatures/AllFeature";
import { getALlFeatures } from "@/service/feature";

const FeaturePage = async () => {
  const result = await getALlFeatures();
  const features = result?.data;
  return (
    <section>
      <AllFeature features={features} />
    </section>
  );
};

export default FeaturePage;
