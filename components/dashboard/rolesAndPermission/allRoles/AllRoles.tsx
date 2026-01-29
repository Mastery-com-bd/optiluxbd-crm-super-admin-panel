"use client";

import PageHeader from "@/components/shared/pageHeader";
import TableComponent from "@/components/ui/TableComponent";
import { TRoles } from "@/types/roles.types";
import { RoleTableColumn } from "./RolesTableColumn";

const AllRoles = ({ roles }: { roles: TRoles[] }) => {
  const column = RoleTableColumn();
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Roles List"
          description="Here all the roles with the permission for the system is listed "
        />
      </div>

      <TableComponent data={roles} columns={column} />
    </div>
  );
};

export default AllRoles;
