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
        type="button"
        handleClick={() => dispatch(setStepsId(id == 1 ? 4 : id - 1))}
        className="!w-auto gap-2"
      >
        <ArrowSVG className="-rotate-90" />
        {t("previousStep")}
      </Button>
      <Button
        type="submit"
        handleClick={() => {
          if (id == 4) createHouse();
        }}
        className="!w-auto gap-2"
      >
        {id == 4 ? t("createProperty") : t("nextStep")}
        <ArrowSVG className="rotate-90" />{" "}
      </Button>
    </div>
  );
};
export default ChangeStep;
