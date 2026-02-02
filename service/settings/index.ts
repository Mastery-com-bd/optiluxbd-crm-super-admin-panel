/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { TBranding } from "@/types/settings.types";

export const getBranding = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/settings/branding`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Settings"],
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

export const updateBranding = async (data: Partial<TBranding>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/settings/branding`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/settings");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadLogo = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/settings/branding/logo`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: data,
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/settings");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadFavicon = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/settings/branding/favicon`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: data,
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/settings");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
