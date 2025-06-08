"use client";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import AddPropertyStepOne from "../contents/StepOne";
import AddPropertyStepTwo from "../contents/StepTwo";
import AddPropertyStepThree from "../contents/StepThree";
import AddPropertyStepFour from "../contents/StepFour";
import AddPropertyStepFive from "../contents/StepFive";
import PropertyContainer from "../contents/Container";

const AddPropertyContainer = () => {
  const id = useAppSelector((state) => state.stepsId.id);
  return (
    <PropertyContainer>
      {id == 1 ? (
        <AddPropertyStepOne />
      ) : id == 2 ? (
        <AddPropertyStepTwo />
      ) : id == 3 ? (
        <AddPropertyStepThree />
      ) : id == 4 ? (
        <AddPropertyStepFour />
      ) : (
        <AddPropertyStepFive />
      )}
    </PropertyContainer>
  );
};
export default AddPropertyContainer;
