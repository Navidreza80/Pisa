"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const AdvancedCaptcha = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialMount = useRef(true);

  // Generate random captcha code
  const generateCaptcha = useCallback(() => {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  // Draw captcha with distortions
  const drawCaptcha = useCallback((code: string) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random lines
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `rgba(43, 115, 227, ${Math.random() * 0.5 + 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw random dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(43, 115, 227, ${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Draw text with distortions
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#2b73e3";

    for (let i = 0; i < code.length; i++) {
      // Add random rotation and spacing
      ctx.save();
      ctx.translate(30 + i * 25, 35);
      ctx.rotate((Math.random() - 0.5) * 0.4);

      // Add random character scaling
      const scale = 0.8 + Math.random() * 0.4;
      ctx.scale(scale, scale);

      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  }, []);

  // Refresh captcha
  const refreshCaptcha = useCallback(() => {
    const newCode = generateCaptcha();
    setCaptchaCode(newCode);
    drawCaptcha(newCode);
    setUserInput("");
    setIsVerified(false);
    if (onVerify) onVerify(false);
  }, [generateCaptcha, drawCaptcha, onVerify]);

  // Initial setup
  useEffect(() => {
    if (isInitialMount.current) {
      refreshCaptcha();
      isInitialMount.current = false;
    }
  }, [refreshCaptcha]);

  // Verification logic
  useEffect(() => {
    if (userInput.length === 5 && userInput === captchaCode) {
      setIsVerified(true);
      if (onVerify) onVerify(true);
    }
  }, [userInput, captchaCode, onVerify]);

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">
          کد امنیتی
        </label>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Captcha Display */}
          <div className="relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width="170"
              height="48"
              className="border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Input Field */}
          <div className="flex rounded-[8px] w-[267px] h-[48px] px-4 justify-between bg-[#f3f3f3] border-[#eeeeee]">
            <Image
              fill
              unoptimized
              alt="image"
              src="https://img.icons8.com/?size=100&id=70688&format=png&color=2b73e3"
              className="w-6 my-auto h-6 cursor-pointer"
              onClick={refreshCaptcha}
            />
            <Input
              
              type="text"
              value={userInput}
              onChange={(e) => !isVerified && setUserInput(e.target.value)}
              placeholder="کد را وارد کنید"
              disabled={isVerified}
              maxLength={5}
              className={`text-center my-auto border-0 text-lg  placeholder:text-[15px]`}
            />
          </div>
        </div>
      </div>

      {/* Verification Status */}
      {isVerified ? <></> : userInput.length === 6 && <></>}
    </div>
  );
};

export default AdvancedCaptcha;
