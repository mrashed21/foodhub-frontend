// import { NextRequest, NextResponse } from "next/server";
// import { Roles } from "./hook/role";
// import { userService } from "./service/user.service";

// const ROLE_BASE_ROUTE: Record<string, string> = {
//   [Roles.customer]: "/user",
//   [Roles.provider]: "/vendor",
//   [Roles.admin]: "/admin",
// };

// const AUTH_ONLY_ROUTES = ["/checkout", "cart", "profile"];

// const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
//   const baseRoute = ROLE_BASE_ROUTE[role];
//   if (!baseRoute) return false;

//   return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
// };

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const origin = request.nextUrl.origin;

//   let role: string | null = null;

//   const { data, error } = await userService.getSession();

//   // ❌ not logged in → login
//   if (error || !data?.user) {
//     return NextResponse.redirect(new URL("/auth/login", origin));
//   }

//   role = data.user.role;

//   // ✅ NEW: auth-only routes (checkout)
//   if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   // 🔒 role-based protection (existing logic)
//   if (!isRouteAllowedForRole(role!, pathname)) {
//     const redirectPath = ROLE_BASE_ROUTE[role!] ?? "/auth/login";
//     return NextResponse.redirect(new URL(redirectPath, origin));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/checkout",
//     "/cart",
//     "/profile",
//     "/user",
//     "/user/:path*",
//     "/vendor",
//     "/vendor/:path*",
//     "/admin",
//     "/admin/:path*",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./hook/role";
import { userService } from "./service/user.service";

const ROLE_BASE_ROUTE: Record<string, string> = {
  [Roles.customer]: "/user",
  [Roles.provider]: "/vendor",
  [Roles.admin]: "/admin",
};

// Routes that only need authentication (no role check)
const AUTH_ONLY_ROUTES = ["/checkout", "/cart", "/profile"];

// Public routes (no auth needed)
const PUBLIC_ROUTES = [
  "/",
  "/menu",
  "/about",
  "/contact",
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/forgot-password",
];

const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
  const baseRoute = ROLE_BASE_ROUTE[role];
  if (!baseRoute) return false;

  return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ⏭️ Skip proxy for:
  // - API routes (your rewrites)
  // - Static files
  // - Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ✅ Allow public routes without authentication
  if (
    PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route),
    )
  ) {
    return NextResponse.next();
  }

  // 🔐 Get user session
  const { data, error } = await userService.getSession();
  const isAuthenticated = !error && data?.user;
  const role = data?.user?.role;

  // ❌ Not authenticated → redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // Save where they wanted to go
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Authenticated but on auth pages → redirect to dashboard
  if (pathname.startsWith("/auth")) {
    const dashboardPath = ROLE_BASE_ROUTE[role!] ?? "/";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // ✅ Auth-only routes (any authenticated user can access)
  if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🔒 Role-based routes (/user, /vendor, /admin)
  const isRoleBasedRoute = Object.values(ROLE_BASE_ROUTE).some((route) =>
    pathname.startsWith(route),
  );

  if (isRoleBasedRoute) {
    if (!isRouteAllowedForRole(role!, pathname)) {
      // User trying to access wrong role route → redirect to their dashboard
      const correctDashboard = ROLE_BASE_ROUTE[role!] ?? "/";
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
  }

  // ✅ All checks passed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes (/api/*)
     * - Static files (/_next/static, /_next/image)
     * - Favicon and other public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
