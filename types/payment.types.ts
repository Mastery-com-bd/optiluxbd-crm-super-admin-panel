import { OrganizationData } from "./organizations";
import { TPlan } from "./plan.types";

export type TPaytment = {
  id: number;
  organization: OrganizationData;
  organizationId: number;
  paymentMethod: string;
  amount: string;
  billingCycle: "DAILY" | "MONTHLY" | "YEARLY" | "ONE_TIME";
  plan: TPlan;
  planId: number;
  approvedBy: string | null;
  approver: string | null;
  billingAddress: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  currency: string;
  invoiceNumber: string | null;
  transactionReference: string;
  status: string;
  proofUrl: string | null;
  rejectionReason: string | null;
};
