"use client";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import AddPropertyStepOne from "../contents/StepOne";
import AddPropertyStepTwo from "../contents/StepTwo";
import AddPropertyStepThree from "../contents/StepThree";
import AddPropertyStepFour from "../contents/StepFour";
import AddPropertyStepFive from "../contents/StepFive";
import PropertyContainer from "../contents/Container";
import { useFormik } from "formik";
import { useState } from "react";

const AddPropertyContainer = () => {
  const [createdProperty, setCreatedProperty] = useState({});
  const id = useAppSelector((state) => state.stepsId.id);
  const [property_type, setProperty_type] = useState();
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [yard_type, setYard_type] = useState();
  const [transaction_type, setTransaction_type] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
      address: "",
      caption: "",
      price: "",
      capacity: "",
      bathrooms: "",
      rooms: "",
      parking: "",
    },
    // validationSchema: ContactSchema,
    onSubmit: async (values) => {
      setCreatedProperty({
        ...values,
        property_type,
        yard_type,
        transaction_type,
        location,
      });
      console.log({
        ...values,
        property_type,
        yard_type,
        transaction_type,
        location,
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <PropertyContainer>
        {id == 1 ? (
          <AddPropertyStepOne
            setProperty_type={setProperty_type}
            setTransaction_type={setTransaction_type}
            setYard_type={setYard_type}
            formik={formik}
          />
        ) : id == 2 ? (
          <AddPropertyStepTwo
            location={location}
            setLocation={setLocation}
            formik={formik}
          />
        ) : id == 3 ? (
          <AddPropertyStepThree formik={formik} />
        ) : id == 4 ? (
          <AddPropertyStepFour />
        ) : (
          <AddPropertyStepFive createdProperty={createdProperty} />
        )}
      </PropertyContainer>
    </form>
  );
};
export default AddPropertyContainer;
