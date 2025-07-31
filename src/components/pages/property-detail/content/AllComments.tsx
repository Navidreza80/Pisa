"use client";

import Button from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { useHandleAuth } from "@/utils/hooks/useAuth";
import { getAllPropertyComments } from "@/utils/service/comments/get";
import { usePostComment } from "@/utils/service/comments/post";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import RenderComments from "./RenderComments";
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

// Dynamically importing the SectionName component
const SectionName = dynamic(() => import("./SectionName"), {
  ssr: false,
});

interface AllCommentsProps {
  houseId: string;
}

interface FormValues {
  title: string;
  caption: string;
  rating: number | null;
  parent_comment_id: number | null;
  houseId: string;
}

export default function AllComments({ houseId }: AllCommentsProps) {
  const t = useTranslations("SingleHouse");
  const [repliedUser, setRepliedUser] = useState<string | null>(null);
  const [rows, setRows] = useState<number>(3);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [parentId, setParentId] = useState<number | null>(null);
  const { handler } = useHandleAuth();

  const { data } = useQuery({
    queryKey: ["comments", houseId, rows],
    queryFn: () => getAllPropertyComments(houseId, { page: "1", limit: rows.toString() }),
    staleTime: 0,
  });

  const [rating, setRating] = useState<number>(0);
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { mutate, isPending } = usePostComment();

  const commentSchema = Yup.object().shape({
    title: Yup.string().required(t("titleRequired")),
    caption: Yup.string().required(t("messageRequired")),
  });

  const cancelReply = () => {
    setParentId(null);
    setRepliedUser(null);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      rating: null,
      title: "",
      caption: "",
      parent_comment_id: null,
      houseId: houseId,
    },
    validationSchema: commentSchema,
    onSubmit: () => {
      handler(() =>
        mutate(
          {
            title: formik.values.title,
            caption: formik.values.caption,
            parent_comment_id: parentId,
            houseId: houseId,
            rating: rating,
          },
          {
            onSuccess: () => {
              formik.values.rating = 0;
              formik.values.title = "";
              formik.values.caption = "";
              cancelReply();
              setRating(0);
            },
          }
        )
      );
    },
  });

  const handleRef = (el: HTMLDivElement | null) => {
    sectionRefs.current["sendComment"] = el;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-3.5 flex gap-y-6 flex-col"
    >
      <div
        ref={handleRef}
        id="sendComment"
        className="bg-white dark:bg-gray-800 rounded-xl mb-6 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-6">
          <SectionName sectionName={t("userComments")} />
          {parentId && (
            <button
              onClick={cancelReply}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {t("cancelReply")} {repliedUser}
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("commentTitle")}
            </label>
            <Input
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              value={formik.values.title}
              onChange={formik.handleChange}
              id="title"
              name="title"
              placeholder={t("titlePlaceholder")}
            />
            {formik.errors.title && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {formik.errors.title}
              </span>
            )}
          </div>

          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("yourRate")}
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-xl flex justify-center">
              <StarRatings
                rating={rating}
                changeRating={setRating}
                starDimension="22px"
                starSpacing="6px"
                starRatedColor="#586cff"
                starEmptyColor="#e5e7eb"
                starHoverColor="#586cff"
                starRatedHoverColor="#586cff"
                numberOfStars={5}
                name="rating"
                allowHalfStar={true}
                isSelectable={true}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t("commentMessage")}
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all"
            value={formik.values.caption}
            onChange={formik.handleChange}
            id="caption"
            name="caption"
            placeholder={t("commentPlaceholder")}
          />
          {formik.errors.caption && (
            <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
              {formik.errors.caption}
            </span>
          )}
        </div>

        <Button
          disabled={isPending}
          className={`w-full flex items-center justify-center rounded-xl h-12 mt-2 text-white font-medium transition-all ${
            isPending
              ? "bg-blue-400 dark:bg-blue-600 cursor-not-allowed"
              : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
          }`}
        >
          {!isPending && (
            <>
              {parentId ? (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  پاسخ به {repliedUser}
                </span>
              ) : (
                <span className="flex items-center gap-1">{t("send")}</span>
              )}
            </>
          )}
          {isPending && (
            <div className="flex items-center gap-2">
              <ClipLoader color="#ffffff" size={20} />
              <span>{t("sending")}</span>
            </div>
          )}
        </Button>
      </div>
      {/* Render the comments */}
      {data?.map((comment) => {
        return (
          <RenderComments
            setRepliedUser={setRepliedUser}
            sectionRefs={sectionRefs}
            setParentId={setParentId}
            comment={comment}
            key={comment.id}
          />
        );
      })}
      {data?.length ? (
        <Button
          className="mx-auto"
          handleClick={() => {
            setRows((prev) => {
              if (rows > data?.length) return (prev = 3);
              return (prev = prev + 3);
            });
            scrollToSection("sendComment");
          }}
        >
          {rows > data?.length ? t("seeLess") : t("seeMore")}
        </Button>
      ) : (
        <div></div>
      )}
    </form>
  );
}
