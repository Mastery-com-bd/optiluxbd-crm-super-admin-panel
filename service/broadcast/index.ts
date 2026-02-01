/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { TCreateBroadCast } from "@/components/dashboard/broadcast/allBroadcast/CreateBroadcast";
import { getAccesstoken } from "../authService";

export const getAllBroadcast = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/broadcasts`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Broadcasts"],
        revalidate: 30,
      },
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createBroadcast = async (data: TCreateBroadCast) => {
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
