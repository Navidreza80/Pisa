"use client";

import { registerForTour } from "@/lib/actions/register-for-tour";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

// Validation Schema
const registrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  phoneNumber: Yup.string()
    .required("شماره تلفن الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست (مثال: 09123456789)"),
  countOfPeople: Yup.number()
    .required("تعداد نفرات الزامی است")
    .min(1, "حداقل ۱ نفر باید انتخاب شود")
    .max(10, "حداکثر ۱۰ نفر میتوانند ثبت نام کنند"),
  email: Yup.string().email("ایمیل معتبر نیست").optional(),
  extraDescription: Yup.string()
    .optional()
    .max(500, "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد"),
});

export default function RegisterForm({ tourId }: { tourId: string }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      countOfPeople: "1",
      email: "",
      extraDescription: "",
      tourId: tourId,
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await registerForTour(values);

        if (response.success) {
          toast.success(response.message);
          resetForm();
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(
          error.message || "خطای سیستمی رخ داده است. لطفاً بعداً تلاش کنید"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return tourId ? (
    <div className="sticky top-4 border-[1px] rounded-2xl flex flex-col flex-wrap gap-4 border-border h-auto w-full p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">ثبت نام در تور</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block mb-1 font-medium">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              formik.touched.fullName && formik.errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-blue-500"
            }`}
            placeholder="نام و نام خانوادگی را وارد کنید"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.fullName}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phoneNumber" className="block mb-1 font-medium">
            شماره تلفن
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-blue-500"
            }`}
            placeholder="09xxxxxxxxx"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Number of Participants */}
        <div>
          <label htmlFor="countOfPeople" className="block mb-1 font-medium">
            تعداد نفرات
          </label>
          <select
            id="countOfPeople"
            name="countOfPeople"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              formik.touched.countOfPeople && formik.errors.countOfPeople
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-blue-500"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.countOfPeople}
          >
            <option value="1">1 نفر</option>
            <option value="2">2 نفر</option>
            <option value="3">3 نفر</option>
            <option value="4">4 نفر</option>
            <option value="5">5 نفر</option>
            <option value="6">6 نفر</option>
            <option value="7">7 نفر</option>
            <option value="8">8 نفر</option>
            <option value="9">9 نفر</option>
            <option value="10">10 نفر</option>
          </select>
          {formik.touched.countOfPeople && formik.errors.countOfPeople && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.countOfPeople}
            </p>
          )}
        </div>

        {/* Email Field (Optional) */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            ایمیل (اختیاری)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-blue-500"
            }`}
            placeholder="example@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="extraDescription" className="block mb-1 font-medium">
            توضیحات اضافه (اختیاری)
          </label>
          <textarea
            id="extraDescription"
            name="extraDescription"
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              formik.touched.extraDescription && formik.errors.extraDescription
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-blue-500"
            }`}
            placeholder="درخواست‌های خاص یا توضیحات اضافه"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.extraDescription}
          />
          {formik.touched.extraDescription &&
            formik.errors.extraDescription && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.extraDescription}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "در حال ثبت..." : "ثبت نام در تور"}
        </button>
      </form>
    </div>
  ) : (
    <div className="p-6 text-red-500">خطا: شناسه تور نامعتبر است</div>
  );
}
