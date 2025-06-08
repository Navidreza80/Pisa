"use client";
import Button from "@/components/common/button";
import ArrowSVG from "../../../dashboard/svg/ArrowSVG";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setStepsId } from "@/utils/hooks/react-redux/store/slices/steps-slice";

const ChangeStep = () => {
  const id = useAppSelector((state) => state.stepsId.id);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-[19px] flex gap-[19px]">
      <Button
        handleClick={() => dispatch(setStepsId(id == 5 ? 1 : id + 1))}
        className="!w-auto gap-2"
      >
        <ArrowSVG className="rotate-90" /> مرحله بعد{" "}
      </Button>
      <Button
        handleClick={() => dispatch(setStepsId(id == 1 ? 5 : id - 1))}
        className="!w-auto gap-2"
      >
        مرحله قبل
        <ArrowSVG className="-rotate-90" />
      </Button>
    </div>
  );
};
export default ChangeStep;
