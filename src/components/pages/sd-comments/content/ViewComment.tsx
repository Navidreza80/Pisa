"use client";

import { Comments } from "@/types/comments";
import formatToPersianDate from "@/utils/helper/format-date";
import { Star } from "lucide-react";

const ViewComment = ({ comment }: { comment: Comments }) => {
  const formattedDate = formatToPersianDate(comment.created_at);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
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
          <p className="text-gray-700 leading-relaxed text-justify">
            {comment.caption}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComment;
