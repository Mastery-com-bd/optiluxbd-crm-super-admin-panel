/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";
import { TCoupon } from "@/types/coupons";



export const getAllCoupons = async (query?: Query) => {
  try {
    const result = await readData("/subscriptions/admin/coupons", ["Coupons"], query);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createCoupon = async (data: any) => {
  try {
    const result = await createData<any>("/subscriptions/admin/coupons", "/dashboard/coupons", data);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
