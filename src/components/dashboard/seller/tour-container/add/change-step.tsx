"use client";
import Button from "@/components/common/button";
import ArrowSVG from "@/components/dashboard/svg/ArrowSVG";
import { createTour } from "@/lib/actions/tours";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setTourStepsId } from "@/utils/hooks/react-redux/store/slices/tour-steps";

const ChangeStep = () => {
  const id = useAppSelector((state) => state.tourSteps.id);
  const tour = useAppSelector((state) => state.createTour);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-[19px] flex gap-[19px]">
      <Button
        handleClick={async () => {
          dispatch(setTourStepsId(id == 5 ? 5 : id + 1));
          if (id == 5) await createTour(tour);
        }}
        className="!w-auto gap-2"
      >
        <ArrowSVG className="rotate-90" /> {id == 5 ? "ثبت نهایی" : "مرحله بعد"}
      </Button>
      <Button
        handleClick={() => dispatch(setTourStepsId(id == 1 ? 5 : id - 1))}
        className="!w-auto gap-2"
      >
        مرحله قبل
        <ArrowSVG className="-rotate-90" />
      </Button>
    </div>
  );
};
export default ChangeStep;
