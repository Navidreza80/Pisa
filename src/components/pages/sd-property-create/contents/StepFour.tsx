"use client";
import { CameraSVG } from "@/components/svg";
import postHousePicture from "@/utils/service/house/PostHousePicture";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const AddPropertyStepFour = () => {
  const [file, setFile] = useState();
  console.log(file);
  const { mutate: uploadHousePicture } = useMutation({
    mutationKey: ["ADD_PICTURE"],
    mutationFn: (formData) =>
      toast.promise(postHousePicture({ id: 48, formData: formData }), {
        pending: "در حال آپلود عکس...",
        success: "عکس با موفقیت آپلود شد",
        error: "خطا در آپلود عکس",
      }),
  });
  const t = useTranslations("AddPropertyStepFour");

  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-row-reverse justify-start flex-wrap text-[20px] font-bold w-full">
        <h1 className="text-base font-medium mb-[19px] w-full text-text-secondary">
          {t("title")}
        </h1>
        <h2 className="text-primary">{t("subtitle1")}</h2>
        <h2 className="text-text font-semibold">{t("subtitle2")}</h2>
      </div>
      <div className="mt-[81px] grid grid-cols-1 gap-[30px] justify-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const targetFile = e.target.files?.[0];
            setFile(targetFile);
          }}
        />
        <div className="flex justify-center">
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => {
              if (file) {
                uploadHousePicture(file);
              }
            }}
          >
            آپلود
          </button>
        </div>

        {!file ? (
          <label
            htmlFor="file-upload"
            className="w-[189px] h-[189px] rounded-2xl cursor-pointer flex justify-center  border-primary border-dashed border-[2px]"
          >
            <div className="my-auto">
              <CameraSVG />
            </div>
          </label>
        ) : (
          <div className="w-[189px] h-[189px] rounded-2xl overflow-hidden">
            <Image
              src={URL.createObjectURL(file)}
              alt="uploaded image"
              className="object-cover w-[189px] h-[189px]"
              width={189}
              height={189}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPropertyStepFour;
