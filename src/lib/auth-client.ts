import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth`
      : "https://foodhub-backend-pearl.vercel.app/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});


