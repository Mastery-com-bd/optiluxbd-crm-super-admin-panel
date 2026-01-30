/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";

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
