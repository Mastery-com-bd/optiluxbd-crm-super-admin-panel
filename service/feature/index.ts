/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { TCreateFeature } from "@/components/dashboard/feature/allfeatures/CreateFeature";
import { revalidatePath } from "next/cache";

export const getALlFeatures = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/features`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Features"],
        revalidate: 30,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getFeatureById = async (id: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/features/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Features"],
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

export const createFeature = async (data: TCreateFeature) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/features`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard/features");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateFeature = async (
  data: Partial<TCreateFeature>,
  id: number,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/features/${id}`,
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
    revalidatePath("/dashboard/features");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteFeature = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/features/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/features");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
