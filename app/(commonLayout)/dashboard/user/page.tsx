import AllUserList from "@/components/dashboard/user/allUser/AllUserList";
import { GetAllRoles } from "@/service/rolesAndPermission";
import { getAllUser } from "@/service/user";

const UserListPage = async () => {
  const [usersData, rolesData] = await Promise.all([
    getAllUser(),
    GetAllRoles(),
  ]);

  const users = usersData?.data || [];
  const roles = rolesData?.data || [];
  return (
    <section>
      <AllUserList users={users} roles={roles} />
    </section>
  );
};

export default UserListPage;
