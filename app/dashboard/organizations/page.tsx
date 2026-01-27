import AllOrganizations from "@/components/dashboard/organizations/AllOrganizations";
import PageHeader from "@/components/shared/pageHeader";
import { fetchOrganizations } from "@/service/OrganaizationService";

export default async function Organization() {
  const organizations = await fetchOrganizations();
  return (
    <div>
      <PageHeader
        title="Organizations"
        description="this is organization page."
      />
      <AllOrganizations />
    </div>
  );
}
