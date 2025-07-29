"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface BlogItem {
  id: string;
  title: string;
  category_id?: string;
}

interface RelatedBlogsProps {
  blogs: BlogItem[];
  currentBlogId?: string;
  currentCategoryId?: string;
}

export default function RelatedBlogs({ blogs, currentBlogId, currentCategoryId }: RelatedBlogsProps) {
  const t = useTranslations("Blog");

  const filteredBlogs = blogs.filter(
    (b) => b.category_id === currentCategoryId && b.id !== currentBlogId
  );

  if (filteredBlogs.length === 0) {
    return (
      <p className="text-text-secondary italic text-sm">
        {t("noRelated")}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {filteredBlogs.map((blog) => (
        <li key={blog.id}>
          <Link
            href={`/blogs/${blog.id}`}
            className="text-primary hover:underline font-medium"
          >
            {blog.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
