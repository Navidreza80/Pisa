import http from "@/utils/interceptor";

export const getBlogById = async (id: string) => {

  try {
    const res = await http.get(`/blogs/${id}`);
    return res;
  } catch (error) {
    console.error("خطا در دریافت بلاگ:", error);
    return null;
  }
};
