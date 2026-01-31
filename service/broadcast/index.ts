/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { readData } from "../apiService/crud";
import { Query } from "@/types/shared";

type TBroadcastForm = {
  title: string;
  message: string;
  priority: string;
};

export const getAllBroadcast = async (query?: Query) => {
  try {
    const result = await readData("/admin/broadcasts", ["Broadcasts"], query);
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createBroadcast = async (data: TBroadcastForm) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/broadcasts`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard/broadcasts");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
