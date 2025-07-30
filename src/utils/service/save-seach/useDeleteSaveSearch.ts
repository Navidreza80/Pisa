import http from "@/utils/interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getServerCookie } from "../storage/server-cookie";

export function useDeleteSavedSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getServerCookie("serverAccessToken");

      if (!token) {
        toast.warn("ابتدا وارد حساب کاربری خود شوید.");
        throw new Error("توکن یافت نشد");
      }

      await http.delete(`/saved-searches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("جستجوی ذخیره‌شده حذف شد.");
      queryClient.invalidateQueries(["saved-searches"]); // ✅ refresh list
    },
    onError: () => {
      toast.error("حذف جستجو با خطا مواجه شد.");
    },
  });
}
