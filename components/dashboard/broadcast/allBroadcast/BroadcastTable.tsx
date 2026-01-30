"use client";

import { Badge } from "@/components/ui/badge";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { TBroadcast } from "@/types/broadcast.types";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";

export const broadcastTableColumn = (): ColumnDef<TBroadcast>[] => [
  {
    id: "title",
    header: "Title",
    cell: ({ row }) => {
      const name = row.original?.title;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />;
        </div>
      );
    },
  },
  {
    id: "message",
    header: "Message",
    cell: ({ row }) => {
      const name = row.original?.message;
      const trimedName = name.length > 25 ? name.slice(0, 25) + "..." : name;
      return <TooltipComponent name={name} trimedName={trimedName} />;
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: "Priority",
  //   cell: ({ row }) => {
  //     const priority = row.original?.priority;
  //     return <Badge variant="secondary">{priority}</Badge>;
  //   },
  // },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original?.type;
      return <p>{type}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.isActive;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isRead",
    header: "Is Read",
    cell: ({ row }) => {
      const isRead = row.original?.isRead;
      return (
        <Badge variant={isRead ? "default" : "secondary"}>
          {isRead ? "Yes" : "No"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "readAt",
    header: "Read At",
    cell: ({ row }) => {
      const readAt = row.original?.readAt;
      return (
        <>
          {readAt && (
            <h1 className="flex flex-col items-start">
              <span>
                {
                  convertDate(new Date(row.original?.readAt as string))
                    .creationDate
                }
              </span>
              <span>
                {
                  convertDate(new Date(row.original?.readAt as string))
                    .creationTime
                }
              </span>
            </h1>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => {
      const createdBy = row.original?.createdBy;
      return <p>{createdBy}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.createdAt),
      );

      return (
        <h1 className="flex flex-col items-start">
          <span>{creationDate}</span>
          <span>{creationTime}</span>
        </h1>
      );
    },
  },
  // {
  //   accessorKey: "expiresAt",
  //   header: "Expires At",
  //   cell: ({ row }) => {
  //     const readAt = row.original?.expiresAt;
  //     return (
  //       <>
  //         {readAt && (
  //           <h1 className="flex flex-col items-start">
  //             <span>
  //               {
  //                 convertDate(new Date(row.original?.expiresAt as string))
  //                   .creationDate
  //               }
  //             </span>
  //             <span>
  //               {
  //                 convertDate(new Date(row.original?.expiresAt as string))
  //                   .creationTime
  //               }
  //             </span>
  //           </h1>
  //         )}
  //       </>
  //     );
  //   },
  // },
];
