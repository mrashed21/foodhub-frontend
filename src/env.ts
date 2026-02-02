import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.string().min(1),
    AUTH_URL: z.string().url(),
    BACKEND_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_URL: z.string().min(1),
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },

  runtimeEnv: {
    BASE_URL: "https://foodhub-backend-pearl.vercel.app/api/v1",
    AUTH_URL: "https://foodhub-backend-pearl.vercel.app/api/auth",
    BACKEND_URL: "https://foodhub-backend-pearl.vercel.app",

    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_AUTH_URL: "https://foodhub-backend-pearl.vercel.app/api/auth",
    NEXT_PUBLIC_BACKEND_URL: "https://foodhub-backend-pearl.vercel.app",
    NEXT_PUBLIC_BASE_URL: "https://foodhub-backend-pearl.vercel.app/api/v1",
  },
});
