import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';

const SimpleCaptcha = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const isInitialMount = useRef(true);

  const generateCaptcha = useCallback(() => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptcha());
    setUserInput('');
    setIsVerified(false);
    if (onVerify) onVerify(false);
  }, [generateCaptcha, onVerify]);

  useEffect(() => {
    if (isInitialMount.current) {
      refreshCaptcha();
      isInitialMount.current = false;
    }
  }, [refreshCaptcha]);

  useEffect(() => {
    if (userInput.length === 5 && userInput === captchaCode) {
      setIsVerified(true);
      if (onVerify) onVerify(true);
    }
  }, [userInput, captchaCode, onVerify]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium">کد امنیتی</label>
        <div className='flex justify-between w-full'>
          <div className="text-2xl w-[146px] text-center text-white  tracking-widest bg-[#2b73e3] px-4 py-2 rounded">
            {captchaCode}
          </div>

          <div className='flex rounded-[8px] w-[267px] h-[48px] px-4 justify-between bg-[#f3f3f3] border-[#eeeeee]'>
          <img src="https://img.icons8.com/?size=100&id=70688&format=png&color=2b73e3" className="w-6 my-auto h-6 cursor-pointer" onClick={refreshCaptcha}/>
            <Input
              dir="ltr"
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

      {isVerified && (
        <div className="text-green-500 text-sm mt-1 flex items-center">
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
          </svg>
          کد صحیح است
        </div>
      )}
    </div>
  );
};

export default SimpleCaptcha;