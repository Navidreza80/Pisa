import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import {
  addTravelers,
  setHouseId,
  setReservedDates,
  setSharedEmail,
  setSharedMobile,
} from "@/utils/hooks/react-redux/store/slices/book-hotel-slice";
import { setBookingSteps } from "@/utils/hooks/react-redux/store/slices/booking-step";
import { useUser } from "@/utils/service/user/get";
import { ChevronUp } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../common/button";
import Line from "../../../common/dashboard/line";
import { TimePastSVG, TravelersSVG } from "../../../svg";
import Body from "../contents/Body";
import Header from "../contents/Header";
import HotelDetail from "../contents/HotelDetail";
import SendToOthersForm from "../forms/SendToOthersForm";
import TravelerForm from "../forms/TravelerForm";
import useTravelerForm from "../hooks/UseTravelerForm";
import { useTranslations } from "next-intl";

export default function BookingStepOne() {
  const t = useTranslations("ReserveDetail")
  const [showTravelers, setShowTravelers] = useState(true);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const dateStart = searchParams.get("enterDate");
  const dateEnd = searchParams.get("exitDate");
  const travelersCount = parseInt(
    searchParams.get("travelersCount") || "1",
    10
  );

  const { travelersData, errors, handleInputChange, validateAll } =
    useTravelerForm(travelersCount);

  const { data } = useUser();

  const booking = useAppSelector(
    (state) => state.bookingCreate
  );

  const handleSubmit = () => {
    if (validateAll()) {
      dispatch(setHouseId(Number(id)));
      dispatch(setBookingSteps(2));
      dispatch(addTravelers(travelersData));
      if (typeof dateStart == "string" && typeof dateEnd == "string") {
        dispatch(setReservedDates([dateStart, dateEnd]));
      } else {
        toast.error(t("dateError"));
      }
      if (booking.sharedEmail && booking.sharedMobile) {
        dispatch(setSharedEmail(booking.sharedEmail));
        dispatch(setSharedEmail(booking.sharedMobile));
      } else if (data) {
        dispatch(setSharedMobile(data?.user.phoneNumber));
        dispatch(setSharedEmail(data?.user.email));
      }
    } else {
      return
    }
  };

  return (
    <HotelDetail handleSubmit={handleSubmit}>
      <Body>
        <Header>
          <h1 className="flex gap-3 items-center text-sm md:text-base">
            {t("travelerDetails")} <TravelersSVG color="black" />
          </h1>
          <h1 className="flex gap-3 items-center text-primary text-sm md:text-base">
            {t("choosePrevious")} <TimePastSVG color="#586cff" />
          </h1>
        </Header>

        <div  className="w-full flex flex-wrap gap-5 px-2 md:px-4">
          <div className="w-full flex">
            <ChevronUp
              onClick={() => setShowTravelers(!showTravelers)}
              className={`text-fade transition-all duration-300 cursor-pointer ${showTravelers ? "rotate-0" : "rotate-180"}`}
            />
          </div>

          {showTravelers &&
            [...Array(travelersCount)].map((_, index) => (
              <TravelerForm
                key={`traveler-${index}`}
                travelerIndex={index}
                data={travelersData[index]}
                errors={errors[index]}
                handleInputChange={handleInputChange}
              />
            ))}

          <Line className="w-full" />
          <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base">
            {t("addTraveler")}
          </Button>
        </div>
      </Body>

      <SendToOthersForm />
    </HotelDetail>
  );
}
