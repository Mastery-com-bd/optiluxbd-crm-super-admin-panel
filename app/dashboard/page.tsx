import Organization from "@/components/dashboard/organizations/Organization";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";
import { getAnalytics } from "@/service/analytics";

export default async function SuperAdminDashboard() {
  const result = await getAnalytics();
  const analytics = result?.data || {};

  return (
    <div>
      <DashboardOverview analytics={analytics} />
      <RevenueSection />
      <Organization />
    </div>
  );
}
