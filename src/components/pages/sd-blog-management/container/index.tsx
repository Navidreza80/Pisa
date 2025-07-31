"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PopoverItem from "../../sd-property-management/content/PopoverItem";
import { Edit, Trash2 } from "lucide-react";
import ModalCreateBlog from "../content/BlogCreateModal";
import ModalEditBlog from "../content/BlogEditModal";
import { useBlogs } from "@/utils/service/blogs/GetBlogs";
import { useDeleteBlog } from "@/utils/service/blogs/Delete";
import TableDashboard from "@/components/common/dashboard/Table";
import Line from "@/components/common/dashboard/line";
import Title from "@/components/common/dashboard/Title";

export default function BlogDashboard() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "created_at",
    order: "DESC",
    title: "",
  });

  const { data: blogs, isLoading, refetch } = useBlogs(filters);

  const { mutate: deleteBlog } = useDeleteBlog(() => {
    refetch();
  });

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const tableHeaderItems = [
    { id: "title", text: "عنوان" },
    { id: "caption", text: "خلاصه" },
    { id: "readingTime", text: "زمان مطالعه (ثانیه)" },
    { id: "category", text: "دسته‌بندی" },
    { id: "author", text: "نویسنده" },
    { id: "createdAt", text: "تاریخ ساخت" },
    { id: "actions", text: "عملیات" },
  ];

  return (
    <ContainerDashboard>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Title text="مدیریت بلاگ ها" />
        <div className="flex gap-4 items-start sm:items-center">
          <Input
            placeholder="جستجو..."
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value, page: 1 }))
            }
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl flex-1 md:w-100"
          />
          <Button className="text-white h-10 font-semibold cursor-pointer" onClick={() => setCreateOpen(true)}>ایجاد بلاگ جدید</Button>
        </div>

      </div>

      <Line />

      <TableDashboard
        headerSecondary={true}
        tableHeader={tableHeaderItems.map((item) => ({
          ...item,
          text: item.text,
        }))}
        tableContent={
          isLoading ? (
            <tr>
              <td colSpan={7} className="text-center p-6">
                در حال بارگذاری...
              </td>
            </tr>
          ) : blogs && blogs.data.length > 0 ? (
            blogs.data.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 cursor-pointer text-right">
                <td className="p-3 max-w-[150px] truncate">{blog.title}</td>
                <td className="p-3 max-w-[250px] truncate">{blog.caption}</td>
                <td className="p-3 text-center">
                  {blog.estimated_reading_time?.seconds || "-"}
                </td>
                <td className="p-3 text-center">{blog.category_id || "-"}</td>
                <td className="p-3 text-center">{blog.author_id || "-"}</td>
                <td className="p-3 text-center">
                  {new Date(blog.created_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-xl font-bold">...</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto px-4">
                      <div className="flex flex-col gap-2">
                        <PopoverItem
                          icon={<Edit size={18} />}
                          title="ویرایش"
                          handleClick={() => setEditData(blog)}
                        />
                        <PopoverItem
                          icon={<Trash2 size={18} />}
                          title="حذف"
                          handleClick={() => deleteBlog(blog.id)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-6">
                موردی یافت نشد
              </td>
            </tr>
          )
        }
        currentPage={filters.page}
        totalCount={blogs?.totalCount || 0}
        pageSize={filters.limit}
        onPageChange={handlePageChange}
      />

      {createOpen && (
        <ModalCreateBlog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onSuccess={refetch}
        />
      )}

      {editData && (
        <ModalEditBlog
          open={!!editData}
          data={editData}
          onClose={() => setEditData(null)}
          onSuccess={refetch}
        />
      )}
    </ContainerDashboard>
  );
}
