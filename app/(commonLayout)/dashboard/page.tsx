import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import Organization from "@/components/dashboard/organizations/Organization";
import { getAnalytics, getUsageAnalytics } from "@/service/analytics";

const HomePage = async () => {
  const [analyticsResult, usageAnalyticsResult] = await Promise.all([
    getAnalytics(),
    getUsageAnalytics(),
  ]);
  const analytics = analyticsResult?.data || {};
  const usageAnalytics = usageAnalyticsResult?.data;

  return (
    <div>
      <DashboardOverview analytics={analytics} />
      <RevenueSection />
      <Organization />
    </div>
  );
};

export default HomePage;
