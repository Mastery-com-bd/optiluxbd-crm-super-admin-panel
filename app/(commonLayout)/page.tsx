import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import Organization from "@/components/dashboard/organizations/Organization";
import { getAnalytics } from "@/service/analytics";

const HomePage = async () => {
  const result = await getAnalytics();
  const analytics = result?.data || {};

  return (
    <div>
      <DashboardOverview analytics={analytics} />
      <RevenueSection />
      <Organization />
    </div>
  );
};

export default HomePage;
