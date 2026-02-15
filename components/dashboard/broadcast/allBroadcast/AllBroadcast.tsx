"use client";
import PageHeader from "@/components/shared/pageHeader";
import { TBroadcast } from "@/types/broadcast.types";
import CreateBroadcast from "./CreateBroadcast";
import { broadcastTableColumn } from "./BroadcastTable";
import TableComponent from "@/components/ui/TableComponent";
import { Organization } from "@/types/organizations";

type TAllbroadcastProps = {
  broadcasts: TBroadcast[];
  organizations: Organization[];
};

const AllBroadcast = ({ broadcasts, organizations }: TAllbroadcastProps) => {
  const column = broadcastTableColumn();
  return (
    <div className=" p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Broadcast List"
          description="Here all the system broadcast is available with the list and "
        />
        <CreateBroadcast organizations={organizations} />
      </div>

      <TableComponent data={broadcasts} columns={column} />
    </div>
  );
};

export default AllBroadcast;
