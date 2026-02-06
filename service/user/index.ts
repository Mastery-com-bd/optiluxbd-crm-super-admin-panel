/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { TReason } from "@/components/dashboard/user/allUser/UserRejectModal";

export type TCreateUserData = {
  name: string;
  email: string;
  roleId: number;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DISABLED" | "REJECTED";
  is_approved?: boolean | undefined;
  isActive?: boolean | undefined;
  email_verified?: boolean | undefined;
};

type TInviteUserForm = {
  name: string;
  email: string;
  roleId: number;
  phone: string;
};

export const getAllUser = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Users"],
        revalidate: 30,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getUserById = async (id: string) => {
  console.log(id);
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Users"],
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

export const createUser = async (data: TCreateUserData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const inviteUser = async (data: TInviteUserForm) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/invite`,
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

export const updateUserStatus = async (
  data: Partial<TCreateUserData>,
  id: number,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/status`,
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
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const approveUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const suspendUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/suspend`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const rejectUser = async (data: TReason, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/reject`,
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

export const getUserPermisssion = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/permissions`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Users"],
        revalidate: 120,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUser = async (
  data: Partial<TCreateUserData>,
  id: number,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
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
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
