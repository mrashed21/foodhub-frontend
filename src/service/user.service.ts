import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      // Server-side এ same-domain URL use করতে হবে
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const url = `${baseUrl}/api/auth/get-session`;

      console.log("Fetching session from:", url); // Debug

      const res = await fetch(url, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      console.log("Session response:", session); // Debug

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error("Session fetch error:", err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
