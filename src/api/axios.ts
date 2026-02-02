// import { env } from "@/env";
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://foodhub-backend-pearl.vercel.app/api/v1",
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     return Promise.reject(error.response?.data || error.message);
//   },
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://foodhub-backend-pearl.vercel.app/api/v1",
  withCredentials: true,
});

// 🔑 REQUEST INTERCEPTOR (IMPORTANT)
api.interceptors.request.use(async (config) => {
  // frontend server route
  const res = await fetch("/api/auth/get-session", {
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();

    if (data?.session?.token) {
      config.headers.Authorization = `Bearer ${data.session.token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response?.data || error.message),
);

export default api;
