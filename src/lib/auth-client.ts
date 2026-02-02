import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://foodhub-backend-pearl.vercel.app/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
