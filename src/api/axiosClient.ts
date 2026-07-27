import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is not defined."
  );
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds
});


const publicEndpoints = [
  "/account/login",
  "/account/register",
  "/account/verify-otp",
  "/account/resend-otp",
  "/account/forgot-password",
  "/account/verify-forgot-password-otp",
  "/account/reset-password",
];


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      requestUrl.includes(endpoint)
    );

    if (error.response?.status === 401 && !isPublicEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.href = "/account";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;