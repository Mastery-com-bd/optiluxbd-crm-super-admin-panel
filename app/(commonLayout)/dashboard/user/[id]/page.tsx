import UserDetails from "@/components/dashboard/user/userDetails/UserDetails";
import { getUserById } from "@/service/user";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getUserById(id);
  const user = result?.data;
  return (
    <section>
      <UserDetails user={user} />
    </section>
  );
};

export default UserDetailsPage;
