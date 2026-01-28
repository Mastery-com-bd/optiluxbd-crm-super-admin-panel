/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Switcher from "@/components/ui/Switcher";
import { disablePlan, enablePlan } from "@/service/plans";
import { TPlan } from "@/types/plan.types";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CreatePlan from "./CreatePlan";

const PlanCard = ({ plan }: { plan: TPlan }) => {
  console.log(plan);
  // activity change handler
  const handleChange = async () => {
    const toastId = toast.loading("Updating plan status...", {
      duration: 3000,
    });
    try {
      let result;
      if (plan?.isActive === true) {
        result = await disablePlan(plan?.id);
      } else {
        result = await enablePlan(plan?.id);
      }
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const onPublicChange = async () => {
    console.log(plan?.isPublic);
  };
  return (
    <div className="rounded-xl border p-6 shadow-sm hover:shadow-md transition bg-white/5 space-y-4">
      {/* Header */}
      <div className="flex flex-col items-start gap-3">
        <h2 className="bg-[linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)] px-1 rounded-sm">
          <span className="text-sm  bg-linear-to-r from-white/20 via-white to-white/20 bg-clip-text text-transparent">
            {plan?.name}
          </span>
        </h2>
        {plan?.description && (
          <p className="text-sm text-gray-500 ">{plan?.description}</p>
        )}

        <p className="text-2xl font-bold leading-4">
          ৳{plan?.priceMonthly}
          <span> / month</span>
        </p>

        <p className="text-sm text-green-600 ">
          {plan?.trialDays} days free trial
        </p>

        <p className="flex items-center gap-1 text-sm text-white/80">
          <span className="flex items-center">{plan?.maxUsers} users,</span>
          <span className="flex items-center">
            {plan?.maxCustomers} Custoemrs,
          </span>
          <span className="flex items-center">{plan?.maxStorage} storage</span>
        </p>
      </div>

      {/* Limits */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <p>📦 Products: {plan.maxProducts}</p>
        <p>📍 Locations: {plan.maxLocations}</p>
        <p>🧾 Invoices: {plan.maxInvoices}</p>
        <p>💾 Storage: </p>
        <p>👤 Customers: </p>
      </div>

      {/* Features */}
      <div className="space-y-2 border-y py-3  ">
        <p>Features</p>
        <ul className="space-y-1 px-2 h-28 overflow-y-auto hide-scrollbar ">
          {plan?.features.length > 0 &&
            plan?.features.map((feature) => (
              <li
                key={feature.id}
                className="flex items-center gap-1 text-sm text-white/70"
              >
                <span className="h-1 w-1 rounded-full bg-yellow-600" />
                <span>{feature.name}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-full flex items-center gap-2 ">
          <p className="text-sm text-white/80">Activity</p>
          <Switcher data={plan?.isActive} onChange={handleChange} />
        </div>
        <div className="w-full flex items-center gap-2 ">
          <p className="text-sm text-white/80">Public</p>
          <Switcher data={plan?.isPublic} onChange={onPublicChange} />
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <Link
            href={`/dashboard/admin/combo/${plan?.id}`}
            className="effect rounded-[12px]"
          >
            <button className=" w-7 h-7 p-1.5   cursor-pointer">
              <Eye size={16} className="text-[#DE9C3A]" />
            </button>
          </Link>

          <CreatePlan plan={plan} />

          <button className=" w-7 h-7 p-1.5 rounded-[12px] effect cursor-pointer">
            <Trash2 size={16} className="text-[#F50F0F]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
