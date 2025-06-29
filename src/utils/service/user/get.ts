// Interceptor
import { UserProfileProps } from "@/types/user";
import http from "@/utils/interceptor";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getClientCookie } from "../storage/client-cookie";

/**
 * Get use info.
 * @returns response with user info obj.
 */
export async function getUserInfo(id: string): Promise<UserProfileProps> {
  try {
    const response = await http.get<UserProfileProps>(`/users/${id}`);
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
    queryKey: ["GET_USER"],
    queryFn: () => getUserInfo(decoded.id),
    staleTime: 1000000,
  });
};
