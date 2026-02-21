"use client";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { TPermission } from "@/types/permission.types";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";

export const permissionTableColumn = (): ColumnDef<TPermission>[] => [
  {
    id: "key",
    header: "Key",
    cell: ({ row }) => {
      const key = row.original?.key;
      return <p>{key}</p>;
    },
  },
  {
    id: "name",
    header: "name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      return <TooltipComponent name={name} trimedName={trimedName} />;
    },
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original?.description;
      const trimedName =
        description.length > 30
          ? description.slice(0, 30) + "..."
          : description;
      return <TooltipComponent name={description} trimedName={trimedName} />;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.created_at),
      );

      return (
        <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },

  //   {
  //     id: "action",
  //     header: "Action",
  //     cell: ({ row }) => {
  //       const id = row.original?.id;
  //       const category = row.original;
  //       const handleDelete = async (
  //         id: string,
  //         setOpen: Dispatch<SetStateAction<boolean>>,
  //         setLoading: Dispatch<SetStateAction<boolean>>,
  //       ) => {
  //         setLoading(true);
  //         const toastId = toast.loading("category deleting", { duration: 3000 });
  //         try {
  //           const result = await deleteCategory(id);
  //           if (result?.success) {
  //             toast.success(result?.message, { id: toastId, duration: 3000 });
  //             setLoading(false);
  //             setOpen(false);
  //           } else {
  //             toast.error(result?.message, { id: toastId, duration: 3000 });
  //             setLoading(false);
  //           }
  //         } catch (error: any) {
  //           console.log(error);
  //           setLoading(false);
  //         }
  //       };

  //       return (
  //         <CategoryDropdown id={id} handleDelete={handleDelete}>
  //           <CreateCategory category={category} />
  //         </CategoryDropdown>
  //       );
  //     },
  //   },
];
