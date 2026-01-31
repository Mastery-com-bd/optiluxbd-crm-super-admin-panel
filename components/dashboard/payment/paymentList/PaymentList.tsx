"use client";

import PageHeader from "@/components/shared/pageHeader";
import TableComponent from "@/components/ui/TableComponent";
import { TPaytment } from "@/types/payment.types";
import { paymentTableColumn } from "./PaymentTable";

const PaymentList = ({ payments }: { payments: TPaytment[] }) => {
  console.log(payments);
  const column = paymentTableColumn();
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Payment List"
          description="This is the payment list of system"
        />
      </div>
      <TableComponent data={payments} columns={column} />
    </div>
  );
};

export default PaymentList;
