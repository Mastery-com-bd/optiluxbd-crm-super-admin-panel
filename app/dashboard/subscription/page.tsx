import { getAllSubscriptions } from "@/service/subscription";
import { TSearchParams } from "../plans/page";

const AllSubscriptionPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getAllSubscriptions(query);
  console.log("subscription result", result);
  return <div>this is all subscription</div>;
};

export default AllSubscriptionPage;
