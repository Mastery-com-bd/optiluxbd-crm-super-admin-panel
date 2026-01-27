/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { buildParams } from "@/utils/paramsBuilder";
import { getAccesstoken } from "../authService";
import { TQuery } from "../plans";
import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";

type TBroadcastForm = {
  title: string;
  message: string;
  priority: string;
};

export const getAllBroadcast = async (query?: TQuery) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/broadcasts?${buildParams(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Broadcasts"],
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
