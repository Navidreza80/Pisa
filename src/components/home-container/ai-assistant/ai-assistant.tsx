"use client";

// API
// import { getAllLocations } from "@/utils/service/location/get";

// Dependencies

// Third party components
import Reveal from "@/components/common/reveal";

// Next
import Image from "next/image";

// Images
import AI from "@/assets/images/AI.png";
import { Input } from "@/components/ui/input";
import { getRecommendation } from "@/utils/service/recommendation/get";
import { useMutation } from "@tanstack/react-query";
import { Info, Stars } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import ResultModal from "./result-modal";
import Status from "./status";
import { HouseItemsInterface } from "@/types/house";
import { getHouseById } from "@/utils/service/house/get-by-id";

/**
 * AIAssistant component.
 *
 * @component
 * @returns {JSX.Element} - Rendered category
 */

export default function AIAssistant({
  // houseLength,
  houses,
}: {
  houses: HouseItemsInterface[];
}) {
  // const cities = locations.length;
  // const [locations, setLocation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [reason, setReason] = useState("");
  const [budget, setBudget] = useState<number>();
  const t = useTranslations("Auth");
  const [recommendation, setRecommendation] = useState();

  const { mutate } = useMutation({
    mutationKey: ["GET_RECOMMENDATION"],
    mutationFn: async () => {
      const res = await getRecommendation(userInput, budget, houses);
      return res;
    },
    retry: 0,
    onMutate: () => {
      toast.loading(t("pending"));
    },
    onSuccess: async (res) => {
      const data = await getHouseById(res.houseId);
      console.log(res)
      setRecommendation(data);
      setReason(res.reason);
      toast.success("خانه مورد نظر پیدا شد");
    },
    onError: (error) => {
      toast.error("خطا در دریافت پیشنهاد");
      console.error(error);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  // TODO: bind status info
  // const getAllLocation = () => {
  //   const res = getAllLocations();
  //   setLocation(res);
  // };
  // Fetch data
  // useEffect(() => {
  //   getAllLocation();
  // }, []);

  return (
    <div dir="rtl">
      <Reveal>
        <div className="text-right text-[28px] font-[700] mb-4">
          از هوش مصنوعی مشاوره بگیر!
        </div>
      </Reveal>
      <div className="flex grow flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
        <div className="w-1/3 flex justify-between flex-wrap">
          <div className="flex gap-1.5 items-center">
            <Reveal>
              <h1 className="text-primary font-semibold text-[20px]">بودجه</h1>
            </Reveal>
            <span className="text-fade font-medium text-sm">( تومان )</span>
          </div>
          <div className="w-full flex justify-between">
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-[55%] h-12 rounded-2xl border-border"
              dir="ltr"
              placeholder="1,200,000"
            />
            <div className="border w-[40%] h-12 rounded-2xl border-border flex justify-between items-center">
              <span className="h-full bg-primary px-2 text-white rounded-2xl flex items-center justify-center">
                رهن و اجاره
              </span>
              <span className="h-full px-4 text-primary flex items-center justify-center">
                رزرو
              </span>
            </div>
          </div>
          <div className="flex gap-1.5 items-center">
            <Reveal>
              <h1 className="text-primary font-semibold text-[20px]">
                توضیجات
              </h1>
            </Reveal>
            <Info className="text-fade" />
          </div>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-[238px] rounded-2xl border-border relative placeholder:absolute placeholder:top-4 placeholder:right-4"
            placeholder="خانه 2 خوابه در شیراز..."
          />
          <ResultModal reason={reason} recommendation={recommendation}>
            <button
              onClick={async () => await mutate()}
              className="w-full bg-primary rounded-2xl text-[20px] font-semibold cursor-pointer h-12 text-white flex justify-center items-center gap-1"
            >
              بزن بریم <Stars />
            </button>
          </ResultModal>
        </div>
        <div className="flex gap-9">
          <div className="flex justify-end flex-col items-center">
            <div className="flex gap-9">
              <div className="flex flex-col items-center">
                <Status text={"خانه"} value={100} />
                <div className="border h-2.5 border-primary w-[1px]"></div>
                <Status text={"شهر"} value={27} />
                <div className="border h-2.5 border-primary w-[1px]"></div>
                <Status text={"هتل"} value={82} />
              </div>
            </div>
          </div>
          <Image
            src={AI}
            width={500}
            height={500}
            alt="AI Image"
            className="w-[356px] h-[450px] rotate-y-180"
          />
        </div>
      </div>
    </div>
  );
}
