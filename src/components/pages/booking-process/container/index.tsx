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
      {id == 1 ? (
        <BookingStepOne />
      ) : id == 2 ? (
        <BookingStepTwo />
      ) : id == 3 ? (
        <div>3</div>
      ) : id == 4 ? (
        <div>d4</div>
      ) : (
        <div>d5</div>
      )}
    </div>
  );
}
