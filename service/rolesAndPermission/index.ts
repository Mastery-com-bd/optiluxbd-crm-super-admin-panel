/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { TCreateRole } from "@/components/dashboard/rolesAndPermission/allRoles/CreateRoles";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";

export type TUserRoleData = {
  userId: number;
};

type TSetPermission = {
  permissionKeys: string[];
};

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

export const createRole = async (data: TCreateRole) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/roles`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard/roles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getRoleById = async (id: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Roles"],
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

export const removeRole = async (id: string, data: TUserRoleData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}/remove`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const assignRole = async (id: string, data: TUserRoleData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}/assign`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const setPermission = async (id: string, data: TSetPermission) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}/permissions`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/roles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateRole = async (id: string, data: Partial<TCreateRole>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}`,
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
    revalidatePath("/dashboard/roles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteRole = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/roles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/roles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
