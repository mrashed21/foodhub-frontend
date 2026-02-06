// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: "https://backend-foodhub-mrashed21.vercel.app",
//   fetchOptions: {
//     credentials: "include",
//   },
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: typeof window !== "undefined" ? window.location.origin : "",
  baseURL: "https://frontend-foodhub-mrashed21.vercel.app/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
