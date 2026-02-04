import OrgDetails from "@/components/dashboard/organizations/OrgDetails";
import { getOrganizationById } from "@/service/payment/OrganaizationService";

export default async function OrganizationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getOrganizationById(Number(id));
  return (
    <div>
      <OrgDetails data={data.data} />
    </div>
  );
}
