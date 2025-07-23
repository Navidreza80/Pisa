import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/interceptor";
import { toast } from "react-toastify";
import { getClientCookie } from "../storage/client-cookie";

export function useDeleteSavedSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = getClientCookie("clientAccessToken");
      if (!token) throw new Error("توکن یافت نشد");

      await http.delete(`/saved-searches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("جستجوی ذخیره‌شده حذف شد");
      queryClient.invalidateQueries(["saved-searches"]);
    },
    onError: () => {
      toast.error("حذف جستجو با خطا مواجه شد");
    },
  });
}
