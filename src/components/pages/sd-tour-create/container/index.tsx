"use client";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import AddTourStepOne from "../contents/step-one";
import AddTourStepTwo from "../contents/step-two";
import { AddTourStepThree } from "../contents/step-three";
import AddTourStepFour from "../contents/step-four";
import AddTourStepFive from "../contents/step-five";
import TourContainer from "../contents/container";

const AddTourContainer = () => {
  const id = useAppSelector((state) => state.tourSteps.id);
  return (
    <TourContainer>
      {id == 1 ? (
        <AddTourStepOne />
      ) : id == 2 ? (
        <AddTourStepTwo />
      ) : id == 3 ? (
        <AddTourStepThree />
      ) : id == 4 ? (
        <AddTourStepFour />
      ) : (
        <AddTourStepFive />
      )}
    </TourContainer>
  );
};
export default AddTourContainer;
