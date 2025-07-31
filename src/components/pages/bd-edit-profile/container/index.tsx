"use client";

import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import CameraSVG from "@/components/dashboard/svg/CameraSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import changePass from "@/utils/service/user/change-pass";
import { useUser } from "@/utils/service/user/get";
import { useUploadPicture } from "@/utils/service/user/uploadUserPicture";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import NoImage from "@/assets/images/no.jpg"

export default function BuyerInformation({ decodedUser }) {
  const t = useTranslations("UserInformation");
  const { mutate: uploadPicture } = useUploadPicture();
  const { data } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: editPassword } = useMutation({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: () =>
      toast.promise(
        changePass({
          currentPassword: oldPassword,
          newPassword: password,
        }),
        {
          pending: "درحال پردازش...",
          success: "رمز عبور با موفقیت تغییر یافت.",
          error: "خطا در تغییر رمز عبور.",
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const inputs = [
    {
      name: "firstName",
      placeHolder: t("formFields.firstName"),
      value: formik.values.firstName,
    },
    {
      name: "lastName",
      placeHolder: t("formFields.lastName"),
      value: formik.values.lastName,
    },
    {
      name: "email",
      placeHolder: t("formFields.email"),
      value: formik.values.email,
    },
    {
      name: "phoneNumber",
      placeHolder: t("formFields.phoneNumber"),
      value: formik.values.phoneNumber,
    },
  ];

  return (
    <ContainerDashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-8 text-center">
          <h2 className="text-text text-[20px] font-extrabold font-yekan">
            {t("profileImage.title")}
          </h2>
          <p className="text-text-secondary text-[16px] font-[400] font-yekan">
            {t("profileImage.description")}
          </p>
          <div className="w-30 h-30 bg-border mx-auto rounded-full relative">
            <Image
              src={decodedUser?.profilePicture && decodedUser.profilePicture !== "" ? decodedUser?.profilePicture : NoImage}
              alt="User profile pic"
              width={1024}
              height={1024}
              className="w-full h-full rounded-full aspect-square border border-border"
            />
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadPicture(file);
                }
              }}
            />

            <label
              htmlFor="file-upload"
              className="w-[25px] h-[25px] rounded-full bg-primary cursor-pointer flex justify-center absolute top-[15%] right-0 border-background border-[2px]"
            >
              <div className="my-auto">
                <CameraSVG />
              </div>
            </label>
          </div>
        </div>

        <div className="h-[1px] bg-border" />
        <div className="my-8 flex flex-col md:flex-row-reverse justify-between gap-6 md:gap-0">
          <div className="flex flex-col flex-wrap gap-4 w-full md:w-[calc(55%)]">
            {inputs.map((item) => (
              <Input
                key={item.name}
                name={item.name}
                placeholder={item.placeHolder}
                className="h-12 placeholder:text-text-secondary md:w-[calc(65%)] w-full placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
                value={item.value}
                onChange={formik.handleChange}
              />
            ))}
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-text text-[20px] font-extrabold font-yekan ">
              {t("personalInfo.title")}
            </h2>
            <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
              {t("personalInfo.description")}
            </p>
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary rounded-xl text-white cursor-pointer"
              >
                {t("buttons.applyChanges")}
              </Button>
              <Button variant="ghost">{t("buttons.cancel")}</Button>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-border" />
        <div className="my-8 flex flex-col md:flex-row-reverse justify-between gap-6 md:gap-0">
          <div className="flex flex-col flex-wrap gap-4 w-full justify-center md:w-[calc(55%)]">
            <Input
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder={"رمز عبور قبلی"}
              className="h-12 placeholder:text-text-secondary md:w-[calc(65%)] w-full placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("newPassword")}
              className="h-12 placeholder:text-text-secondary md:w-[calc(65%)] w-full placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            />
          </div>

          <div className="text-center md:text-right">
            <h2 className="text-text text-[20px] font-extrabold font-yekan ">
              {t("security.title")}
            </h2>
            <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
              {t("security.description")}
            </p>
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <Button
                onClick={() => editPassword()}
                className="bg-primary cursor-pointer rounded-xl hover:bg-primary text-white"
              >
                {t("buttons.applyChanges")}
              </Button>
              <Button variant="ghost">{t("buttons.cancel")}</Button>
            </div>
          </div>
        </div>
      </form>
    </ContainerDashboard>
  );
}
