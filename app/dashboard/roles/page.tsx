import AllRoles from "@/components/dashboard/rolesAndPermission/allRoles/AllRoles";
import { GetAllRoles } from "@/service/rolesAndPermission";

const RolesPage = async () => {
  const result = await GetAllRoles();
  const roles = result?.data;
  return (
    <section>
      <AllRoles roles={roles} />
    </section>
  );
};

export default RolesPage;
