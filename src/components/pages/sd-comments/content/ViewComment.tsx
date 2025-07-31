"use client";

import Button from "@/components/common/button";
import { Comments } from "@/types/comments";
import formatToPersianDate from "@/utils/helper/format-date";
import { usePostComment } from "@/utils/service/comments/post";
import { Star } from "lucide-react";
import { useState } from "react";

const ViewComment = ({ comment }: { comment: Comments }) => {
  const { mutate } = usePostComment();
  const formattedDate = formatToPersianDate(comment.created_at);
  const [isReplying, setIsReplying] = useState(false);
  const [replyData, setReplyData] = useState({
    title: "",
    caption: "",
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      ...replyData,
      parent_comment_id: Number(comment.id),
      houseId: comment.house_id,
      rating: 1,
    });
    setIsReplying(false);
    setReplyData({ title: "", caption: "" });
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-lg p-6 border border-border duration-200">
        <div className="flex flex-col gap-4 text-right">
          {/* Header with title and rating */}
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-800">{comment.title}</h2>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-yellow-700">
                {Number(comment.rating).toFixed(1)} / 5
              </span>
            </div>
          </div>

          {/* Comment content */}
          <div className="space-y-3">
            <p className="text-text-secondary leading-relaxed text-justify">
              {comment.caption}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>تاریخ ثبت: {formattedDate}</span>
              </div>

              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-primary hover:text-primary/80 cursor-pointer text-sm font-medium"
              >
                {isReplying ? "انصراف" : "پاسخ دادن"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="bg-primary/10 rounded-lg p-4">
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="reply-title"
                className="text-sm font-medium"
              >
                عنوان پاسخ
              </label>
              <input
                id="reply-title"
                type="text"
                value={replyData.title}
                onChange={(e) =>
                  setReplyData({ ...replyData, title: e.target.value })
                }
                className="rounded-md border border-border px-3 py-2 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="reply-caption"
                className="text-sm font-medium"
              >
                متن پاسخ
              </label>
              <textarea
                id="reply-caption"
                value={replyData.caption}
                onChange={(e) =>
                  setReplyData({ ...replyData, caption: e.target.value })
                }
                className="rounded-md border border-border px-3 py-2 h-24 focus:outline-none"
                required
              />
            </div>
            <div className="flex">
              <Button type="submit">ارسال پاسخ</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewComment;
