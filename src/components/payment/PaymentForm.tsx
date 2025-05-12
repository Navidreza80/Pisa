'use client';

import { Button } from '@/components/ui/button';
import SimpleCaptcha from '@/components/ui/captcha';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatNumber } from "@/utils/helper/format-number";

function PaymentForm({price}:{price:number}) {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [saveCardInfo, setSaveCardInfo] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setSecondPassword(numericValue);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };

  const handleCaptchaChange = (verified: boolean) => {
    setCaptchaVerified(verified);
  };

  return (
    <Card className="w-[700px] bg-white border-none">
      <CardHeader>
        <CardTitle className="rounded-[8px] h-[48px] w-full bg-[#eef4fd] flex flex-col px-[10px]">
          <h1 className='text-[#2b73e3] my-auto h-4'>اطلاعات کارت خود را وارد کنید</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="px-24 flex flex-col flex-wrap gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">شماره کارت</label>
            <Input
              dir="ltr"
              className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[20px]"
              placeholder="---- ---- ---- ----"
              maxLength={19}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">شماره شناسایی دوم (CVV2)</label>
            <Input
              dir="ltr"
              className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[15px]"
              placeholder="CVV2"
              maxLength={4}
            />
          </div>

          <div className="">
            <div className="space-y-2">
              <label className="block text-sm font-medium">تاریخ انقضا</label>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Input
                    dir="ltr"
                    className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[15px]"
                    placeholder="سال"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Input
                    dir="ltr"
                    className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[15px]"
                    placeholder="ماه"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">رمز دوم</label>
            <Input
              dir="ltr"
              className="text-center text-lg rounded-[8px] bg-[#f3f3f3] border-[#eeeeee] placeholder:text-[15px]"
              type="password"
              placeholder="رمز دوم"
              value={secondPassword}
              onChange={handleNumericInput}
            />
          </div>

          <SimpleCaptcha onVerify={handleCaptchaChange} />

          <div className="flex items-center gap-2 justify-end">
            <label htmlFor="saveCard" className="cursor-pointer text-sm">شماره کارت در درگاه‌های ثبت شود</label>
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCardInfo}
              onChange={() => setSaveCardInfo(!saveCardInfo)}
              className="cursor-pointer w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer !bg-[#00c234] hover:!bg-[#73d791] text-white py-3 rounded-md"
            disabled={!captchaVerified}
          >
            پرداخت {formatNumber(price * 10)} ریال
          </Button>
          <button type="submit" className="text-[#f63a51] border p-[5px] rounded-md cursor-pointer bg-white border-px border-[#eee]"> انصراف </button>
        </form>
      </CardContent>
    </Card>
  );
}
export default PaymentForm;