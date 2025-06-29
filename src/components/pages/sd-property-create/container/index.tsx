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
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const id = useAppSelector((state) => state.stepsId.id);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [categories, setCategories] = useState();
  const [transaction_type, setTransaction_type] = useState();
  const [yard_type, setYard_type] = useState();
  const formik = useFormik({
    initialValues: {
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
        yard_type,
        categories,
        transaction_type,
        tags,
        title,
        location,
      });
      console.log({
        ...values,
        yard_type,
        tags,
        categories,
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
            title={title}
            setTitle={setTitle}
            setTransaction_type={setTransaction_type}
            setCategories={setCategories}
            formik={formik}
          />
        ) : id == 2 ? (
          <AddPropertyStepTwo
            location={location}
            setLocation={setLocation}
            formik={formik}
          />
        ) : id == 3 ? (
          <AddPropertyStepThree
            setTags={setTags}
            tags={tags}
            setYard_type={setYard_type}
            formik={formik}
          />
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
