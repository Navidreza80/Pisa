"use client";
import Button from "@/components/common/button";
import ArrowSVG from "../../../dashboard/svg/ArrowSVG";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setStepsId } from "@/utils/hooks/react-redux/store/slices/steps-slice";
import { useTranslations } from "next-intl";

const ChangeStep = ({ createHouse }) => {
  const t = useTranslations("Dashboard");
  const id = useAppSelector((state) => state.stepsId.id);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-[19px] flex gap-[19px]">
      <Button
        type="submit"
        handleClick={() => {
          if (id == 4) createHouse();
        }}
        className="!w-auto gap-2"
      >
        <ArrowSVG className="rotate-90" />{" "}
        {id == 5 ? t("createProperty") : t("nextStep")}
      </Button>
      <Button
        type="button"
        handleClick={() => dispatch(setStepsId(id == 1 ? 5 : id - 1))}
        className="!w-auto gap-2"
      >
        {t("previousStep")}
        <ArrowSVG className="-rotate-90" />
      </Button>
    </div>
  );
};
export default ChangeStep;
