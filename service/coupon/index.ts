/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TCoupon } from "@/types/coupons";
import { createData, deleteData, patchData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";



export const getAllCoupons = async (query?: Query) => {
  try {
    const result = await readData("/subscriptions/admin/coupons", ["Coupons"], query);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleCoupon = async (id: string) => {
  try {
    const result = await readData(`/subscriptions/admin/coupons/${id}`, ["Coupon"]);
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

export const enableCoupon = async (id: number) => {
  try {
    const result = await createData<any>(`/subscriptions/admin/coupons/${id}/enable`, "/dashboard/coupons");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const disableCoupon = async (id: number) => {
  try {
    const result = await createData<any>(`/subscriptions/admin/coupons/${id}/disable`, "/dashboard/coupons");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCoupon = async (id: number) => {
  try {
    const result = await deleteData(`/subscriptions/admin/coupons/${id}`, "/dashboard/coupons");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateCoupon = async (id: number, data: { discountValue: number; maxUses: number }) => {
  try {
    const result = await patchData(`/subscriptions/admin/coupons/${id}`, "/dashboard/coupons", data);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
