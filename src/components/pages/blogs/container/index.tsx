"use client";

import SearchSVG from "@/components/common/svg/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBlogs } from "@/utils/service/blogs/GetBlogs";
import Link from "next/link";
import { useState } from "react";
import BlogCard from "../../blog-detail/components/BlogCard";
import FilterModal from "../modals/FilterModal";

export default function BlogPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "created_at",
    order: "DESC" as "ASC" | "DESC",
    search: "",
    author_id: undefined as number | undefined,
    category_id: undefined as number | undefined,
  });

  const { data: blogs, isLoading, isError } = useBlogs({
    page: filters.page,
    limit: filters.limit,
    sort: filters.sort,
    order: filters.order,
    title: filters.search,
    author_id: filters.author_id,
    category_id: filters.category_id,
  });

  const totalPages = blogs ? Math.ceil(blogs.totalCount / filters.limit) : 0;

  const handleChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const filtersItems = [
    { text: "جدیدترین", value: "created_at", order: "DESC" as "DESC" },
    { text: "قدیمی‌ترین", value: "created_at", order: "ASC" as "ASC" },
    { text: "عنوان صعودی", value: "title", order: "ASC" as "ASC" },
    { text: "عنوان نزولی", value: "title", order: "DESC" as "DESC" },
  ];

  return (
    <div className="w-full pt-[32px] flex flex-wrap gap-[24px] ">
      <div className="flex flex-col w-full lg:w-[85.5%] mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap gap-2 sm:gap-[8px] mb-[32px] animate-fade-down items-center">
          <h1 className="text-text text-[28px] sm:text-[36px] font-bold">بلاگ‌ها</h1>
          {filters.search && (
            <div className="bg-primary rounded-[16px] text-white px-3 py-1 text-[20px] sm:text-[28px] font-bold">
              {filters.search}
            </div>
          )}
        </div>

        <div className="flex lg:flex-row-reverse flex-wrap-reverse justify-end gap-4 sm:gap-[16px] py-4 animate-fade-up items-center">
          <div className="flex flex-wrap-reverse gap-2 sm:gap-[12px]">
            {filtersItems.map((item) => (
              <button
                key={item.text}
                onClick={() => {
                  handleChange("sort", item.value);
                  handleChange("order", item.order);
                }}
                className={`px-4 py-3.5 h-12 text-center rounded-[16px] text-[15px] sm:text-[16px] transition cursor-pointer
                border
                ${filters.sort === item.value && filters.order === item.order
                    ? "bg-primary text-white"
                    : "bg-surface text-text border-border"
                  }`}
              >
                {item.text}
              </button>
            ))}
          </div>

          <span className="h-[24px] w-[1px] bg-border hidden sm:block" />

          <FilterModal
            filters={filters}
            onChange={handleChange}
            onReset={() => {
              setFilters({
                page: 1,
                limit: 10,
                sort: "created_at",
                order: "DESC",
                search: "",
                title: "",
                author_id: undefined,
                category_id: undefined,
              });
            }}
          />

          <span className="h-[24px] w-[1px] bg-border hidden sm:block" />

          <div className="relative w-full sm:w-[306px] h-12">
            <input
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              type="text"
              placeholder="جستجو در عنوان..."
              className="w-full h-full rounded-[16px] bg-surface text-text text-sm border border-border placeholder:text-fade outline-none px-4 pr-[44px] ltr:pl-[44px]"
            />
            <SearchSVG className="absolute top-3 right-3 ltr:left-3" />
          </div>
        </div>

      </div>

      <span className="h-[1px] w-full my-auto bg-[#EAEAEA]" />

      <div className="flex lg:justify-center gap-x-4 gap-y-4 md:justify-center justify-center flex-wrap w-full">
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-[calc(33.3%-20px)] min-w-[300px] h-[200px] bg-gray-200 animate-pulse rounded-lg"
            />
          ))}

        {!isLoading && !isError && blogs?.data.length === 0 && (
          <div className="font-bold text-2xl mt-1 w-full text-center">
            نتیجه‌ای یافت نشد
          </div>
        )}

        {blogs?.data.length > 0 &&
          blogs.data.map((blog) => (
            <Link href={`blogs/${blog.id}`}>
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            </Link>
          ))}

        {totalPages > 1 && (
          <div
            dir="ltr"
            className="w-full my-3 flex justify-center flex-wrap gap-2"
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => filters.page > 1 && handlePageChange(filters.page - 1)}
                    className={`cursor-pointer ${filters.page === 1 ? "pointer-events-none opacity-50" : ""
                      }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={i + 1 === filters.page}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      filters.page < totalPages && handlePageChange(filters.page + 1)
                    }
                    className={`cursor-pointer ${filters.page === totalPages ? "pointer-events-none opacity-50" : ""
                      }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
