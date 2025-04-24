"use client"

import { Input } from 'antd'

import React, { useRef, useState, useEffect } from "react";
import Button from '../Items/Button';

const EMAIL = "Example@gmail.com";
const CODE_LENGTH = 5;

function Register2() {
    const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
    const [timer, setTimer] = useState(80);
    const [email, setEmail] = useState(EMAIL);
    const [editingEmail, setEditingEmail] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (e, idx) => {
        let val = e.target.value;
        // تبدیل اعداد فارسی به انگلیسی
        val = val.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728));
        val = val.replace(/[^0-9]/g, "");
        const newCode = [...code];
        if (!val) {
            newCode[idx] = "";
            setCode(newCode);
            return;
        }
        newCode[idx] = val[val.length - 1];
        setCode(newCode);
        if (idx < CODE_LENGTH - 1) {
            inputRefs.current[idx + 1].focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputRefs.current[idx - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
        if (paste.length) {
            setCode(paste.split("").concat(Array(CODE_LENGTH - paste.length).fill("")));
            setTimeout(() => {
                if (inputRefs.current[paste.length - 1]) inputRefs.current[paste.length - 1].focus();
            }, 0);
        }
        e.preventDefault();
    };

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleEditEmail = () => setEditingEmail(true);
    const handleSaveEmail = () => setEditingEmail(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // ارسال کد تایید
    };

    const timerStr = `0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

    return (
        <>
            <div className="w-full flex flex-col gap-[32px]">
                <div dir='rtl'>
                    <svg width="71" height="24" viewBox="0 0 71 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.54688 2.45312V20.1875C5.54688 21.0312 5.71875 21.6458 6.0625 22.0312C6.40625 22.4167 7.05729 22.6979 8.01562 22.875L7.875 23.25C6.6875 23.0833 5.75 23 5.0625 23C4.44792 23 3.73438 23.0833 2.92188 23.25L2.82812 23.0938C3.03646 22.7917 3.14062 22.2396 3.14062 21.4375V5.01562C3.14062 3.53646 2.96875 2.56771 2.625 2.10938C2.29167 1.64062 1.54688 1.40625 0.390625 1.40625L0.328125 0.953125C3.22396 0.526042 5.55208 0.3125 7.3125 0.3125C8.52083 0.3125 9.58854 0.401042 10.5156 0.578125C11.4531 0.755208 12.2969 1.05208 13.0469 1.46875C13.7969 1.875 14.3698 2.44271 14.7656 3.17188C15.1719 3.90104 15.375 4.78125 15.375 5.8125C15.375 6.94792 15.0052 7.98438 14.2656 8.92188C13.5365 9.84896 12.625 10.5573 11.5312 11.0469C10.4479 11.526 9.33854 11.7656 8.20312 11.7656C7.75521 11.7656 7.42188 11.7448 7.20312 11.7031V11.1562C7.99479 11.1562 8.72396 11.0521 9.39062 10.8438C10.0677 10.6354 10.6667 10.3229 11.1875 9.90625C11.7188 9.48958 12.1302 8.94271 12.4219 8.26562C12.724 7.57812 12.875 6.79167 12.875 5.90625C12.875 4.47917 12.5156 3.34896 11.7969 2.51562C11.0781 1.68229 9.95312 1.26562 8.42188 1.26562C7.29688 1.26562 6.30729 1.33333 5.45312 1.46875C5.51562 1.78125 5.54688 2.10938 5.54688 2.45312ZM23.7812 2.14062V20.1875C23.7812 21.0312 23.9531 21.6458 24.2969 22.0312C24.6406 22.4167 25.2917 22.6979 26.25 22.875L26.125 23.25C24.9688 23.0938 24.0885 23.0104 23.4844 23C22.8802 22.9896 22.1094 23.0729 21.1719 23.25L21.0625 23.0938C21.2812 22.7917 21.3906 22.2396 21.3906 21.4375V5.01562C21.3906 3.54688 21.2135 2.55729 20.8594 2.04688C20.5052 1.53646 19.7656 1.32292 18.6406 1.40625L18.5781 1.10938C20.2969 0.598958 21.9271 0.34375 23.4688 0.34375C23.6771 0.916667 23.7812 1.51562 23.7812 2.14062ZM44.25 23H30.2969C30.1094 22.5625 30.0156 22.0521 30.0156 21.4688C30.4323 21.0208 31 20.2448 31.7188 19.1406C32.4479 18.0365 33.3438 16.5677 34.4062 14.7344C35.4792 12.8906 36.3385 11.3958 36.9844 10.25C37.6406 9.10417 38.5833 7.42188 39.8125 5.20312C41.0521 2.97396 41.724 1.77083 41.8281 1.59375L41.6562 1.4375H34.6875C34.0938 1.45833 33.5729 1.54688 33.125 1.70312C32.6875 1.85938 32.2917 2.10417 31.9375 2.4375C31.5938 2.77083 31.3021 3.125 31.0625 3.5C30.8229 3.86458 30.5469 4.34896 30.2344 4.95312L29.7969 4.70312L30.9375 0.375L31.2031 0.15625L44.9844 0.46875L45.1875 0.828125C45 1.10938 44.5365 1.875 43.7969 3.125C43.1615 4.23958 42.4375 5.45312 41.625 6.76562C40.8229 8.09896 40.0052 9.48438 39.1719 10.9219L36.6875 15.2188C36.1146 16.2188 34.7344 18.4948 32.5469 22.0469L40.4844 21.7188C41.2448 21.6875 41.8906 21.599 42.4219 21.4531C42.9635 21.2969 43.4271 21.0573 43.8125 20.7344C44.1979 20.4115 44.5156 20.0729 44.7656 19.7188C45.0156 19.3542 45.2917 18.8698 45.5938 18.2656L46.0469 18.4531L44.5156 22.7812L44.25 23ZM58 1.34375C58.3542 1.125 58.7604 0.708333 59.2188 0.09375H59.375L67.9844 20.8281C68.3698 21.7552 69.1562 22.4062 70.3438 22.7812V23.0625C69.6667 22.9896 68.8542 22.974 67.9062 23.0156C66.9583 23.0677 66.1198 23.1562 65.3906 23.2812L65.2656 23.125C65.474 22.8542 65.5208 22.401 65.4062 21.7656C65.3021 21.1302 64.9844 20.1667 64.4531 18.875L61.875 12.4062C58.8125 12.3542 56.2812 12.3646 54.2812 12.4375L50.6719 20.8281C50.4531 21.3073 50.5312 21.7083 50.9062 22.0312C51.2917 22.3542 52.0417 22.625 53.1562 22.8438L53.0938 23.125C51.2812 22.9896 49.8021 22.9479 48.6562 23C48.5938 22.9375 48.526 22.8333 48.4531 22.6875L58 1.34375ZM54.7031 11.5156C56.2135 11.5573 58.474 11.5573 61.4844 11.5156L58.2188 3.35938L54.7031 11.5156Z" fill="black" />
                    </svg>
                </div>
                <div dir='rtl'>
                    <h1 className='text-[36px] text-right font-[700] text-[#000000] mb-[30px]'>ثبت نام در پیزا</h1>
                    <p className='text-[14px] text-right flex gap-[3px] font-[600] text-[#767676]'>کد تایید ارسال شده به <p className='text-[#586CFF]'>Example@gmail.com</p> را وارد کنید.</p>
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
                        <button className="text-[#586CFF] text-[14px] font-[600] underline text-xs" onClick={handleEditEmail}>تغییر ایمیل</button>
                    )}
                </div>

                <form className="w-full flex flex-col items-center mt-4" onSubmit={handleSubmit}>
                    <span className="text-[14px] w-full font-[500] mb-[8px] text-right text-[#222]">کد تایید</span>
                    <div className="flex flex-row-reverse justify-center gap-3 mb-4">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={el => inputRefs.current[idx] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleChange(e, idx)}
                                onKeyDown={e => handleKeyDown(e, idx)}
                                onPaste={handlePaste}
                                className="w-[66px] h-[66px] max-[345px]:h-[45px] max-[600px]:w-[100%] text-center text-2xl border font-yekannum border-[#E0E0E0] rounded-[16px] bg-[#fff] focus:border-[#586CFF] outline-none transition-all font-bold"
                                style={{ direction: 'ltr' }}
                                pattern="[0-9۰-۹]*"
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-between w-full mb-6 px-2">
                        <span className="flex bg-[#586CFF30] gap-[12px] p-[8px] pl-[12px] rounded-[100px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12H12V6" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.8475 4.17041C19.0217 4.3242 19.1911 4.48354 19.3555 4.648C19.5199 4.81246 19.6791 4.98203 19.8328 5.15629M15 2C15.4821 2.14255 15.9548 2.32634 16.4134 2.54664M21.4375 7.55457C21.6647 8.02313 21.8539 8.50663 22 9" stroke="#586CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className='text-[#586CFF] font-yekannum text-[14px] font-bold my-auto'>
                                {timerStr}
                            </p>

                        </span>
                    </div>
                    <Button text="ارسال" />
                </form>
            </div>
        </>
    );
}

export default Register2;