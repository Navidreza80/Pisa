import BlogDetailContainer from "@/components/pages/blog-detail/container";
import { getBlogById } from "@/utils/service/blogs/GetBlogByID";
import { getBlogs } from "@/utils/service/blogs/useGetBlog";

interface Props {
  params: { id: string };
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogById(params.id);

  if (!blog) return <div>مطلب یافت نشد</div>;

  const relatedBlogs = await getBlogs({
    category_id: Number(blog.category_id),
    limit: 5,
    sort: "created_at",
    order: "DESC",
  });

  const filtered = relatedBlogs.filter((b) => b.id !== blog.id);

  return <BlogDetailContainer blog={blog} relatedBlogs={filtered} />;
}
