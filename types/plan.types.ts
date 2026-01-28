import { TFeature } from "./feature.types";

export type TPlan = {
  id: number;
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
  maxUsers: number;
  name: string;
  priceDaily: string | null;
  priceMonthly: string;
  priceOneTime: string | null;
  priceYearly: string;
  slug: string;
  trialDays: number;
  updatedAt: string;
  createdAt: string;
};
