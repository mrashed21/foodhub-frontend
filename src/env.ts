import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.string().min(1),
    AUTH_URL: z.string().url(), // ✅ Server-side এ full URL
    BACKEND_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_URL: z.string().min(1), // Client-side এ relative
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },

  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    AUTH_URL: process.env.AUTH_URL,
    BACKEND_URL: process.env.BACKEND_URL,

    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
