/* eslint-disable */

import { HouseItemsInterface } from "@/types/house";
import { formatNumber } from "@/utils/helper/format-number";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../common/button";
import Body from "./Body";
import { HotelInfoHeader } from "./hotel-info-header";
import { PriceSection } from "./PriceSection";
import { ReservationDates } from "../forms/ReservationDates";
import { useTranslations } from "next-intl";

const HotelDetail = ({
  children,
  handleSubmit,
}: {
  children: React.ReactNode;
  handleSubmit: () => void;
}) => {
  const t = useTranslations("BookingProcess");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotelDetail, setHotelDetail] = useState<HouseItemsInterface | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const dateStart = searchParams.get("enterDate");
  const dateEnd = searchParams.get("exitDate");
  const router = useRouter();

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      toast.error(t("error"));
      router.push(`/property-detail/${id}`);
    }
  }, [dateStart, dateEnd, id, router]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        const response = await getHouseById(id);
        setHotelDetail(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-[38px] mt-4 md:mt-8">
      <Body>
        <div className="w-full flex flex-col md:flex-row-reverse md:justify-between p-2 rounded-2xl gap-4 md:gap-0">
          {" "}
          <HotelInfoHeader hotel={hotelDetail} isLoading={isLoading} />
          <span className="border-2 border-border h-[2px] md:h-[107px] w-full md:w-auto" />
          <ReservationDates dateStart={dateStart} dateEnd={dateEnd} />
          <span className="border-2 border-border h-[2px] md:h-[107px] w-full md:w-auto" />
          <PriceSection price={hotelDetail?.price} />
        </div>
      </Body>

      {children}

      <div className="flex flex-col md:flex-row justify-between items-center border-2 border-dashed px-3 md:px-6 py-3 rounded-2xl md:rounded-4xl gap-3 md:gap-0">
        <Button
          handleClick={handleSubmit}
          startContent={<ChevronLeft />}
          className="bg-transparent !text-text border-2 border-primary text-sm md:text-base !w-auto"
        >
          {t("continue")}
        </Button>
        <div className="flex gap-1 flex-row-reverse text-lg md:text-2xl">
          <h1>{t("price")}</h1>
          <h3 className="text-primary">
            {formatNumber(Number(hotelDetail?.price))} ت
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
