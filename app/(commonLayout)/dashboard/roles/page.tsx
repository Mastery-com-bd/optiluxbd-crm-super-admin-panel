import AllRoles from "@/components/dashboard/rolesAndPermission/allRoles/AllRoles";
import { GetAllPermissions, GetAllRoles } from "@/service/rolesAndPermission";

const RolesPage = async () => {
  const [allRolesData, allPermissionData] = await Promise.all([
    GetAllRoles(),
    GetAllPermissions(),
  ]);

  const roles = allRolesData?.data || [];
  const permissions = allPermissionData?.data || [];

  return (
    <section>
      <AllRoles roles={roles} permissions={permissions} />
    </section>
  );
};

export default RolesPage;
