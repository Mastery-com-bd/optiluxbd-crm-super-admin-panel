import ActivityLogs from "@/components/dashboard/logs/activity-logs";
import { getRecentLogs, getAuditStatistics } from "@/service/logs";

const Page = async ({ searchParams }: { searchParams: Promise<{
  [key: string]: string | string[] | undefined;
}> }) => {
    const query = await searchParams;
    const limit = query.limit || "10";
    const offset = query.offset || "0";

    const data = await getRecentLogs({ ...query, limit, offset });
    const auditData = await getAuditStatistics({ ...query, limit, offset });


  return (
    <div>
      <ActivityLogs recentLogs={data} auditStatistics={auditData} />
    </div>
  );
};

export default Page;
