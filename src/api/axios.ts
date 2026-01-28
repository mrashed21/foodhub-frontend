import { env } from "@/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;
