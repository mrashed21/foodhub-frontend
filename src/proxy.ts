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
  "/auth/login",
  "/auth/register",
  "/menu",
  "/about",
  "/contact",
];

const isRouteAllowedForRole = (role: string, pathname: string): boolean => {
  const baseRoute = ROLE_BASE_ROUTE[role];
  if (!baseRoute) return false;

  return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow public routes without auth check
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get user session
  const { data, error } = await userService.getSession();

  // ❌ Not logged in → redirect to login
  if (error || !data?.user) {
    // If already on auth page, allow
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  const role = data.user.role;

  // ✅ If on auth page but logged in → redirect to role-based dashboard
  if (pathname.startsWith("/auth")) {
    const redirectPath = ROLE_BASE_ROUTE[role] ?? "/";
    return NextResponse.redirect(new URL(redirectPath, origin));
  }

  // ✅ Auth-only routes (checkout, cart, profile) - any logged-in user can access
  if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🔒 Role-based protection for /user, /vendor, /admin routes
  if (!isRouteAllowedForRole(role, pathname)) {
    const redirectPath = ROLE_BASE_ROUTE[role] ?? "/";
    return NextResponse.redirect(new URL(redirectPath, origin));
  }

  // ✅ All checks passed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
