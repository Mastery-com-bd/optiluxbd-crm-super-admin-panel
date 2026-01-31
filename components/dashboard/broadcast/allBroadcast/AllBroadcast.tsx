"use client";
import PageHeader from "@/components/shared/pageHeader";
import { TBroadcast } from "@/types/broadcast.types";
import CreateBroadcast from "./CreateBroadcast";
import { broadcastTableColumn } from "./BroadcastTable";
import TableComponent from "@/components/ui/TableComponent";

const AllBroadcast = ({ broadcasts }: { broadcasts: TBroadcast[] }) => {
  const column = broadcastTableColumn();
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Broadcast List"
          description="Here all the system broadcast is available with the list and "
        />
        <CreateBroadcast />
      </div>

      <TableComponent data={broadcasts} columns={column} />
    </div>
  );
};

export default AllBroadcast;
