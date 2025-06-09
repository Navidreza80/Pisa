import { Comments } from "@/types/comments";
import ArrowSVG from "@/components/common/svg/arrow";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import user from "@/assets/icons/user.png";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
      transition={{ duration: 0.5 }}
      dir="rtl"
      className={`flex justify-start gap-x-3 ${isReply ? "animate-fade-down" : "animate-fade-left animate-delay-[100ms]"}`}
    >
      {isReply && (
        <div className="h-full">
          <div className="w-12 h-12 justify-center items-center flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6665 17.5V15.7692C16.6665 14.1017 16.6665 13.2681 16.5454 12.5705C15.8788 8.73042 12.5777 5.71869 8.36867 5.11049C7.60408 5 5.99415 5 4.1665 5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.8335 2.5C5.3278 2.99153 3.3335 4.29977 3.3335 5C3.3335 5.70022 5.3278 7.00847 5.8335 7.5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="h-full">
        {/* Image section */}
        <div
          className="rounded-full border-border border flex justify-center items-center"
          style={{ width: "48px", height: "48px" }}
        >
          <Image
            unoptimized={true}
            width={32}
            height={32}
            className="w-[75%] h-[75%]"
            src={comment.user?.profilePicture || user}
            alt="user image"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-text">
          {comment.user ? comment.user.firstName : "کاربر"}
        </h2>
        <h3 className="text-text-secondary text-sm " dir="rtl">
          15 اردیبهشت 1404
        </h3>
        <p className="mt-3  lg:w-[400px] md:w-[400px] w-[300px] text-text-secondary text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {comment.title ? comment.title : "بدون عنوان"}
        </p>
        <p className="mt-3  lg:w-[400px] md:w-[400px] w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
          {comment.caption}
        </p>
        <div className="mt-[13px] flex items-center gap-6">
          {isParent && (
            <span
              onClick={toggleShowReplies}
              className=" text-sm text-text-secondary flex gap-1 cursor-pointer"
            >
              <ArrowSVG
                className={`${showReply ? "rotate-180" : "rotate-0"} transition-all duration-300`}
              />{" "}
              مشاهده پاسخ ها
            </span>
          )}
          <span
            className="text-sm text-primary cursor-pointer"
            onClick={() => {
              scrollToSection("sendComment");
              setParentId(Number(comment.id));
              setRepliedUser(comment.user ? comment.user.firstName : "کاربر");
              toast.info("پاسخ خود را درباره این نظر بنویسید");
            }}
          >
            پاسخ دادن
          </span>
          <span className="w-[50px] border rounded-xl h-8 flex items-center justify-between px-2 gap-1 font-semibold">
            {comment.rating}
            <Star className="group-hover:text-primary transition-colors duration-300" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
