'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
  label?: string;
  refreshText?: string;
  placeholder?: string;
}

const generateRandomCode = (length: number = 6): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Captcha: React.FC<CaptchaProps> = ({ 
  onVerify, 
}) => {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw noise lines
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw noise dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw text
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < code.length; i++) {
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
      ctx.save();
      ctx.translate(20 + i * 25, canvas.height / 2);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  };

  const generateCaptcha = () => {
    const newCode = generateRandomCode();
    setCaptchaCode(newCode);
    setUserInput('');
    setIsVerified(false);
    onVerify(false);
    drawCaptcha(newCode);
  };

  const verifyCaptcha = () => {
    const isValid = userInput.toLowerCase() === captchaCode.toLowerCase();
    setIsVerified(isValid);
    onVerify(isValid);
    
    if (!isValid) {
      generateCaptcha();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (value.length === captchaCode.length) {
      verifyCaptcha();
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">کد امنیتی</label>
      <div className="flex flex-col items-center gap-2">
        <div className="relative border rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={180} 
            height={60}
            className="w-full h-full"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateCaptcha} 
          type="button"
          className="self-end"
        >
          تازه سازی
        </Button>
        <Input
          dir="ltr"
          className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[15px]"
          placeholder="کد را وارد کنید"
          value={userInput}
          onChange={handleInputChange}
          maxLength={captchaCode.length}
        />
      </div>
    </div>
  );
};

export { Captcha };