import AllPermission from "@/components/dashboard/rolesAndPermission/allPermission/AllPermission";
import { GetAllPermissions } from "@/service/rolesAndPermission";
import React from "react";

const PermissionsPage = async () => {
  const result = await GetAllPermissions();
  const permissions = result?.data;
  return (
    <section>
      <AllPermission permissions={permissions} />
    </section>
  );
};

export default PermissionsPage;
