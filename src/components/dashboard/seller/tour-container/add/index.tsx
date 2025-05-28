"use client";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import AddTourStepOne from "./step-one";

const AddTourContainer = () => {
  const id = useAppSelector((state) => state.tourSteps.id);
  return id == 1 ? (
    <AddTourStepOne />
  ) : id == 2 ? (
    <div>step two</div>
  ) : id == 3 ? (
    <div>step three</div>
  ) : id == 4 ? (
    <div>step four</div>
  ) : id == 5 ? (
    <div>step five</div>
  ) : (
    <div>step six</div>
  );
};
export default AddTourContainer;
