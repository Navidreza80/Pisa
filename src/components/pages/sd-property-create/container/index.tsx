"use client";
import { HouseItemsInterface } from "@/types/house";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
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

const AddPropertyContainer = () => {
  // Hooks
  const [createdProperty, setCreatedProperty] = useState<HouseItemsInterface>();
  const [photoURL, setPhotoURL] = useState(["", "", "", ""]);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const id = useAppSelector((state) => state.stepsId.id);
  const [location, setLocation] = useState<{ lat: string; lng: string }>({
    lat: "",
    lng: "",
  });
  const [categories, setCategories] = useState<{ name: string }>();
  const [transaction_type, setTransaction_type] = useState();
  const [yard_type, setYard_type] = useState();

  // Create house function
  const { mutate: createHouse } = useMutation({
    mutationKey: ["CREATE_HOUSE"],
    mutationFn: () =>
      toast.promise(() => postHouse(createdProperty), {
        pending: "درحال پردازش...",
        success: "آگهی با موفقیت ساخته شد",
        error: "خطا در ساخت آگهی",
      }),
  });

  // Handle changing photoURL state
  const handleChange = (index: number, value: string) => {
    const updated = [...photoURL];
    updated[index] = value;
    setPhotoURL(updated);
  };

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
    // validationSchema: ContactSchema,
    onSubmit: async (values) => {
      setCreatedProperty({
        ...values,
        yard_type,
        photos: photoURL,
        categories: {
          name: categories,
        },
        transaction_type,
        tags,
        title,
        location,
      });
      console.log({
        photos: photoURL,
        ...values,
        yard_type,
        tags,
        categories: {
          name: categories,
        },
        transaction_type,
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
          <AddPropertyStepFour
            handleChange={handleChange}
            photoURL={photoURL}
            setPhotoURL={setPhotoURL}
          />
        ) : (
          <AddPropertyStepFive createdProperty={createdProperty} />
        )}
      </PropertyContainer>
    </form>
  );
};
export default AddPropertyContainer;
