"use client";

import { Button } from "@/components/ui/button";
import SimpleCaptcha from "@/components/ui/captcha";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/utils/helper/format-number";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Main payment form component
function PaymentForm({ price, id }: { price: number; id: number }) {
  const router = useRouter();

  // State variables for form inputs
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [saveCardInfo, setSaveCardInfo] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Helper function to format card number with spaces (#### #### #### ####)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple front-end validation for required fields
    const newErrors: { [key: string]: string } = {};
    if (!cardNumber.trim()) newErrors.cardNumber = "شماره کارت اجباری است";
    if (!cvv2.trim()) newErrors.cvv2 = "CVV2 اجباری است";
    if (!expYear.trim()) newErrors.expYear = "سال انقضا اجباری است";
    if (!expMonth.trim()) newErrors.expMonth = "ماه انقضا اجباری است";
    if (!secondPassword.trim()) newErrors.secondPassword = "رمز دوم اجباری است";

    setErrors(newErrors);

    // If no validation errors and captcha is verified, proceed
    if (Object.keys(newErrors).length === 0 && captchaVerified) {
      router.push(`/signature/${id}`);
    }
  };

  return (
    <Card className="w-[700px] bg-white border-none">
      <CardHeader>
        <CardTitle className="rounded-[8px] h-[48px] w-full bg-[#eef4fd] flex flex-col px-[10px]">
          <h1 className="text-[#2b73e3] my-auto h-4">
            اطلاعات کارت خود را وارد کنید
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Payment form */}
        <form onSubmit={handleSubmit} className="px-24 flex flex-col gap-4">
          {/* Card number input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">شماره کارت</label>
            <Input
              dir="ltr"
              className="text-center text-lg bg-[#f3f3f3] border-[#eeeeee]"
              placeholder="---- ---- ---- ----"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          {/* CVV2 input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              شماره شناسایی دوم (CVV2)
            </label>
            <Input
              dir="ltr"
              className="text-center text-lg bg-[#f3f3f3] border-[#eeeeee]"
              placeholder="CVV2"
              maxLength={4}
              value={cvv2}
              onChange={(e) => setCvv2(e.target.value.replace(/\D/g, ""))}
            />
            {errors.cvv2 && (
              <p className="text-red-500 text-sm">{errors.cvv2}</p>
            )}
          </div>

          {/* Expiry date inputs (year and month) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">تاریخ انقضا</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  dir="ltr"
                  className="text-center text-lg bg-[#f3f3f3] border-[#eeeeee]"
                  placeholder="سال"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) =>
                    setExpYear(e.target.value.replace(/\D/g, ""))
                  }
                />
                {errors.expYear && (
                  <p className="text-red-500 text-sm">{errors.expYear}</p>
                )}
              </div>
              <div>
                <Input
                  dir="ltr"
                  className="text-center text-lg bg-[#f3f3f3] border-[#eeeeee]"
                  placeholder="ماه"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) =>
                    setExpMonth(e.target.value.replace(/\D/g, ""))
                  }
                />
                {errors.expMonth && (
                  <p className="text-red-500 text-sm">{errors.expMonth}</p>
                )}
              </div>
            </div>
          </div>

          {/* Second password input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">رمز دوم</label>
            <Input
              dir="ltr"
              className="text-center text-lg bg-[#f3f3f3] border-[#eeeeee]"
              type="password"
              placeholder="رمز دوم"
              value={secondPassword}
              onChange={(e) =>
                setSecondPassword(e.target.value.replace(/\D/g, ""))
              }
            />
            {errors.secondPassword && (
              <p className="text-red-500 text-sm">{errors.secondPassword}</p>
            )}
          </div>

          {/* Captcha for bot protection */}
          <SimpleCaptcha onVerify={setCaptchaVerified} />

          {/* Checkbox to optionally save card info */}
          <div className="flex items-center gap-2 justify-end">
            <label htmlFor="saveCard" className="cursor-pointer text-sm">
              شماره کارت در درگاه‌های ثبت شود
            </label>
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCardInfo}
              onChange={() => setSaveCardInfo(!saveCardInfo)}
              className="cursor-pointer w-4 h-4"
            />
          </div>

          {/* Payment button (disabled if captcha not verified) */}
          <Button
            type="submit"
            className="w-full !bg-[#00c234] hover:!bg-[#73d791] text-white py-3 rounded-md"
            disabled={!captchaVerified}
          >
            پرداخت {formatNumber(price * 10)} ریال
          </Button>

          {/* Cancel button to return to property detail page */}
          <Link className="w-full" href={`/property-detail/${id}`}>
            <button
              type="button"
              className="w-full text-[#f63a51] border p-[5px] rounded-md bg-white border-[#eee]"
            >
              انصراف
            </button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}

export default PaymentForm;
