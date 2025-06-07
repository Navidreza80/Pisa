"use client";

import Reveal from "@/components/common/reveal";
import { Input } from "@/components/ui/input";
import { HouseItemsInterface } from "@/types/house";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { getRecommendation } from "@/utils/service/recommendation/get";
import { useMutation } from "@tanstack/react-query";
import { Info, Stars } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import ResultModal from "../modals/ResultModal";

/**
 * AIAssistant component.
 * Ask user about property info, features, cost, ...
 * Searches in all property
 * Return the best option in modal.
 *
 * @component
 * @returns {JSX.Element}
 */

export default function Agent({
  houses,
}: {
  houses: HouseItemsInterface[];
}) {
  // Hooks
  // const cities = locations.length;
  // const [locations, setLocation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [reason, setReason] = useState("");
  const [budget, setBudget] = useState<number>();
  const t = useTranslations("Auth");
  const [recommendation, setRecommendation] = useState<HouseItemsInterface>();
  const [isRent, setIsRent] = useState(false);

  // Mutations
  const { mutate, isPending } = useMutation({
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
      const data: HouseItemsInterface = await getHouseById(res.houseId);
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

  return (
    <>
      {/* Inputs */}
      <div className="lg:w-1/3 md:w-full w-full flex justify-between flex-wrap lg:gap-y-0 gap-y-3 md:gap-y-3">
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
            <span
              onClick={() => setIsRent((prev) => !prev)}
              className={`h-full cursor-pointer transition-all duration-300 ${!isRent ? "bg-primary text-white" : "text-primary"} px-2 rounded-2xl flex items-center justify-center`}
            >
              رهن و اجاره
            </span>
            <span
              onClick={() => setIsRent((prev) => !prev)}
              className={`h-full cursor-pointer transition-all duration-300 px-4 ${isRent ? "bg-primary text-white" : "text-primary"} rounded-2xl  flex items-center justify-center`}
            >
              رزرو
            </span>
          </div>
        </div>
        <div className="flex gap-1.5 items-center">
          <Reveal>
            <h1 className="text-primary font-semibold text-[20px]">توضیجات</h1>
          </Reveal>
          <Info className="text-fade" />
        </div>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-[238px] rounded-2xl border-border relative placeholder:absolute placeholder:top-4 placeholder:right-4"
          placeholder="خانه 2 خوابه در شیراز..."
        />
        {!isPending && recommendation ? (
          <ResultModal reason={reason} recommendation={recommendation}>
            <button
              onClick={async () => await mutate()}
              className="w-full bg-primary group hover:scale-105 transition-all duration-300 rounded-2xl text-[20px] font-semibold cursor-pointer h-12 text-white flex justify-center items-center gap-1"
            >
              بزن بریم
              <Stars className="group-hover:shadow-sm rounded-full group-hover:shadow-amber-200 transition-all duration-300" />
            </button>
          </ResultModal>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
}
