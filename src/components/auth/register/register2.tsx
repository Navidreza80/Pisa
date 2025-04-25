"use client";

import { Input } from "antd";
import React, { useRef, useState, useEffect } from "react";
import Button from "../Items/Button";
import { useTranslations } from "next-intl";

const EMAIL = "Example@gmail.com";
const CODE_LENGTH = 5;

function Register2() {
    const t = useTranslations("Auth"); // حذف await
    const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
    const [timer, setTimer] = useState(80);
    const [email, setEmail] = useState(EMAIL);
    const [editingEmail, setEditingEmail] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        let val = e.target.value;
        val = val.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
        val = val.replace(/[^0-9]/g, "");
        const newCode = [...code];
        newCode[idx] = val[val.length - 1] || "";
        setCode(newCode);
        if (val && idx < CODE_LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
        if (paste.length) {
            const newCode = paste.split("").concat(Array(CODE_LENGTH - paste.length).fill(""));
            setCode(newCode);
            setTimeout(() => inputRefs.current[paste.length - 1]?.focus(), 0);
        }
        e.preventDefault();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleEditEmail = () => setEditingEmail(true);
    const handleSaveEmail = () => setEditingEmail(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ارسال کد تایید
    };

    const timerStr = `0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

    return (
        <div className="max-w-[390px] w-full mx-auto flex flex-col items-center justify-center min-h-screen bg-white" dir="rtl">
            <div className="w-full flex flex-col gap-8">
                <h1 className="text-[36px] font-bold text-right">{t("SignUpTitle")}</h1>
                <p className="text-right text-sm font-semibold text-[#767676]">{t("SignUpDesc2")}</p>

                {editingEmail ? (
                    <div className="flex items-center gap-2">
                        <input
                            className="border rounded px-2 py-1 text-sm focus:outline-none"
                            value={email}
                            onChange={handleEmailChange}
                            autoFocus
                        />
                        <button className="text-[#586CFF] underline text-xs" onClick={handleSaveEmail}>ذخیره</button>
                    </div>
                ) : (
                    <button className="text-[#586CFF] underline text-xs" onClick={handleEditEmail}>تغییر ایمیل</button>
                )}

                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <span className="text-sm w-full mb-2 text-right font-medium text-[#222]">کد تایید</span>
                    <div className="flex flex-row-reverse justify-center gap-3 mb-4 w-full">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => (inputRefs.current[idx] = el!)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                onPaste={handlePaste}
                                className="w-[66px] h-[66px] text-center text-2xl border border-[#E0E0E0] rounded-2xl focus:border-[#586CFF] outline-none font-bold"
                                style={{ direction: "ltr" }}
                                pattern="[0-9۰-۹]*"
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between w-full mb-6 px-2">
                        <span className="flex items-center gap-2 bg-[#586CFF30] p-2 pl-3 rounded-full text-[#586CFF] text-sm font-bold">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12H12V6" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.8475 4.17041C19.0217 4.3242 19.1911 4.48354 19.3555 4.648C19.5199 4.81246 19.6791 4.98203 19.8328 5.15629M15 2C15.4821 2.14255 15.9548 2.32634 16.4134 2.54664M21.4375 7.55457C21.6647 8.02313 21.8539 8.50663 22 9" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {timerStr}
                        </span>
                    </div>

                    <Button text="ارسال" />
                </form>
            </div>
        </div>
    );
}

export default Register2;
