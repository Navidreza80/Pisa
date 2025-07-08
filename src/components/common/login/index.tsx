/* eslint-disable */

"use client";

// Next
import { useTranslations } from "next-intl";

// Dependencies
import { useLoginUser } from "@/utils/service/login/post";
import { useFormik } from "formik";

// SVGs
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";

// API
import { login } from "@/lib/actions/auth";

import InputAuth from "@/components/common/auth/input-auth";
import OrUnderline from "@/components/common/auth/or-underline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import GithubSVG from "../svg/github";
import { usePathname } from "next/navigation";
const Button = dynamic(() => import("@/components/common/auth/button"), {
  ssr: false,
});

export default function LoginModal({
  trigger,
  isOpen,
}: {
  trigger?: any;
  isOpen?: boolean;
}) {
  // Hooks
  const pathname = usePathname();
  const { mutate } = useLoginUser(pathname);
  const t = useTranslations("Auth");

  // Posting user email and password logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      mutate(value);
    },
  });
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent dir="rtl" className="max-w-[448px] h-[470px] px-6 py-6">
        <DialogHeader>
          <DialogTitle className="mx-auto text-primary text-3xl">
            ورود
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col flex-wrap gap-[20px]">
            <button
              onClick={() => login()}
              type="button"
              className="h-[48px] text-text border border-[#E0E0E0] rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold cursor-pointer transition-all dark:bg-white"
            >
              <span>{t("google")}</span>
              <GithubSVG />{" "}
            </button>
            <OrUnderline />
            <InputAuth
              text={t("email")}
              placeHolder={t("emailDesc")}
              icon={<EmailSVG />}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
            />
            <InputAuth
              text={t("password")}
              placeHolder={t("passwordDesc")}
              icon={<Password />}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button
              text={t("loginAccount")}
              created_at={new Date().toISOString()}
              id={Math.random().toString()}
              caption=""
              imageSrc=""
              imageTitle=""
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
