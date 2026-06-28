import axiosClient from "../api/axiosClient";

export async function getCurrentUser() {
  const response = await axiosClient.get("/account/me");
  return response.data;
}