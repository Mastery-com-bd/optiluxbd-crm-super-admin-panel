/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

type TRegister = {
  name: string;
  email: string;
  password: string;
};

// register functionality
export const register = async (data: TRegister) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

type TLogin = {
  email: string;
  password: string;
};

// login functionality
export const login = async (loginData: TLogin) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get new token functionality
export const getNewToken = async () => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/get-token`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get curretn user functionality
export const getCurrentUser = async () => {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  let decodedData = null;
  if (refreshToken) {
    decodedData = await jwtDecode(refreshToken);
    return decodedData;
  } else {
    return null;
  }
};

// logout functionality
export const logout = async () => {
  const res = await fetch(`${config.next_public_base_api}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  if (result.success) {
    (await cookies()).delete("refreshToken");
    (await cookies()).delete("accessToken");
  }
  return result;
};
