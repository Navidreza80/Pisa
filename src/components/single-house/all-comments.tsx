"use client";

// Dependencies
import { useFormik } from "formik";
import * as Yup from "yup";
import StarRatings from "react-star-ratings";

import { getAllPropertyComments } from "@/utils/service/comments/get";
import { usePostComment } from "@/utils/service/comments/post";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../common/button";
import LoginModal from "../common/login";
import RenderComments from "./render-comment";
const SectionName = dynamic(() => import("./section-name"), {
  ssr: false,
});

export default function AllComments({ houseId }: { houseId: number }) {
  const [isLogin, setIsLogin] = useState(false);
  const token = getClientCookie("clientAccessToken");
  const t = useTranslations("SingleHouse");
  const [repliedUser, setRepliedUser] = useState(null);
  const [rows, setRows] = useState(3);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [parentId, setParentId] = useState(null);
  const { data, isPending: loadingComment } = useQuery({
    queryKey: ["comments", houseId, rows],
    queryFn: () => getAllPropertyComments(houseId, rows),
    staleTime: 0,
  });
  const [rating, setRating] = useState(0);
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const { mutate, isPending } = usePostComment();

  const commentSchema = Yup.object().shape({
    title: Yup.string().required("عنوان الزامی است"),
    caption: Yup.string().required("متن الزامی است"),
  });

  const cancelReply = () => {
    setParentId(null);
    setRepliedUser(null);
  };

  const formik = useFormik({
    initialValues: {
      rating: null,
      title: "",
      caption: "",
      parent_comment_id: null,
      houseId: houseId,
    },
    validationSchema: commentSchema,
    onSubmit: () => {
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
            cancelReply();
            setRating(0);
          },
        }
      );
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      dir="rtl"
      className="mt-3.5 flex gap-y-6 flex-col"
    >
      <div
        ref={(el) => (sectionRefs.current["sendComment"] = el)}
        id="sendComment"
        className="flex flex-col mb-4 gap-3"
      >
        <div className="flex justify-between items-center">
          <SectionName sectionName={t("userComments")} />
          {parentId && (
            <button
              className="bg-red-500 cursor-pointer p-2 rounded-xl text-white"
              onClick={cancelReply}
            >
              لفو پاسخ
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[calc(66.6%-30px)]">
            <Input
              className="border-border h-[51px] w-full px-4 py-6 placeholder:text-text-secondary items-start rounded-tr-2xl rounded-br-2xl"
              dir="rtl"
              value={formik.values.title}
              onChange={formik.handleChange}
              id="title"
              name="title"
              placeholder="عنوان نظر خود را بنویسید..."
            />
          </div>
          <div className="flex items-center max-w-[calc(50%-30px)]">
            <StarRatings
              rating={rating}
              changeRating={setRating}
              starDimension="25px"
              starSpacing="12px"
              starRatedColor="#586cff"
              starEmptyColor="lightgray"
              numberOfStars={5}
              name="rating"
              allowHalfStar={true}
              isSelectable={true}
            />
          </div>
        </div>

        <Input
          className="border-border h-[102px] px-4 py-6 placeholder:text-text-secondary items-start rounded-3xl"
          dir="rtl"
          value={formik.values.caption}
          onChange={formik.handleChange}
          id="caption"
          name="caption"
          placeholder={t("commentPlaceholder")}
        />
        {formik.errors.caption && (
          <span className="text-red-500 text-sm text-right">
            {formik.errors.caption}
          </span>
        )}
        <button
          type={"submit"}
          disabled={isPending && !token}
          onClick={() => {
            if (!token) {
              setIsLogin(true);
            }
          }}
          className="bg-primary w-full flex items-center justify-center rounded-full h-12 mt-1 text-white"
        >
          <LoginModal isOpen={isLogin} />
          {!isPending && (parentId ? "پاسخ به " + repliedUser : t("send"))}
          {isPending && <ClipLoader className="!my-auto" color="#ffffff" />}
        </button>
      </div>
      {loadingComment && <ClipLoader className="mx-auto" color="#586cff" />}
      {/* Comment 1 */}
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
        {rows > data?.length ? "مشاهده کمتر" : "مشاهده بیشتر"}
      </Button>
    </form>
  );
}
