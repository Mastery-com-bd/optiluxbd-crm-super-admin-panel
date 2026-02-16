import UserActions from "@/components/dashboard/userActions/user-actions";
import { getUserActions } from "@/service/logs/user-actions";
import { fetchOrganizations } from "@/service/OrganaizationService";
import { getAllUser, getAllUserforActivityHistory } from "@/service/user";
import { Organization } from "@/types/organizations";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const query = await searchParams;
  const limit = query.limit || "10";
  const offset = query.offset || "0";
  const userId = Number(query.userId);
  const organizationName = query.organizationName || "";
  const search = query.search || "";

  let organizationList: Organization[] = [];
  if (organizationName) {
    const data = await fetchOrganizations({
      search: organizationName,
      limit: "10",
    });
    organizationList = data?.data || [];
  }

  const data = await getUserActions({
    userId,
    query: {
      ...query,
      limit,
      offset,
    },
  });

  let userLists;

  if (search) {
    const data = await getAllUserforActivityHistory({ search });
    userLists = data?.data || [];
  }

  return (
    <div className="space-y-6">
      <UserActions
        userActions={data}
        organizationList={organizationList}
        userLists={userLists}
      />
    </div>
  );
};

export default Page;
