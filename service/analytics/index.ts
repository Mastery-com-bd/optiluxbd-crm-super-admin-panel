/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { TQuery } from "../plans";

export const getAnalytics = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/analytics/overview`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Analytics"],
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

export const getUsageAnalytics = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/analytics/usage`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Analytics"],
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

export const getGrowthStats = async (query?: TQuery) => {
  const token = (await getAccesstoken()) as string;
  try {
    const params = new URLSearchParams();
    if (query?.period) {
      params.append("period", query?.period.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/admin/analytics/growth?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Analytics"],
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

export const getRevenewStats = async (query?: TQuery) => {
  const token = (await getAccesstoken()) as string;
  try {
    const params = new URLSearchParams();
    if (query?.startDate) {
      params.append("startDate", query?.startDate.toString());
    }
    if (query?.endDate) {
      params.append("endDate", query?.endDate.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/admin/analytics/revenue?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Analytics"],
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
