/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { TCreateBroadCast } from "@/components/dashboard/broadcast/allBroadcast/CreateBroadcast";
import { createData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";
import { getAccesstoken } from "../authService";

type TBroadcastForm = {
  title: string;
  message: string;
  priority: string;
};

export async function getAllBroadcast(query?: Query) {
  const res = await readData("/admin/broadcasts", ["Broadcast"], query);
  return res;
}

export const createBroadcast = async (data: TCreateBroadCast) => {
  const res = await createData<TCreateBroadCast>("/admin/broadcasts", "/dashboard/broadcasts", data);
  return res;
};
