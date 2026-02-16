import AllBroadcast from "@/components/dashboard/broadcast/allBroadcast/AllBroadcast";
import { getAllBroadcast } from "@/service/broadcast";
import { fetchOrganizations } from "@/service/OrganaizationService";
import { Query, TSearchParams } from "@/types/shared";

const BroadcastPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const [broadcastResult, allOrganizationResult] = await Promise.all([
    getAllBroadcast(),
    fetchOrganizations(query as Query),
  ]);
  const broadcasts = broadcastResult?.data || [];
  const organizations = allOrganizationResult?.data || [];
  console.log(broadcastResult?.data);
  return (
    <section>
      <AllBroadcast broadcasts={broadcasts} organizations={organizations} />
    </section>
  );
};

export default BroadcastPage;
