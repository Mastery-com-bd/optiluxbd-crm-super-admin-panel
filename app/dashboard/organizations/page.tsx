import AllOrganizations from "@/components/dashboard/organizations/AllOrganizations";
import PageHeader from "@/components/shared/pageHeader";
import { fetchOrganizations } from "@/service/OrganaizationService";
import { Query, TSearchParams } from "@/types/shared";

export default async function Organization({ searchParams }: { searchParams: TSearchParams }) {

    const query = await searchParams
    const organizations = await fetchOrganizations(query as Query);
    return (
        <div>
            <PageHeader title="Organizations" description="this is organization page." />
            <AllOrganizations organizations={organizations.data} />
        </div>
    )
}
