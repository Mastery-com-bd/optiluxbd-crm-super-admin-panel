"use server";
import { readData } from "@/service/apiService/crud";
import { Query } from "@/types/shared";

export async function getAllPlan(query?: Query) {
  const res = await readData("/subscriptions/admin/plans", ["Plan"], query);
  return res;
}
