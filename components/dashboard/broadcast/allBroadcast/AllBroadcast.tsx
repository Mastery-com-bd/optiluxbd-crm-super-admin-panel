import PageHeader from "@/components/shared/pageHeader";
import { TBroadcast } from "@/types/broadcast.types";
import CreateBroadcast from "./CreateBroadcast";

const AllBroadcast = ({ broadcasts }: { broadcasts: TBroadcast[] }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Broadcast List"
          description="Here all the system broadcast is available with the list and "
        />
        <CreateBroadcast />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanCard key={plan?.id} plan={plan} />
        ))}
      </div> */}
    </div>
  );
};

export default AllBroadcast;
