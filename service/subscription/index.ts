/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { TQuery } from "../plans";
import { buildParams } from "@/utils/paramsBuilder";

export const getAllSubscriptions = async (query?: TQuery) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions?${buildParams(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Plans"],
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
