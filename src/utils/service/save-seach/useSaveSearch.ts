import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import http from "@/utils/interceptor"; 
import { getClientCookie } from "../storage/client-cookie";

interface SaveSearchPayload {
  searchQuery: string;
  note: string;
}

export function useSaveSearch() {
  return useMutation({
    mutationFn: async (data: SaveSearchPayload) => {
      const token = getClientCookie("clientAccessToken");

      if (!token) {
        throw new Error("توکن یافت نشد. لطفاً وارد شوید.");
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
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در ذخیره‌سازی");
    },
  });
}
