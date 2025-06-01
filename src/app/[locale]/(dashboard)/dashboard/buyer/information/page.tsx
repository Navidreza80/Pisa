"use client";

import CameraSVG from "@/components/dashboard/svg/CameraSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/utils/service/user/get";
import { useEditUser } from "@/utils/service/user/put";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function Information() {
  const { mutate } = useEditUser();
  const { data } = useUser();
  const t = useTranslations('UserInformation');

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
    },
    onSubmit: (values) => {
      toast.promise(
        async () => {
          await mutate(values);
        },
        {
          pending: t('toast.pending'),
          success: t('toast.success'),
          error: t('toast.error'),
        }
      );
    },
  });

  const inputs = [
    {
      name: "firstName",
      placeHolder: t('formFields.firstName'),
      value: formik.values.firstName,
      onChange: formik.handleChange,
    },
    {
      name: "lastName",
      placeHolder: t('formFields.lastName'),
      value: formik.values.lastName,
      onChange: formik.handleChange,
    },
    {
      name: "email",
      placeHolder: t('formFields.email'),
      value: formik.values.email,
      onChange: formik.handleChange,
    },
    {
      name: "phoneNumber",
      placeHolder: t('formFields.phoneNumber'),
      value: formik.values.phoneNumber,
      onChange: formik.handleChange,
    },
  ];

  const inputsSecurity = [
    { placeHolder: t('securityForm.currentPassword') },
    { placeHolder: t('securityForm.newPassword') },
    { placeHolder: t('securityForm.confirmPassword') },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-text text-[20px] font-extrabold font-yekan">
          {t('profileImage.title')}
        </h2>
        <p className="text-text-secondary text-[16px] font-[400] font-yekan">
          {t('profileImage.description')}
        </p>
        <div className="w-30 h-30 bg-border mx-auto rounded-full relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                formik.setFieldValue("profilePicture", file);
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
        <div className="text-center md:text-right">
          <h2 className="text-text text-[20px] font-extrabold font-yekan ">
            {t('personalInfo.title')}
          </h2>
          <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
            {t('personalInfo.description')}
          </p>
          <div className="mt-4 flex justify-center md:justify-end gap-2">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary rounded-xl text-white cursor-pointer"
            >
              {t('buttons.applyChanges')}
            </Button>
            <Button variant="ghost">{t('buttons.cancel')}</Button>
          </div>
        </div>
        <div
          dir="rtl"
          className="flex flex-col flex-wrap gap-4 w-full md:w-[calc(55%)]"
        >
          {inputs.map((item) => {
            return (
              <Input
                defaultValue={item.value}
                key={item.name}
                name={item.name}
                placeholder={item.placeHolder}
                className="h-12 placeholder:text-text-secondary md:w-[calc(65%)] w-full placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
                value={item.value}
                onChange={formik.handleChange}
              />
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-border" />
      <div className="my-8 flex flex-col md:flex-row-reverse justify-between gap-6 md:gap-0">
        <div className="text-center md:text-right">
          <h2 className="text-text text-[20px] font-extrabold font-yekan ">
            {t('security.title')}
          </h2>
          <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
            {t('security.description')}
          </p>
          <div className="mt-4 flex justify-center md:justify-end gap-2">
            <Button className="bg-primary cursor-pointer rounded-xl hover:bg-primary text-white">
              {t('buttons.applyChanges')}
            </Button>
            <Button variant="ghost">{t('buttons.cancel')}</Button>
          </div>
        </div>

        <div
          dir="rtl"
          className="flex flex-col flex-wrap gap-4 w-full md:w-[calc(55%)]"
        >
          {inputsSecurity.map((item) => {
            return (
              <Input
                key={item.placeHolder}
                placeholder={item.placeHolder}
                className="h-12 placeholder:text-text-secondary md:w-[calc(65%)] w-full placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
            );
          })}
        </div>
      </div>
    </form>
  );
}
