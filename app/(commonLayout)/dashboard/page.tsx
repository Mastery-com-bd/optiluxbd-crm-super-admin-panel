import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import UserAnalytics from "@/components/dashboard/dashboard/UserAnalytics";

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
  const revenew = useRevenewResult?.data || [];
  const usageAnalytics = usageAnalyticsResult?.data || [];
  const growth = growthResult?.data || [];
  return (
    <div>
      <DashboardOverview analytics={analytics} />
      <RevenueSection reveneu={revenew} />
      <UserAnalytics usageAnalytics={usageAnalytics} growth={growth} />
    </div>
  );
};

export default HomePage;
