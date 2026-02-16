"use server";

import { TCreateBroadCast } from "@/components/dashboard/broadcast/allBroadcast/CreateBroadcast";
import { createData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";

export async function getAllBroadcast(query?: Query) {
  const res = await readData("/admin/broadcasts", ["Broadcast"], query);
  return res;
}

export const createBroadcast = async (data: TCreateBroadCast) => {
  const res = await createData<TCreateBroadCast>(
    "/admin/broadcasts",
    "/dashboard/broadcasts",
    data,
  );
  return res;
};
