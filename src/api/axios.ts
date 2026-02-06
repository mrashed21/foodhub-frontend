import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: "https://backend-foodhub-mrashed21.vercel.app/api/v1",
  withCredentials: true,
});

/* ✅ REQUEST INTERCEPTOR */
api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    config.headers.Cookie = cookieStore.toString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* ✅ RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;
