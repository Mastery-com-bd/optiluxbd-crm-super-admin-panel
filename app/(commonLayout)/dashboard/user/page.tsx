import AllUserList from "@/components/dashboard/user/allUser/AllUserList";
import { GetAllRoles } from "@/service/rolesAndPermission";
import { getAllUser } from "@/service/user";
import { TUserData } from "@/types/user.types";

const UserListPage = async () => {
  const [usersData, rolesData] = await Promise.all([
    getAllUser(),
    GetAllRoles(),
  ]);
  const users = usersData?.data || [];
  const roles = rolesData?.data || [];
  const visibleUsers =
    users
      .map((user: TUserData) => ({
        ...user,
        roles: user.roles.filter((r) => r.role.name !== "Super Admin"),
      }))
      .filter((user: TUserData) => user.roles.length > 0) || [];

  return (
    <section>
      <AllUserList users={visibleUsers} roles={roles} />
    </section>
  );
};

export default UserListPage;
