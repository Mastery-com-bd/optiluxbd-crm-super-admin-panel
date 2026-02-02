/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionDropdown from "@/components/ui/ActionDropdown";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { TPaytment, TStatus } from "@/types/payment.types";
import { approvePayment } from "@/service/payment";

export const paymentTableColumn = (): ColumnDef<TPaytment>[] => [
  {
    id: "organization",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.original?.organization?.name;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />;
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => {
      const method = row.original?.paymentMethod;
      return <p>{method}</p>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original?.amount;
      return (
        <p className="text-xs whitespace-nowrap text-green-800">{amount}</p>
      );
    },
  },
  {
    id: "billingCycle",
    header: "Billing",
    cell: ({ row }) => {
      const billingCycle = row.original?.billingCycle;
      return <p className="text-xs whitespace-nowrap">{billingCycle}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status as TStatus;
      return (
        <span
          className={`px-3 py-1 rounded-full  font-medium text-xs whitespace-nowrap `}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.original?.plan?.name;
      return <p>{plan}</p>;
    },
  },
  {
    accessorKey: "transactionReference",
    header: "Transaction",
    cell: ({ row }) => {
      const transactionId = row.original?.transactionReference;
      const trimedName =
        transactionId.length > 10
          ? transactionId.slice(0, 10) + "..."
          : transactionId;
      return (
        <div className=" flex items-center gap-2 text-xs whitespace-nowrap">
          <TooltipComponent name={transactionId} trimedName={trimedName} />;
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Started",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.startDate),
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
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.endDate),
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
      const handleDelete = async (
        id: string,
        setOpen: Dispatch<SetStateAction<boolean>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
      ) => {
        setLoading(true);
        const toastId = toast.loading("feature deleting", { duration: 3000 });
        try {
          const result = await approvePayment(id);
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
          path={`/dashboard/payments/${row.original?.id}`}
          handleDelete={handleDelete}
          type="confirm"
        ></ActionDropdown>
      );
    },
  },
];
