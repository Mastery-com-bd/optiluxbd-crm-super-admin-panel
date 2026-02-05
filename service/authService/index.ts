/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

type TLogin = {
  email: string;
  password: string;
};

// login functionality
export const login = async (loginData: TLogin) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api as string}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
    );
    const result = await res.json();

    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result?.data?.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      cookieStore.set("refreshToken", result?.data?.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get new token functionality
export const getNewToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_base_api}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get curretn user functionality
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

// logout functionality
export const logout = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(`${config.next_public_base_api}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAccesstoken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};
