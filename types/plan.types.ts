import { TFeature } from "./feature.types";

export type TPlan = {
  id: number;
  name: string;
  description: string | null;
  features: TFeature[];
  isActive: boolean;
  isOneTime: boolean;
  isPublic: boolean;
  maxCustomers: number;
  maxInvoices: number;
  maxLocations: number;
  maxProducts: number;
  maxStorage: number;
  maxApiCalls: number | null;
  trialDays: string;
  maxUsers: string;
  priceDaily: string | null;
  priceMonthly: string;
  priceOneTime: string | null;
  priceYearly: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
};
