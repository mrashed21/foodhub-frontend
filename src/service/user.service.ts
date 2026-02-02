import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      // Read cookies from the incoming request (server-side)
      const cookieStore = cookies();

      // 🔒 HARD-CODED FRONTEND ORIGIN (proxy will forward to backend)
      const url =
        "https://frontend-foodhub-mrashed21.vercel.app/api/auth/get-session";

      const res = await fetch(url, {
        method: "GET",
        headers: {
          // Forward all cookies to the API route
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error("Session fetch error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
