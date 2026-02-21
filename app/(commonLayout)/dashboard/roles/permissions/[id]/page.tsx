import UserPermissions from "@/components/dashboard/rolesAndPermission/userPermissions/UserPermissions";
import { GetAllPermissions, getRoleById } from "@/service/rolesAndPermission";
import { TUserRolePermission } from "@/types/permission.types";

const UserPermissionsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [getRolesData, allPermissionData] = await Promise.all([
    getRoleById(id),
    GetAllPermissions(),
  ]);

  const userRolePermissions =
    (getRolesData?.data?.permissions as TUserRolePermission[]) || [];
  const rolePermissions = userRolePermissions.flatMap(
    (item) => item.permission,
  );

  const permissions = allPermissionData?.data || [];
  const roleId = getRolesData?.data?.id;

  return (
    <section>
      <UserPermissions
        permissions={permissions}
        userPermissions={rolePermissions}
        id={roleId}
      />
    </section>
  );
};

export default UserPermissionsPage;
