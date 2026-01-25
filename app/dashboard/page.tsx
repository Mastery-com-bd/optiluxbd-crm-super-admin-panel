import DashboardOverview from "@/components/dashboard/DashboardOverview";
import Organization from "@/components/dashboard/Organization";
import RevenueSection from "@/components/dashboard/RevenewSection";

export default function SuperAdminDashboard() {
    return (
        <div>
            <DashboardOverview />
            <RevenueSection />
            <Organization />
        </div>
    )
}