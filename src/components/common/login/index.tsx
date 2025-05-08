"use client";

// Next
import { useTranslations } from "next-intl";

// Dependencies
import { useLoginUser } from "@/utils/service/login/post";
import { useFormik } from "formik";

// SVGs
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";

// SVGs
import GoogleSVG from "@/components/common/svg/google";

// API
import { login } from "@/lib/actions/auth";
import { createUser } from "@/lib/actions/user";
import { JwtPayload } from "@/types/user";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { jwtDecode } from "jwt-decode";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/auth/common/button";
import OrUnderline from "@/components/auth/common/or-underline";
import InputAuth from "@/components/auth/common/input-auth";

export default function LoginModal({
  trigger,
  isOpen
}: {
  trigger?: any;
  isOpen?: boolean;
}) {
  // Hooks
  const { mutate } = useLoginUser();
  const t = useTranslations("Auth");
  const token = getClientCookie("clientAccessToken");
  const decoded = typeof token == "string" && jwtDecode<JwtPayload>(token);

  // Posting user email and password logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      await mutate(value);
      try {
        if (decoded) await createUser(decoded.id, decoded.email, decoded.name);
      } catch (e) {
        console.log(e);
      }
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
              <GoogleSVG />{" "}
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
