import RoleDetails from "@/components/dashboard/rolesAndPermission/roleDetails/RoleDetails";
import { getRoleById } from "@/service/rolesAndPermission";

const RoleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getRoleById(id);
  const role = result?.data;

  return (
    <section>
      <RoleDetails role={role} />
    </section>
  );
};

export default RoleDetailsPage;
