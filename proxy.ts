import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getNewToken, logout } from "./service/authService";
import { isTokenExpired } from "./service/authService/validToken";
import { getUserPermisssion } from "./service/user";
import { permissionBasedRoutes } from "./constants/permissionBasedRoutes";
import { hasPermission } from "./utils/hasPermission";

const authRoutes = ["/login"];

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  let token = request.cookies.get("accessToken")?.value;
  const response = NextResponse.next();

  if (!token || (await isTokenExpired(token))) {
    try {
      const data = await getNewToken();
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
  const result = await getUserPermisssion();
  const permission = result?.data?.permissions || [];
  if (!userInfo) {
    if (authRoutes.includes(pathname)) return response;

    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url),
    );
  }
  const role = userInfo?.roles[0] as string;

  if (role === "LANDLORD_ADMIN") {
    return response; // 🔥 FULL ACCESS
  }

  // ✅ Step 3: Role check
  const matchedRoute = permissionBasedRoutes.find((route) =>
    pathname.match(route.pattern),
  );

  if (matchedRoute && !hasPermission(permission, matchedRoute.permissions)) {
    await logout();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
};

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
