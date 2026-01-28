import Organization from "@/components/dashboard/organizations/Organization";
import RevenueSection from "@/components/dashboard/customComponent/shared/RevenewSection";
import DashboardOverview from "@/components/dashboard/customComponent/shared/DashboardOverview";

export default function SuperAdminDashboard() {
  return (
    <div>
      <DashboardOverview />
      <RevenueSection />
      <Organization />
    </div>
  );
}
