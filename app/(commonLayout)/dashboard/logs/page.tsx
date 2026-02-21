import ActivityLogs from "@/components/dashboard/logs/activity-logs";
import { getRecentLogs, getAuditStatistics } from "@/service/logs";
import { fetchOrganizations } from "@/service/OrganaizationService";
import { Organization } from "@/types/organizations";

const Page = async ({ searchParams }: { searchParams: Promise<{
  [key: string]: string | string[] | undefined;
}> }) => {
    const query = await searchParams;
    const limit = query.limit || "10";
    const offset = query.offset || "0";
    const organizationName = query.organizationName || "";

    const data = await getRecentLogs({ ...query, limit, offset });
    const auditData = await getAuditStatistics({ ...query, limit, offset });

    let organizationList: Organization[] = [];
    if (organizationName) {
      const data = await fetchOrganizations({ search: organizationName, limit: "10" });
      organizationList = data?.data || [];
    }


  return (
    <div>
      <ActivityLogs recentLogs={data} auditStatistics={auditData} organizationList={organizationList} />
    </div>
  );
};

export default Page;
