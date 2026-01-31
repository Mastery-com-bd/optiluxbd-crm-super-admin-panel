import AllSupportList from "@/components/dashboard/support/AllSupportList";
import PageHeader from "@/components/shared/pageHeader";
import { getAllSupportToken } from "@/service/support"

export default async function Support() {
    const data = await getAllSupportToken();
    return (
        <div>
            <PageHeader title="All Support Requests" description="Manage support sessions form here." />
            <AllSupportList tickets={data.data} />
        </div>
    )
}
