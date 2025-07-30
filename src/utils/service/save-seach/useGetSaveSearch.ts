import http from "@/utils/interceptor";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getServerCookie } from "../storage/server-cookie";

type SavedSearch = {
  id: number;
  userId: number;
  searchQuery: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getSavedSearches(): Promise<SavedSearch[]> {
  const token = await getServerCookie("serverAccessToken");

  if (!token) {
    toast.warn("ابتدا وارد حساب کاربری خود شوید.");
    throw new Error("Unauthenticated");
  }

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
    retry: false, // do not retry on token absence
  });
}
