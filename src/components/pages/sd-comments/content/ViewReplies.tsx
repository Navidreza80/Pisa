"use client";
import formatToPersianDate from "@/utils/helper/format-date";
import { getSellerComments } from "@/utils/service/comments/get";
import { useQuery } from "@tanstack/react-query";

const ViewReplies = ({ commentId }: { commentId: string }) => {
  const { data: replies } = useQuery({
    queryKey: ["GET_REPLIES"],
    queryFn: () => getSellerComments({ parent_comment_id: commentId }),
  });
  return (
    <div className="space-y-2">
      {replies?.data.map((comment) => (
        <div
          key={comment.id}
          className="bg-surface rounded-lg p-6 border border-border duration-200"
        >
          <div className="flex flex-col gap-4 text-right">
            {/* Header with title and rating */}
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-800">
                {comment.title}
              </h2>
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
                  <span>
                    تاریخ ثبت: {formatToPersianDate(comment.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ViewReplies;
