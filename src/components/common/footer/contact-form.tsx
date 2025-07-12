"use client";

// Dependencies
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Third party components
import Button from "../button";

// API
import postMessage from "@/utils/service/contact-us/post";

/**
 * RContact us form component
 *
 * @component
 * @returns {JSX.Element} - Rendered contact us form
 */
export default function ContactForm() {
  // Hooks
  const t = useTranslations("Footer");

  // Schema
  const ContactSchema = Yup.object().shape({
    title: Yup.string().required(t("titleVal")),
    message: Yup.string().required(t("messageVal")).min(10, t("messageChar")),
  });

  // Posting user message logic.
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      toast.promise(postMessage(values), {
        pending: t("pending"),
        success: t("success"),
        error: t("error"),
      });
      resetForm();
    },
  });

  return (
    <div className="w-full bg-background/50 rounded-xl mb-6">
      <h2 className="text-xl font-bold mb-6  ">{t("contact")}</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full md:flex-row-reverse gap-4 items-center justify-end mx-auto"
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
            className="h-[48px]  rounded-xl border-border"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            status={formik.touched.title && formik.errors.title ? "error" : ""}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm mt-1 ">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        <div className="w-full md:w-2/5 flex ">
          <Input
            id="message"
            name="message"
            placeholder={t("desc")}
            className="h-[48px]  rounded-xl border-border"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            status={
              formik.touched.message && formik.errors.message ? "error" : ""
            }
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500 text-sm mt-1 ">
              {formik.errors.message}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
