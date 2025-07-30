import http from "@/utils/interceptor";
import { Blog } from "./GetBlogs";

interface BlogQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  title?: string;
  author_id?: number;
  category_id?: number;
}

interface BlogResponse {
  data: Blog[];
  totalCount: number;
}

export async function getBlogs(params: BlogQueryParams): Promise<Blog[]> {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  );

  const response = await http.get<BlogResponse>("/blogs", { params: filteredParams });
  return response.data;
}
