"use client";
// API
import postMessage from "@/utils/service/contact-us/post";
// Formik
import { useFormik } from "formik";
// Toast
import { toast } from "react-toastify";
// Yup
import * as Yup from "yup";
// Third party components
import Button from "../button/button";
// ShadCn components
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

// Schema
const ContactSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الزامی است"),
  message: Yup.string()
    .required("پیام الزامی است")
    .min(10, "پیام باید حداقل 10 کاراکتر باشد"),
});

export default function ContactForm() {
  const t = useTranslations("Footer")
  // Hooks
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        toast.promise(postMessage(values), {
          pending: "در حال پردازش",
          success: "پیام شما با موفقیت ارسال شد",
          error: "خطا!",
        });
        resetForm();
      } catch {
        toast.error("خطا در ارسال پیام");
      }
    },
  });

  return (
    <div className="w-full bg-background/50 rounded-xl mb-6">
      <h2 className="text-xl font-bold mb-6 text-right">{t("contact")}</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full md:flex-row-reverse gap-4 items-center justify-end mx-auto"
        dir="rtl"
      >
        <div className="w-full md:w-auto">
          <Button
            className="w-full md:w-auto px-6 h-[48px] flex items-center gap-2 justify-center"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? t("isSending") : t("send")}
          </Button>
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <Input
            id="title"
            name="title"
            placeholder={t("title")}
            className="h-[48px] text-right rounded-xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            status={formik.touched.title && formik.errors.title ? "error" : ""}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        <div className="w-full md:w-2/5 flex ">
          <Input
            id="message"
            name="message"
            placeholder={t("desc")}
            className="h-[48px] text-right rounded-xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            status={
              formik.touched.message && formik.errors.message ? "error" : ""
            }
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.message}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
