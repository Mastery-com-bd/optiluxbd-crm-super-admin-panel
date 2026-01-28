/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { TQuery } from "../plans";
import { buildParams } from "@/utils/paramsBuilder";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

type TCouponForm = {
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
};

export const getAllCoupons = async (query?: TQuery) => {
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
          tags: ["Coupons"],
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

export const createCoupon = async (data: TCouponForm) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/admin/coupons`,
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
    revalidatePath("/dashboard/Coupons");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
