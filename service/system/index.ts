/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";

export const getSystemHealth = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/health`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getDashboardSummary = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/dashboard/summary`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getActivityLog = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/activity-logs`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
