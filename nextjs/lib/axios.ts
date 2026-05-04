import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  // Sesuaikan dengan URL backend Laravel kamu
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor untuk otomatis menyisipkan token Sanctum jika user sudah login
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;