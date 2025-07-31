"use client";
import InputText from "@/components/common/inputs/text-inputs";
import { ShareSVG } from "@/components/svg";
import { Calendar22 } from "@/components/ui/date-picker";
import { formatNumber } from "@/utils/helper/format-number";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { setReservedDates } from "@/utils/hooks/react-redux/store/slices/book-hotel-slice";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SaveProperty from "../SaveProperty";
import SectionName from "../SectionName";
import useAuth, { useHandleAuth } from "@/utils/hooks/useAuth";
import ChatComponent from "../ChatComponent";

export default function ReserveForm({
  price,
  sellerId,
  houseId,
}: {
  price: string;
  houseId: string;
  sellerId: string;
}) {
  const { isLoggedIn } = useAuth();
  const t = useTranslations("SingleHouse");
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
  const [dateExit, setDateExit] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const { handler } = useHandleAuth();

  const handleContinue = (travelersCount: string) => {
    const params = new URLSearchParams(URLSearchParams.toString());
    if (dateStart) params.set("enterDate", dateStart.toString());
    if (dateExit) params.set("exitDate", dateExit.toString());
    params.set("travelersCount", travelersCount);
    router.push(`/reserve/${id}?${params.toString()}`);
  };
  const reserveSchema = Yup.object().shape({
    travelersCount: Yup.number().required(t("chooseTravelers")),
  });
  const onSubmit = (values) => {
    if (dateExit && dateStart) {
      dispatch(setReservedDates([dateStart.toString(), dateExit.toString()]));
      handleContinue(values.travelersCount);
    } else if (!dateStart) {
      toast.error(t("chooseStartDate"));
    } else if (!dateExit) {
      toast.error(t("chooseExitDate"));
    }
  };
  const formik = useFormik({
    validationSchema: reserveSchema,
    initialValues: { travelersCount: "" },
    onSubmit: (values) => handler(() => onSubmit(values)),
  });
  return (
    <form id="#reserve_form" onSubmit={formik.handleSubmit}>
      <div className="mt-10 flex flex-col gap-4">
        <SectionName sectionName={t("reserve")} />
        <div className="w-full flex flex-wrap justify-between gap-3">
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("dateEnter")}</p>
            <Calendar22 setDate={setDateStart} date={dateStart} />
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("dateExit")}</p>
            <Calendar22 setDate={setDateExit} date={dateExit} />
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("capacity")}</p>{" "}
            <InputText
              onChange={formik.handleChange}
              value={formik.values.travelersCount}
              width="!w-full"
              name="travelersCount"
            />
            {formik.errors.travelersCount && (
              <span className="text-red-500 text-sm ">
                {formik.errors.travelersCount}
              </span>
            )}
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <div className="flex gap-1 items-center">
              <p>{t("discount")}</p>
              <p className="text-[13px] text-fade">{t("optional")}</p>
            </div>
            <InputText width="!w-full" />
          </div>
        </div>
      </div>
      {/* Price section */}
      <div className="mt-6 flex gap-4 justify-between flex-wrap">
        {/* Price */}
        <div className="flex flex-col gap-3">
          <h1 className="text-text">{t("price")}</h1>
          <div className="flex flex-row-reverse gap-[5px]">
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              {t("tooman")}
            </p>
            <h1 className="text-[20px] font-[700] my-auto ">
              {formatNumber(Number(price))}
            </h1>
          </div>
        </div>
        {/* save & share section */}
        <div className="flex gap-6">
          {/* Save */}
          <SaveProperty houseId={id} />
          {/* Chat */}
          {isLoggedIn && (
            <ChatComponent houseId={houseId} sellerId={sellerId} />
          )}
          {/* Share */}
          <p
            className="w-12 h-12 bg-primary rounded-full flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-300"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("لینک صفحه کپی شد!");
            }}
          >
            <ShareSVG />
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary cursor-pointer hover:bg-[#4A5FE3] font-semibold w-full focus:scale-95 focus:shadow-lg transition-all rounded-2xl mt-4 h-12 flex justify-center items-center text-white"
        >
          {t("reserveNow")}
        </button>
      </div>
    </form>
  );
}
