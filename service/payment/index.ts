/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";

type TCreatePayment = {
  organizationId: number;
  planId: number;
  cycle: "MONTHLY" | "YEARLY" | "DAILY";
  amount: number;
  paymentMethod:
    | "BANK_TRANSFER"
    | "MANUAL"
    | "STRIPE"
    | "SSLCOMMERZ"
    | "BKASH"
    | "NAGAD"
    | "CASH";
  transactionReference: string;
  notes: string;
};

export const getPaymentList = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/payments`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Payments"],
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

export const approvePayment = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/payments/${id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/payments");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const rejectPayment = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/payments/${id}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/payments");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createPayment = async (data: TCreatePayment) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/manual-payment`,
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
    revalidatePath("/dashboard/payments");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const downloadInvoice = async (id: string): Promise<any> => {
  const token = (await getAccesstoken()) as string;

  const res = await fetch(
    `${config.next_public_base_api}/subscriptions/admin/payments/${id}/invoice`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch invoice: ${res.status} ${res.statusText}`);
  }

  const blob = await res.blob();

  return blob;
};
