// import { NextRequest, NextResponse } from "next/server";
// import { Roles } from "./src/hook/role";
// import { userService } from "./src/service/user.service";
// // import { Roles } from "./src/hook/role";
// // import { userService } from "./src/service/user.service";

// const ROLE_BASE_ROUTE: Record<string, string> = {
//   [Roles.customer]: "/user",
//   [Roles.provider]: "/vendor",
//   [Roles.admin]: "/admin",
// };

// const AUTH_ONLY_ROUTES = ["/checkout"];

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
//     "/user",
//     "/user/:path*",
//     "/vendor",
//     "/vendor/:path*",
//     "/admin",
//     "/admin/:path*",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (login/register/verify)
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/verify-email")
  ) {
    return NextResponse.next();
  }

  // Check session cookie (handle both dev & prod)
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/user/:path*", "/vendor/:path*", "/admin/:path*"],
};
