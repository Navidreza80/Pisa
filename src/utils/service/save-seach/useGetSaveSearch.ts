import { useQuery } from "@tanstack/react-query";
import http from "@/utils/interceptor";
import { getClientCookie } from "../storage/client-cookie";

type SavedSearch = {
  id: number;
  userId: number;
  searchQuery: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getSavedSearches(): Promise<SavedSearch[]> {
  const token = getClientCookie("clientAccessToken");
  if (!token) throw new Error("token not found");

  const response = await http.get<SavedSearch[]>("/saved-searches", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response; 
}

export function useGetSavedSearches() {
  return useQuery({
    queryKey: ["saved-searches"],
    queryFn: getSavedSearches,
    staleTime: 100000,
  });
}
