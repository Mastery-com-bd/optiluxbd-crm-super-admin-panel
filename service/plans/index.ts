/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { buildParams } from "@/utils/paramsBuilder";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";

export type TQuery = {
  [key: string]: string | string[] | number | undefined;
};

export type TPlanForm = {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  isPublic: boolean;
  priceDaily?: number;
  priceMonthly: number;
  priceYearly: number;
  priceOneTime?: number;
  maxUsers: number;
  maxCustomers: number;
  maxLocations: number;
  maxProducts: number;
  maxInvoices: number;
  maxStorage: number;
  maxApiCalls: number;
  trialDays: number;
  isOneTime: boolean;
  features: string[];
};

export type TUpdatePlanFeature = {
  action: "remove" | "add";
  key: string;
  name?: string;
  value?: string;
};

export interface TUpdatePlan {
  features: TUpdatePlanFeature[];
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  isPublic: boolean;
  priceDaily?: number;
  priceMonthly: number;
  priceYearly: number;
  priceOneTime?: number;
  maxUsers: number;
  maxCustomers: number;
  maxLocations: number;
  maxProducts: number;
  maxInvoices: number;
  maxStorage: number;
  maxApiCalls: number;
  trialDays: number;
  isOneTime: boolean;
}

export const getAllPlans = async (query?: TQuery) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/plans?${buildParams(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Plans"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createPlan = async (data: TPlanForm) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/plans`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/plans");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePlan = async (data: Partial<TUpdatePlan>, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/plans/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/plans");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const enablePlan = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/plans/${id}/enable`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/plans");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const disablePlan = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/plans/${id}/disable`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/plans");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
