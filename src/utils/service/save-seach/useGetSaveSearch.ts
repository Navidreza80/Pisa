import { useQuery } from "@tanstack/react-query";
import http from "@/utils/interceptor";
import { getClientCookie } from "../storage/client-cookie";
import { toast } from "react-toastify"; // ✅ import toast

// Define the shape of a saved search
type SavedSearch = {
  id: number;
  userId: number;
  searchQuery: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

// Fetch saved searches from API (requires auth token)
async function getSavedSearches(): Promise<SavedSearch[]> {
  const token = getClientCookie("clientAccessToken");

  // 🔒 Handle unauthenticated user
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

// React Query hook for consuming saved searches in UI
export function useGetSavedSearches() {
  return useQuery({
    queryKey: ["saved-searches"],
    queryFn: getSavedSearches,
    staleTime: 100000,
    retry: false, // 🔁 prevent retry when unauthenticated
  });
}
