import axios from "axios";

const api = axios.create({
  baseURL: "https://foodhub-backend-pearl.vercel.app/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;
