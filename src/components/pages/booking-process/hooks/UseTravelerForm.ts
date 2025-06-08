import { useState } from "react";
import { TravelerData, ValidationErrors } from "@/types/booking";

const useTravelerForm = (count: number) => {
  const [travelersData, setTravelersData] = useState<TravelerData[]>(
    Array(count).fill(null).map(() => ({
      firstName: "",
      lastName: "",
      gender: "male",
      nationalId: "",
      birthDate: "",
    }))
  );

  const [errors, setErrors] = useState<ValidationErrors[]>(
    Array(count).fill(null).map(() => ({}))
  );

  const validateField = (field: keyof TravelerData, value: string) => {
    if (!value.trim()) return "این فیلد اجباری است";
    if (field === "nationalId" && !/^\d{10}$/.test(value))
      return "کد ملی باید ۱۰ رقمی باشد";
    if (field === "birthDate" && !/^\d{4}-\d{2}-\d{2}$/.test(value))
      return "فرمت تاریخ صحیح نیست (YYYY-MM-DD)";
    return undefined;
  };

  const handleInputChange = (
    index: number,
    field: keyof TravelerData,
    value: string
  ) => {
    const newData = [...travelersData];
    newData[index][field] = value;
    setTravelersData(newData);

    const error = validateField(field, value);
    const newErrors = [...errors];
    newErrors[index][field] = error;
    setErrors(newErrors);
  };

  const validateAll = () => {
    const allErrors = travelersData.map((traveler) => {
      const travelerErrors: ValidationErrors = {};
      (Object.keys(traveler) as Array<keyof TravelerData>).forEach((field) => {
        const error = validateField(field, traveler[field]);
        if (error) travelerErrors[field] = error;
      });
      return travelerErrors;
    });

    setErrors(allErrors);
    return allErrors.every((err) => Object.keys(err).length === 0);
  };

  return {
    travelersData,
    errors,
    handleInputChange,
    validateAll,
  };
};

export default useTravelerForm;
