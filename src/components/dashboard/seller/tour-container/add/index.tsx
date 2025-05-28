"use client";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import AddTourStepOne from "./step-one";
import AddTourStepTwo from "./step-two";
import { AddTourStepThree } from "./step-three";
import AddTourStepFour from "./step-four";
import AddTourStepFive from "./step-five";

const AddTourContainer = () => {
  const id = useAppSelector((state) => state.tourSteps.id);
  return id == 1 ? (
    <AddTourStepOne />
  ) : id == 2 ? (
    <AddTourStepTwo />
  ) : id == 3 ? (
    <AddTourStepThree />
  ) : id == 4 ? (
    <AddTourStepFour />
  ) : (
    <AddTourStepFive />
  )
};
export default AddTourContainer;
