import http from "@/utils/interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getServerCookie } from "../storage/server-cookie";

interface SaveSearchPayload {
  searchQuery: string;
  note: string;
}

export function useSaveSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SaveSearchPayload) => {
      const token = await getServerCookie("serverAccessToken");

      if (!token) {
        toast.warn("ابتدا وارد حساب کاربری خود شوید.");
        throw new Error("توکن یافت نشد");
      }

      const response = await http.post("/saved-searches", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
    onMutate: () => {
      toast.info("در حال ذخیره‌سازی...");
    },
    onSuccess: () => {
      toast.success("جستجو با موفقیت ذخیره شد.");
      queryClient.invalidateQueries(["saved-searches"]); // ✅ refresh list
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در ذخیره‌سازی");
    },
  });
}
