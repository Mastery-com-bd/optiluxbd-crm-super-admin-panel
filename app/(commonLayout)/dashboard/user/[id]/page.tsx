import UserDetails from "@/components/dashboard/user/userDetails/UserDetails";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section>
      <UserDetails />
    </section>
  );
};

export default UserDetailsPage;
