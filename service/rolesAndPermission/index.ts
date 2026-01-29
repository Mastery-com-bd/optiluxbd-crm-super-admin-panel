/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";

export const GetAllRoles = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/roles`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Roles"],
        revalidate: 30,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const GetAllPermissions = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/permissions`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Permission"],
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
