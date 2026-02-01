import { createAuthClient } from "better-auth/react";

// Hard-coded for debugging
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth`
      : "https://foodhub-backend-pearl.vercel.app/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

// Debug log
if (typeof window !== "undefined") {
  console.log("Auth Client Base URL:", `${window.location.origin}/api/auth`);
}
