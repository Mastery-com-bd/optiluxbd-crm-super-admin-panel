import OrganizationForm from "@/components/dashboard/organizations/ManipulateOrganization";
import PageHeader from "@/components/shared/pageHeader";

export default function CreateOrganization() {
    return (
        <div>
            <PageHeader title="Create a new organization" description="the quick brown fox..." />
            <OrganizationForm />
        </div>
    )
}
