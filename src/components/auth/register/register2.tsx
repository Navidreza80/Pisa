"use client";

import LogoSVGClient from "@/components/common/svg/logo-client";
import { useEffect, useRef, useState } from "react";
import Button from "../common/button";
import TimerSVG from "@/components/common/svg/timer";
import { useTranslations } from 'next-intl'; // استفاده از useTranslations

const EMAIL = "Example@gmail.com";
const CODE_LENGTH = 5;

export default function Register2() {
  const t = useTranslations("Auth");
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(80);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, idx) => {
    let val = e.target.value.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    );
    val = val.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[idx] = val[val.length - 1] || "";
    setCode(newCode);
    if (idx < CODE_LENGTH - 1 && val) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, CODE_LENGTH);
    if (paste.length) {
      setCode(paste.split("").concat(Array(CODE_LENGTH - paste.length).fill("")));
      setTimeout(() => inputRefs.current[paste.length - 1]?.focus(), 0);
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Code sent");
  };

  const timerStr = `0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full flex flex-col gap-[32px]">
      <div dir="rtl">
        <LogoSVGClient />
      </div>
      <div dir="rtl">
        <h1 className="text-[36px] text-right font-[700] text-[#000000] dark:text-[#ffffff] mb-[30px]">
          {t("SignUpTitle")}
        </h1>
        <div className="text-[14px] text-right flex gap-[3px] font-[600] text-[#767676] dark:text-[#d1d1d1]">
          {t("SignUpDesc2")}
        </div>
      </div>

      <form className="w-full flex flex-col items-center mt-4" onSubmit={handleSubmit}>
        <span className="text-[14px] w-full font-[500] mb-[8px] text-right text-[#222] dark:text-[#d1d1d1]">
        {t("VerificationCode")}
        </span>
        <div className="flex flex-row-reverse justify-center gap-3 mb-4">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className="w-[66px] h-[66px] max-[345px]:h-[45px] max-[600px]:w-[100%] text-center text-2xl border font-yekannum border-[#E0E0E0] dark:border-[#555555] rounded-[16px] bg-[#fff] dark:bg-[#444444] focus:border-[#586CFF] dark:focus:border-[#86AFFF] outline-none transition-all font-bold"
              style={{ direction: "ltr" }}
              pattern="[0-9۰-۹]*"
            />
          ))}
        </div>
        <div dir="rtl" className="flex items-center justify-between w-full mb-6 px-2">
          <span className="flex bg-[#586CFF30] dark:bg-[#586CFF80] gap-[12px] p-[8px] pl-[12px] rounded-[100px]">
            <TimerSVG />
            <p className="text-[#586CFF] font-yekannum text-[14px] font-bold my-auto dark:text-[#A9B8FF]">
              {timerStr}
            </p>
          </span>
        </div>
        <Button text={t("ُSend")} />
      </form>
    </div>
  );
}
