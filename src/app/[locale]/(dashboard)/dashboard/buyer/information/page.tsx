"use client";

import CameraSVG from "@/components/dashboard/svg/CameraSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditUser } from "@/utils/service/user/put";
import { useFormik } from "formik";

export default function Information() {
  const { mutate } = useEditUser();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profilePicture: "",
    },
    onSubmit: (values) => {
      mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: `${values.firstName} ${values.lastName}`,
        phoneNumber: values.phoneNumber,
        profilePicture: values.profilePicture,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-text text-[20px] font-extrabold font-yekan">
          عکس نمایه شما
        </h2>
        <p className="text-text-secondary text-[16px] font-[400] font-yekan">
          میتوانید عکس نمایه خود را تغییر دهید
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
            اطلاعات فردی
          </h2>
          <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
            میتوانید اطلاعات فردی خود را تغییر دهید
          </p>
          <div className="mt-4 flex justify-center md:justify-end gap-2">
            <Button
              type="submit"
              className="bg-primary/80 hover:bg-primary text-white"
            >
              اعمال تغییرات
            </Button>
            <Button variant="outline">انصراف</Button>
          </div>
        </div>

        <div
          dir="rtl"
          className="flex flex-col flex-wrap gap-4 w-full md:w-100"
        >
          <Input
            name="firstName"
            placeholder="نام"
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <Input
            name="lastName"
            placeholder="نام خانوادگی"
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <Input
            name="email"
            placeholder="ایمیل"
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Input
            name="phoneNumber"
            placeholder="شماره موبایل"
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div className="h-[1px] bg-border" />
      <div className="my-8 flex flex-col md:flex-row-reverse justify-between gap-6 md:gap-0">
        <div className="text-center md:text-right">
          <h2 className="text-text text-[20px] font-extrabold font-yekan ">
            امنیت
          </h2>
          <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
            میتوانید در این بخش رمز خود را تغییر دهید
          </p>
          <div className="mt-4 flex justify-center md:justify-end gap-2">
            <Button className="bg-primary/80 hover:bg-primary text-white">
              اعمال تغییرات
            </Button>
            <Button variant="outline">انصراف</Button>
          </div>
        </div>

        <div>
          <div
            dir="rtl"
            className="flex flex-col flex-wrap gap-4 w-full md:w-100"
          >
            <Input
              placeholder="رمز عبور قبلی"
              className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            />
            <Input
              placeholder="رمز عبور جدید"
              className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            />
            <Input
              placeholder="تکرار رمز عبور جدید"
              className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
