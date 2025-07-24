"use client";
import { HouseItemsInterface } from "@/types/house";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import postHouse from "@/utils/service/house/post";
import { useFormik } from "formik";
import { useState } from "react";
import PropertyContainer from "../contents/Container";
import AddPropertyStepFive from "../contents/StepFive";
import AddPropertyStepFour from "../contents/StepFour";
import AddPropertyStepOne from "../contents/StepOne";
import AddPropertyStepThree from "../contents/StepThree";
import AddPropertyStepTwo from "../contents/StepTwo";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setStepsId } from "@/utils/hooks/react-redux/store/slices/steps-slice";
import { useTranslations } from "next-intl";

const AddPropertyContainer = () => {
  const t = useTranslations("Dashboard");
  // Hooks
  const [createdProperty, setCreatedProperty] = useState<HouseItemsInterface>();
  const [photoURL, setPhotoURL] = useState(["", "", "", ""]);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const id = 5;
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<{ lat: string; lng: string }>({
    lat: "",
    lng: "",
  });
  const [categories, setCategories] = useState<string>("آپارتمان");
  const [transaction_type, setTransaction_type] = useState("rental");
  const [yard_type, setYard_type] = useState("شهری");

  // Create house function
  const { mutate: createHouse } = useMutation({
    mutationKey: ["CREATE_HOUSE"],
    mutationFn: () =>
      toast.promise(() => postHouse(createdProperty), {
        pending: t("pendingProperty"),
        success: t("successProperty"),
        error: t("errorProperty"),
      }),
  });


  const stepOneValidation = Yup.object().shape({
    caption: Yup.string().required(t("descVal")),
    capacity: Yup.string().required(t("capacityVal")),
    price: Yup.string().required(t("priceVal")),
  });

  const stepTwoValidation = Yup.object().shape({
    address: Yup.string().required(t("addressVal")),
  });

  const stepThreeValidation = Yup.object().shape({
    bathrooms: Yup.string().required(t("bathroomVal")),
    rooms: Yup.string().required(t("parkingVal")),
    parking: Yup.string().required(t("roomVal")),
  });

  // Formik initialValues / onSubmit
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
    validationSchema:
      id == 1
        ? stepOneValidation
        : id == 2
          ? stepTwoValidation
          : id == 3
            ? stepThreeValidation
            : "",
    onSubmit: async (values) => {
      console.log("FormSubmitted!!!");
      dispatch(setStepsId(id == 5 ? 1 : id + 1));
      setCreatedProperty({
        ...values,
        yard_type,
        categories: {
          name: categories,
        },
        transaction_type,
        tags,
        title,
        location,
      });
    },
  });

  // JSX render
  return (
    <form onSubmit={formik.handleSubmit}>
      <PropertyContainer createHouse={createHouse}>
        {id == 1 ? (
          <AddPropertyStepOne
            title={title}
            setTitle={setTitle}
            setTransaction_type={setTransaction_type}
            setCategories={setCategories}
            formik={formik}
            categories={categories}
            transaction_type={transaction_type}
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
            yard_type={yard_type}
          />
        ) : id == 4 ? (
          <AddPropertyStepFive createdProperty={createdProperty} />
        ) : (
          <AddPropertyStepFour />
        )}
      </PropertyContainer>
    </form>
  );
};
export default AddPropertyContainer;
