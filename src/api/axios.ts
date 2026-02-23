import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-foodhub-mrashed21.vercel.app/api/v1",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     return Promise.reject(error.response?.data || error.message);
//   },
// );

api.interceptors.request.use(function (config: any) {
  config.withCredentials = true;
  return config;
});

export default api;
