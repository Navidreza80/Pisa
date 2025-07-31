/* eslint-disable */

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
import { useTranslations } from "next-intl";
import { useState } from "react";
import BlogCard from "../../blog-detail/components/BlogCard";
import BlogCardSkeleton from "../../blog-detail/components/BlogCardSkeleton";
import FilterModal from "../modals/FilterModal";

export default function BlogPage() {
  const t = useTranslations("Blog");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "created_at",
    order: "DESC" as "ASC" | "DESC",
    search: "",
    author_id: undefined as number | undefined,
    category_id: undefined as number | undefined,
  });

  const {
    data: blogs,
    isLoading,
    isError,
  } = useBlogs({
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
      ...(key !== "page" ? { page: 2 } : {}),
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const filtersItems = [
    { text: t("newest"), value: "created_at", order: "DESC" as "DESC" },
    { text: t("oldest"), value: "created_at", order: "ASC" as "ASC" },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Title & Search Tags */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-fade-down">
            <h1 className="text-text text-[40px] sm:text-[50px] md:text-[45px] font-bold">
              {t("title")}
            </h1>
            {filters.search && (
              <div className="bg-primary text-white px-3 py-1 rounded-[16px] text-[18px] sm:text-[22px] font-bold">
                {filters.search}
              </div>
            )}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col-reverse min-[750px]:flex-row-reverse items-start lg:items-center justify-end gap-4 animate-fade-up">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filtersItems.map((item) => (
                <button
                  key={item.text}
                  onClick={() => {
                    handleChange("sort", item.value);
                    handleChange("order", item.order);
                  }}
                  className={`px-4 py-3.5 h-12 flex items-center text-center rounded-[16px] border text-[16px] transition cursor-pointer
                    ${
                      filters.sort === item.value &&
                      filters.order === item.order
                        ? "bg-[#586CFF] text-white"
                        : "bg-white text-[#272727] border-[#EAEAEA] border-[1.5px]"
                    }
              `}
                >
                  {item.text}
                </button>
              ))}
            </div>
            <span className="h-[24px] lg:block md:block hidden w-[1px] my-auto bg-[#EAEAEA]" />

            {/* Filter Modal */}
            <div className="flex flex-row-reverse gap-2 items-center w-full sm:w-auto">
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
                    author_id: undefined,
                    category_id: undefined,
                  });
                }}
              />

              <span className="h-[24px] lg:block md:block hidden w-[1px] my-auto bg-[#EAEAEA]" />

              {/* Search Input */}
              <div className="relative w-full sm:w-[280px] h-12">
                <input
                  value={filters.search || ""}
                  onChange={(e) => handleChange("search", e.target.value)}
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="w-full h-full rounded-[12px] bg-surface text-text text-sm border border-border placeholder:text-fade outline-none px-4 pr-10 ltr:pl-10"
                />
                <SearchSVG className="absolute top-3 right-3 ltr:left-3" />
              </div>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 max-[600px]:w-full max-[872px]:w-2/3  max-[872px]:!grid-cols-1 max-[1060px]:w-full max-[1274px]:w-[80%] mx-auto md:grid-cols-2 min-[1274px]:!grid-cols-3 gap-5 p-5">
            {isLoading &&
              [...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}

            {!isLoading && !isError && blogs?.data.length === 0 && (
              <div className="font-bold text-2xl mt-4 w-full text-center">
                {t("notFound")}
              </div>
            )}

            {blogs?.data.length > 0 &&
              blogs.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div dir="rtl" className="w-full my-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        filters.page > 1 && handlePageChange(filters.page - 1)
                      }
                      className={`cursor-pointer ${filters.page === 1 ? "pointer-events-none opacity-50" : ""}`}
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
                        filters.page < totalPages &&
                        handlePageChange(filters.page + 1)
                      }
                      className={`cursor-pointer ${filters.page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
