"use client";
import { TPermission } from "@/types/permission.types";
import { permissionTableColumn } from "./PermissionTableColumn";
import PageHeader from "@/components/shared/pageHeader";
import TableComponent from "@/components/ui/TableComponent";

const AllPermission = ({ permissions }: { permissions: TPermission[] }) => {
  const column = permissionTableColumn();
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Permission List"
          description="Here all the permissions for the system is listed "
        />
      </div>

      <TableComponent data={permissions} columns={column} />
    </div>
  );
};

export default AllPermission;
