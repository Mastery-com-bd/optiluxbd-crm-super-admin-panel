import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getNewToken, logout } from "./service/authService";
import { isTokenExpired } from "./service/authService/validToken";

const authRoutes = ["/login"];

const rolebasedPrivateUser = {
  LANDLORD_ADMIN: [/^\/$/, /^\/dashboard(\/.*)?$/],
};

type TRole = keyof typeof rolebasedPrivateUser;

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  let token = request.cookies.get("accessToken")?.value;

  const response = NextResponse.next();

  if (!token || (await isTokenExpired(token))) {
    try {
      const data = await getNewToken();
      console.log(data);
      if (!data?.accessToken) {
        await logout();
        return NextResponse.redirect(
          new URL(`/login?redirectPath=${pathname}`, request.url),
        );
      }

      // ✅ Token received → set cookie
      token = data.accessToken as string;

      response.cookies.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    } catch (error) {
      console.error("Refresh token failed", error);
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url),
      );
    }
  }

  // ✅ Step 2: Get user info using valid token
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) return response;

    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url),
    );
  }

  // ✅ Step 3: Role check
  const role = userInfo.role as TRole;
  const allowedRoutes = rolebasedPrivateUser[role];

  if (!allowedRoutes?.some((r) => pathname.match(r))) {
    await logout();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
};

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
