import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://backend-foodhub-mrashed21.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});
