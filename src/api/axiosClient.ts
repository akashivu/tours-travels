import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://adiyogi-travels.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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