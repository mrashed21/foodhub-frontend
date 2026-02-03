// import { Roles } from "@/hook/role";
// import { userService } from "@/service/user.service";
// import { NextRequest, NextResponse } from "next/server";

// const ROLE_BASE_ROUTE: Record<string, string> = {
//   [Roles.customer]: "/user",
//   [Roles.provider]: "/vendor",
//   [Roles.admin]: "/admin",
// };

// const AUTH_ONLY_ROUTES = ["/checkout", "/cart", "/profile"];

// const PUBLIC_ROUTES = [
//   "/",
//   "/menu",
//   "/about",
//   "/contact",
//   "/auth/login",
//   "/auth/register",
//   "/auth/verify-email",
//   "/auth/forgot-password",
// ];

// const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
//   const baseRoute = ROLE_BASE_ROUTE[role];
//   if (!baseRoute) return false;

//   return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
// };

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/static") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   if (
//     PUBLIC_ROUTES.some(
//       (route) => pathname === route || pathname.startsWith(route),
//     )
//   ) {
//     return NextResponse.next();
//   }

//   const { data, error } = await userService.getSession();
//   const isAuthenticated = !error && data?.user;
//   const role = data?.user?.role;

//   if (!isAuthenticated) {
//     const loginUrl = new URL("/auth/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (pathname.startsWith("/auth")) {
//     const dashboardPath = ROLE_BASE_ROUTE[role!] ?? "/";
//     return NextResponse.redirect(new URL(dashboardPath, request.url));
//   }

//   if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   const isRoleBasedRoute = Object.values(ROLE_BASE_ROUTE).some((route) =>
//     pathname.startsWith(route),
//   );

//   if (isRoleBasedRoute) {
//     if (!isRouteAllowedForRole(role!, pathname)) {
//       const correctDashboard = ROLE_BASE_ROUTE[role!] ?? "/";
//       return NextResponse.redirect(new URL(correctDashboard, request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };

import { Roles } from "@/hook/role";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

const ROLE_BASE_ROUTE: Record<string, string> = {
  [Roles.customer]: "/dashboard",
  [Roles.provider]: "/dashboard",
  [Roles.admin]: "/admin-dashboard",
};

const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
  const baseRoute = ROLE_BASE_ROUTE[role];
  if (!baseRoute) return false;

  return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data, error } = await userService.getSession();
  const user = data?.user;
  const role = user?.role;

  if (error || !user || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isRoleBasedRoute = Object.values(ROLE_BASE_ROUTE).some((route) =>
    pathname.startsWith(route),
  );

  if (isRoleBasedRoute && !isRouteAllowedForRole(role, pathname)) {
    const correctDashboard = ROLE_BASE_ROUTE[role] ?? "/";
    return NextResponse.redirect(new URL(correctDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
