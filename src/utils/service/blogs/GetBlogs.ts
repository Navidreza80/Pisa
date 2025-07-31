/* eslint-disable */

"use client";

import { useQuery } from "@tanstack/react-query";
import http from "@/utils/interceptor";

export interface Blog {
  id: string;
  title: string;
  caption: string;
  estimated_reading_time: {
    seconds: number;
  };
  author_id: string;
  created_at: string;
  category_id: string;
}

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

export function useBlogs(params: BlogQueryParams) {
  return useQuery<BlogResponse>({
    queryKey: ["blogs", params],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
      );

      const response = await http.get<BlogResponse>("/blogs", {
        params: filteredParams,
      });
      return response;
    },
    keepPreviousData: true,
  });
}
