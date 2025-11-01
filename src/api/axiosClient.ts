import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://adiyogi-travels.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export default axiosClient;
