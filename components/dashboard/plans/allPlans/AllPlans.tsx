import PageHeader from "@/components/shared/pageHeader";
import { TPlan } from "@/types/plan.types";
import PlanCard from "./PlanCard";
import CreatePlan from "./CreatePlan";

const AllPlans = ({ plans }: { plans: TPlan[] }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader title="Subscription Plans" />
        <CreatePlan />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanCard key={plan?.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default AllPlans;
