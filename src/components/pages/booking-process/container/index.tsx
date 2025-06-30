"use client";

import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import BookingStepOne from "../steps/StepOne";
import BookingStepTwo from "../steps/StepTwo";
import Stepper from "../steps/Stepper";

export default function BookingProcessContainer() {
  const id = useAppSelector((state) => state.bookingSteps.id);
  return (
    <div className="flex flex-col flex-wrap w-[85.5%]">
      <Stepper />
      {id == 1 ? <BookingStepOne /> : id == 2 ? <BookingStepTwo /> : ""}
    </div>
  );
}
