'use client';

import { Button } from '@/components/ui/button';
import { Captcha } from '@/components/ui/captcha';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function Payment() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardDigits = cardNumber.replace(/\s+/g, '');
    if (cardDigits.length !== 16) {
      alert('لطفاً شماره کارت را به صورت کامل (16 رقم) وارد کنید');
      return;
    }

    if (!captchaVerified) {
      alert('لطفاً کد امنیتی را تأیید کنید');
      return;
    }
    console.log('پرداخت انجام شد');
  };

  return (
    <div className="relative z-50 mt-[96px] container p-6 mx-auto py-10 flex flex-col md:flex-row gap-6 items-start justify-center">
      <div className="w-[350px] bg-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col gap-4">
          <div className='bg-[#eef4fd] flex justify-between p-4 rounded-lg'>
            <div className="text-[#2b73e3] font-bold text-[14px]">۰۳:۲۷</div>
            <div className="text-[#2b73e3] font-bold text-[14px]">:زمان باقی‌مانده</div>
          </div>

          <div className='flex justify-end gap-4'>
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">پذیرنده</div>
              <div className="text-[#2d3a4a] text-2xl font-bold mt-2">دیجیکالا</div>
            </div>
            <img className='my-auto w-[24px] h-[24px]' src="https://images.vexels.com/media/users/3/223411/isolated/preview/7a8154be7b9b50412fc2cf63b636e370-store-icon-flat-store.png" alt="" />
          </div>

          <div className='flex justify-end gap-4'>
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">مبلغ</div>
              <div>
                <div className="text-[#2d3a4a] text-2xl font-bold mt-2">20,000,000,000</div>
                <div className="text-gray-500 text-xs self-end">بیست میلیارد تومان</div>
              </div>
            </div>
            <img className='my-auto w-[28px] h-[28px]' src="https://img.icons8.com/?size=100&id=56960&format=png&color=797979" alt="" />
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <div className='flex justify-end gap-4'>
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">شماره پذیرنده / درگاه</div>
              <div className="text-[#2d3a4a] text-[16px] font-bold mt-2">123456 / 123456</div>
            </div>
            <img className='my-auto w-[28px] h-[28px]' src="https://img.icons8.com/?size=100&id=HOkn2leeoong&format=png&color=797979" alt="" />
          </div>

          <div className='flex justify-end gap-4'>
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">سایت پذیرنده</div>
              <div className="text-[#2d3a4a] text-[16px] font-bold mt-2">NextElites.com</div>
            </div>
            <img className='my-auto w-[28px] h-[28px]' src="https://img.icons8.com/?size=100&id=53372&format=png&color=797979" alt="" />
          </div>

        </div>
      </div>

      <Card className="max-w-[700px] bg-white border-none">
        <CardHeader>
          <CardTitle className="rounded-[8px] h-[48px] w-full bg-[#eef4fd] flex flex-col px-[10px]"><h1 className='text-[#2b73e3] my-auto h-4'>اطلاعات کارت خود را وارد کنید</h1></CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="px-24 flex flex-col flex-wrap gap-4">
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

            <Captcha
              onVerify={handleCaptchaChange}
            />

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
              پرداخت ۱۹,۱۵۰,۰۰۰ ریال
            </Button>
            <Button type="submit" className="text-[#f63a51] bg-white border-px border-[#f2f3f7]">
              انصراف
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Payment;