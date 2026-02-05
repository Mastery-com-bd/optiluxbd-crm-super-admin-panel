import PageHeader from "@/components/shared/pageHeader";
import { TPlan } from "@/types/plan.types";
import PlanCard from "./PlanCard";
import CreatePlan from "./CreatePlan";
import { TFeatureData } from "@/types/feature.types";

const AllPlans = ({
  plans,
  features,
}: {
  plans: TPlan[];
  features: TFeatureData[];
}) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader title="Subscription Plans" />
        <CreatePlan features={features} />
      </div>

      {plans.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan?.id} plan={plan} features={features} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p>No Plan available right now</p>
        </div>
      )}
    </div>
  );
};

export default AllPlans;
