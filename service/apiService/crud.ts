/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { config } from "@/config";
import { buildParams } from "@/utils/paramsBuilder";
import { cookies } from "next/headers";
import { Query } from "@/types/shared";

export async function createData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

//get
export async function readData(
  endPoint: string,
  tags: string[],
  query?: Query,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}${endPoint}?${query ? buildParams(query) : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: [...tags],
        },
      } as RequestInit,
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
}

// delete
export async function deleteData(endPoint: string, revalPath: string) {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as RequestInit);
    revalidatePath(revalPath);
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
}

// update
export async function patchData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    } as RequestInit);
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    return error;
  }
}
