import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window === "undefined"
      ? env.AUTH_URL // Server: full URL
      : env.NEXT_PUBLIC_AUTH_URL, // Browser: relative path
  fetchOptions: {
    credentials: "include",
  },
});
