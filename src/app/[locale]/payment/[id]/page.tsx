/* eslint-disable */
import PaymentForm from "@/components/payment/PaymentForm";
import { formatNumber } from "@/utils/helper/format-number";
import { getHouseById } from "@/utils/service/house/get-by-id";
import Image from "next/image";

export default async function Payment({ params: { id } }: { params: any }) {
  // Fetching property details server side
  const paymentsDetails = await getHouseById(id);

  return (
    <div className="relative z-50 mt-[96px] container p-6 mx-auto py-10 flex flex-col md:flex-row gap-6 items-start justify-center">
      <div className="w-[350px] bg-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="bg-[#eef4fd] flex justify-between p-4 rounded-lg">
            <div className="text-[#2b73e3] font-bold text-[14px]">۰۳:۲۷</div>
            <div className="text-[#2b73e3] font-bold text-[14px]">
              :زمان باقی‌مانده
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">پذیرنده</div>
              <div className="text-[#2d3a4a] text-2xl font-bold mt-2">Piza</div>
            </div>
            <Image
              width={24}
              height={24}
              alt="image"
              className="my-auto w-[24px] h-[24px]"
              src="https://images.vexels.com/media/users/3/223411/isolated/preview/7a8154be7b9b50412fc2cf63b636e370-store-icon-flat-store.png"
            />
          </div>

          <div className="flex justify-end gap-4">
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">مبلغ</div>
              <div>
                <div className="text-[#2d3a4a] text-2xl font-bold mt-2">
                  {formatNumber(Number(paymentsDetails.price))}
                </div>
                <div className="text-gray-500 text-xs self-end"></div>
              </div>
            </div>
            <Image
              width={24}
              height={24}
              className="my-auto w-[28px] h-[28px]"
              src="https://img.icons8.com/?size=100&id=56960&format=png&color=797979"
              unoptimized
              alt="image"
            />
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <div className="flex justify-end gap-4">
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">شماره پذیرنده / درگاه</div>
              <div className="text-[#2d3a4a] text-[16px] font-bold mt-2">
                123456 / 123456
              </div>
            </div>
            <Image
              width={24}
              height={24}
              className="my-auto w-[28px] h-[28px]"
              src="https://img.icons8.com/?size=100&id=HOkn2leeoong&format=png&color=797979"
              unoptimized
              alt="image"
            />
          </div>

          <div className="flex justify-end gap-4">
            <div className="flex flex-wrap flex-col justify-between">
              <div className="text-gray-500">سایت پذیرنده</div>
              <div className="text-[#2d3a4a] text-[16px] font-bold mt-2">
                NextElites.com
              </div>
            </div>
            <Image
              width={24}
              height={24}
              className="my-auto w-[28px] h-[28px]"
              src="https://img.icons8.com/?size=100&id=53372&format=png&color=797979"
              unoptimized
              alt="image"
            />
          </div>
        </div>
      </div>

      <PaymentForm id={id} price={Number(paymentsDetails.price)} />
    </div>
  );
}
