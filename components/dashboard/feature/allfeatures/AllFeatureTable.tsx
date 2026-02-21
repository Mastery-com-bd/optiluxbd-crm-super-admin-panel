/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionDropdown from "@/components/ui/ActionDropdown";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { deleteFeature } from "@/service/feature";
import { TFeatureData } from "@/types/feature.types";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import CreateFeature from "./CreateFeature";
import { formatLabel } from "@/utils/textFormatFunction";

export const featureTableColumn = (): ColumnDef<TFeatureData>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const slug = row.original?.slug;
      return <p>{slug}</p>;
    },
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      const name = row.original?.description;
      const trimedName = name.length > 30 ? name.slice(0, 30) + "..." : name;
      return <TooltipComponent name={name} trimedName={trimedName} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status;
      return <p>{formatLabel(status)}</p>;
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
        <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original?.id;
      const feature = row.original;
      const handleDelete = async (
        id: string,
        setOpen: Dispatch<SetStateAction<boolean>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
      ) => {
        setLoading(true);
        const toastId = toast.loading("feature deleting", { duration: 3000 });
        try {
          const result = await deleteFeature(id);
          if (result?.success) {
            toast.success(result?.message, { id: toastId, duration: 3000 });
            setLoading(false);
            setOpen(false);
          } else {
            toast.error(result?.message, { id: toastId, duration: 3000 });
            setLoading(false);
          }
        } catch (error: any) {
          console.log(error);
          setLoading(false);
        }
      };

      return (
        <ActionDropdown
          id={id.toString()}
          path={`/dashboard/features/${row.original?.id}`}
          handleDelete={handleDelete}
        >
          <CreateFeature feature={feature} />
        </ActionDropdown>
      );
    },
  },
];
