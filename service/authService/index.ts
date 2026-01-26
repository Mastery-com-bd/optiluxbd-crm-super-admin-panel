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
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result = await res.json();
    console.log(result);
    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result?.data?.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 day
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
// export const getNewToken = async () => {
//   try {
//     const res = await fetch(`${config.next_public_base_api}/auth/get-token`, {
//       method: "POST",
//       headers: {
//         Authorization: (await cookies()).get("refreshToken")!.value,
//       },
//     });
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

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
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(`${config.next_public_base_api}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log(result);
    if (result.success) {
      // (await cookies()).delete("refreshToken");
      (await cookies()).delete("accessToken");
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
