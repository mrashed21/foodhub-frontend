import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./hook/role";
import { userService } from "./service/user.service";

const ROLE_BASE_ROUTE: Record<string, string> = {
  [Roles.customer]: "/user",
  [Roles.provider]: "/vendor",
  [Roles.admin]: "/admin",
};

const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
  const baseRoute = ROLE_BASE_ROUTE[role];
  if (!baseRoute) return false;

  return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  let role: string | null = null;

  const { data, error } = await userService.getSession();

  if (error || !data?.user) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  role = data.user.role;

  if (!isRouteAllowedForRole(role!, pathname)) {
    const redirectPath = ROLE_BASE_ROUTE[role!] ?? "/auth/login";

    return NextResponse.redirect(new URL(redirectPath, origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user",
    "/user/:path*",
    "/vendor",
    "/vendor/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
