// Interceptor
import http from "@/utils/interceptor";
import { getClientCookie } from "../storage/client-cookie";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Get use info.
 * @returns response with user info obj.
 */
export async function getUserInfo(id: string) {
  try {
    const response = await http.get(`/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

export const useUser = () => {
  const token = getClientCookie("clientAccessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  return useQuery({
    queryKey:["GET_USER"],
    queryFn: () => getUserInfo(decoded.id),
    staleTime: 1000000
  });
};
