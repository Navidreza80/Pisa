import ArrowSVG from "@/components/common/svg/arrow";
import { Comments } from "@/types/comments";
import formatToPersianDate from "@/utils/helper/format-date";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

// Define the prop types for SingleComment
interface SingleCommentProps {
  comment: Comments;
  isReply: boolean;
  isParent: boolean;
  toggleShowReplies?: () => void;
  showReply: boolean;
  setParentId: Dispatch<SetStateAction<number | null>>;
  setRepliedUser: Dispatch<SetStateAction<string | null>>;
  sectionRefs?: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function SingleComment({
  comment,
  isReply,
  isParent,
  toggleShowReplies,
  showReply,
  setParentId,
  sectionRefs,
  setRepliedUser,
}: SingleCommentProps) {
  const scrollToSection = (sectionId: string) => {
    if (sectionRefs) {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isReply ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      
      className={`flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 transition-shadow duration-300 ${
        isReply ? "border-r-2 border-blue-500" : ""
      }`}
    >
      {isReply && (
        <div className="h-full flex-shrink-0">
          <div className="w-10 h-10 flex justify-center items-center bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-500"
            >
              <path
                d="M16.6665 17.5V15.7692C16.6665 14.1017 16.6665 13.2681 16.5454 12.5705C15.8788 8.73042 12.5777 5.71869 8.36867 5.11049C7.60408 5 5.99415 5 4.1665 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.8335 2.5C5.3278 2.99153 3.3335 4.29977 3.3335 5C3.3335 5.70022 5.3278 7.00847 5.8335 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex-shrink-0">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
            <Image
              unoptimized={true}
              width={48}
              height={48}
              className="w-full h-full object-cover cursor-pointer"
              src={
                comment.user?.profilePicture ||
                "https://img.icons8.com/?size=100&id=7820&format=png&color=000000"
              }
              alt="user image"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {comment.user ? comment.user.firstName : "کاربر"}
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatToPersianDate(comment.created_at)}
          </span>
        </div>

        {comment.title && (
          <h3 className="mt-1 text-md font-semibold text-gray-800 dark:text-gray-200">
            {comment.title}
          </h3>
        )}

        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {comment.caption}
        </p>

        <div className="mt-4 flex items-center gap-4">
          {isParent && (
            <button
              onClick={toggleShowReplies}
              className="text-sm cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <ArrowSVG
                className={`w-4 h-4 transition-transform duration-300 ${
                  showReply ? "rotate-180" : "rotate-0"
                }`}
              />
              مشاهده پاسخ‌ها
            </button>
          )}

          <button
            className="text-sm text-gray-600 cursor-pointer dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => {
              scrollToSection("sendComment");
              setParentId(Number(comment.id));
              setRepliedUser(comment.user ? comment.user.firstName : "کاربر");
              toast.info("پاسخ خود را درباره این نظر بنویسید");
            }}
          >
            پاسخ دادن
          </button>

          <div className="flex items-center gap-1 ml-auto bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {comment.rating}
            </span>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
