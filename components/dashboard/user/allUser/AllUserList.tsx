"use client";

import PageHeader from "@/components/shared/pageHeader";
import TableComponent from "@/components/ui/TableComponent";
import { TUserData } from "@/types/user.types";
import { userTableColumn } from "./userColumn";
import CreateUser from "./CreateUser";
import { TRoles } from "@/types/roles.types";

const AllUserList = ({
  users,
  roles,
}: {
  users: TUserData[];
  roles: TRoles[];
}) => {
  const column = userTableColumn();

  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="User List"
          description="Here all the supporting users list are available"
        />
        <CreateUser roles={roles} />
      </div>
      <TableComponent data={users} columns={column} />
    </div>
  );
};

export default AllUserList;
