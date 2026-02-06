import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import Organization from "@/components/dashboard/organizations/Organization";
import {
  getAnalytics,
  getGrowthStats,
  getRevenewStats,
  getUsageAnalytics,
} from "@/service/analytics";
import { TSearchParams } from "@/types/shared";

const HomePage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = await searchParams;

  const [
    analyticsResult,
    usageAnalyticsResult,
    useRevenewResult,
    growthResult,
  ] = await Promise.all([
    getAnalytics(),
    getUsageAnalytics(),
    getRevenewStats(query),
    getGrowthStats(query),
  ]);

  const analytics = analyticsResult?.data || {};
  const usageAnalytics = usageAnalyticsResult?.data || [];
  const revenew = useRevenewResult?.data;
  const growth = growthResult?.data;
  console.log(revenew);
  console.log(growth);
  console.log(usageAnalytics);
  return (
    <div>
      <DashboardOverview analytics={analytics} />
      <RevenueSection />
      <Organization />
    </div>
  );
};

export default HomePage;
